# 📘 Guía Didáctica: Píxeles vs Resolución (PPP/PPI) en GIMP

# El Concepto Clave: La Resolución

La resolución actúa como un puente entre el mundo digital (píxeles) y el mundo físico (centímetros, pulgadas). Se mide en **ppp** (píxeles por pulgada) o **dpi** (dots per inch) .

La fórmula es: **Tamaño Físico = Número de Píxeles / Resolución**

Por ejemplo, una imagen de 3000 píxeles de ancho puede imprimirse a 10 pulgadas (25.4 cm) si usamos una resolución de 300 ppp, o a 41.6 pulgadas (105 cm) si usamos 72 ppp. En pantalla, siempre se ven por píxeles.

## Objetivo de la lectura
Al finalizar este tutorial el lector podrá:

- Diferenciar claramente entre píxeles y resolución.
- Calcular el tamaño real de impresión.
- Entender por qué en pantalla el PPP no afecta la imagen.
- Aplicar correctamente estos conceptos en GIMP.

---

## Idea Central
Una imagen digital tiene DOS propiedades independientes:

1. Tamaño en píxeles (px)
2. Resolución (PPP / PPI)

⚠️ Son conceptos diferentes.
⚠️ Cumplen funciones distintas.

---

# Diferencia entre **tamaño en píxeles** y **resolución (ppp / ppi / dpi)**

## 1. EXPLICACIONES PREVIAS

Una imagen digital tiene DOS cosas diferentes:

1️⃣ Tamaño en píxeles  
2️⃣ Resolución de impresión  

Nunca son lo mismo.

---

## 2. ¿QUÉ ES UN PÍXEL?

Un píxel es el cuadrito más pequeño de una imagen digital.

![Ejemplo de pixeles](images/diagrama_pixeles.png)

Si una imagen mide 10 x 10 píxeles, tiene 100 cuadritos.

En pantalla SOLO importa esto.

---

## 3. ¿QUÉ ES RESOLUCIÓN?

Resolución significa:

¿Cuántos píxeles caben en una unidad física cuando se imprime?

Puede mostrarse como:

- pixeles/mm
- pixeles/cm
- pixeles/ft
- etc.

> Las unidades mm, cm, ft, etc son medidas que la persona puede medir físicamente con una regla, metro, etc

Eso es lo mismo que decir PPI o PPP.

---

## 📏 PPP, PPI y DPI

PPP = Píxeles Por Pulgada  
PPI = Pixels Per Inch (lo mismo ue PPP pero en inglés)  
DPI = Dots Per Inch (puntos físicos de tinta)

👉 En GIMP realmente trabajamos con PPI aunque no aparezca escrito así.

---

## 🖨 MISMA IMAGEN, DISTINTA IMPRESIÓN (Comprendiendo la Impresión)

![Concepto de impresion](images/diagrama_impresion.png)

Si una imagen tiene 1000 píxeles:

- A 300 ppp se imprime pequeña y nítida.
- A 150 ppp se imprime más grande pero menos detallada.

Pero la imagen digital NO cambió.

---

# UNIDADES EN GIMP

![](images/01-Ventana,-Crear-una-Nueva-Imagen.png)

## Anchura y Altura

![](images/02-Crear-una-Nueva-Imagen_Tamaño-de-la-imagen_clic-en-px.png)

pixeles  
inches  
milimeters  
points  
picas  
centimeters  
meters  
feet  
yards  
tupogr.points  
typogr.picas  

### Unidades de "Tamaño de imagen" (Anchura / Altura)

Estas unidades definen las **dimensiones totales del lienzo**.

- **¿Qué controlan?** El tamaño del lienzo sobre el que estás trabajando.
- **¿Por qué hay tantas?** Te permiten definir el tamaño de tu lienzo pensando en el resultado final.
    - Si estás diseñando algo **para una pantalla** (redes sociales, web, etc.), lo más lógico es usar **píxeles (px)**. Sabes que una imagen para Instagram debe tener, por ejemplo, 1080 px de ancho.
    - Si estás diseñando algo **para imprimir** (un folleto, una foto, un cartel), es mucho más intuitivo pensar en **milímetros (mm)** o **centímetros (cm)**. Así puedes crear un lienzo del tamaño exacto de una tarjeta de presentación (85 mm x 55 mm) sin tener que hacer cálculos mentales.

