
---

# Aauditar y medir el código creado por un Agente de IA en tu repositorio Git

Cuando utilizas un asistente de código o agente de IA trabajando de forma local en tu repositorio Git, es muy común que el proceso se detenga de golpe —por ejemplo, al agotarse los tokens de la API o la cuota de la sesión—, dejándote con un volumen de modificaciones masivo en tu directorio de trabajo.

Para mantener el control estricto de tu proyecto, verificar la autoría y saber exactamente cuánto código se generó o modificó sin tener que revisar archivo por archivo de forma manual, disponemos de herramientas nativas muy potentes y de interfaces de terminal ligeras (TUI) totalmente integradas en distribuciones como Debian y MX Linux.

---

## 1. El método nativo e inmediato: `git diff`

Si el agente se detuvo y dejó los archivos modificados o creados directamente en tu área de trabajo (sin hacer un `commit` automático), la herramienta más rápida y precisa es el comando `git diff`.

### Resumen estadístico de cambios (`--stat`)

Para obtener una vista de pájaro rápida que desglose cuántos archivos se tocaron y cuántas líneas se agregaron o eliminaron en cada uno:

```bash
git diff --stat

```

**Salida de ejemplo:**

```text
 src/main.py      | 145 +++++++++++++++++++++++++++++++++++++++---------
 src/ui/main.py   |  82 +++++++++++++++++++++++++++
 2 files changed, 227 insertions(+), 38 deletions(-)

```

### Conteo total resumido (`--shortstat`)

Si solo te interesa la cifra total de impacto en líneas de código:

```bash
git diff --shortstat

```

### Visualización completa línea por línea

Para inspeccionar el contenido exacto de lo que escribió la IA:

```bash
git diff

```

*Nota: Si el agente creó archivos totalmente nuevos que Git todavía no está rastreando (archivos *untracked*), recuerda agregarlos temporalmente al índice sin modificar su contenido con `git add -N .` antes de ejecutar el diff.*

---

## 2. Auditoría temporal de commits recientes (`git log`)

Si el agente estuvo operando de forma autónoma y realizó varios `commits` automáticos antes de quedarse sin tokens, puedes auditar su actividad delimitándola por tiempo o por cantidad de commits.

### Ver los cambios de los últimos commits

Si realizó los últimos 3 commits en tu repositorio:

```bash
git diff --stat HEAD~3 HEAD

```

### Filtrar cambios por ventana de tiempo

Si necesitas saber exactamente cuánto código se escribió en las últimas 2 horas (el tiempo que duró la sesión de la IA):

```bash
git log --since="2 hours ago" --stat

```

### Script rápido en una línea para sumar líneas creadas y eliminadas

Puedes combinar `git log` con `awk` para obtener un balance métrico exacto del trabajo realizado por el agente en un rango de tiempo:

```bash
git log --since="2 hours ago" --pretty=tformat: --numstat | awk '{add += $1; subs += $2} END {printf "Líneas creadas: %s | Líneas eliminadas: %s (Total neto: %s)\n", add, subs, add-subs}'

```

---

## 3. Exploración visual con `lazygit`

Cuando la cantidad de archivos modificados es alta, leer la salida estándar en texto plano puede volverse tedioso. Una excelente alternativa disponible en los ecosistemas de paquetes para desarrolladores es **`lazygit`**.

> *Nota: Herramientas como `gitui` (escrita en Rust) a veces no se encuentran en los repositorios estables tradicionales de Debian por políticas de empaquetado, pero `lazygit` ofrece una interfaz de terminal sumamente fluida y rica en funciones.*

### Instalación rápida

En muchos entornos Debian/MX Linux puedes instalarlo o descargar el binario estático directamente desde su repositorio oficial en GitHub, o mediante gestores compatibles. Una vez instalado, simplemente sitúate en la raíz de tu proyecto y ejecútalo:

```bash
lazygit

```

### Ventajas clave en tu flujo de trabajo con IA:

* **Navegación por paneles:** Te permite moverte con las flechas o el ratón entre la lista de archivos modificados, el árbol de commits, los archivos *staged* y las diferencias detalladas (diffs) con resaltado de sintaxis a color.
* **Control selectivo:** Puedes decidir qué partes del código generado por la IA deseas descartar (`discard`), qué fragmentos conservar (`stage line/hunk`) y cuáles descartar de manera interactiva antes de validar tu versión final.

---

## 4. Estadísticas globales por autor con `git-quick-stats`

Si en tu repositorio colaboras tú y uno o más agentes automatizados configurados con un usuario de Git específico, puedes instalar una utilidad estadística muy ligera:

```bash
sudo apt install git-quick-stats

```

Una vez instalada, dentro de tu repositorio ejecutas:

```bash
git-quick-stats

```

Esto abrirá un menú interactivo donde podrás consultar un desglose detallado por contribuyente, líneas aportadas por fecha, actividad por hora del día y un informe completo del impacto del código dentro del repositorio.

---
