# Convertir Markdown a PDF con Pandoc y WeasyPrint en Linux y Termux

## Introducción

Este tutorial explica cómo convertir archivos Markdown (`.md`) en documentos PDF directamente desde la terminal, tanto en un **Linux de escritorio (probado en una distribución basada en Debian 13)** como en un **teléfono Android con Termux**.

La idea clave es esta:

```text
Archivo Markdown
      ↓
    Pandoc
      ↓
   HTML + CSS
      ↓
 WeasyPrint
      ↓
 Archivo PDF
```

Pandoc entiende el contenido y la estructura del Markdown: títulos, tablas, listas, enlaces e imágenes. WeasyPrint se encarga de dibujar ese contenido y producir el PDF, con ayuda de Pango para componer el texto.

Este procedimiento fue probado con Pandoc 3.1.11.1 y WeasyPrint 62.3 en Linux, y con Pandoc 3.9 y WeasyPrint 69.0 en Termux.

## 1. Requisitos

Se necesitan cuatro componentes:

- **Linux (Debian y derivados) o Termux:** el sistema donde se ejecuta todo.
- **Pandoc:** transforma Markdown en un documento intermedio.
- **WeasyPrint:** genera el PDF dibujando el contenido.
- **Pango:** biblioteca del sistema que WeasyPrint utiliza para componer y dibujar el texto.

WeasyPrint es un motor de HTML y CSS orientado a documentos paginados. Su documentación oficial indica que Python ≥ 3.10 y Pango ≥ 1.44 están entre sus dependencias. [Documentación oficial de WeasyPrint](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html).

## 2. Instalación

La instalación cambia según el sistema. Se muestran dos caminos: el **camino fácil** usa el paquete `weasyprint` del propio sistema (solo existe en Linux) y no requiere instalar Pango a mano, porque sus dependencias se resuelven automáticamente; el **camino alternativo** instala WeasyPrint con `pip`, y en ese caso sí hay que instalar Pango explícitamente.

Los comandos de conversión de las secciones siguientes son idénticos en Linux y Termux; solo cambia la instalación.

### 2.1 Linux (Debian y derivados)

**Camino fácil: WeasyPrint como paquete del sistema.** En Debian ≥ 11, Ubuntu ≥ 20.04 y derivados existe el paquete `weasyprint`:

```sh
sudo apt install pandoc weasyprint
```

Con este método no es necesario instalar Pango manualmente: `apt` instala automáticamente las bibliotecas de Pango que WeasyPrint necesita (como `libpango-1.0-0` y `libpangoft2-1.0-0`), junto con Python 3 y todas sus dependencias de Python.

**Camino alternativo: WeasyPrint con pip.** Si se prefiere una versión más reciente que la del repositorio, o se trabaja dentro de un entorno virtual de Python, hay que instalar primero Python, pip y una biblioteca auxiliar de HarfBuzz que WeasyPrint usa para las fuentes:

```sh
sudo apt install python3 python3-pip libharfbuzz-subset0
```

En Ubuntu 24.04 y posteriores ese último paquete puede llamarse `libharfbuzz-subset0t64`; si `apt` no encuentra uno, probar con el otro.

**Las bibliotecas de Pango se instalan aparte**, por dos motivos: sus nombres exactos varían entre versiones de Debian y Ubuntu (sufijo `t64`), y es muy posible que **ya estén instaladas** como dependencias de otros programas, sin que uno se dé cuenta. Lo mejor es revisarlo primero:

```sh
dpkg -l | grep pango
```

Si en la salida aparecen `libpango-1.0-0` y `libpangoft2-1.0-0` (o sus variantes `t64`), ya están. Si no, instalarlas con comodines, que seleccionan la variante correcta sin importar el número o el sufijo de versión:

```sh
sudo apt install libpango-1.*-* libpangoft2-1.*-*
```

`apt` informa qué ha seleccionado cada comodín. Por ejemplo, en Debian 13:

