
# Configuración de Apagado en Fluxbox para MX Linux 23 XFCE (SysVinit vs Systemd)

MX Linux es especial porque ofrece dos "sabores" o formas de gestionar el sistema. Cuando enciendes tu ordenador y ves el menú del GRUB, te estás enfrentando a esta elección:

1.  **Opción por defecto (SysVinit):** Es la tradicional, ligera y basada en scripts simples. Es la filosofía clásica de Unix.
2.  **Opción alternativa (Systemd):** Es la moderna, usada por la mayoría de distribuciones (Ubuntu, Fedora, Debian moderna), centralizada y más rápida en el arranque paralelo.

A continuación, te doy la solución para cada filosofía.

---

## OPCIÓN A: Filosofía MX Linux (Usar SysVinit)
*Recomendada si quieres mantener tu sistema ligero, tradicional y estable tal como viene por defecto.*

Si te gusta la idea de tener un sistema que no depende de una pieza gigante de software, configura Fluxbox para que hable el lenguaje de SysVinit.

**1. Configurar permisos (Sudoers)**
SysVinit requiere permisos de superusuario para apagar, pero no queremos escribir la contraseña cada vez.
1. Abre una terminal y escribe:
   ```bash
   sudo visudo
   ```
2. Al final del archivo, añade esta línea (cambia `wachin` por tu usuario):
   ```text
   wachin ALL = NOPASSWD: /sbin/poweroff, /sbin/reboot, /usr/sbin/pm-suspend
   ```
3. Guarda (`Ctrl+O`, `Enter`) y sal (`Ctrl+X`).

**2. Configurar el menú de Fluxbox**
Edita tu archivo `~/.fluxbox/menu` y usa estos comandos tradicionales:

```text
 [submenu] (Salir) </usr/share/icons/gnome/16x16/actions/stop.png>
   [exec] (Reiniciar) {sudo /sbin/reboot} </usr/share/icons/gnome/16x16/actions/reload.png>
   [exec] (Apagar) {sudo /sbin/poweroff} </usr/share/icons/gnome/16x16/actions/system-shutdown.png>
   [exec] (Suspender) {sudo /usr/sbin/pm-suspend} </usr/share/icons/gnome/16x16/actions/player_pause.png>
   [exit] (Cerrar Sesión) </usr/share/icons/gnome/16x16/actions/system-log-out.png>
 [end]
```
*Recarga Fluxbox y listo. Tienes un sistema limpio y funcional.*

---

## OPCIÓN B: Filosofía Estándar (Usar Systemd)
*Recomendada si prefieres compatibilidad total con tutoriales de internet y características modernas de gestión de energía.*

Si prefieres usar la opción con **(systemd)** del GRUB, tus comandos deben ser los estándar.

**1. Cómo arrancar con Systemd**
*   **Temporal:** Al encender el PC, ve a "Opciones avanzadas" y selecciona la entrada que dice "(systemd)".
*   **Permanente:** MX Linux tiene una herramienta llamada "MX Boot Options" (Opciones de Arranque) en el menú que facilita esto, o puedes usar el truco del GRUB que te explico abajo para que siempre cargue esta opción.

**2. Configurar el menú de Fluxbox**
Si has entrado con Systemd, ya no necesitas `sudo` ni trucos, el sistema maneja las políticas de seguridad mejor. Editar tu `~/.fluxbox/menu` así:

```text
 [submenu] (Salir) </usr/share/icons/gnome/16x16/actions/stop.png>
   [exec] (Reiniciar) {systemctl reboot} </usr/share/icons/gnome/16x16/actions/reload.png>
   [exec] (Apagar) {systemctl poweroff} </usr/share/icons/gnome/16x16/actions/system-shutdown.png>
   [exec] (Suspender) {systemctl suspend} </usr/share/icons/gnome/16x16/actions/player_pause.png>
   [exit] (Cerrar Sesión) </usr/share/icons/gnome/16x16/actions/system-log-out.png>
 [end]
```

---

# TRUCO: Que el GRUB recuerde tu última elección

Para no tener que entrar a "Opciones avanzadas" cada vez que quieras arrancar con Systemd o SysVinit, podemos decirle al GRUB que guarde la última opción que seleccionaste.

