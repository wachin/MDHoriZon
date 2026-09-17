

# Instalar Codex CLI en Linux (Guía actualizada 2026)

Actualmente OpenAI en su pagina oficial, que se encuentra en:

[https://learn.chatgpt.com/docs/codex/cli](https://learn.chatgpt.com/docs/codex/cli)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkbIhtKuZO_u6g6jLL-5v76fn8NQz1FbJkXBz7bqsRgK9CBB6N8nVN-QwVoYcnW8w6XEvbUgbFsNo7gaGu31itRlxKVjGjYxmdVuBOnh10RLa9tXxpORj6KiCFLHf7rb5_fP1rWtwPueqMJOzjqwv3v75_vDuzeJ_CKxBu6J-SA5V10sBj4m6YLhsP2HI/s1600-rw/00%20Get%20started%20with%20Codex%20CLI.png)

**Nota:** Allí debajo hay más instrucciones, ayudas, configuraciones sobre Codex CLI, revisar. 

tiene la primer forma de instalar Codex sólo poniendo la siguiente línea en una terminal:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Este es la forma que estoy utilizando para instalar Codex en Linux. El instalador descarga una versión **standalone**, es decir, un ejecutable nativo de Linux que incluye todo lo necesario para funcionar. 

---

# Requisitos

* Linux de 64 bits
* Conexión a Internet
* Una cuenta de ChatGPT (Free, Plus, Pro, Business o Enterprise)

No es necesario instalar previamente Node.js únicamente para usar Codex CLI.

> **Nota:** Node.js puede ser útil más adelante si deseas ejecutar determinados servidores MCP escritos en JavaScript, pero **no es un requisito para instalar ni ejecutar Codex CLI**.

---

# Paso 1. Instalar Codex CLI

Ejecuta:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

La salida será similar a esta:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQdvx9KnV0sJrPLhlRPz_IKgHbgv_FJy1JGOjA9qCHMAdsQXoB3Xz6bNHoU04q-8J62bxU1Hed2GyREyWBFeDNf3_VUBNIDUTuuG1bB9WYOrOBVVBI5N1K2cNNqFTy_HEN_Yh3CoCM-exaNeByBBMUoUAvYsBWD5BJInXyypa3OPybfwQE9MCoddVtHog/s1600-rw/01-instalando-Codex-CLI.png)



Durante la instalación podrás ver mensajes como:

* Detectando el sistema operativo.
* Descargando Codex CLI.
* Instalando el ejecutable.
* Añadiendo Codex al PATH.
* Preguntando si deseas iniciarlo inmediatamente.

---

# Paso 2. Iniciar sesión

La primera vez que ejecutes:

```bash
codex
```

aparecerá una pantalla como la siguiente:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeI4X6jFBYxPDLGego08Dmk9GhcIkeZNP2ixBra7YJIrd4YroJ09AR99g42OLoqQcB5Zoxfujw30gP5VP2OtZO-kS4isyfeuxQLeZ5Fnl-l1gM5UMpKydMDjLwcLlVEZVk8B5at1OJNevj4nf7N_M9agIkpwBGtUVS08tsIOA8SVq8ay6WAmXzeLT8NJA/s1600-rw/02-haciendo-login-con-ChatGPT.png)

La opción recomendada es:

```
1. Sign in with ChatGPT
```

Si ya tienes ChatGPT Plus, Pro, Business o Enterprise podrás utilizar tu suscripción.

---

# Paso 3. Comprobar la instalación

Verifica la versión:

```bash
codex --version
```

Ejemplo:

```
codex-cli 0.146.0
```

---

# Paso 4. ¿Dónde quedó instalado?

Muchas personas creen que Codex se instala mediante npm.

Puedes comprobar que **no es así**.

```bash
which codex
```

Ejemplo:

```
/home/usuario/.local/bin/codex
```

Ahora:

```bash
file "$(which codex)"
```

Obtendrás algo parecido a:

