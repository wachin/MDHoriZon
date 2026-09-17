

Este tutorial es si alguien lo desea instalar desde código fuente puesto que así se puede instalar en una variedad más amplia de Linux, pero si lo quiere instalar desde paquete deb vea esta [entrada](https://facilitarelsoftwarelibre.blogspot.com/2020/10/como-instalar-ffmulticonverter-18-en-mx.html).

FFmulticonverter permite convertir audios y videos a muchos formatos diferentes, e imágenes y documentos además de poderlo hacer con varios archivos pues se los puede cargar en una lista. Lo siguiente es para hacer funcionar FFmulticonverter 1.8 en Sistemas Operativos Linux

## Probado en:  

- MX Linux 21 de 32 bits (basado en Debian 11 Bullseye)
- MX Linux 23 de 32 bits (basado en Debian 12 Bookworm)

## Dependencias

Necesita instalar lo siguiente:

```bash
sudo apt install python3-pip pyqt5-dev python3-setuptools \
        python3-scipy python3-numpy python3-mido python3-pytest \
        python3-pyaudio python3-pyfftw python3-dev python3-cpuset \
        ffmpeg imagemagick unoconv python3-pyqt5
```

## Paquetes en las distrubuciones 

Lo siguiente es un análisis de los paquetes que están disponible en los repositorios de debian para que usted sepa en cuantas distribuciones lo puede compilar:

### python3-pyqt5 en Debian  

[https://packages.debian.org/python3-pyqt5](https://packages.debian.org/python3-pyqt5)

![](https://blogger.googleusercontent.com/img/a/AVvXsEh1hYXPChKMrbvN6NnGEuFZkhSdn6_ttOkw5HAU_Zy8Uh-O65NpOzsfyW2HvZILuy_1SvoqWC7Pp0MThGvivRD-9KYio3T6X0rvCfFlrKy95WnFToUULL2f_85Px4Yr8HUzhgPHeIYjoyLxHAF4H6j3YrXWvJUr9vs1BLwXMFqT0zBbgDuXfo_2fJS8=s16000)

y servirán en todos los Sistemas Operativos Linux que se basen en ellos, como ejemplo MX Linux, antiX, Linux Mint Debian Edition, Kaly Linux, etc, etc

### python3-pyqt5 en Ubuntu

[https://packages.ubuntu.com/python3-pyqt5](https://packages.ubuntu.com/python3-pyqt5)

![](https://blogger.googleusercontent.com/img/a/AVvXsEhltb-59bqyFGlRqkUj8IBAcwpXSFyXxA73TRcoU8UPIVdVk1-DeJVYoiQjt8GR7gXKcT63yjfWtChzodyvCVn-xxpz0c9WaJ87lfW_IU0TYjVanOf8ghqz6asvN1IosUPe9sms4FftFDSQrpoc8MjegefA5Jdl3GLKUy-X0_ws3b8RZ05N5bXHDz8T=s16000)


 Vemos que está disponible para los más importantes que son los LTS (Long Time Support):

Bionic 18.04  

Focal 20.04  

para todos los Linux Ubuntu basados en ellos, y para los nuevos.

y para los otros dos paquetes importantes:

**Nota:** Así mismo puede revisar cada uno de los demás paquetes.

  
# Descargue el código fuente  

Ponga en la terminal lo siguiente:

```bash
git clone https://github.com/coolshou/ffmulticonverter
```

al hacer esto quedará en su HOME. Pero puede poner ese comando dentro de alguna carpeta para tal propósito

Si lo desea lanzar sin instalarlo éntre en la carpeta bin dentro de la carpeta del programa:

```bash
cd ffmulticonverter/bin
```

y lanzandolo con:

```bash
python3 ffmulticonverter
```

![](https://blogger.googleusercontent.com/img/a/AVvXsEiIrhpCm9t7v8_zz1VRxr7VwvXMqqUex5OPt7mfST_wiyJdiG6uYsf5yjGSQNDBePG9NvlrMrGBTWZxqjlO5qyfQ5FOCRJNFsk0EIh1BewxIFBi1VFA4RkRJ7EZmOlJfxoCNbCxV8E8zuZkELsEuEogL-Gg-1ZSX3AD1dti5YN2rRF8nwqa-_0MfPjl=s16000)
  

Para instalarlo en el Sistema Operativo ponga lo siguiente en la terminal estando dentro del código fuente:

```bash
sudo python3 setup.py install
```

como les explico en ls siguiente imagen:

![](https://blogger.googleusercontent.com/img/a/AVvXsEjrIz4CoOPR4wT3PMA-ZUC_H3PFiPprVBgTR_QXcoSg66x3XOJH-t-joDVb5S3vF-KmJcA8C9SyMjYyGW6deWodi5Wfhz-tPkEmkMMmZgHbN0o3YdS3JCG8lblOfoM3E5XQoDlWsiTUXNRZmXdUrowzyBY3kbQOVGaoYXjW3n8V_t-k-Lpg2LhpuQ15=s16000)
  
después de instalado quedará disponible entre sus aplicaciones


![](https://blogger.googleusercontent.com/img/a/AVvXsEh_CnqUoZ_fA1zcE4u0mU8pMyfHESY-qJWUITfR2J6O8-h82OWFw-cValWujthDTKyqPMVSAcmIdgH-bhG1JLeHjKAHXXKW-fI8PM--YTH4lL6cbTpnRBzPm04jQlFvx-63Q7icyNaiILi-0KdyW0yngoEjt2twhl6z_GdHOxJyX-UDILaHeCYmbQsh=s16000)

  
### Sobre unoconv 

Esta dependencia sirve para convertir documentos usando LibreOffice en FFmulticonverter en la pestaña Documentos:

![](https://blogger.googleusercontent.com/img/a/AVvXsEjZns0LSJqduPVzxCJZyvuxQUXC4Yr9DOdKsMy54Nrx-7h7mp9BPfx36rFCqbTsro52hSxGszlPEDBdz60cIKOkkKkEF2UKsHjKZucjttLCdsxs29_WJCDqZYA5DbRE39mbBpzxPzeYVlZGxfmJMyVfaqpwvvofbm0vLGJsOcllTFNtb0IYZeD9VL6n=s16000)
  
allí se ven muchos formatos disponibles:

![](https://blogger.googleusercontent.com/img/a/AVvXsEi8ca378cqmx4XYnYIQGAkg0p1jgW7pkjhy1GKui6gsC___L4jJPXbGOh4-BYyNHj3i1rYI4-d79LQFn8VCpkLGeMX5olxsAg5VwgfkSC1S3sBuZ5gMv1mCbdwvDeOq7l7scAPMTjpRAdDknfEP2Gd803CnX1spbouiLOSWAuX57UrWHnTcSoFppOR8=s16000)

  
Como ve allí están disponibles las siguientes conversiones a: bib, csv, dif, doc, docx, html, ltx, odp, ods, odt, pdf, ppt, pptx, rtf, sdc, sdw, txt, xls, xlsx, xml  

### Instalar unoconv si usted usa LibreOffice desde los deb de libreoffice.org

Si usted instala LibreOffice desde los deb que puede descargar desde:

[https://es.libreoffice.org/descarga/libreoffice/](https://es.libreoffice.org/descarga/libreoffice/)

Si usted usa alguno de esos deb si tenia instalado a unoconv desde los repositorios debe desinstalarlo:

```bash
sudo apt remove unoconv
```

para esto usted debe usar otro unoconv, el siguiente los repositorios mismos de Ubuntu o Debian, pero extrayendo el contenido y el ejecutable para no usa el deb pues ese requiere las dependencias de LibreOffice de los repositorios (y ese era el conflicto)  

Para instalar solo el ejecutable lo mejor que se me ha ideado es lo siguiente, ponga en la terminal de una vez todo:  

```bash
wget -c http://archive.ubuntu.com/ubuntu/pool/universe/u/unoconv/unoconv\_0.7-2\_all.deb   
mkdir unoconv\_0.7-2\_all    
dpkg-deb -x unoconv\_0.7-2\_all.deb unoconv\_0.7-2\_all  
sudo cp unoconv\_0.7-2\_all/usr/bin/unoconv /usr/bin/
```
  
le pedirá su contraseña pues instalará en su sistema el ejecutable de unoconv  
 
**Instalación manual de unoconv extraido**  
También si usted no confía en lo que estoy haciendo (mi sistema de instalación rápida desde la terminal), si desea puede hacer todo eso manualmente descargando el deb desde:
 

[http://archive.ubuntu.com/ubuntu/pool/universe/u/unoconv/](http://archive.ubuntu.com/ubuntu/pool/universe/u/unoconv/)

allí busca el archivo por ejemplo:

unoconv_0.7-2_all.deb)

extrayendo el contenido y luego del archiov data.tar.xz con clic derecho extraer aquí y allí busque el ejecutable unoconv y en algún administrador de archivos estando como root por ejemplo con PCmanFM sería: _sudo pcmanfm_ (debe tener instalado pcmanfm u otro) debe copiar ese archivo y pegarlo en /usr/bin/ (con mucho cuidado evitando borrar archivos del sistema).

**Nota:** También puede entrar desde el administrador de archivo en la carpeta del código fuente y dar clic derecho y [abrir terminal aquí](https://facilitarelsoftwarelibre.blogspot.com/2020/02/abrir-terminal-aqui-con-administradores.html).
 

Dios les bendiga
