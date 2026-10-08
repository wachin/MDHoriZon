# Cómo instalar Warp Terminal en Linux desde el paquete `.deb` y dejarlo listo para usar

Si estás buscando un terminal moderno para Linux que combine la potencia de la línea de comandos con funciones de inteligencia artificial, **Warp** es una opción que vale la pena probar. En esta entrada te explico paso a paso cómo instalarlo desde el paquete `.deb` oficial, cómo iniciar sesión y cómo ajustar la interfaz para que no se vea gigante (un problema muy común en Linux, sobre todo en entornos X11).

> **Nota:** Este tutorial está pensado para distribuciones basadas en Debian/Ubuntu y derivados, que son las que usan paquetes `.deb`. Si usas otra distro, consulta la sección de descargas de Warp para ver los formatos disponibles.

---

## Paso 1: Descargar el paquete `.deb`

1. Abre tu navegador y ve a la página oficial de descargas:  
   **https://www.warp.dev/download**

2. Busca la sección correspondiente a **Linux**.

3. Verás distintas opciones de descarga (`.deb`, `.rpm`, AppImage, etc.). Elige el paquete **`.deb`**, que es el formato nativo de Debian, Ubuntu, Linux Mint, Pop!_OS y otras distros derivadas.

4. Guarda el archivo en tu carpeta de descargas o donde prefieras.

---

## Paso 2: Instalar el paquete

Abre una terminal (puede ser tu terminal actual, no hace falta que sea Warp todavía) y navega hasta la carpeta donde descargaste el archivo. Después ejecuta:

```bash
sudo dpkg -i nombre-del-archivo.deb
```

Sustituye `nombre-del-archivo.deb` por el nombre real del paquete que descargaste.

Si `dpkg` se queja de dependencias faltantes, puedes resolverlo con:

```bash
sudo apt-get install -f
```

Esto instalará automáticamente cualquier librería que Warp necesite y que no estuviera ya en tu sistema.

Una vez termine, ya puedes lanzar Warp desde el menú de aplicaciones de tu entorno de escritorio o escribiendo `warp-terminal` en la terminal.

---

## Paso 3: Iniciar sesión en Warp

La primera vez que abras Warp, te pedirá **iniciar sesión**. Esto es normal: Warp usa una cuenta para sincronizar tus preferencias y habilitar sus funciones basadas en IA.

El proceso es sencillo:

1. Warp abrirá automáticamente tu **navegador web** en la página de autenticación.
2. Inicia sesión con el método que prefieras (correo, Google, GitHub, etc.).
3. Cuando el navegador confirme la autenticación, vuelve a Warp: la aplicación detectará que ya estás logueado y continuará con la configuración inicial.

Si por alguna razón el navegador no se abre solo, Warp suele mostrar un enlace que puedes copiar y pegar manualmente.

---

## Paso 4: Ajustar el zoom si la interfaz se ve gigante

Este es un detalle muy importante, porque en muchas instalaciones de Linux la interfaz de Warp aparece **demasiado grande**, con las letras y los menús varias veces más grandes de lo normal. Esto ocurre sobre todo en sistemas con escalado fraccional o en entornos X11 como Fluxbox, i3, Openbox, etc.

La solución está dentro de la propia aplicación y es muy fácil:

1. Una vez dentro de Warp, mira la **esquina superior derecha** de la ventana. Verás el **logotipo o avatar de tu usuario**.
2. Haz clic allí para desplegar el menú.
3. Selecciona **"Settings"** (Ajustes).
4. Dentro de los ajustes, busca la sección **"Apariencia"** (o *Appearance*).
5. Localiza la opción **"Zoom"**. Verás un selector de porcentajes.
6. Elige el porcentaje que mejor se adapte a tu pantalla. Un valor del **50%** suele funcionar bien en pantallas HiDPI o con escalado del sistema, aunque puedes probar otros valores hasta encontrar el que te resulte cómodo.

El cambio se aplica al instante y afecta a **toda la interfaz**: menús, pestañas, paneles y texto. No necesitas reiniciar Warp.

---

## Consejos finales

- Si actualizas Warp más adelante con `sudo dpkg -i` sobre una versión nueva, tus ajustes (incluido el zoom) se conservan.
- Si en algún momento quieres restablecer la configuración, puedes hacerlo desde el mismo menú de *Settings*.
- Warp tiene integración con Thunar y otros gestores de archivos mediante acciones personalizadas. Si te interesa abrir Warp directamente en la carpeta que estás viendo, te recomiendo investigar las **acciones personalizadas de Thunar**; es una combinación muy práctica.

---
