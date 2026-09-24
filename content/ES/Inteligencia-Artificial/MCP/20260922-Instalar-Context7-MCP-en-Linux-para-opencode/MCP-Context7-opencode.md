# Cómo instalar Context7 MCP en Linux para usarlo con OpenCode



Si utilizas un agente de inteligencia artificial para programar, probablemente ya has visto el término **MCP** (Model Context Protocol). Al principio puede parecer otro concepto más relacionado con IA, pero en realidad es bastante sencillo:

> **MCP permite conectar un agente de IA con herramientas y servicios externos que el agente puede utilizar durante una conversación.**

Por ejemplo, un agente puede tener sus propias herramientas para leer archivos, ejecutar comandos o trabajar con Git. Con MCP podemos añadirle otras capacidades.

En este tutorial vamos a instalar **Context7** en Linux y conectarlo con **OpenCode CLI**.

El objetivo de Context7 es muy concreto: proporcionar al agente **documentación actualizada de bibliotecas y frameworks de programación**, en lugar de obligarlo a depender exclusivamente de lo que recuerda el modelo.

---

## ¿Qué es MCP?

MCP significa **Model Context Protocol**.

Podemos imaginarlo como una especie de "enchufe estándar" para agentes de IA.

Sin MCP:

```
                    Agente de IA
                         │
                         ├── archivos
                         ├── terminal
                         ├── Git
                         └── búsqueda
```

Con MCP:

```
                    Agente de IA
                         │
             ┌───────────┴───────────┐
             │                       │
       Herramientas propias       Servidores MCP
                                     │
                          ┌──────────┼──────────┐
                          │          │          │
                       Context7    GitHub    Base de datos
```

OpenCode puede conectarse a servidores MCP externos y utilizarlos como herramientas. Una vez añadidos, las herramientas MCP están disponibles automáticamente para el LLM junto con las herramientas integradas.

### MCP no es una IA

Es importante entender esto.

**Context7 no es otro modelo de inteligencia artificial que sustituya a tu modelo principal.**

En nuestro caso:

```
OpenCode
    │
    ├── modelo de IA
    │
    └── MCP
          │
          └── Context7
                 │
                 └── documentación
```

El modelo sigue siendo el agente que razona y trabaja en el proyecto.

Context7 simplemente le proporciona información documental cuando la necesita.

---

## ¿Qué hace Context7?

Context7 está especializado en documentación de programación.

Por ejemplo, podemos preguntarle a OpenCode:

> Utiliza Context7 para buscar la documentación actual de PyQt6 y explícame cómo funciona QGraphicsView.

El agente puede primero buscar qué biblioteca corresponde a PyQt6:

```
resolve-library-id
```

y después consultar la documentación:

```
query-docs
```

Esas son precisamente las dos herramientas que proporciona actualmente el servidor MCP de Context7.

Esto resulta especialmente útil cuando trabajamos con bibliotecas que cambian con el tiempo.

---

## Una advertencia importante antes de instalar MCP

Aquí es donde quiero hacer una pausa.

**No recomiendo instalar servidores MCP a ciegas.**

Un MCP puede tener herramientas que permitan:

- leer archivos;
- escribir archivos;
- ejecutar comandos;
- acceder a bases de datos;
- utilizar APIs;
- modificar repositorios;
- acceder a servicios externos.

Por tanto, instalar un MCP es parecido a instalar una extensión, plugin o programa adicional: **hay que saber qué estamos instalando y qué permisos tendrá**.

Y esta precaución no es exagerada.

### Un ejemplo real: el incidente de GitHub

En mayo de 2026, GitHub informó de un incidente en el que un dispositivo de uno de sus empleados fue comprometido mediante una **extensión de VS Code maliciosa publicada por un tercero**. GitHub indicó que detectó y contuvo el incidente y que su investigación inicial apuntaba a la extracción de repositorios internos de GitHub.

Este tipo de incidentes demuestra algo importante:

> **Que una herramienta esté diseñada para ayudar a programar no significa que debamos instalarla sin comprobar su procedencia y capacidades.**

Por eso, en este tutorial no solamente vamos a instalar Context7. También vamos a comprobar **qué herramientas expone realmente**.

