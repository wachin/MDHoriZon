
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhG2AC0DX2h3Bt_thRQZodHpXaXSM0FArJhreHml3nI3XCz-kLl3J-plqGvSjhNiTbx8ZEjRo8bQSrXrkkDlQuSYmH2Oe32R-5Hn8OTPG0NWkoo_JzR4qOFAXX48ek7GWgS6St2Z0yOzp5TctDGYDcYmhbGr04LLkBCr_LJcSPGJu2IKiiGioQ5_FNOAng/s1536/Cómo%20obtener%20una%20API%20de%20Zhipu%20AI.jpg =650x)

# Cómo conseguí una API China Gratis de Zhipu AI (BigModel) con 20 millones de tokens, desde América Latina

Antes de que siga leyendo, para obtener los 20 millones de Tokens hay que tener instalado WeChat para escanear la cuenta oficial de Zhipu Enterprise

Yo vivo en Ecuador y hace poco descubrí que la empresa china **Zhipu AI** ofrece acceso gratuito a su plataforma de inteligencia artificial llamada **BigModel**, y logré obtener una API funcional

La verdad es que el proceso no fue nada sencillo, principalmente porque la página está en chino y utiliza CAPTCHAs con caracteres chinos. Pero después de varios intentos lo logré, y aquí quiero compartir todo el proceso para ayudar a otros desarrolladores de software libre y usuarios Linux.

---

# ¿Qué es Zhipu AI?

[https://open.bigmodel.cn/](https://open.bigmodel.cn/)

Zhipu AI es una empresa china de inteligencia artificial que ofrece modelos similares a ChatGPT mediante APIs.

La plataforma permite:

* Crear agentes IA
* Usar APIs de modelos de lenguaje
* Automatizar tareas
* Integrar IA en programas
* Experimentar gratuitamente con herramientas de IA

---

# Requisitos

Antes de comenzar necesitas:

* Google Chrome (desde Android, PC).- Debido a que traduce automáticamente los textos y la pagina sigue funcionando bien
* Un número de teléfono real
* Paciencia 😅
* Una IA que pueda ayudarte a resolver CAPTCHAs chinos (yo usé ChatGPT)

**Nota**: Yo me registré desde el celular (Android Galaxy J5) y usando el Navegador Google Chrome y ChatGPT.

---

# Paso 1 — Entrar a la Página

Abre:

**Open BigModel (Zhipu AI)**   
[https://open.bigmodel.cn/](https://open.bigmodel.cn/)

Debes usar **Google Chrome**

---

# Paso 2 — Registrarse

En la página:

1. Da clic en las **tres rayitas** del menú.
2. Busca abajo la opción:

   * **“Iniciar sesión / Registrarse”**

---

# Paso 3 — Poner el Número de Teléfono

Aquí debes:

* Elegir el código del país.
* En mi caso:

  * Ecuador → **+593**
* Luego escribir el número celular.

---

# El Problema Más Difícil: El CAPTCHA Chino

Aquí fue donde más sufrí 😅

El sistema muestra imágenes con caracteres chinos y te pide hacer clic en ellos en cierto orden.

Por ejemplo, puede aparecer algo como:

> “Por favor, haga clic en Chang Checai en secuencia”

Y aparecen caracteres chinos sobre una imagen:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxDSWZWELuCcqIx-UIbhM7C_5gkUR07Vk_gVi73F0Vtt7WLFEskOxhqbqPAK2f3yC8SU2dK-DOOoR08_dwJqy4sB0t0OYF24TIM2ykb5UDNPBqlr6lF5H-JxFxqPmL5cjLY_TzAQSE7gLp3yme6kesk4X1BbG5BPhBHOGYEukQk8sKX-cYv-al_HKISMU/s2340/02-CHAPTA-China.jpg =450x)

---

# Cómo Logré Resolverlo

Lo que hice fue:

1. Tomar una captura de pantalla.
2. Subirla a ChatGPT (depende de la herramienta que use, se puede también copiar desde la herramienta y pegar directamente a ChatGPT).
3. Yo le pregunté lo siguiente:

"Este es un chapta con caracteres chinos, analízalos bien, y dime cual es el orden en que debo dar clic"

Y ChatGPT me respondía algo así:

"Debes hacer clic en estos caracteres chinos en este orden:

常 → el carácter de arriba al centro
才 → el carácter grande del centro-izquierda
激 → el carácter de arriba a la izquierda

Y así pude resolver el CAPTCHA."

---

# Importante: A Veces No Funciona

Algo curioso:

* El primer día lo intenté de noche desde Ecuador y no funcionó.
* Al día siguiente lo intenté durante el día y sí funcionó.

No sé si el sistema tiene problemas temporales o restricciones regionales, pero vale la pena insistir.

---

# Paso 4 — Verificación Deslizante

Después del CAPTCHA aparece una ventanita donde debes:

* Mover una pieza deslizante (slider captcha)

Cuando la pases correctamente:

* El sistema enviará un código SMS a tu celular.

---

# Paso 5 — Verificar el Código SMS

Cuando llegue el código:

1. Escríbelo.
2. Continúa el proceso.

Y listo, ya tendrás tu cuenta

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_KjrADw5_Qc2czatuPeG_DxuTVniZOjGc9nmo5M6zFwpiLYbfRCLmVnJnhxv6gBl1JtNHeps7mPVJbwoAJrEjdvReH-rMarj4PuQth0t-rWotYk6OHgjNPbHCC1Eep6sg4JJKSHWlJ5pGrmLFRUff-BWRbHYCRFk44GwjW1ct135ST6-PrUtwQDfulVk/s2340/03--registrado-con-exito.jpg =550x)

