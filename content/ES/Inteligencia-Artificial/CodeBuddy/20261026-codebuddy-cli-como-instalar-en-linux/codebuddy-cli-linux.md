# Cómo instalar Node.js 24 en Ubuntu, Debian y derivados, y cómo dejar a CodeBuddy CLI trabajando sin interrupciones

Si trabajas con herramientas de desarrollo modernas —y especialmente con agentes de IA que corren en la terminal—, tarde o temprano necesitarás una versión reciente de Node.js. Las versiones que incluyen por defecto distribuciones como Debian o Ubuntu suelen quedarse atrás, así que la opción más fiable es tirar de **NodeSource**, que mantiene repositorios actualizados de Node.js para las principales ramas.

En esta entrada veremos cómo instalar **Node.js 24** en Ubuntu, Linux Mint, Debian, MX Linux y cualquier derivado de estos. Y, como bonus, explicaré cómo configurar **CodeBuddy CLI** para que no te esté pidiendo confirmación a cada paso, centrándome en el modo que personalmente uso: `bypass permissions`.

---

## Parte 1 — Instalar Node.js 24 con NodeSource

### ¿Por qué NodeSource y no `apt install nodejs`?

Podrías instalar Node.js directamente desde los repositorios de tu distribución con:

```bash
sudo apt install nodejs
```

Pero la versión que obtendrías dependería de la versión de tu sistema operativo y, en muchos casos, estaría desactualizada. NodeSource ofrece repositorios específicos para cada rama de Node.js (18.x, 20.x, 22.x, 24.x…), de modo que puedes tener una versión reciente y recibir actualizaciones dentro de esa misma rama sin complicaciones.

### Paso 1 — Agregar el repositorio de NodeSource para Node.js 24

Ejecuta el script de configuración oficial. La parte `setup_24.x` indica que estás configurando la rama **24.x**:

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
```

Este comando añade el repositorio de NodeSource a tu sistema y prepara APT para obtener Node.js desde ahí.

> **Nota:** Si en el futuro quieres instalar otra rama (por ejemplo, 26.x cuando salga), solo tendrás que cambiar `setup_24.x` por `setup_26.x` y repetir el proceso.

### Paso 2 — Instalar Node.js

Con el repositorio ya configurado, instala el paquete:

```bash
sudo apt-get install -y nodejs
```

### Paso 3 — Comprobar que todo ha ido bien

Verifica la versión de Node.js:

```bash
node -v
```

Deberías ver algo como `v24.x.x`. También puedes comprobar que npm (el gestor de paquetes de Node.js, que se instala junto con Node.js) está disponible:

```bash
npm --version
which node
which npm
```

Las rutas habituales son `/usr/bin/node` y `/usr/bin/npm`.

### Paso 4 — Confirmar que realmente estás usando NodeSource

Para asegurarte de que el paquete `nodejs` proviene del repositorio de NodeSource y no del de tu distribución, ejecuta:

```bash
apt policy nodejs
```

En la salida debería aparecer una referencia a `https://deb.nodesource.com/node_24.x`. También puedes comprobar directamente los archivos de configuración de APT:

```bash
grep -R "nodesource" /etc/apt/sources.list /etc/apt/sources.list.d/ 2>/dev/null
```

En sistemas modernos lo habitual es encontrar un archivo como `/etc/apt/sources.list.d/nodesource.sources` apuntando a ese repositorio.

### Paso 5 — Mantener Node.js actualizado

No necesitas volver a descargar nada manualmente. Las actualizaciones dentro de la rama 24.x llegan por el sistema habitual de APT:

```bash
sudo apt update
sudo apt upgrade
```

Si quieres comprobar específicamente si hay una nueva versión de Node.js disponible:

```bash
apt list --upgradable 2>/dev/null | grep nodejs
```

Si no aparece nada, es que no hay actualizaciones pendientes para `nodejs` en ese momento.

---

## Parte 2 — CodeBuddy CLI y sus modos de permisos

Una vez tienes Node.js al día, muchas herramientas de terminal funcionarán sin problemas. Una de ellas es **CodeBuddy CLI**, un agente de IA que puede leer archivos, editar código, ejecutar comandos y llevar a cabo tareas de desarrollo directamente desde la terminal.

Por defecto, CodeBuddy es bastante cauteloso: antes de hacer cambios o ejecutar comandos que podrían tener efectos secundarios, te pide confirmación. Eso está bien para empezar, pero cuando llevas un rato trabajando puede resultar interrumpido. Para eso existen los **modos de permisos**.

### Los modos que puedes ciclar con `Shift+Tab`

Dentro de una sesión de CodeBuddy CLI, si pulsas **`Shift+Tab`** (en Windows también funciona `Alt+M` como alias), vas rotando entre los siguientes modos:

| Modo | Qué permite sin preguntar | Cuándo tiene sentido usarlo |
| --- | --- | --- |
| **default** | Herramientas de lectura dentro de directorios de confianza | Trabajo sensible o primeras sesiones; es el modo más conservador |
| **bypass permissions on (shift+Tab to cycle)   ← for agents** | La mayoría de aprobaciones se omiten | Entornos aislados (contenedores, VMs, desarrollo offline) |
| **accept edits on (shift+Tab to cycle)  ← for agents** | Lectura y edición de archivos dentro de directorios de confianza | Cuando quieres escribir código y luego revisar con `git diff` |
| **auto mode on (shift+Tab to cycle)  ← for agents** | Las acciones que normalmente pedirían confirmación se envían a un clasificador que decide allow/deny | Quieres reducir interrupciones pero mantener cierto límite de seguridad |
| **plan mode on (shift+Tab to cycle)  ← for agents** | Delega en el modo anterior y además permite escribir archivos de plan de sesión | Antes de tocar código, para explorar y planificar |
| **delegate** | Solo herramientas de coordinación (agentes, tareas); las herramientas de implementación quedan bloqueadas | Cuando el agente principal solo reparte trabajo a subagentes |

El ciclo completo es: `default → bypassPermissions → acceptEdits → auto (si está disponible) → plan → delegate → default…`.

### Un matiz importante: los modos no lo son todo

Aunque elijas un modo permisivo, CodeBuddy evalúa cada llamada a herramienta en varias capas antes de decidir. Las reglas `deny` y `ask` que tengas configuradas **siempre tienen prioridad sobre el modo**. Por ejemplo, si tienes una regla que prohíbe `Bash(rm -rf *)`, el modo `bypassPermissions` no la saltará. Del mismo modo, en sesiones interactivas los comandos Bash considerados peligrosos pueden seguir pidiendo confirmación incluso en `bypassPermissions`.

Es decir: `bypassPermissions` no es un “sí a todo” absoluto. Es un modo que **omite la mayoría de las aprobaciones rutinarias**, pero mantiene las salvaguardas críticas.

---

## Parte 3 — Mi modo preferido: `bypass permissions on`

De todos los modos, el que personalmente uso casi siempre es **`bypassPermissions`**. La razón es sencilla: **no me está preguntando a cada rato por permisos**, así que puedo dedicarme a otra cosa mientras el agente avanza.

### Cómo activarlo

Tienes dos formas:

1. **Durante la sesión:** pulsa `Shift+Tab` hasta que veas el indicador `⏵⏵ bypass permissions on (shift+tab to cycle)` en la parte inferior de la interfaz.
2. **Al arrancar el CLI:** si quieres que sea el modo por defecto desde el principio, usa el flag `--permission-mode bypassPermissions` o su alias `-y` (o `--dangerously-skip-permissions`).

### Qué esperar (y qué no)

- **Sí omite la mayoría de las confirmaciones rutinarias**, que es justo lo que busco: el agente puede leer archivos, editarlos, ejecutar comandos normales y seguir trabajando sin pararse a pedirme permiso.
- **No es un pase libre para comandos destructivos.** Como decía antes, las reglas `deny`/`ask` y las comprobaciones de seguridad para comandos Bash peligrosos pueden seguir bloqueándolo.
- **Requiere sentido común.** La documentación oficial recomienda usar este modo **solo en entornos aislados**: contenedores, máquinas virtuales o contenedores de desarrollo sin acceso a datos sensibles ni a la red de producción. No es lo mismo dejarlo corriendo en un contenedor desechable que en tu máquina principal con acceso a todo.

Si lo que quieres es un punto intermedio —menos interrupciones pero con algún filtro de seguridad—, el modo **`auto`** puede ser una buena alternativa: envía las acciones que normalmente pedirían confirmación a un clasificador que decide si las permite o no, en lugar de omitirlas directamente. Pero si tu prioridad es “que no me pregunte y poder dedicarme a otra cosa”, `bypassPermissions` es el que mejor encaja.

---

## Conclusión

Instalar Node.js 24 con NodeSource es cuestión de tres comandos y te asegura una base actualizada para herramientas modernas. Y si usas CodeBuddy CLI para tareas de desarrollo, conocer los modos de permisos te permite adaptar el ritmo de la sesión: desde el más conservador `default` hasta el más despreocupado `bypassPermissions`, pasando por opciones intermedias como `acceptEdits` o `auto`.

En mi caso, `bypassPermissions` se ha convertido en el modo por defecto porque me permite dejar al agente trabajando sin estar pendiente de cada confirmación. Eso sí, siempre en entornos donde un error no tenga consecuencias graves.