# Guía Completa: Cómo instalar y usar Codex de OpenAI (Windows, Linux y macOS)

![](images/Portada.webp)

Codex es el **agente de programación de OpenAI** que trabaja directamente dentro de tu editor de código, ayudándote a escribir, entender, corregir y automatizar tareas de desarrollo.

- Lo mejor: funciona dentro de **Visual Studio Code y editores compatibles**, como Cursor o Windsurf.

---

# ¿Qué es Codex?

Codex es un **agente inteligente de programación** capaz de:

* Leer y entender tu código
* Editarlo automáticamente
* Ejecutar comandos
* Generar código desde instrucciones
* Trabajar en la nube o localmente

Codex puede *leer, editar y ejecutar código*, ayudando a desarrollar más rápido y entender proyectos complejos 

---

# Requisitos

Antes de empezar, necesitas:

* Tener instalado:

  * Visual Studio Code [https://code.visualstudio.com/download](https://code.visualstudio.com/download) para: Linux, Microsoft, MAC OS ([Ver mi tutorial para Linux](https://facilitarelsoftwarelibre.blogspot.com/2026/04/como-instalar-visual-studio-code-en-linux.html))
  * o Cursor / Windsurf
* Tener cuenta en ChatGPT (Plus o superior)
* Conexión a internet

---

# 📥 Instalación de Codex (Paso a paso)

## 🔎 Paso 1: Buscar la extensión


1. Abre Visual Studio Code
2. Ve a **Extensiones** (icono de bloques o `Ctrl+Shift+X`)
3. Escribe: `Codex`
4. Selecciona: **Codex - OpenAI's coding agent**

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2GLwC2gUq9-kYeyEuF8RBj8mCB_LNEcv9GTSFEJPbWDYSJGB27SSrdNI2BP3KxEFpzokywuV3pmHnysGHdn06eD4upWbvThb8Vy6NqyGtM7KieoutKVWpwCG6v5qnJ_uDQZ2BPMvhiMQPIaPnNY119Mi0Ho_FGFXICwOBrL-Q_oSqfQO_6fMiPsdJwjk/s1054/CODEX%20en%20extensiones%20de%20VS%20Code.png =780x)

---

## Paso 2: Instalar

1. Haz clic en **Install**
2. Espera unos segundos

---

## Paso 3: Iniciar sesión

Después de instalar:

1. Abre el panel de Codex (lado derecho)
2. Haz clic en:

👉 **Sign in with ChatGPT**

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVG5Ohfj_KPK-JlK9zOYhF-mzLEVFk8c-Gp2SOMmhEYJGGWsCDCW4sIyVcdmF6fNC9DyFnG8reOsRMWLmx_PC-dPrt2ULvboJ9zceU_EdZRReIsFbwqFR1zg8uRhI_KCeQVu41LscKSbRkCZ6BPslMXq_MKNHK9StmLxk1I-w3o3rOHfCR-9DJtOs-u4I/s1014/Sign%20in%20in%20CODEX%20with%20ChatGPT.png =780x)

También se puede usar:

* API Key 

---

### Dos formas de usar Codex (muy importante)

### Usando tu cuenta de ChatGPT (Sign in with ChatGPT)

👉 **No pagas extra directamente por cada uso**

* Incluido en planes como:

  * Plus
  * Pro
  * Business
  * Ya tienes un **límite de uso incluido**

📌 Según la documentación:

* El uso viene incluido con tu plan de ChatGPT. Para un usurio normal es suficiente con ChatGPT Plus.

### En este modo:

* No necesitas API Key
* No te cobran por cada request
* Pero sí hay límites (tokens, velocidad, etc.)

---

### Usando API Key

👉 **Aquí sí pagas por uso**

* Cada solicitud consume:

  * tokens
  * procesamiento
  * Se factura según uso

💰 Ejemplo:

* Generar código largo
* Usar “Agent (Full Access)”
* Ejecutar tareas en la nube

👉 Todo eso consume API

### Consejo importante

> Si usas Codex iniciando sesión con tu cuenta de ChatGPT, normalmente no pagarás extra, ya que está incluido en tu plan.
> Pero si usas una API Key, el uso se cobra por separado según consumo.

---

# ¿Dónde aparece Codex?

