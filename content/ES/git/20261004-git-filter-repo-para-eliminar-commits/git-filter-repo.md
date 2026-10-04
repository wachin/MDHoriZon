# Cómo limpiar archivos grandes del historial de Git con `git-filter-repo`

## El problema

Subiste accidentalmente `node_modules/`, binarios pesados, archivos de video, datasets o cualquier archivo grande a tu repositorio Git. Ahora:

- El repo pesa cientos de MB (o GB)
- `git clone` tarda una eternidad
- GitHub te avisa: `GH001: Large files detected`
- `git push` es lentísimo

Borrar los archivos en un commit nuevo **no basta**: siguen en la historia y siguen ocupando espacio.

---

## La solución: `git-filter-repo`

`git-filter-repo` es una herramienta moderna, rápida y escrita en Python para **reescribir el historial de Git** eliminando archivos, carpetas o patrones de **todos los commits, para siempre**.

### Por qué no `git filter-branch` ni BFG

| Herramienta | Estado | Velocidad | Facilidad |
|-------------|--------|-----------|-----------|
| `git filter-branch` | **Deprecated** (lento, propenso a errores) | Lento | Difícil |
| BFG Repo-Cleaner | Funciona, pero requiere Java | Rápido | Media |
| **`git-filter-repo`** | **Recomendado por Git** | **Muy rápido** | **Simple** |

---

## Instalación en Debian / Ubuntu / derivados

```bash
sudo apt update && sudo apt install git-filter-repo
```

> Verifica: `git filter-repo --version` → debería mostrar algo como `2.38.0` o superior.

---

## Ejemplo realista: el caso "AI-Powered-Electronics-Design-Platform"

Imagina este escenario (basado en un caso real):

> Estás desarrollando una plataforma open-source de diseño electrónico con IA. Tienes un subproyecto en `converter/` que usa **Bun** (runtime de JavaScript). Al instalar dependencias, se crea `converter/node_modules/` con **16,000+ archivos y ~160 MB** (incluye binarios de `bun` de 70+ MB cada uno).

Hiciste `git add .` + `git commit` + `git push` sin darte cuenta. Ahora el repo remoto pesa 160 MB extra.

### Estructura del repo (simplificada)

```
AI-Powered-Electronics-Design-Platform/
├── README.md
├── LICENSE
├── AGENTS.md
├── ROADMAP.md
├── converter/              # Subproyecto TypeScript/Bun
│   ├── package.json
│   ├── converter_circuit_json_to_kicad.tsx
│   └── node_modules/       # ← 160 MB de basura (binarios, zips, fuentes)
│       ├── bun/
│       ├── zod/
│       ├── react/
│       └── ... 16,000 archivos más
├── unified_pipeline.py
├── poc_*.py
└── research/
```

---

## Paso a paso: eliminar `converter/node_modules/` de TODA la historia

### 1. Haz un backup (por si acaso)

```bash
cd /ruta/a/tu/repo
git clone --mirror https://github.com/tu-usuario/tu-repo.git backup-mirror
# O simplemente copia la carpeta: cp -r mi-repo mi-repo-backup
```

### 2. Ejecuta `git-filter-repo`

```bash
cd mi-repo
git filter-repo --path converter/node_modules --invert-paths --force
```

**Qué hace cada opción:**

| Opción | Significado |
|--------|-------------|
| `--path converter/node_modules` | La ruta a eliminar (relativa a la raíz del repo) |
| `--invert-paths` | **Invierte**: "borra TODO **menos** esto" → en la práctica, borra **solo** esa ruta |
| `--force` | Permite ejecutarse en un repo que no es un clon fresco (tu caso) |

### 3. Vuelve a añadir el remote (filter-repo lo borra por seguridad)

```bash
git remote add origin https://github.com/tu-usuario/tu-repo.git
```

### 4. Fuerza el push al remoto

```bash
git push --force --all
git push --force --tags   # si tienes tags
```

> ⚠️ **`--force` reescribe la historia pública.** Si colaboran otras personas, **avísales antes** para que vuelvan a clonar.

---

## Verificación

```bash
# 1. Confirma que ya no existe en ningún commit
git log --all --full-history -- converter/node_modules
# → Debe salir vacío (sin resultados)

# 2. Tamaño del repo local
du -sh .git
# → Debería ser drásticamente menor

# 3. Clona de nuevo en otra carpeta para probar
cd /tmp && git clone https://github.com/tu-usuario/tu-repo.git test-clone
du -sh test-clone
# → Clone rápido, sin node_modules en la historia
```

---

## Otros casos útiles

### Eliminar varios patrones a la vez

```bash
git filter-repo \
  --path node_modules \
  --path "*.log" \
  --path "*.mp4" \
  --path "data/large_dataset.csv" \
  --invert-paths --force
```

### Eliminar archivos por tamaño (ej. > 10 MB)

```bash
git filter-repo --strip-blobs-bigger-than 10M --force
```

### Renombrer una carpeta en toda la historia

```bash
git filter-repo --path-rename old-name:new-name --force
```

### Eliminar credenciales/secretos accidentales

```bash
git filter-repo --replace-text <(echo "PASSWORD===***REDACTED***") --force
```

---

## Buenas prácticas

1. **Siempre usa `.gitignore`** antes de empezar:
   ```gitignore
   node_modules/
   *.log
   *.mp4
   .venv/
   dist/
   build/
   ```

2. **Revisa antes de pushear**:
   ```bash
   git status
   git diff --cached   # ¿qué voy a commitear?
   ```

3. **Si ya subiste secretos (API keys, passwords)**: 
   - Rótalos **inmediatamente** (cambia la key en el proveedor)
   - Luego limpia el historial con `git-filter-repo --replace-text`

4. **En equipos**: acuerda un `pre-commit` hook que rechace archivos grandes:
   ```bash
   # .git/hooks/pre-commit
   #!/bin/sh
   max_size=5M
   git diff --cached --name-only | xargs -I{} find {} -size +${max_size} -exec echo "Archivo muy grande: {}" \; -exec exit 1 \;
   ```

---

## Referencias

- [git-filter-repo manual](https://github.com/newren/git-filter-repo)
- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Git Blog: filter-repo vs filter-branch](https://git-scm.com/docs/git-filter-branch#_warning)

---

## Resumen rápido (cheatsheet)

```bash
# 1. Instalar (Debian/Ubuntu)
sudo apt install git-filter-repo

# 2. Eliminar carpeta de toda la historia
git filter-repo --path ruta/a/borrar --invert-paths --force

# 3. Re-añadir remote y forzar push
git remote add origin https://github.com/user/repo.git
git push --force --all
git push --force --tags
```

---

*¿Te pasó algo parecido? ¿Usaste otra herramienta? Cuéntamelo en los comentarios*