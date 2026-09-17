# Instalación de Hermes Agent en Linux usando Zhipu AI (GLM)

**Requisito importante:** Debes tener una API de Zhipu AI (GLM):  

[https://facilitarelsoftwarelibre.blogspot.com/2026/05/como-consegui-una-api-gratis-de-zhipu-ai-dede-bigmodel.html](https://facilitarelsoftwarelibre.blogspot.com/2026/05/como-consegui-una-api-gratis-de-zhipu-ai-dede-bigmodel.html)

---

## ¿Qué es Hermes Agent?

Hermes Agent es una herramienta tipo:

* Codex CLI
* Claude Code
* Gemini CLI

pero mucho más flexible.

Permite usar inteligencia artificial directamente desde la terminal Linux para:  

* programar
* analizar proyectos
* generar README
* ayudar con Git
* convertir código
* trabajar con repositorios completos
* usar herramientas web
* ejecutar comandos
* y más  

Sitio oficial:  

**Hermes Agent**  
[https://github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)  

---

# 1. Instalar dependencias

## Debian 12 / MX Linux / Ubuntu

Abrir una terminal y ejecutar:

```bash
sudo apt update

sudo apt install -y \
curl git python3 python3-pytest python3-venv python3-pip \
build-essential ripgrep ffmpeg fd-find
```

---

# 2. Instalar Hermes automáticamente

Ejecutar:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Cuando termine:

```bash
source ~/.bashrc
```

o cerrar y abrir nuevamente la terminal.

---

# 3. Iniciar Hermes

Aparecerá una pantalla de configuración inicial.

---

# 4. Elegir “Quick setup”

Seleccionar:

```text
Quick setup — provider, model
```

y presionar ENTER.

---

# 5. Elegir Zhipu AI / GLM

Seleccionar:

```text
Z.AI / GLM (Zhipu AI direct API)
```

---

# 6. Introducir la API Key

La API de Zhipu AI tiene formato:

```text
id.secreto
```

Ejemplo ficticio:

```text
123sdfgjlksypvlksñnqñyias456.abcdEFGHijkl
```


---

# 7. Base URL

Cuando Hermes pregunte:

```text
Base URL [https://api.z.ai/api/paas/v4]
```

simplemente presiona ENTER.

---

# 8. Backend

Seleccionar:

```text
Keep current (local)
```

Eso hará que Hermes se ejecute directamente en tu máquina Linux.

---

# 9. Mensajería

Cuando pregunte sobre Telegram o Discord:

```text
   (●) Set up messaging now (recommended)
 → (○) Skip — set up later with 'hermes setup gateway'
```

yo elejí la de abajo, además luego se podrá poner:

```bash
hermes setup gateway
```

para configurar eso si el usuario lo necesite

---

# 10. Hermes instalado

Ahora Hermes ya estará listo.

Ejecutar:

```bash
hermes
```

---

# 11. Cambiar modelo

Dentro de Hermes escribir:

```text
/model
```

Recomendación para programación:

```text
glm-5.1
```

Otras opciones rápidas:

```text
glm-5-turbo
```

---

# 12. Qué significa “Context”

Hermes mostrará algo como:

```text
Context: 202,752 tokens
```

Eso significa la cantidad máxima de información que el modelo puede recordar simultáneamente.

Mientras más contexto tenga:

* más archivos puede leer
* mejor entiende proyectos grandes
* mantiene conversaciones largas
* analiza repositorios completos

---

# 13. Usar Hermes dentro de un proyecto Git

Entrar en un proyecto:

```bash
cd ~/mi_proyecto
```

y ejecutar:

```bash
hermes
```

Ahora Hermes podrá analizar automáticamente el repositorio.

---

# 14. Ejemplos útiles

## Analizar un proyecto

```text
Analyze this repository and explain the architecture
```

---

## Continuar un port de C++ a PyQt6

```text
Continue porting this C++ project to PyQt6
```

---

## Crear README

```text
Generate a README for this repository
```

---

## Ayuda con Git

```text
Explain the current git status and suggest next steps
```

---

# 15. Comandos útiles

## Cambiar configuración

```bash
hermes setup
```

---

## Editar configuración

```bash
hermes config edit
```

---

## Actualizar Hermes

Esta parte es importantísima porque sino hermes se vuelve lento

```bash
hermes update
```

---

# 16. Recomendaciones para Linux

Hermes funciona especialmente bien en:

* Debian 12
* MX Linux 23
* Ubuntu
* Linux Mint
* Arch Linux

Y es muy útil para:

* PyQt6
* Python
* C++
* Git
* proyectos open source
* documentación técnica

---

# 17. Conclusión

Ahora tienes un asistente de inteligencia artificial tipo Codex CLI funcionando directamente en Linux usando la API de Zhipu AI / GLM.

Ideal para desarrolladores Linux y proyectos open source.
