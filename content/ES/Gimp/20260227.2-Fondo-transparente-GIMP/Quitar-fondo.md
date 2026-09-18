# Cómo quitar el fondo de una imagen en GIMP y dejarlo transparente (Paso a paso)

> Tengo la imagen de un teclado pero sólo quiero el teclado, y borrar todo lo demás (contornos) y que el fondo quede transparente. Pero cuando uso el borrador no queda transparente.”

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgB-rog5z74dQqfZJr0VsvZ_AcD7EDpsvCZc_FO5XwN1GXNkcZb6hLiGqSiA2xyw4aJM9Zjsd7E4YmOwnuOtblqnrdRWpnZu5yCn4g9eyqUHiK7A905ySQit9ea9dtCNVh-Q-xtrrixJpk/s640-rw/01.2+Logitech+k400r+con+efecto+shutter+sombra+al+rededor.png)

🔴 **La razón principal es que mi imagen no tenía canal alfa.**
Sin canal alfa, el borrador pinta de blanco… pero NO hace transparencia real.

---

# ✅ SOLUCIÓN CON BORRADOR PASO A PASO EN GIMP

---

## 🔹 PASO 1 — Abrir la imagen

Este método es muy exacto porque te permite borrar cualquier parte que necesites borrar

1. Abre **GIMP**  
2. Ve a **Archivo → Abrir**  
3. Selecciona la imagen, da clic en **Seleccionar → Todo**  

---

## 🔹 PASO 2 — AÑADIR CANAL ALFA (⚠️ ESTE ES EL PASO CLAVE)

- Ve al menú **Capa → Transparencia → Añadir alfa a la selección**

👉 Ahora sí, usa el borrador y creará transparencia real (verás el fondo cuadriculado gris/blanco).

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtjTubzq5ALgjDqUXDdwEva2IAqaykt7wbUXs6gk4q9AgTXfu8q25Cm5HnjJ7_E6PUvy6jkCd31v9TR13IHmj4ScOTLP1kMU-2ygiiRSLKDKCpW1MUqr9OIUH5uWvDtvC6FBPuXoE9jZo/s640-rw/02+Logitech+k400r.png)

---


# ✅ OTRAS SOLUCIONES


# 🔹 Eliminar a todo lo que se le de clic

Tienes 2 métodos según el tipo de fondo:

---

## 🟢 Método A (fondo de un solo color)

1. Ve a **Herramientas → Herramientas de selección → Selección difusa**
2. Haz clic sobre el fondo
3. Presiona **Supr (Delete)**

* Haz clic en otras partes del fondo
* Supr nuevamente

---

## 🟡 Método B (fondo más complejo)

1. Usa la herramienta **Selección libre (lazo)**
2. Rodea cuidadosamente el teclado
3. Ve a **Seleccionar → Invertir**
4. Presiona **Supr**

---

# 🔹 EXPORTAR CORRECTAMENTE (MUY IMPORTANTE)

Si guardas como JPG → perderás transparencia.

Debes:

1. **Archivo → Exportar como…**
2. Cambiar la extensión a **.png** (soporta transparencia alfa)
3. Clic en **Exportar**
4. Confirmar

---

# ❗ ¿POR QUÉ EL BORRADOR NO FUNCIONABA?

Porque tu imagen probablemente:

* Era JPG
* No tenía canal alfa
* El borrador solo pintaba blanco

Sin canal alfa NO existe transparencia real.

---
