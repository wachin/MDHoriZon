# Cómo usar la API gratuita de TokenRouter en Qwen Code para Linux

En este tutorial vamos a configurar una API de **TokenRouter** para utilizar modelos de inteligencia artificial desde **Qwen Code** en Linux.

La ventaja es que podemos tener varios proveedores configurados simultáneamente. Por ejemplo:

```
Qwen Code
├── TokenRouter (gratis)
│   └── z-ai/glm-5.3-free (free)
│
└── NVIDIA
    └── Nemotron
```

Después podremos cambiar de modelo mediante `/model`, sin tener que volver a configurar todo.

---

## 1. Crear una cuenta en TokenRouter

Primero debemos tener una cuenta de TokenRouter.

Entramos en:

[https://www.tokenrouter.com/](https://www.tokenrouter.com/)

Y nos registramos gratis.

---

## 2. Ir a la Consola y crear la API Key

Después de iniciar sesión, entramos en la Consola:

[https://www.tokenrouter.com/console/](https://www.tokenrouter.com/console/)

Luego vamos a la sección de API Keys:

[https://www.tokenrouter.com/console/token](https://www.tokenrouter.com/console/token)

Hacemos clic en **"Create Key"**, le ponemos un nombre a la key, y luego desplazamos hacia abajo (con la rueda del ratón o dos dedos en el touchpad) hasta la sección:

```
Allowed Models
```

y allí damos clic en el boton "⌄"

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUCrpwgz7wg_Ljey8rFAd7bcC0PJ4Kv3cDeBIo2yvaFjUv4w3jrvVXYOty_1H-OPLyPPmQWVEo2-voPOLV3eKJmVtW5qf5EoMo4y-ZsOjVqmgZwRmrMx00cUyDF3zhksohvy5qeRUS2wojFDtVu-Z1_vfdMYaRltSZMA3PIaz1Sv7Se8vdsC4fQtAsxSw/s1600-rw/01_models-admited.png)

y se abrirá una subvenana y allí buscamos la palabra **"free"** :

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirLIGVm7Z_GmDMRHHpR9r2Q6atJzmVS6jcQQIJbv8TwOouy-lR5MyUln7jhE7tUh0FrwAncd84JA4jDPE-bxkfHfbjS4vCshu3gWtxCwGR8MacCowzw09AUiErcpOyLBvI7umk-8sm3W10EXlXqyf9jGW88Ah3Kq_tFnznyApbGam4sYQgGJErOzJO-m0/s1600-rw/02.1-escribir-la-palabra-free-en-el-buscador-de-api.png)

en el recuadro de búsqueda. Aparecerán los modelos gratuitos disponibles (estos cambian con el tiempo, no siempre están los mismos). Seleccionamos el (tal vez dejen elegir dos al mismo tiempo) que queramos:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSiPOTKwSkh4FrMuUIwsIk1mFGcKHW9UXqrAP5YLaUkTU8oNFXAElzZs015iz9SgjN0lMFOe9bVPhxih2iQo8TKMv3YJx1796yeHZ0ZKY88xy5Iy-TQ5eqmLtmFgTANAYAZOyjAdClZ_n7Bdbu1AXII3_7ZpLDhRsUfo_RhpNUzKfx1C3HAti81pCLRM4/s1600-rw/02_z-ai_glm-5.3-free.png)

en este caso está disponible el siguiente que lo copio a mano su nombre:

z-ai/glm-5.3-free

Usted deberá también copiar el nombre

y damos clic en **"Submit"**, así como también se muestra en el siguiente gif:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVqhuZfebcjFjqJMNOFUqZFRDiasFgaTYZh1XMpS_-qW_0grs-Uka6f1tAWHrgIJweYAya-85HsBh_kAeGuguXKT1omQJs41vDCkusq8zL_kZnImSw4nbj7Bzg6yp16EFBUQX-u_V6jJEyEKVvBnmA9s6BOWlw_YgTfw2UMIaLgvOG8FTXIEppJ1Q1ETQ/s1600-rw/tokenrouter-free-api-en-tr-ezgif.com.gif)

y se nos dará una API Key con este formato:

```
sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

habrá un botón con el icono de copiar, para copiar la KEY.

## Importante

**No publiques esta clave.**

No la introduzcas en GitHub, no la publiques en capturas de pantalla y no la envíes a otras personas.

Qwen Code se encargará de guardar/referenciar la clave mediante una variable de configuración.

---

## 3. Comprobar desde Linux que la API funciona

Antes de configurar Qwen Code es recomendable comprobar que la API funciona directamente desde la terminal.

Guardaremos temporalmente la clave en una variable de entorno:

```bash
# TokenRouter API
export TOKENROUTER_API_KEY="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