## Resolución X / Y

![](images/03-Crear-una-Nueva-imagen_Opciones-Avanzadas_clic-en-pixeles-in.png)

pixeles/in
pixeles/mm
pixeles/pt
pixeles/pc
pixeles/cm
pixeles/m
pixeles/ft
pixeles/yd
pixeles/tpt
pixeles/tpc 

Estas cambian la densidad de impresión.

### Unidades de "Opciones avanzadas" (Resolución X / Y)

Estas unidades definen la **densidad de píxeles**. Responden a la pregunta: "Si mi imagen tiene que medir 10 cm en el mundo real, ¿cuántos píxeles debo meter dentro de esos 10 cm?".

- **¿Qué controlan?** La relación entre el mundo digital (píxeles) y el mundo físico (centímetros, pulgadas...).
- **¿Por qué hay tantas?** Para que puedas trabajar con la unidad de medida física que te resulte más cómoda para tu proyecto de impresión. Simplemente le estás diciendo a GIMP: "La regla con la que voy a medir mi densidad de píxeles será esta".

    *   **píxeles/in (pulgada):** Esta es la unidad **más importante y famosa** de todas. Seguro que has oído hablar de **ppp (píxeles por pulgada) o dpi (dots per inch)**. Es el estándar de la industria. Una calidad de impresión profesional suele ser de 300 píxeles/in.
    *   **píxeles/mm (milímetro):** Cuántos píxeles hay en un milímetro. Es una unidad muy precisa para trabajos de alta calidad, pero los números suelen ser pequeños (por ejemplo, 11.8 píxeles/mm equivalen a 300 píxeles/pulgada).
    *   **píxeles/pt (punto tipográfico):** Muy útil para diseño editorial y maquetación. Un punto (pt) es una unidad de medida clásica en tipografía (1 pt = 1/72 de pulgada). Si sabes que tu texto va a ir a un tamaño de cuerpo de 12 pt, configurar la resolución en píxeles/pt te ayuda a visualizar y calcular mejor.
    *   **píxeles/pc (pica):** Otra unidad tipográfica. Una pica equivale a 12 puntos. Es muy usada en diseño gráfico y periodístico en algunos países.
    *   **píxeles/cm (centímetro):** Es la versión del milímetro pero más "gruesa". Se usa mucho porque el centímetro es una unidad familiar para todos.
    *   **píxeles/m (metro):** Para proyectos enormes, como vallas publicitarias o lonas gigantes. Nadie habla de píxeles por milímetro para una lona de 10 metros, pero sí de píxeles por metro para hacerse una idea de la calidad final.
    *   **píxeles/ft (pie):** La versión del sistema imperial (pies) para quienes trabajan con él.
    *   **píxeles/yd (yarda):** La versión del sistema imperial (yardas) para quienes trabajan con él.
    *   **píxeles/tpt (punto tipográfico tradicional):** Es una unidad de medida tipográfica "antigua" o tradicional, que tiene una diferencia mínima con el punto moderno (pt). Es para usos muy específicos en tipografía de alto nivel o para mantener la fidelidad con documentos históricos.
    *   **píxeles/tpc (pica tipográfica tradicional):** Lo mismo que el tpt, pero para la pica tradicional. Un complemento para tipografía de alto nivel.

### En Resumen y para la práctica diaria:

- **Usa las unidades de "Tamaño de imagen"** para decirle a GIMP **lo grande que quieres que sea tu lienzo**. Si es para web o pantallas, usa **píxeles**. Si es para impresión, usa **centímetros** o **milímetros**.
- **Usa las unidades de "Resolución"** para decirle a GIMP **con qué densidad vas a imprimir**. En el 99% de los casos de impresión, usarás **píxeles/cm** o **píxeles/mm** (dependiendo de si piensas en cm o mm), o la más famosa de todas: **píxeles/pulgada (ppp o dpi)**.