1. Abre una terminal y edita la configuración del grub:

```bash
sudo nano /etc/default/grub
```

en mi caso en MX Linux 23 XFCE me aparece:

```
GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(unset PRETTY_NAME; (. /etc/lsb-release; echo ${PRETTY_NAME:?}) 2>/dev/null || e>
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
GRUB_CMDLINE_LINUX=""
```
  
2. En línea que dice `GRUB_DEFAULT=0`.
   Coméntala poniendo un `#` al inicio de la línea y añade estas dos líneas debajo:
   
```
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```

me queda así:

```
# GRUB_DEFAULT=0
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(unset PRETTY_NAME; (. /etc/lsb-release; echo ${PRETTY_NAME:?}) 2>/dev/null || e>
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
GRUB_CMDLINE_LINUX=""
```

3. Guarda el archivo (`Ctrl+O`, `Enter`).
4. Actualiza el grub para aplicar los cambios:  

```bash
sudo update-grub
```

**Resultado:** La próxima vez que entres, el sistema arrancará con la opción que usaste la última vez. Si seleccionaste la versión con systemd, la próxima vez arrancará solo con esa. Si quieres volver a la normal, seleccionas la por defecto una vez y ya.

---

# APARTADO EDUCATIVO: La Batalla de los Init Systems

¿Por qué existen dos formas y por qué MX Linux eligió SysVinit por defecto?

## 1. Systemd (El Gigante Moderno)
Es el estándar de facto en el mundo Linux hoy en día.

*   **Filosofía:** "Haz todo junto". Systemd no solo inicia el sistema, también gestiona el inicio de sesión, el nombre del PC (hostname), la hora, los registros (logs) y las conexiones de red.
*   **Ventajas:**
    *   **Velocidad:** Inicia servicios en paralelo (muchos a la vez), por lo que el arranque es muy rápido en ordenadores modernos.
    *   **Compatibilidad:** La mayoría de software nuevo está diseñado pensando en Systemd. Los tutoriales en internet funcionan a la primera.
    *   **Gestión:** Es muy fácil ver el estado de todo el sistema con un solo comando (`systemctl`).

## 2. SysVinit (El Clásico)
Es lo que usa MX Linux por defecto. Es el sistema heredado de Unix.

*   **Filosofía:** "Haz una cosa y hazla bien". Usa scripts sencillos (Bash) separados para cada tarea. Si falla el servidor de gráficos, no afecta al de red, porque son scripts independientes.
*   **Ventajas:**
    *   **Transparencia:** Todo son archivos de texto que puedes leer y editar. Si algo falla, es fácil depurarlo.
    *   **Estabilidad:** Es extremadamente maduro y probado. No cambia constantemente.
    *   **Ligereza:** Tiene menos dependencias y procesos corriendo en segundo plano.

# ¿Por qué MX Linux eligió SysVinit?

Es posible que tu intuición sobre la velocidad esté parcialmente en lo cierto, pero con matices:

SysVinit **no es más rápido** arrancando (de hecho, Systemd suele ganar ahí porque lanza todo a la vez). Sin embargo, SysVinit se siente **más ligero y "ágil"** una vez que el sistema está en marcha porque no tiene un demonio gigante consumiendo RAM y gestionando absolutely todo.

MX Linux se dirige mucho a usuarios que quieren "resucitar" ordenadores viejos o que quieren tener control total.

1.  **Estabilidad ante todo:** Para un equipo de producción o un PC viejo, que el sistema arranque siempre igual y sea predecible es más valioso que arrancar 2 segundos más rápido.
2.  **Depuración:** Si algo se rompe en SysVinit, abres el script y lo arreglas. Si algo se rompe en Systemd, a veces es un "caja negra" binaria difícil de solucionar.
3.  **Pura tradición Debian:** Antes de que Debian cambiara a Systemd, usaba SysVinit. MX Linux mantuvo esa esencia.

**En resumen:**

*   Usa **Systemd** si quieres comodidad, que todo funcione "out of the box" y arrancar lo más rápido posible.
*   Usa **SysVinit** si quieres aprender cómo funciona Linux realmente, tener un sistema minimalista y estable, y seguir la filosofía original de MX Linux.