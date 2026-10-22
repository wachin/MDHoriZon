# PeaZip en Linux: cómo descargar la versión correcta (y por qué los enlaces directos caducan)

PeaZip es un archivero libre y multiplataforma que destaca por su soporte para más de 200 formatos de archivo, su enfoque en la seguridad y su disponibilidad para Windows, macOS y Linux. Si eres usuario de Linux y has llegado hasta aquí buscando el archivo **AppImage** o el paquete **Portable Qt6**, es importante que entiendas un detalle clave: **los enlaces de descarga directa que apuntan a una versión concreta dejarán de funcionar cuando se publique la siguiente versión**.

En esta entrada te explico qué enlaces son “temporales”, qué alternativas tienes disponibles y cómo asegurarte de descargar siempre la última versión desde las fuentes oficiales.

---

## Los enlaces directos que compartiste (y su fecha de caducidad)

Seguramente llegaste a archivos como estos:

- **AppImage / Portable Qt6**  
  `https://github.com/peazip/PeaZip/releases/download/11.4.0/peazip_portable-11.4.0.LINUX.Qt6.x86_64.tar.gz`  
  (Este es el que descargaste desde la página de descargas para Linux).

- **Paquete DEB para Qt6**  
  `https://github.com/peazip/PeaZip/releases/download/11.4.0/peazip_11.4.0.LINUX.Qt6-1_amd64.deb`.

- **Paquete DEB para GTK2**  
  `https://github.com/peazip/PeaZip/releases/download/11.4.0/peazip_11.4.0.LINUX.GTK2-1_amd64.deb`.

- **Portable GTK2**  
  `https://github.com/peazip/PeaZip/releases/download/11.4.0/peazip_portable-11.4.0.LINUX.GTK2.x86_64.tar.gz`.

Todos ellos incluyen el número de versión (`11.4.0`) en la URL. Esto significa que **cuando se lance, por ejemplo, la versión 11.5.0, esos enlaces dejarán de ser válidos** y devolverán un error 404. No se trata de un fallo, sino de la forma en que GitHub organiza las “releases”: cada versión tiene su propio conjunto de archivos y los enlaces antiguos no se redirigen automáticamente.

Por eso, **no es recomendable guardar estos enlaces en marcadores o compartirlos como si fueran permanentes**. Si quieres referenciar la descarga de PeaZip para Linux, es mucho mejor enlazar a la **página oficial de descargas** y dejar que el usuario elija la versión más reciente.

---

## La solución: utiliza siempre la página oficial de descargas

La página **`https://peazip.github.io/peazip-linux.html`** es el punto de entrada recomendado para usuarios de Linux. Allí encontrarás, para la versión más reciente (actualmente la 11.4.0), los siguientes enlaces actualizados:

- **DEB (Qt6 y GTK2)** – para Debian, Ubuntu, Mint, Kali, etc..
- **RPM (Qt6 y GTK2)** – para Fedora, CentOS, Red Hat, openSUSE, etc..
- **Portable (Qt6 y GTK2)** – archivos `.tar.gz` que no requieren instalación; solo se descomprimen y se ejecuta el binario `peazip`.
- **Flatpak** – a través de Flathub, para una instalación integrada en el escritorio.
- **Enlaces a compilación desde fuentes y paquetes específicos de cada distribución** (AppImage, entre otros) en la sección de “Alternative downloads”.

Al visitar esta página, siempre verás los enlaces correspondientes a la **última versión estable**, sin preocuparte por números de versión obsoletos.

---

## ¿Y el AppImage?

En la página principal de descargas para Linux x86_64 se listan los paquetes DEB, RPM y portátiles, pero **el AppImage suele estar disponible en la sección de descargas alternativas** o a través de repositorios comunitarios (como el mantenido por `ferion11` en GitHub). Si tu objetivo es usar un AppImage, te recomiendo revisar esa sección o, si prefieres una solución mantenida oficialmente, optar por el **Portable Qt6** (el `.tar.gz` que ya descargaste). Ambos ofrecen la ventaja de no requerir instalación y de poder ejecutarse desde cualquier carpeta.

---

## Verifica siempre la integridad de lo que descargas

Independientemente del paquete que elijas, PeaZip publica los **valores SHA-256** de cada archivo en la página de cambios (`changelog.html`) y en la sección de “releases” de GitHub. Aunque los paquetes no están firmados digitalmente, el hash SHA-256 es criptográficamente fuerte y se distribuye a través de una conexión TLS/SSL, además de estar replicado en repositorios independientes. **Comparar el hash del archivo que descargaste con el valor oficial es la mejor manera de asegurarte de que no ha sido alterado**.

---

## Conclusión

- **Los enlaces directos que incluyen `11.4.0` son válidos solo mientras esa versión sea la última**. En cuanto se publique una nueva, dejarán de funcionar.
- **La forma más segura y sostenible de descargar PeaZip para Linux es hacerlo desde `https://peazip.github.io/peazip-linux.html`**. Allí encontrarás los paquetes actualizados (DEB, RPM, Portable, Flatpak) y podrás elegir el que mejor se adapte a tu distribución.
- Si necesitas un **AppImage**, revisa la sección de descargas alternativas o considera el **Portable Qt6** como una alternativa igualmente funcional y sin instalación.
- **No olvides verificar el hash SHA-256** antes de ejecutar cualquier binario.

PeaZip sigue siendo una excelente opción como archivero libre y multiplataforma, y mantenerte en los canales oficiales de descarga te garantiza no solo la última versión, sino también la tranquilidad de estar usando software íntegro y sin modificaciones.

---

**Enlaces útiles:**

- Página oficial de descargas para Linux: `https://peazip.github.io/peazip-linux.html`
- Historial de cambios y hashes: `https://peazip.github.io/changelog.html`
- Repositorio oficial en GitHub: `https://github.com/peazip/PeaZip/releases`
