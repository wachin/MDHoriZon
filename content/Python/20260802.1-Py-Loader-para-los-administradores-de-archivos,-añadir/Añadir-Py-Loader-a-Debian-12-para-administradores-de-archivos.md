# Añadir el lanzador **Py-Loader** (Debian anteriores a 13)

## Añadir el lanzador Py-Loader para Debian 12 para abrir programas python *.py con clic derecho en los Administradores de archivos

He encontrado en MX Linux y además en **Debian 13 (Trixie)**, un pequeño lanzador llamado **Py-Loader**, que permite ejecutar programas escritos en Python directamente desde el administrador de archivos.

Gracias a este lanzador, al hacer clic derecho sobre un archivo `.py` y seleccionar **Propiedades → Abrir con → Otra aplicación**, aparece la opción **Py-Loader**, que ejecuta el programa utilizando Python 3.

Si estás utilizando una versión anterior de Debian y dicha opción no existe, puedes añadirla manualmente.

## Crear el archivo `Py-Loader.desktop`

Ejecuta:

```bash
sudo nano /usr/share/applications/Py-Loader2.desktop
```

Pega el siguiente contenido (tomado de Debian 13 y añadida la línea final hace que el lanzador quede correctamente registrado para el tipo MIME de los scripts Python y mejora la compatibilidad con otros administradores de archivos, sin alterar su funcionamiento):

```ini
[Desktop Entry]
Encoding=UTF-8
Type=Application
Name=Py-Loader
Comment=Launch Python scripts
Exec=python3 %f
Icon=/usr/share/pixmaps/python3.xpm
Terminal=false
NoDisplay=true
Categories=Development;
MimeType=text/x-python;
```

Guarda el archivo y sal del editor.

## Asignar el lanzador a los archivos Python

1. Abre **Thunar**.
2. Haz clic derecho sobre cualquier archivo `.py`.
3. Selecciona **Propiedades**.
4. Ve a la pestaña **Abrir con**.
5. Pulsa **Otra aplicación...**.
6. Busca **Py-Loader**.
7. Selecciónalo y pulsa **Aceptar**.
8. (Opcional) Márcalo como aplicación predeterminada para los archivos Python.

A partir de ese momento podrás abrir los archivos `.py` directamente desde el administrador de archivos.

## Funcionamiento

El lanzador simplemente ejecuta:

```bash
python3 archivo.py
```

Por ello está pensado principalmente para aplicaciones gráficas desarrolladas con:

* PyQt5
* PyQt6
* PySide2
* PySide6
* GTK para Python
* Tkinter

Si el programa es una aplicación de consola, no se abrirá una terminal, ya que el lanzador utiliza:

```ini
Terminal=false
```

Para scripts de consola se recomienda ejecutarlos desde una terminal.

## Actualizar la base de datos de aplicaciones (opcional)

En algunas versiones antiguas de Debian puede ser necesario actualizar la caché de aplicaciones:

```bash
sudo update-desktop-database /usr/share/applications
```

Si el comando no existe:

```bash
sudo apt install desktop-file-utils
```

---

### Nota técnica

El archivo `Py-Loader.desktop` es un lanzador estándar de **Freedesktop.org**. Su finalidad es asociar los archivos de tipo `text/x-python` con el intérprete `python3`, permitiendo que administradores de archivos compatibles (como Thunar, Caja, Nemo o PCManFM) puedan ofrecer la opción de abrir scripts Python mediante este lanzador.

---

