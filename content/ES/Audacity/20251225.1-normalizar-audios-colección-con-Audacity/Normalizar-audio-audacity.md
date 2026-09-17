# 🎧 Cómo normalizar una colección de audios MP3 usando Audacity (método profesional)

Este tutorial te enseña cómo **igualar el volumen de muchos archivos de audio** (por ejemplo alabanzas, prédicas o música) sin perder calidad y sin distorsión.

El objetivo es que todos los audios tengan **la misma percepción de volumen**, aunque hayan sido grabados en épocas y condiciones diferentes.

---

## 🧰 Herramientas necesarias

1. **Audacity 3.7.5 o superior**
2. **MediaInfo** (para ver el bitrate real de cada MP3)

MediaInfo es importante porque nos permite saber si un archivo es:

* 128 kbps
* 192 kbps
* 256 kbps
  etc.

Eso nos permite **exportar exactamente con la misma calidad** y no degradar el audio.

---

## 📂 Paso 1 — Analiza un audio de referencia

Busca dentro de tu colección un audio que suene bien y tenga buen volumen.

1. Haz clic derecho sobre el archivo
2. Ábrelo con **MediaInfo**
3. Observa su bitrate (por ejemplo: 256 kbps)

Este audio será tu **guía de volumen**.

---

## 🎚 Paso 2 — Configura Audacity para usar RMS

Abre Audacity.

Ve a:

```
Ver → Mostrar RMS en forma de onda
```

RMS significa **Root Mean Square** y muestra cuán fuerte se percibe el sonido en promedio, de una forma mucho más parecida al oído humano.

Esto te permitirá comparar visualmente los audios.

---

## 📥 Paso 3 — Importa el audio de referencia

Arrastra o importa el audio de buena calidad a Audacity.

Observa:

* Qué tan alto se ve
* Qué tan llenas están las ondas RMS

Ese será tu patrón visual.

---

## 📥 Paso 4 — Importa un audio de volumen bajo

Ahora importa uno de los audios antiguos o que suena bajo.

Verás que:

* Las ondas son más pequeñas
* El RMS es mucho más bajo

Eso es lo que vamos a corregir.

---

## 🔊 Paso 5 — Amplificar el audio

1. Presiona **Ctrl + A** (seleccionar todo)
2. Ve a:

```
Efectos → Volumen y compresión → Amplificar
```

3. Marca **“Permitir recorte”**
4. Empieza con valores como:

   * 1.5
   * 2.0
   * 2.3

Haz clic en **Aplicar**

---

## 👁 Paso 6 — Compara con el audio bueno

Mira el RMS del audio corregido y compáralo con el audio de referencia.

Si está:

* Muy alto → reduce el valor
* Muy bajo → aumenta un poco

Esto se hace por **ojo y oído**, no por números.

---

## 💾 Paso 7 — Exporta sin perder calidad

Haz clic en:

```
Archivo → Exportar → MP3
```

Ahora muy importante:

En **Modo de velocidad de bits** elige:

```
Constante (CBR)
```

Y pon el **mismo valor** que viste en MediaInfo:

* Si decía 128 kbps → exporta en 128
* Si decía 256 kbps → exporta en 256

Esto evita que el archivo pierda calidad o cambie de tamaño innecesariamente.

---

## 🔁 Paso 8 — Sobrescribe con seguridad

Exporta el archivo en la misma carpeta para reemplazar el original.

⚠️ Pero **antes** debes tener un respaldo de toda la colección.

Eso te protege si algo sale mal.

---

## 🔄 Paso 9 — Repite con toda la colección

Vas archivo por archivo:

1. Importar
2. Amplificar
3. Comparar RMS
4. Exportar

Así todos quedarán con un volumen uniforme.

---