---

## Context7: servidor remoto o servidor local

Hay dos formas principales de utilizar Context7.

### Servidor remoto

El agente se conecta a:

```
https://mcp.context7.com/mcp
```

No ejecutamos el servidor MCP en nuestro ordenador.

### Servidor local

También podemos ejecutar el servidor mediante Node.js, por ejemplo utilizando `@upstash/context7-mcp`.

La documentación oficial de Context7 muestra ambas posibilidades.

Para este tutorial utilizaremos **el servidor remoto HTTP**, porque es la opción más sencilla y no necesitamos instalar un nuevo programa MCP localmente.

---

## Requisitos

Necesitamos:

- Linux
- OpenCode CLI
- una versión reciente de OpenCode con soporte MCP
- conexión a Internet

OpenCode permite añadir servidores MCP mediante el comando:

```bash
opencode mcp add
```

y soporta el transporte HTTP para servidores remotos.

---

## Paso 1: comprobar que OpenCode tiene MCP

En una terminal ejecutamos:

```bash
opencode mcp
```

Si ejecutamos:

```bash
opencode mcp add
```

sin argumentos, OpenCode mostrará un asistente interactivo para añadir el servidor MCP.

---

## Paso 2: instalar Context7

Utilizaremos el servidor oficial de Context7:

```
https://mcp.context7.com/mcp
```

El propio registro de Context7 publica este endpoint como su servidor MCP remoto.

Ejecutamos:

```bash
opencode mcp add
```

El asistente nos guiará paso a paso:

1. **Location**: elegimos `Global` (para que esté disponible en todos los proyectos).
2. **Enter MCP server name**: escribimos `context7`.
3. **Select MCP server type**: elegimos `Remote`.
4. **Enter MCP server URL**: escribimos `https://mcp.context7.com/mcp`.
5. **Does this server require OAuth authentication?**: seleccionamos `No`.

Si todo funciona correctamente, OpenCode mostrará:

```
MCP server "context7" added to /home/tu-usuario/.config/opencode/opencode.json
MCP server added successfully
```

## ¿Qué significa `Global`?

OpenCode tiene distintos ámbitos de configuración.

El ámbito **global** significa que el servidor queda disponible para todos tus proyectos en esa cuenta de usuario.

OpenCode documenta `~/.config/opencode/opencode.json` como la configuración global. También existe una configuración por proyecto en `opencode.json` dentro del proyecto.

---

## Paso 3: comprobar la conexión

Ahora ejecutamos:

```bash
opencode mcp list
```

Deberíamos obtener algo parecido a:

```
┌  MCP Servers
│
●  ✓ context7 connected
│      https://mcp.context7.com/mcp
│
└  1 server(s)
```

La palabra importante aquí es:

```
✓ connected
```

Esto significa que OpenCode consiguió conectarse al servidor.

---

## Paso 4: comprobar qué herramientas tiene Context7

Este es un paso **muy importante desde el punto de vista de la seguridad**.

No nos limitamos a asumir que Context7 era seguro porque alguien lo dijo en Internet.

**Comprobamos qué herramientas estaba ofreciendo realmente a OpenCode.**

Las dos herramientas que Context7 expone son:

```
context7_resolve-library-id
context7_query-docs
```

Ambas están diseñadas para ser **read-only** (solo lectura).

### ¿Qué significan esas dos herramientas?

#### `resolve-library-id`

Sirve para identificar una biblioteca y encontrar su identificador correspondiente en Context7.

Por ejemplo:

```
pymupdf4llm
```

puede resolverse a `/pymupdf/pymupdf4llm`.

La implementación oficial describe esta herramienta como un mecanismo para resolver el nombre de una biblioteca hacia un identificador compatible con Context7.

#### `query-docs`

Es la herramienta que permite consultar la documentación de la biblioteca encontrada.

Por ejemplo:

```
table detection configuration markdown conversion
```

El servidor devuelve documentación y ejemplos relevantes.

La implementación oficial de Context7 describe `query-docs` precisamente como la herramienta para recuperar documentación y ejemplos de código actualizados.

### Algo que tranquiliza bastante: son herramientas de solo lectura

En nuestra prueba, las herramientas fueron identificadas como:

