# Qoder en Fluxbox: cómo aplicar el fix del keyring en MX Linux 23 XFCE (Debian 12)

Instalé Qoder IDE en MX Linux 23 (basado en Debian 12) y abre, pero como este está basado en VS Code: así como Cursor y Kiro, en estos últimos tuve que aplicar un fix:

**Cursor no arranca, no funciona en Fluxbox en MX Linux 23 XFCE (Debian 12) - An OS keyring couldn't be identified for storing the encryption related data in your current desktop environment**  
[https://facilitarelsoftwarelibre.blogspot.com/2026/04/cursor-no-arranca-no-funciona-en-fluxbox-en-mx-linux-23-xce-debian12.html](https://facilitarelsoftwarelibre.blogspot.com/2026/04/cursor-no-arranca-no-funciona-en-fluxbox-en-mx-linux-23-xce-debian12.html)

Entonces mejor lo aplico desde ya, pero luego instalé el gestor de ventanas Fluxbox (igual que en el caso de Cursor y Kiro).

---

# ¿Por qué podría ocurrir eso?

Al usar Qoder en Fluxbox (y también puede pasar en Openbox, JWM, IceWM, etc):

* Fluxbox no tiene gestor de llaves (keyring)
* Qoder podría usar uno para guardar credenciales
* Entonces podría fallar o usa cifrado débil

---

# 🔧 SOLUCIÓN DEFINITIVA

La solución es obligar a Qoder a usar:

```
--password-store="gnome-libsecret"
```

Asegúrate de tener instalado:

```bash
sudo apt install libsecret-1-0 libsecret-tools gedit
```

**Nota:** Usaremos Gedit para abrir archivos.

---

# MÉTODO 1: Modificar el launcher (.desktop)

## 1. Copiar el lanzador

```bash
cp /usr/share/applications/qoder.desktop ~/.local/share/applications/
```

---

## 2. Editarlo

```bash
gedit ~/.local/share/applications/qoder.desktop
```

Su contenido es este:

```ini
[Desktop Entry]
Name=Qoder IDE
Comment=Agentic Coding Platform for Real Software
GenericName=Code Editor
Exec=/usr/share/qoder/qoder %F
Icon=Qoder
Type=Application
StartupNotify=false
StartupWMClass=qoder
Categories=Development;IDE;
MimeType=application/x-qoder-workspace;
Actions=new-empty-window;
Keywords=qoder;

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
Exec=/usr/share/qoder/qoder --new-window %F
Icon=Qoder
```

---

## 3. Buscar la línea `Exec=`

Ejemplo original:

```
Exec=/usr/share/qoder/qoder %F
```

---

## 4. Cambiar por:

```
Exec=/usr/share/qoder/qoder --password-store="gnome-libsecret" %F
```

---

## 5. También cambiar esta parte:

Busca:

```
[Desktop Action new-empty-window]
```

Y modifica:

```
Exec=/usr/share/qoder/qoder --new-window %F
```

por:

```
Exec=/usr/share/qoder/qoder --password-store="gnome-libsecret" --new-window %F
```

---

✅ **Resultado:**

Ahora al abrir Qoder funcionará correctamente en Fluxbox.

---

## ¿Por qué funciona?

Linux usa prioridad en los lanzadores:

1. `~/.local/share/applications/`
2. `/usr/share/applications/`

Por eso no es necesario modificar el del sistema (además que si se actualiza el programa se borrará lo que hayamos hecho allí).

---

# MÉTODO 2: Alias en terminal

Si usas Qoder desde consola:

```bash
gedit ~/.bashrc
```

Añade al final:

```bash
alias qoder='/usr/share/qoder/qoder --password-store="gnome-libsecret"'
```

Aplica cambios:

```bash
source ~/.bashrc
```

---

✅ Ahora puedes usar:

```bash
qoder
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
[exec] (Qoder Corregido) {/usr/share/qoder/qoder --password-store="gnome-libsecret"} </usr/share/pixmaps/Qoder.png>
```

---

Recarga Fluxbox (aunque es posible que no sea necesario hacer esto y ya aparezca):

```bash
fluxbox-remote reconfig
```

o desde el menú:

👉 Click derecho → Restart

---

# ✅ Conclusión

Qoder, al igual que Cursor AI, Kiro y VS Code:, depende del sistema de keyring.

Como Fluxbox no tiene uno, hay que forzarlo manualmente con:

```
--password-store="gnome-libsecret"
```

---

# Iniciar el servicio Keyring para VS Code:

Además he añadido al archivo:

`.fluxbox/startup`

el siguiente contenido, en medio, donde están los otros programas que se pueden añadir para que arranquen al inicio:

```
# --- SOLUCIÓN AÑADIDA: Iniciar el servicio Keyring para VS Code: ---
# Esto resuelve el error "An OS keyring couldn't be identified"
eval $(gnome-keyring-daemon --start --components=secrets) &
# -----------------------------------------------------------------------------
```

---

Dios les bendiga

---