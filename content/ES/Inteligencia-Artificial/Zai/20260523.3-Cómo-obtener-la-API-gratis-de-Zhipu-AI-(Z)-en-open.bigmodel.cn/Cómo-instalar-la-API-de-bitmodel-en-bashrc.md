
# Problema le digo a ChatGPT

tengo una API gratis de https://open.bigmodel.cn/ pregunto cómo la pongo en .bashrc? consulta por favor en https://docs.bigmodel.cn/

---

# ME responde
Sí. Lo más práctico en Linux es poner la API en `~/.bashrc` como variable de entorno, igual que hiciste con NVIDIA.

Según la documentación oficial de Z.ai / Zhipu AI, recomiendan usar una variable de entorno para la API Key. ([Z.AI][1])

Abre:

```bash
nano ~/.bashrc
```

Y añade al final:

```bash
export ZAI_API_KEY="tu_api_key"
```

o también:

```bash
export ZHIPU_API_KEY="tu_api_key"
```

o:

```bash
export ZHIPUAI_API_KEY="tu_api_key"
```

La razón es que diferentes herramientas esperan nombres distintos para la variable:

| Herramienta                            | Variable común         |             |
| -------------------------------------- | ---------------------- | ----------- |
| SDK oficial Z.ai                       | `ZAI_API_KEY`          |             |
| AI SDK Provider                        | `ZHIPU_API_KEY`        |             |
| LangChain                              | `ZHIPUAI_API_KEY`      |             |
| Algunas herramientas OpenAI-compatible | variable personalizada | ([Z.AI][1]) |

Yo te recomendaría poner las tres para evitar problemas:

```bash
export ZAI_API_KEY="tu_api_key"
export ZHIPU_API_KEY="$ZAI_API_KEY"
export ZHIPUAI_API_KEY="$ZAI_API_KEY"
```

Luego recarga:

```bash
source ~/.bashrc
```

Comprueba:

```bash
echo $ZAI_API_KEY
```

Si muestra la clave, quedó cargada.

Además, para herramientas compatibles con OpenAI normalmente se usa también:

```bash
export OPENAI_API_KEY="$ZAI_API_KEY"
export OPENAI_BASE_URL="https://open.bigmodel.cn/api/paas/v4"
```

porque la API de Zhipu es compatible con el formato OpenAI Chat Completions. ([GitHub][2])

Te quedaría algo así:

```bash
# Zhipu AI / Z.ai
export ZAI_API_KEY="tu_api_key"

# Compatibilidad
export ZHIPU_API_KEY="$ZAI_API_KEY"
export ZHIPUAI_API_KEY="$ZAI_API_KEY"

# OpenAI-compatible
export OPENAI_API_KEY="$ZAI_API_KEY"
export OPENAI_BASE_URL="https://open.bigmodel.cn/api/paas/v4"
```

Después de eso muchas herramientas Linux pueden detectar automáticamente la API, por ejemplo:

* [OpenCode](https://opencode.ai?utm_source=chatgpt.com)
* [Aider](https://aider.chat?utm_source=chatgpt.com)
* [Cline](https://cline.bot?utm_source=chatgpt.com)
* [LLM de Simon Willison](https://llm.datasette.io?utm_source=chatgpt.com)
* [Claude Code (usando endpoint compatible)](https://docs.z.ai/scenario-example/develop-tools/claude?utm_source=chatgpt.com)
* [Open WebUI](https://openwebui.com?utm_source=chatgpt.com)

Incluso Z.ai tiene documentación específica para integrar sus modelos GLM Coding con herramientas de programación y agentes mediante variables de entorno. ([Z.AI][3])

Para saber exactamente cómo configurarla en OpenCode Desktop, Aider, Claude CLI o Codex CLI usando tu API de Zhipu, dime cuál de esos programas quieres usar y te indico la configuración exacta.

[1]: https://docs.z.ai/guides/develop/python/introduction?utm_source=chatgpt.com "Official Python SDK - Overview"
[2]: https://github.com/trufflesecurity/trufflehog/issues/4662?utm_source=chatgpt.com "Zhipu AI · Issue #4662 · trufflesecurity/trufflehog"
[3]: https://docs.z.ai/scenario-example/develop-tools/claude?utm_source=chatgpt.com "Claude Code - Overview - Z.AI DEVELOPER DOCUMENT"
