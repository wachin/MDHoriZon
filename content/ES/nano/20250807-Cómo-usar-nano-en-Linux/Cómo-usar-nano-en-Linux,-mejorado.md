# Cómo usar Nano en Linux (Pensado para usuarios de Windows)

Si vienes de Windows, estás acostumbrado a programas como **Bloc de notas** o **Word** donde todo se hace con el mouse. En Linux también existen programas gráficos, pero muchas veces necesitarás editar archivos **desde la terminal (pantalla negra)**.

Aquí es donde entra **Nano**.

👉 **Nano es como el “Bloc de notas” pero dentro de la terminal.**

Es fácil de usar y perfecto para empezar.

---

# ¿Para qué sirve Nano?

Nano es ideal para:

* Editar archivos importantes del sistema
* Crear archivos de texto rápidamente
* Trabajar en servidores (sin interfaz gráfica)

---

# Concepto CLAVE (muy importante)

⚠️ En Nano **no usas el mouse como en Windows** (aunque a veces funciona). Todo se hace con el teclado.

---

# Abrir o crear un archivo

Abre la terminal y escribe:

```bash
nano miarchivo.txt
```

👉 Si el archivo existe → lo abre  
👉 Si no existe → lo crea automáticamente en su HOME

💡 Esto es normal en Linux (a diferencia de Windows)  

---

# ¿Qué verás en pantalla de nano?

* Un área grande para escribir (como Bloc de notas)
* Abajo aparecen comandos como:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFw4iTcr9nAnUhtBUJD2Q5wl-QFyEagF0v6JlqncJH0lnYaoJRqx_vVEfnCbuWpjpxQTX7FKMXotYDWeXQRKiQYODqX2o7twrQSxOh71fBa0yZAD9OCsWRH33YlaKgWiB4RK0vT8WiLQwQY_cO5e9fYPbySgftsX6pclogY5tEkkPq7ngOUvG0hfJ0o4k/s915/Las%20opciones%20de%20nano.png)

## **Atajos de teclado en Nano, que aparecen en la parte inferior (explicados)**

esto es lo que significa cada uno de ellos:

* Ctrl + G (`^G`) → **(Ayuda)** Abre la ayuda de Nano
* Ctrl + O (`^O`) → **(Guardar)** Guarda el archivo (como Ctrl + S en Windows)
* Ctrl + W (`^W`) → **(Buscar)** Busca texto dentro del archivo
* Ctrl + K (`^K`) → **(Cortar)** Corta la línea actual o el texto seleccionado (es especie de “portapapeles interno” llamado **búfer de corte** y lo deja allí hasta que lo uses)
* Ctrl + T (`^T`) → **(Ejecutar)** Ejecuta comandos o herramientas externas
* Ctrl + C (`^C`) → **(Ubicación)** Muestra la línea y columna donde estás
* **Esc** + U (`M-U`) → **(Deshacer)** Deshace la última acción (como Ctrl + Z)
* Ctrl + X (`^X`) → **(Salir)** Cierra Nano
* Ctrl + R (`^R`) → **(Leer archivo)** Inserta el contenido de otro archivo
* Ctrl + \ (`^\`) → **(Reemplazar)** Busca y reemplaza texto
* Ctrl + U (`^U`) → **(Pegar)** Pega lo que cortaste
* Ctrl + J (`^J`) → **(Justificar)** Ordena el texto en párrafos
* Ctrl + / (`^/`) → **(Ir a línea)** Permite ir a una línea específica
* **Esc**+ E (`M-E`) → **(Rehacer)** Rehace una acción deshecha

## Explicación

👉 En Nano, verás que muchos comandos comienzan con:

* `^` → significa **Ctrl**
* `M-` = Meta → significa **Alt**, pero en muchas terminales no funciona **Alt** para esto sino que aparece un menú arriba (Archivo, Editar, etc.), y específicamente si la tienes presionada por dos segundos verás todas las combinaciones de letras con la que funciona, En este tutorial la `M` significará `Esc` no `Alt`

Ejemplo:

* `^O` = **Ctrl + O** = Guardar
* `M-U` = **Esc + U** = Deshacer


---

# Cómo evitar problemas demasiados comunes usando nano al presionar varias teclas

Cuando uses nano no uses combinaciones de teclas que no sabes que es lo que hacen, ejemplo "Esc + i" pues en otras combinaciones es posible que en nano se vaya a parar su funcionamiento esperando que ingreses algo, pero no vas a saber qué es lo que hay que hacer, así por eso en nano sólo usa combianaciones de teclas modificadorass si sabes lo que estás haciendo, esto para evitar perder tiempo y dolores de cabeza inecesarios. Y si bien en este tutorial espero poder explicar lo mejor posible cómo usar nano, si deseas tocar alguna combinación de teclas que en tu mente te imagines pregutale primero a una IA antes de hacerlo.

## Teclas Modificadoras (las que se combinan con otras)

|   Tecla   |    Nombre completo    |    Nombre en español    |                                     Función principal                                      |
| --------- | --------------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| **Ctrl**  | **Control**           | Tecla Control           | Modifica el comportamiento de otras teclas para ejecutar comandos (ej: `Ctrl+K` en nano).  |
| **Alt**   | **Alternate**         | Tecla Alternar          | Accede a funciones secundarias o menús (debería ser `Alt` para nano, pero funciona `Esc`). |
| **Shift** | **Shift**             | Mayús / Tecla de cambio | Escribe mayúsculas o el símbolo superior de una tecla. También extiende selecciones.       |
| **AltGr** | **Alternate Graphic** | Alt Gráfico             | Accede a terceros símbolos en teclas (ej: `@`, `#`, `€` en teclados latinos).              |

## Otras teclas especiales relacionadas

|             Tecla             |                     Nombre                      |                             Función en atajos                              |
| ----------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- |
| **Esc**                       | Escape                                          | En nano funciona como Alt → `M`                                            |
| **Super** / **Win** / **Cmd** | Tecla Windows (Linux/Windows) o Command (macOS) | Puede que no funcione en algunos Linux, habría que configuarla para usarla |
| **Fn**                        | Function                                        | En portátiles, combina con F1-F12 para controlar brillo, volumen, etc.     |

---

### Consejo práctico para principiantes

1. **Primero presiona y mantén** la tecla modificadora (`Ctrl`, `Esc`, etc.).
2. **Sin soltarla**, pulsa la segunda tecla (letra, número o símbolo).
3. **Suelta ambas** al finalizar.

> Ejemplo: Para `Ctrl + K` en nano → mantén `Ctrl` presionado → pulsa `K` → suelta ambas.

---

### ¿Y en mi teclado físico?

- **Ctrl**: Suele estar en las esquinas inferiores, a veces abreviada como `Ctrl`.
- **Alt**: A ambos lados de la barra espaciadora (en este tutorial no nos sirve para nano, pero si es un atajo del menú de la terminal)
- **AltGr**: A la derecha de la barra espaciadora (en teclados internacionales).
- **Shift**: Flecha hacia arriba ⇧, a ambos lados del teclado.
- **Esc**: Esquina superior izquierda → `M`

¿Estás usando un teclado en español (Latinoamérica o España)? Ponle esos datos de tu distribución a una IA para que te pueda indicar dónde encontrar símbolos específicos o cómo configurar atajos personalizados. Por cierto yo vivo en Ecuador y nunca he visto en ninguna tienda un teclado "Latinoamericano", todos los teclados que venden son en español España, le aconsejo usar ese en la confiuración de su Linux para que ejemplo las tíldes coincidan con el teclado.

---

# Cómo evitar problemas comunes al usar Nano

Cuando uses Nano, es importante entender que muchas combinaciones de teclas activan funciones especiales.

👉 Si presionas combinaciones sin saber qué hacen (por ejemplo: `Esc + I` u otras), puede parecer que Nano “se queda esperando algo” o que deja de responder como esperabas.

Pero no te preocupes Nano **no se ha bloqueado**,  lo que ocurre es que activaste alguna función o comando y Nano está esperando que completes una acción. Por ejemplo:

* Buscar texto
* Ir a una línea
* Activar/desactivar una opción

¿Cómo solucionarlo? Muy fácil Presiona:

* `Esc`
* o `Enter`
* o `Ctrl + C`

✔ Esto cancela la acción actual (o debería de hacerlo)
✔ Nano vuelve a la normalidad (o debería de volver)

Al comenzar a usar Nano:

👉 Usa solo estos comandos básicos:

* `Ctrl + O` → Guardar
* `Ctrl + X` → Salir (si se presiona atajos para experimentar y no se sabe que se está haciendo, no quedará otra que salir y luego volver a entrar)
* `Ctrl + W` → Buscar

👉 Y poco a poco puedes ir aprendiendo los demás.

---

# Problema El búfer de cortado está vacío”

A veces, al usar Nano, puede aparecer este mensaje:

```plaintext
[ El búfer de cortado está vacío ]
```

👉 Nano tiene una especie de “portapapeles interno” llamado **búfer de corte**. Ese búfer se llena cuando usas:

* **Ctrl + K** → cortar texto

Y se usa cuando haces:

* **Ctrl + U** → pegar texto

Este mensaje aparece cuando intentas **pegar (Ctrl + U)** sin haber cortado nada antes.

👉 Es como presionar “pegar” en Windows sin haber copiado nada, solo que en Linux te muestra ese mensaje.

Cuando aparece este mensaje:

👉 Nano **queda esperando una acción válida**  
👉 Y algunos atajos pueden parecer que “no funcionan”  

 ¿Cómo solucionarlo? (la más segura)

Presiona:

```
Esc  y luego U
```

---

# Escribir y moverse

Dentro de Nano puedes:

* Escribir normalmente
* Usar flechas del teclado para moverte
* Borrar con:

  * Backspace (←)
  * Delete (Supr)

---

# Guardar archivo

👉 Presiona:

```
CTRL + O
```

Luego:

```
Enter
```

Para escribir en el archivo

---

# Salir de Nano

👉 Presiona:

```
CTRL + X
```

---

# Cómo copiar un texto y pegarlo en otro lado

Para dos soluciones **dentro de `nano`** o **entre `nano` y otras aplicaciones**

## Copiar dentro de `nano` (portapapeles interno del editor)

`nano` no usa `Ctrl+C` / `Ctrl+V` para copiar y pegar. Tampoco en nano se usa Shift para tenerlo presionado y seleccionar texto, sino que tiene su propio sistema:

### **Copiar una línea completa:** 

1. Estando ubicado en cualquier lugar de una línea presione `Esc` + `6`; Parece que no ha sucedido nada, pero ya se ha **copiado** toda la línea
2. **Pegar:** `Ctrl + U` (en cualquier parte del archivo abierto)
 

### **Copiar un bloque de texto:**

1. Colocate al inico o final de un texto que quieras copiar y presiona `Ctrl + 6` → activa el modo selección.
2. Mueve el cursor con las **flechas** para sombrear el texto según donde te hayas ubicado será a la izquierda o derecha.
3. `Esc` + `6` → **copia** lo seleccionado.
4. **Pegar:** `Ctrl + U` (en cualquier parte del archivo abierto)

---

## Copiar entre `nano` y otras aplicaciones (terminal/sistema)

Para pasar texto de `nano` a otra ventana (o al revés), usa los atajos de tu **terminal**:

- **Linux / macOS:** `Ctrl + Shift + C` (copiar) / `Ctrl + Shift + V` (pegar)
- **Windows (Terminal / PowerShell):** `Ctrl + C` / `Ctrl + V`
- **Con el ratón (Linux/X11/Wayland):** Selecciona con clic izquierdo → se copia automáticamente. Pega con clic central del ratón o `Shift + Insert`.

o también, en la terminal, selecciona el texto y has clic derecho y copiar, y ve a tu otro programa y pegalo con clic derecho pegar.

`nano` mantiene su portapapeles aislado del sistema. Si necesitas intercambiar texto frecuentemente, lo más rápido es usar los atajos de la terminal o la selección con el ratón.

---

# Búsqueda de texto

Para buscar texto dentro de un archivo:

1.  Presiona `Ctrl + W` (abreviado como `^W` en Nano).
2.  Escribe el texto que deseas buscar y presiona **Enter**.
3.  Nano te llevará a la primera coincidencia. Para buscar la siguiente coincidencia, presiona `Ctrl + W` nuevamente y luego **Enter**.

**Consejo**: Si deseas que la búsqueda no distinga entre mayúsculas y minúsculas, presiona `Alt + C` antes de comenzar la búsqueda.

**Ejemplo práctico**: Si buscas la palabra "configuración":

1.  Presiona `Ctrl + W`.
2.  Escribe "configuración" y presiona **Enter**.
3.  Nano resaltará la primera coincidencia. Usa `Ctrl + W` para buscar la siguiente.

---

# Ir a una línea específica

👉 Muy útil cuando hay errores

Presiona:

```
Ctrl + _
```

Luego escribe el número de línea:

```
42
```

Enter

---

# ¿Cómo seleccionar mucho texto y borrarlo en Nano?

Nano **no tiene selección con el mouse** para cortar texto en modo consola pura (solo funciona en terminales gráficas con soporte de ratón), pero puedes **usar atajos de teclado para marcar bloques de texto y eliminarlos**:

**Pasos**:

1.  **Ubica el cursor al inicio del texto** que quieres borrar.

2.  **Presiona `Esc + A`** Esto activa el **modo de selección** (marca establecida) y si lo presionas otra vez lo desactivas (marca borrada)

3.  **Mueve el cursor** con las teclas de flecha para seleccionar el bloque deseado (verás que el cursor empieza a marcar texto a medida que te mueves).

4.  **Presiona `Ctrl + K`** para **cortar** el texto seleccionado (saca de allí ese texto y lo mueve
5.  al portapapeles interno de Nano).

5.  Puedes luego pegarlo en otro lugar con `Ctrl + U`, si lo necesitas.

**Ejemplo práctico:**

Supón que quieres borrar cinco líneas completas:

-   Coloca el cursor en el inicio de la primera línea.

-   Presiona `Esc + A`.

-   Baja con la flecha ↓ hasta seleccionar las cinco líneas.

-   Presiona `Ctrl + K`.

---

# Consejos importantes

* Si te pierdes → presiona:

```
Ctrl + G
```

para ver la ayuda

* Para ver el manual:

```bash
man nano
```

---

# Toda la ayuda de  `Ctrl + G`

A continuación la ayuda de `Ctrl + G` de forma más entendible:

---

# Guía de Referencia de Nano

El editor **nano** está diseñado para emular la funcionalidad y sencillez de uso del editor de texto UW Pico. La interfaz consta de cuatro secciones principales:

1.  **Línea superior:** Muestra la versión del programa, el nombre del fichero que se está editando y si ha sido modificado.
2.  **Ventana principal:** Muestra el contenido del archivo.
3.  **Línea de estado:** Es la tercera línea empezando por abajo; muestra mensajes importantes.
4.  **Líneas de atajos:** Las dos últimas líneas muestran las combinaciones de teclas más utilizadas.

## 🗝️ Convenciones de Teclado

Para entender las combinaciones de teclas:

*   **`^` (Ctrl):** Indica la tecla **Control**. Se puede pulsar `Ctrl` o dos veces `Esc`.
*   **`M-` (Meta):** Indica la tecla **Meta**. Se puede introducir con las teclas `Alt`, `Cmd` o `Esc`, dependiendo de su configuración de teclado.
*   **Códigos decimales:** Si pulsa dos veces `Esc` y escribe un código decimal de tres dígitos (entre 000 y 255), introducirá el carácter correspondiente.

---

## 📂 Archivo y Salida

| Atajo | Alternativa | Descripción |
| :--- | :--- | :--- |
| **`^G`** | `F1` | Mostrar esta ayuda |
| **`^X`** | `F2` | Cerrar el búfer actual / Salir de nano |
| **`^O`** | `F3` | Escribir el búfer actual (o la región marcada) a disco |
| **`^R`** | `Ins` | Insertar otro fichero en el búfer actual (o en un nuevo búfer) |
| **`^S`** | | Guardar fichero sin preguntar |

## ✂️ Edición, Cortar y Pegar

| Atajo | Alternativa | Descripción |
| :--- | :--- | :--- |
| **`^K`** | `F9` | Cortar la línea actual (o la región marcada) y guardarla en el cutbuffer |
| **`^U`** | `F10` | Pegar el contenido del cutbuffer en la posición del cursor |
| **`M-A`** | `^6` | Marcar texto desde la posición actual del cursor |
| **`M-6`** | `M-^` | Copiar la línea actual (o la región marcada) y guardarla en el cutbuffer |
| **`M-T`** | | Cortar desde el cursor hasta el final del fichero |
| **`M-Del`** | | Desechar la línea actual (o la región marcada) |

## 🔍 Búsqueda y Reemplazo

| Atajo | Alternativa | Descripción |
| :--- | :--- | :--- |
| **`^W`** | `F6` | Buscar hacia delante una cadena o expresión regular |
| **`^Q`** | | Buscar hacia atrás una cadena o expresión regular |
| **`M-W`** | | Seguir buscando hacia delante |
| **`M-Q`** | | Seguir buscando hacia atrás |
| **`^\`** | `M-R` | Reemplazar una cadena o expresión regular |
| **`^]`** | | Intenta completar la palabra actual |

## 📍 Navegación del Cursor

### Movimiento Básico
| Atajo | Alternativa | Descripción |
| :--- | :--- | :--- |
| **`^B`** | `◂` | Ir hacia atrás un carácter |
| **`^F`** | `▸` | Ir hacia delante un carácter |
| **`^P`** | `▴` | Ir a la línea anterior |
| **`^N`** | `▾` | Ir a la siguiente línea |

### Movimiento por Palabras y Líneas
| Atajo | Alternativa | Descripción |
| :--- | :--- | :--- |
| **`^◂`** | `M-Espacio` | Ir hacia atrás una palabra |
| **`^▸`** | `^Espacio` | Ir hacia delante una palabra |
| **`^A`** | `Home` | Ir al principio de la línea actual |
| **`^E`** | `End` | Ir al final de la línea actual |

### Movimiento por Bloques y Pantalla
| Atajo | Alternativa | Descripción |
| :--- | :--- | :--- |
| **`^Y`** | `Re Pág` | Ir una pantalla hacia arriba |
| **`^V`** | `Av Pág` | Ir una pantalla hacia abajo |
| **`^▴`** | `M-7` | Ir al bloque de texto anterior |
| **`^▾`** | `M-8` | Ir al siguiente bloque de texto |

### Movimiento Avanzado
| Atajo | Alternativa | Descripción |
| :--- | :--- | :--- |
| **`M-\`** | `^Home` | Ir a la primera línea del fichero |
| **`M-/`** | `^End` | Ir a la última línea del fichero |
| **`M-(`** | `M-9` | Ir al principio del párrafo; después, al del anterior |
| **`M-)`** | `M-0` | Ir al final del párrafo; después, al del siguiente |
| **`M-]`** | | Ir a la llave correspondiente (bracket matching) |
| **`^C`** | `F11` | Mostrar la posición del cursor (línea/columna) |
| **`^/`** | `M-G` | Ir a una línea y columna específicas |

## 🛠️ Herramientas y Formato

| Atajo | Alternativa | Descripción |
| :--- | :--- | :--- |
| **`^J`** | `F4` | Justificar el párrafo actual |
| **`M-J`** | | Justificar el fichero completo |
| **`^T`** | | Ejecutar una función o una orden externa |
| **`M-F`** | | Invocar un programa para aplicar formato/organizar el búfer |
| **`F12`** | | Invocar el corrector ortográfico (si está disponible) |
| **`M-B`** | | Invocar el corrector de sintaxis (si está disponible) |
| **`M-D`** | | Contar el número de líneas, palabras y caracteres |

## ⌨️ Edición de Texto

| Atajo | Alternativa | Descripción |
| :--- | :--- | :--- |
| **`^I`** | `Tab` | Insertar un tabulación (o sangrar líneas marcadas) |
| **`^M`** | `Enter` | Insertar un retorno de carro |
| **`^H`** | `Retroceso` | Borrar el carácter a la izquierda del cursor |
| **`^D`** | `Supr` | Borrar el carácter bajo el cursor |
| **`M-Bsp`** | `May-Supr`| Borrar hacia atrás desde el cursor hasta el principio de palabra |
| **`^Del`** | | Borrar hacia delante desde el cursor hasta el principio de siguiente palabra |
| **`M-V`** | | Insertar la próxima pulsación literalmente |
| **`M-}`** | | Sangrar la línea actual (o las líneas marcadas) |
| **`M-{`** | `May-Tab` | Quitar sangrado de la línea actual (o las líneas marcadas) |
| **`M-3`** | | Comentar/descomentar la línea actual (o las líneas marcadas) |

## ⚙️ Macros y Anclas

| Atajo | Descripción |
| :--- | :--- |
| **`M-:`** | Iniciar/parar grabación de macro |
| **`M-;`** | Ejecutar la última macro grabada |
| **`M-Ins`** | Coloca o retira un ancla en la línea actual |
| **`M-Re Pág`** | Salta hacia atrás hasta el ancla más cercana |
| **`M-Av Pág`** | Salta hacia delante hasta el ancla más cercana |

## 🎛️ Configuración y Toggles (Activar/Desactivar)

Estas combinaciones activan o desactivan opciones específicas del editor.

| Atajo | Opción |
| :--- | :--- |
| **`^Z`** | Suspender el editor (vuelve a la consola) |
| **`^L`** | Redibujar la pantalla actual / Centrar la línea del cursor |
| **`M-Z`** | Interfaz oculta (Soft wrapping) |
| **`M-X`** | Modo de ayuda |
| **`M-C`** | Muestra constante de la posición del cursor |
| **`M-S`** | Ajuste suave de líneas largas |
| **`M-N`** | Numeración de líneas |
| **`M-P`** | Muestra blancos (espacios y tabuladores) |
| **`M-Y`** | Coloreado de sintaxis |
| **`M-H`** | Tecla de inicio inteligente (Smart Home Key) |
| **`M-I`** | Auto-sangrado |
| **`M-K`** | Cortado desde el cursor hasta el final de línea |
| **`M-L`** | Ajuste estricto de líneas largas |
| **`M-O`** | Conversión de pulsaciones de tabulador a espacios |
| **`M-M`** | Soporte para ratón |
| **`M-◂`** | Cambiar al búfer de fichero anterior |
| **`M-▸`** | Cambiar al siguiente búfer de fichero |
| **`M-▴`** | `M--` : Remontar una línea sin mover el cursor textualmente |
| **`M-▾`** | `M-+` : Descender una línea sin mover el cursor textualmente |

## Deshacer y Rehacer

| Atajo | Descripción |
| :--- | :--- |
| **`M-U`** | Deshacer la última operación |
| **`M-E`** | Rehacer la última operación deshecha |

---

Dios les bendiga

---