```text
Nota, seleccionando «libpango-1.0-0» para el global «libpango-1.*-*»
Nota, seleccionando «libpango-1.0-0t64» para el global «libpango-1.*-*»
Nota, seleccionando «libpangoft2-1.0-0» para el global «libpangoft2-1.*-*»
libpango-1.0-0 ya está en su versión más reciente (1.56.3-1).
fijado libpango-1.0-0 como instalado manualmente.
libpangoft2-1.0-0 ya está en su versión más reciente (1.56.3-1).
fijado libpangoft2-1.0-0 como instalado manualmente.
```

«Fijado como instalado manualmente» significa que, aunque fueran dependencias de otros programas, ahora el sistema las mantiene instaladas aunque se desinstale lo que las arrastró.

También se pueden localizar gráficamente con **Synaptic** (`sudo apt install synaptic`): al buscar «pango» se muestran todos los paquetes relacionados, y los ya instalados se distinguen porque su casilla aparece marcada.

Después, instalar WeasyPrint directamente en el sistema o dentro de un entorno virtual:

```sh
python3 -m pip install weasyprint
```

o bien:

```sh
python3 -m venv venv
source venv/bin/activate
pip install weasyprint
weasyprint --info
```

**Nota sobre los nombres de los paquetes de Pango en Debian:** no existe un paquete llamado simplemente `pango`. La biblioteca que WeasyPrint carga es `libpango-1.0-0`. WeasyPrint también usa `libpangoft2-1.0-0` y `libharfbuzz-subset0` (esta última se necesita a partir de WeasyPrint 53). Otros paquetes relacionados que suelen aparecer instalados, como `pango1.0-tools` (incluye `pango-view`, útil para comprobar la versión), `gir1.2-pango-1.0` y `libpangoxft-1.0-0`, son opcionales: `apt` los instala solo si algún programa los necesita, aunque es habitual que ya vengan instalados (es el caso frecuente de `pango1.0-tools`, que también puede añadirse a mano con `sudo apt install pango1.0-tools` para disponer de `pango-view`). La lista exacta del camino con `pip` proviene de la [documentación oficial de WeasyPrint](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html).

**Nota para Arch, Fedora y otras distribuciones:** allí el paquete de la biblioteca **sí se llama `pango`** (Arch: `pacman -S pango`, con el paquete Python `python-weasyprint`; Fedora: `dnf install weasyprint` o `dnf install python-pip pango`), a diferencia de Debian, donde ese nombre no existe como tal.

### 2.2 Termux (Android)

Actualizar la lista de paquetes y los programas instalados:

```sh
pkg update
pkg upgrade
```

En Termux, Pango **sí** existe como paquete llamado `pango` y normalmente ya está instalado; si no, se instala junto con el resto:

```sh
pkg install python pandoc pango
```

Termux no ofrece WeasyPrint como paquete `pkg` (a diferencia de Debian, Arch y Fedora), así que se instala con `pip`:

```sh
python3 -m pip install weasyprint
```

Usar `python3 -m pip` ayuda a asegurar que se instala el paquete Python para la misma versión de Python que se está ejecutando.

`Pango` es la biblioteca que WeasyPrint utiliza para componer y dibujar el texto. Aunque `pip` instale el paquete Python de WeasyPrint, Pango es una biblioteca del sistema y debe instalarse con `pkg`.

## 3. Comprobar la instalación

Ejecutar:

```sh
pandoc --version
weasyprint --version
pango-view --version
```

Cada comando debe mostrar un número de versión. También se puede revisar dónde está cada programa:

```sh
command -v pandoc
command -v weasyprint
```

`pango-view` viene en el paquete `pango1.0-tools` de Debian (normalmente ya está instalado; si no: `sudo apt install pango1.0-tools`) y en el paquete `pango` de Termux; si no está disponible, con las versiones de `pandoc` y `weasyprint` es suficiente.

## 4. Primera conversión

Supongamos que existe un archivo llamado `informe.md`. Para convertirlo:

```sh
pandoc informe.md \
  --standalone \
  --from=gfm \
  --metadata lang=es \
  --pdf-engine=weasyprint \
  -o informe.pdf
```

### Qué significa cada opción

