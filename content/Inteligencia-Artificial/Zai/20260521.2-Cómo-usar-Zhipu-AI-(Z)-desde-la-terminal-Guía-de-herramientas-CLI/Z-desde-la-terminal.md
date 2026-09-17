
# Cómo usar Zhipu AI desde la terminal: Guía de herramientas CLI

En el mundo del desarrollo de Software Libre, la terminal es nuestro hogar. Si estás buscando integrar la potencia de la inteligencia artificial en tu flujo de trabajo sin salir de la línea de comandos, y específicamente quieres aprovechar los modelos de **Zhipu AI** (una alternativa potente y abierta), esta guía es para ti.

Antes de entrar en materia, vamos a resolver el primer reto: el registro.

## Paso 1: Registro y obtención de la API en Zhipu AI

Aunque Zhipu AI ofrece tecnología de vanguardia, su portal de registro puede ser un reto si no hablas chino. Aquí te explico el proceso que seguí:

1.  **Dirígete a la plataforma:** Open Bigmodel (Zhipu AI) [https://open.bigmodel.cn/](https://open.bigmodel.cn/).
2.  **Registro:** Debes registrarte con tu correo y número de celular.
3.  **El reto del Captcha:** Aquí viene la parte complicada. El sistema muestra imágenes con letras en chino y debes hacer clic en un orden secuencial. Como no hablo chino, **no hubiera podido registrarme sin la ayuda de otra IA**. Te recomiendo tomar capturas de pantalla de los caracteres y pedirle a ChatGPT o Claude que te diga en qué orden debes hacer clic.
4.  **Obtener la API:**
    *   Una vez dentro, busqué en la ayuda **Documentación de API**: [https://docs.bigmodel.cn/cn/faq/batch-api-issues](https://docs.bigmodel.cn/cn/faq/batch-api-issues).
    *   Al dar clic en la sección de API, el sistema me envió al mercado de modelos.
    *   Finalmente, llegué a la página de gestión de claves **API Key Platform**: [https://open.bigmodel.cn/apikey/platform](https://open.bigmodel.cn/apikey/platform).
    *   Allí podrás generar tu `API Key` para empezar a trabajar.

Una vez que tienes tu llave, vamos a ver qué herramientas podemos usar en Linux.

***

## Índice de Herramientas CLI

En esta entrada analizaremos las siguientes opciones:
1.  [llm](#1-llm)
2.  [Aider](#2-aider)
3.  [Open Interpreter](#3-open-interpreter)
4.  [Plandex](#4-plandex)
5.  [Opencode](#5-opencode)
6.  [Codex CLI](#6-codex-cli)

---

### 1. llm

**Enfoque principal:** Cliente universal de terminal para ejecutar prompts y crear scripts rápidos. Es la "navaja suiza" para interactuar con IAs.

**¿Compatible con Zhipu AI?** Sí, al 100%. Funciona configurando las variables de entorno estándar.

**Complejidad:** Baja. Es muy fácil de instalar y usar para quienes ya están acostumbrados a la terminal.

**Mejor para:** Realizar consultas rápidas, procesar texto con pipes (|) y generar scripts de automatización.

**Instalación para usar Zhipu AI:**

```bash
# Instalación vía pip
pip install llm

# Configuración del endpoint de Zhipu
export OPENAI_API_BASE_URL="https://open.bigmodel.cn/api/paas/v4/"
export OPENAI_API_KEY="TU_API_KEY_AQUI"

# Uso básico
llm -m glm-4 "Explícame el kernel de Linux en una frase"
```

**Disponible Instalación local:** Sí, se puede conectar a modelos locales a través de plugins, aunque su fortaleza es la gestión de APIs.

**Alcance y limitaciones:** Es excelente para texto y chat, pero no puede modificar tus archivos de código fuente directamente ni ejecutar comandos complejos en tu sistema; es un cliente de "pregunta-respuesta".

---

### 2. Aider

**Enfoque principal:** Programación en pareja (Pair Programming). Aider es una herramienta que entiende tu repositorio de código y puede editar archivos, crear nuevos y hacer commits por ti.

**¿Compatible con Zhipu AI?** Sí, permite configurar cualquier endpoint compatible con la API de OpenAI.

**Complejidad:** Media. Requiere un poco de aprendizaje de sus comandos internos para gestionar archivos.

**Mejor para:** Desarrolladores que quieren que la IA escriba código *dentro* de sus proyectos reales, refactorice funciones o arregle bugs.

**Instalación para usar Zhipu AI:**

```bash
# Instalación
pip install aider-chat

# Ejecución apuntando a Zhipu AI
aider --model openai/glm-4 \
      --openai-api-base https://open.bigmodel.cn/api/paas/v4/ \
      --openai-api-key TU_API_KEY_AQUI
```

**Disponible Instalación local:** Sí, soporta Ollama para correr modelos localmente.

**Alcance y limitaciones:** Es muy potente modificando código, pero requiere que le digas explícitamente qué archivos añadir a su "contexto". Funciona mejor dentro de un repositorio Git.

---

### 3. Open Interpreter

**Enfoque principal:** Agente autónomo. A diferencia de un chat, Open Interpreter puede ejecutar comandos en tu computadora, instalar paquetes, mover archivos y usar el navegador.

**¿Compatible con Zhipu AI?** Sí, mediante la configuración del proveedor de OpenAI.

**Complejidad:** Alta. Al tener capacidad de ejecutar comandos, requiere supervisión constante para evitar acciones no deseadas.

**Mejor para:** Automatización de tareas complejas del sistema operativo, manipulación de datos y tareas que requieran "manos" digitales.

**Instalación para usar Zhipu AI:**

```bash
# Instalación
pip install open-interpreter

# Configuración en Python (método más seguro para endpoints personalizados)
python -c "import interpreter; interpreter.llm.model = 'openai/glm-4'; interpreter.llm.api_base = 'https://open.bigmodel.cn/api/paas/v4/'; interpreter.llm.api_key = 'TU_API_KEY'; interpreter.chat()"
```

**Disponible Instalación local:** Sí, está diseñado para correr modelos locales fácilmente.

**Alcance y limitaciones:** Es extremadamente poderoso, pero peligroso. Puede borrar archivos si le pides algo incorrecto. Requiere aprobación humana para cada comando (modo seguro).

---

### 4. Plandex

**Enfoque principal:** Motor de tareas de largo alcance. Plandex está diseñado para descomponer grandes tareas de programación en planes y ejecutarlos.

**¿Compatible con Zhipu AI?** Sí, acepta variables de entorno estándar.

**Complejidad:** Media/Alta. Introduce un flujo de trabajo basado en "tareas" y "planes" que difiere del chat tradicional.

**Mejor para:** Proyectos grandes donde necesitas planificar arquitectura o refactorizaciones masivas antes de aplicar cambios.

**Instalación para usar Zhipu AI:**

```bash
# Instalación
curl -sL https://plandex.ai/install.sh | bash

# Configuración
export OPENAI_API_BASE_URL=https://open.bigmodel.cn/api/paas/v4/
export OPENAI_API_KEY=TU_API_KEY_AQUI

# Uso
plandex connect
plandex tell "Crea una API REST en Go para gestión de usuarios"
```

**Disponible Instalación local:** Sí, soporta modelos locales.

**Alcance y limitaciones:** Sobresaliente para mantener el contexto de proyectos grandes, pero puede ser "excesivo" para tareas pequeñas o consultas puntuales.

---

### 5. Opencode

**Enfoque principal:** Asistente de terminal ligero y genérico.

**¿Compatible con Zhipu AI?** Probablemente Sí. Al ser una herramienta de código abierto que suele depender de la variable `OPENAI_API_BASE_URL`, debería conectarse sin problemas a Zhipu.

**Complejidad:** Baja/Media.

**Mejor para:** Usuarios que buscan una alternativa minimalista a las grandes suites.

**Instalación para usar Zhipu AI:**

```bash
# (Suponiendo instalación estándar de proyecto similar)
# Configurar variables de entorno
export OPENAI_API_BASE_URL="https://open.bigmodel.cn/api/paas/v4/"
export OPENAI_API_KEY="TU_API_KEY_AQUI"
```

**Disponible Instalación local:** Depende de la implementación específica del fork o proyecto "Opencode" que se elija.

**Alcance y limitaciones:** Su alcance es limitado comparado con Aider o Open Interpreter. Suele ser más un cliente de chat que un agente de acciones.

---

### 6. Codex CLI

**Enfoque principal:** Herramienta oficial de OpenAI para generación de código.

**¿Compatible con Zhipu AI?** No. Generalmente está "hardcoded" (programado internamente) para funcionar solo con los servidores de OpenAI.

**Complejidad:** Baja (si usas OpenAI), Imposible (si usas Zhipu).

**Mejor para:** Usuarios exclusivos de la plataforma OpenAI que no necesitan personalizar el endpoint.

**Instalación para usar Zhipu AI:**
*No aplica.* No existe una manera nativa de configurar la URL de Zhipu AI en esta herramienta sin modificar el código fuente y recompilarla.

**Disponible Instalación local:** No.

**Alcance y limitaciones:** Excelente integración con el ecosistema OpenAI, pero carente de la flexibilidad que requiere el Software Libre para usar proveedores alternativos como Zhipu.

***

## Conclusión: El ganador para escribir código

Si tu objetivo principal es **escribir código**, refactorizar y trabajar en tus proyectos de Software Libre utilizando la API de Zhipu AI, el ganador indiscutible es **Aider**.

**¿Por qué?**
1.  **Integración real:** No solo te da código para copiar y pegar; él entra en tus archivos, hace los cambios y te muestra el diff (diferencia) de lo que modificó.
2.  **Control de versiones:** Se integra perfectamente con Git, permitiendo deshacer cambios fácilmente.
3.  **Compatibilidad:** Su sistema de argumentos permite conectarlo de forma nativa y estable a `[https://open.bigmodel.cn](https://open.bigmodel.cn)`.

Aider transforma a Zhipu AI en un verdadero compañero de desarrollo dentro de tu terminal.