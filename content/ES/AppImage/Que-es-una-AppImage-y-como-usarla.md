# Qué es una AppImage y cómo usarla

**En una frase:** una AppImage es un programa de Linux metido en **un solo archivo**. No se instala: se ejecuta.

Y para ejecutarla **no hace falta la terminal**: basta con marcarla como ejecutable desde el gestor de archivos y
hacer doble clic.

---

## Qué es exactamente

Un archivo `.AppImage` es un único fichero que contiene **el programa, sus dependencias y un pequeño entorno de
ejecución**. Cuando lo ejecutas, se monta temporalmente a sí mismo y arranca.

| Característica         | Detalle                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| **No se instala**      | No copia nada en `/usr`, no toca el sistema, no deja rastro                    |
| **No necesita root**   | Ni `sudo`, ni contraseña                                                       |
| **Portable**           | El mismo archivo funciona en otra distribución o en un pendrive                |
| **Un solo archivo**    | Fácil de copiar, mover y borrar                                                |
| **Pesa más**           | Lleva dentro sus dependencias, así que suele ocupar más que un paquete normal  |
| **No se integra solo** | Por diseño **no** crea entrada en el menú, ni icono, ni asociación de archivos |

Ese último punto sorprende al principio, pero es intencionado: la gracia es que sea portable. Si quieres entrada en
el menú, se la añades tú (al final lo explico).

### ¿Qué hay dentro?

Se puede mirar. Cualquier AppImage acepta `--appimage-extract` y descomprime su contenido en una carpeta
`squashfs-root/`:

```bash
./marktext-linux-*.AppImage --appimage-extract
```

Ahí verás el programa, las librerías que lleva y —muy útil— **los iconos**, que puedes copiar si quieres crear una
entrada en el menú.

---

## Cómo usarla **sin terminal** (la forma fácil)

Solo hay que hacer una cosa, una única vez: **darle permiso de ejecución**. Esto es lo mismo que hace `chmod +x`,
pero con el ratón.

### En Thunar (XFCE)

1. Abre el gestor de archivos y ve a la carpeta donde descargaste el AppImage (por ejemplo `~/Descargas`).
2. **Clic derecho** sobre el archivo `.AppImage`.
3. Elige **Propiedades**.
4. Ve a la pestaña **Permisos**.
5. Marca la casilla **«Permitir que este archivo se ejecute como un programa»**
   (_Allow this file to run as a program_). Según la versión, puede aparecer como **«Ejecutable»**.
6. **Cierra la ventana.**
7. Ahora **doble clic** sobre el archivo: se abre.

> Si al hacer doble clic te pregunta qué hacer, elige **Ejecutar** (_Execute_). Si te ofrece recordar la decisión,
> márcala para que no vuelva a preguntar.

### En otros gestores de archivos

El camino es el mismo, cambia el nombre exacto de la casilla:

| Escritorio | Gestor     | Ruta                                                                                 |
| ---------- | ---------- | ------------------------------------------------------------------------------------ |
| XFCE       | Thunar     | Propiedades → **Permisos** → «Permitir que este archivo se ejecute como un programa» |
| GNOME      | Nautilus   | Propiedades → **Permisos** → «Ejecutable como programa»                              |
| KDE        | Dolphin    | Propiedades → **Permisos** → casilla **«Es ejecutable»**                             |
| Cinnamon   | Nemo       | Propiedades → **Permisos** → «Permitir ejecutar el archivo como un programa»         |
| MATE       | Caja       | Propiedades → **Permisos** → «Permitir ejecutar el archivo como un programa»         |
| LXQt       | PCManFM-Qt | Propiedades → **Permisos** → casilla **«Ejecutable»**                                |

En las versiones más nuevas de GNOME, esa opción puede aparecer como un interruptor en la parte **superior** de la
ventana de Propiedades, en vez de dentro de una pestaña.

---

## Cómo usarla **con terminal** (si te gusta la terminal)

Es exactamente lo mismo, pero escrito:

```bash
cd ~/Descargas
chmod +x marktext-linux-*.AppImage
./marktext-linux-*.AppImage
```