**El truco:** No te compliques. Si vas a hacer algo para imprimir, pon el tamaño en **centímetros** en la parte de arriba y, en las opciones avanzadas, busca el equivalente de 300 píxeles por pulgada (que son 118 píxeles/cm o 11.8 píxeles/mm). Si es para pantalla, asegúrate de que la unidad de arriba sean **píxeles** y la resolución te dará igual, déjala en píxeles/mm o en lo que esté por defecto.

## 🔍 7. DIFERENCIA CLAVE 

| Tamaño (Anchura & Altura) (Comportamiento en Pantalla) | Resolución X y Y (Comprendiendo la Impresión) |
| ------------------------------------------------------ | --------------------------------------------- |
| Cambia cómo se ve en pantalla                          | No cambia pantalla                            |
| Cambia peso del archivo                                | No cambia peso                                |
| Afecta calidad real                                    | Solo afecta impresión                         |

---

# ¿Por qué existen PPP, PPI y DPI si en GIMP no aparecen?

En realidad…

👉 **Muchas veces significan prácticamente lo mismo**,
pero se usan en contextos distintos.

## 1️⃣ PPP (píxeles por pulgada)

En español decimos:

**PPP = Píxeles Por Pulgada**

Es simplemente la traducción de:

**PPI = Pixels Per Inch**

Entonces:

> ✅ PPP = PPI
> (son lo mismo, pero en distinto idioma)

---

## 2️⃣ PPI (Pixels Per Inch)

Este es el término técnico correcto cuando hablamos de:


---
## 🖥 Sección: Comportamiento en Pantalla
---

* Pantallas
* Imágenes digitales
* Resolución en programas como GIMP
* Fotografía digital

Significa:

> Cuántos píxeles hay en una pulgada.

Ejemplo:
300 PPI significa que en 1 pulgada caben 300 píxeles.

En GIMP, cuando ves algo como:

```
pixeles/mm
pixeles/cm
```

Eso es lo mismo que PPI pero en otra unidad.

---

## 3️⃣ DPI (Dots Per Inch)

Aquí viene la confusión 👇

**DPI no es exactamente lo mismo que PPI**, aunque mucha gente los usa como si fueran iguales.

DPI significa:

> Dots Per Inch (puntos por pulgada)

Pero los "dots" no son píxeles digitales.
Son puntos físicos de tinta que una impresora coloca en el papel.

---

### 📌 Diferencia real

| Término |          Se usa para          |   Qué mide realmente    |
| ------- | ----------------------------- | ----------------------- |
| PPI     | Imágenes digitales            | Píxeles en pantalla     |
| PPP     | Lo mismo que PPI (en español) | Píxeles                 |
| DPI     | Impresoras                    | Puntos físicos de tinta |

---

# Entonces… ¿por qué la gente los mezcla?

Porque:

* Para imprimir, necesitas convertir píxeles en tinta.
* Entonces 300 PPI normalmente se imprime como 300 DPI.
* En la práctica, muchas personas dicen DPI cuando realmente hablan de PPI.

Es como si todos dijeran “caballos de fuerza” aunque estén hablando de kilovatios.

---

# En GIMP

GIMP trabaja con:

✔ PPI (aunque no lo llame así directamente)
✔ Lo muestra como pixeles/mm, pixeles/cm, etc.

No usa la palabra DPI porque GIMP no controla la impresora,
solo guarda la información de densidad.

---

# Ejemplo sencillo

Imagina una imagen de 3000 píxeles de ancho.

Si la imprimes a:

* 300 PPI → 10 pulgadas
* 150 PPI → 20 pulgadas

Pero la imagen digital sigue teniendo 3000 píxeles.
No cambió.

> DPI = puntos físicos de impresión
> En GIMP hablamos realmente de PPI aunque no aparezca escrito así.

