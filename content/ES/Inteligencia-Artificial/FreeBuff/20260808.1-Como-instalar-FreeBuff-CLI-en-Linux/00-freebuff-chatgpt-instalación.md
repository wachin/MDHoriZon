Hay un detalle que conviene corregir antes de publicarlo: los comandos que encontraste con `sudo apt-get install -y nsolid` instalan **N|Solid**, que es la distribución de Node.js de NodeSource orientada a monitorización y entornos empresariales. Para instalar Node.js normal desde NodeSource, conviene usar `sudo apt-get install -y nodejs`. NodeSource ofrece ambas opciones. ([NodeSource][1])

Te dejo el tutorial preparado para que lo puedan seguir otras personas en MX Linux, Debian y distribuciones derivadas.

# Cómo instalar Freebuff en MX Linux, Debian y derivados

Freebuff es un agente de inteligencia artificial para programación que funciona directamente desde la terminal. Permite abrir un proyecto de software, conversar con el agente y pedirle que analice o modifique el código.

Freebuff se distribuye mediante **npm**, por lo que antes de instalarlo necesitamos tener instalados **Node.js y npm**.

En este tutorial veremos cómo instalar una versión reciente de Node.js utilizando el repositorio oficial de NodeSource y, posteriormente, cómo configurar npm para poder instalar Freebuff sin utilizar `sudo`.

Este procedimiento puede utilizarse en MX Linux, Debian y otras distribuciones basadas en Debian.

---

## 1. Instalar curl

Primero actualizamos la información de los repositorios:

```bash
sudo apt update
```

Instalamos `curl`:

```bash
sudo apt-get install -y curl
```

`curl` será utilizado para descargar el script de configuración del repositorio de NodeSource.

---

## 2. Agregar el repositorio de NodeSource

Los repositorios normales de Debian pueden incluir una versión de Node.js diferente de la que necesitamos para algunas herramientas modernas.

NodeSource mantiene repositorios específicos que permiten instalar versiones recientes de Node.js.

Para agregar el repositorio de **Node.js 24**, ejecutamos:

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
```

Este comando configura el repositorio correspondiente a la rama 24.x de Node.js.

> **Nota:** NodeSource también ofrece N|Solid, su distribución especializada de Node.js. Para utilizar herramientas normales de npm como Freebuff no necesitamos N|Solid; instalaremos Node.js directamente.

---

## 3. Instalar Node.js

Ahora instalamos Node.js:

```bash
sudo apt-get install -y nodejs
```

El paquete de Node.js proporcionado por NodeSource también incluye npm.

Podemos comprobar la versión instalada con:

```bash
node --version
```

Y la versión de npm:

```bash
npm --version
```

Por ejemplo, podríamos obtener algo semejante a:

```text
v24.x.x
```

y:

```text
11.x.x
```

Las versiones exactas pueden cambiar con el tiempo.

También podemos comprobar de dónde provienen los ejecutables:

```bash
which node
which npm
```

Normalmente veremos:

```text
/usr/bin/node
/usr/bin/npm
```

---

# 4. Evitar el error EACCES al instalar paquetes globales con npm

En Debian y MX Linux es posible encontrarnos con un problema al intentar instalar Freebuff de esta manera:

```bash
npm install -g freebuff
```

npm podría mostrar un error parecido a:

```text
npm error code EACCES
npm error syscall mkdir
npm error path /usr/lib/node_modules/freebuff
npm error errno -13
npm error Error: EACCES: permission denied
```

Esto ocurre porque npm intenta instalar el programa dentro de:

```text
/usr/lib/node_modules/
```

Ese directorio pertenece al sistema y un usuario normal no tiene permisos para escribir en él.

Aunque podríamos utilizar:

```bash
sudo npm install -g freebuff
```

es preferible evitar instalar paquetes globales de npm como administrador.

Una solución mucho más limpia consiste en configurar un directorio dentro de nuestro propio HOME para los paquetes globales de npm.

---

# 5. Crear un directorio para los paquetes globales de npm

Creamos el directorio:

```bash
mkdir -p ~/.local/npm
```

Ahora le indicamos a npm que utilice ese directorio como prefijo para las instalaciones globales:

```bash
npm config set prefix ~/.local/npm
```

Podemos comprobarlo con:

```bash
npm config get prefix
```

La salida debería ser semejante a:

```text
/home/usuario/.local/npm
```

Por ejemplo:

```text
/home/wachin/.local/npm
```

---

# 6. Agregar los programas npm al PATH

Los ejecutables instalados mediante npm quedarán dentro de:

```text
~/.local/npm/bin
```

Por ello debemos agregar este directorio a la variable `PATH`.

Si utilizamos Bash, ejecutamos:

```bash
echo 'export PATH="$HOME/.local/npm/bin:$PATH"' >> ~/.bashrc
```

Después recargamos la configuración:

```bash
source ~/.bashrc
```

También podemos cerrar la terminal y abrir una nueva.

Para comprobar que el directorio fue agregado correctamente:

```bash
echo $PATH
```

Entre los directorios mostrados debería aparecer:

```text
/home/usuario/.local/npm/bin
```

---

# 7. Instalar Freebuff

Ahora sí podemos instalar Freebuff sin utilizar `sudo`:

```bash
npm install -g freebuff
```

La documentación del paquete Freebuff indica precisamente esta forma de instalación global mediante npm. ([npm][2])

Una vez terminada la instalación, comprobamos que el programa esté disponible:

```bash
freebuff --version
```

También podemos conocer su ubicación con:

```bash
which freebuff
```

Deberíamos obtener algo semejante a:

```text
/home/usuario/.local/npm/bin/freebuff
```

---

# 8. Ejecutar Freebuff dentro de un proyecto

Ahora podemos entrar al directorio de un proyecto.

Por ejemplo:

```bash
cd ~/Dev/mi-proyecto
```

Y ejecutar:

```bash
freebuff
```

Freebuff se abrirá dentro de ese proyecto y podrá analizar los archivos que contiene.

El uso básico indicado por el propio proyecto consiste precisamente en entrar al directorio del proyecto y ejecutar:

```bash
freebuff
```

([npm][2])

---

# 9. Ejemplo de una instalación funcionando

Podemos revisar toda nuestra configuración con:

```bash
node --version
npm --version
npm config get prefix
which node
which npm
which freebuff
freebuff --version
```

Una configuración correcta podría verse de esta manera:

```text
Node.js:
v22.23.2

