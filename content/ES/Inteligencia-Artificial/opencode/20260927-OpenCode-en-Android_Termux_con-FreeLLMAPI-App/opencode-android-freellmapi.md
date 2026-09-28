# Cómo configurar OpenCode en Android/Termux con FreeLLMAPI App

Es posible convertir un teléfono Android en un pequeño entorno de desarrollo con inteligencia artificial utilizando **Termux**, **OpenCode** y **FreeLLMAPI App**.

Una de las ventajas de esta combinación es que OpenCode puede trabajar directamente desde el teléfono, mientras que FreeLLMAPI App funciona como un servidor API compatible con OpenAI dentro de la red Wi-Fi. De esta manera, OpenCode puede enviar sus solicitudes a FreeLLMAPI, y FreeLLMAPI se encarga de enrutar las peticiones hacia los modelos disponibles.

Este procedimiento permite utilizar OpenCode en Android sin necesidad de instalar los modelos de inteligencia artificial directamente en el teléfono.

---

## 1. ¿Qué se va a conseguir?

La configuración final tendrá aproximadamente esta estructura:

```text
┌───────────────────────────────┐
│           Android             │
│                               │
│  ┌─────────────┐              │
│  │   Termux    │              │
│  │             │              │
│  │   OpenCode  │              │
│  └──────┬──────┘              │
│         │                     │
│         │ HTTP / API          │
│         ▼                     │
│  ┌──────────────────┐         │
│  │  FreeLLMAPI App  │         │
│  │                  │         │
│  │   LAN Server     │         │
│  │   :3001/v1       │         │
│  └────────┬─────────┘         │
│           │                   │
└───────────┼───────────────────┘
            │
            ▼
      FreeLLMAPI Router
            │
       ┌────┴────┐
       ▼         ▼
    Modelo A   Modelo B
```

FreeLLMAPI App puede exponer en la red Wi-Fi del teléfono una API compatible con OpenAI. Su documentación indica que los clientes compatibles con OpenAI pueden utilizar el endpoint `/v1` y la clave unificada proporcionada por la aplicación.

---

# 2. Requisitos

Se necesitan:

* Un teléfono Android.
* Termux.
* OpenCode.
* FreeLLMAPI App.
* Una cuenta/suscripción de FreeLLMAPI que permita utilizar el servidor LAN.
* Conexión a Internet.
* Conexión Wi-Fi activa.

### Aplicaciones

**FreeLLMAPI App**

