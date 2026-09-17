# Cómo solucionar el problema de selección de texto largo en Qwen Code CLI en Linux

Si utilizas **Qwen Code CLI** desde una terminal en Linux, es posible que hayas encontrado un problema muy molesto: cuando Qwen genera una respuesta que ocupa muchas líneas, **no puedes seleccionarla completa con el ratón haciendo clic al principio y arrastrando hacia abajo**.

El problema se vuelve especialmente evidente cuando la respuesta es mucho más larga que el área visible de la terminal.

En una terminal normal, como **Konsole**, puedes comenzar a seleccionar texto, mantener presionado el botón izquierdo del ratón y llevar el cursor hasta el borde inferior. La terminal hace *autoscroll* automáticamente y permite continuar seleccionando mientras baja por el contenido.

Sin embargo, al ejecutar Qwen Code, este comportamiento puede desaparecer.

El resultado es bastante frustrante: solamente puedes seleccionar la parte visible de la respuesta. Si quieres copiar una respuesta larga completa, terminas teniendo que copiarla **en varios pedazos**, desplazarte manualmente hacia abajo y repetir el proceso.

Eso supone una pérdida de tiempo considerable.

La buena noticia es que podemos solucionar este comportamiento modificando dos opciones de Qwen Code.

---

## El problema

Supongamos que Qwen genera una respuesta como esta:

```text
Línea 1
Línea 2
Línea 3
...
Línea 100
...
Línea 200
...
Línea 300
```

La respuesta es mucho más larga que la pantalla.

Normalmente, en Konsole podríamos hacer:

1. Colocar el ratón al principio de la respuesta.
2. Mantener presionado el botón izquierdo.
3. Arrastrar hacia abajo.
4. Llegar al borde inferior de la ventana.
5. Konsole comienza a desplazarse automáticamente.
6. Continuamos arrastrando y seleccionamos todo el contenido.

Pero Qwen Code puede utilizar su propio sistema de visualización y captura de eventos del ratón.

Esto hace que **Qwen gestione la selección en lugar de dejar que la terminal la gestione directamente**.

Como consecuencia, la selección puede quedar limitada al área visible.

---

# Antes de modificar nada: comprobar que el problema es Qwen

Es muy fácil comprobarlo.

En la misma terminal donde normalmente ejecutas Qwen, ejecuta:

```bash
seq 1 500
```

Este comando simplemente imprime los números del 1 al 500.

Ahora intenta seleccionar desde una línea cercana al principio hasta el final:

* clic al principio;
* mantén presionado el botón izquierdo;
* arrastra hacia abajo;
* deja que la terminal haga *autoscroll*.

Si puedes llegar hasta el número 500 y copiar todo correctamente, entonces **la función de selección de tu terminal está funcionando perfectamente**.

El problema está relacionado con la forma en que Qwen Code está manejando el terminal.

---

# La solución

Qwen Code dispone de opciones relacionadas con el buffer de terminal y la captura de eventos del ratón.

Las dos opciones que nos interesan son:

```json
"useTerminalBuffer": false,
"mouseTracking": false
```

La primera hace que Qwen no utilice su buffer/viewport interno para mostrar el historial.

La segunda hace que Qwen deje de capturar los eventos del ratón.

De esta manera, la terminal vuelve a encargarse de la selección de texto.

En una terminal como Konsole, esto permite recuperar el comportamiento normal de selección y *autoscroll*.

---

# 1. Localizar la configuración de Qwen Code

En Linux, la configuración global de Qwen Code se encuentra normalmente en:

```text
~/.qwen/settings.json
```

Puedes comprobar que el archivo existe ejecutando:

```bash
ls -l ~/.qwen/settings.json
```

También puedes localizarlo con:

```bash
find ~/.config ~/.qwen -name settings.json -print 2>/dev/null
```

En nuestro caso, el archivo relevante era:

```text
/home/wachin/.qwen/settings.json
```

---

# 2. Hacer una copia de seguridad

Antes de modificar el archivo, es recomendable hacer una copia:

```bash
cp ~/.qwen/settings.json ~/.qwen/settings.json.backup
```

Así podemos restaurarlo fácilmente si cometemos algún error.

---

# 3. Abrir el archivo

Puedes utilizar cualquier editor de texto.

Por ejemplo:

```bash
nano ~/.qwen/settings.json
```

Busca la sección:

```json
"ui": {
```

Es posible que tengas otras opciones dentro de ella.

Por ejemplo:

```json
"ui": {
  "autoModeAcknowledged": true,
  "feedbackLastShownTimestamp": 1787593571911
},
```

No hay que eliminar esas opciones.