* Se abre en el **panel derecho del editor**
* Puedes moverlo si quieres

📌 Si no aparece:

* Reinicia VS Code
* O busca el icono de Codex en la barra lateral

---

# Primer uso de Codex

Cuando ya esté instalado, abre la carpeta donde tengas un programa, por ejemplo un repositorio de GitHub, allí puedes:

### Escribir instrucciones como:

```
Analiza el archivo que tengo abierto y su README.md, y actualiza el README.md con las nuevas funciones y caracteristicas
```

```
Revisa el código de este archivo "ejemplo.py" y dime que podemos mejorar 
```

```
Explícame este código
```

```
Optimiza este script
```

etc

---

# Funciones principales de Codex

## 1. Programación asistida

* Escribes en lenguaje natural
* Codex genera código automáticamente

---

## 2. Contexto inteligente

Puedes usar archivos abiertos o seleccionados:

Ejemplo:

```
Usa @app.py para crear una nueva función
```

📌 Codex usa archivos como contexto automáticamente 

---

## 3. Modos de trabajo

Codex tiene 3 modos:

* **Chat** solo conversación
* **Agent** modifica código automáticamente en una carpeta donde tengas varios archivos que se puedan editar
* **Agent (Full Access)** ��?acceso total (usar con cuidado)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh73_exXPeeJGhPvGLwE8GxBFcG1xeTBwvYPUuIVnpOTzUSFktFaeVXSD2eUtje9zURZ8KF0mOFVVBA1fFf2cZ_qu2NnimM7IKgQ_HVRoAto2msFXvpEe1BafAsm9z4Oggv9cHw4ej3qmmVVI3-WkmeWmXEwjUVgC9QX6WqQg7KyENScjAXdhM2HLDD_84/s336/CODEX%20Full%20Access.png)

📌 Esto define cuánto control tiene Codex 

---

## 4. Ejecución en la nube

Puedes decirle:

👉 “Ejecuta esto en la nube

Codex puede:

* Procesar tareas pesadas
* Devolver resultados sin bloquear tu PC

📌 Permite delegar trabajos grandes 

---

## 5. Generación de imágenes

Sí, Codex también puede:

* Crear imágenes UI
* Generar assets
* Editar imágenes, ejem: "puedes generar un logotipo svg para el programa que tengo abierto?"

---

# Comandos importantes

Desde la paleta (`Ctrl+Shift+P`):

* Crear nuevo chat
* Añadir archivo al contexto
* Abrir panel Codex

📌 Ejemplo:

* `chatgpt.newChat`
* `chatgpt.openSidebar`

---

# Atajos de teclado

Puedes configurar atajos personalizados:

1. `Ctrl+Shift+P`
2. Buscar: **Keyboard Shortcuts**
3. Escribir: Codex
4. Asignar teclas

---

# Compatibilidad con otros IDEs

Codex también funciona en:

* Cursor
* Windsurf
* JetBrains (IntelliJ, PyCharm, otros)

📌 Tiene integración oficial para varios entornos 

---

# 🔥 Consejos PRO

* Usa archivos abiertos como contexto
* Empieza con prompts simples
* Usa modo Agent para automatizar
* Usa nube para tareas pesadas
* Ajusta el nivel de “razonamiento según complejidad

📌 Puedes elegir entre bajo, medio y alto esfuerzo 

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyCHVYn2FJTPTVmi0K3iOLlI96F1N8v6obC8YPFzMDtL2Pr3x2AdK10Qa5fOWhJjb0-pYM1SztWezd8fs5dIGEvMpVNJE0pd1MyEouN0R0zNA968Ez6XheuOzsnGi8d5rDnvpNlB4930XX6aYQygIaLwjdxc5DowDtD0wLkfIfP1ra3HnpdIz3ba1fpFg/s314/Razonamientos%20disponibles%20de%20CODEX.png)

---

# 🎯 Conclusión

Codex no es solo una extensión. Es un **programador inteligente dentro de tu editor**.

💡 Si programas en:

* Python
* C++
* JavaScript
* Bash
* PyQt6

👉 Codex puede ayudarte a **acelerar todo tu flujo de trabajo**

---

# Consultas:


**Codex**  
[https://developers.openai.com/codex/ide](https://developers.openai.com/codex/ide)