[FreeLLMAPI en Google Play](https://play.google.com/store/apps/details?id=co.freellmapi.app&utm_source=chatgpt.com)

**OpenCode**

[Documentación oficial de OpenCode](https://opencode.ai/docs/?utm_source=chatgpt.com)

**Termux**

Para este tutorial se recomienda utilizar una versión actual de Termux, por ejemplo la distribuida mediante F-Droid.

---

# 3. Instalar Termux

Después de instalar Termux, se recomienda actualizar los paquetes:

```bash
pkg update
pkg upgrade
```

A continuación se pueden instalar las herramientas básicas:

```bash
pkg install git nodejs
```

Comprobar las versiones:

```bash
node --version
npm --version
git --version
```

No es necesario instalar un servidor FreeLLMAPI adicional dentro de Termux.

Esto es importante.

**FreeLLMAPI App para Android ya puede funcionar como servidor API LAN.**

---

# 4. Instalar OpenCode

OpenCode puede instalarse mediante npm.

Por ejemplo:

```bash
npm install -g opencode-ai
```

Después comprobar la instalación:

```bash
opencode --version
```

Si el comando muestra la versión instalada, OpenCode está listo para configurarse.

---

# 5. Activar el servidor LAN de FreeLLMAPI

Abrir **FreeLLMAPI App** en Android.

Dentro de la aplicación hay que localizar la opción correspondiente al servidor LAN.

Activar:

```text
LAN Server
```

o una opción equivalente a:

```text
Serving on Wi-Fi
```

La aplicación mostrará una dirección parecida a:

```text
http://192.168.1.62:3001/v1
```

La dirección será diferente en cada teléfono y en cada red.

Por ejemplo:

```text
http://192.168.1.62:3001/v1
```

La parte:

```text
192.168.1.62
```

es la dirección IP privada del teléfono dentro de la red Wi-Fi.

El puerto:

```text
3001
```

es el puerto utilizado por el servidor LAN de FreeLLMAPI.

Y:

```text
/v1
```

corresponde a la API compatible con OpenAI.

La aplicación actualmente anuncia precisamente la posibilidad de convertir el teléfono en un servidor API accesible mediante Wi-Fi.

---

# 6. Obtener la Unified API Key

En la sección del servidor de FreeLLMAPI aparecerá una:

```text
Unified API Key
```

Esta clave es necesaria para que OpenCode pueda autenticarse.

### Importante

La clave API es privada.

No debe publicarse:

* en artículos;
* en GitHub;
* en capturas de pantalla;
* en vídeos;
* en grupos de Telegram;
* ni dentro de archivos de configuración que se vayan a compartir.

En este tutorial se utilizará:

```text
TU_UNIFIED_API_KEY
```

como ejemplo.

Nunca se debe copiar literalmente ese texto como clave.

---

# 7. Comprobar que el servidor funciona

Antes de configurar OpenCode es conveniente comprobar que Termux puede comunicarse con FreeLLMAPI.

Por ejemplo:

```bash
curl http://192.168.1.62:3001/v1/models
```

Naturalmente, hay que sustituir:

```text
192.168.1.62
```

por la dirección IP que muestra FreeLLMAPI.

Si el servidor requiere autenticación, se puede realizar la consulta utilizando la Unified API Key:

```bash
curl \
  -H "Authorization: Bearer TU_UNIFIED_API_KEY" \
  http://192.168.1.62:3001/v1/models
```

Si todo funciona correctamente, FreeLLMAPI devolverá información sobre los modelos disponibles.

Entre ellos puede aparecer un modelo especial:

```text
auto
```

Este modelo es especialmente interesante para OpenCode.

---

# 8. ¿Qué significa el modelo `auto`?

FreeLLMAPI dispone de un sistema de enrutamiento automático.

En lugar de obligar al usuario a escoger manualmente un modelo concreto, se puede utilizar:

```text
auto
```

De esta manera, FreeLLMAPI decide qué modelo disponible utilizar.

La descripción actual de la aplicación indica que el modo automático puede evaluar los modelos según su capacidad y la presión de los límites de uso disponibles.

Por lo tanto, la configuración puede quedar así:

```text
OpenCode
   ↓
FreeLLMAPI Auto
   ↓
FreeLLMAPI Router
   ↓
Modelo disponible
```

Esto resulta especialmente práctico cuando se utiliza OpenCode como agente de programación.

---

# 9. Registrar la API Key en OpenCode

Iniciar OpenCode:

```bash
opencode
```

Dentro de OpenCode ejecutar:

```text
/connect
```

OpenCode mostrará la pantalla para agregar una credencial.

Buscar una opción similar a:

```text
Other
```

o proveedor personalizado.

Cuando solicite el identificador del proveedor, utilizar:

```text
freellmapi
```

Después introducir la:

```text
Unified API Key
```

de FreeLLMAPI.

OpenCode guarda las credenciales introducidas mediante `/connect` en:

```text
~/.local/share/opencode/auth.json
```

Por eso no es necesario escribir la API Key directamente dentro del archivo de configuración de OpenCode.

---

# 10. Comprobar la credencial

Cerrar OpenCode si todavía está abierto y ejecutar:

```bash
opencode auth list
```

Debe aparecer una entrada correspondiente a:

```text
freellmapi api
```

Esto significa que OpenCode tiene almacenada la credencial.

---

# 11. Configurar OpenCode

Ahora hay que indicar a OpenCode dónde está el servidor FreeLLMAPI.

Crear o editar:

```text
~/.config/opencode/opencode.jsonc
```

Una configuración sencilla es:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "freellmapi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "FreeLLMAPI",
      "options": {
        "baseURL": "http://192.168.1.62:3001/v1"
      },
      "models": {
        "auto": {
          "name": "FreeLLMAPI Auto"
        }
      }
    }
  }
}
```

### Atención con la dirección IP

La dirección:

```text
192.168.1.62
```

es solamente un ejemplo.

Debe sustituirse por la dirección que aparece en FreeLLMAPI App.

Por ejemplo, si la aplicación muestra:

```text
http://192.168.1.45:3001/v1
```

la configuración debe utilizar:

```json
"baseURL": "http://192.168.1.45:3001/v1"
```

---

# 12. ¿Por qué se utiliza `@ai-sdk/openai-compatible`?

FreeLLMAPI proporciona una API compatible con el formato utilizado por OpenAI.

OpenCode permite configurar proveedores personalizados mediante:

```text
@ai-sdk/openai-compatible
```

y especificar una URL personalizada mediante:

```text
baseURL
```

La documentación oficial de OpenCode utiliza precisamente este mecanismo para configurar servicios compatibles con OpenAI.

En nuestro caso:

```json
"npm": "@ai-sdk/openai-compatible"
```

le indica a OpenCode cómo comunicarse con la API.

Mientras que:

```json
"baseURL": "http://192.168.1.62:3001/v1"
```

le indica dónde encontrarla.

---

# 13. ¿Por qué solamente se configura `auto`?

La configuración podría contener muchos modelos.

Sin embargo, si se quiere dejar que FreeLLMAPI decida automáticamente cuál utilizar, solamente hace falta declarar:

```json
"models": {
  "auto": {
    "name": "FreeLLMAPI Auto"
  }
}
```

Así, OpenCode verá un modelo llamado:

```text
FreeLLMAPI Auto
```

y las solicitudes serán enviadas a:

```text
freellmapi/auto
```

FreeLLMAPI será entonces responsable del enrutamiento.

---

# 14. Iniciar OpenCode

Desde el directorio de un proyecto:

```bash
cd ~/mi-proyecto
```

iniciar:

```bash
opencode
```

Después se puede abrir el selector de modelos:

```text
/models
```

y seleccionar:

```text
FreeLLMAPI Auto
```

La interfaz de OpenCode mostrará el proveedor y modelo seleccionado.

La documentación de OpenCode confirma que los modelos configurados mediante proveedores personalizados aparecen en el selector `/models`.

---

# 15. Realizar una prueba

Una vez seleccionado:

```text
FreeLLMAPI Auto
```

se puede realizar una pregunta sencilla:

```text
Analiza este proyecto y dime qué archivos contiene y para qué sirve cada uno.
```

También se puede probar con una tarea de programación:

```text
Revisa este proyecto y dime si encuentras errores evidentes en el código.
No modifiques ningún archivo todavía.
```

Si OpenCode responde correctamente, la configuración está funcionando.

---

# 16. Esquema completo de la comunicación

La arquitectura final queda así:

```text
                    INTERNET
                       │
                       ▼
             ┌──────────────────┐
             │ FreeLLMAPI       │
             │ Router           │
             └────────┬─────────┘
                      │
             ┌────────┴─────────┐
             │                  │
             ▼                  ▼
          Modelo A           Modelo B
             │                  │
             └────────┬─────────┘
                      │
                      │
              ┌───────▼────────┐
              │ Android        │
              │                │
              │ FreeLLMAPI App │
              │ LAN Server     │
              │ :3001/v1       │
              └───────┬────────┘
                      │
                      │ HTTP
                      │
              ┌───────▼────────┐
              │ Termux         │
              │                │
              │ OpenCode       │
              └────────────────┘