Simplemente añadimos las dos nuevas.

El resultado será:

```json
"ui": {
  "autoModeAcknowledged": true,
  "feedbackLastShownTimestamp": 1787593571911,
  "useTerminalBuffer": false,
  "mouseTracking": false
},
```

## ⚠️ Importante: cuidado con las claves API

Antes de compartir tu archivo `~/.qwen/settings.json` para pedir ayuda, **revísalo cuidadosamente**.

Qwen Code puede almacenar claves API directamente dentro de este archivo, por ejemplo dentro de la sección:

```json
"env": {
  "QWEN_CUSTOM_API_KEY_...": "TU_CLAVE_API"
}
```

Estas claves pueden proporcionar acceso a servicios de inteligencia artificial y, dependiendo del proveedor, podrían generar **consumo o cargos en la cuenta asociada**.

### Nunca publiques tus claves API

No debes copiar y pegar públicamente el contenido completo de:

```text
~/.qwen/settings.json
```

en:

* GitHub
* GitLab
* foros
* Reddit
* blogs
* capturas de pantalla
* vídeos
* chats públicos
* informes de errores

Tampoco debes incluirlas cuando pidas ayuda para solucionar un problema de Qwen Code.

Si necesitas mostrar tu configuración, reemplaza primero las claves por algo como:

```json
"env": {
  "QWEN_CUSTOM_API_KEY_EXAMPLE": "REDACTED"
}
```

o:

```text
"QWEN_CUSTOM_API_KEY_...": "********"
```

### ¿Qué hacer si ya publicaste una clave?

Si accidentalmente publicaste una API key, **no basta con borrarla del archivo o eliminar el mensaje**.

Debes entrar en el panel del proveedor correspondiente y:

1. **Revocar o eliminar la clave expuesta.**
2. Crear una nueva clave si todavía necesitas utilizar ese servicio.
3. Actualizar la configuración de Qwen Code con la nueva clave.
4. Revisar el consumo o actividad reciente de la cuenta por si la clave fue utilizada por otra persona.

### También presta atención a otros archivos

Las claves no necesariamente tienen que estar solamente en `settings.json`. Dependiendo de cómo hayas configurado Qwen Code, pueden existir variables de entorno, archivos `.env` u otros archivos de configuración que contengan credenciales.

Por eso, como regla general:

> **Una API key debe tratarse como una contraseña: nunca la publiques ni la compartas.**

Para este tutorial solamente necesitamos modificar la sección `"ui"` de `settings.json`. **No es necesario compartir las secciones `env`, proveedores, autenticación o cualquier otra que contenga información privada.**


### ¡Atención con la coma!

Este punto es importante.

La siguiente línea:

```json
"feedbackLastShownTimestamp": 1787593571911,
```

necesita una coma porque después vienen otras propiedades.

Esto sería **incorrecto**:

```json
"feedbackLastShownTimestamp": 1787593571911
"useTerminalBuffer": false,
```

porque falta la coma.

Debe ser:

```json
"feedbackLastShownTimestamp": 1787593571911,
"useTerminalBuffer": false,
```

---

# 4. No utilizar comentarios `#` dentro del JSON

Otra cosa importante es que `settings.json` utiliza formato JSON.

Por lo tanto, no debemos poner cosas como:

```json
# resto del código
```

ni:

```json
// resto del código
```

dentro del archivo.

Los comentarios no forman parte del JSON estándar.

---

# 5. Comprobar el JSON antes de iniciar Qwen

Esta es una buena práctica y puede ahorrarnos problemas.

Ejecuta:

```bash
python3 -m json.tool ~/.qwen/settings.json >/dev/null && echo "JSON OK"
```

Si todo está correcto, aparecerá:

```text
JSON OK
```

Si existe algún error de sintaxis, Python lo indicará.

Esto es especialmente útil porque un pequeño error, como olvidar una coma, puede hacer que Qwen rechace el archivo.

---

# 6. Reiniciar Qwen Code

Cierra completamente Qwen Code y vuelve a iniciarlo.

Por ejemplo:

```bash
qwen
```

Las opciones nuevas se cargarán al iniciar Qwen.

---

# 7. Probar la selección

Ahora genera o espera una respuesta suficientemente larga para que sobrepase varias pantallas.

Después:

1. Coloca el ratón al principio de la respuesta.
2. Mantén presionado el botón izquierdo.
3. Arrastra hacia abajo.
4. Cuando llegues al borde inferior, continúa arrastrando.
5. La terminal debería desplazarse automáticamente.
6. Continúa hasta llegar al final.
7. Suelta el botón.
8. Copia con `Ctrl+C` o mediante el menú contextual de la terminal.
9. Pega el contenido en un editor de texto.