```
read-only
```

Esto es importante.

No encontramos herramientas como:

```
shell
exec
run_command
write_file
delete_file
```

Context7 no necesitaba acceso al terminal de nuestro Linux.

Tampoco necesitaba permisos para modificar el proyecto.

Su función era básicamente:

```
pregunta
   ↓
Context7
   ↓
documentación
   ↓
OpenCode
```

---

## Paso 5: hacer una prueba real

Una vez conectado Context7, podemos probarlo con algo sencillo:

```
Utiliza Context7 para buscar la documentación actual de pymupdf4llm y explícame cómo configurarlo para que detecte y preserve mejor las tablas al convertir PDF a Markdown. No modifiques ningún archivo.
```

En nuestra prueba ocurrió exactamente lo que esperábamos.

OpenCode llamó primero:

```
context7_resolve-library-id
```

Después encontró la documentación de pymupdf4llm y llamó:

```
context7_query-docs
```

Finalmente utilizó esa información para explicar cómo configurar la detección de tablas.

---

## OpenCode pide autorización antes de utilizar el MCP

Hay otra característica de seguridad interesante.

La primera vez que OpenCode intentó utilizar:

```
context7_resolve-library-id
```

mostró:

```
Allow execution of MCP tool "resolve-library-id" from server "context7"?

1. Allow once
2. Allow always
3. Deny
```

Después hizo lo mismo con:

```
context7_query-docs
```

Esto permite al usuario **ver qué herramienta quiere ejecutar el agente antes de permitirla**.

Además, OpenCode puede ofrecer diferentes niveles de autorización, incluyendo permitir una herramienta solamente una vez o permitirla posteriormente para el proyecto o usuario.

---

## ¿Es Context7 seguro?

Aquí conviene ser precisos.

No existe una forma seria de decir:

> "Este software tiene garantía absoluta de estar libre de virus."

Eso no existe.

Lo que sí podemos hacer es **reducir el riesgo mediante comprobaciones**.

En este caso encontramos varias señales favorables:

### 1. Procedencia

Utilizamos el servidor oficial:

```
https://mcp.context7.com/mcp
```

La documentación y el repositorio oficial de Context7 publican ese endpoint.

### 2. Código público

El proyecto oficial de Context7 está publicado públicamente en GitHub bajo la organización Upstash.

### 3. Herramientas limitadas

Nuestro propio OpenCode mostró solamente:

```
2 tools
```

y ambas eran:

```
read-only
```

### 4. No instalamos un ejecutable local

En este tutorial utilizamos:

```bash
opencode mcp add
```

con la opción `Remote`.

Por tanto, OpenCode se conecta al servidor remoto mediante HTTP.

No ejecutamos:

```bash
npx @upstash/context7-mcp
```

en nuestra máquina.

La documentación oficial también ofrece una modalidad local mediante `npx`, pero es una alternativa diferente.

---

## ¿Entonces Context7 puede leer mis archivos?

**No mediante las dos herramientas que comprobamos.**

Esto es algo que conviene explicar claramente.

Tu agente OpenCode puede tener sus propias herramientas para:

```
leer archivos
buscar archivos
ejecutar Bash
utilizar Git
```

Pero esas capacidades pertenecen a **OpenCode**.

Context7 añadió solamente:

```
resolve-library-id
query-docs
```

No debemos confundir las capacidades del agente con las capacidades del MCP.

---

## Una precaución MUY importante

Aunque `query-docs` sea de solo lectura, **no debemos enviar información confidencial a un servicio externo**.

La implementación oficial de Context7 advierte expresamente que las consultas enviadas a `resolve-library-id` y `query-docs` no deben contener API keys, contraseñas, credenciales, datos personales ni código propietario.

Por ejemplo, esto está bien:

```
¿Cómo funciona QGraphicsView en PyQt6?
```

Pero no deberíamos hacer:

```
Busca en esta API key:
sk-xxxxxxxx
```

ni:

```
Analiza este código propietario y envíalo a Context7.
```

La regla práctica es:

> **Utiliza Context7 para consultar documentación, no para enviar secretos ni código privado.**

---

## ¿Necesito una API Key de Context7?

