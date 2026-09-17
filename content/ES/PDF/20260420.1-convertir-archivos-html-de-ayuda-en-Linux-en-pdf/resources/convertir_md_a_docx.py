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