## ¿Qué significa cada dato en GIMP?

En **Imagen → Propiedades de la imagen**, GIMP muestra (entre otras cosas):

- **Tamaño en píxeles:** el tamaño real digital.
- **Tamaño de la impresión:** cuántos **mm/cm** ocuparía al imprimir.
- **Resolución:** ppp (píxeles por pulgada) o a veces píxeles/mm.

### Ejemplo real (200×200 px)

![Propiedades: 200×200 px y 150 ppp](images/image2.jpeg)

En la captura se ve:

- **Tamaño en píxeles: 200×200 px** (esto define cuánta información tiene la imagen).  
- **Resolución: 150×150 ppp** (esto sirve para calcular el tamaño en papel).  

Piensa así:

- **px = cuántos LEGO tienes**.  
- **ppp = qué tan apretados pones esos LEGO cuando los imprimes**.  

---

### En pantalla (web, YouTube, redes, iconos)

- La pantalla trabaja con **píxeles**.
- Si tu imagen es **256×256 px**, en pantalla se verá “como” 256×256 píxeles (dependiendo del zoom/escala).
- Cambiar ppp normalmente **no cambia nada visible** en pantalla.

**Para Internet:** casi siempre solo te preocupa **px**.

---

### En impresión (hojas, afiches, trípticos)

Aquí sí importa la resolución:

- Si tienes pocos px y quieres imprimir muy grande, se verá **pixelado**.  
- Si tienes muchos px, puedes imprimir más grande y con mejor detalle.  

**Para imprimir:** debes pensar en **(px) ÷ (ppp)** para saber el tamaño en pulgadas.

## GIMP por defecto crea imágenes a 300 ppp

Cuando creas una imagen nueva en GIMP, por defecto suele venir con **300 ppp**.

Ruta: **Archivo → Nuevo** y luego abrir **Opciones avanzadas**:

![Crear imagen nueva: opciones avanzadas](images/image4.png)

![Resolución por defecto 300 ppp](images/image5.png)

Luego puedes verificarlo en **Imagen → Propiedades de la imagen**:

![Propiedades: 1920×1080 px y 300 ppp](images/image6.jpeg)

## GIMP no siempre escribe **ppp (píxeles por pulgada)** con esas letras.

En realidad, cuando ves unidades como:

- pixeles/mm
- pixeles/cm
- pixeles/ft

Eso ES la resolución.

👉 **ppp = pixeles por pulgada (pixeles por inch)**

Si trabajas en pulgadas y colocas 300, estás usando **300 ppp**.

## 1️⃣ Unidades que aparecen en 'Anchura' y 'Altura'

Estas unidades afectan el TAMAÑO de la imagen.

Aparecen exactamente así en GIMP:

```
pixeles
inches
milimeters
points
picas
centimeters
meters
feet
yards
tupogr.points
typogr.picas
```

**¿Qué significa cada una?**

**pixeles** → tamaño digital real (lo más importante para pantalla).
**inches** → pulgadas (1 inch = 2.54 cm).
**milimeters** → milímetros.
**centimeters** → centímetros.
**meters** → metros.
**feet** → pies.
**yards** → yardas.

Ahora las unidades menos conocidas:

**points** → puntos tipográficos (1 point = 1/72 pulgada).
**picas** → 1 pica = 12 points.
**tupogr.points** → puntos tipográficos tradicionales.
**typogr.picas** → picas tipográficas tradicionales.

Estas últimas se usan en imprentas y diseño editorial profesional.



## Entonces… ¿Dónde está el famoso '300 ppp'?

Si eliges pulgadas como unidad y pones 300 en resolución,
eso equivale a **300 pixeles por pulgada (300 ppp)**.

Si estás en pixeles/mm y ves algo como 11.81 pixeles/mm,
eso también equivale a 300 ppp porque:

300 ÷ 25.4 ≈ 11.81

## Diferencia CLARA entre Tamaño y Resolución