No escribas literalmente `sk-XXXXXXXX...`; sustitúyelo por tu clave real.

Para que persista, ponla en tu archivo:

`.bashrc`

(este archivo está oculto en tu HOME; en un administrador de archivos con **Ctrl + H** lo podrás ver). Edítalo con algún editor de texto, guarda, cierra la terminal y abre otra.

---

## 4. Ver qué modelos ofrece la API

TokenRouter utiliza un endpoint compatible con OpenAI.

La documentación oficial establece:

```
https://api.tokenrouter.com/v1
```

y para los LLM:

```
POST /v1/chat/completions
```

Pero podemos consultar también el/los (si seleccionaste más de uno) modelos mediante la API.

Si no tienes `jq` instálalo:

```bash
sudo apt install jq
```

Ejecuta:

```bash
curl -s https://api.tokenrouter.com/v1/models \
  -H "Authorization: Bearer $TOKENROUTER_API_KEY" \
  | jq -r '.data[].id'
```

**Nota:** En este comando `$TOKENROUTER_API_KEY` tomará tu API KEY para que funcione (no se mostrará aquí ).

---

## 5. Importante: modelos disponibles no significa necesariamente modelos gratuitos

Este punto es importante.

El endpoint `/v1/models` nos permite consultar los modelos que la API expone, pero **no debemos asumir que todos ellos son gratuitos**.

En TokenRouter, los modelos gratuitos son aquellos que seleccionaste con el filtro **"free"** al crear la API Key en la consola. La disponibilidad y el catálogo pueden cambiar, por lo que es mejor consultar el catálogo actual en la consola que utilizar una lista antigua de Internet.

---

## 6. Configurar TokenRouter en Qwen Code

Abrimos Qwen Code:

```bash
qwen
```

Dentro de Qwen Code ejecutamos:

```
/auth
```

Aparecerá:

```
Connect a Provider

    Alibaba ModelStudio
    Official recommended setup: Coding Plan, Token Plan, or Standard API Key

    Third-party Providers
    Choose a built-in provider and connect with an API key

    Custom Provider
    Manually connect a local server, proxy, or unsupported provider
```

Seleccionamos:

```
Custom Provider
```

---

## 7. Step 1/6 — Protocol

Qwen Code mostrará:

```
Custom Provider . Step 1/6 . Protocol

    OpenAI-compatible
    Standard OpenAI API format (most common)

    Anthropic-compatible
    Anthropic Messages API format

    Gemini-compatible
    Google Gemini API format
```

Seleccionamos:

```
OpenAI-compatible
```

¿Por qué?

Porque TokenRouter utiliza una API **totalmente compatible con el formato de OpenAI**. TokenRouter documenta explícitamente que solo necesitas cambiar la Base URL y la API Key para que cualquier cliente OpenAI funcione.

Pulsamos:

```
Enter
```

---

## 8. Step 2/6 — Base URL

Ahora aparece:

```
Custom Provider . Step 2/6 . Base URL

Enter the API endpoint for this protocol
>
```

Aquí debemos poner:

```
https://api.tokenrouter.com/v1
```

## Atención

Aquí **NO** ponemos el nombre del modelo. Ese es el ID del modelo y se introducirá posteriormente.

La Base URL correcta es:

```
https://api.tokenrouter.com/v1
```

Pulsamos:

```
Enter
```

---

## 9. Step 3/6 — API Key

Qwen Code solicitará la API Key.

Aquí debemos pegar:

```
sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

es decir, la API Key que acabamos de crear en TokenRouter.

**Nunca publiques esta clave.**

Después pulsamos:

```
Enter
```

---

## 10. Step 4/6 — Model IDs

Ahora aparece:

```
Custom Provider . Step 4/6

Enter model IDs separated by commas
>
```

Aquí sí ponemos el ID del modelo gratuito que elegimos y anotamos (puede ser otro, pues son reemplazados con el paso del tiempo), por ejemplo:

```
z-ai/glm-5.3-free
```

Este es el lugar correcto para introducir el modelo.

Si queremos configurar varios modelos gratuitos al mismo tiempo, Qwen Code permite introducir varios IDs separados por comas, por ejemplo:

```
z-ai/glm-5.3-free,otro-modelo-free
```

Pero para la primera configuración recomiendo poner **un solo modelo**.

---

## 11. Step 5/6 — Advanced Config

Ahora aparece:

```
Custom Provider . Step 5/6 . Advanced Config

Optional: configure advanced generation settings.

    Enable thinking
    Allows the model to perform extended reasoning before responding.

    Enable modality
    Enables multimodal input capabilities (image, video, etc.).

    Context window: > auto
    Max input tokens (leave empty to auto-detect from model name).
