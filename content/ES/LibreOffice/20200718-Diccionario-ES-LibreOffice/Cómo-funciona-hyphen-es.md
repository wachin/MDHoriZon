

## ¿Qué hace `hyphen-es` en la práctica?

El paquete `hyphen-es` instala **patrones de división silábica** del español.
Estos patrones son usados por programas que usan **libhyphen** (como LibreOffice) para:

👉 **Dividir palabras correctamente cuando llegan al final de una línea**

---

## Ejemplo sencillo (sin hyphen-es y con)

Supongamos que escribes en LibreOffice:

```
Fomentar el crecimiento a través de la educación formal, aprovechando el 
contexto socio-cultural ecuatoriano.
```

Si el texto llega al borde, con `hyphen-es` puede pasar esto:

```
Fomentar el crecimiento a través de la educación formal, aprove-
chando el contexto socio-cultural ecuatoriano.
```

Con `hyphen-es` instalado LibreOffice divide correctamente el texto:

✔ Divide según reglas reales del español  
✔ Mantiene estética profesional  
✔ Mejora la legibilidad en párrafos que tienen palabras muy largas en los cuales al aplicarles justificación se veían como forzadas y estiradas las letras  


## Ejemplo real en documentos

### 1. Libros o manuales

Si estás escribiendo un libro o PDF:

* Sin hyphen → espacios raros y saltos feos
* Con hyphen → texto justificado limpio tipo editorial

👉 Ejemplo:

**Sin hyphen:**

```
para el procesamiento        de        alimentos
```

**Con hyphen:**

```
para el procesa-
miento de alimentos
```

### 2. Artículos exportados a PDF

* Si exportas a PDF desde LibreOffice
* O haces documentos para imprimir

👉 Se ven mucho más profesionales con división correcta

---

### 3. Documentos justificados

Cuando usas **alineación justificada**:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgopTzD3lhoMy-6iDfcDfaknFpRPVyBGnnNjUZOUN5izI2D7JAD_IZTv7Md9YiH37OK2rX6STgMTbFGg8RzrxUYPeu55F8NApQc9xW7nzePk5wiK0Kc7gwz8D3HK8QQfWeeLGn0wvA2iH6ps7W-XNA23O6zcIIBnJm4N7AL2ePHDwovO7fhJs1AOW__L-8/s667/Herramienta%20Justificado.png)

👉 Sin hyphen:

* espacios enormes entre palabras 😖

👉 Con hyphen:

* texto uniforme como revista 👍

### 4. Otros programas que lo usan

Además de LibreOffice, también puede servir en:

* editores de texto avanzados  
* generadores de PDF  
* algunos navegadores o apps con renderizado tipográfico  

---

## ¿Cuándo NO lo notarás?

Si:

* Escribes texto corto  
* No usas justificado  
* Solo haces notas simples  

👉 casi no verás diferencia 

## Cómo usar la división de palabras en Español en LibreOffice

Para usar la división de palabras en Español en LibreOffice con las reglas de `hyphen-es` habilita la división automática en **Estilos de párrafo** o **Propiedades del párrafo** dentro de la pestaña **Flujo de texto**. Para un control inmediato y manual de la división, usa el menú **Herramientas > Idioma > División de palabras**. 

### Activar la división automática

* **Para un párrafo específico:**

  1. Selecciona un párrafo, y haz clic derecho.
  2. Selecciona **Párrafo > Párrafo...**.

  
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiaYS-fXDfUA-TneGjILarISlDYZZShgHHVawquDbn0KdCMk1Iyxxs0Fu9A7KR_lw7juI4y3pTTk-AtdDEL0ajA8xTbhQCgPxTwyWL5yiiigCHvTv3Po75DEAnTELp-z3s_VjcCoBvVFzCbW2pwJ-jwCkGDzBp8X13WlwWfx5w-SCniio2ytwJb3oGCIes/s823/Selecciona%20Parrafo%20-%20Parrafo....png)

  3. Ve a la pestaña **Flujo de texto** y en **Corte de palabras**
  4. Marca la opción **Automáticamente**  
  5. Da clic abajo a la derecha en **Aceptar**
  
  ![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmqoP1KSFe3A-hZxWV1pXrJV6Quyk_TdgzPXmLZCeZ_4n37mjl5sQh-zMZIYdwlecky_kTJ0iJLvDlLd0TzTtKP3TOeLw8XsZGqARMelNUVY7cE5-pxTR9s7h9CMVZ4K_v69DHp7r399rXrrNCs6bcN-AKk-KBmQJmm7mHZg-C2dspQBdCGpZRdrNMwJA/s809/Pestaña%20Flujo%20de%20texto%20-%20Corte%20de%20palabras.png)
  
>Imagen "**Pestaña Flujo de Texto**"