| Opción                    | Función                                                                 |
| ------------------------- | ----------------------------------------------------------------------- |
| `informe.md`              | Archivo Markdown de entrada                                             |
| `--standalone`            | Genera un documento HTML completo antes de producir el PDF              |
| `--from=gfm`              | Lee Markdown con la variante GitHub Flavored Markdown, útil para tablas |
| `--metadata lang=es`      | Indica que el idioma del documento es español                           |
| `--pdf-engine=weasyprint` | Ordena a Pandoc usar WeasyPrint como motor PDF                          |
| `-o informe.pdf`          | Define el nombre del archivo resultante                                 |

La forma corta también funciona en muchos documentos:

```sh
pandoc informe.md --pdf-engine=weasyprint -o informe.pdf
```

## 5. Convertir varios archivos automáticamente

Para convertir todos los `.md` de la carpeta actual:

```sh
mkdir -p pdf

for archivo in ./*.md; do
  nombre=${archivo##*/}
  nombre=${nombre%.md}
  pandoc "$archivo" \
    --standalone \
    --from=gfm \
    --metadata lang=es \
    --pdf-engine=weasyprint \
    -o "pdf/$nombre.pdf" || exit 1
done
```

Los PDF quedarán dentro de la carpeta `pdf`. Las comillas alrededor de las variables son importantes porque permiten procesar nombres que contienen espacios.

`|| exit 1` detiene el proceso si alguna conversión falla, evitando que un error pase inadvertido.

## 6. Reunir varios Markdown en un solo PDF

Pandoc acepta varios archivos de entrada y los combina en el orden indicado:

```sh
pandoc \
  introduccion.md \
  capitulo-1.md \
  capitulo-2.md \
  conclusiones.md \
  --standalone \
  --from=gfm \
  --metadata lang=es \
  --toc \
  --pdf-engine=weasyprint \
  -o documento-completo.pdf
```

La opción `--toc` añade una tabla de contenido. El orden de los nombres en el comando determina el orden de las secciones en el PDF.

## 7. Mejorar la apariencia con CSS

Como WeasyPrint trabaja con HTML y CSS, se puede controlar el tamaño de página, márgenes, tipografía, tablas y colores.

Crear un archivo `estilo-pdf.css` con un contenido similar a este:

```css
@page {
  size: A4;
  margin: 2cm;

  @bottom-center {
    content: "Página " counter(page) " de " counter(pages);
    color: #666;
    font-size: 9pt;
  }
}

body {
  font-family: sans-serif;
  color: #222;
  font-size: 11pt;
  line-height: 1.45;
}

h1, h2, h3 {
  color: #174a70;
}

h1 {
  border-bottom: 2px solid #174a70;
  padding-bottom: 0.25em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  font-size: 9.5pt;
}

th, td {
  border: 1px solid #aaa;
  padding: 0.4em;
  vertical-align: top;
}

th {
  background: #eaf2f8;
}

tr {
  break-inside: avoid;
}

a {
  color: #125b91;
}

code {
  font-family: monospace;
  background: #f2f2f2;
}
```

Usar el estilo durante la conversión:

```sh
pandoc informe.md \
  --standalone \
  --from=gfm \
  --metadata lang=es \
  --css=estilo-pdf.css \
  --pdf-engine=weasyprint \
  -o informe.pdf
```

