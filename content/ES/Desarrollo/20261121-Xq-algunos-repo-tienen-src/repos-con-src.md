# ¿Por qué algunos repositorios de GitHub tienen una carpeta `src`?

Si alguna vez has abierto un repositorio en GitHub y has visto esto:

```
mi-proyecto/
├── src/
├── tests/
├── docs/
├── README.md
└── pyproject.toml
```

quizá te hayas preguntado si `src` es obligatoria, si GitHub la exige o si tu
proyecto “está mal” por no tenerla.

La respuesta corta es: **no, no es obligatoria, GitHub no la exige y un programa
en Python funciona perfectamente sin ella**. `src` es una convención de
organización, no un requisito del lenguaje ni de la plataforma.

Veamos de dónde viene y cuándo tiene sentido usarla.

## Qué significa `src`

`src` es la abreviatura de *source* (código fuente). Es una carpeta donde se
guarda **lo que se compila o se empaqueta**, separado de lo que lo rodea:

```
proyecto/
├── src/            código fuente
├── include/        cabeceras públicas (en C/C++)
├── tests/          pruebas
├── docs/           documentación
├── scripts/        utilidades de desarrollo
├── assets/         recursos
├── build/          archivos generados (normalmente ignorado por git)
└── CMakeLists.txt  o pyproject.toml, Cargo.toml, pom.xml…
```

La idea es sencilla: en la raíz quedan la configuración, la documentación y las
pruebas; el código que forma el producto vive en `src`.

## De dónde viene la costumbre

No nació en GitHub. Viene de los sistemas de compilación y de las convenciones
de cada ecosistema:

- **C y C++**: los proyectos con Make, Autotools o CMake suelen separar `src/`
  (implementación) e `include/` (cabeceras). El archivo de compilación raíz
  indica dónde está el código, y `build/` queda para los objetos y binarios.
- **Java con Maven o Gradle**: la convención es `src/main/java` para el código y
  `src/test/java` para las pruebas.
- **Rust con Cargo**: `src/main.rs` o `src/lib.rs` es una convención tan fuerte
  que la herramienta la espera por defecto.
- **Python**: existe el llamado *src-layout* (`src/mi_paquete/`), una forma de
  organizar paquetes que se ha vuelto popular en bibliotecas publicadas.

En cambio, **git y GitHub no saben nada de `src`**. Git guarda archivos y
carpetas; GitHub los muestra. La palabra `src` no activa ninguna magia.

## Por qué ayuda tener `src`

Aunque no sea obligatoria, la separación tiene ventajas reales:

1. **Claridad inmediata.** Quien abre el repositorio ve dónde está el código sin
   tener que adivinar entre archivos de configuración, datos de prueba y
   ejemplos.
2. **Herramientas más simples.** CMake, setuptools, Cargo o Maven pueden apuntar
   a una carpeta concreta y dejar `build/`, `dist/` o `node_modules/` fuera del
   código fuente.
3. **Empaquetado más limpio.** Al construir una biblioteca se incluye `src` y no
   se arrastran pruebas, documentos o binarios generados.
4. **Menos mezclas.** Los archivos temporales y los resultados de compilación no
   contaminan el árbol de código.
5. **Pruebas contra lo instalado.** En Python, el *src-layout* evita que las
   pruebas importen el paquete “por accidente” desde el directorio actual en
   lugar de probar lo que realmente se instala.

## El caso de Python: no tener `src` no es un error

En Python hay dos disposiciones habituales y **las dos son válidas**.

### Diseño plano

```
mi-proyecto/
├── mi_paquete/
│   ├── __init__.py
│   └── modulo.py
├── tests/
│   └── test_modulo.py
├── main.py
└── pyproject.toml
```

Es perfectamente normal en aplicaciones pequeñas, scripts, herramientas
internas, proyectos de aprendizaje o programas con un único punto de entrada.
`python main.py` funciona, las pruebas encuentran el paquete y no hay ningún
problema.

### Diseño con `src`

```
mi-proyecto/
├── src/
│   └── mi_paquete/
│       ├── __init__.py
│       └── modulo.py
├── tests/
│   └── test_modulo.py
├── pyproject.toml
└── README.md
```

Aquí el paquete importable está un nivel más abajo. Para que las herramientas lo
encuentren hay que decírselo, por ejemplo con setuptools:

```toml
[tool.setuptools.packages.find]
where = ["src"]
```

o con Hatchling:

```toml
[tool.hatch.build.targets.wheel]
packages = ["src/mi_paquete"]
```

El resultado para quien usa el paquete es el mismo: `import mi_paquete` sigue
funcionando.

## Cuándo conviene usar `src` en Python

Tiene más sentido cuando:

- estás publicando una **biblioteca** en PyPI (Python Package Index — índice
  de paquetes de Python) o en un repositorio público;
- el proyecto tiene **varios puntos de entrada** o herramientas auxiliares;
- quieres que las pruebas se ejecuten contra el paquete **instalado** y no
  contra la copia accidental del directorio actual;
- empaquetas en CI (Continuous Integration — integración continua) y quieres
  que solo entre lo que está en `src`;