```

Para los modelos gratuitos de TokenRouter, en nuestra prueba práctica encontramos que activar:

```
Enable thinking
```

puede generar errores si el modelo no lo soporta.

Por eso, para esta configuración, debemos dejarlo **desactivado**.

La configuración recomendada es:

```
☐ Enable thinking
☐ Enable modality

Context window: auto
Max input tokens: vacío
```

Simplemente dejamos las opciones sin seleccionar y pulsamos:

```
Enter
```

---

## 12. Step 6/6 — Review

Qwen Code mostrará una pantalla de revisión parecida a:

```json
{
  "env": {
    "QWEN_CUSTOM_API_KEY_OPENAI_HTTPS_API_TOKENROUTER_COM_V1_...": "sk-..."
  },
  "modelProviders": {
    "openai": [
      {
        "id": "z-ai/glm-5.3-free",
        "name": "z-ai/glm-5.3-free",
        "baseUrl": "https://api.tokenrouter.com/v1"
      }
    ]
  }
}
```

Es normal que Qwen Code utilice un nombre largo para la variable que contiene la API Key.

No significa que esté exponiendo la clave.

Si todo es correcto, pulsamos:

```
Enter
```

para guardar.

Qwen Code mostrará:

```
Successfully configured Custom Provider.
Use /model to switch models.
```

---

## 13. Comprobar los modelos configurados

Ahora ejecutamos:

```
/model
```

Deberíamos ver algo parecido a:

```
Select Model

1. [openai] z-ai/glm-5.3-free

2. [openai] nvidia/nemotron-3-super-120b-a12b
```

Esto demuestra que podemos conservar **los dos proveedores**.

No es necesario eliminar la configuración anterior.

---

## 14. Seleccionar TokenRouter

Seleccionamos:

```
1. [openai] z-ai/glm-5.3-free
```

Qwen Code mostrará información similar a:

```
Modality: text-only
Context Window: 1,000,000 tokens
Base URL: https://api.tokenrouter.com/v1
API Key: QWEN_CUSTOM_API_KEY_OPENAI_HTTPS_API_TOKENROUTER_COM_V1_...
```

Pulsamos:

```
Enter
```

---

## 15. Comprobar que TokenRouter es el modelo activo

Qwen Code deberá mostrar algo parecido a:

```
authType: openai
Using model: z-ai/glm-5.3-free
Base URL: https://api.tokenrouter.com/v1
API key: sk-...XXXX
```

Y en la parte inferior:

```
tu_usuario : z-ai/glm-5.3-free
```

Esto confirma que Qwen Code está utilizando TokenRouter.

---

## 16. Primera prueba desde Qwen Code

Podemos hacer una prueba segura sin modificar ningún archivo.

Por ejemplo:

```
Lista los archivos del directorio actual y dime sus nombres.
No modifiques, crees ni elimines ningún archivo.
```

En nuestra prueba, el modelo utilizó automáticamente la herramienta Shell:

```
✓ Shell ls -1a
```

Esto es importante porque demuestra que no solamente estamos utilizando TokenRouter como un chatbot.

El flujo es:

```
TokenRouter API
     ↓
z-ai/glm-5.3-free (free)
     ↓
Qwen Code
     ↓
Shell
     ↓
Linux
```

---

## 17. Utilizar TokenRouter con MCP Context7

Si ya tenemos Context7 configurado en Qwen Code, si no lo tiene siga este tutorial:

**Cómo instalar Context7 MCP en Linux para usarlo con Qwen Code**  
[https://facilitarelsoftwarelibre.blogspot.com/2026/08/como-instalar-context7-mcp-en-linux.html](https://facilitarelsoftwarelibre.blogspot.com/2026/08/como-instalar-context7-mcp-en-linux.html)  

también podemos utilizarlo con el modelo gratuito de TokenRouter.

Por ejemplo:

```
Usa Context7 MCP para consultar la documentación oficial de PyQt6 sobre QTreeWidget.

No utilices solamente tu conocimiento interno.

Después dime qué métodos principales tiene QTreeWidget y de qué documentación obtuviste la información.

No modifiques ningún archivo.
```

Qwen Code puede solicitar autorización para ejecutar la herramienta MCP.

Por ejemplo:

```
Allow execution of MCP tool "resolve-library-id"
from server "context7"?
```

Podemos seleccionar:

```
Yes, allow once
```

El agente puede entonces utilizar:

```
resolve-library-id
```

y:

```
query-docs
```

para consultar la documentación.

El flujo completo queda:

```
                 TokenRouter API
                     │
                     ▼
            z-ai/glm-5.3-free (free)
                     │
                     ▼
                 Qwen Code
                /         \
               /           \
           Shell           MCP
             │              │
             ▼              ▼
           Linux         Context7
                             │
                             ▼
                     Documentación PyQt6