* **Para todo el documento:**

  1. Presiona `F11` o `Ctrl + Alt + 2`para abrir el menú de estilos.
  2. Haz clic derecho en **Estilo de párrafo predeterminado** (o el estilo principal).
  3. Selecciona **Modificar**:
  
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisZ7WLMpG1Rw49yq4UzZLiitU4uC2f1B6awrsteuZyFWpPfK-tXVUdHvbWgmMWzyLN1Fxmpw4f3rkfEed6fogJN3c9kGoKHIk6n-t7sppiFD4jv5sj-gev6Kjswo021hmMlnjkoVnLf9OWiXnMaP7yuRok1lev6rvHG7HhZm1uTPUTP4yxRM3Tew132cY/s612/Modificar%20-%20Estilo%20de%20parrafo%20predeterminado.png)

  4. Ve a la pestaña **Flujo de texto** y en **Corte de palabras**
  5. Marca la opción **Automáticamente** 
  6. Da clic abajo a la derecha en **Aceptar**
  

### EXPLICACIÓN COMPLETA: “FLUJO DEL TEXTO → CORTE DE PALABRAS”

Esta es la explicación de las opciones de la Imagen "**Pestaña Flujo de Texto**"

### 1. Corte de palabras

#### ⛔ No dividir palabras en MAYÚSCULAS

✔ Evita que palabras escritas completamente en mayúsculas se dividan

👉 Ejemplo:

```
ECUADOR → no se divide
```

📌 Útil para:

* Títulos
* Acrónimos (ONU, PDF, HTML)

---

#### ⛔ No dividir la última palabra

✔ Evita que la última palabra de un párrafo se corte

📌 Mejora la estética final del párrafo

---

#### 2. PARÁMETROS DE DIVISIÓN

Estos controles afinan cómo se divide una palabra:

---

### Caracteres a final de renglón

✔ Número mínimo de letras que deben quedar **antes del guion**

👉 Ejemplo (valor 2):

```
co-mida ✔
c-omida ❌
```

---

### Caracteres a principio de renglón

✔ Letras mínimas que deben quedar **después del guion**

👉 Ejemplo:

```
co-mida ✔
comi-da ✔
com-id ❌
```

---

### Renglones con guion consecutivos máximos

✔ Cuántas líneas seguidas pueden terminar con guion

📌 Evita esto:

```
proce-
sa-
mien-
to-
```

👉 Si pones:

* `0` → sin límite
* `2` → máximo 2 líneas seguidas con guion

---

### Longitud mínima de palabra en caracteres

✔ Solo divide palabras que tengan cierta longitud mínima

👉 Ejemplo:

* Valor 5 → palabras cortas no se dividen

---

### Zona de división de palabras

✔ Espacio cerca del margen donde LibreOffice decide dividir

* 0.00 cm → divide en cualquier punto posible
* Mayor valor → menos divisiones

> Es una opción avanzada (normalmente se deja en 0)

---

## 3. OPCIONES DE PÁRRAFO

### ⛔ No dividir el párrafo

✔ Mantiene todo el párrafo en una sola página

📌 Útil para:

* citas
* bloques importantes

### Mantener párrafos juntos

✔ Evita que un párrafo se separe del siguiente

📌 Útil en:

* títulos + contenido
* listas

---

## 4. CONTROL TIPOGRÁFICO

---

### 🟢 Ajuste de huérfanas

✔ Controla líneas sueltas al final de página

👉 Huérfana = primera línea sola al final

- Ejemplo (mal):

```
[texto]
[texto]
[texto]
Primera línea del párrafo ↓ (huérfana)
--- salto de página ---
resto del párrafo
```

✔ Solución: exige mínimo X líneas

---

### 🟢 Ajuste de viudas

✔ Controla líneas sueltas al inicio de página

👉 Viuda = última línea sola arriba

- Ejemplo (mal):

```
--- salto de página ---
última línea del párrafo (viuda)
```

Valores comunes:

* 2 líneas (como en tu imagen) → estándar profesional



### **3. División manual de palabras**

Selecciona un párrafo y usa el menú **Herramientas > Idioma > Corte de palabras...**:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhe8gQadahU75dBBenCs51af-LsAQlvUoTf-awTBV73XjwiUDym5wJwENucASwwPzQvpyejZTwMlWpte7CKSq7rT0NzOYri5-vYThDISmhE31wPbNQMDrrkM79irFdvkSIuG2yp2EDWZzgIQt81gW_KWcYIyTrDCeipoVC9WRFLTL0Sha70GRJa5v8omBg/s798/Herramientas%20-%20Idioma%20-%20Corte%20de%20palabras.png)

Aparecerá una ventana:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgf0nNnkrKexpj4T8k0ldVay7BthFoiMlPqoXqkQuBSwJeerLV08nYm0WRY4E3nl2z1Q2pkrikdAtuteectgE9KKIq3C8QeWWipiNq5sU2ptN40uFy4beg9xmfWu3BdjJtc-43Esdv9tpnvJRovW06FgFytRdiq9H9S9Pg06UeGlA0ccX7_c_jMtQg78ts/s802/Ventana%20Corte%20de%20palabras.png)

allí hay dos botones: **Dividir en sílabas** y **Dividir todo en sílabas**, el primero es para dividir una por una las palabras que se calcularán que son las que están en los extremos derechos y que se necesita dividir, la otra lo hará todo de una sola vez sólo en esas palabras que se requiera hacerlo

**Nota:** puede que haya más maneras de usar esta heramienta.

## Consultas

**Using Hyphenation**  
[https://help.libreoffice.org/latest/en-GB/text/swriter/guide/using_hyphen.html](https://help.libreoffice.org/latest/en-GB/text/swriter/guide/using_hyphen.html)