WeasyPrint también permite pasar hojas de estilo directamente mediante su opción `--stylesheet`. [API de línea de comandos de WeasyPrint](https://doc.courtbouillon.org/weasyprint/stable/api_reference.html#command-line-api).

### Cajas de código con resaltado continuo (estilo editor)

Con el estilo anterior sucede algo curioso: en las cajas de código de varias líneas, el fondo gris se ve cortado entre cada línea, en lugar de formar una caja continua como en los editores de Markdown (Obsidian, Typora, VNote…).

La causa es esta: Pandoc envuelve cada línea del código en un `<span>` dentro de un elemento `<code>` en línea, y WeasyPrint pinta el fondo de los elementos en línea caja de línea por caja. Si el fondo se aplica a `code`, el resaltado se corta en cada salto de línea.

La solución es aplicar el fondo a los contenedores de **bloque** que Pandoc genera (`div.sourceCode` y `pre`): esos sí se pintan de una sola pieza. En la práctica, basta sustituir la regla `code { ... }` final del estilo anterior por este bloque:

```css
/* El fondo va en los contenedores de BLOQUE: se pinta de una sola
   pieza, sin cortes entre líneas. */
pre,
div.sourceCode {
    background-color: #f6f8fa;
    border: 1px solid #d0d7de;
    border-radius: 4px;
}

pre {
    margin: 1em 0;
    padding: 0.7em 1em;
    font-family: "DejaVu Sans Mono", "Liberation Mono", Menlo, Consolas, monospace;
    font-size: 9pt;
    line-height: 1.5;
    white-space: pre-wrap;        /* las líneas largas se doblan, no se salen de la página */
    overflow-wrap: break-word;
}

div.sourceCode {
    margin: 1em 0;
    padding: 0;
}

/* Cuando el pre va dentro del div de Pandoc, no debe repetir
   borde, fondo ni márgenes: los aporta el div. */
div.sourceCode pre {
    margin: 0;
    padding: 0.7em 1em;
    background-color: transparent;
    border: none;
}

/* Código en línea: se distingue del bloque con un fondo más pequeño. */
code {
    font-family: "DejaVu Sans Mono", "Liberation Mono", Menlo, Consolas, monospace;
    font-size: 0.88em;
    background-color: #eceff3;
    padding: 0.1em 0.3em;
    border-radius: 3px;
}

/* El code de dentro de una caja NO debe verse como código en línea. */
pre code,
div.sourceCode code {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    font-size: inherit;
}
```

Con esto las cajas de código quedan con fondo continuo, borde redondeado y las líneas largas se doblan en vez de salirse de la página. El `código en línea` conserva un fondo propio más pequeño para seguir distinguéndose del texto normal.

Este diseño está disponible completo en el archivo `estilo-pdf-editor.css` (el resto de sus reglas es idéntico al de `estilo-pdf.css`). Fue probado generando un PDF con bloques `bash`, `sh` y sin lenguaje declarado: el fondo aparece continuo, sin cortes entre líneas. Se usa igual que cualquier hoja de estilo:

```sh
pandoc informe.md \
  --standalone \
  --from=gfm \
  --metadata lang=es \
  --css=estilo-pdf-editor.css \
  --pdf-engine=weasyprint \
  -o informe.pdf
```

## 8. Imágenes y rutas

En Markdown, una imagen local puede incluirse así:

```md
![Descripción de la imagen](imagenes/grafico.png)
```

Conviene ejecutar Pandoc desde la carpeta con respecto a la cual se escribieron esas rutas. Por ejemplo:

```text
proyecto/
├── informe.md
└── imagenes/
    └── grafico.png
```

En ese caso:

```sh
cd proyecto
pandoc informe.md --pdf-engine=weasyprint -o informe.pdf
```

Si una imagen no aparece, comprobar que el nombre, las mayúsculas y la extensión coincidan exactamente.

## 9. Dar acceso al almacenamiento de Android (solo Termux)

Para trabajar con archivos de carpetas compartidas del teléfono puede ser necesario ejecutar una sola vez:

```sh
termux-setup-storage
```

Android mostrará una solicitud de permiso. Después suelen estar disponibles rutas como:

```text
~/storage/shared/
~/storage/downloads/
```

Ejemplo:

```sh
cd ~/storage/downloads
pandoc notas.md --pdf-engine=weasyprint -o notas.pdf
```

En Linux de escritorio este paso no existe: los archivos se leen y escriben directamente en el sistema de archivos normal.

## 10. Solución de problemas

### Error: `libpango-1.0-0 not found`

Un mensaje semejante a este:

```text
OSError: cannot load library 'libpango-1.0-0'
```

significa que WeasyPrint está instalado como paquete Python, pero falta Pango. Solución **en Termux**:

```sh
pkg install pango
```

Solución **en Linux (camino pip)**:

```sh
sudo apt install libpango-1.*-* libpangoft2-1.*-*
```

Si falta también `libharfbuzz-subset0` (o su variante `libharfbuzz-subset0t64`), añadirla al mismo comando. Los comodines y la comprobación previa con `dpkg -l | grep pango` se explican en la sección 2.1.

Con el camino fácil de Linux (`apt install weasyprint`) este error no debería aparecer, porque `apt` resuelve las dependencias de Pango automáticamente.

Después, comprobar:

```sh
weasyprint --version
```

Este fue exactamente el problema encontrado durante la conversión de los informes de ejemplo en Termux.

### Error: `weasyprint not found`

Instalarlo con el método correspondiente al sistema:

```sh
# Linux (camino fácil)
sudo apt install weasyprint

# Linux (camino pip) o Termux
python3 -m pip install weasyprint
```

Si se instaló dentro de un entorno virtual, activarlo primero:

```sh
. .venv/bin/activate
```

### Error: `pandoc not found`

```sh
# Linux
sudo apt install pandoc

# Termux
pkg install pandoc
```

### Aparecen advertencias de CSS

WeasyPrint puede mostrar mensajes como:

```text
WARNING: Ignored ... unknown property
```

Muchas advertencias indican simplemente que una propiedad CSS propia de navegadores no se usa al imprimir. Si el comando termina correctamente y genera el PDF, normalmente no son errores fatales. La documentación de WeasyPrint confirma que muchas advertencias sobre propiedades no admitidas no impiden producir el documento. [Registro y advertencias de WeasyPrint](https://doc.courtbouillon.org/weasyprint/v53.4/first_steps.html#logging).

### El PDF tiene tablas demasiado anchas

Se puede reducir el tamaño de letra de las tablas en CSS:

```css
table {
  font-size: 8.5pt;
}

th, td {
  overflow-wrap: anywhere;
}
```

También conviene acortar textos largos o dividir una tabla grande en varias pequeñas.

### Caracteres españoles incorrectos

Guardar el Markdown y el CSS con codificación UTF-8 y utilizar:

```sh
--metadata lang=es
```

También debe estar instalada una fuente que contenga los caracteres necesarios. Las fuentes normales de Android suelen cubrir tildes, `ñ` y signos de apertura; en Linux, los paquetes `fonts-dejavu` o `fonts-liberation` cubren el español completo.

## 11. Verificar el resultado

Comprobar que el archivo existe:

```sh
ls -lh informe.pdf
```

Comprobar su tipo:

```sh
file informe.pdf
```

La salida debería contener algo parecido a:

```text
informe.pdf: PDF document, version 1.7
```

Abrirlo desde la terminal:

```sh
# Termux: lo abre en una aplicación de Android
termux-open informe.pdf

# Linux: lo abre en el visor de PDF del escritorio
xdg-open informe.pdf
```

## 12. Comando recomendado

Para la mayoría de informes en español con tablas, este es un buen punto de partida (idéntico en Linux y Termux):

```sh
pandoc informe.md \
  --standalone \
  --from=gfm \
  --metadata lang=es \
  --css=estilo-pdf.css \
  --pdf-engine=weasyprint \
  -o informe.pdf
```

Si se usa `estilo-pdf-editor.css` (sección 7) en lugar de `estilo-pdf.css`, las cajas de código quedan con el resaltado continuo estilo editor.

Sin una hoja de estilo personalizada:

```sh
pandoc informe.md \
  --standalone \
  --from=gfm \
  --metadata lang=es \
  --pdf-engine=weasyprint \
  -o informe.pdf
```

## 13. Resumen rápido

Instalación:

```sh
# Linux (Debian y derivados)
sudo apt install pandoc weasyprint

# Termux
pkg install python pandoc pango
python3 -m pip install weasyprint
```

Verificación:

```sh
pandoc --version
weasyprint --version
```

Conversión:

```sh
pandoc archivo.md --pdf-engine=weasyprint -o archivo.pdf
```

La distinción más importante es esta: **Pandoc interpreta y transforma el documento; WeasyPrint, con ayuda de Pango, lo representa gráficamente y crea el PDF.**

## Fuentes oficiales

- [Manual de Pandoc](https://pandoc.org/MANUAL.html)
- [Documentación de WeasyPrint](https://doc.courtbouillon.org/weasyprint/stable/)
- [Primeros pasos e instalación de WeasyPrint](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html)
- [Gestión de paquetes de Termux](https://github.com/termux/termux-packages/wiki/package-management)
