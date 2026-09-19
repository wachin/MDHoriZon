# Cómo instalar OpenAI Codex en Termux (Android) con soporte MCP Filesystem

Este tutorial explica cómo instalar Codex en Termux sobre Android y cómo habilitar el MCP Filesystem para que Codex pueda leer y analizar proyectos almacenados en el teléfono.

![](images/01-Codex-en-Android.webp)

## 1. Actualizar Termux

Primero actualizamos los paquetes del sistema:

```bash
pkg update && pkg upgrade -y
```

## 2. Instalar Node.js LTS

Codex necesita Node.js.

```bash
pkg install nodejs-lts -y
```

Verificamos:

```bash
node --version
npm --version
npx --version
```

Ejemplo:

```
v24.15.0
11.16.0
11.16.0
```

## 3. Instalar Codex para Termux

Instalamos la versión adaptada para Android:

```bash
npm install -g @mmmbuto/codex-cli-termux@latest
```

Verificamos:

```bash
codex --version
```

## 4. Iniciar sesión

Antes de iniciar sesión desde Termux, debes ir a tu ordenador donde tengas abierta tu sesión de ChatGPT:

[https://chatgpt.com/](https://chatgpt.com/)

y allí ir a:

**Configuración**

y allí en:

**Seguridad e inicio de sesión**

Habilitar (moviendo la perilla):

**Habilitar autorización mediante código de dispositivo para Codex**

Ahora si en Termux coloca

```bash
codex login
```

Esto abrirá un navegador Web en tu celular Android, y sigue las instrucciones que aparecen en pantalla para autenticar tu cuenta.

## 5. Crear un MCP Filesystem

Este MCP permite que Codex lea archivos de nuestros proyectos.

```bash
codex mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /storage/emulated/0/gh
```

Comprobar:

```bash
codex mcp list
```

Debería aparecer algo similar a:

```
filesystem  npx  -y @modelcontextprotocol/server-filesystem /storage/emulated/0/gh
```

## 6. Configurar startup_timeout_sec

Editar:

```bash
nano ~/.codex/config.toml
```

Contenido típico:

```toml
[projects."/storage/emulated/0/gh/whatsapp-termux-video-compressor"]
trust_level = "trusted"

[tui.model_availability_nux]
"gpt-5.5" = 4

[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/storage/emulated/0/gh"]
startup_timeout_sec = 120
```

El parámetro:

```toml
startup_timeout_sec = 120
```

da más tiempo para que el MCP termine de arrancar. Con todo puede que no se inicien los MCP al inicio, por lo que habrá que esperar a que luego se inicien solos.

## 7. Actualizar Codex si hay problemas

Durante las pruebas aparecieron errores relacionados con MCP internos.

La versión instalada inicialmente era:

```
0.137.0
```

Actualizar a la última versión ayudó a resolver varios problemas:

```bash
npm install -g @mmmbuto/codex-cli-termux@latest
```

Comprobar:

```bash
codex --version
```

**Nota:** De vez en cuanto hay que actualizar (si haya actualizaciones se actualizará)

## 8. Ejecutar Codex

Entrar en la carpeta del proyecto:

```bash
cd /storage/emulated/0/gh/mi-proyecto
```

Iniciar Codex:

```bash
codex
```

**Nota: **En el uso de este Codex muchas veces al inicio no se inician todos los MCP, pero usandolo de todas maneras luego se inician solos.

## 9. Ejemplos de uso

Analizar un proyecto:

```
Usa el MCP filesystem para revisar los archivos de este proyecto y encontrar posibles errores.
```

Pedir mejoras:

```
Revisa este proyecto y sugiere mejoras.
```

Corregir problemas:

```
Corrige los errores encontrados y explícame cada cambio.
```

## 10. Problema de Git "dubious ownership"

Si Codex informa:

```
fatal: detected dubious ownership
```

ejecutar:

```bash
git config --global --add safe.directory /storage/emulated/0/gh/mi-proyecto
```

## 11. Paquetes recomendados para potenciar Codex en Termux

Aunque Codex funciona correctamente con una instalación básica, existen varias herramientas que pueden mejorar significativamente su capacidad para analizar proyectos, buscar archivos, localizar funciones y trabajar con repositorios Git.

### Instalación recomendada

```bash
pkg install git ripgrep fd jq tree -y
```

### Git

```bash
pkg install git -y
```

Git permite a Codex:

* Analizar repositorios Git.
* Ver archivos modificados.
* Revisar historial de cambios.
* Crear parches y commits.
* Comparar versiones de archivos.

Sin Git, muchas tareas relacionadas con el desarrollo de software estarán limitadas.

### Ripgrep (rg)

```bash
pkg install ripgrep -y
```

Ripgrep es una herramienta extremadamente rápida para buscar texto dentro de proyectos.

Codex puede utilizarla para:

* Buscar funciones.
* Encontrar clases.
* Localizar variables.
* Encontrar cadenas de texto específicas.
* Analizar grandes proyectos rápidamente.

Por ejemplo, buscar dónde se utiliza una función determinada.

### FD

```bash
pkg install fd -y
```

FD es una alternativa moderna y rápida al comando `find`.

Codex puede utilizarla para:

* Encontrar archivos rápidamente.
* Localizar configuraciones.
* Buscar archivos Python, JavaScript, Markdown, etc.
* Navegar grandes árboles de directorios.

### JQ

```bash
pkg install jq -y
```

JQ permite procesar archivos JSON desde la línea de comandos.

Codex puede utilizarlo para:

* Analizar `package.json`.
* Revisar configuraciones JSON.
* Procesar respuestas de APIs.
* Modificar archivos JSON automáticamente.

### Tree

```bash
pkg install tree -y
```

Tree muestra la estructura completa de un proyecto.

Codex puede utilizarlo para:

* Comprender la organización de carpetas.
* Analizar proyectos complejos.
* Mostrar la estructura de un repositorio.

Ejemplo:

```bash
tree -L 2
```

### Tree-sitter (opcional)

Si está disponible en tu repositorio de Termux:

```bash
pkg install tree-sitter -y
```

Tree-sitter es una biblioteca avanzada para analizar código fuente.

Muchos analizadores modernos la utilizan para comprender:

* Funciones.
* Clases.
* Variables.
* Estructuras sintácticas.

Aunque Codex no la necesita obligatoriamente, puede resultar útil para herramientas auxiliares de análisis de código.

### Comprobar qué herramientas puede usar Codex

Puedes preguntarle directamente a Codex:

```
¿Qué herramientas externas detectas disponibles en este entorno?
```

o también:

```
Comprueba si tienes acceso a git, rg, fd, jq y tree.
```

De esta manera podrás verificar exactamente qué herramientas externas detecta y puede utilizar dentro de Termux.

---

## 12. Herramientas adicionales para desarrollo asistido por Codex

Estas herramientas no son necesarias para utilizar Codex, pero pueden ser muy útiles dependiendo del tipo de proyecto.

### Python

```bash
pkg install python -y
```

Permite a Codex:

* Ejecutar scripts Python.
* Validar sintaxis.
* Ejecutar pruebas.
* Crear herramientas auxiliares.

### Clang

```bash
pkg install clang -y
```

Permite compilar programas en:

* C
* C++

Codex puede utilizarlo para verificar compilación y corregir errores de código.

### Make

```bash
pkg install make -y
```

Muchos proyectos utilizan archivos `Makefile`.

Codex puede:

* Compilar proyectos.
* Ejecutar tareas automatizadas.
* Lanzar suites de pruebas.

### ZIP y UNZIP

```bash
pkg install zip unzip -y
```

Permiten:

* Crear paquetes ZIP.
* Descomprimir proyectos.
* Analizar código distribuido en archivos comprimidos.

### Yarn

```bash
pkg install yarn -y
```

Administrador alternativo de paquetes para Node.js.

Codex puede utilizarlo para:

* Instalar dependencias.
* Ejecutar scripts de proyectos JavaScript.
* Gestionar proyectos React, Vue, Angular y Node.js.

### Otras herramientas útiles

#### FFmpeg

```bash
pkg install ffmpeg -y
```

Especialmente útil para:

* Audio.
* Vídeo.
* Conversión multimedia.
* Automatización de tareas audiovisuales.

#### ImageMagick

```bash
pkg install imagemagick -y
```

Permite:

* Convertir imágenes.
* Redimensionar imágenes.
* Automatizar procesos gráficos.

#### Curl

```bash
pkg install curl -y
```

Permite descargar archivos y consultar APIs desde la terminal.

#### Wget

```bash
pkg install wget -y
```

Alternativa clásica para descargar archivos.

#### SQLite

```bash
pkg install sqlite -y
```

Muy útil para proyectos que utilizan bases de datos SQLite.

### Instalación completa recomendada

```bash
pkg install git ripgrep fd jq tree python clang make zip unzip yarn ffmpeg imagemagick curl wget sqlite -y
```

Con estas herramientas instaladas, Codex tendrá acceso a un entorno de desarrollo mucho más completo y podrá ayudarte en una mayor variedad de tareas.

---

## 13. ¿Qué hacer si aparece el mensaje "Codex ran out of room in the model's context window"?

Mientras se trabaja con proyectos grandes en Codex, especialmente cuando se utilizan MCP como Filesystem para analizar numerosos archivos, puede aparecer el siguiente mensaje:

```
Codex ran out of room in the model's context window.
Start a new thread or clear earlier history before retrying.
```

Este mensaje no indica un error en Termux, en Android, en el MCP Filesystem ni en el proyecto que se está desarrollando.

Lo que sucede es que la conversación actual ha acumulado demasiada información:

* Mensajes anteriores.
* Archivos leídos.
* Resultados de herramientas.
* Explicaciones generadas.
* Cambios realizados.
* Historial completo de la sesión.

Cuando la cantidad de información supera la capacidad de memoria temporal disponible para la conversación, Codex solicita iniciar una nueva sesión.

### La mejor solución

Antes de cerrar la sesión actual, es recomendable pedir a Codex un resumen completo del trabajo realizado.

Por ejemplo:

```
Resume todo lo realizado en este proyecto hasta ahora.

Incluye:
- Objetivo del proyecto.
- Archivos modificados.
- Problemas corregidos.
- Tareas pendientes.
- Próximos pasos.

Genera un resumen técnico para continuar en una nueva sesión,
con el nombre "development_session_summary.md"
```

o también puedes pedirle que el nombre sea:

```bash
nano PROJECT_STATUS.md
```

### Continuar el trabajo en una nueva sesión

Una vez guardado el resumen:

1. Cerrar la sesión actual de Codex.
2. Abrir una nueva sesión.
3. Pedir a Codex que lea el archivo de resumen.

Por ejemplo:

```
Lee el archivo PROJECT_STATUS.md y continúa el trabajo desde allí.
```

De esta forma se recupera rápidamente el contexto sin necesidad de repetir toda la conversación anterior.

### Recomendación para proyectos grandes

En proyectos de larga duración es una buena práctica mantener un archivo como:

```
PROJECT_STATUS.md
```

o

```
TODO.md
```

actualizado periódicamente.

Incluso se puede pedir a Codex:

```
Actualiza PROJECT_STATUS.md con:

- Estado actual del proyecto.
- Cambios realizados.
- Problemas pendientes.
- Próximos pasos.
```

Esto permite continuar el trabajo fácilmente incluso después de varios días o semanas.

### Reducir el consumo de contexto

Otra estrategia útil consiste en pedir a Codex que analice únicamente los archivos necesarios.

Por ejemplo:

```
Analiza únicamente:

- main.py
- database.py
- README.md

Ignora el resto del proyecto.
```

Cuantos menos archivos y resultados tenga que recordar Codex, más tiempo podrá trabajar antes de alcanzar el límite de contexto.

---

Dios les bendiga

--- 

# Referencias

**OpenAI Codex Documentation**  
[https://developers.openai.com/codex/](https://developers.openai.com/codex/)

**OpenAI Codex Configuration Reference**  
[https://developers.openai.com/codex/config-reference](https://developers.openai.com/codex/config-reference)

**Model Context Protocol (MCP) Official Website**  
[https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)

**Model Context Protocol (MCP) GitHub Organization**  
[https://github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)

**Filesystem MCP Server**  
[https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)

**OpenAI Codex GitHub Repository**  
[https://github.com/openai/codex](https://github.com/openai/codex)

**Termux Official Website**  
[https://termux.dev/](https://termux.dev/)

**Termux Package Management Documentation**  
[https://wiki.termux.com/wiki/Package_Management](https://wiki.termux.com/wiki/Package_Management)

**Ripgrep (rg)**  
[https://github.com/BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep)

**FD - Simple, Fast and User-Friendly Alternative to Find**  
[https://github.com/sharkdp/fd](https://github.com/sharkdp/fd)

**JQ - Command-line JSON Processor**  
[https://jqlang.github.io/jq/](https://jqlang.github.io/jq/)

**Git Documentation**  
[https://git-scm.com/doc](https://git-scm.com/doc)

**Tree Utility**  
[https://oldmanprogrammer.net/source.php?dir=projects/tree](https://oldmanprogrammer.net/source.php?dir=projects/tree)

**Tree-sitter**  
[https://tree-sitter.github.io/tree-sitter/](https://tree-sitter.github.io/tree-sitter/)

**Node.js**  
[https://nodejs.org/](https://nodejs.org/)

**npm Documentation**  
[https://docs.npmjs.com/](https://docs.npmjs.com/)

**Yarn Package Manager**  
[https://yarnpkg.com/](https://yarnpkg.com/)

**FFmpeg**  
[https://ffmpeg.org/](https://ffmpeg.org/)

**ImageMagick**  
[https://imagemagick.org/](https://imagemagick.org/)

**SQLite Documentation**  
[https://sqlite.org/docs.html](https://sqlite.org/docs.html)




