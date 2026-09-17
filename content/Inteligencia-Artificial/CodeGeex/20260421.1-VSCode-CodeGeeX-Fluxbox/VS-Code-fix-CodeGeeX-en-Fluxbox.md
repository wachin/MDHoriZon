![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiy7sXyRC-BeJNNAFuq5t39cZ_-i-7WdJHe0SYXYGpmtxpObp-pqsDhNsMWjslzKCAjuDX0-6m1C2hzfk8Vlr0rMU4xcpoUvC2lMgtre5JMEmrZdqd4vTIeSZaifQfzhQRHGSGKoOO61nVwd6UyLPubqXycQWeKp3pN_7SMLTKM5Sdk8Chv0Fy3v8avFtQ/s1536/Portada.jpg =640x)

# Visual Studio Code no arranca, no funciona con la extensión CodeGeeX en Fluxbox

Los siguientes son los requisitos para este tutorial:

- [Tener instalado VS Code en Linux](https://facilitarelsoftwarelibre.blogspot.com/2026/04/como-instalar-visual-studio-code-en-linux.html)
- [Tener instalado CodeGeeX en Visual Studio Code](https://facilitarelsoftwarelibre.blogspot.com/2026/04/como-instalar-codegeex-en-visual-studio-code.html)

## Introducción 

Estaba usando Visual Studio Code en MX Linux 23 la versión XFCE, con la extensión [CodeGeeX](https://codegeex.cn/en-US) y funcionaba todo bien, pero luego instalé el gestor de ventanas Fluxbox (por cierto, MX Linux tiene una versión con Fluxbox, pero no me gusta, por eso mejor yo mismo lo instalo y lo configuro a mi gusto) y añadí esto al inicio pues no tenía audio y además añadí policykit y otros:

```
# PolicyKit
/usr/lib/policykit-1-gnome/polkit-gnome-authentication-agent-1 &

nm-applet &
sleep 2; pnmixer &
numlockx on &
setxkbmap -layout es & # Teclado Español europeo

ksnip &
kate &
thunar &
xfce4-notes &
xfce4-terminal &
google-chrome-stable &
sleep 5; lxrandr &

# Audio (PipeWire)
pipewire &
pipewire-pulse &
wireplumber &
```

yo pensé que eso ayudaría pero como se ven en la imagen de captura de pantalla:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjlU1Smv0178ub79CCjdHU85EIp2tSRU74Dar94UuWyuOweLhUgiHu4UOO6Tt_kkhj8KAodofKhduUdcPs5u-86uOC_ONSCeeQ02210976OVgyQbHdhyphenhyphenkn3LgzRVM5GK8UIC_hPZAepEE-vdY5vChNMV0t_ZywBN1r9xxo_dlmPbXgbmsAAXZcuJXg6KnM/s457/An%20OS%20keyring%20couldn%20t%20be%20identified.png)


```
An OS keyring couldn't be identified for storing the
encryption related data in your current desktop
environment.
Open the troubleshooting guide to address this or you can use weaker
encryption that doesn't use the OS keyring.

Open troubleshooting guide

Use weaker encryption
```
cuya traducción es:

```
No se ha podido identificar un llavero del sistema operativo para almacenar los
datos relacionados con el cifrado en tu entorno de escritorio
actual.
Abre la guía de resolución de problemas para solucionar esto o puedes utilizar un cifrado más débil
que no utilice el llavero del sistema operativo.

Abrir la guía de resolución de problemas

Utilizar un cifrado más débil
```

no funciona la extensión de VS Code llamada CodeGeeX 

# Solución

Hay tres formas principales de usar esto: desde la terminal, creando un acceso directo (icono) para que Thunar y el menú funcionen bien, o poniéndolo en el menú de Fluxbox.

Asegúrate de tener instalado:

```bash
sudo apt install libsecret-1-0 libsecret-tools gnome-keyring
```

**Nota:** GNOME keyring te pedirá crear una contraseña, crearla y guardarla en un lugar seguro cuando lo pida hacer.

---

## Método 1: Modificar el "Launcher" (el lanzador que está entre los demás programas)

Yo uso un Fluxbox personalizado a mi manera, yo uso el lanzador **xfce4-appfinder**  que es un buscador de aplicaciones creado para el entorno de escritorio Xfce4 pero que bien funciona en otros, y lo tengo configurado en **keys** el cual es el archivo de configuración de los atajos de teclado:

.fluxbox/keys  

con el atajo "Ctrl + Alt + A"  

aquí coloque lo que tengo allí:

```
# Abrir AppFinder con atajo de teclado
# Esto significa que la Tecla Ctrl (Control) y Alt (Mod1) y la tecla A activarán a xfce4-appfinder
# Ctrl + Alt + A lanza xfce4-appfinder
Control Mod1 a :Exec xfce4-appfinder
```

Esta es la mejor opción para hacer clic en un icono en el escritorio y que se abra correctamente sin el error. Vamos a crear un archivo `.desktop` personalizado.

Instala Gedit que este siempre funciona muy bien para cosas de terminal:

```bash
sudo apt install gedit
```

1.  Abre una terminal.
2.  Copia el archivo original de VS Code a tu carpeta personal de aplicaciones (esto evita que las actualizaciones borren tu cambio):

```bash
cp /usr/share/applications/code.desktop ~/.local/share/applications/
```
    
3.  Ahora edita esa copia:  

```bash
gedit ~/.local/share/applications/code.desktop
```

4.  Busca las líneas que empiezan por `Exec=`. Verás varias (una para abrir la ventana normal, otra para abrir una nueva ventana, etc.).
    *   Busca esta:  
    
```
Exec=/usr/share/code/code --unity-launch %F
```  

   * Cámbiala por esta (añadiendo tu parámetro):
  
```
Exec=/usr/share/code/code --password-store="gnome-libsecret" --unity-launch %F
```

5.  Busca la línea `Exec=` que está debajo de `[Desktop Action new-empty-window]` y haz lo mismo:

```
Exec=/usr/share/code/code --password-store="gnome-libsecret" --new-window %F
```
    
6.  Guarda y sal

**Resultado:** Ahora, si buscas VS Code en el menú de Fluxbox o asocias un archivo en Thunar, usará este nuevo comando con el "parche" incluido.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibcJ1F5e1p6dgdTzd450JIUEwZG71eqTYhSIZRnacZS52GTEA1RO6cxyLX9DX6l6bumBMbOuPHu2dpZ8chaZzqRUY3IIB2cayQ9x7RQecbDXh4hXIkFwzjONp44MnNVdPHnhNIXwu9_AB1aODC-ZS1kJieSh3peJOMaiEcb1DFVHcu7-LeJh3XNJ6wav8/s847/Lanzador%20de%20VS%20Code%20arreglado%20y%20visto%20en%20xfce4-appfinder.png)

En Linux (y específicamente en los sistemas que siguen los estándares freedesktop.org, como MX Linux), las carpetas tienen un **orden de prioridad**:

1.  **`~/.local/share/applications/`** (Tu carpeta de usuario)  
2.  **`/usr/share/applications/`** (La carpeta global del sistema)  

### ¿Cómo funciona el sistema?

Cuando buscas una aplicación en el menú de Fluxbox, jwm, xfce4-appfinder, u otro

1.  El sistema mira primero en tu carpeta personal (`~/.local/...`).
2.  Si encuentra un archivo llamado `code.desktop` allí, **lo usa y deja de buscar**.
3.  Solo si *no* lo encuentra en tu carpeta personal, entonces recurre a la carpeta del sistema (`/usr/share/...`).

### ¿Por qué es mejor hacerlo así y no editar el original?

Si editaras directamente el archivo en `/usr/share/applications/code.desktop`:

*   **Riesgo:** Cuando actualices Visual Studio Code (vía `apt upgrade` o descargando la nueva versión), el instalador sobrescribirá ese archivo. **Perderías tu modificación** y volvería a aparecer el error.
*   **Permisos:** A veces necesitas `sudo` para editar en `/usr/share`, lo cual es más engorroso.

Al copiarlo a `~/.local/share/applications/`:

*   **Seguridad:** Las actualizaciones del sistema no borran los archivos de tu carpeta de usuario personal. Tu "parche" se mantiene seguro aunque actualices VS Code 10 veces.
*   **Prioridad:** El sistema usará siempre el tuyo porque está más alto en la lista de prioridad.

Así que sí, al crear esa copia local, le estás diciendo al sistema: *"Oye, ignora el lanzador global que instaló el programa, usa **este otro** que yo he personalizado"*.

Es una forma muy limpia y profesional de "sobrescribir" configuraciones del sistema sin tocar los archivos originales.

---

## Método 2: Crear un "Alias" en la Terminal (Para usarlo cuando escribas y ejecutes)

Si quieres poder escribir simplemente `code` y que ya aplique el parche automáticamente sin tener que recordar el comando largo:

1.  Abre tu terminal en Fluxbox.
2.  Edita el archivo de configuración de tu shell (bash):  

```bash
gedit ~/.bashrc
```

3.  Ve hasta el final del archivo y pega esta línea:  

```
alias code='code --password-store="gnome-libsecret"'
```

4.  Guarda (Ctrl+O), da Enter para escribir en el archivo y sal (Ctrl+X).
5.  Para que funcione en la terminal actual sin tener que cerrar sesión, escribe:  

```bash
source ~/.bashrc
```

**Resultado:** Ahora, cada vez que abras una terminal y escribas `code`, se lanzará con la solución aplicada.

---

## Método 3: Añadirlo al menú de Fluxbox

Como usas Fluxbox, el menú es un archivo de texto simple. Puedes añadir una entrada específica para lanzarlo con el comando correcto.

1.  Edita el archivo de menú de Fluxbox:  

```bash
gedit ~/.fluxbox/menu
```  
    
2.  Busca donde quieres ponerlo (por ejemplo, dentro de la sección de "Desarrollo") o añádelo al final.
3.  Pega esta línea:  

```
[exec] (VS Code Corregido) {code --password-store="gnome-libsecret"} </usr/share/pixmaps/vscode.png>  
```  

**Nota:** La ruta de ese icono la encontré en Synaptic en los archivos instalados de VS Code para Linux, en el 2026.

a continuación pongo toda la sección donde lo tengo, para que sea más fácil de entender cómo se coloca:

```
    [end]
   [workspaces] (Espacios de trabajo) </usr/share/icons/gnome/16x16/apps/xfwm4.png>
   [reconfig] (Reajustar Fluxbox) </usr/share/icons/gnome/16x16/status/media-playlist-repeat.png>
## No funciona:   [restart] (Reiniciar Fluxbox) </usr/share/icons/gnome/16x16/actions/reload.png>
   [exec] (Buscador de Aplicaciones)  {xfce4-appfinder} </usr/share/icons/gnome/16x16/actions/system-search.png>
   [exec] (VS Code Corregido) {code --password-store="gnome-libsecret"} </usr/share/pixmaps/vscode.png>
   [exec] (Actualizar menu de Apps) {xdgmenumaker -i -s16 -f fluxbox > ~/.fluxbox/xdg_menu} </usr/share/icons/gnome/16x16/actions/gtk-redo-ltr.png>
   [submenu] (Estilos) {} </usr/share/icons/gnome/16x16/apps/xfwm4.png>
      [stylesdir] (/usr/share/fluxbox/styles)
      [stylesdir] (~/.fluxbox/styles)
   [end]
```
    
4.  Guarda y sal.
5.  Recarga el menú de Fluxbox (haciendo clic derecho en el escritorio -> Restart) [debería haber algo así configurado]

o tambíen se puede recargarlo a Fluxbox desde la terminal con:

```bash
fluxbox-remote reconfig
```

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGmiy4jFGuml-Ljj0xia-ZKEQnJ4jyhR0ReZCy2e3w5Fg86bQSdzpePVFTgAxjb2icwlQZrtfSn8h_XctTtxbRZ6WOpyfL-BK0MpJ9QaNCMozE3HIVEQ6M4ieDZmT1b1LdlOBfb5WuH58VYcgNqUJTtmi7MfnJKrRBpEpeQUWGvxsii0RsHT3NuroCMLA/s1011/Extension%20CodeGeeX%20en%20VS%20Code%20funcionando%20bien%20otra%20vez%20en%20Fluxbox.png)

---

# Iniciar el servicio Keyring para VS Code

Además he añadido al archivo:

.fluxbox/startup

el siguiente contenido, en medio, donde están los otros programas que se pueden añadir para que arranquen al inicio:

```
# --- SOLUCIÓN AÑADIDA: Iniciar el servicio Keyring para VS Code ---
# Esto resuelve el error "An OS keyring couldn't be identified"
eval $(gnome-keyring-daemon --start --components=secrets) &
# -----------------------------------------------------------------------------
```

Dios les bendiga

---

### Referencias

**Visual Studio Code - Command Line**  
[https://code.visualstudio.com/docs/editor/command-line](https://code.visualstudio.com/docs/editor/command-line)

**Arch Linux Wiki - Desktop entries (Jerarquía de aplicaciones)**  
[https://wiki.archlinux.org/title/desktop_entries](https://wiki.archlinux.org/title/desktop_entries)

**Freedesktop.org - Especificación de entrada de escritorio**  
[https://specifications.freedesktop.org/desktop-entry-spec/latest/](https://specifications.freedesktop.org/desktop-entry-spec/latest/)

**Fluxbox - Documentación del archivo startup**  
[http://fluxbox.org/documentation/startup.php](http://fluxbox.org/documentation/startup.php)