# Git en Windows muestra advertencias sobre CRLF y LF: qué significa y cómo solucionarlo

### ❓ El problema

Estaba trabajando en mi repositorio de GitHub desde Windows 10 y, al intentar agregar archivos, Git me mostraba este mensaje:

```
warning: in the working copy of 'normalizar audios colección con Audacity/Normalizar audio con audacity.md', 
LF will be replaced by CRLF the next time Git touches it

warning: in the working copy of 'cli_html_fixer_mod.py', 
LF will be replaced by CRLF the next time Git touches it

warning: in the working copy of 'pandoc Windows Converter menú.md', 
LF will be replaced by CRLF the next time Git touches it
```

A simple vista parece un error, pero en realidad es **una advertencia importante** que puede causar muchos problemas si no se entiende.

---

## ¿Qué significa LF y CRLF?

Los archivos de texto usan un carácter especial para indicar un salto de línea (cuando presionamos Enter):

| Sistema       | Tipo de salto |
| ------------- | ------------- |
| Linux / macOS | LF (`\n`)     |
| Windows       | CRLF (`\r\n`) |

Mi repositorio fue creado en Linux, por lo tanto todos los archivos usan **LF**, que es el formato correcto para scripts, Markdown, Python, Bash, etc.

Cuando Git en Windows detecta archivos con LF, intenta convertirlos a CRLF automáticamente, y por eso muestra esa advertencia.

---

## ⚠¿Por qué esto es un problema?

Si Git empieza a convertir los saltos de línea:

* Los scripts pueden dejar de funcionar
* Pandoc puede producir resultados extraños
* Python puede fallar
* Git puede marcar archivos como “modificados” sin que realmente lo estén

Esto es especialmente peligroso cuando trabajas en proyectos multiplataforma (Linux + Windows), como en mi caso.

---

# La solución correcta

La solución es decirle a Git que **no convierta los saltos de línea** y que siempre use el formato Linux (LF), incluso en Windows.

En PowerShell o Git Bash ejecuta:

```bash
git config --global core.autocrlf false
git config --global core.eol lf
```

Esto le dice a Git:

> “No conviertas los archivos a formato Windows. Mantén siempre el formato Linux”.

---

## Limpieza del repositorio

Después de cambiar la configuración, hay que limpiar el índice de Git para que vuelva a leer los archivos correctamente:

```bash
git rm --cached -r .
git reset --hard
```

Luego volver a agregarlos:

```bash
git add .
git commit -m "Normalize line endings to LF"
```

Esto **no borra tus archivos**, solo los reindexa correctamente.

---

##  Protección permanente (recomendado)

Para evitar que esto vuelva a pasar, crea un archivo llamado `.gitattributes` en la raíz del repositorio con este contenido:

```
* text=auto eol=lf
```

Luego guarda y sube el cambio:

```bash
git add .gitattributes
git commit -m "Force LF line endings"
```

Esto garantiza que **todos los colaboradores**, usen Windows o Linux, trabajen con archivos en formato correcto.

---

