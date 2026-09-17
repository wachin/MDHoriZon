# Bienvenidos a este tutorial para instalar el convertidor de archivos que es mi preferido

## Probado en:

* MX Linux 19, 21, 32
* antiX 19, 21, 23
* Sistemas Operativos Linux basados en Debian 10, 11, 12
* 32 y 64 bits

Puede funcionar en más actuales

---

### Dependencias necesarias

Necesitas tener instalado los paquetes:

```bash
sudo apt install unoconv ffmpeg imagemagick libreoffice
```

cada tipo de conversión necesita su motor.

* Para **audio/video** Necesitas: ffmpeg
* Para **imágenes**  imagemagick
* Para **documentos** unoconv libreoffice

---

## Descargar FFmulticonverter 1.8 (.deb) para sistemas basados en Debian

Diríjase a la siguiente dirección:

[https://www.deb-multimedia.org/pool/main/f/ffmulticonverter-dmo/](https://www.deb-multimedia.org/pool/main/f/ffmulticonverter-dmo/)

![Descarga FFmulticonverter](https://blogger.googleusercontent.com/img/a/AVvXsEhjiO6UhekChKdLZh6xFAW6_1gvJbSx0QMF0J1kcEXwnYT7PcePhqU3QYEFlPbtPHiMgSz7BPFgQ-mORO6l7mk9BOiS6Q5nXTvdgiT7bzXk74yn-ftMCv9bExIEklMYgQtWdyC6YCadYVDVkKNja3ED6NMmM4mzFO8XznVxC_i5G1B7n3u_sPVvctdj=s16000)

Sirve tanto para 32 o 64 bits

---

Si usan Google Chrome o Chromium aparecerá este aviso:

![Advertencia descarga](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4rn3-QZtXnMRenEb6YYuKqcIcZ1D1U7GsVqMXwfL0QwrnLrlKCX4-kVnNt0GnlbniN-sLgGwycI-rqqM4-wg39czHDY4l3Vj-ki4uiWaR06xXiDfJnnszIp-qu2bWc-ZmCMA7TFFq-chlyE9eMChODiSFkdJsqN7R7jqq3Lvsdl_UNi2703TmBR1U/s16000/Este%20tipo%20de%20archivo%20puede%20da%C3%B1ar%20tu%20computadora.png)

El mensaje dice:

> "Este tipo de archivo puede dañar tu computadora. ¿Quieres descargar ffmulticonverter... deb de todos modos?"

Ese mensaje es una advertencia general que aparece al descargar archivos ejecutables, como los archivos `.deb` en sistemas Linux.

Los archivos `.deb` contienen paquetes instalables, y si provienen de fuentes no confiables, podrían contener software malicioso.

La advertencia **no significa necesariamente que el archivo sea peligroso**, sino que debes verificar su procedencia.

Para mayor seguridad puedes analizar el sitio en:

[https://www.virustotal.com/](https://www.virustotal.com/)

Ejemplo del análisis:

![VirusTotal sitio](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhW4GiG6WvwmdSY2KP3YBOGl4xNhFSNiH2GvNhfbrtEdSX6LZ2np3xgQ1CoeG8hNcpkZreOWmGQmK1q3lebugSpQAqcZ5QrtY2ScPj0j4LNGXM0jbjfklvDO38JhU9QXY0azz2H3H6_2AmJ8sh4B46u9YeUrtJLZSU5MQUyhtpQAU_49XSRp37letGknno/s16000/20240731-120507%20de-multimedia.org%20limpio%20en%20virustotal.png)

Y también del archivo `.deb`:

![VirusTotal deb](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgA8RlgYG5KApMnPZt55UGMNtTWAHufms0vMNdkfiKqVu-cHADlZNWwyNF0Ka-Ox5PkEehuHmVmd13e4K7-1O65EDtXmQUjMCR6lIAgDCwRFHQ9LkpDuk6p3esvEpn_wIq56Ro9jy4bWcOuhyphenhyphen_ZoH7FNmEZVNBfML15UyuZFBmVPboP4_8MPlRqBu0DzXc/s16000/20240731-120311%20FFmulticonverter%20limpio%20en%20virustotal.com.png)

Como en la imagen, clic en **Conservar**.

---

## Instalación del paquete

Si no sabes cómo instalar un `.deb`, puedes ver este tutorial:

**Cómo instalar paquetes DEB con gdebi o Dolphin:**

[https://facilitarelsoftwarelibre.blogspot.com/2016/09/instalar-paquetes-deb-con-gdebi.html](https://facilitarelsoftwarelibre.blogspot.com/2016/09/instalar-paquetes-deb-con-gdebi.html)

Aquí instalado:

![Programa instalado](https://blogger.googleusercontent.com/img/a/AVvXsEjyCLIjX9WUhjeWSA0HPIXlaDZKR65ZYmBiEOdpaJIdIzeASZCQXyjIq2wDiyizqEGoludb1SeFcfmOajC4fSsP4GPHR5PtZRXk5nOig7SmSYKD80Axf2XBB2ev9vZ8c8JkmbQcedW-Ve82IO279EvHhFTAK2VEDPCViAf4LrxyYmujpH3nyT_ve-Ua=s16000)

Estará entre los iconos de las aplicaciones:

![Icono aplicación](https://blogger.googleusercontent.com/img/a/AVvXsEhEbBxG5LaAkQ1S90GtwkoV36_ofhLHOhW6rUC6B1N4KOxhtKR9A8LSt0HnnOGsJaIj7AnZISJDqTa8GlAgldRzpqY95xaPK-5XKrYC2V-c90bCuxjeOREvn1WDynJfviBaheAymV35i4tv2-vvtq3Bax7kfkUwCS5L-B3qHGm-nZbkAGvBlhCdGe_O=s16000)

---

<!--more-->

## Posibles errores con FFmulticonverter

Si antes habías instalado otra versión, puede que no funcione correctamente.

Puedes ejecutarlo desde la terminal para ver errores:

```bash
ffmulticonverter
```

Si aparece este error:

```
qt5ct: using qt5ct plugin
qt5ct: D-Bus global menu: no
Traceback (most recent call last):
  File "/usr/bin/ffmulticonverter", line 5, in <module>
    ffmulticonverter.main()
  File "/usr/lib/python3/dist-packages/ffmulticonverter/ffmulticonverter.py", line 475, in main
    converter = MainWindow()
  File "/usr/lib/python3/dist-packages/ffmulticonverter/ffmulticonverter.py", line 211, in __init__
    self.load_settings()
  File "/usr/lib/python3/dist-packages/ffmulticonverter/ffmulticonverter.py", line 275, in load_settings
    audiocodecs, extraformats_video)
  File "/usr/lib/python3/dist-packages/ffmulticonverter/audiovideotab.py", line 267, in fill_video_comboboxes
    self.vidcodecQCB.addItems([self.defaultStr, self.DisableStream] + vcodecs)
TypeError: can only concatenate list (not "str") to list
```

---

## SOLUCIÓN

Borra la carpeta de configuración:

```
~/.config/ffmulticonverter/
```

Para verla:

* Thunar / Nautilus: `Ctrl + H`
* Dolphin: `Alt + .`

![Archivos ocultos](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQT7E6dfjsCMjm10uT3e_6FfpV9W8uzdi3FP6yaeesZgCZ4iZdKghr-QeArOV_kqcpN0DUfW-GHQaOOYr-cEDk0qA8I2ycSLGIdKcM7B0T1nYVyOnlBmkgaMHJ7oX4nwI5N5XLYpvl4W8/s16000/20210314-180639.png)

Encuéntrala y bórrala:

![Eliminar carpeta](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhT9aA4yG8uNbfnVchPUeNZk9GdSmbeQaBv7qW7eRf10kMJFskDkPsbE6Txfm3siolG2BoYfg18KM4hiW5dkl5yorRREHLJawaIzkwu33US1ZWDFY39d6ovmN6IOB9eAiq8SBfcsYhWvX4/s16000/20210314-180714.png)

# FFmulticonverter no convierte “por sí solo”

Es una interfaz gráfica que junta tres motores distintos:

* **FFmpeg** para **audio y video**
* **ImageMagick** para **imágenes**
* **unoconv / LibreOffice** para **documentos**

el programa tiene mucho potencial: realmente es una “puerta gráfica” para herramientas muy potentes.

# FFmulticonverter 1.8 en Linux: guía completa para aprovechar todo su potencial

FFmulticonverter es un programa gráfico para Linux que permite convertir archivos de **audio, video, imágenes y documentos** desde una sola interfaz.

Su gran ventaja es que simplifica tareas que normalmente habría que hacer desde terminal con herramientas como **ffmpeg**, **ImageMagick** y **unoconv**.

No es solo un convertidor básico. También permite:

* convertir **muchos archivos en lote**
* cambiar formato
* redimensionar video e imágenes
* cambiar bitrate, frecuencia y canales de audio
* recortar fragmentos de video o audio
* incrustar subtítulos
* rotar o voltear videos e imágenes
* usar **presets**
* guardar los archivos en la misma carpeta o en otra
* poner **prefijo** o **sufijo** a los nombres
* borrar el archivo original al terminar
* incluso apagar el equipo al finalizar la conversión

---

## ¿Qué puede convertir FFmulticonverter?

FFmulticonverter está dividido en **tres pestañas principales**:

* **Audio/Video**
* **Images**
* **Documents**

Cada pestaña usa un motor diferente.

---

## 1. Conversión de audio y video

Esta parte usa **FFmpeg**, y es probablemente la más potente del programa.

### Formatos de salida de audio/video disponibles por defecto

Entre los formatos que aparecen en el código fuente están:

* `3g2`
* `3gp`
* `aac`
* `ac3`
* `avi`
* `dv`
* `flac`
* `flv`
* `m4a`
* `m4v`
* `mka`
* `mkv`
* `mov`
* `mp3`
* `mp4`
* `mpg`
* `ogg`
* `vob`
* `wav`
* `webm`
* `wma`
* `wmv`

Eso significa que el programa sirve tanto para:

* convertir video a video
* extraer audio
* convertir audio a otros formatos
* convertir video a audio
* generar archivos compatibles con celulares, reproductores y otros equipos

---

## 2. Qué se puede ajustar en audio/video

La pestaña de audio/video no solo cambia la extensión. También permite modificar parámetros reales de codificación.

### Opciones principales

#### Convertir a:

Aquí eliges el formato final, puedes elegir uno de la lista de arriba

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhA-jQ5H4THXg-TcNd9HNEnAOakuxNXX_4XTGzYIUb3RDx0tYk4horIecvoRVCHoA0xLM_SieJ9vaZmEFyVmfk3Mx_R9rgKsK0HdDSKsc1jlGFJ3D-5c4jqu4RWIsaEpiL6HcmCM2EEkN-EOazmU5mlsU4lCJ9R9q3TkAxhRDN_eOBfFdPaNkOH9H5e2TQ/s825/Pestaña%20Audio_Video,%20Convertir%20a.png)

#### Video codec

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQsL99Ma6mVuL1mnBs2TtAH2OF6GB2MXZBNhbPDsJISW1K9K6S4i7XgKGA_Z0l7nH78dAjj42PwSm9wmLvuCFzPqGf8tDRlL-1AuOFxQC2DCI1ONUS791j8hnzPCVEpQnWArbD9vbK3EoFt2fdfTkVXdugjBbM5W6iYyQ-TAzPotxzc5s2qSgF1MUvRmw/s569/Pestaña%20Audio_Video,%20Video%20codec.png)

Puedes elegir el códec de video, por ejemplo:

* `Por defecto`
* `Desactivar`
* `copy`
* `flv`
* `h263`
* `libvpx`
* `libx264`
* `libxvid`
* `mpeg2video`
* `mpeg4`
* `msmpeg4`
* `wmv2`

Como ves también permite `Desactivar`esto es importante porque esta opción permite quitar el video, útil cuando quieres extraer solo audio.

#### Audio codec

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmDR-SecKOQkCrNSWEHzeQKZLEljym5c3eezKY36Iqktsc2y_cwHTHBmi_R4ZJ-UI2m3f17FEx0fjn9PAi32EoXwyLiBtJ1EcLCEx4MemiVDGNKvcoSPoDd4b8fm-IKdBjW5sdtCWoAHqAOz7JXJuk9LgeN7ggidQy9O834UGDJjPiCF741HGTrGiKcJk/s640/Pestaña%20Audio_Video,%20Audio%20codec.png)

Se puede elegir:

* `Por defecto`
* `Desactivar`
* `aac`
* `ac3`
* `copy`
* `libfaac`
* `libmp3lame`
* `libvo_aacenc`
* `libvorbis`
* `mp2`
* `wmav2`

Igual aquí existe la opción **Desactivar**, útil para dejar un video sin audio.

---

## 3. Ajustes avanzados de audio/video

Al pulsar **More**, el programa muestra muchas opciones extra:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOsMEY5kkPRISRW6dLrbiiigAQEkC4iToSqcJ09S8MYIl8qbD3-yxHp8eWDlh9BuFfdcWD3r5x2FrZELqf3049FTlJj2f-ZcA45W7EUt8KamcwFVzpwZSCaO243-JXxIbsR2lFdhVQO1cS2wQsT5Ummbgazkuhow14E8r1gKtFT9rDtCt-RqyexYKFnHY/s807/FFmulticonverter,%20pestaña%20Más.png)

### Tamaño del video (Video Size)

Permite cambiar resolución manualmente, por ejemplo escribir:

* 1280x720
* 854x480
* 640x360

Estos son solo ejemplos, hay muchas resoluciones que puede escribir. También puede trabajar con `-1` para conservar proporciones en ciertos casos.

### ☐ Preservar la relación de aspecto (Preserve aspect ratio)

Si lo marcas, sirve para mantener la proporción del video al redimensionar.

### ☐ Preservar el tamaño del video (Preserve video size)

Si lo marcas, sirve para conservar el tamaño original y evitar cambios de resolución.

### Aspecto (Aspect)

Permite fijar una relación de aspecto manual, por ejemplo:

* 4:3
* 16:9

### Frame Rate (fps)

Permite cambiar los fotogramas por segundo.

Ejemplos:

* 24
* 25
* 30

y el que usted desee escribir.

### Bitrate de video (kbps)

Permite controlar el bitrate de video.

Ejemplo:

* 800
* 1200
* 2500

Recomendado ver la siguiente entrada:

**Excelente compresión de video de Kdenlive y clipchamp.com, usar resultados de comparación para comprimir videos en VLC 3**  
[https://facilitarelsoftwarelibre.blogspot.com/2018/07/kdenlive-tiene-buena-compresion-de.html](https://facilitarelsoftwarelibre.blogspot.com/2018/07/kdenlive-tiene-buena-compresion-de.html)  

### Frequencia (Hz)

Para el audio ofrece:

* 22050
* 44100
* 48000

### Canales de Audio (Audio Channels)

Permite elegir:

* 1 canal mono
* 2 canales estéreo

### Bitrate de Audio (kbps)

Valores disponibles:

* 32
* 96
* 112
* 128
* 160
* 192
* 256
* 320

### Hilos (Threads)

Permite definir cuántos hilos usará FFmpeg.

### Dividir el fichero. Momento de inicio (hh:mm:ss)

Sirve para indicar desde qué momento empezar.

Ejemplo:

`00:01:30.0`

### Duration (hh:mm:ss)

Sirve para indicar cuánto durará el fragmento exportado.

Ejemplo:

`00:00:20.0`

Con esto puedes **recortar un fragmento** de un video o audio sin necesidad de otro editor.

### Incrustar subtítulos

Permite incrustar subtítulos en formatos como:

* `.srt`
* `.sub`
* `.ssa`
* `.ass`

Esto es muy útil para crear videos subtitulados “quemados” en la imagen.

### Girar

Permite:

* No (sin rotación)
* 90° horario
* 90° horario + volteo vertical
* 90° antihorario
* 90° antihorario + volteo vertical
* 180°
* invertir horizontal
* invertir vertical

---

## 4. Presets: una de las funciones más potentes

FFmulticonverter trae una función de **presets**, que en la práctica son configuraciones ya preparadas.

En el archivo `presets.xml` del código fuente [https://www.deb-multimedia.org/pool/main/f/ffmulticonverter-dmo/](ffmulticonverter-dmo_1.8.0.orig.tar.gz) trae **121 presets**.

Esto es excelente porque permite convertir a perfiles ya listos para distintos dispositivos o usos, sin tener que saber comandos de FFmpeg.

### Algunas categorías incluidas

* Rockbox
* DVD
* Mobile Phones
* iPod / iTunes
* Neuros OSD
* Audio
* Blackberry
* MPEG-4
* Nokia
* Google
* WMV
* AVI
* Google Android
* QuickTime
* Palm
* Creative Zen
* DV
* Websites
* LG
* VCD
* PS3
* PSP
* walkman

### ¿Para qué sirven los presets?

Por ejemplo, pueden servir para:

* convertir un video a un perfil compatible con un celular antiguo
* generar MP4 en H.264
* extraer audio a M4A o MP3
* preparar video para dispositivos concretos
* usar configuraciones listas de calidad, resolución y bitrate

### Además puedes:

* elegir un preset
* editar presets
* importar presets
* exportarlos
* restaurar los presets por defecto
* sincronizarlos
* eliminar presets antiguos

Eso hace que FFmulticonverter sea muy interesante también para usuarios avanzados.

---

## 5. Conversión de imágenes

La pestaña **Images** usa **ImageMagick**

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGhbwl8yASrARDKZJIye4qBak0bUfrMQ31ZqwkeSw5r1KPV8lIjPD5K_G9tMQ5B49KyDhCaugapCnu6RCKhHxpfmND9_p1yNaNEFxBW0V37pFZ00Agr1pacwXfAcrOVJ5WNeiYRT-KXfOhemyXUJoUVmuuHAHZdGMnHrYQpUEozLh5HJDiXeRA6brzYHw/s809/Pestaña%20Imágenes.png)

### Formatos de salida de imagen disponibles por defecto

En el código aparecen estos:

* `bmp`
* `cgm`
* `dpx`
* `emf`
* `eps`
* `fpx`
* `gif`
* `jbig`
* `jng`
* `jpeg`
* `mrsid`
* `p7`
* `pdf`
* `picon`
* `png`
* `ppm`
* `psd`
* `rad`
* `tga`
* `tif`
* `webp`
* `xpm`

También maneja formatos extra como:

* `jpg`
* `jpe`
* `png24`
* `png32`
* `pnm`
* `pgm`
* `tiff`
* `bmp2`
* `bmp3`
* `dib`
* `icon`
* `ps`
* `ps2`
* `ps3`
* `eps2`
* `eps3`
* `epsf`
* `epsi`
* `epi`
* `epdf`
* `sid`

---

## 6. Qué se puede hacer con imágenes

### Convertir a:

Eliges el formato final.

### Opciones extra:

Aquí puedes poner opciones adicionales de ImageMagick manualmente.

### Tamaño de la imagen

Permite cambiar ancho y alto.

### ☐ Mantener la proporción de aspecto

Si lo marcas, mantiene la proporción al redimensionar.

### Recorte automático (Auto-crop)

Activa `-trim +repage`, útil para recortar bordes automáticos.

### Girar

Permite rotar en grados en sentido horario

### Inversion vertical

Voltea verticalmente.

### Inversion horizontal

Voltea horizontalmente.

En otras palabras, no solo sirve para “pasar de PNG a JPG”, sino también para hacer ajustes básicos de transformación.

---

## 7. Conversión de documentos

La pestaña **Documentos** usa **unoconv**, que a su vez depende de LibreOffice / OpenOffice para abrir y convertir documentos:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEha9egPYgLBbfwCwqWpPvQ3U2R6df1eGnhuPSZAvAffB1E5iyM_zEUyecFDe6VWka0BLIOR6QtyhxIX0n21zzTDfEKqrePuz4yLpHq5q7Gb9A2Mq_eAOhlg0YOlhPyWCakyZotYi5XVDFaUoXYkwk8r9m3m3_ugJTmR9JwQ4ao2VhwZM2s4TMbRHWQBWiU/s813/Pestaña%20Documentos,%20Convert%20to.png)

### Formatos de documentos disponibles por defecto

* `bib`
* `csv`
* `dif`
* `doc`
* `docx`
* `html`
* `ltx`
* `odp`
* `ods`
* `odt`
* `pdf`
* `ppt`
* `pptx`
* `rtf`
* `sdc`
* `sdw`
* `txt`
* `xls`
* `xlsx`
* `xml`

### Ejemplos de conversiones posibles

* DOCX a PDF
* DOCX a ODT
* ODT a DOCX
* XLSX a PDF
* PPTX a PDF
* TXT a ODT
* CSV a XLS
* ODS a XLSX

Aquí conviene aclarar algo importante:

**La conversión real de documentos depende de lo que LibreOffice/unoconv sea capaz de abrir y exportar correctamente.**
O sea, el programa ofrece la interfaz, pero el resultado puede variar según el tipo de documento.

---

## 8. Trabajo por lotes

Una característica muy útil es que permite agregar **varios archivos a la vez**.

Puedes hacerlo de varias formas:

* con el botón **Add**
* seleccionando varios archivos en el diálogo
* arrastrando archivos a la ventana

Luego convierte uno tras otro y muestra progreso.

Eso lo hace muy útil para:

* convertir una carpeta de imágenes
* pasar muchos audios a MP3
* convertir varios documentos a PDF
* normalizar una colección de videos a MP4

---

## 9. Carpeta de salida y nombres de archivo

El programa permite varias formas de guardar el resultado.

### Output folder

Puedes elegir una carpeta de salida específica.

### Save each file in the same folder as input file

Guarda cada archivo convertido en la misma carpeta del original.

### Delete original

Borra el archivo original cuando la conversión termina.

Aquí conviene advertir al lector que esta opción debe usarse con cuidado.

---

## 10. Prefijo, sufijo y archivos existentes

En **Preferences** encontré varias funciones muy útiles.

### Existing files

Si el archivo de salida ya existe, el programa puede:

* **sobrescribirlo**
* o agregar un prefijo `~`

### Prefix

Permite añadir un texto al inicio del nombre.

Ejemplo:

* `convertido_`

### Suffix

Permite añadir texto al final.

Ejemplo:

* `_nuevo`

Esto es excelente para organizar archivos y evitar confusiones.

---

## 11. Formatos extra personalizados

Una función poco visible pero muy poderosa es que en **Preferences** se pueden añadir:

* formatos extra de audio/video
* formatos extra de imagen
* formatos extra de documentos
* códecs extra de video
* códecs extra de audio

Eso significa que el programa no está totalmente cerrado a sus listas por defecto.

Si el backend lo soporta, el usuario puede ampliar bastante las posibilidades.

---

## 12. Comandos personalizados

Otra parte muy potente es el campo:

* **Command** en audio/video
* **Extra options** en imágenes

Eso permite que un usuario avanzado use FFmulticonverter como interfaz gráfica, pero sin renunciar a comandos personalizados.

Por ejemplo, un usuario que ya conoce FFmpeg puede ajustar:

* filtros
* codificación
* calidad
* parámetros extra

Y luego convertir desde la interfaz sin escribir todo cada vez.

---

## 13. Registro, detalles y seguimiento

Mientras convierte, el programa muestra:

* archivo actual
* progreso
* detalles de salida
* cantidad convertida
* errores

Además, guarda historial en:

```bash
~/.config/ffmulticonverter/logs/history.log
```

Eso es muy útil para diagnosticar fallos.

---

## 14. Apagar el equipo al terminar

En la ventana de progreso vi una opción muy interesante:

* **Shutdown after conversion**

Esto sirve para conversiones largas, por ejemplo:

* muchos videos
* lotes grandes de imágenes
* trabajos nocturnos

---

## 15. Qué tipo de usuario puede aprovecharlo más

FFmulticonverter sirve bien para varios perfiles:

### Usuario básico

Para:

* cambiar MP4 a MP3
* pasar PNG a JPG
* convertir DOCX a PDF

### Usuario intermedio

Para:

* cambiar bitrate
* recortar clips
* reescalar videos
* convertir lotes grandes

### Usuario avanzado

Para:

* usar comandos FFmpeg personalizados
* crear presets
* importar/exportar configuraciones
* ampliar formatos y códecs en preferencias

---

## 16. Ventajas reales del programa

### Lo mejor de FFmulticonverter

* interfaz gráfica sencilla
* convierte varios tipos de archivo desde un solo programa
* permite trabajo por lotes
* usa herramientas potentes por debajo
* tiene presets
* permite ajustes avanzados
* sirve tanto para usuarios normales como avanzados

---

## 17. Limitaciones que sí conviene mencionar

Para que tu tutorial sea honesto, yo añadiría también esto:

### No todo depende solo de FFmulticonverter

Si algo falla, muchas veces no es por la interfaz, sino por:

* FFmpeg
* ImageMagick
* unoconv
* LibreOffice
* códecs faltantes
* formatos mal soportados

### Algunos perfiles están pensados para dispositivos antiguos

Muchos presets del programa están orientados a:

* Blackberry
* iPod antiguos
* teléfonos viejos
* Rockbox
* PSP
* PS3

Aun así siguen siendo útiles como ejemplo o punto de partida.

---

## 18. Ejemplos prácticos para poner en el tutorial

Aquí tienes ideas de usos reales que puedes añadir como secciones.

### Convertir video MP4 a audio MP3

1. Abrir FFmulticonverter
2. Añadir el archivo MP4
3. Ir a Audio/Video
4. Elegir `mp3`
5. En **Video codec** poner **Disable**
6. Convertir

### Convertir varias imágenes PNG a JPG

1. Añadir varias imágenes PNG
2. Ir a Images
3. Elegir `jpg` o `jpeg`
4. Elegir carpeta de salida
5. Convertir

### Convertir un DOCX a PDF

1. Añadir el DOCX
2. Ir a Documents
3. Elegir `pdf`
4. Convertir

### Recortar un fragmento de video

1. Añadir video
2. En Audio/Video abrir **More**
3. En **Begin time** poner por ejemplo `00:01:00.0`
4. En **Duration** poner por ejemplo `00:00:30.0`
5. Elegir formato final
6. Convertir

### Incrustar subtítulos

1. Añadir video
2. En Audio/Video abrir **More**
3. En **Embed subtitle** seleccionar un `.srt`
4. Elegir salida
5. Convertir

### Redimensionar imágenes

1. Añadir imagen
2. Ir a Images
3. Escribir ancho y alto
4. Marcar **Maintain aspect ratio** si quieres mantener proporción
5. Convertir

---

## 19. Texto sugerido para cerrar tu entrada

Puedes usar algo como esto:

> FFmulticonverter es mucho más que un simple convertidor de formatos.
> Su verdadero valor está en que reúne en una sola interfaz gráfica la potencia de FFmpeg, ImageMagick y unoconv, permitiendo convertir audio, video, imágenes y documentos con opciones tanto básicas como avanzadas.
>
> Es una herramienta especialmente útil para usuarios de Linux que quieren productividad, conversiones por lotes y un mayor control, sin depender siempre de la terminal.

---

## Mi recomendación para mejorar tu tutorial actual

Tu tutorial actual está bien para **instalarlo**, pero le faltan estas partes:

* una explicación clara de que tiene **3 motores diferentes**
* una sección con **todo lo que puede convertir**
* una sección con **las opciones avanzadas**
* ejemplos prácticos paso a paso
* advertencias honestas sobre dependencias y compatibilidad
* explicación de presets
* explicación de preferencias
* una parte sobre trabajo por lotes
* una parte sobre registro de errores y logs

---