```
symbolic link to
~/.codex/packages/standalone/current/bin/codex
```

Y el ejecutable real es:

```bash
readlink -f "$(command -v codex)"
```

Ejemplo:

```
~/.codex/packages/standalone/releases/
0.146.0-x86_64-unknown-linux-musl/bin/codex
```

Esto demuestra que Codex se instaló como un **ejecutable nativo ELF**.

---

# Paso 5. ¿Por qué no aparece en npm?

Muchos usuarios hacen esta comprobación:

```bash
npm list -g --depth=0
```

Y observan algo parecido a:

```
corepack
npm
```

Sin ningún paquete llamado `@openai/codex`.

Esto **es completamente normal**.

El instalador oficial no utiliza npm para instalar Codex CLI, sino que descarga un binario autónomo. Por eso no aparecerá en la lista de paquetes globales de npm. ([GitHub][1])

---

# Los MCP más útiles para instalar en Codex CLI (2026)

MCP significa:

## Model Context Protocol

Es un protocolo que permite que Codex utilice herramientas externas.

Por ejemplo:

-   GitHub
-   PostgreSQL
-   documentación
-   Docker
-   navegadores
-   APIs
-   servidores propios

El ecosistema MCP crece continuamente. Existen cientos de servidores MCP, pero no es recomendable instalar todos.

La mejor práctica consiste en instalar únicamente los que realmente vas a utilizar.

A continuación encontrarás quince de los MCP que considero más útiles para la mayoría de desarrolladores.

> **Nota**
>
> Los comandos mostrados son los recomendados actualmente por cada proyecto o por la documentación oficial. Algunos utilizan servidores remotos (HTTP), mientras que otros ejecutan un programa local mediante `npx`, `uvx`, Docker o un binario.

---

# openai-docs

Una buena opción para comenzar es el servidor oficial de documentación de OpenAI.

Añádelo con:

Bash

```
codex mcp add openai-docs \
    --url https://developers.openai.com/mcp
```

Después verifica:

Bash

```
codex mcp list
```

Obtendrás algo parecido a:

```
openai-docs
Status: enabled
```

Y puedes inspeccionarlo:

Bash

```
codex mcp get openai-docs
```

---

**¿Qué significa "Auth: Unsupported"?**

Es habitual ver:

```
Auth: Unsupported
```

No significa que exista un problema.

Simplemente indica que ese servidor MCP no utiliza el mecanismo de autenticación OAuth que Codex sabe gestionar automáticamente.

El servidor de documentación de OpenAI es público, por lo que no necesita autenticación.

Para desinstalar:

```bash
codex mcp remove openai-docs

```

---

# GitHub

**¿Qué hace?**

Permite trabajar directamente con GitHub.

Ejemplos:

* Issues
* Pull Requests
* Reviews
* Releases
* Repositorios

Instalación (ejemplo con servidor oficial GitHub MCP):

```bash
codex mcp add github \
    --url https://api.githubcopilot.com/mcp
```

Puede requerir autenticación:

```bash
codex mcp login github
```

Para desinstalar:

```bash
codex mcp remove github
```

---

# Filesystem 

Permite acceder a carpetas del sistema.

Muy útil para proyectos grandes.

Instalación:

```bash
codex mcp add filesystem -- \
npx -y @modelcontextprotocol/server-filesystem
```

Para desinstalar:

```bash
codex mcp remove filesystem
```

No es recomendable compartir todo el directorio HOME.

---

# Git 

Permite consultar información avanzada de repositorios Git.

Instalación:

```bash
codex mcp add git -- \
uvx mcp-server-git
```

Para desinstalar:

```bash
codex mcp remove git
```

---

# Fetch

Permite leer páginas web y convertirlas a Markdown limpio.

Muy útil para documentación.

Instala `uv`:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Cierra y abre la terminal, o recarga el entorno:

```bash
source ~/.profile
```

Comprueba otra vez:

```bash
uvx --version
```

Instalación:

```bash
codex mcp add fetch -- \
  "$(command -v uvx)" \
  --with 'mcp<2' \
  mcp-server-fetch
```

**Nota (julio de 2026):** En el momento de escribir este tutorial existe una incompatibilidad temporal entre `mcp-server-fetch` y la versión 2 de la biblioteca `mcp`. Por ello, las pruebas y la configuración de Fetch deben realizarse así. Cuando los mantenedores actualicen `mcp-server-fetch` para ser compatible con `mcp` 2.x, probablemente ya no será necesario utilizar la opción `--with 'mcp<2'`. Esta recomendación es temporal y puede dejar de ser necesaria en futuras versiones.

Antes de configurarlo en Codex, prueba que Fetch pueda ejecutarse:

```bash
uvx --with 'mcp<2' mcp-server-fetch --help
```
Si todo funciona bien deberías ver algo como:

```bash
uvx --with 'mcp<2' mcp-server-fetch --help
usage: mcp-server-fetch [-h] [--user-agent USER_AGENT] [--ignore-robots-txt]
                        [--proxy-url PROXY_URL]

give a model the ability to make web requests

options:
  -h, --help            show this help message and exit
  --user-agent USER_AGENT
                        Custom User-Agent string
  --ignore-robots-txt   Ignore robots.txt restrictions
  --proxy-url PROXY_URL
                        Proxy URL to use for requests
```

Comprueba la configuración:

```bash
codex mcp get fetch
```

deberias mostrar algo como:

```bash
codex mcp get fetch
fetch
  enabled: true
  transport: stdio
  command: /home/tuusuario/.local/bin/uvx
  args: --with mcp<2 mcp-server-fetch
  cwd: -
  env: -
  remove: codex mcp remove fetch
```

y:

```bash
codex mcp list
```

Debería mostrar algo parecido a:

```
Name        Command                      Args                                        Env  Cwd  Status   Auth
fetch       /home/wachin/.local/bin/uvx  --with mcp<2 mcp-server-fetch               -    -    enabled  Unsupported
```

Después inicia Codex:

```bash
codex
```

## Comprobar que Codex puede utilizarlo

Escribe, por ejemplo:

```
Lee esta página utilizando Fetch y hazme un resumen:

https://modelcontextprotocol.io/
```

Si Codex responde correctamente y ya no aparece el mensaje:

```
MCP startup incomplete (failed: fetch)
```

entonces Fetch está funcionando correctamente dentro de Codex.

---

## ¿Cómo se utiliza un MCP como Fetch?

Una de las dudas más comunes cuando se instala un servidor MCP es pensar que hay que ejecutarlo manualmente.

Por ejemplo, muchos usuarios buscan un comando parecido a:

```bash
fetch https://www.ejemplo.com
```

o intentan escribir dentro de Codex:

```
/use fetch
```

Sin embargo, **los MCP no funcionan así**.

Una vez instalado correctamente, **Codex utiliza el servidor MCP automáticamente cuando considera que puede ayudarle a responder tu solicitud**.

El flujo de trabajo es el siguiente:

```
Usuario
    │
    ▼
Escribe un prompt
    │
    ▼
Codex analiza la solicitud
    │
    ├── ¿Necesito GitHub?
    ├── ¿Necesito Fetch?
    ├── ¿Necesito OpenAI Docs?
    ├── ¿Necesito otro MCP?
    │
    ▼
Codex llama automáticamente al MCP adecuado
    │
    ▼
Obtiene la información necesaria
    │
    ▼
Genera la respuesta
```

Como usuario, normalmente **no tienes que indicar qué MCP utilizar**.

Codex seleccionará automáticamente la herramienta más adecuada.

---

## ¿Para qué sirve Fetch?

Fetch es un servidor MCP especializado en **leer páginas web**.

Su función consiste en descargar el contenido de una página HTML y convertirlo automáticamente a Markdown limpio para que el modelo pueda analizarlo con mayor facilidad.

Durante ese proceso elimina gran parte del contenido que normalmente no resulta útil, por ejemplo:

