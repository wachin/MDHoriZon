# Cómo instalar Node.js 24 en Ubuntu, Debian, MX Linux y derivados usando NodeSource

Node.js es un entorno de ejecución de JavaScript que permite ejecutar JavaScript fuera del navegador. Es ampliamente utilizado para desarrollo web, servidores, herramientas de línea de comandos y aplicaciones modernas.

Además, muchas herramientas para desarrolladores y agentes de inteligencia artificial que funcionan desde la terminal requieren tener instalada una versión reciente de Node.js.

En este tutorial veremos cómo instalar **Node.js 24 utilizando el repositorio de NodeSource** (pero podrá ser utilizado en el futuro para instalar versiones más modernas) en Debian, MX Linux y otras distribuciones derivadas de Debian.

## ¿Por qué utilizar NodeSource?

Debian incluye Node.js en sus propios repositorios, por lo que normalmente podríamos instalarlo simplemente con `sudo apt install nodejs` Sin embargo, dependiendo de la versión de Debian que utilicemos, la versión disponible en sus repositorios puede ser diferente de la que necesitamos. **NodeSource** mantiene repositorios de paquetes para instalar versiones específicas y recientes de Node.js.

# Instalar Node.js 24 mediante NodeSource en Debian/Ubuntu

**1. Agregar el repositorio de NodeSource**

Entra a:

[https://nodesource.com/products/distributions](https://nodesource.com/products/distributions)

Ejecuta el script de configuración de NodeSource:
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2OKidRJlQTWdRRGTskzGWJ44LwAYHYCMNspIuJMljq5rs2vABmkV3Va7RvsvB2NgncoI31te4JO8Ok0-FI_kSjIevfiWNHhJwfsvN6h2m-m6_mMc_WgPQ6wMgXwJm9H2HFidoA3b3PUP6V8kVrlGSVKEEXwnUNcNh1suethby17l1agNyVJrULw7rUEE/s1600-rw/Como-instalar-node.js-en-linux.png)

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
```

La parte `setup_24.x` indica que estás configurando el repositorio de la **rama 24.x de Node.js**. El script prepara APT para obtener Node.js desde los repositorios de NodeSource.

## **2. Instalar Node.js**

```bash
sudo apt-get install -y nodejs
```

## **3. Comprobar la versión de Node.js**

```bash
node -v
```

(o `node --version`). Deberías ver una versión de la rama 24, por ejemplo `v24.x.x`. Los números exactos dependen de la última versión disponible al momento de instalar.

## **4. Comprobar npm**
npm, el administrador de paquetes de Node.js, se instala junto con Node.js:

```bash
npm --version
which node
which npm
```

Las rutas habituales son `/usr/bin/node` y `/usr/bin/npm`.

## **5. Verificar que realmente usas NodeSource**

```bash
apt policy nodejs
```

La salida debería hacer referencia a `https://deb.nodesource.com/node_24.x`. También puedes buscar la configuración directamente:

```bash
grep -R "nodesource" /etc/apt/sources.list /etc/apt/sources.list.d/ 2>/dev/null
```

En instalaciones modernas normalmente existe el archivo `/etc/apt/sources.list.d/nodesource.sources`, que apunta a ese mismo repositorio.

## 6. Por qué es importante mantener Node.js actualizado

Un caso real: el 29 de octubre de 2026 quise instalar **REA**
(Reverse Engineer Anything), una herramienta de ingeniería inversa
que se distribuye como paquete npm y se ejecuta con `npx`. Al
lanzar el instalador, mi sistema —con Node.js 22.23.3— fue
rechazado con un error `EBADENGINE`:

```bash
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'rea-agents@6.8.0',
npm warn EBADENGINE   required: { node: '^22.23.4 || ^24.22.1 || >=26.12.1' },
npm warn EBADENGINE   current: { node: 'v22.23.3', npm: '10.9.9' }
npm warn EBADENGINE }
```

Faltaba una sola revisión de parche (0.0.1) para cumplir el mínimo
de la rama 22. Un simple `sudo apt update && sudo apt upgrade`
actualizó Node.js a 22.23.4 y el instalador funcionó sin más cambios.

**Moraleja:** mantener Node.js al día dentro de la rama configurada no
es solo una cuestión de seguridad; algunas herramientas modernas
declaran rangos de versión estrictos y se niegan a ejecutarse fuera
de ellos.

## **7. Actualizar Node.js posteriormente**
No necesitas descargar nada manualmente. Solo actualiza el sistema de forma normal:

```bash
sudo apt update
sudo apt upgrade
```

APT también comprobará si hay una versión más nueva de Node.js dentro de la rama 24.x configurada. Para verificar específicamente si hay una actualización de Node.js:

```bash
apt list --upgradable 2>/dev/null | grep nodejs
```

Si no aparece ningún resultado, normalmente significa que no hay una actualización pendiente del paquete `nodejs`.