- quieres evitar que un archivo llamado igual que el paquete lo tape al
  importarlo.

## Cuándo no hace falta

No lo necesitas para:

- un script suelto o una aplicación pequeña;
- un proyecto que estás aprendiendo;
- una app de escritorio con un `main.py` claro;
- un cuaderno de Jupyter o una colección de ejemplos;
- un proyecto Django, donde `manage.py` y las apps suelen vivir en la raíz.

Y desde luego, **no tener `src` no te hace peor programador ni hace que tu
proyecto sea menos profesional**.

## GitHub Actions y la carpeta `src`

GitHub Actions es el servicio de CI (Continuous Integration — integración
continua) y CD (Continuous Delivery — entrega continua) de GitHub: ejecuta
tareas automáticas —pruebas, empaquetado, publicación— definidas en archivos
YAML (YAML Ain't Markup Language — lenguaje de serialización) dentro de
`.github/workflows/`.

**Actions no exige `src`**. Un proyecto plano funciona igual: el workflow
instala el paquete, ejecuta las pruebas y publica el resultado. La pregunta
correcta no es “¿me obliga Actions?”, sino “¿me ayuda `src` a que el workflow sea
más fiable?”.

Usar `src` suele ayudar en estos casos:

- **Instalación realista.** El workflow ejecuta `pip install .` (pip — *pip
  installs packages*, el instalador de paquetes de Python) y luego las pruebas
  contra lo instalado. Con `src`, es más difícil que una prueba importe por
  accidente la copia del directorio actual.
- **Empaquetado verificable.** Al construir la *wheel* (rueda binaria) se
  incluye solo el paquete de `src`; si falta un archivo, la CI lo detecta antes
  de publicar.
- **Rutas más claras.** Los filtros de `paths`, los artefactos y las cachés
  pueden apuntar a `src/**` sin confundirse con pruebas, ejemplos o documentos.
- **Configuración explícita.** En `pyproject.toml` (TOML — *Tom's Obvious
  Minimal Language*, formato de configuración) se declara dónde está el paquete:

  ```toml
  [tool.setuptools.packages.find]
  where = ["src"]
  ```

Un workflow mínimo para un proyecto con `src` podría ser:

```yaml
name: CI
on:
  push:
    paths:
      - "src/**"
      - "tests/**"
      - "pyproject.toml"
      - ".github/workflows/**"

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -e ".[test]"
      - run: python -m pytest
```

El mismo workflow funciona sin `src`; solo cambia dónde está el paquete y cómo
lo descubre la herramienta de empaquetado. Si tu programa es una aplicación
pequeña, no añadas `src` solo para usar Actions.

## Cómo pedirle a un agente de IA que migre el proyecto a `src`

Si usas un agente de IA (Inteligencia Artificial) para hacer la migración, el
prompt debe pedirle algo más que “mueve el código a `src`”: un *src-layout* bien
hecho cambia imports, configuración de empaquetado, pruebas, CI (Continuous
Integration — integración continua) y a veces el punto de entrada. Un agente que
solo mueve carpetas y añade `PYTHONPATH=src` ha hecho un apaño, no una migración.

### Plantilla genérica

Copia esto y sustituye los valores entre `<...>`:

```text
Actúa como ingeniero de software senior. Migra este repositorio a una
disposición src-layout sin cambiar su comportamiento.

Contexto:
- Repositorio: <ruta o dirección web>
- Lenguaje y build system: <Python/setuptools, Hatchling, Cargo, CMake...>
- Paquete público actual: <nombre>
- Punto(s) de entrada: <python main.py, comando, consola...>
- Tests: <comando exacto que debo ejecutar>

Antes de tocar archivos:
1. Inspecciona el repositorio y dime qué es código fuente, qué es configuración,
   qué son pruebas y qué son datos empaquetados.
2. Propón el árbol destino (src/<paquete>/...) y la lista de archivos que se
   mueven y que no.
3. Señala los cambios de imports, entry points y configuración de empaquetado.
4. Si el proyecto no es un paquete instalable o el cambio rompe una API
   (Application Programming Interface — interfaz de programación de
   aplicaciones) pública, detente y explícamelo antes de editar.

Reglas:
- Usa `git mv` para conservar el historial; no copies y borres.
- Mueve el paquete completo a `src/<paquete>/`; no dejes un `src/` con módulos
  sueltos ni dupliques archivos.
- Actualiza todos los imports, rutas de recursos, entry points, scripts, tests,
  CI, Docker, Makefile, cobertura, linters y documentación.
- Configura el empaquetado para que encuentre el paquete en `src` (por ejemplo,
  `package-dir`/`where = ["src"]`).
- No arregles los imports con `sys.path` ni con `PYTHONPATH=src`; el paquete debe
  instalarse y descubrirse correctamente.
- No muevas tests, docs, ejemplos, CI ni submodules/vendors salvo que te lo pida.
- No cambies el nombre público del paquete ni su API sin confirmarlo.
- No mezcles refactors ajenos.

Verificación obligatoria:
- `pip install -e .`
- ejecutar el comando de tests del proyecto
- construir la wheel/sdist (source distribution — distribución de código
  fuente) e inspeccionar que contiene el paquete
- ejecutar el punto de entrada real
- buscar rutas e imports antiguos que hayan quedado

Entrega:
- una rama y commits pequeños y revisables
- el diff completo
- el resultado real de cada comando
- una lista de riesgos o cosas que no pudiste verificar
```

### Ejemplo concreto: MarkTux

MarkTux es un caso especial porque hoy no es un paquete instalable: tiene
`main.py`, `core/`, `ui/` y `tests/` en la raíz, y el editor vive en un
submódulo. Un prompt correcto para pedir esta migración sería:

```text
Migra el repositorio MarkTux a un src-layout con el paquete público `marktux`.

Estado actual:
- `main.py`, `core/` y `ui/` están en la raíz y se importan como `core` y `ui`.
- `tests/` importa `core` y `ui` directamente.
- `libs/mtextedit` es un submódulo independiente; NO lo muevas.
- `external/`, `images/`, `docs` y los archivos de configuración no se mueven.
- No existe `pyproject.toml`.

Objetivo:
- Crear `src/marktux/` con `core/`, `ui/` y el punto de entrada.
- Convertir `main.py` en un punto de entrada fino (wrapper o `__main__.py`) que
  conserve el comando `python main.py` si es posible, y añade `python -m marktux`.
- Cambiar los imports de `core`/`ui` a `marktux.core`/`marktux.ui` en toda la
  aplicación, los tests, la documentación y AGENTS.md.
- Añadir `pyproject.toml` con setuptools, `[tool.setuptools] package-dir =
  {"" = "src"}`, `[tool.setuptools.packages.find] where = ["src"]`,
  dependencias de `requirements.txt` y el entry point correspondiente.
- Mantener los tests fuera de `src` y hacer que se ejecuten contra el paquete
  instalado, sin `sys.path` ni `PYTHONPATH=src`.
- Actualizar README, comandos de CI y cualquier ruta que apunte a `core/`, `ui/`
  o `main.py`.

Antes de editar:
- Enséñame el árbol propuesto y el plan de commits.
- Si el cambio de imports rompe la API pública, detente y propón alternativas.
- No toques `libs/mtextedit` ni sus archivos internos.

Verificación:
- `pip install -e .`
- `python -m unittest discover -s tests -t .`
- `(cd libs/mtextedit && python -m unittest discover -s tests -t .)`
- `python -m marktux` y `python main.py`
- construir la wheel e inspeccionar su contenido
```

No lances ese prompt sin leer la respuesta del agente: en MarkTux la migración
implica renombrar imports en toda la aplicación y crear metadatos de
empaquetado; si solo necesitas ejecutar la app desde el repositorio, el
`src-layout` es opcional.

## Mitos frecuentes

- **“GitHub exige `src`”**: falso. GitHub no impone estructura de carpetas.
- **“Sin `src` el proyecto no es serio”**: falso. Muchos proyectos pequeños y
  medianos viven felizmente en la raíz.
- **“`src` es solo para programas compilados”**: falso. También se usa en
  Python, JavaScript o cualquier lenguaje; es una convención organizativa.
- **“`src` y el paquete son lo mismo”**: no. `src` es la carpeta contenedora; el
  paquete es `src/mi_paquete/`.

## Cómo decidir

Hazte tres preguntas:

1. ¿Voy a publicar esto como biblioteca o instalarlo con `pip`?
2. ¿Quiero que las pruebas usen el paquete instalado, no el del directorio?
3. ¿Me ayuda a separar código, pruebas y configuración?

Si respondes “sí” a varias, el *src-layout* es una buena opción. Si estás
empezando, es un script o una app pequeña, quédate con la estructura plana: es
más simple y perfectamente correcta.

## Conclusión

`src` es una **convención**, no una obligación. Sirve para separar el código que
forma el producto de todo lo demás y encaja especialmente bien en proyectos
grandes o bibliotecas publicadas. En Python, un programa sin `src` funciona
igual de bien; solo elige la estructura que haga tu proyecto más fácil de
entender y mantener.

---

### Abreviaturas usadas en este artículo

| Abreviatura | Significado |
|---|---|
| `src` | *source* (fuente) |
| `CI` | *Continuous Integration* (integración continua) |
| `CD` | *Continuous Delivery* (entrega continua) |
| `PyPI` | *Python Package Index* (índice de paquetes de Python) |
| `pip` | *pip installs packages* (instalador de paquetes de Python) |
| `TOML` | *Tom's Obvious Minimal Language* (lenguaje de configuración) |
| `YAML` | *YAML Ain't Markup Language* (lenguaje de serialización) |
| `IA` | Inteligencia Artificial (Artificial Intelligence) |
| `API` | *Application Programming Interface* (interfaz de programación de aplicaciones) |
| `sdist` | *source distribution* (distribución de código fuente) |

### Para seguir leyendo

- Python Packaging User Guide: *src layout vs flat layout* —
  <https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/>
- Cargo Book: *Package Layout* —
  <https://doc.rust-lang.org/cargo/guide/project-layout.html>
- Maven: *Standard Directory Layout* —
  <https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html>