**Qué hace cada línea:**

| Línea                                | Qué hace                                                               |
| ------------------------------------ | ---------------------------------------------------------------------- |
| `cd ~/Descargas`                     | Entra en la carpeta donde está el archivo (`~` es tu carpeta personal) |
| `chmod +x marktext-linux-*.AppImage` | Le da permiso de ejecución. **Solo hace falta la primera vez**         |
| `./marktext-linux-*.AppImage`        | Lo ejecuta                                                             |

**Tres detalles que conviene saber:**

- El `./` del principio **es necesario**. No es un adorno: Linux no busca programas en la carpeta actual por
  seguridad, así que hay que decirle «este de aquí».
- Si en la carpeta hay **más de un AppImage** que coincida con el comodín `*`, el comando fallará por ambigüedad.
  En ese caso escribe el nombre completo.
- Cuando cierras la terminal, **el programa sigue abierto** normalmente. Si quieres que la terminal quede libre,
  añade `&` al final o lánzalo desde el menú.

---

## Opciones útiles de una AppImage

El propio formato entiende algunas opciones, y funcionan sin instalar nada:

| Opción                       | Para qué sirve                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `--appimage-extract`         | Descomprime el contenido en `squashfs-root/` (para mirar dentro o sacar el icono)                                    |
| `--appimage-extract-and-run` | Lo ejecuta **sin** montarlo con FUSE. Es el truco cuando falta FUSE                                                  |
| `--appimage-mount`           | Lo monta y te dice en qué carpeta, para explorarlo                                                                   |
| `--appimage-portable-home`   | Guarda la configuración en una carpeta `.home` **junto al AppImage**, en vez de en tu `~`. Perfecto para un pendrive |
| `--appimage-portable-config` | Lo mismo, pero para la carpeta de configuración                                                                      |
| `--appimage-version`         | Muestra la versión del entorno de ejecución                                                                          |

Ejemplo de uso portable (deja la configuración al lado del archivo, sin tocar tu sistema):

```bash
./marktext-linux-*.AppImage --appimage-portable-home
```

---

## Ponerla en el menú (opcional)

Si vas a usar el programa a menudo, querrás que aparezca en el menú de aplicaciones. Dos caminos:

### A mano, sin instalar nada

Crea el archivo `~/.local/share/applications/marktext.desktop`:

```ini
[Desktop Entry]
Type=Application
Name=MarkText
Exec=/home/TU_USUARIO/Apps/marktext.AppImage %U
Icon=/home/TU_USUARIO/Apps/marktext.png
Terminal=false
Categories=Office;TextEditor;
MimeType=text/markdown;
```

Cambia `TU_USUARIO` por tu nombre de usuario. El icono lo sacas con `--appimage-extract` y copiando el PNG que
aparece dentro. Guarda el AppImage en una carpeta fija, por ejemplo `~/Apps`.

### Con una herramienta que lo hace todo

- **[AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher)**: la primera vez que ejecutas un AppImage
  te ofrece _«Integrar y ejecutar»_; lo mueve a `~/Applications`, extrae el icono y crea la entrada del menú.
  Ojo: **no está en los repositorios de Debian ni de Ubuntu**, se descarga su `.deb` desde su página de releases, y
  la versión actual es un _beta_.
