# Cómo agregar badges (insignias) a tu perfil de GitHub

Si alguna vez has visto perfiles de GitHub con esos "sellitos" de colores que muestran los lenguajes, tecnologías y redes sociales que usa una persona, seguramente te has preguntado cómo se hacen. En este tutorial te muestro exactamente cómo los agregué a mi propio perfil ([github.com/wachin](https://github.com/wachin)), usando una herramienta gratuita que no requiere programar nada.

## ¿Qué son los badges de GitHub?

Los badges son esas pequeñas imágenes rectangulares que se ven así:

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

Sirven para mostrar de un vistazo qué tecnologías dominas, en qué redes sociales estás, o cómo pueden apoyar tu trabajo (donaciones, patrocinios, etc.). Se ven muy profesionales y le dan personalidad a tu README de perfil.

## El sitio que usé: markdown-badges

La herramienta que usé se llama **markdown-badges**, y la pueden encontrar en:

👉 [ileriayo.github.io/markdown-badges](https://ileriayo.github.io/markdown-badges/)

Es la colección más grande y curada de badges en formato Markdown, organizada por categorías: lenguajes de programación, frameworks, bases de datos, sistemas operativos, redes sociales, plataformas de blogs, servicios de donación, y muchas más.

## Paso a paso para agregar tus badges

### 1. Crea (o edita) tu README de perfil

Si todavía no lo tienes, en GitHub debes crear un repositorio con el mismo nombre que tu usuario (por ejemplo, si tu usuario es `wachin`, el repositorio se llama `wachin`). Dentro de ese repositorio, el archivo `README.md` es el que se muestra en la portada de tu perfil.

### 2. Busca el badge que necesitas

Entra a [ileriayo.github.io/markdown-badges](https://ileriayo.github.io/markdown-badges/) y usa `Ctrl + F` (o `Cmd + F` en Mac) para buscar el nombre de la tecnología, red social o plataforma que quieres mostrar. El sitio está organizado en categorías como:

- Lenguajes de programación
- Frameworks y librerías
- Bases de datos
- Sistemas operativos
- Redes sociales
- Plataformas de blogs
- Servicios de donación/financiamiento
- Herramientas de diseño
- Y muchas más

### 3. Copia el código Markdown

Cada badge tiene tres columnas: el nombre, una vista previa de cómo se ve, y el código Markdown listo para copiar. Solo debes copiar ese código y pegarlo en tu `README.md`.

Por ejemplo, para mostrar que usas Python, el código sería algo así:

```markdown
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
```

### 4. Convierte tus badges en enlaces (opcional pero recomendado)

Un truco que uso en mi propio perfil es envolver el badge dentro de un enlace, para que al hacer clic te lleve directo a mi perfil de esa red social. La sintaxis es:

```markdown
[![Texto alternativo](URL_DEL_BADGE)](URL_A_DONDE_QUIERES_LLEVAR)
```

Por ejemplo, así uso el badge de Telegram en mi propio README:

```markdown
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?logo=telegram&logoColor=white)](https://t.me/pfslee)
```

Esto hace que el badge sea clicable y lleve directamente a mi chat de Telegram.

### 5. Cambia el estilo si quieres

El sitio usa por defecto el estilo `for-the-badge` (los badges grandes y rectangulares), pero shields.io —el servicio que genera las imágenes detrás de estos badges— ofrece 5 estilos distintos: `plastic`, `flat-square`, `flat`, `social` y `for-the-badge`. Si prefieres un estilo más discreto, solo reemplaza la palabra `for-the-badge` en el enlace del badge por el estilo que prefieras.

## Un ejemplo real: cómo organicé mi propio perfil

En mi README uso los badges de dos formas distintas:

**1. Como fila de redes sociales en la parte superior**, cada uno enlazando a mi perfil correspondiente (Twitter, Telegram, Facebook, Instagram, LinkedIn, YouTube).

**2. Como fila de tecnologías**, para mostrar de un vistazo con qué trabajo: Python, PyQt6, Git, Linux, Debian, Kotlin, Android, entre otros.

Ambos grupos usan el mismo formato de badge, solo cambia si están envueltos en un enlace o no.

## Consejo final

No necesitas agregar todos los badges que encuentres: elige solo los que realmente representan tu trabajo o tus redes activas. Un perfil con 5 o 6 badges bien elegidos se ve más limpio y profesional que uno saturado de insignias que no aportan información real sobre ti.

Si tienes dudas sobre cómo armar tu propio README de perfil, déjalo en los comentarios y con gusto te ayudo.
