# Cómo crear y usar tu API key de OpenRouter en Linux

Si te gusta vivir en la terminal, ya conoces el problema: cada agente de IA CLI (Claude Code, Aider, Codex CLI, OpenCode, Cline...) quiere su propia API key, su propio proveedor y su propio método de pago. Tu tarjeta termina repartida entre tres nubes y tus credenciales desperdigadas por media docena de archivos de configuración.

**OpenRouter** resuelve esto con una idea simple: un único endpoint compatible con la API de OpenAI que da acceso a más de 300 modelos (GPT, Claude, Gemini, DeepSeek, MiniMax, Llama...) de más de 70 proveedores. Una sola key, una sola factura, y cambiar de modelo es editar una cadena de texto.

En esta entrada veremos cómo crear tu API key, configurarla en Linux de forma persistente con `.bashrc` y hacer que tus agentes de terminal la reconozcan automáticamente.

> 💡 **Bonus para los apurados:** OpenRouter tiene modelos gratuitos con el sufijo `:free` (por ejemplo `minimax/minimax-m3:free`) con límites de 50 peticiones al día (1.000/día si cargas $10 en créditos). Suficiente para probar un agente de principio a fin sin gastar un céntimo.

---

## 1. Crear la API key

1. Crea una cuenta en [openrouter.ai](https://openrouter.ai) (puedes entrar con GitHub o Google).
2. Ve a la sección de claves: **[openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)**
3. Pulsa **Create Key**, dale un nombre descriptivo (por ejemplo `mi-portatil-cli`) y establece un límite de gasto si quieres acotar daños.
4. Copia la clave **inmediatamente**. Empieza por `sk-or-v1-...` y **no se volverá a mostrar**.

¿Por qué empezar con límite de gasto? Porque un agente de IA en bucle es capaz de quemar créditos con una eficiencia impresionante si le pones un modelo caro y una tarea ambigua. Además, puedes crear una clave distinta por máquina o proyecto y revocarlas individualmente si una se filtra.

---

## 2. Probarla en la terminal

Antes de tocar ningún archivo de configuración, comprobemos que la clave funciona exportándola solo para la sesión actual:

```bash
export OPENROUTER_API_KEY="sk-or-v1-tu-clave-aqui"
```

Y hacemos una primera petición con `curl`:

```bash
curl -s https://openrouter.ai/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d '{
  "model": "minimax/minimax-m3:free",
  "messages": [
    {"role": "user", "content": "¿Cuántas r's hay en la palabra strawberry?"}
  ]
}' | jq
```

Si te responde con un JSON y contenido en `choices[0].message.content`, enhorabuena: ya tienes una puerta única a 300+ modelos. 🎉

> 📝 **Formato de modelos:** el slug siempre es `proveedor/modelo`, como `openai/gpt-4o`, `anthropic/claude-sonnet-4` o `minimax/minimax-m3:free`. Explora el catálogo completo en [openrouter.ai/models](https://openrouter.ai/models). Añade `"stream": true` al cuerpo de la petición si quieres respuestas en streaming (con `curl -N`).

---

## 3. Hacerla persistente: `.bashrc`

Lo del `export` de arriba solo vive mientras la terminal esté abierta. Para que la clave exista en **todas** tus sesiones futuras, hay que añadirla al archivo que Bash lee cada vez que abre un shell interactivo: `~/.bashrc`.

### Método rápido: appéndalo con un solo comando

Abra el archivo oculto en su HOME con algún administrador de archivos mostrandolo con Ctrl + H con ejemplo Gedit:

~/.bashrc

y coloque allí al final:


```
# OPENROUTER.AI API KEY
export OPENROUTER_API_KEY="sk-or-v1-tu-clave-aqui"
```

Desrecarga la configuración **en la sesión actual** (en las nuevas se cargará sola):

```bash
source ~/.bashrc
```

### Verifica que quedó bien

Poner en la terminal:

```bash
echo $OPENROUTER_API_KEY
```

Debe imprimir tu clave: sk-or-v1-...

Comprobación extra: que el shell la está exportando de verdad:

```bash
env | grep OPENROUTER
```

A partir de ahora, cualquier programa que lance desde la terminal heredará `OPENROUTER_API_KEY` como variable de entorno. Y esa es exactamente la convención que usan la mayoría de agentes CLI.

---

## 4. Conectar tus agentes de IA CLI

Aquí viene la parte bonita: **una sola clave vale para todas las herramientas**. Cada agente la lee a su manera.

### Aider (la más fácil: la lee sola)

Aider consume `OPENROUTER_API_KEY` directamente del entorno, así que con el `.bashrc` ya está lista. Solo indica el modelo con el prefijo `openrouter/`:

```bash
aider --model openrouter/anthropic/claude-sonnet-4
aider --model openrouter/minimax/minimax-m3:free
```

Listo. Cero configuración extra.

### Agentes compatibles con OpenAI genéricos (OpenCode, scripts propios, etc.)

Muchas herramientas hablan "OpenAI estándar". Para redirigirlas a OpenRouter solo hay que cambiar dos variables: la URL base y la clave.

```bash
# Añade esto también a ~/.bashrc si tu herramienta usa estas variables
export OPENAI_API_KEY="$OPENROUTER_API_KEY"
export OPENAI_BASE_URL="https://openrouter.ai/api/v1"
```

> ⚠️ Ojo: si alguna vez tuviste una clave real de OpenAI, no la sobrescribas globalmente. Es mejor poner estas variables **solo en el entorno del agente**, por ejemplo con `env OPENAI_BASE_URL=... OPENAI_API_KEY=... aider ...` o dentro del archivo `.env` del proyecto.

### Claude Code

Claude Code habla el protocolo de Anthropic, pero OpenRouter expone un endpoint compatible. Añade a `~/.bashrc`:

```bash
export ANTHROPIC_BASE_URL="https://openrouter.ai/api/v1"
export ANTHROPIC_AUTH_TOKEN="$OPENROUTER_API_KEY"
```

Inicia sesión o reinicia Claude Code y en `/model` verás los modelos disponibles a través del router.

### Codex CLI (OpenAI)

Codex CLI se configura en `~/.codex/config.toml` definiendo OpenRouter como proveedor con `model_provider = "openrouter"` apuntando a `https://openrouter.ai/api/v1`. La clave la toma de `OPENROUTER_API_KEY`, que ya exportamos. Consulta la [guía oficial de integración](https://openrouter.ai/docs/cookbook/coding-agents) para el bloque TOML exacto de tu versión.

### El patrón universal

Cualquier herramienta que acepte `base URL` + `API key` estilo OpenAI funciona igual:

| Configuración | Valor |
|---|---|
| Base URL | `https://openrouter.ai/api/v1` |
| API Key | tu clave `sk-or-v1-...` |
| Modelo | `proveedor/modelo` (ej. `openai/gpt-4o`) |

---

## 5. Seguridad: la clave vive en tu `.bashrc`, trátala bien

Un par de hábitos que te ahorrarán disgustos:

**Protege el archivo:**

```bash
chmod 600 ~/.bashrc
```

**No lo subas nunca a un repositorio.** Si usas dotfiles en Git, ten un `.bashrc` público que cargue un archivo local excluido del repo:

```bash
# Al final de ~/.bashrc
[ -f "$HOME/.secrets.sh" ] && source "$HOME/.secrets.sh"
```

...y mete tus `export` de claves en `~/.secrets.sh` (añádelo a `.gitignore`).

**Crea claves separadas por máquina o proyecto** y revócalas al vuelo desde el dashboard si sospechas algo. Es gratis y tardas 30 segundos.

**Ojo con los shells no interactivos:** `.bashrc` solo lo leen shells interactivos. Scripts lanzados por `cron`, systemd o `nohup` desde entornos limpios no verán la variable; para esos casos pasa la clave explícitamente o usa un archivo `.env`.

---

## Conclusiones

Con esto ya tienes:

- ✅ Una API key única para 300+ modelos de IA
- ✅ Configuración persistente en `~/.bashrc` disponible en todas tus terminales
- ✅ Agentes CLI (Aider, Claude Code, Codex, OpenCode...) usándola sin configuración extra por herramienta
- ✅ El nivel gratuito con modelos `:free` para experimentar sin coste

El gran cambio de mentalidad es dejar de pensar en "mi clave de Anthropic" o "mi clave de OpenAI" y empezar a pensar en "mi router". Cuando un proveedor se cae o un modelo sale demasiado caro, cambiar es editar una sola cadena en tu configuración. Y en un mundo donde los agentes encadenan decenas de llamadas por tarea, ese failover silencioso es la diferencia entre un agente que termina el trabajo y uno que se queda a medias.

**Enlaces útiles:**

- Crear clave: [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
- Catálogo de modelos: [openrouter.ai/models](https://openrouter.ai/models)
- Documentación: [openrouter.ai/docs](https://openrouter.ai/docs)
- Guía oficial de agentes CLI: [openrouter.ai/blog/tutorials/any-coding-agent](https://openrouter.ai/blog/tutorials/any-coding-agent)