npm:
10.9.8

Prefijo global de npm:
/home/wachin/.local/npm

Node:
/usr/bin/node

npm:
/usr/bin/npm

Freebuff:
/home/wachin/.local/npm/bin/freebuff
```

No es necesario que las versiones coincidan exactamente con estas, ya que Node.js, npm y Freebuff se actualizan regularmente.

---

# 10. ¿Por qué no usar `sudo npm install -g freebuff`?

Utilizar:

```bash
sudo npm install -g freebuff
```

puede funcionar, pero los paquetes instalados pasan a estar administrados como archivos del usuario `root`.

Si posteriormente instalamos, actualizamos o eliminamos otros paquetes npm como usuario normal, podemos terminar con problemas de permisos.

Al utilizar:

```text
~/.local/npm
```

conseguimos una separación más limpia:

```text
Node.js instalado por APT
        │
        ├── /usr/bin/node
        │
        └── /usr/bin/npm
                 │
                 ▼
      paquetes globales del usuario
                 │
                 ▼
        ~/.local/npm/
                 │
                 ├── bin/
                 │    └── freebuff
                 │
                 └── lib/
```

De esta manera:

* Node.js y npm son administrados por APT.
* NodeSource proporciona las versiones de Node.js.
* Los programas que instalamos mediante npm pertenecen a nuestro usuario.
* No necesitamos utilizar `sudo` para instalar herramientas npm.
* Evitamos errores de permisos en `/usr/lib/node_modules`.

---

# 11. Actualizar Node.js

Como Node.js fue instalado utilizando un repositorio de NodeSource, sus actualizaciones dentro de la rama configurada llegarán mediante APT.

Podemos actualizar normalmente nuestro sistema:

```bash
sudo apt update
sudo apt upgrade
```

Para comprobar específicamente si existe una actualización de Node.js:

```bash
apt list --upgradable 2>/dev/null | grep nodejs
```

También podemos consultar qué versión tenemos instalada y qué repositorio la proporciona:

```bash
apt policy nodejs
```

Si estamos utilizando NodeSource veremos una dirección semejante a:

```text
https://deb.nodesource.com/node_24.x
```

---

# 12. Actualizar Freebuff

Como Freebuff fue instalado mediante npm, podemos actualizarlo posteriormente con:

```bash
npm install -g freebuff@latest
```

Y comprobar nuevamente la versión:

```bash
freebuff --version
```

---

# 13. Desinstalar Freebuff

Si en algún momento queremos eliminarlo:

```bash
npm uninstall -g freebuff
```

---

# Resumen de comandos

Para una instalación nueva podemos utilizar:

```bash
sudo apt update
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Comprobamos:

```bash
node --version
npm --version
```

Configuramos npm para nuestro usuario:

```bash
mkdir -p ~/.local/npm
npm config set prefix ~/.local/npm
echo 'export PATH="$HOME/.local/npm/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Comprobamos:

```bash
npm config get prefix
```

Instalamos Freebuff:

```bash
npm install -g freebuff
```

Y finalmente:

```bash
freebuff --version
```

Para utilizarlo dentro de un proyecto:

```bash
cd ~/Dev/mi-proyecto
freebuff
```

Con esto tendremos Freebuff funcionando en MX Linux, Debian o una distribución derivada, con Node.js instalado mediante NodeSource y sin necesidad de utilizar permisos de administrador para instalar paquetes globales de npm.

Hice deliberadamente un cambio respecto a los comandos que encontraste: puse `sudo apt-get install -y nodejs` en lugar de `sudo apt-get install -y nsolid`. **NSolid no es necesario para Freebuff**; es un runtime de NodeSource basado en Node.js con funciones adicionales de monitorización. ([NodeSource][3])

También dejaría `setup_24.x` en el tutorial nuevo, porque NodeSource señala actualmente a **Node.js 24 como la rama LTS más nueva**, mientras que tu instalación existente sigue correctamente en la rama 22.x. No necesitas cambiar tu máquina solo para que coincida con el tutorial. ([NodeSource][4])

[1]: https://deb.nodesource.com/?utm_source=chatgpt.com "NodeSource"
[2]: https://www.npmjs.com/package/freebuff?utm_source=chatgpt.com "freebuff - npm"
[3]: https://nodesource.com/about?utm_source=chatgpt.com "About — NodeSource"
[4]: https://downloads.nodesource.com/?source=post_page---------------------------&utm_source=chatgpt.com "Downloads from NodeSource The Enterprise Node Company™ Providing Enterprise Node.js Training, Support, Software & Consulting, Worldwide"

