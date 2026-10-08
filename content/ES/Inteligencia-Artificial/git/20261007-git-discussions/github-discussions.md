# GitHub Discussions: la función que llevaba años sin ver (y cómo activarla en tu repositorio)

Llevo bastante tiempo usando GitHub. Sé abrir un *issue*, sé revisar un *pull request*, sé mirar las *Actions* cuando algo se pone en rojo. Pero hace unos días descubrí que existe una pestaña llamada **Discussions** que nunca había usado, y que llevaba todo este tiempo ahí, a un clic de distancia.

No era una función nueva. Era una función que **yo no conocía**.

Este artículo es lo que me habría gustado leer entonces: qué es GitHub Discussions, para qué sirve de verdad, en qué se diferencia de Issues, cómo se activa paso a paso, y un par de detalles que me confundieron por el camino. Si tú tampoco sabías que existía, bienvenido al club.

---

## Qué es GitHub Discussions

GitHub Discussions es un **foro de conversación dentro de tu propio repositorio**.

Suena simple, y lo es. La clave está en la palabra *dentro*: las conversaciones viven en el mismo lugar que el código, las mismas personas que abren issues pueden participar, y todo queda buscable y enlazable desde el README. No es un Discord, no es un subreddit, no es un grupo de Telegram: es una capa de conversación pegada al proyecto.

GitHub lo describe como un espacio para conversaciones que son **abiertas y comunitarias**, en contraste con los issues, que están pensados para trabajo concreto y accionable.

Piensa en la diferencia así:

- Un **issue** dice: *"esto está roto, aquí está el comando que lo reproduce"*.
- Una **discusión** dice: *"¿a alguien más le pasa?", "¿tiene sentido esta idea?", "mira lo que construí", "¿cómo harías esto?"*.

Esa distinción parece académica hasta que tu lista de issues se llena de preguntas que no son bugs y de ideas que todavía no son tareas.

---

## Discussions no es Issues (ni Wiki, ni Projects)

Esta es la tabla que me habría ahorrado tiempo:

| Herramienta | Para qué sirve | El error típico |
|---|---|---|
| **Issues** | Trabajo accionable: bugs, tareas, propuestas concretas con criterio de cierre | Usarlos como foro de preguntas y convertirlos en un cementerio |
| **Discussions** | Conversación abierta: preguntas, ideas, mostrar trabajo, anuncios, encuestas | Usarlas como lista de tareas y perder de vista qué hay que hacer |
| **Wiki** | Documentación estable, escrita para durar | Escribir documentación que envejece sin dueño |
| **Projects** | Planificación: tableros, columnas, estados | Duplicar ahí lo que ya está en los issues |

Regla mental que me sirve: **si tiene un "hecho / no hecho" claro, va a Issues. Si es una conversación que puede no terminar nunca, va a Discussions.**

---

## Para qué sirve de verdad

Más allá de la teoría, estos son los usos que le veo:

1. **Preguntas de la comunidad.** "¿Cómo descargo datos históricos?", "¿por qué este test se salta?", "¿qué significa este aviso?". Preguntas que no son bugs y que, si se responden bien, se convierten en documentación para el siguiente.
2. **Ideas y propuestas.** Un espacio donde una idea puede madurar *antes* de convertirse en una tarea. Si madura, se convierte en issue. Si no, queda registrada la conversación.
3. **Mostrar trabajo.** Que alguien enseñe lo que construyó con tu proyecto. Esto genera más motivación que cualquier badge.
4. **Resultados negativos.** En proyectos de investigación es oro: "probé esta hipótesis y no funcionó". Eso no es un issue, es conocimiento.
5. **Anuncios.** Publicar versiones o cambios importantes sin que se pierdan en el feed.
6. **Encuestas.** Preguntar a la comunidad qué priorizar, con votos de verdad.

Y un efecto secundario nada despreciable: las discusiones públicas **se indexan en buscadores**. Si alguien busca tu mismo problema en Google, puede llegar a la respuesta que ya diste. Eso es soporte que trabaja mientras duermes.

---

## Cómo activarlo paso a paso

Tardas menos de un minuto:

1. Entra a tu repositorio en GitHub.
2. Ve a **Settings** (la última pestaña de la barra superior del repo).
3. En el menú lateral, entra en **General**.
4. Baja hasta la sección **Features**.
5. Marca la casilla **Discussions** (verás un botón tipo *Set up discussions*).
6. Confirma. Aparecerá una pestaña **Discussions** junto a *Code*, *Issues*, *Pull requests*, *Actions*…

Un par de notas:

- En **repositorios públicos es gratis**. En repositorios privados, GitHub lo ofrece en planes de pago (Team / Enterprise).
- Si tienes las **Issues desactivadas**, actívalas primero: GitHub se apoya en ellas para habilitar Discussions.
- GitHub crea automáticamente unas **categorías por defecto**: *Announcements*, *General*, *Ideas*, *Polls*, *Q&A* y *Show and tell*. Funcionan bien tal cual; luego decides si las renombras.

Al activarlo, GitHub te propone publicar un **post de bienvenida** con una plantilla genérica. Aquí viene mi primer consejo: **no la publiques tal cual**. Es lo primero que verá quien entre, y la plantilla por defecto no dice nada de tu proyecto. Cámbiala.

---

## El post de bienvenida

Esta es la plantilla que terminé usando yo, adaptada de la de GitHub. Cópiala, retócala y publícala en la categoría **Announcements**:

```markdown
## 👋 Bienvenido

<Una frase que diga qué es tu proyecto y qué NO es.>

Este es el lugar para hablar del proyecto, del método y de la investigación.

### Para qué sirve este espacio

- ❓ **Preguntas** — "¿cómo hago X?", "¿por qué pasa Y?"
- 💡 **Ideas** — propón una mejora, una función, una explicación mejor.
- 🔬 **Investigación** — muestra un experimento, incluso los que fallaron.
- 🤖 **Agentes** — comparte qué construyó tu agente de IA y qué se equivocó.
- 📣 **Anuncios** — versiones, hitos, cambios importantes.

### Qué va en Issues en lugar de aquí

Un bug con un **comando reproducible y su salida real**. Issues es para lo
que está roto; Discussions es para lo que todavía estamos pensando.

### Antes de empezar

| Lee | Por qué |
|---|---|
| CONTRIBUTING.md | cómo contribuir |
| README.md | qué es y qué no es el proyecto |

### Preséntate

Comenta abajo: a qué te dedicas, qué quieres aprender y si traes un agente
de IA. No hace falta tener credenciales: los principiantes son
explícitamente bienvenidos.
```

Después, **ancla el post** para que no se pierda: dentro de la discusión, menú `⋯` → *Pin discussion*.

---

## Las categorías y sus tres formatos

Aquí está la parte que más me costó entender, así que la explico despacio.

Cada categoría tiene un **formato de discusión**, y eso cambia por completo cómo se comporta. Para verlo: en la barra lateral de Discussions, junto a la palabra **Categories**, hay un **lápiz ✏️**. Al pulsarlo entras a *Manage discussion categories*, donde ves la lista. Y ojo con esto: **el lápiz de arriba gestiona la lista; para editar una categoría concreta hay que pulsar el lápiz de su propia fila.**

Dentro del editor de cada categoría está el campo **Discussion format**, con tres opciones:

| Formato | Qué hace | Cuándo usarlo |
|---|---|---|
| **Open-ended discussion** | Conversación normal. Cualquiera abre hilos. No hay "respuesta correcta". | Ideas, debates, mostrar trabajo, encuestas |
| **Question or answer** | Permite **marcar una respuesta como correcta**. El hilo aparece resuelto. | Preguntas y soporte |
| **Announcement** | Solo los mantenedores pueden **crear** discusiones; el resto comenta. | Anuncios y avisos |

![Gestión de categorías de Discussions, con la categoría Q&A mostrando "Answers enabled"](crypto-trading-lab-discussions-categories.png)

*En la pantalla de categorías se ve de un vistazo: Q&A muestra "Answers enabled" en verde, y Announcements lleva un candado porque solo los mantenedores publican.*

Mi reparto recomendado:

- **Announcements** → formato *Announcement*.
- **Q&A** → *Question or answer* (es la única donde quieres marcar respuestas).
- **Ideas**, **Polls**, **General**, **Show and tell** → *Open-ended discussion*.

---

## El detalle que me confundió: "marcar como respuesta"

Cuando activé Discussions, alguien me dijo: *"desactiva que las respuestas se marquen como respuesta en el post de bienvenida"*. Busqué esa opción por todos lados y no la encontraba. Al final entendí dos cosas:

1. **No es una opción del post.** No existe un interruptor por publicación. Es una propiedad de la **categoría**: el formato *Question or answer* es lo que habilita "marcar respuesta".
2. **Si tu post está en Announcements, ya está resuelto.** Ese formato no permite marcar respuestas. No había nada que desactivar.

Es decir, la opción que buscaba no existía porque el problema que pretendía resolver ya estaba resuelto por diseño. Lección: en GitHub, muchas "opciones de la publicación" son en realidad **propiedades del contenedor**, no del contenido.

Otro detalle que despista: en la lista de discusiones aparece un recuadro llamado **"Most helpful"** que dice *"marca el comentario de alguien como respuesta si te ayudó"*. Es un consejo genérico de GitHub; sale ahí aunque tu categoría no permita marcar respuestas. No significa que tengas algo mal configurado.