Actualmente Context7 recomienda obtener una API Key gratuita para disponer de límites de uso superiores, pero el servidor remoto puede utilizarse con el acceso básico.

Por eso, para empezar podemos probarlo sin añadir otra credencial.

Si posteriormente necesitas mayor capacidad, puedes utilizar una API Key de Context7 editando el archivo de configuración:

```json
{
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "tu_api_key_aqui"
      }
    }
  }
}
```

---

## ¿Funciona solamente con OpenCode?

**No.**

MCP es un protocolo, no una función exclusiva de OpenCode.

El mismo servidor Context7 puede utilizarse desde diferentes clientes/agentes compatibles con MCP.

Por tanto, conceptualmente:

```
                  Context7
                     │
          ┌──────────┼──────────┐
          │          │          │
       OpenCode   Cursor    otros MCP
```

Cada agente tiene su propia forma de configurar el servidor.

**En este tutorial hemos utilizado OpenCode porque es el agente que estamos configurando.**

---

## ¿Dónde queda instalado?

En nuestro caso utilizamos el ámbito global:

```bash
opencode mcp add
```

OpenCode registra el servidor en la configuración del usuario.

La documentación de OpenCode indica que los servidores MCP de usuario se almacenan en:

```
~/.config/opencode/opencode.json
```

mientras que un servidor específico de un proyecto puede configurarse en:

```
opencode.json
```

dentro del proyecto.

---

## Cómo eliminar Context7

Si posteriormente quieres quitarlo, no necesitas desinstalar OpenCode ni borrar archivos manualmente.

Puedes utilizar:

```bash
opencode mcp remove context7
```

Y después comprobar:

```bash
opencode mcp list
```

---

## ¿Qué aporta realmente a un agente de programación?

Sin Context7:

```
Usuario
   ↓
OpenCode
   ↓
"Según lo que conozco de PyQt6..."
   ↓
respuesta
```

Con Context7:

```
Usuario
   ↓
OpenCode
   ↓
Context7
   ↓
documentación actual
   ↓
OpenCode
   ↓
respuesta basada en documentación
```

Esto puede ser especialmente útil cuando trabajamos con APIs que cambian frecuentemente.

Por ejemplo:

```
PyMuPDF
edge-tts
PaddleOCR
React
Next.js
FastAPI
Django
NumPy
Pandas
etc.
```

---

## Conclusión

MCP puede parecer complicado al principio, pero el concepto fundamental es bastante sencillo:

> **MCP permite conectar un agente de IA con herramientas externas de una manera estandarizada.**

En este caso hemos conectado:

```
Linux
  │
  └── OpenCode
        │
        ├── herramientas propias
        │     ├── Bash
        │     ├── Git
        │     ├── archivos
        │     └── Ripgrep
        │
        └── MCP
              │
              └── Context7
                    ├── resolve-library-id
                    └── query-docs
```

Y antes de confiar en él hicimos algo que recomiendo a cualquier usuario:

**no confiar ciegamente en un MCP solamente porque sea popular.**

Comprobamos su procedencia, utilizamos el endpoint oficial, verificamos que OpenCode pudiera conectarse y, sobre todo, comprobamos **qué herramientas estaba exponiendo realmente**.

En nuestro caso solamente aparecieron dos herramientas y ambas fueron identificadas como **`read-only`**.

Eso no constituye una garantía absoluta de seguridad —ningún software externo puede ofrecerla—, pero sí proporciona una base mucho más razonable para decidir si queremos utilizarlo.

Y después hicimos una prueba real con PyMuPDF: OpenCode utilizó `resolve-library-id`, encontró la documentación correspondiente y posteriormente utilizó `query-docs` para consultar la configuración de detección de tablas.

**Ese es el enfoque que recomiendo con cualquier MCP nuevo: primero comprobar qué es, de dónde viene y qué herramientas expone; después darle permisos mínimos; y solamente entonces utilizarlo en nuestros proyectos.**

**Nota:** OpenCode soporta MCP mediante `opencode mcp add`, incluyendo servidores HTTP remotos, y Context7 publica oficialmente el endpoint `https://mcp.context7.com/mcp` y documentación específica para OpenCode.