como ven en la imagen allí dice:

"Agrega nuestra cuenta de WeChat para recibir +20 millones de tokens."

hay que instalar en el celular a WeChat y registrarse y hacer eso para que regalen 20 millones de tokens por ser nuevo usuario

---

# Paso 6 — Buscar la Sección de APIs

Yo encontré ayuda aquí:

**Ayuda oficial de BigModel**  
[https://docs.bigmodel.cn/cn/faq/batch-api-issues](https://docs.bigmodel.cn/cn/faq/batch-api-issues)

Luego encontré la sección de agentes IA:

**Marketplace de Agentes BigModel**  
[https://open.bigmodel.cn/console/marketplace/index/agent](https://open.bigmodel.cn/console/marketplace/index/agent)

Y desde allí llegué al panel para generar la API:

**Panel de API Keys de Zhipu AI**  
[https://open.bigmodel.cn/apikey/platform](https://open.bigmodel.cn/apikey/platform)

---

# Paso 7 — Generar la API

En esa página:

1. Genera una nueva API Key.
2. Cópiala.
3. Guárdala en un lugar seguro.

Por ejemplo:

* KeePassXC
* Bitwarden
* Un archivo cifrado
* Variables de entorno en Linux
* Otro

---

# Verificación Opcional de Identidad

Existe una opción para verificar identidad usando documentos oficiales.

Página:

**Verificación de identidad BigModel**  
[https://open.bigmodel.cn/usercenter/settings/auth](https://open.bigmodel.cn/usercenter/settings/auth)

Según la documentación, esto puede habilitar funciones adicionales como:

* APIs Batch
* Límites mayores
* Más capacidades

**Nota**: Pero esto no lo he hecho yo.

---

# Mi Opinión

Sinceramente fue complicado por:

* El idioma chino
* Los CAPTCHAs
* La falta de documentación en español

Pero sí se puede lograr 

Lo más curioso fue usar inteligencia artificial para poder registrarme en otra inteligencia artificial 😄

---

# Enlaces Útiles

* [BigModel / Zhipu AI](https://open.bigmodel.cn/)
* [Ayuda oficial BigModel](https://docs.bigmodel.cn/cn/faq/batch-api-issues)
* [Marketplace de agentes IA](https://open.bigmodel.cn/console/marketplace/index/agent)
* [Generar API Key](https://open.bigmodel.cn/apikey/platform)
* [Verificación de identidad](https://open.bigmodel.cn/usercenter/settings/auth)
