# Cómo instalar Node.js 24 en Ubuntu, Debian, MX Linux y derivados usando NodeSource

Node.js es un entorno de ejecución de JavaScript que permite ejecutar JavaScript fuera del navegador. Es ampliamente utilizado para desarrollo web, servidores, herramientas de línea de comandos y aplicaciones modernas.

Además, muchas herramientas para desarrolladores y agentes de inteligencia artificial que funcionan desde la terminal requieren tener instalada una versión reciente de Node.js.

En este tutorial veremos cómo instalar **Node.js 24 utilizando el repositorio de NodeSource** en Debian, MX Linux y otras distribuciones derivadas de Debian.

## ¿Por qué utilizar NodeSource?

Debian incluye Node.js en sus propios repositorios, por lo que normalmente podríamos instalarlo simplemente con:

```bash
sudo apt install nodejs
```

Sin embargo, dependiendo de la versión de Debian que utilicemos, la versión disponible en sus repositorios puede ser diferente de la que necesitamos.

**NodeSource** mantiene repositorios de paquetes para instalar versiones específicas y recientes de Node.js.

La página oficial con las instrucciones para distribuciones Linux se encuentra aquí:

[https://nodesource.com/products/distributions](https://nodesource.com/products/distributions)

En este tutorial utilizaremos el repositorio correspondiente a **Node.js 24** donde allí uno debe de seleccionar las instrucciones de acuerdo a su distribución:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2OKidRJlQTWdRRGTskzGWJ44LwAYHYCMNspIuJMljq5rs2vABmkV3Va7RvsvB2NgncoI31te4JO8Ok0-FI_kSjIevfiWNHhJwfsvN6h2m-m6_mMc_WgPQ6wMgXwJm9H2HFidoA3b3PUP6V8kVrlGSVKEEXwnUNcNh1suethby17l1agNyVJrULw7rUEE/s1600-rw/Como-instalar-node.js-en-linux.png)

---

## 1. Actualizar la información de los repositorios

Antes de comenzar es recomendable actualizar la información de paquetes:

```bash
sudo apt update
```

---

## 2. Instalar curl

NodeSource proporciona un script que configura automáticamente su repositorio.

Para descargarlo necesitamos `curl`.

Lo instalamos con:

```bash
sudo apt-get install -y curl
```

Podemos comprobar que quedó instalado ejecutando:

```bash
curl --version
```

---

## 3. Agregar el repositorio de NodeSource para Node.js 24

Ahora ejecutamos el script proporcionado por NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
```

Aquí es importante observar esta parte:

```
setup_24.x
```

Esto indica que estamos configurando el repositorio correspondiente a la rama **24.x de Node.js**.

El script prepara nuestro sistema para que APT pueda obtener Node.js desde los repositorios de NodeSource.

---

## 4. Instalar Node.js

Una vez configurado el repositorio, instalamos Node.js:

```bash
sudo apt-get install -y nodejs
```

APT descargará e instalará Node.js desde el repositorio que acabamos de configurar.

---

## 5. Comprobar la versión de Node.js

Terminada la instalación, ejecutamos:

```bash
node -v
```

También podemos utilizar:

```bash
node --version
```

La terminal debería mostrarnos una versión perteneciente a la rama 24, por ejemplo:

```
v24.x.x
```

Los números exactos pueden ser diferentes dependiendo de la versión más reciente disponible cuando realicemos la instalación.

---

## 6. Comprobar npm

Al instalar Node.js mediante este método también tendremos disponible **npm**, el administrador de paquetes del ecosistema Node.js.

Podemos comprobarlo con:

```bash
npm --version
```

También podemos comprobar dónde se encuentran ambos programas:

```bash
which node
which npm
```

Normalmente veremos algo semejante a:

```
/usr/bin/node
/usr/bin/npm
```

---

## 7. Comprobar que realmente estamos utilizando NodeSource

Podemos consultar la información del paquete instalado mediante:

```bash
apt policy nodejs
```

Si Node.js procede de NodeSource, entre la información mostrada debería aparecer una referencia a:

```
https://deb.nodesource.com/node_24.x
```

También podemos buscar directamente la configuración de NodeSource:

```bash
grep -R "nodesource" /etc/apt/sources.list /etc/apt/sources.list.d/ 2>/dev/null
```

En instalaciones modernas podemos encontrar un archivo como:

```
/etc/apt/sources.list.d/nodesource.sources
```

que apunta al repositorio:

```
https://deb.nodesource.com/node_24.x
```

---

## 8. Actualizar Node.js posteriormente

Una ventaja de instalar Node.js mediante el repositorio de NodeSource es que no necesitamos descargar manualmente cada actualización.

Podemos actualizar normalmente nuestro sistema:

```bash
sudo apt update
sudo apt upgrade
```

APT comprobará también si existe una nueva versión de Node.js dentro de la rama que tenemos configurada.

Para comprobar específicamente si hay una actualización disponible:

```bash
apt list --upgradable 2>/dev/null | grep nodejs
```

Si no aparece ningún resultado, normalmente significa que no hay una actualización pendiente del paquete `nodejs`.

---

## 9. Ver toda la información de nuestra instalación

Podemos ejecutar:

```bash
node --version
npm --version
which node
which npm
apt policy nodejs
```

De esta manera podemos conocer:

* la versión instalada de Node.js;
* la versión instalada de npm;
* dónde se encuentra el ejecutable de Node.js;
* dónde se encuentra npm;
* y desde qué repositorio estamos obteniendo Node.js.

---


---

# ¿Qué hemos instalado?

Al finalizar tendremos una estructura similar a esta:

```
Ubuntu / Debian / MX Linux, etc
       │
       └── APT
            │
            └── Repositorio NodeSource
                    │
                    └── Node.js 24.x
                          │
                          ├── node
                          │
                          └── npm
```

Esto nos permite utilizar Node.js para desarrollar aplicaciones JavaScript y también instalar numerosas herramientas de línea de comandos distribuidas mediante npm.

Por ejemplo, posteriormente podremos encontrarnos con proyectos que indiquen una instalación de este tipo:

```bash
npm install -g nombre-del-paquete
```

En ese caso, npm será el encargado de descargar e instalar el programa.

---

# Nota sobre los paquetes globales de npm y los permisos

En Linux podemos encontrarnos posteriormente con un error `EACCES` al intentar instalar globalmente alguna herramienta:

```
EACCES: permission denied
```

Esto puede suceder porque npm intenta escribir dentro de un directorio del sistema como:

```
/usr/lib/node_modules
```

No es necesario modificar los permisos de `/usr/lib`.

Una alternativa es configurar las instalaciones globales de npm dentro de nuestro HOME:

```bash
mkdir -p ~/.local/npm
npm config set prefix ~/.local/npm
echo 'export PATH="$HOME/.local/npm/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Podemos comprobar la configuración con:

```bash
npm config get prefix
```

Debería aparecer algo parecido a:

```
/home/usuario/.local/npm
```

A partir de ese momento podremos instalar muchas herramientas globales con:

```bash
npm install -g nombre-del-paquete
```

sin necesidad de utilizar `sudo npm install -g`.

---

## Enlaces

**NodeSource — Node.js Binary Distributions**

[https://nodesource.com/products/distributions](https://nodesource.com/products/distributions)

Desde esa página podemos consultar las instrucciones y las versiones de Node.js que NodeSource ofrece actualmente para distribuciones Linux.

---

Con estos pasos tendremos **Node.js 24 y npm instalados en Ububtu, Debian, MX Linux y distribuciones derivadas mediante el repositorio de NodeSource**, quedando además integrados con APT para facilitar futuras actualizaciones.
