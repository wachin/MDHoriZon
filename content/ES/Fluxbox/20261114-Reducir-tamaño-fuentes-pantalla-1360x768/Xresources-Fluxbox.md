# Cómo reducir el tamaño de las fuentes en Fluxbox (ideal para pantallas 1360x768)

Si utilizas **Fluxbox** en monitores con resoluciones como **1360x768** o **1366x768**, es muy común notar que tanto los menús del gestor de ventanas como las letras de las aplicaciones se ven ligeramente grandes, restando espacio útil en pantalla.

A diferencia de entornos de escritorio completos, Fluxbox no incluye un panel gráfico para escalar la interfaz. Sin embargo, podemos ajustar el tamaño global de todas las tipografías de forma limpia y permanente modificando el valor de **DPI** en el servidor gráfico X11 mediante el archivo `~/.Xresources`.

### Paso 1: Configurar el valor de DPI en `.Xresources`

Abre una terminal y crea o edita el archivo `.Xresources` en tu carpeta personal:

```bash
nano ~/.Xresources

```

Agrega la siguiente línea al archivo:

```text
Xft.dpi: 84

```

> **Nota sobre los valores:** El valor estándar en la mayoría de sistemas Linux es `96`. Bajarlo a `84` o `80` reduce proporcionalmente el tamaño de todas las fuentes sin deformarlas. Puedes probar distintos números hasta encontrar el que mejor se adapte a tu vista.

Guarda los cambios en `nano` presionando `Ctrl + O`, luego `Enter`, y sal con `Ctrl + X`.

---

### Paso 2: Aplicar los cambios cerrando la sesión

Cierre la sesión y vuelva a entrar para ver los cambios

---

### Paso 3: Hacer que el cambio sea permanente al iniciar sesión

Fluxbox no siempre carga automáticamente el archivo `~/.Xresources` al arrancar, por lo que debemos asegurarnos de incluirlo en su script de inicio.

Abre el archivo `startup` de Fluxbox:

```bash
nano ~/.fluxbox/startup

```

Busca la línea final que dice `exec fluxbox` y, **justo antes de esa línea**, añade la instrucción `xrdb -merge ~/.Xresources &`. El final del archivo debe verse así:

```bash
# Cargar configuración de fuentes y DPI
xrdb -merge ~/.Xresources &

# Iniciar Fluxbox
exec fluxbox

```

Guarda y cierra el editor (`Ctrl + O`, `Enter`, `Ctrl + X`).

---

### Paso 4: Recargar Fluxbox

Finalmente, haz clic derecho en cualquier parte vacía del escritorio para abrir el menú de Fluxbox y selecciona **Reconfigure** (o ejecuta `fluxbox-remote reconfigure` en la terminal).

Tanto la barra de tareas, el reloj y los títulos de las ventanas de Fluxbox como tus aplicaciones lucirán ahora mucho más compactos y mejor aprovechados en pantalla.

---
