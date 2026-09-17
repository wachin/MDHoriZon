# Consejos para desarrollar con un Agente de IA y carpetas de sub-módulos de solo consulta

Cuando estás desarrollando un programa asistido por un agente de IA (como
Claude Code, Copilot, Cursor, opencode u otros), y además mantienes en el
mismo repositorio una carpeta con **sub-módulos de GitHub que son únicamente
para consulta** (código de referencia que *no* forma parte de tu programa),
surgen dos riesgos muy concretos:

1. **El agente "se confunde" e integra ese código de referencia como si fuera
   tuyo** (lo importa, lo copia, o lo mete en el paquete/empaquetado).
2. **Las herramientas de tu proyecto lo procesan por error** — por ejemplo, el
   test runner recoge los tests de los sub-módulos, o el builder los empaqueta
   dentro de tu artefacto, inflando el binario o rompiendo la compilación.

En este artículo te cuento qué está pasando, por qué ocurre, y la solución
concreta que aplicamos en **Linux File Manager**, un gestor de archivos en
Python + PyQt6 cuyo repositorio tiene una carpeta `third-party/` con el código
de referencia de Thunar y otros gestores.

---

## El escenario

Imagina esta estructura:

```text
tu-proyecto/
├── src/                     ← TU código
├── tests/                   ← TUS pruebas
├── pyproject.toml           ← configuración de empaquetado/tests
├── AGENTS.md                ← instrucciones para el agente de IA
└── third-party/             ← SOLO consulta, NO es parte del programa
    ├── thunar/              ← sub-módulo de referencia (GTK)
    └── dde-file-manager/    ← sub-módulo de referencia (Qt)
```

Los sub-módulos se añaden con:

```bash
git submodule add https://github.com/.../thunar third-party/thunar
```

**El problema:** ni `git` ni Python saben que "third-party es solo lectura".
Para el agente de IA y para tus herramientas, esos `*.py`, `*.c` o `*.ts` son
simplemente archivos de código dentro del árbol.

---

## Qué puede salir mal (con ejemplos reales)

### 1. El test runner recoge los tests del sub-módulo

Sin configuración, `pytest` recorre el directorio actual buscando archivos
`test_*.py`. Si uno de tus sub-módulos tiene su propia carpeta `tests/` (muy
habitual), pytest **intenta ejecutar sus pruebas** con tu entorno.

En nuestro caso pasó algo muy concreto: añadimos un sub-módulo llamado
`repopath-sanitizer` que traía `tests/test_engine.py` y
`tests/test_pathrules.py`. De repente, al correr `pytest`, aparecían errores de
"collection" de un proyecto que no era el nuestro.

### 2. El empaquetador incluye los sub-módulos en tu artifacto

Si tu build usa *autodiscovery* de paquetes (por ejemplo
`setuptools` con `find`), puede intentar empaquetar también el código de
`third-party/`, publicando dentro de tu paquete archivos que no te pertenecen
y que además pueden tener **licencias incompatibles** con la tuya.

En *Linux File Manager* (GPL-3.0-or-later) los sub-módulos de referencia son
GPL-2+ o de otras licencias, así que mezclarlos en el binario sería además un
problema legal, no solo técnico.

### 3. El agente de IA "aprende" del código equivocado

Los agentes leen archivos del árbol. Si no se les aclara que `third-party/`
es solo referencia, pueden:

- Importar funciones/constantes de ahí a tu código.
- Copiar patrones que **no** cuadran con tu arquitectura.
- Redactar documentación o pruebas citando ese código como si fuera tuyo.

---

## La solución (4 capas de defensa)

La clave es **excluir explícitamente** la carpeta de referencia en cada
herramienta y **documentarlo** para que el agente lo respete. Aplica estas
cuatro capas:

### 1. Documentación para el agente: `AGENTS.md` (o `CLAUDE.md`)

Sé explícito desde el principio. Pon en la guía que el agente lee
automáticamente algo así:

```markdown
## Golden rule

`third-party/` contiene sub-módulos de GitHub usados SOLO como referencia.
- Son de SOLO LECTURA: nunca se construyen, importan ni copian.
- NUNCA deberán aparecer en imports, en el empaquetado ni en los tests.
- Si necesitas estudiar un patrón, re-expresa la lógica en `src/`, no pegues código.
```

Esto corta el problema de raíz: **el agente es lo primero que lee esto**.

### 2. Configura tu test runner

En `pyproject.toml`:

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
norecursedirs = ["third-party", ".git", "node_modules", ".venv"]
```

Con `testpaths` limitas la recolección a tus tests; con `norecursedirs`
evitas que "se cuele" algo de directorios que no son tuyos.

### 3. Restringe el empaquetado

Con `setuptools`:

```toml
[tool.setuptools.packages.find]
where = ["."]
include = ["tu_paquete*"]   # SOLO tu paquete, no third-party
```

Esto garantiza que el código de referencia jamás entre en tu rueda/paquete.

### 4. Aisla en `.gitignore` el ruido de tu entorno

No es para `third-party/` en sí (que sí quieres versionar como sub-módulo),
pero sí para `__pycache__`, `*.egg-info`, `build/`, etc., de modo que el
agente y las herramientas no "vean" artefactos intermedios.

```gitignore
__pycache__/
*.egg-info/
build/
dist/
```

---

## Resultado

Después de aplicar las cuatro capas en *Linux File Manager*:

- `pytest -q` dejó de recoger los tests de los sub-módulos y
  pasó a correr **solo** nuestras pruebas (que además pasan todas).
- El paquete publicado contiene únicamente `lfmapp/`, nuestro código.
- El agente de IA recibe instrucciones claras y ya no mezcla el código de
  referencia con el nuestro.

La lección es simple: **cuando mezclas código "de consulta" con tu código en el
mismo repositorio, la separación no la da `git` ni el lenguaje — la das tú, con
configuración explícita y una guía que el agente lea primero.**

---

## Resumen en tres frases

1. Usa una carpeta `third-party/` solo para referencia y **dilo en `AGENTS.md`**.
2. Exclúyela de `pytest` (`testpaths` + `norecursedirs`) y del empaquetado
   (`packages.find.include`).
3. Verifica con tu agente que **ningún import, test o package** apunte a esa carpeta.