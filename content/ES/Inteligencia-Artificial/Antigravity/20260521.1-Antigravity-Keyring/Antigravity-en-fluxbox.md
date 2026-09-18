# Antigravity en Fluxbox: cómo aplicar el fix del keyring en MX Linux  

![](images/Portada.jpg)

Instalé [Antigravity](https://antigravity.google/download/linux) (de Google) en MX Linux 23 (basado en Debian 12) y, al igual que Windsurf, Cursor, Kiro y otros forks de VS Code, puede presentar problemas con el almacenamiento de credenciales (keyring) cuando se usa en Fluxbox.

Gracias a que Antigravity está basado en Visual Studio Code, se puede aplicar exactamente el mismo fix usando:

```bash
--password-store="gnome-libsecret"
```

Tomando como referencia el tutorial “Windsurf en Fluxbox, fix.md”  y adaptándolo a Antigravity.

---

# 🔧 SOLUCIÓN DEFINITIVA

La solución consiste en forzar a Antigravity a utilizar el backend de GNOME Keyring:

```bash
--password-store="gnome-libsecret"
```

Primero asegúrate de tener instalados estos paquetes:

```bash
sudo apt install libsecret-1-0 libsecret-tools gedit
```

---

# MÉTODO 1: Modificar el launcher (.desktop)

## 1. Copiar el lanzador

```bash
cp /usr/share/applications/antigravity.desktop ~/.local/share/applications/
```

---

## 2. Editarlo

```bash
gedit ~/.local/share/applications/antigravity.desktop
```

---

## 3. Cambiar la línea principal `Exec=`

Busca:

```ini
Exec=/usr/share/antigravity/antigravity %F
```

Cámbiala por:

```ini
Exec=/usr/share/antigravity/antigravity --password-store="gnome-libsecret" %F
```

---

## 4. Cambiar también la acción “New Empty Window”

Busca esta sección:

```ini
[Desktop Action new-empty-window]
```

Y cambia:

```ini
Exec=/usr/share/antigravity/antigravity --new-window %F
```

por:

```ini
Exec=/usr/share/antigravity/antigravity --password-store="gnome-libsecret" --new-window %F
```

Guarda y cierra

---

# Resultado final del archivo

```ini
[Desktop Entry]
Name=Antigravity
Comment=Experience liftoff
GenericName=Text Editor
Exec=/usr/share/antigravity/antigravity --password-store="gnome-libsecret" %F
Icon=antigravity
Type=Application
StartupNotify=false
StartupWMClass=Antigravity
Categories=TextEditor;Development;IDE;
MimeType=application/x-antigravity-workspace;
Actions=new-empty-window;
Keywords=vscode;

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
Exec=/usr/share/antigravity/antigravity --password-store="gnome-libsecret" --new-window %F
Icon=antigravity
```

---

# MÉTODO 2: Alias en terminal

Edita tu archivo `.bashrc`:

```bash
gedit ~/.bashrc
```

Añade al final:

```bash
alias antigravity='/usr/share/antigravity/antigravity --password-store="gnome-libsecret"'
```

Aplica cambios:

```bash
source ~/.bashrc
```

Ahora podrás abrir Antigravity escribiendo:

```bash
antigravity
```

---

# MÉTODO 3: Menú de Fluxbox

Edita:

```bash
gedit ~/.fluxbox/menu
```

Añade esta línea:

```bash
[exec] (Antigravity Corregido) {/usr/share/antigravity/antigravity --password-store="gnome-libsecret"} </usr/share/pixmaps/antigravity.png>
```

Recarga Fluxbox:

```bash
fluxbox-remote reconfig
```

o desde el menú:

```text
Click derecho → Restart
```

---

# 🔍 ¿Por qué ocurre este problema?

Los programas basados en Electron y Visual Studio Code suelen guardar tokens, sesiones y credenciales usando un “password store”.

En escritorios completos como KDE Plasma o GNOME esto funciona automáticamente porque incluyen:

* KWallet
* GNOME Keyring

Pero Fluxbox es un entorno extremadamente ligero y normalmente no inicia ninguno de esos servicios automáticamente.

Por eso aplicaciones como:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Cursor](https://www.cursor.com/)
* [Windsurf](https://windsurf.com/)
* [Kiro](https://kiro.dev/)
* Antigravity

pueden tener problemas para recordar sesiones o mostrar errores relacionados con credenciales.

El parámetro:

```bash
--password-store="gnome-libsecret"
```

fuerza el uso de GNOME Keyring y normalmente resuelve el problema completamente.

---

# ✅ Conclusión

Antigravity hereda gran parte del comportamiento interno de Visual Studio Code, incluyendo el sistema de almacenamiento de credenciales.

En MX Linux 23 con Fluxbox, el fix más efectivo es forzar:

```bash
--password-store="gnome-libsecret"
```

Esto permite que Antigravity funcione correctamente con el keyring incluso en escritorios ligeros.

Dios les bendiga 