```

Lo importante es comprender que **OpenCode no está ejecutando el modelo de IA en el teléfono**.

OpenCode funciona como agente de programación.

FreeLLMAPI funciona como intermediario y router.

Los modelos se ejecutan en los servicios de IA correspondientes.

---

# 17. Ventaja de utilizar `auto`

Una configuración tradicional podría ser:

```text
OpenCode
   ↓
Qwen
```

o:

```text
OpenCode
   ↓
GPT
```

Con FreeLLMAPI Auto:

```text
OpenCode
   ↓
FreeLLMAPI Auto
   ↓
FreeLLMAPI decide
   ↓
Modelo disponible
```

Esto permite mantener la configuración de OpenCode relativamente sencilla aunque cambien los modelos disponibles.

Además, la aplicación permite trabajar con un catálogo que puede cambiar con el tiempo. La ficha actual de Google Play describe el modo Auto y el catálogo de modelos de FreeLLMAPI.

---

# 18. No es necesario instalar otro servidor FreeLLMAPI

Una posible confusión es pensar que hay que instalar FreeLLMAPI dos veces:

```text
Android FreeLLMAPI
+
FreeLLMAPI dentro de Termux
```

Esto **no es necesario** para esta configuración.

La aplicación Android ya proporciona el servidor LAN.

Por lo tanto:

```text
FreeLLMAPI App
      +
    Termux
      +
   OpenCode
