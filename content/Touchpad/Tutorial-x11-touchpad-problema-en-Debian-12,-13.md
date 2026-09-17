# Activar el doble clic (Tap-to-click) en Debian 13 bajo X11: El caso de Escuelas Linux

A todos nos ha pasado: instalamos Linux en una laptop y, por defecto, el touchpad no nos permite hacer clic tocándolo suavemente (tap-to-click), obligándonos a usar físicamente los botones below. 

Si buscas la solución en internet, la guía más extendida te dirá que abras una terminal y modifiques este archivo:
`sudo gedit /usr/share/X11/xorg.conf.d/40-libinput.conf`

Sin embargo, hay un par de advertencias vitales sobre esa solución que muy pocos artículos mencionan, especialmente si estamos en 2026 y usas distribuciones basadas en Debian 13.

### La trampa de Wayland vs X11

Esa solución **solo funciona si estás usando el servidor gráfico X11**. 

A partir de Debian 12 (y por defecto en Debian 13), el sistema gráfico que se instala es **Wayland**. Si estás en Wayland, editar el archivo de Xorg no hará absolutamente nada. En Wayland la configuración se gestiona de otra forma (normalmente mediante `gsettings` si usas GNOME). 

*"¿Pero si Debian 13 trae Wayland, por qué estamos hablando de X11?"*

### El contexto actual (Mayo 2026): Escuelas Linux y Debian 13 de 32 bits

A fecha de mayo de 2026, el proyecto **Escuelas Linux** es el único esfuerzo vivo y notable que ha logrado llevar Debian 13 (Trixie) a la arquitectura de **32 bits**. Esto es una hazaña enorme, ya que el equipo oficial de Debian abandonó el soporte de 32 bits para sus imágenes de instalación estándar hace ya varios años.

Por motivos de compatibilidad con hardware antiguo (como las clásicas Dell Inspiron, equipos con procesadores antiguos, etc.), la versión de 32 bits de Escuelas Linux basada en Debian 13 **viene configurada por defecto con X11**, no con Wayland. 

Por lo tanto, si estás usando esta distribución en tu equipo antiguo, **la solución de editar el archivo de libinput sí te va a funcionar**... pero debes hacerlo bien.

### El error de modificar `/usr/share/...` (Y cómo hacerlo para que NO se borre en el futuro)

La guía tradicional te dice que edites el archivo dentro de `/usr/share/X11/xorg.conf.d/`. Ese es un error grave de práctica administrativa. 

La carpeta `/usr/share/` es propiedad del sistema de paquetes. Si en el futuro haces una actualización del sistema y el paquete `xserver-xorg-input-libinput` se actualiza, **tu archivo modificado será reemplazado por el original y perderás el doble clic en tu touchpad**.

Para que tu configuración sea permanente y **no se borre en el futuro**, los archivos de configuración personalizada de X11 deben ir en `/etc/X11/xorg.conf.d/`. Los archivos que pongas en `/etc/` tienen prioridad sobre los de `/usr/share/` y las actualizaciones del sistema jamás los tocan.

### La forma correcta de hacerlo (Sin reiniciar y seguro ante actualizaciones)

Abre tu terminal y aplica estos dos simples pasos:

**1. Crea el archivo en la ruta segura (`/etc/...`):**
Primero, nos aseguramos de que la carpeta existe y luego creamos el archivo:
```bash
sudo mkdir -p /etc/X11/xorg.conf.d
sudo nano /etc/X11/xorg.conf.d/40-libinput.conf
```
Pega dentro de nano el siguiente bloque de texto:
```text
Section "InputClass"
    Identifier "libinput touchpad catchall"
    MatchIsTouchpad "on"
    MatchDevicePath "/dev/input/event*"
    Driver "libinput"
    Option "Tapping" "on"
EndSection
```
*Guarda con `Ctrl + O`, presiona `Enter`, y sal con `Ctrl + X`.*

Con esto, la próxima vez que enciendas tu equipo, el doble clic ya estará activo y será a prueba de futuras actualizaciones.

**2. Aplica el cambio AHORA MISMO (Sin reiniciar ni cerrar sesión):**
Como acabamos de crear un archivo de sistema, X11 no lo va a leer hasta el próximo inicio. Para activarlo en la sesión actual sin reiniciar, usaremos `xinput`.

Primero, averigua cómo se llama tu touchpad:
```bash
xinput list
```
Busca la línea que contenga la palabra "Touchpad" (ej. *SynPS/2 Synaptics TouchPad*). Luego, ejecuta el comando de activación usando ese nombre exacto entre comillas:
```bash
xinput set-prop "AQUÍ_EL_NOMBRE_EXACTO_DE_TU_TOUCHPAD" "libinput Tapping Enabled" 1
```

¡Y listo! Ya tienes tu doble clic funcionando en el acto, con la tranquilidad de que cuando actualices tu Escuelas Linux en el futuro, la configuración seguirá intacta en tu carpeta `/etc/`.
