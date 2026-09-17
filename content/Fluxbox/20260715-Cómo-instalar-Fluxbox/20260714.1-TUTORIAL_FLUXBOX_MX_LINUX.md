# Tutorial: instalar y configurar Fluxbox en MX Linux 23 y MX Linux 25 usando los archivos reales del paquete

Fecha: 2026-07-14

## Objetivo y Requisitos

Se requiere:

- MX Linux 23 la versión XFCE [https://sourceforge.net/projects/mx-linux/files/Old/](https://sourceforge.net/projects/mx-linux/files/Old/), [https://sourceforge.net/projects/mx-linux/files/Old/MX-23.6/Xfce/](https://sourceforge.net/projects/mx-linux/files/Old/MX-23.6/Xfce/)

**Nota:** Este tutorial explica cómo instalar **Fluxbox** en > **MX Linux 23** (y posiblemente funcione en **MX Linux 25**) usando el paquete oficial de MX Linux que sólo está en sus [repositorios](https://mxrepo.com/mx/repo/pool/main/f/fluxbox/):

### Instalación de Fluxbox

```bash
sudo apt install fluxbox
```

La idea es aprovechar el paquete que ya trae MX Linux, con sus propios fixes y rutas, y luego personalizar la configuración del usuario en `~/.fluxbox` a partir de los archivos reales que instala el sistema.

Este tutorial está pensado para usuarios que quieren:

- usar Fluxbox desde cero en MX Linux,
- entender qué archivo hace qué,
- tener un entorno liviano pero usable,
- integrar utilidades gráficas útiles,
- y conservar una configuración reproducible.

## Aclaración importante: `fluxbox` no es lo mismo que `mx-fluxbox`

En Synaptic aparecen al menos dos cosas distintas:

- `fluxbox`
  Es el gestor de ventanas.

- `mx-fluxbox`
  Es un paquete de integración de MX Linux que añade un perfil completo ya armado con scripts, menú, autostart, `policykit`, `idesk`, `tint2`, `rofi`, iconos y otros componentes.

Si lo que quieres es **usar Fluxbox en MX Linux pero con tu propio estilo**, entonces:

- sí conviene instalar `fluxbox`,
- pero **no hace falta instalar `mx-fluxbox`**.

Este tutorial está orientado justamente a ese caso: usar el Fluxbox de MX Linux sin adoptar toda la apariencia ni todas las decisiones de diseño del perfil `mx-fluxbox`.

## Importante: por qué usar el paquete de MX Linux

En MX Linux conviene instalar Fluxbox desde los repositorios del sistema porque así se obtiene:

- la integración propia de MX Linux,
- los archivos de configuración colocados en las rutas usadas por Debian/MX,
- el menú base generado por el sistema,
- y los ajustes mantenidos por la distribución.

## 1. Instalar Fluxbox

Instala Fluxbox con:

```bash
sudo apt install fluxbox
```

Después de eso, MX Linux deja estos archivos principales del paquete:

```
/etc/X11/fluxbox/apps
/etc/X11/fluxbox/fluxbox.menu-user
/etc/X11/fluxbox/init
/etc/X11/fluxbox/keys
/etc/X11/fluxbox/overlay
/etc/X11/fluxbox/system.fluxbox-menu
/etc/X11/fluxbox/window.menu
```

Además, en una instalación real de MX Linux suelen verse también estos archivos adicionales en la misma carpeta (desde el administrador de archivos):

```
/etc/X11/fluxbox/fluxbox-menu
/etc/X11/fluxbox/menudefs.hook
```

## 2. Qué significa cada archivo de `/etc/X11/fluxbox`

### Archivos principales

- `apps`
  Guarda reglas por aplicación. Sirve para recordar posición, capa, tamaño, foco y comportamiento de ventanas.

- `init`
  Es la configuración principal de Fluxbox. Define opciones globales como estilo, toolbar, archivo de menú, archivo de teclas y comportamiento general.

- `keys`
  Contiene los atajos de teclado y también acciones de ratón.

- `overlay`
  Permite sobreescribir ajustes visuales del tema sin tocar el tema original.

- `window.menu`
  Es el menú contextual de cada ventana: minimizar, maximizar, capa, transparencia, cerrar, etc.

- `fluxbox.menu-user`
  Es un envoltorio de menú. En MX/Debian normalmente apunta al menú generado por el sistema.

- `system.fluxbox-menu`
  Es la plantilla del menú del sistema basada en el sistema de menús de Debian.

### Archivos adicionales que suelen aparecer

- `fluxbox-menu`
  Es un menú generado automáticamente. Sirve como referencia útil y se puede copiar al usuario si se quiere editar manualmente.

- `menudefs.hook`
  Es un archivo auxiliar generado por el sistema de menús Debian. No suele ser necesario editarlo ni copiarlo al usuario para una configuración normal.
  
## 3. Es imprescindible entrar al menos una vez en Fluxbox

**Es imprescindible cerrar sesión y entrar en la sesión Fluxbox al menos una vez**.

Motivo:

- normalmente ahí se crea la carpeta `~/.fluxbox` en el HOME del usuario,
- y también se genera el archivo `startup`, que luego se puede personalizar.

Si el usuario todavía no ha entrado nunca a Fluxbox, puede ocurrir que `~/.fluxbox` no exista todavía.

## 4. Qué conviene copiar a `~/.fluxbox`

Lo recomendable es trabajar en la configuración del usuario, no editar directamente `/etc/X11/fluxbox`.

### 4.1 Eliminar la carpeta .fluxbox en caso de estarla usando (omita si no es el caso)

Como vamos a hacer una configuración personalizada, en caso de que usted ya tenga instalado **(omita si no es el caso)** y esté usando fluxbox, debe de desinstalarlo, borre la carpeta `.fluxbox` la cual la puede buscar desde el administrador de archivos en su HOME y presionando `Ctrl + H` para ver los archivos ocultos. Luego tiene que cerrar sesión y volver a entrar para que se genere la carpeta .fluxbox

### 4.2 Archivos que sí conviene copiar

Abra una terminal en su HOME y ponga los siguientes dos comandos (se asume que está presenta la carpeta .fluxbox que se ha creado la primera vez que el usuario entra en la sesión de Fluxbox)

```bash
cp -av /etc/X11/fluxbox/{apps,init,keys,overlay,window.menu,fluxbox.menu-user} ~/.fluxbox/
```

Donde:

-  `cp -av /etc/X11/fluxbox/{apps,init,keys,overlay,window.menu,fluxbox.menu-user} ~/.fluxbox/`
Copiará todos los archivos entre parentesis a .fluxbox


### 4.3 Archivos opcionales para estudiar o tomar como referencia

```bash
cp -av /etc/X11/fluxbox/{fluxbox-menu,system.fluxbox-menu} ~/.fluxbox/
```

### Archivo que normalmente no hace falta copiar

- `menudefs.hook`

Ese archivo pertenece más al mecanismo de generación del menú del sistema que a la configuración diaria del usuario.

## 5. Dependencias recomendadas para un Fluxbox usable en MX Linux

Instala estas utilidades:

```bash
sudo apt-get install fluxbox lxappearance lxrandr pnmixer numlockx gxkb xfce4-appfinder network-manager-gnome pavucontrol gnome-icon-theme
```

### Explicación de cada paquete

- `fluxbox`
  El gestor de ventanas.

- `lxappearance`
  Permite cambiar temas GTK, iconos y algunas opciones visuales. Muy útil porque Fluxbox no trae un centro de control grande como XFCE o KDE.

- `lxrandr`
  Herramienta gráfica sencilla para configurar resolución, monitores y pantallas.

- `pnmixer`
  Applet liviano para el volumen en la bandeja del sistema.

- `numlockx`
  Permite activar Num Lock al iniciar sesión.

- `gxkb`
  Indicador de distribución de teclado para X11. Muy útil si se cambia entre varios layouts.

- `xfce4-appfinder`
  Lanzador rápido de aplicaciones. Es práctico en Fluxbox porque reemplaza parte de la experiencia de menú/buscador de entornos más completos.

- `network-manager-gnome`
  Aporta `nm-applet`, el icono de red para gestionar Wi-Fi, Ethernet y VPN desde la bandeja del sistema.

- `pavucontrol`
  Mezclador avanzado de PulseAudio/PipeWire. Muy útil para elegir entradas, salidas y niveles por aplicación.

- `gnome-icon-theme`
  Proporciona iconos clásicos que ayudan a que menús y utilidades antiguas se vean mejor o no queden sin icono.

## 6. Instalar PolicyKit para programas administrativos

Para que programas como:

- Synaptic,
- GParted,
- y otras herramientas que piden privilegios de administrador,

puedan abrir cuadros de autenticación correctamente bajo Fluxbox, instala:

```bash
sudo apt install policykit-1-gnome
```

Ese paquete instala, entre otros, este ejecutable:

```
/usr/lib/policykit-1-gnome/polkit-gnome-authentication-agent-1
```

Ese agente hay que arrancarlo en el archivo `~/.fluxbox/startup`.

## 7. Editar `startup`

Después de entrar una vez a Fluxbox, normalmente existe (o semejante):

```
~/.fluxbox/startup
```

Debajo de:

```bash
#!/bin/sh
#
# fluxbox startup-script:
#
# Lines starting with a '#' are ignored.

# Change your keymap:
xmodmap "~/.Xmodmap"
```

puedes poner algo como esto:

```bash
# PolicyKit: necesario para Synaptic, GParted y otros programas administrativos
/usr/lib/policykit-1-gnome/polkit-gnome-authentication-agent-1 &

# Red y audio
nm-applet &
sleep 2; pnmixer &

# Teclado numérico activo por defecto (no es necesario para presionar el botón para activarlo)
numlockx on &

# Indicador y selector de teclado X11
/usr/bin/gxkb &

# Teclado X11 (opcional si no quieres usar una GUI como gxkb, lo puedes desmarcar y desactivar gxkb)
# setxkbmap -layout es & # Teclado Español europeo

# Programas de inicio opcionales si los tiene instalados (sino marcar con # o eliminar para desabilitarlos)
ksnip &
kate &
thunar &
xfce4-notes &
xfce4-terminal &
```

## Importante sobre el símbolo `&`

El símbolo `&` es importante porque deja el programa ejecutándose en segundo plano.

Si se omite en procesos como:

- `polkit-gnome-authentication-agent-1`,
- `nm-applet`,
- `pnmixer`,
- `ksnip`, etc.,

el arranque de Fluxbox puede quedar bloqueado o no continuar correctamente porque se cortará la siguiente ejecución.

## 8. Atajos de teclado personalizados (`keys`)

Un ejemplo práctico de `~/.fluxbox/keys` con atajos útiles es este:

```
# Abrir AppFinder (viene en MX Linux XFCE) con atajo de teclado
# Ctrl + Alt + A lanza xfce4-appfinder
Control Mod1 a :Exec xfce4-appfinder

# Abrir ksnip (tener instalado) para capturar un rectángulo con el cursor
# Ctrl + Alt + K lanza Ksnip para capturar un rectángulo
Control Mod1 k :Exec ksnip --rectarea

# Abrir el menú de aplicaciones donde esté el cursor
# Super + M
Mod4 m :RootMenu

# Poner o quitar una ventana "siempre encima"
# Alt + V
Mod1 v :ToggleCmd {MacroCmd {RaiseLayer} {RaiseLayer}} {MacroCmd {LowerLayer} {LowerLayer}}

# Minimizar ventana activa
# Se usa Mod4+n para evitar conflicto con Mod4+m
# Super + N
Mod4 n :Minimize

# Mostrar/ocultar escritorio (minimizar todas)
# Super + D
Mod4 d :ShowDesktop
```

## Nota importante sobre los atajos

Algunos atajos de teclado podrían no funcionar en su ordenador, pero los puede cambiar a unos que no se estén usando.

## 9. Menú personalizado (`menu`)

Un ejemplo de menú personalizado útil en MX Linux es este, basado en mi configuración:

```
[begin] (fluxbox)
[include] (~/.fluxbox/xdg_menu)
 [submenu] (Herramientas del Sistema) </usr/share/icons/gnome/16x16/categories/preferences-system.png>
   [exec] (MX Herramientas) {mx-tools} </usr/share/icons/hicolor/96x96/apps/mx-tools.png>
   [exec] (Ajustes del Monitor) {lxrandr} </usr/share/icons/gnome/16x16/devices/video-display.png>
   [exec] (Resetear Nitrogen en 1er uso, y resetear para usar Dos Monitores) {rm -r ~/.config/nitrogen/} </usr/share/icons/gnome/16x16/apps/gnome-settings-background.png>
   [exec] (Cambair el fondo del escritorio con Nitrogen - imagenes del sistema-) {nitrogen /usr/share/backgrounds/} </usr/share/icons/gnome/16x16/apps/gnome-settings-background.png>
   [exec] (Cambiar sus fondos de escritorio con Nitrogen - sus imagenes-) {nitrogen} </usr/share/icons/gnome/16x16/apps/gnome-settings-background.png>
   [exec] (Personalizar apariencia y comportamiento) {lxappearance} </usr/share/icons/gnome/16x16/apps/preferences-desktop-theme.png>
   [exec] (Ajustes QT5 "Aplicaciones KDE") {qt5ct} </usr/share/icons/gnome/16x16/apps/preferences-desktop-theme.png>
   [exec] (Gestor de paquetes Synaptic) {synaptic-pkexec} </usr/share/icons/gnome/16x16/categories/applications-other.png>
   [exec] (Administrador de archivos Dolphin) {dolphin} </usr/share/icons/gnome/16x16/places/folder.png>
   [exec] (Administrador de archivos Thunar) {thunar --no-desktop} </usr/share/icons/hicolor/16x16/apps/org.xfce.thunar.png>
   [exec] (Proyecto Facilitar el Software Libre en el Ecuador) {xdg-open http://facilitarelsoftwarelibre.blogspot.com} </usr/share/icons/gnome/16x16/emblems/emblem-web.png>
 [end] # (Herramientas de Fluxbox)
    [submenu] (Preferencias de Fluxbox) </usr/share/icons/gnome/16x16/categories/preferences-desktop.png>
        [exec] (Apps "Ajustes personalizados para ciertas aplicaciones") {exo-open ~/.fluxbox/apps} </usr/share/icons/gnome/16x16/apps/accessories-text-editor.png>
        [exec] (Init "Ajustes personalizados a la configuración de Fluxbox") {exo-open ~/.fluxbox/init} </usr/share/icons/gnome/16x16/apps/accessories-text-editor.png>
        [exec] (Keys "Atajos de teclado") {exo-open ~/.fluxbox/keys} </usr/share/icons/gnome/16x16/apps/accessories-text-editor.png>
        [exec] (Main "Menú principal de aplicaciones") {exo-open ~/.fluxbox/menu} </usr/share/icons/gnome/16x16/apps/accessories-text-editor.png>
        [exec] (Overlay "Línea que evita a estilos poner Wallpaper") {exo-open ~/.fluxbox/overlay} </usr/share/icons/gnome/16x16/apps/accessories-text-editor.png>
        [exec] (Startup "Aplicaciones que se cargarán al Inicio") {featherpad ~/.fluxbox/startup} </usr/share/icons/gnome/16x16/apps/accessories-text-editor.png>
        [exec] (Estilos "Lugar donde están ubicados los estilos de Fluxbox") {thunar ~/.fluxbox/styles/} </usr/share/icons/hicolor/16x16/apps/org.xfce.thunar.png>
        [config] (Ventana)  </usr/share/icons/gnome/16x16/apps/krfb.png>
    [end]
    [submenu] (Idioma del teclado) </usr/share/icons/gnome/16x16/actions/gtk-bold.png>
        [exec] (DE Teclado Alemán) {setxkbmap de} </usr/share/gxkb/flags/de.png>
        [exec] (US Teclado Inglés) {setxkbmap us} </usr/share/gxkb/flags/us.png>
        [exec] (LAT Teclado Español latino){setxkbmap latam} <~/.fluxbox/gxkb-flags/latam.png>
        [exec] (ES Teclado Español europeo) {setxkbmap es} </usr/share/gxkb/flags/es.png>
        [exec] (FR Teclado Francés) {setxkbmap fr} </usr/share/gxkb/flags/fr.png>
        [exec] (GB Teclado Inglés británico) {setxkbmap gb} </usr/share/gxkb/flags/gb.png>
        [exec] (GR Teclado Griego) {setxkbmap gr} </usr/share/gxkb/flags/gr.png>
        [exec] (IT Teclado Italiano) {setxkbmap it} </usr/share/gxkb/flags/it.png>
        [exec] (PL Teclado Polaco) {setxkbmap pl} </usr/share/gxkb/flags/pl.png>
        [exec] (PT Teclado Portugués) {setxkbmap pt} </usr/share/gxkb/flags/pt.png>
        [exec] (RU Teclado Ruso) {setxkbmap ru} </usr/share/gxkb/flags/ru.png>

    [end]
   [workspaces] (Espacios de trabajo) </usr/share/icons/gnome/16x16/apps/xfwm4.png>
   [reconfig] (Reajustar Fluxbox) </usr/share/icons/gnome/16x16/status/media-playlist-repeat.png>
## No funciona:   [restart] (Reiniciar Fluxbox) </usr/share/icons/gnome/16x16/actions/reload.png>
   [exec] (Buscador de Aplicaciones)  {xfce4-appfinder} </usr/share/icons/gnome/16x16/actions/system-search.png>
   [exec] (VS Code Corregido) {code --password-store="gnome-libsecret"} </usr/share/pixmaps/vscode.png>
   [exec] (Cursor AI Corregido) {cursor --password-store="gnome-libsecret"} </usr/share/pixmaps/co.anysphere.cursor.png>
   [exec] (Kiro Corregido) {/usr/share/kiro/kiro --password-store="gnome-libsecret"} </usr/share/pixmaps/code-oss.png>
   [exec] (Windsurf Corregido) {/usr/share/windsurf/windsurf --password-store="gnome-libsecret"} </usr/share/pixmaps/windsurf.png>
   [exec] (Antigravity Corregido) {/usr/share/antigravity/antigravity --password-store="gnome-libsecret"} </usr/share/pixmaps/antigravity.png>
   [exec] (TRAE Corregido) {/usr/share/trae/trae --password-store="gnome-libsecret"} </usr/share/pixmaps/trae.png>
   [exec] (Actualizar menu de Apps) {xdgmenumaker -i -s16 -f fluxbox > ~/.fluxbox/xdg_menu} </usr/share/icons/gnome/16x16/actions/gtk-redo-ltr.png>
   [submenu] (Estilos) {} </usr/share/icons/gnome/16x16/apps/xfwm4.png>
      [stylesdir] (/usr/share/fluxbox/styles)
      [stylesdir] (~/.fluxbox/styles)
   [end]
  [submenu] (Salir) </usr/share/icons/gnome/16x16/actions/stop.png>
     [exec] (Reiniciar) {pkexec /sbin/reboot} </usr/share/icons/gnome/16x16/actions/reload.png>
     [exec] (Apagar) {pkexec /sbin/poweroff} </usr/share/icons/gnome/16x16/actions/system-shutdown.png>
     [exec] (Suspender) {pkexec /usr/sbin/pm-suspend} </usr/share/icons/gnome/16x16/actions/player_pause.png>
     [exit] (Cerrar Sesión) </usr/share/icons/gnome/16x16/actions/system-log-out.png>
  [end]
[end]
```

## 10. Generar el menú automático con `xdgmenumaker`

### Dependencias

Instala primero:

```bash
sudo apt-get install txt2tags python3-xdg gobject-introspection
```

### Qué hace cada una

- `txt2tags`
  Se usa en el proceso de construcción/documentación del proyecto.

- `python3-xdg`
  Permite leer información XDG, como archivos `.desktop`, categorías y rutas estándar.

- `gobject-introspection`
  Aporta componentes necesarios para integraciones usadas por herramientas gráficas y scripts relacionados.

## Nota práctica

Para ejecutar `make` normalmente también hace falta tener `make` instalado. Si el sistema no lo trae, se puede instalar con:

```bash
sudo apt install make
```

### Clonar e instalar `xdgmenumaker`

```bash
git clone https://github.com/gapan/xdgmenumaker && cd xdgmenumaker
make
sudo su
make install && cd .. && exit
```

### Generar el archivo `xdg_menu`

Después de volver a entrar en Fluxbox, ejecuta:

```bash
xdgmenumaker -i -s16 -f fluxbox > ~/.fluxbox/xdg_menu
```

## Importante

Es recomendable **cerrar sesión y volver a entrar** antes de generar `~/.fluxbox/xdg_menu`, especialmente si la carpeta `~/.fluxbox` acaba de ser creada por primera vez.

## 11. Mejora recomendada para diálogos Qt/KDE bajo Fluxbox

En algunas instalaciones ligeras con Fluxbox, ciertos diálogos modales de aplicaciones Qt/KDE pueden no tomar el foco correctamente.

Para mejorar eso, en `~/.fluxbox/apps` se puede añadir:

```text
[transient] (Class=^(kate|kdenlive|dolphin|dmidiplayer|ksnip)$)
  [FocusProtection] {Gain,Lock}
[end]
```

### Qué hace esto

- aplica a ventanas transitorias/modales,
- permite que el diálogo gane foco cuando se abre,
- y evita que otra ventana robe el foco inmediatamente.

Es una mejora específica para estas aplicaciones, sin cambiar todo el modelo global de foco de Fluxbox.

---

Dios les bendiga