* anuncios
* hojas de estilo (CSS)
* código JavaScript
* menús de navegación
* barras laterales
* elementos decorativos

De esta forma Codex recibe principalmente el contenido del documento.

---

### Ejemplo 1

Supongamos que escribes en Codex:

> Lee esta página y hazme un resumen.

```
https://docs.python.org/3/tutorial/classes.html
```

Codex detectará que necesita acceder a esa página.

Entonces utilizará automáticamente Fetch para descargarla, convertirla a Markdown y finalmente generar el resumen solicitado.

---

### Ejemplo 2

También puedes pedir:

> Compara la documentación de QFile y QFileInfo en Qt 6.

Codex utilizará Fetch para consultar ambas páginas y realizar la comparación.

---

### Ejemplo 3

Puedes analizar tu propio sitio web.

Por ejemplo:

> Analiza este artículo de mi blog y dime si tiene errores de redacción.

```
https://facilitarelsoftwarelibre.blogspot.com/
```

Fetch descargará la página y Codex podrá revisarla.

---

### Ejemplo 4

También puede utilizarse para generar documentación.

Por ejemplo:

> Lee esta página y crea un README basado en su contenido.

---

## ¿Cómo sé si Codex utilizó Fetch?

Depende de la versión de Codex CLI.

En algunas versiones aparece un mensaje similar a:

```
Using MCP tool: fetch
```

o

```
fetch(...)
```

En otras versiones simplemente genera la respuesta sin mostrar qué herramienta utilizó.

---

## ¿Fetch funciona únicamente con Internet?

No.

Su uso principal consiste en leer páginas web públicas de Internet.

Por ejemplo:

```
https://docs.python.org/

https://doc.qt.io/

https://github.com/

https://facilitarelsoftwarelibre.blogspot.com/
```

Sin embargo, también puede acceder a servidores web que estén ejecutándose en tu propia computadora o dentro de tu red local.

Por ejemplo:

```
http://localhost:8000

http://127.0.0.1:5000

http://192.168.1.100
```

Esto resulta especialmente útil durante el desarrollo de aplicaciones web.

---

## ¿Puede leer archivos del disco duro?

No.

Fetch **no está diseñado para leer archivos locales** como:

```
/home/usuario/documento.md

/home/usuario/index.html
```

Para trabajar con archivos almacenados en el disco existe otro servidor MCP denominado **Filesystem**, cuya finalidad es proporcionar acceso al sistema de archivos.

---

### Ejemplo práctico

Supongamos que estás desarrollando una aplicación Flask.

La ejecutas con:

```
http://localhost:5000
```

Puedes escribir:

> Analiza la página principal de mi aplicación que está ejecutándose en localhost.

Codex utilizará Fetch para acceder a esa dirección y analizar el HTML generado por tu aplicación.

---

### Otro ejemplo

Estás escribiendo documentación con MkDocs.

La documentación se encuentra disponible en:

```
http://localhost:8000
```

Puedes pedir:

> Busca enlaces rotos en la documentación.

Codex utilizará Fetch para recorrer las páginas necesarias y ayudarte a encontrar errores.

---

## Advertencia de seguridad

El servidor Fetch puede acceder tanto a páginas públicas de Internet como a direcciones disponibles dentro de tu red local.

Por este motivo, debes tener cuidado cuando trabajes con servicios internos o información confidencial.

Por ejemplo:

```
http://192.168.1.50

http://10.0.0.5

http://localhost:8080
```

Si esos servidores contienen información sensible, únicamente deberías permitir su análisis cuando realmente lo necesites y entiendas qué información podría quedar disponible para el modelo.

---

## ¿Cuándo merece la pena instalar Fetch?

Fetch resulta especialmente útil si trabajas con:

* documentación técnica
* blogs
* GitHub Pages
* MkDocs
* Docusaurus
* documentación de APIs
* sitios web
* aplicaciones web en desarrollo
* servidores locales (`localhost`)

