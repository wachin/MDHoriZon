# GXKB: Un sencillo indicador de teclado para MX Linux 23

![](images/Portada.jpg)

Si utilizas más de una distribución de teclado en Linux, seguramente te ha pasado que necesitas cambiar constantemente entre español, inglés u otros idiomas. Aunque muchos entornos de escritorio incluyen herramientas para ello, existe una pequeña utilidad disponible en los repositorios de MX Linux 23 llamada **GXKB**, que destaca por ser ligera, simple y compatible con prácticamente cualquier gestor de ventanas.

## ¿Qué es GXKB?

Según la descripción de los repositorios:

> GXKB es un pequeño indicador para X11 que permite cambiar rápidamente entre diferentes distribuciones de teclado. Muestra una bandera correspondiente al país del diseño de teclado activo en el área de notificación.

Está escrito en lenguaje **C** utilizando la biblioteca **GTK+**, por lo que no depende de componentes de GNOME y consume muy pocos recursos del sistema.

Esto lo convierte en una excelente opción para usuarios de:

* Fluxbox
* Openbox
* IceWM
* JWM
* XFCE
* LXDE
* Otros gestores de ventanas ligeros

## Instalación

En MX Linux 23 puede instalarse desde Synaptic o mediante la terminal:

```bash
sudo apt install gxkb
```

Una vez instalado, puede ejecutarse desde el menú de aplicaciones o desde una terminal:

```bash
gxkb
```

## Configuración previa del teclado

GXKB no configura por sí mismo las distribuciones de teclado. Primero debes tener definidas varias distribuciones en tu sistema.

Por ejemplo:

```bash
setxkbmap -layout "es,us"
```

Esto configura los teclados:

* Español
* Inglés (Estados Unidos)

Después de ejecutar GXKB, podrás alternar entre ellos con un clic.

## Cómo funciona

Cuando GXKB está en ejecución aparece un pequeño icono en la bandeja del sistema.

En la siguiente captura podemos ver dos distribuciones configuradas:

* 🇪🇸 Español
* 🇺🇸 Inglés (Estados Unidos)

y la distribución activa aparece resaltada.

![GXKB mostrando Español e Inglés](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj-placeholder/s320/gxkb.png)

En mi caso lo utilizo para alternar rápidamente entre:

* Español (Latinoamericano)
* Inglés (US)

sin necesidad de abrir configuraciones del sistema.

## Ventajas de GXKB

### Muy ligero

Consume muy poca memoria RAM y prácticamente nada de CPU.

### Independiente del escritorio

Funciona incluso en entornos mínimos donde no existen indicadores de teclado integrados.

### Uso sencillo

No requiere configuraciones complicadas ni dependencias pesadas.

### Indicador visual inmediato

La bandera permite identificar rápidamente qué distribución está activa.

## Inicio automático

Si deseas que GXKB se inicie al arrancar tu sesión, puedes añadirlo a los programas de inicio.

Por ejemplo, en Fluxbox puedes agregar:

```bash
gxkb &
```

al archivo:

```text
~/.fluxbox/startup
```

En otros escritorios puede añadirse mediante el gestor de aplicaciones de inicio correspondiente.

## Mi experiencia

En equipos modestos y gestores de ventanas ligeros, GXKB resulta una solución muy práctica. Es especialmente útil cuando se trabaja frecuentemente en español e inglés, ya que permite saber de un vistazo qué distribución está activa y cambiarla rápidamente con un clic.

Aunque existen alternativas más modernas, pocas son tan ligeras y sencillas como GXKB.

## Referencias

### GXKB

```text
https://packages.debian.org/search?keywords=gxkb
```

### MX Linux

```text
https://mxlinux.org/
```

### X Keyboard Extension (XKB)

```text
https://www.x.org/releases/current/doc/xorg-docs/input/XKB-Config.html
```