- **[Gear Lever](https://flathub.org/apps/it.mijorus.gearlever)**: alternativa moderna, disponible en Flathub
  («Manage AppImages»).

---

## Desinstalarla

Esto es lo bonito del formato: **se borra el archivo y ya está**.

```bash
rm ~/Apps/marktext.AppImage
```

No queda nada en el sistema (a diferencia de `.deb`, Snap o Flatpak). Si creaste una entrada en el menú, borra
también el `.desktop`, y si usaste el modo portable, la carpeta `.home`.

---

## Problemas comunes y su solución

| Síntoma                                                                  | Causa                                                                                     | Solución                                                                                                              |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| No se abre al hacer doble clic                                           | No tiene permiso de ejecución                                                             | Propiedades → Permisos → marcarlo como ejecutable                                                                     |
| Se abre como texto, en el editor                                         | El gestor está configurado para abrirlo como texto                                        | Márcalo como ejecutable; si insiste, revisa «Abrir con» en Propiedades                                                |
| `dlopen(): error loading libfuse.so.2` o «AppImages require FUSE to run» | Falta **FUSE 2** (es la causa más habitual)                                               | `sudo apt install libfuse2` — en Debian 13 el paquete se llama **`libfuse2t64`** — o usa `--appimage-extract-and-run` |
| «Permiso denegado» aunque sea ejecutable                                 | Está en una partición montada con `noexec` (pendrives, algunas configuraciones de `/tmp`) | Cópialo a tu carpeta personal y ejecútalo desde ahí                                                                   |
| Funciona en un PC y en otro no                                           | Arquitectura distinta (`x86_64` frente a `aarch64`) o falta FUSE                          | Descarga la versión de tu arquitectura                                                                                |
| No aparece en el menú                                                    | Un AppImage no se integra solo: es su diseño                                              | Mira la sección «Ponerla en el menú»                                                                                  |
| Se actualiza sola y no quiero                                            | Algunas incluyen actualización automática                                                 | Cópiala a una carpeta sin permisos de escritura, o usa la versión sin ese soporte                                     |

**Cómo comprobar si tienes FUSE 2** (si el archivo existe, está bien):

```bash
ls /usr/lib/x86_64-linux-gnu/libfuse.so.2
```

---

## Comparación con otras formas de instalar

|                    | **AppImage**                                                 | **.deb**           | **Flatpak**                 | **Snap**            | **Compilar**          |
| ------------------ | ------------------------------------------------------------ | ------------------ | --------------------------- | ------------------- | --------------------- |
| Instalación        | Ninguna                                                      | `sudo apt install` | `flatpak install`           | `snap install`      | Depende del programa  |
| Necesita root      | No                                                           | Sí                 | No                          | Sí (la primera vez) | Sí                    |
| Entrada en el menú | No (hay que añadirla)                                        | Sí, automática     | Sí                          | Sí                  | No                    |
| Actualizaciones    | Manuales                                                     | Con `apt`          | Con `flatpak`               | Automáticas         | Manuales              |
| Portable           | **Sí**                                                       | No                 | No                          | No                  | No                    |
| Quita el programa  | Borrar el archivo                                            | `apt remove`       | `flatpak uninstall`         | `snap remove`       | Difícil               |
| Ocupa              | Más (lleva sus dependencias)                                 | Menos              | Bastante                    | Bastante            | Variable              |
| Ideal para         | Probar algo, llevarlo en un pendrive, no ensuciar el sistema | Instalar de verdad | Apps de escritorio aisladas | Apps de escritorio  | Cuando no hay paquete |

---

## En este equipo (verificado)

| Comprobación         | Resultado                                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Distribución         | **Debian GNU/Linux 13 (trixie)**, sesión X11                                                                                         |
| Gestor de archivos   | **Thunar** (XFCE) → los pasos de arriba son los tuyos                                                                                |
| FUSE 2               | **Instalado** (`libfuse2t64` y existe `libfuse.so.2`) → los AppImage funcionan sin tocar nada                                        |
| Carpeta de descargas | `~/Descargas` existe (no `~/Downloads`)                                                                                              |
| MarkText             | Instalado desde el **paquete `.deb`**, no como AppImage → ya tiene entrada en el menú, así que **no necesita nada de este tutorial** |

---

## Enlaces

- Qué es AppImage y descargas: <https://appimage.org/>
- Documentación oficial: <https://docs.appimage.org/>
- Catálogo de aplicaciones: <https://appimage.github.io/>
- AppImageLauncher: <https://github.com/TheAssassin/AppImageLauncher>
- Gear Lever (Flathub): <https://flathub.org/apps/it.mijorus.gearlever>

---

**Resumen para llevar:** descarga el `.AppImage`, dale permiso de ejecución (con el ratón o con `chmod +x`), haz
doble clic, y cuando ya no lo quieras, bórralo. Sin instalar, sin `sudo` y sin dejar rastro.