En cambio, si únicamente desarrollas aplicaciones de escritorio o trabajas exclusivamente con archivos almacenados en tu disco duro, Fetch aporta poco valor.

En esos casos, el servidor MCP más adecuado suele ser **Filesystem**, ya que está diseñado específicamente para trabajar con archivos y directorios locales.

Fetch es una herramienta que **Codex utiliza automáticamente** cuando necesita leer el contenido de una página web para responder mejor a una consulta.

En la mayoría de los casos, basta con proporcionar una URL en tu prompt y dejar que Codex decida cuándo utilizar Fetch. Esa integración automática es una de las principales ventajas del ecosistema MCP.

Para desinstalar:

```bash
codex mcp remove fetch
```

---

# PostgreSQL

Ideal para aplicaciones empresariales.

Permite consultar bases de datos PostgreSQL.

Instalación:

```bash
codex mcp add postgres -- \
npx -y @modelcontextprotocol/server-postgres \
postgresql://usuario:password@localhost/basedatos
```

Se recomienda utilizar una base de datos de desarrollo.

Para desinstalar:

```bash
codex mcp remove postgres
```

---

# SQLite

Excelente para aplicaciones de escritorio.

Instalación:

```bash
codex mcp add sqlite -- \
uvx mcp-server-sqlite \
~/mi_base.sqlite
```

Para desinstalar:

```bash
codex mcp remove sqlite
```

---

# ¿Dónde encontrar más MCP?

El registro oficial de MCP se encuentra en:

[https://registry.modelcontextprotocol.io/](https://registry.modelcontextprotocol.io/)

Allí encontrarás cientos de servidores MCP organizados por categorías.

También es recomendable consultar:

[https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)

---

# Recomendación

No instales veinte o treinta MCP el primer día.

Una excelente configuración inicial sería:

* ✅ OpenAI Docs
* ✅ GitHub
* ✅ Filesystem
* ✅ Git
* ✅ Fetch

Si desarrollas aplicaciones con bases de datos:

* ✅ PostgreSQL
* ✅ SQLite

---

# Referencias

**OpenAI Codex CLI (GitHub)**  
[https://github.com/openai/codex](https://github.com/openai/codex)

**OpenAI Codex CLI – Documentación oficial**  
[https://developers.openai.com/codex/cli](https://developers.openai.com/codex/cli)

**OpenAI Developers**  
[https://developers.openai.com/](https://developers.openai.com/)

**Model Context Protocol (MCP)**  
[https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)

**Model Context Protocol Registry**  
[https://registry.modelcontextprotocol.io/](https://registry.modelcontextprotocol.io/)

**Model Context Protocol – GitHub**  
[https://github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)

**OpenAI Documentation MCP Server**  
[https://developers.openai.com/mcp](https://developers.openai.com/mcp)

**GitHub MCP Server**  
[https://github.com/github/github-mcp-server](https://github.com/github/github-mcp-server)

**Filesystem MCP Server**  
[https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)

**Git MCP Server**  
[https://github.com/modelcontextprotocol/servers/tree/main/src/git](https://github.com/modelcontextprotocol/servers/tree/main/src/git)

**Fetch MCP Server**  
[https://github.com/modelcontextprotocol/servers/tree/main/src/fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)

**PostgreSQL MCP Server**  
[https://github.com/modelcontextprotocol/servers/tree/main/src/postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres)

**SQLite MCP Server**  
[https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite)

**uv – Gestor de paquetes y entornos para Python**  
[https://docs.astral.sh/uv/](https://docs.astral.sh/uv/)

**Node.js**  
[https://nodejs.org/](https://nodejs.org/)

**npm**  
[https://docs.npmjs.com/](https://docs.npmjs.com/)

**Git**  
[https://git-scm.com/](https://git-scm.com/)

**GitHub Docs**  
[https://docs.github.com/](https://docs.github.com/)

**Python**  
[https://www.python.org/](https://www.python.org/)