![Listado de Discussions con el post de bienvenida en la categoría Announcements](crypto-trading-lab.png)

*Así se ve un Discussions recién activado: una categoría Announcements, un post de bienvenida anclable y cero ruido. Estado ideal para empezar.*

---

## Buenas prácticas

Lo que haría (y lo que hice) desde el primer día:

1. **Escribe un post de bienvenida de verdad**, no dejes la plantilla por defecto. Explica qué va en cada sitio.
2. **Ancla ese post** para que siempre esté arriba.
3. **Enlaza Discussions desde tu README y desde las plantillas de issue.** Menos fricción, menos preguntas en el sitio equivocado. En GitHub puedes configurar enlaces de contacto al abrir un issue: perfecto para decir "¿es una pregunta? ve a Discussions".
4. **Ajusta las descripciones de las categorías** a tu proyecto. Cuestan dos minutos y orientan muchísimo.
5. **Convierte cuando toque.** Si una discusión deja de ser una conversación y se convierte en un bug concreto, conviértela en issue. Así el trabajo accionable vuelve a su sitio.
6. **No dejes que Discussions sea un vertedero.** Una pregunta sin respuesta durante semanas hace más daño que no tener la función.

---

## Cuándo NO usar Discussions

Para ser honesto, no todo el mundo lo necesita:

- Si tu proyecto es **unipersonal y privado**, probablemente no lo uses nunca.
- Si ya tienes **una comunidad activa en otro sitio** (Discord, foro, Telegram), añadir otro canal puede fragmentarla en lugar de unirla.
- Si nadie va a moderarlo, se llena de ruido y da peor imagen que no tenerlo.

Discussions brilla cuando hay **varias personas haciendo preguntas parecidas** y quieres que las respuestas queden públicas y buscables.

---

## Cómo lo apliqué en mi proyecto

Estoy desarrollando un proyecto de investigación sobre criptomonedas, con una particularidad: la mayor parte del desarrollo lo hago **junto a agentes de IA**, y quiero que otras personas puedan hacer lo mismo. El repositorio es lo más parecido a una especificación con código que va alcanzándola.

En ese contexto, Discussions encaja perfecto para tres cosas concretas:

- **Preguntas** de quien clona el repositorio y no sabe por dónde empezar.
- **Ideas** que todavía no son capítulos de la hoja de ruta.
- **Resultados de investigación**, incluidos los negativos. En un proyecto que intenta medir si existe una ventaja estadística real, un "probé esto y no funcionó" vale tanto como un "funcionó".

Y una cosa que no esperaba: tener Discussions me obligó a **escribir mejor las reglas**. Cuando tienes que explicar dónde va cada cosa, descubres que tú tampoco lo tenías tan claro.

---

## Conclusión

GitHub Discussions llevaba años delante de mí y no lo vi. Es un foro dentro de tu repositorio, gratis en proyectos públicos, que separa la **conversación** del **trabajo pendiente** y deja las respuestas donde Google puede encontrarlas.

Activarlo cuesta un minuto: *Settings → General → Features → Discussions*. Lo que cuesta de verdad es escribir un buen post de bienvenida, ordenar las categorías y moderar con constancia. Pero eso ya no es una función de GitHub: eso es construir comunidad.

Si tienes un proyecto abierto y tu lista de issues está llena de preguntas, prueba. Yo tardé años en descubrirlo; tú puedes tardar un minuto.

---

---

## Ficha para publicar

Material de apoyo para llevar esta entrada a tu blog. Bórralo antes de publicar.

**Título (elige uno):**

- GitHub Discussions: la función que llevaba años sin ver (y cómo activarla)
- Qué es GitHub Discussions y por qué deberías activarlo en tu repositorio
- Activar Discussions en GitHub: guía para quien no sabía que existía

**Meta descripción (≈155 caracteres):**

> GitHub Discussions es un foro dentro de tu repositorio. Qué es, en qué se diferencia de Issues, cómo activarlo paso a paso y qué detalles confunden al empezar.

**Etiquetas:** `github`, `open source`, `comunidad`, `desarrollo`, `herramientas`

**Imágenes (ya están en esta carpeta, renómbralas si quieres):**

| Archivo | Sugerencia de pie de foto |
|---|---|
| `crypto-trading-lab.png` | Discussions recién activado, con el post de bienvenida en Announcements |
| `crypto-trading-lab-discussions-categories.png` | Gestión de categorías: Q&A con "Answers enabled" y Announcements con candado |

Si el blog no acepta rutas relativas, súbelas y reemplaza los enlaces del Markdown.

**Nota de honestidad:** el artículo cuenta una experiencia real —descubrir la función, activarla, confundirme con "marcar como respuesta"— y por eso incluye esas correcciones en lugar de esconderlas. Es más útil para quien lee, y más honesto.
