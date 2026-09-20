
# Convertir ayuda de programas HTML a MD y luego a DOCX y a PDF

**PROBLEMA.--** Tengo una carpeta que contiene el contenido de una carpeta de archivos de la ayuda de qt creator, quiero convertir cada archivo a markdown, pero hay varios archivos que usan las imagenes que están dentro de una carpeta "images" por lo cual al crear cada archivo markdown si el original html tenía una ruta que cargaba una imagen de "images" pues deberá recrearla para que cargue y poder ver la imagen

**SOLUCIÓN.-** Este script recorrerá la carpeta, convertirá cada archivo `.html` a `.md` y mantendrá los enlaces a las imágenes tal como solicitaste.

## Requisitos previos

Necesitas tener Python instalado. Además, necesitas instalar una librería muy útil llamada `python3-html2text` que se encarga de la conversión.

Este paquete está en Debian, Ubuntu

[packages.debian.org/python3-html2text](packages.debian.org/python3-html2text)

[packages.ubuntu.com/python3-html2text](packages.ubuntu.com/python3-html2text)

Abre tu terminal o consola de comandos y ejecuta:

```bash
sudo apt install python3-html2text
```

Para las personas que usen este script en Windows lo puedes usar así:

```bash
pip install html2text
```

## El Script de Conversión

Copia el siguiente código en un archivo llamado `convertir_html_a_md.py` y colócalo en la **misma carpeta** donde tienes todos tus archivos `.html` y la carpeta `images`.

```python
import os
import html2text

def convertir_html_a_markdown(directorio):
    # Configuramos el convertidor
    h = html2text.HTML2Text()

    # Opciones importantes para que la conversión se vea bien
    h.ignore_links = False       # No ignorar los enlaces
    h.ignore_images = False      # No ignorar las imágenes (clave para tu petición)
    h.body_width = 0             # 0 significa que no cortará las líneas automáticamente
    h.unicode_snob = True        # Manejo correcto de caracteres especiales (tildes, etc.)
    h.skip_internal_links = False

    print(f"Escaneando directorio: {directorio}")

    # Recorremos todos los archivos en el directorio actual
    for filename in os.listdir(directorio):
        # Procesamos solo si es un archivo .html
        if filename.lower().endswith(".html"):
            ruta_html = os.path.join(directorio, filename)

            # Definimos el nombre del archivo markdown (ej: archivo.html -> archivo.md)
            filename_md = os.path.splitext(filename)[0] + ".md"
            ruta_md = os.path.join(directorio, filename_md)

            print(f"Convirtiendo: {filename} -> {filename_md}")

            try:
                # Leemos el contenido HTML original
                with open(ruta_html, 'r', encoding='utf-8') as f:
                    contenido_html = f.read()

                # Convertimos el contenido HTML a Markdown
                contenido_md = h.handle(contenido_html)

                # Guardamos el nuevo archivo Markdown
                with open(ruta_md, 'w', encoding='utf-8') as f:
                    f.write(contenido_md)

            except Exception as e:
                print(f"Error al procesar {filename}: {e}")

    print("\n¡Conversión finalizada!")

if __name__ == "__main__":
    # Obtenemos la ruta del directorio donde se está ejecutando el script
    directorio_actual = os.getcwd()
    convertir_html_a_markdown(directorio_actual)
```

## Cómo funciona esto con las imágenes

Tú pediste: *"Si el original html tenía una ruta que cargaba una imagen de 'images' pues deberá recrearla para que cargue"*.

La librería `html2text` hace esto automáticamente:
1.  Si en el HTML original hay: `<img src="images/arrow_bc.png" ...>`
2.  El script generará en el Markdown: `
![...](images/arrow_bc.png)
`

**Importante:** Para que las imágenes se vean correctamente al abrir los archivos `.md`:
1.  Debes dejar los nuevos archivos `.md` en la **misma carpeta** donde estaban los `.html` (raíz).
2.  No debes mover ni renombrar la carpeta `images`.

## Instrucciones rápidas

1.  Guarda el código de arriba como `convertir.py` en la carpeta de la ayuda de Qt Creator.
2.  Abre una terminal en esa carpeta.
3.  Ejecuta: `python convertir.py`
4.  Verás cómo se generan los archivos `.md` uno por uno, conservando las referencias a la carpeta `images`.

---


# Convertir los archivos .md a .docx incluyendo las imagenes de la carpeta "images"

Para convertir de Markdown (`.md`) a Word (`.docx`) e **incrustar las imágenes** dentro del documento, usaremos la herramienta estándar **Pandoc** y usar un script de Python que invoque el comando directamente, forzando la ruta correcta de los datos.

## Paso 1: Instalar Pandoc y Pandoc-data en el sistema

Necesitas instalar la herramienta base "Pandoc" y sus archivos de datos esenciales. Abre tu terminal y ejecuta:

```bash
sudo apt update
sudo apt install pandoc pandoc-data
```

## Paso 2: El Script de Conversión

Este script usa `subprocess` para llamar a `pandoc` directamente. Es la forma más fiable de evitar errores de rutas en Linux.

Crea un archivo nuevo llamado `convertir_md_a_docx.py` en la misma carpeta donde tienes tus archivos `.md` y la carpeta `images`, y pega el siguiente código:

```python
import os
import subprocess

def convertir_md_a_docx(directorio):
    # La ruta que confirmaste que existe y tiene el archivo [Content_Types].xml
    ruta_datos_pandoc = '/usr/share/pandoc'

    print(f"Iniciando conversión en: {directorio}")
    print(f"Usando datos de Pandoc en: {ruta_datos_pandoc}\n")

    # Recorremos los archivos
    for filename in os.listdir(directorio):
        if filename.lower().endswith(".md"):
            ruta_md = os.path.join(directorio, filename)
            filename_docx = os.path.splitext(filename)[0] + ".docx"
            ruta_docx = os.path.join(directorio, filename_docx)

            if os.path.exists(ruta_docx):
                print(f"Omitiendo (ya existe): {filename_docx}")
                continue

            print(f"Convirtiendo: {filename} -> {filename_docx}")

            try:
                # Ejecutamos el comando 'pandoc' del sistema directamente.
                # --data-dir: le dice a pandoc dónde buscar sus plantillas (soluciona el error XML).
                # -f markdown: formato de entrada.
                # -t docx: formato de salida.
                command = [
                    'pandoc',
                    '-f', 'markdown',
                    '-t', 'docx',
                    '--data-dir', ruta_datos_pandoc,
                    ruta_md,
                    '-o', ruta_docx
                ]

                # Ejecutamos el comando
                subprocess.run(command, check=True)

            except subprocess.CalledProcessError as e:
                print(f"Error al convertir {filename}: Pandoc falló con código {e.returncode}")
            except Exception as e:
                print(f"Error inesperado con {filename}: {e}")

    print("\n¡Proceso terminado!")

if __name__ == "__main__":
    directorio_actual = os.getcwd()
    convertir_md_a_docx(directorio_actual)
```

### Cómo funciona este script con las imágenes

Al usar `subprocess` para llamar al binario de `pandoc`:
1.  Pandoc lee tu archivo `.md`.
2.  Encuentra referencias de imágenes tipo `
![texto](images/imagen.png)
`.
3.  Busca la carpeta `images` en el directorio actual.
4.  Convierte la imagen a un formato compatible con Word y la incrusta físicamente dentro del archivo `.docx`.

El argumento `--data-dir /usr/share/pandoc` es crucial. Le indica a Pandoc dónde encontrar la plantilla base `docx`, evitando el error de `Content_Types.xml` que ocurre cuando la librería no sabe dónde buscar estos archivos del sistema.

## Instrucciones finales

1.  Asegúrate de tener la carpeta `images` en el mismo lugar que los archivos `.md`.
2.  Asegúrate de haber instalado el paquete `pandoc-data`.
3.  Ejecuta el script:

```bash
python3 convertir_a_docx.py
```

El resultado serán archivos `.docx` independientes que contienen el texto y las imágenes listas para usar en LibreOffice Writer, Microsoft Word, etc.

Y después de convertirlos le recomiendo sacarlos de allí y ponerlos en una carpeta, para hacer esto lo más fácil es en el administrador de archivos dar clic en Tipo" y se ordenarán por Tipo y allí se los podrá seleccionar y copiar a todos.

---

# Usar FFmulticonverter para convertir todos los archivos DOCX a PDF

FFmulticonverter en la pestaña "Documentos" tiene la opción para convertir a pdf, y usará LibreOffice para eso

Debes de instalar FFmulticonverter, vea la siguiente entrada:

[https://facilitarelsoftwarelibre.blogspot.com/2020/10/como-instalar-ffmulticonverter-18-en-mx.html](https://facilitarelsoftwarelibre.blogspot.com/2020/10/como-instalar-ffmulticonverter-18-en-mx.html)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5jz7MEBUHXjmTGyUgAod29t1YOYyYiDhkiCwaKhU52AQSpppgSAUIN-6pE7EvqdmckMb90eD6gelcVexnOUm3YqlOOjmk4VayiOQcNLcxiZ7Wk9DiHEW53wriTtbQNVKYWZ_6SkOwNNBkNCR0Wo3HxsCUdbWWL98xLv8eYxiJbV0vE7D07fTBm2_OYxI/s794/usar%20FFmulticonverter%20para%20convertir%20los%20archivos%20docx%20a%20pdf.png)

luego de instalado da clic en el botón "Añadir" y busca la carpeta donde estén los archivos DOCX, y busca una "Carpeta de salida" para que allí estén todos los PDF