|         Anchura / Altura         |         Resolución X / Y         |
| -------------------------------- | -------------------------------- |
| Cambia el tamaño real en píxeles | Cambia la densidad de impresión  |
| Afecta cómo se ve en pantalla    | No cambia cómo se ve en pantalla |
| Puede perder calidad si reduces  | No cambia calidad digital        |

## Regla sencilla 

- Para YouTube, web, iconos → usa pixeles.
- Para imprimir → usa centímetros o pulgadas + resolución (300 ppp recomendado).

## 5) Lo más importante: cambiar ppp NO cambia los píxeles

En GIMP hay dos cosas distintas:

1) **Cambiar el tamaño en píxeles** (esto sí cambia el archivo, y puede perder o ganar detalle).
2) **Cambiar la resolución (ppp)** sin tocar los píxeles (esto cambia solo el “dato para impresión”).

**Mira este ejemplo**
En Gimp con una imagen abierta, y dando clic en:

**Imagen → Escalar la imagen…**

![Menú: Escalar la imagen](images/image21.jpeg)

y he colocado un comentario, en el texto de la imagen dice que si cambias la resolución, **no afecta** el tamaño en pantalla:

![Cambiar resolución no cambia el tamaño](images/image22.jpeg)

**y ¿Cómo se cambia el tamaño real (px)?**

En esa ventana:

- Si cambias **Anchura/Altura (px)** → i cambias el tamaño real de la imagen (en la imágen de arriba dice 48 x48 px).
- Si cambias **Resolución X/Y** → solo cambias el dato de impresión (en la imagen de arriba los valores están en pixeles/mm, pero depende esto de la imagen pues puede estar con otras unidades de longitud).

## ¿ppp (ppi/dpi) y píxeles/mm son lo mismo?

Son lo mismo pero en **unidades distintas**:

- **ppp / ppi / dpi** = píxeles por **pulgada**.
- **píxeles/mm** = píxeles por **milímetro**.

Conversión:

- 1 pulgada = **25.4 mm**
- Entonces: **ppp = (px/mm) × 25.4**
- Y: **px/mm = ppp ÷ 25.4**

Ejemplo: si ves **3.543 px/mm**, entonces:

- 3.543 × 25.4 ≈ **90 ppp** (aprox.)

## 7) Ejemplo con iconos de Linux (por qué hay carpetas 48×48, 256×256, etc.)

En Linux, los temas de iconos guardan **varias versiones** del mismo icono en diferentes tamaños:

- 16×16, 22×22, 32×32, 48×48…
- 256×256, 512×512…

Así el sistema puede elegir el tamaño correcto y verse nítido.

![Carpetas de tamaños en un tema de iconos (Adwaita)](images/image23.png)

### Comparación: el mismo icono en 48×48 vs 256×256

#### Icono 48×48

![Archivo en carpeta 48×48](images/image14.png)

![Propiedades del icono 48×48](images/image15.jpeg)


---
## Sección: Comportamiento en Pantalla
---
Aquí el icono es pequeño (48×48 px), por eso ocupa poco en pantalla.

### Icono 256×256

![Archivo en carpeta 256×256](images/image19.png)

![Propiedades del icono 256×256](images/image20.jpeg)

Aquí el icono tiene más píxeles (256×256), por eso se puede ver **más grande** y normalmente con **más detalle**.

### Ojo: el ppp puede ser igual, pero el tamaño en px cambia todo

Fíjate que en las capturas de 48×48 y 256×256 aparece el mismo valor de **píxeles/mm**, pero **el tamaño en px** es diferente.


---
# 🎓 ¿Cuánto has comprendido estos conceptos en GIMP?

Esta es la parte más importante del tutorial: **el repaso fácil**. Si llegaste hasta aquí, ya viste todos los conceptos. Ahora vamos a ordenarlos como se los explicarías a un amigo que acaba de llegar de Windows y abre GIMP por primera vez. 😊

---

## 🧠 El repaso de 30 segundos

