# Cómo instalar CodeGeeX en Visual Studio Code (Windows, Linux, MAC)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfJ7ZdhRumeuJ3cR7ESdV0QMlaTk1vd413dM3jaSubzE-nvBkjda7nRx_WdZfnmRE0DKwJSGd2TD2m9MwMEkbD8lyxBvPqWeCF7qbXSHnItCJ6r-X-pJbp3FiBlHWpLZ84ygqX9IljG8VeyfIwqHC_m_gxzY6vtqrdLlGj6l4g0hpM3uOAQKf5pg6bVjo/s1536/Portada.jpg =640x)

## ¿Qué es CodeGeeX?

**CodeGeeX** es un asistente de programación con inteligencia artificial que:

* Completa funciones mientras escribes
* Traduce código entre lenguajes
* Explica código
* Genera pruebas unitarias
* Corrige errores (bugs)

**CodeGeeX en Modo Agente **

* Genera código automáticamente (puede crear uno o varios archivos dentro de la carpeta del proyecto según se necesite)
* Edita código de una carpeta a la cual previamente le hayas dado permiso de hacer edición
* Puede analizar todos los archivos que estén en la carpeta de un proyecto, y pedirle hacer cambios

👉 Soporta **más de 100 lenguajes** y funciona en VS Code y otros IDEs 

**Pero**: No sirve para hacer tareas grandes

---

## Requisitos

Antes de empezar necesitas:

* VS Code instalado (Linux, Microsoft, MAC OS) ([ver mi tutorial para Linux](https://facilitarelsoftwarelibre.blogspot.com/2026/04/como-instalar-visual-studio-code-en-linux.html))
* Conexión a internet
* Cuenta gratuita en Z [https://chat.z.ai/](https://chat.z.ai/)

---

### ¿Es más barato que ChatGPT o Claude?

**Sí, y de hecho, para ti ahora mismo es GRATIS.**

*   **ChatGPT (OpenAI):** Si quieres la versión potente (GPT-4) dentro de una aplicación o usándolo mucho, te cobran una suscripción mensual (aprox. $20 USD o más).
*   **Claude (Anthropic):** Igual, su versión más potente (Claude 3 Opus) es de pago (aprox. $20 USD).
*   **CodeGeeX:** Es gratuito. No tienes un límite estricto de preguntas diario como en las versiones gratuitas de ChatGPT web.

### Es "más poderoso" si se paga?
Esto es matizado. CodeGeeX es un modelo desarrollado por Tsinghua University (China) y es muy competente, **pero** en benchmarks (pruebas de rendimiento) independientes:

*   **ChatGPT (GPT-4)** y **Claude 3.5 Sonnet** suelen considerarse todavía los modelos más inteligentes y capaces para código muy complejo.
*   **CodeGeeX** es increíblemente potente **para ser gratuito**, pero rara vez supera a GPT-4 en razonamiento lógico extremadamente difícil.

### 3. ¿Dónde tienes que pagar?

Como usuario individual de la extensión en VS Code, **no deberías pagar**.

Sin embargo, si eres un desarrollador y quieres crear tu propia aplicación usando el cerebro de CodeGeeX (integrarlo en tu propio software), entonces sí pagas por la **API**. El sitio oficial es el de la empresa matriz (Zhipu AI):

*   **Sitio web:** [https://open.bigmodel.cn/](https://open.bigmodel.cn/) (Todo está en inglés y chino).
*   Ahí es donde comprarías "tokens" para uso empresarial.

### No pagues nada todavía, si

1.  Usa la extensión en VS Code tal como está (gratis).
2.  Solo considera pagar el plan de **ChatGPT Plus ($20/mes)** si necesitas el mejor nivel de inteligencia posible. CodeGeeX es una herramienta fantástica y gratuita, pero no suele superar al modelo "top" de ChatGPT.

**En resumen:** Disfruta de la extensión gratis en VS Code, es una de las mejores ventajas de CodeGeeX frente a los otros modelos que te obligan a sacar la tarjeta de crédito mucho antes.

### ¿Algun día CodeGeeX será tan potente para desarrollar código editando un proyecto dentro de VS Code?

Esa es la "meta final" de todas las IA de programación hoy en día, y la respuesta corta es: **Sí, CodeGeeX (y sus competidores) llegarán a ese punto, y de hecho, ya están empezando a hacerlo.**

Sin embargo, hay una diferencia enorme entre "escribir una función" y "editar un proyecto entero":

### 1. El reto actual: La "Memoria" (Contexto)

Hoy en día, CodeGeeX es excelente viendo archivos que tienes abiertos en la pantalla. Pero un proyecto real tiene 100 o 1000 archivos conectados.

*   **El problema:** Si le pides cambiar el nombre de una variable en VS Code, CodeGeeX (en su versión gratuita actual) solo suele mirar el archivo actual. No sabe que esa variable se usa en otros 100+ archivos y podría romperlos.
*   **La solución (Futuro/Presente avanzado):** La IA necesita tener en su memoria la estructura de **todo el proyecto** (a esto se le llama aumentar la "Ventana de Contexto").

### 2. ¿Lo logrará CodeGeeX?

**Sí.** CodeGeeX está evolucionando muy rápido (ya van por la versión 4, lanzada recientemente en China).

*   Las nuevas versiones de CodeGeeX están diseñadas específicamente para tener una "memoria" más grande, permitiéndole leer múltiples archivos a la vez y entender cómo se conectan.
*   Esto significa que eventualmente podrás decirle: *"Cámbiale el color al botón de 'Login' en toda la aplicación"* y la IA irá al archivo HTML, al CSS y al JS y lo cambiará en los tres lugares automáticamente.

### 3. ¿Qué puedes hacer HOY para simular ese futuro?

Aunque la versión gratuita no sea aún un "autómata" que controle todo tu proyecto, ya puedes usar CodeGeeX dentro de VS Code para editar partes grandes de tu código siguiendo estos pasos avanzados:

*   **Usa el "Chat" en "Modo Agente" de CodeGeeX:**.- Indicaciones más ababjo

### 4. El competidor a vigitar: Cursor

Aunque hablamos de CodeGeeX, debo mencionarte que existe otro editor basado en VS Code llamado **Cursor**.

*   Cursor usa IA (Claude o GPT-4) y ya permite pulsar `Ctrl + K` en un archivo y decir *"Refactoriza esto para que sea más rápido"* y edits todo el proyecto.
*   **CodeGeeX quiere llegar a ese nivel de integración dentro de VS Code.**

---

## Paso 1: Instalar Visual Studio Code (si no lo tienes)

Descargalo desde la página web:

[https://code.visualstudio.com/download](https://code.visualstudio.com/download)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1ezQ0eoaAYDzML0eoAHOf627LHqpz_s4BkEw8Vo9y9QAKv2qIcDQJhMyuqbEHLjTT0IHOsySGGYcEqPqYGsFuIy6FeR9G_MwNdRXbu_ivWp0NDjM2pjUcGGuVlRQauthV4E_AdTXjp6Qf1xHzWPg7893vN91k2TMjU7r4Oxw3eVyxUNUoYMqCKt35sXo/s962/Descargar%20VS%20Code.png)

Está disponible para:

- Windows
- Linux
- Mac

En Linux sino sabes cómo instalar un deb, mira este tutorial:

**Como Instalar paquetes deb con gdebi kde-servicemenu-checkhash-installdebs qapt-deb-installer deb-installer**  
[https://facilitarelsoftwarelibre.blogspot.com/2016/09/instalar-paquetes-deb-con-gdebi.html](https://facilitarelsoftwarelibre.blogspot.com/2016/09/instalar-paquetes-deb-con-gdebi.html)  

---

## Paso 2: Instalar la extensión CodeGeeX

### ✔ Método gráfico (recomendado)

1. Abre VS Code
2. Ve a **Extensiones (Ctrl + Shift + X)**
3. Busca:

```
CodeGeeX
```

Ver también la instalación por comando (si la necesita):

[https://marketplace.visualstudio.com/items?itemName=aminer.codegeex](https://marketplace.visualstudio.com/items?itemName=aminer.codegeex)

---

## Paso 3: Iniciar CodeGeeX y configurarlo

Después de instalar:

1. Verás el icono de CodeGeeX en la barra lateral
2. Haz clic allí
3. Se abrirá el panel:

👉 **“Ask CodeGeeX”**

y para usar el **Modo Agente**, espera un poco a que se cargue y aparecerá esa pestaña disponible:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiULj6UJIISBm74_3mvfbWGzyy7JAPWU6nZLJj8bTb09UatsXWw7OffyeGmpg6FeXyvoBvR-cCO2KQlXIXvzxbWcE7Hbnp8cCW1A8SkgUnkyG-irit6F2Xlfhv6s6oMhxaG4co920dOfz7Tc3DUO87WXbz4lmfyqUtAHVGJdPXM-WpW8m2Kg4fvA_3kJWs/s991/CodeGeeX%20instalado.png)

### Enviar el panel a la derecha

Este panel yo lo uso enviandolo al panel de la derecha, para que al lado izquierdo me quede el Explorador. Para esto simplemente se le da clic derecho y clic en "**Mover to**" y "**Secondary Side Bar**" 

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfoyZ33-8N3sSlqQhtCVr0GWneDqFhpbRbwRBPfnop3n85YB5eslWPRvIGj1Z26DZe1sb3zmWp3S-iYO9J2IEHcGka7L6uv_VQcwfamuK1Dtcp7u0-GdViS9_pCAi_wEck1LCb8Lk33j_1zdklFMJPhG1PGD_k08tRFex4cQAY8Bax5KGELCAYhRQfyJY/s994/Mover%20CodeGeeX%20a%20la%20barra%20secundaria.png)

y tendremos a CodeGeeX en el panel secundario, en **Modo Agente**:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjn6Z9YjqEAqe-442pNAjLZThQekIqXmmzVVXGFjF_wGGVj-IeU4H8EVfJl58_yN7endnqAuz_2jiVDNYsAARMdE-XNPCf-NaUlV2QrSwOk-l4RE3A3JX_hKEgkwxHquypvizW4-MAl9fQRb1Hc4xwSiTP43msWlIZ1vHIj9cxN7j4B0ame0nIpKMY85sI/s1115/CodeGeeX%20en%20el%20panel%20secundario,%20en%20Modo%20Agente.png)

allí le estoy preguntando algo muy importante:

"Revisa todo este proyeto y dime que podemos hacer para mejorarlo"

o preguntas como:

"¿Cómo optimizo este código?"

---

## Solución en entornos ligeros (Fluxbox, Openbox, etc.)

Si usas entornos como:

* Fluxbox
* Openbox
* JWM

Es posible que aparezca este error:

```
An OS keyring couldn't be identified
```

### Solución:

Ejecuta VS Code así:

```bash
code --password-store="gnome-libsecret"
```

O aplica tu solución permanente (launcher, alias, etc. 👍) como se explica en la siguiente entrada:

**Visual Studio Code no arranca, no funciona con la extensión CodeGeeX en Fluxbox**  
[https://facilitarelsoftwarelibre.blogspot.com/2026/04/visual-studio-code-no-arranca-no-funciona-con-la-extension-codegeex-en-fluxbox.html](https://facilitarelsoftwarelibre.blogspot.com/2026/04/visual-studio-code-no-arranca-no-funciona-con-la-extension-codegeex-en-fluxbox.html)

---

# Tips para usar CodeGeeX

## 1. Autocompletado inteligente

* Empieza a escribir código
* Presiona **TAB** para aceptar sugerencias 

---

## 2. Generar código desde comentarios, el truco del "Enter"

CodeGeeX no siempre escribe el código inmediatamente después de escribir el comentario. Por lo general, debes indicarle que has terminado de escribir.

1.  Escribe tu comentario: `# función que suma dos números`
2.  **Pulsa la tecla `Enter`** para bajar a la línea siguiente.
3.  Espera un segundo (verás que aparece un texto en color **gris**, tenue).
4.  Si el texto gris aparece, pulsa la tecla **`Tab`** para aceptarlo.

### Verifica el tipo de archivo

Si no funciona, asegúrate de que tu archivo de Visual Studio Code tenga la extensión correcta.

*   Si estás programando en Python, el archivo debe llamarse `mi_script.py`.
*   Si estás en un archivo de texto plano (`mi_script.txt`), CodeGeeX podría no entender que debe escribir código Python y no generar nada.

### Revisa el estado de la extensión

Mira la esquina inferior derecha de VS Code.

*   ¿Ves el icono de CodeGeeX?
*   A veces es necesario hacer clic en él e **iniciar sesión** (Log in) para que la generación de código funcione, ya que usa la nube para procesar la petición.

**Ejemplo**

Escribe esto en un archivo `.py`:

```python
    # función que suma dos números
```

Ahora, baja a la línea de abajo y presiona y espera un momento, y aparecerá el código (sigue los pasos anteriores)

---

### 3. Explicar código

* Selecciona código
* Click derecho → CodeGeeX → “Explain”

O usa:

```
/explain
```

---

### 4. Agregar comentarios automáticamente

* Selecciona código
* Click derecho → CodeGeeX → “Add Comment”

---

### 5. Generar pruebas unitarias

* Selecciona función
* Click derecho → CodeGeeX → “Generate Tests”

O usa:

```
/test
```

---

### 6. Corregir errores (bugs)

```
/fixbug
```
---

### 7. Inline Chat (dentro del código)

Atajo:

```
Ctrl + I
```

👉 Permite interactuar directamente en el código

---

### 8. Preguntas sobre repositorios (@Repo)

Puedes preguntar sobre proyectos completos, estando en un repositorio git:

```
@repo ¿Cómo funciona este módulo?
```


# Iniciar el servicio Keyring para VS Code

Además he añadido al archivo:

.fluxbox/startup

el siguiente contenido, en medio, donde están los otros programas que se pueden añadir para que arranquen al inicio:

```
# --- SOLUCIÓN AÑADIDA: Iniciar el servicio Keyring para VS Code ---
# Esto resuelve el error "An OS keyring couldn't be identified"
eval $(gnome-keyring-daemon --start --components=secrets) &
# -----------------------------------------------------------------------------
```

Dios les bendiga

---

# Consultas

**CodeGeeX: AI Coding Assistant**  
[https://marketplace.visualstudio.com/items?itemName=aminer.codegeex](https://marketplace.visualstudio.com/items?itemName=aminer.codegeex)  

**CodeGeeX**  
[https://codegeex.cn/en-US](https://codegeex.cn/en-US)  


