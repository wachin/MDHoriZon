# Cursor no arranca, no funciona en Fluxbox en MX Linux 23 XFCE

![](images/Cursor-no-arranca,-no-funciona-en-Fluxbox-en-MX-Linux-23-XFCE.jpg)

Estaba usando Cursor en MX Linux 23 (que está basado en Debian 12) la versión XFCE y funcionaba todo bien, pero luego instalé el gestor de ventanas Fluxbox (por cierto, MX Linux tiene una versión con Fluxbox, pero no me gusta, por eso mejor yo mismo lo instalo y lo configuro a mi gusto), pero no funciona

---

# Problema en Cursor

Al abrir Cursor el error muestra:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnzH5fJNd_GFOH-tBBEYIynUASfCNT1rpz4WkV9oK-F8NxG6A_TUsGBEF-B97hQzT-4W3do7ZeUvoYtIcR6AJ1D7_ECkml-hOygLAWoQc6fMCX9YHk9vmQnzY2CzQWgIEpVhT5oB2ylsQYiUIgJ-MDxU223Dk3CPbRGKKIcNznHa-gs1dHADQx4amE074/s493/Cursor%20no%20arranca%20en%20Fluxbox.png)

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

y no funcionan Cursor en Fluxbox

---

# 🚀 Solución al error de Keyring

Al usar Cursor AI en Fluxbox (y puede que ocurra lo mismo en JWM, Openbox, iceWM, etc), aparece este error, esto ocurre porque:

* Fluxbox no tiene gestor de llaves (keyring)
* Cursor intenta usar uno para guardar credenciales
* Entonces falla o usa cifrado débil

---

# 🔧 SOLUCIÓN DEFINITIVA

La solución es obligar a Cursor a usar:

```
--password-store="gnome-libsecret"
```

Asegúrate de tener instalado:

```bash
sudo apt install libsecret-1-0 libsecret-tools
```

---

# MÉTODO 1: Modificar el launcher (.desktop)

## 1. Copiar el lanzador

```bash
cp /usr/share/applications/cursor.desktop ~/.local/share/applications/
```

---

## 2. Editarlo

```bash
gedit ~/.local/share/applications/cursor.desktop
```

su contenido es este:

```
[Desktop Entry]
Name=Cursor
Comment=The AI Code Editor.
GenericName=Text Editor
Exec=/usr/share/cursor/cursor %F
Icon=co.anysphere.cursor
Type=Application
StartupNotify=false
StartupWMClass=Cursor
Categories=TextEditor;Development;IDE;
MimeType=application/x-cursor-workspace;
Actions=new-empty-window;
Keywords=cursor;

[Desktop Action new-empty-window]
Name=New Empty Window
Name[cs]=Nové prázdné okno
Name[de]=Neues leeres Fenster
Name[es]=Nueva ventana vacía
Name[fr]=Nouvelle fenêtre vide
Name[it]=Nuova finestra vuota
Name[ja]=新しい空のウィンドウ
Name[ko]=새 빈 창
Name[ru]=Новое пустое окно
Name[zh_CN]=新建空窗口
Name[zh_TW]=開新空視窗
Exec=/usr/share/cursor/cursor --new-window %F
Icon=co.anysphere.cursor
```

## 3. Buscar la línea `Exec=`

Ejemplo original:

```
Exec=/usr/share/cursor/cursor %F
```

## 4. Cambiar por:

```
Exec=/usr/share/cursor/cursor --password-store="gnome-libsecret" %F
```

## 5. También cambiar esta parte:

Busca:

```
[Desktop Action new-window]
```

Y modifica:

```
Exec=/usr/share/cursor/cursor --new-window %F
```

por:

```
Exec=/usr/share/cursor/cursor --password-store="gnome-libsecret" --new-window %F
```

---

✅ **Resultado:**

Ahora al abrir Cursor funcionará desde:


**¿Por qué funciona?**.- Funciona porque Linux usa prioridad:

  1. `~/.local/share/applications/`
  2. `/usr/share/applications/`

---

# MÉTODO 2: Alias en terminal

Si usas Cursor desde consola:

```bash
gedit ~/.bashrc
```

Añade al final:

```bash
alias cursor='cursor --password-store="gnome-libsecret"'
```

Aplica cambios:

```bash
source ~/.bashrc
```

**Nota:** Esto es para no tener que cerrar sesión y volver a entrar.

✅ Ahora puedes usar desde la terminal:

```bash
cursor
```

sin error.

---

# MÉTODO 3: Menú de Fluxbox

Edita:

```bash
gedit ~/.fluxbox/menu
```

Añade:

```bash
[exec] (Cursor AI Corregido) {cursor --password-store="gnome-libsecret"} </usr/share/pixmaps/co.anysphere.cursor.png>
```

Como ejemplo a mi en esa sección me queda así:

```
   [workspaces] (Espacios de trabajo) </usr/share/icons/gnome/16x16/apps/xfwm4.png>
   [reconfig] (Reajustar Fluxbox) </usr/share/icons/gnome/16x16/status/media-playlist-repeat.png>
## No funciona:   [restart] (Reiniciar Fluxbox) </usr/share/icons/gnome/16x16/actions/reload.png>
   [exec] (Buscador de Aplicaciones)  {xfce4-appfinder} </usr/share/icons/gnome/16x16/actions/system-search.png>
   [exec] (VS Code Corregido) {code --password-store="gnome-libsecret"} </usr/share/pixmaps/vscode.png>
   [exec] (Cursor AI Corregido) {cursor --password-store="gnome-libsecret"} </usr/share/pixmaps/co.anysphere.cursor.png>
   [exec] (Actualizar menu de Apps) {xdgmenumaker -i -s16 -f fluxbox > ~/.fluxbox/xdg_menu} </usr/share/icons/gnome/16x16/actions/gtk-redo-ltr.png>
   [submenu] (Estilos) {} </usr/share/icons/gnome/16x16/apps/xfwm4.png>
      [stylesdir] (/usr/share/fluxbox/styles)
      [stylesdir] (~/.fluxbox/styles)
   [end]
```

Recarga Fluxbox (debería estar allí esa opción) o tal vez no es necesario:

Click derecho → Restart

o tambíen se puede recargarlo a Fluxbox desde la terminal con:

```bash
fluxbox-remote reconfig
```

Es posible que ya aparezca

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