Todo el tutorial se resume en esta imagen mental:

> 🧱 **px (píxeles) = cuántos LEGO tienes.**
> 🖨 **ppp = qué tan apretados pones esos LEGO cuando los imprimes.**

Y dos verdades que nunca cambian:

1. **En pantalla solo importan los px.** Cambiar el ppp no mueve ni un píxel.
2. **El ppp solo importa al imprimir.** Es el traductor que convierte px → centímetros de papel.

---

## 🪟 ¿Vienes de Windows? Esto ya lo conocías, solo cambió el nombre

No estás perdido. Windows ya te mostraba estos mismos números, solo que en otras ventanas y con otros nombres:

| Lo que hacías en Windows | Dónde está ahora en GIMP | El número que miras |
| --- | --- | --- |
| Clic derecho en la foto → **Propiedades → Detalles** | **Imagen → Propiedades de la imagen** | Tamaño en píxeles (px) |
| **Paint → Cambiar tamaño** (opción "Píxeles") | **Imagen → Escalar la imagen…** | Anchura / Altura en px |
| La línea "Resolución horizontal: 300 dpi" de las propiedades | "Resolución X / Y" en GIMP | Es el ppp (aunque diga pixeles/mm o pixeles/cm) |
| Aplicación **Fotos → botón Imprimir** | **Archivo → Imprimir…** | cm en el papel + ppp |

👉 Es **el mismo conocimiento con otra ropa**. Como cuando cambias de ciudad: la farmacia sigue existiendo, solo que ya no está en la esquina de siempre. 🏪

---

## 🔢 El traductor de números de GIMP

Cuando GIMP te muestre un número raro, pregúntate **una sola cosa**:

> ¿Este número habla de **píxeles** o de **papel**?

| Si GIMP muestra… | Es… | ¿Cuándo me importa? |
| --- | --- | --- |
| `1920 × 1080` con unidad **px** | El tamaño digital real (cuántos LEGO tienes) | **Siempre** |
| `300` con unidad **pixeles/in** | La densidad de impresión: **300 ppp** | Solo al imprimir |
| `11.81` con unidad **pixeles/mm** | **Lo mismo que 300 ppp** (300 ÷ 25.4 ≈ 11.81) | Solo al imprimir |
| `118.1` con unidad **pixeles/cm** | **Lo mismo que 300 ppp** | Solo al imprimir |
| `10.16 × 7.62` con unidad **cm** | Lo que ocupará en el papel (px ÷ ppp) | Solo al imprimir |

**Truco infalible para no perderte:**

- La unidad es **px** → es **tamaño** (cuenta cuadritos).
- La unidad es **pixeles/ ALGO** (in, mm, cm…) → es **densidad para imprimir**.
- La unidad es **solo cm/mm** (sin "pixeles/") → es **tamaño en el papel**.

---

## 👀 ¿Dónde veo estos números en GIMP?

En **Imagen → Propiedades de la imagen**. Fíjate en la captura del tutorial (una imagen de 200×200 px):

![Propiedades: 200×200 px y 150 ppp](images/image2.jpeg)

- **Tamaño en píxeles: 200×200 px** → los LEGO que tienes 🧱.
- **Resolución: 150×150 ppp** → qué tan apretados van al papel 🖨.

---

## 🖼 La ventana "Escalar la imagen", traducida

Es la ventana que más confunde, porque mezcla los dos números. Aquí está etiquetada:

```
┌────────────────────────────────────────────────────────┐
│  Escalar la imagen                                     │
│                                                        │
│  Anchura: 1200          [px         ▼]                 │
│  Altura:   900          [px         ▼] ← TAMAÑO (px)  │
│                             esto SÍ cambia la imagen   │
│                                                        │
│  Resolución X: 11.81    [pixeles/mm ▼]                 │
│  Resolución Y: 11.81    [pixeles/mm ▼] ← DENSIDAD      │
│                             (= 300 ppp)                │
│                             esto NO cambia la imagen,  │
│                             solo el papel              │
└────────────────────────────────────────────────────────┘
```

