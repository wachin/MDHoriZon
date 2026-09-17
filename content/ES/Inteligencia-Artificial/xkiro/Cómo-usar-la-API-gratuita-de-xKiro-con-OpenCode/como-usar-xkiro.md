# Cómo usar la API gratuita de xKiro con OpenCode

[xKiro](https://xkiro.com/) ofrece una API compatible con OpenAI que podemos utilizar en herramientas de programación como OpenCode.

Esto resulta especialmente interesante si queremos experimentar con diferentes modelos de IA gratuitos desde OpenCode sin depender de un único proveedor.

> **Importante:** que un modelo aparezca como `Free` no significa necesariamente que vaya a estar disponible indefinidamente, ni que tenga capacidad ilimitada para desarrollar proyectos grandes. La disponibilidad, los límites y los modelos gratuitos pueden cambiar.

## 1. Crear una API Key en xKiro

Primero debemos entrar al panel de API Keys de xKiro:

[xKiro API Keys](https://xkiro.com/dashboard/api/keys)

Creamos una nueva API Key.

Una clave tendrá un formato similar a:

```text
sk-xt-8d4XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

El valor anterior es solamente un ejemplo ficticio.

**Nunca publiques tu API Key en GitHub, tutoriales, capturas de pantalla ni archivos de configuración que vayas a compartir.**

---

## 2. Conocer la Base URL de xKiro

La API de xKiro utiliza la siguiente Base URL:

```text
https://api.xkiro.com/v1
```

La documentación oficial de xKiro confirma esta dirección para utilizar su API compatible con OpenAI.

[Documentación de la API de xKiro](https://docs.xkiro.com/)

OpenCode puede trabajar con proveedores que utilizan el formato de API compatible con OpenAI, por lo que podemos configurar xKiro como un proveedor personalizado.

---

## 3. Elegir un modelo gratuito

Los modelos disponibles se pueden consultar desde:

[Modelos de xKiro](https://xkiro.com/dashboard/models)

En el panel de modelos:

1. Entramos en **Models**.
2. Pulsamos **Filters**.
3. Seleccionamos **Free**.
4. Aparecerán los modelos disponibles gratuitamente.
5. Entramos en el modelo que queremos utilizar.
6. Copiamos su **Model ID**.

Por ejemplo, un Model ID podría tener este formato:

```text
openai/gpt-5.3-codex-spark
```

**Es importante copiar el Model ID completo.**

En xKiro los Model ID utilizan el prefijo del proveedor. Por ejemplo:

```text
openai/gpt-5.6-sol
```

y no:

```text
gpt-5.6-sol
```

La documentación de xKiro confirma expresamente que debemos utilizar el ID completo con el prefijo del proveedor.

---

# 4. Configurar xKiro en OpenCode

OpenCode permite agregar proveedores personalizados compatibles con OpenAI.

La documentación oficial de OpenCode indica que para este tipo de proveedores debemos utilizar:

```text
@ai-sdk/openai-compatible
```

cuando la API utiliza el formato `/v1/chat/completions`.

Primero iniciamos OpenCode:

```bash
opencode
```

Dentro de OpenCode ejecutamos:

```text
/connect
```

En la lista de proveedores buscamos:

```text
Other
```

OpenCode nos pedirá un **Provider ID**.

Podemos utilizar:

```text
xkiro
```

Después introducimos nuestra API Key:

```text
sk-xt-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

OpenCode almacenará las credenciales en:

```text
~/.local/share/opencode/auth.json
```

por lo que no es necesario escribir la API Key directamente dentro de `opencode.json`.

---

# 5. Configurar el proveedor en opencode.json

Ahora debemos indicarle a OpenCode dónde está la API de xKiro y qué modelos queremos utilizar.

Podemos crear o modificar el archivo:

```text
opencode.json
```

Por ejemplo:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "xkiro": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "xKiro",
      "options": {
        "baseURL": "https://api.xkiro.com/v1"
      },
      "models": {
        "openai/gpt-5.3-codex-spark": {
          "name": "GPT-5.3 Codex Spark"
        }
      }
    }
  }
}
```

Aquí tenemos:

```text
xkiro
```

como identificador del proveedor.

La API utiliza:

```text
https://api.xkiro.com/v1
```

y el modelo configurado es:

```text
openai/gpt-5.3-codex-spark
```

La propia documentación de xKiro proporciona esta misma estructura de configuración para OpenCode.

---

# 6. Agregar varios modelos gratuitos

Una de las ventajas de esta configuración es que podemos añadir varios modelos de xKiro.

Por ejemplo:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "xkiro": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "xKiro",
      "options": {
        "baseURL": "https://api.xkiro.com/v1"
      },
      "models": {
        "openai/gpt-5.3-codex-spark": {
          "name": "GPT-5.3 Codex Spark"
        },
        "qwen/qwen3.8-max": {
          "name": "Qwen3.8 Max"
        },
        "z-ai/glm-5.2": {
          "name": "GLM-5.2"
        }
      }
    }
  }
}
```

**Los modelos anteriores son solamente ejemplos.**

Debemos consultar el panel de xKiro y utilizar los Model ID que estén disponibles en ese momento.

Esto es importante porque la lista de modelos gratuitos puede cambiar.

---

# 7. Comprobar los modelos desde OpenCode

Después de guardar la configuración, iniciamos o reiniciamos OpenCode.

Dentro de OpenCode ejecutamos:

```text
/models
```

Deberíamos encontrar nuestro proveedor:

```text
xKiro
```

y dentro de él los modelos que agregamos.

Por ejemplo:

```text
xKiro
 ├── GPT-5.3 Codex Spark
 ├── Qwen3.8 Max
 └── GLM-5.2
```

Seleccionamos el modelo que queremos utilizar.

OpenCode utiliza internamente el formato:

```text
provider/model
```

por lo que un modelo podría identificarse como:

```text
xkiro/openai/gpt-5.3-codex-spark
```

La documentación de OpenCode confirma que los modelos de proveedores personalizados utilizan el `provider_id` seguido del `model_id`.

---

# 8. Probar la API antes de utilizarla en OpenCode

Si tenemos problemas, es buena idea comprobar primero que la API de xKiro funciona independientemente de OpenCode.

En Linux podemos establecer temporalmente la API Key:

```bash
export XKIRO_API_KEY="sk-xt-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

Después podemos realizar una petición de prueba:

```bash
curl https://api.xkiro.com/v1/chat/completions \
  -H "Authorization: Bearer $XKIRO_API_KEY" \
  -H "
```