```

es suficiente.

El servidor se ejecuta dentro de FreeLLMAPI App y OpenCode se conecta a él mediante la dirección IP local.

---

# 19. Solución de problemas

## OpenCode no encuentra FreeLLMAPI

Comprobar que FreeLLMAPI App tiene activado:

```text
LAN Server
```

Después comprobar la dirección IP.

Por ejemplo:

```text
http://192.168.1.62:3001/v1
```

También se puede comprobar desde Termux:

```bash
curl http://192.168.1.62:3001/v1/models
```

---

## Aparece "Invalid API key"

Esto normalmente significa que la clave no está siendo enviada correctamente.

Comprobar:

```bash
opencode auth list
```

Debe existir:

```text
freellmapi api
```

Si no existe, volver a ejecutar:

```text
/connect
```

y registrar nuevamente la credencial.

---

## OpenCode no muestra FreeLLMAPI Auto

Revisar:

```text
~/.config/opencode/opencode.jsonc
```

La configuración debe contener un proveedor cuyo identificador sea:

```text
freellmapi
```

y el modelo:

```text
auto
```

También hay que comprobar que el identificador utilizado en `/connect` sea exactamente el mismo:

```text
freellmapi
```

OpenCode recomienda comprobar precisamente que el ID utilizado durante `/connect` coincida con el ID del proveedor configurado.

---

## Cambió la dirección IP

Esto puede ocurrir cuando el teléfono se conecta a otra red Wi-Fi o cuando el router asigna una nueva dirección.

Por ejemplo, antes:

```text
192.168.1.62
```

y posteriormente:

```text
192.168.1.80
```

En ese caso solamente hay que actualizar:

```json
"baseURL": "http://192.168.1.80:3001/v1"
```

---

# 20. Seguridad

La dirección:

```text
192.168.x.x
```

es una dirección privada de la red local.

Aun así, la Unified API Key debe tratarse como una contraseña.

No se recomienda:

* publicarla en GitHub;
* incluirla en capturas;
* colocarla directamente en un repositorio;
* compartirla públicamente;
* ni abrir innecesariamente el puerto 3001 hacia Internet.

Para esta configuración, lo normal es que OpenCode y FreeLLMAPI se comuniquen dentro de la misma red local.

---

# 21. Resumen de comandos

Una vez instalado todo, el procedimiento básico queda reducido a:

### Actualizar Termux

```bash
pkg update
pkg upgrade
```

### Instalar herramientas

```bash
pkg install git nodejs
```

### Instalar OpenCode

```bash
npm install -g opencode-ai
```

### Comprobar OpenCode

```bash
opencode --version
```

### Registrar FreeLLMAPI

Dentro de OpenCode:

```text
/connect
```

Proveedor:

```text
freellmapi
```

Después introducir la Unified API Key.

### Comprobar credenciales

```bash
opencode auth list
```

### Configurar OpenCode

Archivo:

```text
~/.config/opencode/opencode.jsonc
```

Configuración:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "freellmapi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "FreeLLMAPI",
      "options": {
        "baseURL": "http://IP_DEL_TELEFONO:3001/v1"
      },
      "models": {
        "auto": {
          "name": "FreeLLMAPI Auto"
        }
      }
    }
  }
}
```

Finalmente:

```bash
opencode
```

y seleccionar:

```text
FreeLLMAPI Auto
```

---

# 22. Resultado final

Con esta configuración es posible tener un entorno de programación basado completamente en Android:

```text
Android
│
├── Termux
│   └── OpenCode
│
└── FreeLLMAPI App
    └── LAN API Server
        └── FreeLLMAPI Auto
            └── Modelos de IA
```

El teléfono se convierte así en un pequeño entorno portátil para trabajar con agentes de programación.

Una de las características más interesantes de este sistema es que OpenCode no necesita conocer todos los modelos que existen detrás de FreeLLMAPI. OpenCode solamente necesita conocer un proveedor:

```text
FreeLLMAPI
```

y un modelo:

```text
auto
```

El trabajo de seleccionar y enrutar hacia los modelos disponibles queda en manos de FreeLLMAPI.

---

## Referencias

* [FreeLLMAPI en Google Play](https://play.google.com/store/apps/details?id=co.freellmapi.app)
* [FreeLLMAPI en GitHub](https://github.com/tashfeenahmed/freellmapi)
* [Documentación de OpenCode — Providers](https://opencode.ai/docs/providers/)
* [Documentación de FreeLLMAPI — Clients & Coding Agents](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/clients/01-agent-clients.md)