```

---

## 18. Cambiar nuevamente a otro proveedor

No tenemos que volver a configurar nada.

Simplemente ejecutamos:

```
/model
```

Y seleccionamos el modelo que queramos.

Por ejemplo:

```
1. [openai] z-ai/glm-5.3-free

2. [openai] nvidia/nemotron-3-super-120b-a12b
```

Así podemos alternar entre TokenRouter y NVIDIA.

---

## 19. Comprobar modelos desde la terminal

Si queremos investigar qué modelos están disponibles para nuestra API Key, podemos ejecutar:

```bash
curl -s https://api.tokenrouter.com/v1/models \
  -H "Authorization: Bearer $TOKENROUTER_API_KEY" \
  | jq -r '.data[].id'
```

Para buscar solamente modelos gratuitos:

```bash
curl -s https://api.tokenrouter.com/v1/models \
  -H "Authorization: Bearer $TOKENROUTER_API_KEY" \
  | jq -r '.data[].id' \
  | grep -i free
```

## Pero recuerda

Estos comandos sirven para descubrir modelos expuestos por el endpoint. Para determinar cuáles tienen acceso gratuito, hay que comprobar la consola de TokenRouter y el filtro **"free"** que usaste al crear la API Key. TokenRouter mantiene ese catálogo en la consola y lo actualiza.

---

## 20. Comprobar directamente un modelo

También podemos probar un modelo sin Qwen Code.

Por ejemplo:

```bash
curl -s https://api.tokenrouter.com/v1/chat/completions \
  -H "Authorization: Bearer $TOKENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "z-ai/glm-5.3-free",
    "messages": [
      {
        "role": "user",
        "content": "Responde en español. Confirma que la API de TokenRouter está funcionando."
      }
    ],
    "max_tokens": 200
  }'
```

Si obtenemos:

```json
"object": "chat.completion"
```

y:

```json
"model": "z-ai/glm-5.3-free"
```

la llamada ha funcionado.

---

## 21. Un detalle importante sobre el parámetro `enable_thinking`

No debemos asumir que todos los modelos de TokenRouter aceptan exactamente los mismos parámetros.

En nuestra prueba, al activar en Qwen Code:

```
Enable thinking
```

se generó:

```json
"extra_body": {
    "enable_thinking": true
}
```

y el modelo respondió con un error de parámetro no soportado.

Por eso dejamos:

```
Enable thinking
☐
```

desactivado.

Esto demuestra una regla importante al configurar proveedores personalizados:

> Que una opción aparezca en Qwen Code no significa que todos los modelos del proveedor sean compatibles con ella.

Hay que comprobar las capacidades y parámetros admitidos por el modelo concreto.

---

## 22. Resultado final

Al terminar tendremos Qwen Code configurado de esta manera:

```
Qwen Code 0.22.2
│
├── TokenRouter (gratis)
│   ├── Base URL:
│   │   https://api.tokenrouter.com/v1
│   │
│   └── Model:
│       z-ai/glm-5.3-free (u otro modelo free)
│
└── NVIDIA
    └── nvidia/nemotron-3-super-120b-a12b
```

Y podremos cambiar entre ellos utilizando:

```
/model
```

TokenRouter utiliza el formato **OpenAI-compatible**, por lo que Qwen Code puede conectarse mediante **Custom Provider → OpenAI-compatible**. TokenRouter documenta oficialmente que solo necesitas cambiar la Base URL y la API Key.

## RESUMEN

La configuración no requiere instalar un SDK especial de TokenRouter en Linux.

El proceso esencial es:

```
1. Crear cuenta TokenRouter
        ↓
2. Entrar en la Consola
        ↓
3. Ir a API Keys → Create Key
        ↓
4. En Allowed Models, buscar "free" y seleccionar
        ↓
5. Copiar la API Key (sk-...)
        ↓
6. Custom Provider en Qwen Code
        ↓
7. OpenAI-compatible
        ↓
8. https://api.tokenrouter.com/v1
        ↓
9. API Key de TokenRouter
        ↓
10. ID del modelo gratuito
        ↓
11. Advanced Config sin activar opciones
        ↓
12. Guardar
        ↓
13. /model
        ↓
14. Seleccionar TokenRouter
```

De esta manera podemos utilizar un modelo gratuito de TokenRouter directamente desde un **agente de IA en Linux**, y además conservar otros proveedores configurados en Qwen Code.