- **Arriba (Anchura/Altura):** cambias los px → la imagen **sí** cambia.
- **Abajo (Resolución X/Y):** cambias el ppp → la imagen **no** cambia, solo el "tamaño de impresión".

---

## ✅ La única pregunta que necesitas hacerte: ¿pantalla o papel?

### Para pantalla (web, redes, iconos, fondos) → piensa en px

- ✅ **Web / redes / miniaturas / UI / iconos:** piensa en **px**.
- Ejemplos: avatar de 256×256 px, imagen para redes de 1080×1080 px, icono de un tema de Linux de 48×48 px.
- El ppp puede quedarse como venga: en pantalla **no afecta en nada**.

### Para impresión (hojas, fotos, trípticos, carteles) → piensa en cm + ppp

- ✅ **Impresión:** piensa en **cm + ppp**.

Valores típicos (regla práctica):

| Valor | ¿Para qué sirve? |
| --- | --- |
| **300 ppp** | Calidad alta: revistas, folletos, fotos, textos pequeños |
| **150 ppp** | Aceptable para cosas grandes que se ven de lejos (carteles, lonas) |
| **72–96 ppp** | "Histórico de pantallas": **no** es una regla moderna; en pantalla hoy lo que manda son los px |

### 📐 Chuleta: cuántos px necesito para imprimir bien (a 300 ppp)

| Quiero imprimir… | Necesito una imagen de al menos… |
| --- | --- |
| Foto clásica 10 × 15 cm | ≈ 1181 × 1772 px |
| Hoja A4 completa (21 × 29.7 cm) | ≈ 2480 × 3508 px |
| Tarjeta de presentación 85 × 55 mm | ≈ 1004 × 650 px |

El cálculo es siempre el mismo: **centímetros ÷ 2.54 × 300**.

---

## ✍️ Ejercicios (con solución paso a paso)

Hazlos de verdad en GIMP si puedes: estos números se aprenden con las manos. 💪

### Ejercicio 1 — El avatar para el foro (pantalla)

Te registras en un foro de Linux y pide un avatar de **256 × 256 px**. ¿Tienes que preocuparte por el ppp?

**Solución:** No. En pantalla manda el px.

1. **Archivo → Nuevo**.
2. Anchura: `256`, Altura: `256`, unidad **px**.
3. Abre **Opciones avanzadas** y deja la resolución como esté (300 ppp por defecto): es irrelevante para la pantalla.
4. Comprueba en **Imagen → Propiedades de la imagen**: debe decir `256 × 256 píxeles`.

### Ejercicio 2 — La foto para el marco (impresión)

Quieres imprimir una foto de **10 × 15 cm** con buena calidad (**300 ppp**). ¿Cuántos px necesita?

**Solución paso a paso:**

- Ancho: 10 cm ÷ 2.54 = **3.94 pulgadas** → 3.94 × 300 ≈ **1181 px**
- Alto: 15 cm ÷ 2.54 = **5.91 pulgadas** → 5.91 × 300 ≈ **1772 px**

Y en GIMP ni siquiera tienes que calcular:

1. **Archivo → Nuevo**.
2. Haz clic en la unidad `px` (junto a Anchura) y elige **centimeters**.
3. Escribe `10` × `15`.
4. En **Opciones avanzadas**, pon Resolución X/Y en `300` con unidad **pixeles/in**.
5. Vuelve a cambiar la unidad a **px** y verás que GIMP ya puso ≈ `1181` × `1772`. ¡Lo calculó solo! 🤖

### Ejercicio 3 — El número disfrazado

GIMP te muestra **Resolución: 11.81 pixeles/mm**. ¿Qué ppp es? ¿Cambia cómo se ve la imagen en pantalla?

**Solución:** 11.81 × 25.4 ≈ **300 ppp** (porque 1 pulgada = 25.4 mm). Es el mismo dato con otra unidad, como decir "un kilo" o "mil gramos". Y **no**: en pantalla no cambia nada, solo importa al imprimir.

