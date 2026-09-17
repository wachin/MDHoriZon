# Actualización Mayo 2026: Hackean a JDownloader

Me encontré con esta noticia:

<iframe width="560" height="315" src="https://www.youtube.com/embed/DucB7993d1s" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

En el minuto **2:12** de:

[https://www.youtube.com/watch?v=DucB7993d1s](https://www.youtube.com/watch?v=DucB7993d1s)

**Nota:** En el canal se menciona este enlace:

[https://hipertextual.com/seguridad/jdownloader-web-hackeada-malware-instaladores/](https://hipertextual.com/seguridad/jdownloader-web-hackeada-malware-instaladores/)

---

> "Si usas JDownloader para tus descargas, ten mucho cuidado porque su web oficial fue hackeada.
>
> La cosa está así: el equipo de desarrollo confirmó que atacantes aprovecharon una vulnerabilidad en el servidor que permitía modificar permisos sin autenticación.
>
> Con esto reemplazaron los enlaces de descargas originales por instaladores maliciosos entre el **6 y el 7 de mayo**.
>
> El detalle técnico para detectar la infección es el nombre del editor.
>
> El instalador legítimo es de **AppWork**, pero el infectado aparece firmado por una tal **Zipline LLC**.
>
> En Linux, el script de Shell fue modificado directamente con código dañino.
>
> Una vez ejecutado, el malware desactiva Windows Defender por completo para operar sin obstáculos.
>
> Lo bueno es que las actualizaciones internas de la aplicación y la versión de macOS o plataformas como Flatpak no fueron afectadas porque usan infraestructuras separadas con firma SHA256.
>
> Es el clásico ataque de cadena de suministro donde el usuario confía porque está descargando el software desde el sitio oficial.
>
> Si descargaste el programa en esos días, haz un escaneo profundo inmediatamente.
>
> ¿Tú revisas la firma digital de los ejecutables antes de instalarlos o vas directo al grano?"

---

Les cuento que yo descargué JDownloader el **4 de mayo de 2026** y lo instalé. Recién me doy cuenta de esto el **11 de mayo de 2026**.

Todavía tengo el instalador y lo subí a:

[https://virustotal.com](https://virustotal.com)

![JDownloader 4 de mayo 2026 no tiene virus](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-4dOf8xWQhUWBVqiIsGQuD43ah4JssISg4zs0Rvd4zzwz0H0sGUkccsMj2W62YOa6epnLubRPqQlEBya9QJK5kIWvI_GcDLP0DJfIeLoR1Md-w6j1gN4ziJ0ezDWCHIatsSYBIE_0sEaYVf_GVPx9HkQzzCF6fFnZhPQxwyQY29trI_-A8FPp4bxsuS4/s16000/Jdownloader%204%20de%20mayo%202026%20no%20tiene%20virus.png)

Aquí dejo el resultado, no tiene virus:

[https://www.virustotal.com/gui/file/ad3c67f62e526ada0705958cc772be9b853651287fa43e76ccfdd26bf02a2980](https://www.virustotal.com/gui/file/ad3c67f62e526ada0705958cc772be9b853651287fa43e76ccfdd26bf02a2980)

Todavía conservo el instalador y la próxima semana volveré a escanearlo, por si luego detectan algo nuevo.

De todas formas, ya le di clic al botón de **Actualizar** dentro de JDownloader.

---

# Cómo verificar si tu instalador es el malicioso (Método Oficial)

Aparte de VirusTotal, la forma más segura de verificar si el archivo es legítimo es comparando la firma digital (**Hash SHA256**) con la lista oficial publicada por los desarrolladores.

Les recomiendo entrar a este enlace oficial donde detallan el incidente (copié este enlace de la ventanita que aparece  -fecha de consulta 2026-05-13):

[https://jdownloader.org/lib/scripts/incident_8.5.2026.html?v=20260508277000](https://jdownloader.org/lib/scripts/incident_8.5.2026.html?v=20260508277000)

En esa página verán una sección llamada:

**Known malicious file indicators**

(Indicadores conocidos de archivos maliciosos)

Ahí aparece una tabla con códigos SHA256.

Si el código de tu archivo coincide con alguno de los publicados allí, **tu archivo tiene virus** y debes eliminarlo inmediatamente.

Si es diferente, estás a salvo.

## Cómo obtener el SHA256 en Linux

Abre una terminal en la carpeta donde está el archivo y ejecuta:

```bash
sha256sum nombredelarchivo.sh
```


## Cómo obtener el SHA256 en Windows

Windows también tiene una herramienta integrada llamada PowerShell. Haz
lo siguiente:

1.  Ve a la carpeta donde descargaste el instalador (.exe).
2.  En la barra de direcciones de arriba (donde dice la ruta de la
    carpeta), haz clic y escribe `powershell`, luego presiona la tecla
    **Enter**. Se abrirá una ventana azul.
3.  Escribe el siguiente comando (cambia el nombre del archivo por el
    que tú tengas):

```powershell
Get-FileHash JDownloader2Setup.exe -Algorithm SHA256
```
    
Te aparecerá una línea donde al lado de la palabra **"Hash"** verás el
código largo. Ese es el que debes comparar con la lista oficial del
enlace de JDownloader para ver si coincide con alguno de los maliciosos.

---

Bueno, entonces para futuras descargas lo mejor es subir primero el archivo a VirusTotal y revisarlo antes de instalarlo.

### Qué pienso yo de este suceso

Pienso que esto les pasó por no tener sus instaladores alojados en una infraestructura más confiable, como por ejemplo GitHub.

Creo que mejor seguiré usando `yt-dlp`, aunque tenga que usar siempre la terminal para ello. Puedes revisar sobre este programa en:

**yt-dlp**  
[https://facilitarelsoftwarelibre.blogspot.com/search?q=yt-dlp](https://facilitarelsoftwarelibre.blogspot.com/search?q=yt-dlp)

---

# Sobre la noticia del hackeo en la página de los desarrolladores

Allí en el sitio:

[https://jdownloader.org/](https://jdownloader.org/)

![jdownloader.org hackeado](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizQAS0TreLcEn6L_Aj4SHNAECb1LplD2hDW5_wKLYA-p31X70KQqC1r4LbdCbOpvnsCZrwrh_NDOjwkc5IL9nkjiw0riTwdi1NZ3jfnPeYglbR80eLkcN8Yf1Kfa1qBp8XYGMDE04trAOibYlPfHV2zXebRkf3aOQRqwFiArI3UhgWQjgNfkfgDls98L4/s16000/jdownloader.org%20hackeado.png)

Allí dice:

> "Security notice — JDownloader team
>
> Installer links on this site · May 2026
>
> In early May 2026, **some installer download links** on this website were changed so they could point to malicious files instead of our real installers. Wrong link targets were removed; links and configuration are fixed.
>
> **Who should read the details:** Anyone who installed from jdownloader.org between 6th and 7th May 2026 (UTC) using 'Download Alternative Installer' and/or the Linux shell installer link from this site."

Traducido es:

> "Aviso de seguridad — Equipo de JDownloader
>
> Enlaces de instalación en este sitio · Mayo de 2026
>
> A principios de mayo de 2026, **algunos enlaces de descarga de instaladores** en este sitio web fueron modificados para redirigir a archivos maliciosos en lugar de a los instaladores legítimos. Los enlaces erróneos fueron eliminados y la configuración ya fue corregida.
>
> **¿Quién debe leer los detalles?** Cualquier persona que haya instalado desde jdownloader.org entre el 6 y el 7 de mayo de 2026 (UTC) utilizando el "Alternative Installer" o el instalador Shell para Linux."

---

# Requisitos Previos

* Una distribución Linux (Ubuntu, Debian, Fedora, etc.) (este tutorial es para Linux aunque el programa es multiplataforma)
* Java Runtime Environment (JRE) instalado
* Acceso a internet

---

# Método 1: Instalación usando Java Web Start (Recomendado) y FFmpeg

## 1. Verificar si Java está instalado

```bash
java -version
```

## 2. Instalar Java y FFmpeg

JDownloader necesita FFmpeg para algunas funciones multimedia.

Si no está instalado, aparecerá un mensaje indicando que no se pudo encontrar FFmpeg.

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install default-jre ffmpeg
```

### Fedora

```bash
sudo dnf install java-latest-openjdk ffmpeg
```

---

## 3. Descargar JDownloader

Visita la página oficial:

[http://jdownloader.org/download/index](http://jdownloader.org/download/index)

Descarga el archivo terminado en `.sh`.

Si deseas mayor tranquilidad, puedes subirlo primero a:

[https://virustotal.com](https://virustotal.com)

---

## 4. Ejecutar el instalador

Haz doble clic sobre el archivo `.sh`.

Si no se ejecuta, dale permisos:

### Desde el administrador de archivos

* Clic derecho
* Propiedades
* Permisos
* Marcar como ejecutable

### Desde la terminal

```bash
./nombre-del-archivo.sh
```

---

## 5. Elegir la carpeta de instalación

Cuando el instalador pregunte dónde instalar JDownloader:

* Haz clic en **Browse**
* Selecciona la carpeta donde deseas instalarlo

Por ejemplo, yo tengo una carpeta llamada:

```text
Apps
```

donde guardo aplicaciones en Linux.

**Nota:** También puedes pegar la ruta manualmente.

Luego presiona **Next**.

---

# Configuración Post-Instalación

## Cambiar la carpeta de descargas

* Ve a:

  `Ajustes > Opciones`

* Busca:

  `Carpeta de Descargas`

* Selecciona tu carpeta preferida.

---

# Solución de Problemas Comunes

## Descargas lentas

Prueba lo siguiente:

* Configurar el número máximo de conexiones simultáneas
* Verificar tu conexión a internet
* Revisar si tu proveedor de internet limita descargas

---

# Notas Adicionales

* Puedes acceder a JDownloader remotamente usando:

  [https://my.jdownloader.org/](https://my.jdownloader.org/)

* Se recomienda mantener JDownloader actualizado para mejorar el rendimiento y la seguridad.

---

Dios les bendiga.
