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