En nuestro caso, después de aplicar estas dos opciones pudimos seleccionar **una respuesta larga completa de Qwen**, desplazándonos automáticamente hasta abajo, y posteriormente pegarla completa en un editor de texto.

---

# ¿Qué hacen exactamente estas dos opciones?

## `useTerminalBuffer`

```json
"useTerminalBuffer": false
```

Qwen Code puede utilizar un buffer/viewport propio para manejar la visualización de su historial.

Al establecer:

```json
"useTerminalBuffer": false
```

le indicamos que no utilice ese comportamiento y permitimos que la terminal maneje su propio *scrollback*.

Esto es importante porque queremos que sea **Konsole** quien controle la selección y el desplazamiento del texto.

---

## `mouseTracking`

```json
"mouseTracking": false
```

Esta opción evita que Qwen capture los eventos del ratón.

En lugar de que Qwen gestione el arrastre del ratón, la terminal puede recibir directamente esos eventos.

Por eso podemos volver a utilizar las funciones normales de selección de Konsole.

---

# ¿Por qué `Shift + arrastrar` no siempre soluciona el problema?

La documentación de Qwen Code contempla el uso de `Shift` para acceder a la selección nativa del terminal.

Sin embargo, en determinadas combinaciones de versión de Qwen Code, terminal y configuración, ese método puede no proporcionar el comportamiento esperado.

En nuestra prueba concreta con Konsole:

```text
Shift + arrastrar
```

no solucionó el problema.

En cambio:

```json
"useTerminalBuffer": false,
"mouseTracking": false
```

sí lo solucionó completamente.

Por eso esta configuración resulta más práctica para quienes prefieren que **la terminal sea la responsable de la selección de texto**.

---

# ¿Qué se pierde al desactivar estas opciones?

Hay una pequeña contrapartida.

Al desactivar la captura del ratón, algunas funciones específicas de Qwen relacionadas con la interacción mediante el ratón pueden dejar de funcionar como antes.

Por ejemplo, determinadas funciones de navegación o interacción con el contenido de Qwen pueden depender de que Qwen reciba los eventos del ratón.

Pero si tu prioridad es poder **seleccionar y copiar respuestas largas fácilmente**, especialmente cuando trabajas con código, documentación o respuestas extensas de un agente de IA, recuperar la selección nativa de la terminal puede ser mucho más útil.

---

# Restaurar la configuración original

Si quieres volver atrás, puedes restaurar la copia de seguridad que hiciste:

```bash
cp ~/.qwen/settings.json.backup ~/.qwen/settings.json
```

Después reinicia Qwen Code.

---

# Una solución sencilla para un problema muy molesto

Este problema puede parecer pequeño, pero cuando trabajamos habitualmente con agentes de IA desde la terminal, puede convertirse en una molestia enorme.

Una respuesta de Qwen puede contener:

* cientos de líneas de código;
* logs de compilación;
* resultados de pruebas;
* instrucciones;
* documentación;
* diffs;
* análisis largos;
* comandos de terminal.

Tener que seleccionar y copiar todo **por pequeños fragmentos**, avanzar manualmente por la terminal y repetir el proceso es innecesariamente lento.

Con:

```json
"useTerminalBuffer": false,
"mouseTracking": false
```

podemos devolverle a la terminal el control de la selección.

En nuestro caso, esto permitió volver al comportamiento que esperábamos de una terminal como Konsole:

**seleccionar → arrastrar hasta abajo → autoscroll → copiar todo.**

Y lo mejor es que no necesitamos cambiar ninguna configuración de Konsole ni instalar software adicional.

---

## Configuración final

La parte relevante de `~/.qwen/settings.json` debe quedar así:

```json
"ui": {
  "autoModeAcknowledged": true,
  "feedbackLastShownTimestamp": 1787593571911,
  "useTerminalBuffer": false,
  "mouseTracking": false
},
```

Las otras configuraciones de Qwen Code —modelos, proveedores, API, permisos, MCP, etc.— pueden permanecer como estaban.

**Importante:** no copies las opciones personales que puedan aparecer en un ejemplo de `settings.json`; solamente añade las dos opciones relacionadas con el terminal a tu propia configuración.

---

## Resultado

Después de aplicar el cambio, Qwen Code puede seguir funcionando normalmente como agente de IA, pero la selección de texto vuelve a estar bajo el control de la terminal.

Así podemos copiar una respuesta completa aunque ocupe muchas pantallas, sin tener que convertir una tarea sencilla de copiar y pegar en un proceso manual de varios minutos.