### Ejercicio 4 — Tocar solo el ppp

Abre cualquier imagen y ve a **Imagen → Escalar la imagen…**. Cambia **solo** la Resolución X/Y (por ejemplo de 300 a 150) sin tocar Anchura/Altura. Luego mira en **Imagen → Propiedades de la imagen**.

![Menú: Escalar la imagen](images/image21.jpeg)

**Solución:**

- ¿Cambia la nitidez en pantalla? **No.**
- ¿Cambia el peso del archivo? **No.**
- ¿Qué sí cambia? Solo el "tamaño de impresión": a 150 ppp la foto ocuparía **el doble de centímetros** en el papel (los mismos LEGO, más separados).

![Cambiar resolución no cambia el tamaño](images/image22.jpeg)

### Ejercicio 5 — Los 3000 px del tutorial

Al inicio del tutorial vimos una imagen de **3000 px de ancho**. ¿Cuánto medirá de ancho en el papel a 300 ppp? ¿Y a 150 ppp?

**Solución:**

- 3000 ÷ 300 = **10 pulgadas = 25.4 cm**
- 3000 ÷ 150 = **20 pulgadas = 50.8 cm**

Y la imagen digital **sigue teniendo 3000 px** en los dos casos: no cambió ni un cuadrito. Ese es exactamente el diagrama de "misma imagen, distinta impresión".

### Ejercicio 6 — ¿Verdadero o falso?

Contesta antes de mirar la solución. 😉

1. "Si cambio el ppp de 300 a 150, el archivo pesa menos en el disco."
2. "Una imagen de 500 × 500 px me sirve para un póster de 50 × 50 cm a 300 ppp."
3. "11.81 pixeles/mm y 300 ppp son lo mismo."
4. "Para el avatar de un foro, lo importante es el ppp."
5. "Si escalo una imagen de 2000 px a 500 px, pierdo detalle para siempre."

**Soluciones:**

1. ❌ **Falso.** El ppp no toca los px: el archivo queda igual.
2. ❌ **Falso.** 500 px a 300 ppp solo dan ≈ 4.2 cm. Para 50 cm necesitas ≈ 5906 px.
3. ✅ **Verdadero.** 300 ÷ 25.4 ≈ 11.81. Misma densidad, distinta unidad.
4. ❌ **Falso.** En pantalla manda el px.
5. ✅ **Verdadero.** GIMP tira píxeles que ya no recuperas. Guarda una copia antes de escalar.

### Ejercicio 7 — El misterio de los iconos de Linux

Los temas de iconos guardan **varias carpetas** (16×16, 48×48, 256×256…) y todas tienen **el mismo ppp**. ¿Por qué tantas versiones del mismo icono?

**Solución:** Porque en pantalla **manda el px, no el ppp**. El sistema elige el tamaño que necesita en cada sitio: 48×48 para las listas pequeñas, 256×256 para las vistas de iconos grandes. Así siempre se ve nítido, sin borroso ni pixelado.

---

## 🎯 Resumen final (para recordar)

- **px** = tamaño digital real (los LEGO 🧱).
- **ppp** = densidad para imprimir (convierte px ↔ cm/pulgadas).
- Cambiar **ppp** sin cambiar **px** → cambia el "tamaño de impresión", **no** la imagen en pantalla ni el archivo.
- Cambiar **px** (escalar) → **sí** cambia la imagen, y puede perder calidad.
- Para **mirar** estos números: **Imagen → Propiedades de la imagen**.
- Para **cambiar** el tamaño: **Imagen → Escalar la imagen…** (y ya sabes qué número tocar arriba y cuál abajo).
- **300 ppp = 11.81 pixeles/mm = 118.1 pixeles/cm**. Son lo mismo en distinta unidad.

> 🎓 **Y ya está.** Ya no hay números misteriosos: en GIMP, igual que en Windows, todo son píxeles… y un dato extra (el ppp) que solo se usa cuando llega la hora de imprimir.
