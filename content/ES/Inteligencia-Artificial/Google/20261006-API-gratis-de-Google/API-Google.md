## Tutorial: Cómo crear una API Key gratuita (limitada) de Gemini con Google AI Studio

### Introducción

Google AI Studio permite experimentar con los modelos de inteligencia artificial de Google y también obtener una **API Key de Gemini** para utilizar estos modelos desde programas, aplicaciones y proyectos propios.

**“gratis” no significa uso ilimitado**. Google mantiene un nivel gratuito de la Gemini API con determinados modelos y límites; si se configura la facturación, se pasa al nivel de pago. [Google AI for Developers](https://ai.google.dev/gemini-api/docs/billing?hl=es-419\&utm_source=chatgpt.com)

En determinadas cuentas, AI Studio puede crear automáticamente el proyecto de Google Cloud necesario. Sin embargo, puede aparecer el siguiente mensaje:

> **No se pudo crear una clave de API ni un proyecto de Google Cloud para ti. Crea un proyecto en la consola de Google Cloud.**

Cuando esto sucede, no significa necesariamente que haya un problema con la cuenta. La solución consiste en **crear manualmente el proyecto en Google Cloud y después importarlo en Google AI Studio**.

> **Nota:** Las pantallas y los nombres de algunas opciones pueden cambiar con el tiempo. Este tutorial está basado en el procedimiento disponible actualmente.

---

**“Cómo crear una API Key de Gemini gratis desde Google AI Studio cuando no se puede crear automáticamente el proyecto”**

# 1. Entrar en Google AI Studio

El primer paso es acceder a:

[Google AI Studio](https://aistudio.google.com/?utm_source=chatgpt.com)

Inicia sesión utilizando la cuenta de Google con la que quieres utilizar la API.

Una vez dentro de AI Studio, busca la sección relacionada con **API Keys** o con los proyectos.

Si AI Studio puede crear automáticamente el proyecto, es posible que simplemente aparezca la opción para crear una clave.

Pero si aparece el mensaje:

> **No se pudo crear una clave de API ni un proyecto de Google Cloud para ti.**

deberás crear el proyecto manualmente.

---

# 2. Crear el proyecto en Google Cloud

Google AI Studio necesita que la API Key esté asociada a un **proyecto de Google Cloud**. Google explica que cada clave de Gemini está asociada a un proyecto de Google Cloud, donde se administran aspectos como permisos, colaboradores y facturación. [Google AI for Developers](https://ai.google.dev/gemini-api/docs/api-key?cq_net=g\&utm_source=chatgpt.com)

Puedes entrar directamente en:

[Crear un proyecto en Google Cloud](https://console.cloud.google.com/projectcreate?utm_source=chatgpt.com)

Asegúrate de haber iniciado sesión con **la misma cuenta de Google que utilizas en AI Studio**.

Aparecerá la pantalla para crear un nuevo proyecto.

### Nombre del proyecto

En **Nombre del proyecto**, escribe un nombre que te permita identificarlo.

Por ejemplo:

```text
Mi proyecto Gemini
```

o:

```text
API Gemini
```

El nombre es solamente identificativo, por lo que puedes utilizar el que prefieras.

Después pulsa:

**Crear**

Google Cloud creará el proyecto.

---

# 3. Esperar a que Google Cloud cree el proyecto

Después de pulsar **Crear**, Google Cloud puede tardar unos instantes en terminar de crear el proyecto.

Una vez creado, selecciónalo desde el selector de proyectos de Google Cloud.

Por ejemplo:

```text
Mi proyecto Gemini
```

Es importante comprobar que estás trabajando dentro del proyecto que acabas de crear.

---

# 4. Regresar a Google AI Studio

Ahora vuelve a:

[Google AI Studio](https://aistudio.google.com/?utm_source=chatgpt.com)

Entra nuevamente en la sección de **API Keys** o **Projects**.

Busca la opción:

**Import projects**

o su equivalente en español.

Esta opción permite incorporar a AI Studio un proyecto que ya existe en Google Cloud.

Selecciona el proyecto que acabas de crear.

Por ejemplo:

```text
Mi proyecto Gemini
```

y confirma la importación.

---

# 5. Crear la API Key

Una vez importado el proyecto, vuelve a la sección de **API Keys**.

Ahora debería aparecer la posibilidad de crear una clave.

Selecciona:

**Create API key**

AI Studio te pedirá que selecciones el proyecto asociado.

Selecciona:

```text
Mi proyecto Gemini
```

y confirma.

Google generará la API Key.

**¡Listo! Ya tienes una clave para utilizar la Gemini API.**

---

# 6. ⚠️ Muy importante: no publiques tu API Key

La API Key debe tratarse como una contraseña.

**Nunca debes colocarla directamente en:**

- GitHub público.
- Un repositorio público.
- Una página web cuyo código pueda ver cualquiera.
- Capturas de pantalla.
- Artículos de blog.
- Foros.

Por ejemplo, **no hagas esto**:

```python
API_KEY = "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX"
```

si el archivo va a terminar publicado.

Es mucho mejor utilizar una variable de entorno:

```bash
export GEMINI_API_KEY="TU_API_KEY"
```

y después hacer que el programa la lea desde el entorno.

Así puedes compartir el código sin revelar la clave.

---

# 7. ¿La API de Gemini es realmente gratuita?

Aquí hay que hacer una aclaración importante.

Google ofrece actualmente un **Free Tier** para la Gemini API. Este nivel permite utilizar determinados modelos sin pagar, aunque existen límites de uso. [Google AI for Developers](https://ai.google.dev/gemini-api/docs/billing?hl=es-419\&utm_source=chatgpt.com)

Por tanto, es más correcto decir:

> **Puedes crear y utilizar una API Key de Gemini con el nivel gratuito, dentro de los límites establecidos por Google.**

No sería correcto afirmar:

> ❌ "Gemini API es ilimitada y completamente gratis."

Los modelos, límites y condiciones pueden cambiar.

Google publica los límites y precios actuales en su página oficial de precios:

[Precios de la Gemini API](https://ai.google.dev/gemini-api/docs/pricing?hl=es&utm_source=chatgpt.com)

---

# 8. No confundas el nivel gratuito con la facturación

Para comenzar no es necesario activar un proyecto de pago simplemente para obtener una clave del nivel gratuito.

Google indica que las cuentas nuevas comienzan en el **Free Tier**, que proporciona acceso a determinados modelos y está sujeto a los límites de frecuencia correspondientes. [Google AI for Developers](https://ai.google.dev/gemini-api/docs/billing?hl=es-419\&utm_source=chatgpt.com)

Si posteriormente necesitas mayores límites, puedes configurar la facturación y pasar a un nivel de pago.

En ese caso ya se aplican cargos según el uso. Google explica que para pasar al nivel de pago actualmente se debe vincular una cuenta de facturación y, dependiendo del proceso de facturación asignado, puede ser necesario realizar un prepago mínimo. [Google AI for Developers](https://ai.google.dev/gemini-api/docs/billing.md?utm_source=chatgpt.com)

**Por eso, si solamente quieres comenzar a experimentar con la API, no actives la facturación sin saber exactamente qué implica.**

---

# 9. Una novedad importante de 2026

Hay otro detalle que conviene incluir en el tutorial porque muchos artículos antiguos de Internet ya están desactualizados.

Google informa que, desde el **28 de mayo de 2026**, las nuevas claves creadas en Google AI Studio se generan como **claves de autorización (auth keys)** de forma predeterminada. Además, la Gemini API rechaza las claves estándar sin restricciones; las claves estándar que tengan restricciones explícitas pueden continuar funcionando. [Google AI for Developers](https://ai.google.dev/gemini-api/docs/api-key?cq_net=g\&utm_source=chatgpt.com)

Por ello, si encuentras un tutorial antiguo que muestra una pantalla diferente, **no significa necesariamente que estés haciendo algo mal**.

La interfaz de Google AI Studio y el sistema de autenticación han cambiado.

---

# 10. Resumen del procedimiento

El proceso completo puede resumirse así:

```text
Google AI Studio
       │
       ▼
¿Puede crear automáticamente el proyecto?
       │
       ├── SÍ ──► Crear API Key
       │
       └── NO
             │
             ▼
     Google Cloud Console
             │
             ▼
       Crear proyecto
             │
             ▼
       Volver a AI Studio
             │
             ▼
        Import projects
             │
             ▼
      Seleccionar proyecto
             │
             ▼
        Create API key
             │
             ▼
          API Key
```

---

## Conclusión

Si al intentar crear una API Key desde Google AI Studio aparece el mensaje:

> **“No se pudo crear una clave de API ni un proyecto de Google Cloud para ti.”**

la solución es sencilla: **crear primero el proyecto manualmente en Google Cloud, importarlo posteriormente en AI Studio y finalmente generar la API Key desde AI Studio**.

Este procedimiento permite comenzar utilizando el **nivel gratuito de la Gemini API**, siempre respetando los modelos disponibles y los límites establecidos por Google. [Google AI for Developers](https://ai.google.dev/gemini-api/docs/billing?hl=es-419\&utm_source=chatgpt.com)

### Enlaces oficiales

- [Google AI Studio](https://aistudio.google.com/?utm_source=chatgpt.com)
- [Crear proyecto de Google Cloud](https://console.cloud.google.com/projectcreate?utm_source=chatgpt.com)
- [Documentación oficial sobre API Keys de Gemini](https://ai.google.dev/gemini-api/docs/api-key?utm_source=chatgpt.com)
- [Precios y nivel gratuito de Gemini API](https://ai.google.dev/gemini-api/docs/pricing?hl=es&utm_source=chatgpt.com)
- [Información oficial sobre facturación](https://ai.google.dev/gemini-api/docs/billing?hl=es-419&utm_source=chatgpt.com)
