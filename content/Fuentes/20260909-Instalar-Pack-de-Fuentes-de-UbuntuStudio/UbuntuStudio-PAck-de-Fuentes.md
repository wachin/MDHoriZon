![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjE29-auec0Y632qsw7zV5Ld3dp2yogqr5gXYOlQYqcSGLGdCd781_5CPj0nBPEkIknnzjEcoCTWPw85QGfBTC5vOOh9hm_VnYNbtfatkwZ4yGGeoBVEjez3S-5CUvcA6hKa48Gm_XilQU_DmimkQMLO2c4ir9Laro-m_tWyjlZ50B8jYfBE5shnt_Zl_w/s1536/Portada.jpg =650x)


# UbuntuStudio Pack de Fuentes

Este tutorial es para sistemas operativos Linux basados en paquetería deb como Debian, MX Linux, Ubuntu, Mint, etc, etc, pero también se podría adaptar a los que usan la paquetería RPM 

Este tutorial fue hecho en la lista de paquetes que estaba en UbuntuStudio 20.04 pero a la fecha 2026 ya no extiste sino nuevas versiones en:  
  
[https://packages.ubuntu.com/ubuntustudio-fonts](https://packages.ubuntu.com/ubuntustudio-fonts) 

## INSTALACIÓN

Actualice sus repositorios:

```bash
sudo apt update && sudo apt upgrade
```

Copiar de una sola vez todas estas íneas y ponerlas en una terminal y dar ENTER:  
  
```bash
sudo apt install cm-super-x11 fonts-adf-* \
fonts-alee fonts-ancient-scripts fonts-atarismall \
fonts-beteckna fonts-bpg-georgian fonts-breip fonts-dejavu-extra \
fonts-dkg-handwriting fonts-dustin fonts-ecolier-court \
fonts-ecolier-lignes-court fonts-essays1743 \
fonts-georgewilliams fonts-goudybookletter fonts-inconsolata \
fonts-isabella fonts-jsmath fonts-junicode fonts-jura fonts-larabie-deco \
fonts-larabie-straight fonts-larabie-uncommon \
fonts-linex fonts-linuxlibertine fonts-lyx fonts-manchufont \
fonts-noto-hinted fonts-noto-mono fonts-ocr-a fonts-oflb-euterpe \
fonts-okolaks fonts-opensymbol fonts-radisnoir fonts-sil-andika \
fonts-sil-charis fonts-sil-doulos fonts-sil-gentium \
fonts-sil-gentium-basic fonts-tiresias fonts-tomsontalks \
fonts-tuffy fonts-ubuntu-title gsfonts gsfonts-other \
lmodern t1-cyrillic t1-oldslavic t1-teams t1-xfree86-nonfree \
ttf-bitstream-vera ttf-engadget ttf-sjfonts \
ttf-staypuft ttf-summersby ttf-xfree86-nonfree \
ttf-xfree86-nonfree-syriac xfonts-scalable
```

son bastante fuentes, como 350 MB o más de espacio las que se instalaran (se le pedirá su contraseña):


Y listo estarán instaladas las fuentes del paquete ubuntustudio-fonts. Explico, no es que las fuentes sean de UbuntuStudio, sino sólo son una compilación que ellos han hecho  

### Desinstalar

Las siguientes fuentes no las desinstale pues podrían desinstalar a LibreOffice:  
 
```
fonts-opensymbol fonts-linuxlibertine fonts-ubuntu-title  
fonts-sil-gentium-basic fonts-inconsolata fonts-noto-mono  
ttf-bitstream-vera  
```

por tal motivo las saco de la lista de desinstalación. Para desisnstalar ponga en la terminal:  

```bash
sudo apt remove cm-super-x11 fonts-adf-* \
fonts-alee fonts-ancient-scripts fonts-atarismall \
fonts-beteckna fonts-bpg-georgian fonts-breip fonts-dejavu-extra \
fonts-dkg-handwriting fonts-dustin fonts-ecolier-court \
fonts-ecolier-lignes-court fonts-essays1743 \
fonts-georgewilliams fonts-goudybookletter \
fonts-isabella fonts-jsmath fonts-junicode fonts-jura fonts-larabie-deco \
fonts-larabie-straight fonts-larabie-uncommon \
fonts-linex fonts-lyx fonts-manchufont \
fonts-noto-hinted fonts-ocr-a fonts-oflb-euterpe \
fonts-okolaks fonts-radisnoir fonts-sil-andika \
fonts-sil-charis fonts-sil-doulos fonts-sil-gentium \
fonts-tiresias fonts-tomsontalks \
fonts-tuffy gsfonts gsfonts-other \
lmodern t1-cyrillic t1-oldslavic t1-teams t1-xfree86-nonfree \
ttf-engadget ttf-sjfonts \
ttf-staypuft ttf-summersby ttf-xfree86-nonfree \
ttf-xfree86-nonfree-syriac xfonts-scalable
```

## Descargar todos los paquetes `.deb` para instalarlos sin conexión (opcional)

Si deseas guardar una copia de todos los paquetes `.deb` para instalarlos más tarde en otro equipo o crear un respaldo, puedes descargarlos sin instalarlos.

Esto resulta útil cuando:

* Quieres instalar las mismas fuentes en varios equipos sin volver a descargarlas.
* Vas a reinstalar el sistema operativo y deseas conservar los paquetes.
* Necesitas instalar las fuentes en un equipo sin conexión a Internet.

### Instalar la herramienta necesaria

Primero instala **apt-rdepends**, que permite obtener automáticamente todas las dependencias de un paquete:

```bash
sudo apt install apt-rdepends
```

### Crear una carpeta para las descargas

```bash
mkdir UbuntuStudio-Fonts-DEBs
cd UbuntuStudio-Fonts-DEBs
```

### Descargar todos los paquetes

Ejecuta el siguiente script:

```bash
ADF_PACKAGES=$(apt-cache pkgnames | grep '^fonts-adf-' | tr '\n' ' ')

for pkg in $(apt-rdepends \
cm-super-x11 $ADF_PACKAGES \
fonts-alee fonts-ancient-scripts fonts-atarismall \
fonts-beteckna fonts-bpg-georgian fonts-breip fonts-dejavu-extra \
fonts-dkg-handwriting fonts-dustin fonts-ecolier-court \
fonts-ecolier-lignes-court fonts-essays1743 \
fonts-georgewilliams fonts-goudybookletter fonts-inconsolata \
fonts-isabella fonts-jsmath fonts-junicode fonts-jura fonts-larabie-deco \
fonts-larabie-straight fonts-larabie-uncommon \
fonts-linex fonts-linuxlibertine fonts-lyx fonts-manchufont \
fonts-noto-hinted fonts-noto-mono fonts-ocr-a fonts-oflb-euterpe \
fonts-okolaks fonts-opensymbol fonts-radisnoir fonts-sil-andika \
fonts-sil-charis fonts-sil-doulos fonts-sil-gentium \
fonts-sil-gentium-basic fonts-tiresias fonts-tomsontalks \
fonts-tuffy fonts-ubuntu-title gsfonts gsfonts-other \
lmodern t1-cyrillic t1-oldslavic t1-teams t1-xfree86-nonfree \
ttf-bitstream-vera ttf-engadget ttf-sjfonts \
ttf-staypuft ttf-summersby ttf-xfree86-nonfree \
ttf-xfree86-nonfree-syriac xfonts-scalable 2>/dev/null \
| grep -v '^ ' \
| sort -u); do
    apt download "$pkg"
done
```

Al finalizar tendrás todos los archivos `.deb` descargados dentro de la carpeta:

```
UbuntuStudio-Fonts-DEBs
```

### ¿Por qué no se usa `fonts-adf-*`?

En el comando de instalación de este tutorial se utiliza:

```bash
fonts-adf-*
```

porque **APT sí entiende ese comodín** al instalar paquetes.

Sin embargo, **`apt-rdepends` no interpreta comodines**, por lo que si se escribe:

```bash
apt-rdepends fonts-adf-*
```

no encontrará todos los paquetes y el script no funcionará correctamente.

Por ese motivo, antes de ejecutar `apt-rdepends` se obtiene automáticamente la lista completa de paquetes `fonts-adf-*` disponibles en los repositorios mediante:

```bash
apt-cache pkgnames | grep '^fonts-adf-'
```

Así el script funciona correctamente incluso si en el futuro Debian añade o elimina alguno de esos paquetes, sin necesidad de modificar el código.

### Instalación posterior

Cuando desees instalar los paquetes descargados en otro equipo, simplemente copia la carpeta y ejecuta:

```bash
sudo dpkg -i *.deb
```

Si quedara alguna dependencia pendiente, puedes resolverla con:

```bash
sudo apt install -f
```

De esta forma tendrás una copia local de todas las fuentes y sus dependencias, lista para utilizar incluso sin conexión a Internet.


### Nota, en algún momento pueden remover alguna de estas fuentes

El 1 de julio de 2026 estaba revisando esta lista en MX Linux 23 que está hecho en base a Debian 12 bullseye y me daba error porque algunas fuentes no estaban en el repositorio y eso significa que las sacaron por algún motivo y las tuve que sacar

Saqué las siguientes fuentes:

fonts-f500  

porque causaba problemas en WPS Office (salía un mensaje de que no estaba instalada)

y las siguientes porque no estaban en Debian 12:  

ttf-aenigma 
ttf-unifont 
  

### **Si es curioso y quiere saber como obtuve la lista**

Descargué el paquete UbuntuStudio Fonts desde:  
  
[https://packages.ubuntu.com/focal/ubuntustudio-fonts](https://packages.ubuntu.com/focal/ubuntustudio-fonts)  
  
y luego lo descomprimí y entré en la siguiente ruta:  
  
ubuntustudio-fonts_0.210_amd64
  
allí descomprimí el paquete:  
  
control.tar.xz

y quedó sólo:

control  
  
abrí ese archivo control con un editor de texto y allí dice esto:  
 
```
> Package: ubuntustudio-fonts  
> Source: ubuntustudio-meta  
> Version: 0.210  
> Architecture: amd64  
> Maintainer: Ubuntu Studio Developers <ubuntu-studio-devel@lists.ubuntu.com>  
> Installed-Size: 32  
> Recommends: cm-super-x11, fonts-adf-accanthis, fonts-adf-baskervald, fonts-adf-berenis, fonts-adf-gillius, fonts-adf-ikarius, fonts-adf-irianis, fonts-adf-libris, fonts-adf-mekanus, fonts-adf-oldania, fonts-adf-romande, fonts-adf-switzera, fonts-adf-tribun, fonts-adf-universalis, fonts-adf-verana, fonts-alee, fonts-ancient-scripts, fonts-atarismall, fonts-beteckna, fonts-bpg-georgian, fonts-breip, fonts-dejavu-extra, fonts-dkg-handwriting, fonts-dustin, fonts-ecolier-court, fonts-ecolier-lignes-court, fonts-essays1743, fonts-f500, fonts-georgewilliams, fonts-goudybookletter, fonts-inconsolata, fonts-isabella, fonts-jsmath, fonts-junicode, fonts-jura, fonts-larabie-deco, fonts-larabie-straight, fonts-larabie-uncommon, fonts-linex, fonts-linuxlibertine, fonts-lyx, fonts-manchufont, fonts-noto-hinted, fonts-noto-mono, fonts-ocr-a, fonts-oflb-euterpe, fonts-okolaks, fonts-opensymbol, fonts-radisnoir, fonts-sil-andika, fonts-sil-charis, fonts-sil-doulos, fonts-sil-gentium, fonts-sil-gentium-basic, fonts-tiresias, fonts-tomsontalks, fonts-tuffy, fonts-ubuntu-title, gsfonts, gsfonts-other, lmodern, t1-cyrillic, t1-oldslavic, t1-teams, t1-xfree86-nonfree, ttf-aenigma, ttf-bitstream-vera, ttf-engadget, ttf-sjfonts, ttf-staypuft, ttf-summersby, ttf-unifont, ttf-xfree86-nonfree, ttf-xfree86-nonfree-syriac, xfonts-scalable  
> Section: metapackages  
> Priority: optional  
> Homepage: https://launchpad.net/ubuntustudio-meta  
> Description: Ubuntu Studio fonts Package  
>  Ubuntu Studio is a multimedia creation flavor of Ubuntu for the  
>  Linux audio, video, and graphic enthusiast or professional.  
>  .  
>  A collection of fonts to help with graphic design  
```

y lo que hice fue seleccionar sólo las fuentes y reemplazar la coma por ningún espacio:  
  
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK5Qele-HJ-R0xfizgh6UT3SVi5GTVHldZkhmBUJp9ho7X7gykA_yD4KWIzWL2FEe0cv7A4simbcw-4t0MTaSxhGkN3qeTYWh-Gr894s70-sLT6jA8afJWcMsShu9v19dW9qs8u04BcBY/s16000/20210909-213838.png)
  
y añadí sudo apt install



## Por qué al descargar estos paquetes aparecen otros que no son fuentes

Si se descargan estos paquetes en formato `.deb`, además de las fuentes aparecen otros paquetes que a primera vista no parecen tener relación. Esto es normal. La razón es que no todo lo necesario para usar una fuente en GNU/Linux es la fuente en sí misma: también hacen falta herramientas, bibliotecas y, en algunos casos, paquetes de composición tipográfica.

En esta carpeta aparecen varios grupos de paquetes:

- Fuentes reales: `fonts-*`, `ttf-*`, `gsfonts*`, `lmodern`, `cm-super-*`.
- Herramientas para manejar fuentes: `fontconfig`, `xfonts-utils`, `xfonts-encodings`, `x11-common`.
- Bibliotecas para renderizar texto y tipografías: `libfreetype6`, `libharfbuzz0b`, `libfontconfig1`, `libcairo2`, `libpng16-16`.
- Paquetes de TeX/LaTeX que también traen fuentes o dependen de ellas: `texlive-base`, `texlive-binaries`, `texlive-latex-base`, `fonts-lyx`, `libkpathsea6`.
- Dependencias generales del sistema: `libc6`, `dpkg`, `perl`, `tar`, `debconf`, `ucf`.

## Sobre el álbum visual de fuentes y su enfoque

El trabajo que estoy haciendo con los archivos `album-fuentes` y `album-fuentes-espanol` está enfocado principalmente en **Diseño Gráfico**.

La idea es ayudar a las personas que llegan al mundo de Linux a entender que hay muchas fuentes tipográficas disponibles en los repositorios y que una colección muy importante es la que reunieron los desarrolladores de **Ubuntu Studio**. Sin embargo, aunque esa colección existe como paquete y como metapaquete de instalación, no se publicó una **documentación visual** que permita al usuario ver rápidamente cómo se ve cada fuente y decidir cuál le puede servir para sus proyectos.

Eso es precisamente lo que se está construyendo aquí:

- un álbum visual ordenado,
- con muestras legibles,
- pensado para usuarios de GNU/Linux,
- y especialmente útil para personas interesadas en diseño gráfico, edición, rotulación, carteles, branding, publicaciones y composición visual en general.

## Por qué algunas fuentes técnicas se excluyen del álbum principal

Durante la revisión del álbum se detectó que algunas fuentes, por ejemplo varias del paquete `fonts-jsmath` y varias del paquete `fonts-lyx`, no se ven bien en un navegador web normal cuando se les pone una muestra de texto común. El problema no es necesariamente que estén dañadas ni que falte instalarlas en el sistema, sino que **no fueron diseñadas para usarse como fuentes normales de diseño gráfico o lectura corriente**.

Son fuentes técnicas o matemáticas usadas en otros programas y ecosistemas, por ejemplo:

- `fonts-jsmath`: para `jsMath`, visualización de fórmulas matemáticas y composición estilo TeX en páginas web antiguas o sistemas académicos.
- `fonts-lyx`: para `LyX`, `LaTeX` y el ecosistema `TeX`, especialmente en fórmulas, símbolos matemáticos y composición técnica o científica.

En esos entornos no basta solamente con la fuente `.ttf` u `.otf`: muchas veces también intervienen métricas, tablas, convenciones de composición matemática y otros archivos auxiliares que el navegador web corriente no usa de la misma manera.

Por esa razón, para mantener el álbum principal útil para **diseño gráfico**, se decidió excluir automáticamente del catálogo visual principal las fuentes claramente técnicas o matemáticas que:

- no están pensadas para composición tipográfica común,
- producen muestras confusas o engañosas en HTML normal,
- y pueden distraer al usuario que en realidad busca fuentes utilizables en trabajos gráficos cotidianos.

Esto no significa que esas fuentes sean malas o inútiles. Significa solamente que **sirven mejor para otros programas y otros contextos**, no para un catálogo visual orientado a diseño gráfico general.

### Qué hace cada grupo

Las fuentes reales son los archivos tipográficos que el usuario finalmente instala y usa en programas como LibreOffice, Inkscape, Scribus, GIMP o WPS Office.

Las herramientas de manejo de fuentes sirven para que el sistema pueda detectar, indexar, cachear y organizar las tipografías instaladas. Por ejemplo, `fontconfig` mantiene la caché de fuentes y proporciona utilidades como `fc-cache`, `fc-list` y `fc-match`.

Las bibliotecas de renderizado se encargan de dibujar correctamente el texto en pantalla o en documentos. Por ejemplo, `libfreetype6` rasteriza fuentes, `libharfbuzz0b` da soporte a composición tipográfica compleja, y `libcairo2` se usa para dibujar texto y gráficos.

Los paquetes de TeX/LaTeX aparecen porque parte de esta colección se relaciona con el mundo tipográfico de TeX. No son simples “fuentes sueltas”, sino componentes de un sistema más grande de composición de documentos. Por eso aparecen paquetes como `texlive-base`, `texlive-binaries`, `tex-common` y varias bibliotecas asociadas.

Las dependencias generales del sistema no son fuentes ni herramientas tipográficas directas, pero otros paquetes las necesitan para poder instalarse y funcionar correctamente.

### Ejemplos concretos

`texlive-base` no es sólo una fuente. Trae programas y archivos esenciales de TeX Live y depende de paquetes como `tex-common`, `texlive-binaries`, `libpaper-utils`, `sensible-utils`, `ucf` y `xdg-utils`.

`xfonts-utils` tampoco es una fuente. Contiene utilidades del sistema X Window para gestionar fuentes, como programas que generan índices y escalas.

`fonts-lyx`, aunque sí es un paquete de fuentes, está relacionado con fuentes matemáticas usadas por LyX y por eso puede aparecer junto a paquetes de TeX.

### Conclusión

Si en una descarga basada en paquetes de fuentes aparecen `.deb` que no son fuentes, eso no significa que haya un error. Lo normal es que el gestor de paquetes también descargue:

- dependencias obligatorias;
- herramientas para registrar y usar las fuentes;
- bibliotecas para renderizarlas;
- y componentes de TeX/LaTeX cuando alguna fuente o colección depende de ese ecosistema.

Por eso, al revisar una carpeta con paquetes descargados desde una lista como la de `ubuntustudio-fonts`, no sólo se ven tipografías, sino también piezas de infraestructura necesarias para que esas tipografías funcionen bien.

---  

## **LECTURAS INTERESANTES:**  
  
**MX-21 beta 2 now available for testing purposes – MX Linux**    
[https://mxlinux.org/blog/mx-21-beta-2-now-available-for-testing-purposes/](https://mxlinux.org/blog/mx-21-beta-2-now-available-for-testing-purposes/)  

**MX-21 Beta 2: Nueva versión disponible de MX Linux 21 - Flor Silvestre | Desde Linux**  
[https://blog.desdelinux.net/mx-21-beta-2-nueva-version-disponible-mx-linux-21-flor-silvestre/](https://blog.desdelinux.net/mx-21-beta-2-nueva-version-disponible-mx-linux-21-flor-silvestre/)  

**▷ MX Linux 21 Beta es de infarto - Soplos Linux**    
[https://soploslinux.com/mx-linux-21-beta-es-de-infarto/](https://soploslinux.com/mx-linux-21-beta-es-de-infarto/)
