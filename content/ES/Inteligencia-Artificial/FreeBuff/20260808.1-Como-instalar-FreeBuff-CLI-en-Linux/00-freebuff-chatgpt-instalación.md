# Cómo instalar Freebuff en MX Linux, Debian y derivados

![](images/Portada.jpg

Freebuff es un agente de inteligencia artificial para programación que funciona directamente desde la terminal. Permite abrir un proyecto de software, conversar con el agente y pedirle que analice o modifique el código.

Freebuff se distribuye mediante **npm**, por lo que antes de instalarlo necesitamos tener instalados **Node.js y npm**.

En este tutorial veremos cómo instalar una versión reciente de Node.js utilizando el repositorio oficial de NodeSource y, posteriormente, cómo configurar npm para poder instalar Freebuff sin utilizar `sudo`.

Este procedimiento puede utilizarse en MX Linux, Debian y otras distribuciones basadas en Debian.

---

## 1. Requisitos (Node.js, pnpm, curl) 

Necesitamos:

- **Node.js** (versión 22.19 o superior, o 24+). Si no lo tienes, instálalo desde el repositorio de NodeSource (instrucciones detalladas en [Cómo instalar node en Linux](https://facilitarelsoftwarelibre.blogspot.com/2026/08/como-instalar-nodejs-24-en-ubuntu-debian-etc.html)):

```bash
sudo apt update
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Comprueba la versión con:

```bash
node --version
```

> **Nota sobre permisos de npm:** si al instalar paquetes globales (`npm install -g ...`) aparece un error `EACCES: permission directed`, no modifiques los permisos de `/usr/lib`. En su lugar, configura las instalaciones globales en tu HOME:

```bash
mkdir -p ~/.local/npm
npm config set prefix ~/.local/npm
echo 'export PATH="$HOME/.local/npm/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

- **pnpm** (un gestor de dependencias). Si no lo tienes instálalo mediante npm:

```bash
sudo npm install -g pnpm
```

- **git**, para clonar el repositorio:

```bash
sudo apt install -y git
```

> **Ojo:** el paquete `dsh` que hay en `apt` **no es DeepSeek Harness**. Es un programa antiguo de Linux llamado *Distributed Shell*. Si lo instalas por error, no pasa nada, pero no sirve para lo que queremos. Para desinstalarlo si lo instalaste sin querer:
>
> ```bash
> sudo apt remove dsh libdshconfig1
> ```

---

## 2. Clonar e instalar DeepSeek Harness

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
```

`pnpm install` descarga todas las dependencias y `pnpm run build` compila el proyecto. Este paso tarda varios minutos la primera vez, pero **solo es necesario hacerlo una vez**.

### Si actualizas el repositorio más adelante

Cuando pase el tiempo y quieras actualizar, **no basta con `pnpm install && pnpm run build`**. Hay que hacer tres pasos, y uno de ellos es imprescindible para que no falle:

```bash
cd ~/Dev3/deepseek-harness
git pull                      # traer el código nuevo
pnpm install --frozen-lockfile
pnpm run clean                # ← ESTO ES LO QUE EVITA EL ERROR
pnpm run build
```

**¿Por qué es necesario `pnpm run clean`?**

Cuando compilas, se generan archivos de caché (`.tsbuildinfo` y carpetas `lib/`) que dicen "esto ya está compilado, no hace falta repetirlo". Al actualizar el código, esos archivos se quedan **desincronizados**: apuntan a versiones antiguas que ya no existen. El compilador entonces falla con un error tipo:

```
[MISSING_EXPORT] "DEFAULT_PREPARED_SESSION_CACHE_SIZE" is not exported by ...
```

Ese error significa: "el código nuevo espera una función que la parte compilada antigua no tiene". `pnpm run clean` borra esos archivos viejos y obliga a recompilar todo desde cero, de forma coherente.

Si después del `clean` sigue fallando, haz una limpieza total:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

## 3. Instalar Freebuff

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

## 4. Ejecutar Freebuff dentro de un proyecto

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

## 5. Ejemplo de una instalación funcionando

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

## 6. ¿Por qué no usar `sudo npm install -g freebuff`?

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

## 7. Actualizar Node.js

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

## 8. Actualizar Freebuff

Como Freebuff fue instalado mediante npm, podemos actualizarlo posteriormente con:

```bash
npm install -g freebuff@latest
```

Y comprobar nuevamente la versión:

```bash
freebuff --version
```

---

## 9. Desinstalar Freebuff

Si en algún momento queremos eliminarlo:

```bash
npm uninstall -g freebuff
```

---

## Resumen de comandos

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

