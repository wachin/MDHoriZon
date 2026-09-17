

# Instalar diccionario de corrección ortográfica, sinónimos, temas de iconos, reglas de división de palabras, en español para LibreOffice para Linux 

En este post está todo lo necesario para que LibreOffice funcione bien en Linux. Tal vez se pregunten por qué no viene instalado todo esto y ya?, pero es que ducede que no es así porque ocuparía mucho espacio en la ISO del Sistema Operativo y ellos no han hecho una herramienta que automáticamente revise según la región los paquetes necesarios para el idioma instalado. Hasta que lo hagan leer este tutorial

## Este tutorial ha sido testeado en:

- MX Linux 23, 21  
- Debian 12 y deribados ejemplo Debian 12 LXQT, etc, etc

## Importante Actualizar los paquetes

Si no hace esto y usted haya dejado un ordenador mucho tiempo sin actualizar cuando ponga estos u otros comandos es posible no funcione porque los paquetes no sean compatibles. Ponga en la terminal:

```bash
sudo apt update
```

luego:

```bash
sudo apt upgrade 
```

## Instalación rápida

Si deseas rápido todos los paquetes para el idioma español poner:

**Diccionarios:**

```bash
sudo apt-get install libreoffice libreoffice-l10n-es hunspell-es mythes-es hyphen-es
```

**Temas de iconos:**

```bash
sudo apt install libreoffice-style-breeze \
libreoffice-style-elementary \
libreoffice-style-karasa-jaga \
libreoffice-style-sifr \
libreoffice-style-sukapura
```

**Nota:** Puede que en algún momento pueda cambiar el nombre de algún paquete, en ese caso revisar los nombres en Synaptic. Además puede que en algún momento pongan más.

**Reiniciar** LibreOffice (cerrarlo y volverlo a abrir)

---

## Fuentes Tipográficas para Linux

Bueno que hace que tengamos instalado todo y no tengamos las fuetnes tipográficas necesarias, creo que la mayoría tendrá que instalar las Fuentes Tipográficas de Windows, fuentes descargadas desde internet, o fuentes que crearon para usuarios libres que no quieren usar fuentes de Windows (alternativas a ellas), revise por favor esta sección de mi Blog:

[https://facilitarelsoftwarelibre.blogspot.com/search/label/Fuentes%20para%20Linux](https://facilitarelsoftwarelibre.blogspot.com/search/label/Fuentes%20para%20Linux)

---

# Instalar diccionario de corrección ortográfica

En antiX, MX Linux, Debian puede que no venga instalado por defecto el diccionario de corrección ortográfica de LibreOffice, estos son los pasos para instalarlo

**Nota:** he leido que LibreOffice puede usar hunspell y myspell

## Para Hunspell

Este es el más usado actualmente. Busca en Synaptic (si no lo tienes instalado instalalo) un diccionario Hunspell, ejemplo español:

```
hunspell-es
```

también lo puedes instalar directamente desde la terminal:

```bash
sudo apt install libreoffice hunspell-es
```

Por cierto, asegúrese de que esté instalado el paquete principal **libreoffice** (por eso se lo pongo allí)

instálalo:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC2nNDNsIVtSxzY8DBd4kgNy6y4-aFnKaS4UDMO__3r8obo8RJWXA2D8G9OGN0zIJpmOapKIGYzuoNxD_165cFf-hw7V5W6TrLwTDefEaJ4a2U_-ookU5xHNGfeeaBa4uMFGtodyoOsc6KfgVXfwZ5HRtgM-ZTXx7yCnVuv_rPb82aTJEA2oZRhP-W8P4/s16000/20250509-0012%20busca%20un%20diccionario%20Hunspell%20ejemplo%20espa%C3%B1ol%20en%20Synaptic.png)

Allí hay otros:

### Lista de paquetes de idiomas comunes para Hunspell en Linux:

- **hunspell-es** (Español)
- **hunspell-en-us** (Inglés de EE.UU.)
- **hunspell-en-gb** (Inglés británico)
- **hunspell-fr** (Francés)
- **hunspell-de-de** (Alemán)
- **hunspell-it** (Italiano)
- **hunspell-pt-pt** (Portugués de Portugal)
- **hunspell-pt-br** (Portugués de Brasil)
- **hunspell-ru** (Ruso)
- **hunspell-nl** (Neerlandés/Holandés)
- **hunspell-pl** (Polaco)
- **hunspell-sv** (Sueco)
- **hunspell-da** (Danés)
- **hunspell-ca** (Catalán)
- **hunspell-eu** (Euskera)
- **hunspell-gl** (Gallego)

si necesitas otro puedes instalar más buscando allí.

---

## El antiguo Myspell

Si por algun motivo deseara usar el antiguo myspell lo puede usar, ponga en la terminal para el español:

```bash
sudo apt-get install myspell-es
```

cierre LibreOffice si lo tenía abierto y ábralo y allí si ya funciona:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkERCQZdnqAuFOzPbjc-fXp59QXL_cIkeWGIViyffQJMEDkq7GVZjweuqqDAB0YFYj03D_Pe5PwZIh_IT8MFIdxJa6P-o__hcft1sf3iXRkf2YuQ6hlA6hd8B9ZHAaGVbUDKcUrXb4wFU/s16000/20200817-080330.png)

se mostrará una lista de las palabras disponibles:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDS5anmHDZIzudWD-Fv3oOIpNSTaBspko80fHuhhRKNe3ElWJdUgwCO64ajOCwXLJ5YwQ8r8q4wrMnoz9I_VrrXkPhr4i6opjSvnY_FRj40MHQUrLQLSkC4BQ2zfYQ6Hukbs_j3wiDFaM/s16000/20200817-080439.png)

---

## Instalar diccionario de corrección ortográfica para otros idiomas

En Synapic puedes buscar los diccionarios:

### Lista de diccionarios MySpell

* **myspell-sq** → Albanés (Albanian dictionary)
* **myspell-he** → Hebreo (Hebrew dictionary)
* **myspell-uk** → Ucraniano (Ukrainian dictionary)
* **myspell-fa** → Persa/Farsi (Persian dictionary)
* **myspell-cs** → Checo (Czech dictionary)
* **myspell-en-au** → Inglés australiano (English Australian dictionary)
* **myspell-et** → Estonio (Estonian dictionary)
* **myspell-gv** → Gaélico manés (Manx Gaelic dictionary)
* **myspell-hu** → Húngaro (Hungarian dictionary)
* **myspell-hy** → Armenio (Armenian dictionary)
* **myspell-nb** → Noruego Bokmål (Norwegian Bokmål dictionary)
* **myspell-nn** → Noruego Nynorsk (Norwegian Nynorsk dictionary)
* **myspell-sk** → Eslovaco (Slovak dictionary)
* **myspell-gd** → Gaélico escocés (Scots Gaelic dictionary)
* **myspell-el-gr** → Griego (Greek dictionary)
* **myspell-de-de-1901** → Alemán tradicional (Traditional German dictionary)
* **myspell-fr** → Francés (versión Hydro-Québec)
* **myspell-fr-gut** → Francés (versión GUTenberg)
* **myspell-da** → Danés (Comprehensive Danish Dictionary - DSDO)
* **myspell-eo** → Esperanto (Esperanto dictionary)
* **myspell-es** → Español (Spanish dictionary)
* **myspell-fo** → Feroés (Faroese dictionary)
* **myspell-tl** → Tagalog (Filipino dictionary)

### Paquetes de transición (obsoletos o migrados a Hunspell)

* **myspell-bg** → Búlgaro (paquete de transición)
* **myspell-lv** → Letón (paquete de transición)
* **myspell-ru** → Ruso (paquete de transición)
* **myspell-pt-br** → Portugués de Brasil (transición a Hunspell)
* **myspell-pt-pt** → Portugués de Portugal (transición a Hunspell)
* **myspell-pt** → Portugués (para Hunspell)
* **myspell-sv-se** → Sueco (dummy)
* **myspell-hr** → Croata (dummy)
* **myspell-pl** → Polaco (dummy)
* **myspell-ga** → Irlandés

### Notas importantes

* Algunos diccionarios de MySpell están **obsoletos** en Debian 12 y han sido reemplazados por Hunspell.

**CONSULTAS:**

**Corrección ortográfica y gramatical en LibreOffice**  
[https://libreoffice.cubava.cu/instalar-corrector-ortografico-y-gramatical-en-libreoffice/](https://libreoffice.cubava.cu/instalar-corrector-ortografico-y-gramatical-en-libreoffice/)  

**Install Libreoffice language pack on Debian**  
[https://unix.stackexchange.com/questions/754026/install-libreoffice-language-pack-on-debian](https://unix.stackexchange.com/questions/754026/install-libreoffice-language-pack-on-debian)  

---

# Respaldar el diccionario Hunspell

Si deseas saber cómo respaldar este diccionario y cómo añadir o quitar palabras en el diccionario Hunspell ve mi siguiente entrada:

**Respaldar Diccionario de Corrección Ortográfica y quitar o añadir palabras**  
[https://facilitarelsoftwarelibre.blogspot.com/2024/08/respaldar-diccionarios-de-correccion-ortografica-en-linux-de-editores-de-texto.html](https://facilitarelsoftwarelibre.blogspot.com/2024/08/respaldar-diccionarios-de-correccion-ortografica-en-linux-de-editores-de-texto.html)  

---

# Cómo instalar el diccionario de sinónimos en español

## INSTALACIÓN

```bash
sudo apt-get instal mythes-es
```

si estaba abierto Libreoffice cierrelo y vuélvalo a abrir

![Tesauro LibreOffice](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg80zr4Eg4QOa28j6f1ySTaQcS4sA-1vcvTwgfobSQdk6mTHTdibZ80_tbvQPCw70hdiCLbc3JWNqFu1rSWW07i9B9hXh_-49-FgqiuHMt0L70bU102pP-cJV9nCaCdMNKM00BzDHFbku4/s16000/%25C3%2581rea+de+trabajo+1_054.png)

### Cómo usar el tesauro

* Selecciona una palabra (ej: "casa" o la palabra "grande") y haga lo siguiente:

  * Herramientas > Sinónimos
  * o Ctrl + F7 (pero en ciertos teclados puede no funcionar este atajo de teclado)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOf1hnILyMNmYBwXmB6J7Zu_ikzWGiRTtGEQEwye4y9wQVmzA96rZoSSxdd3A9tskvenfvAj3C6tc7jIA_oez46VhbdPXk4HjZVgWC61KgwxL4G8nqHYWF-o2UwITIP635-zbZJxD4wE-mBwzkIxkkY2o_XLuPKncgYnYUjihq7nTAGDArSOCdBJ07iT8/s745/Herramienta%20de%20sinónimos.png)

y como verá aparecen varias palabras con significado similar.

---

## Instalar Tesauros para otros idiomas

Busca en Synaptic:

**mythes**

![Mythes Synaptic](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBzoXE8gllAlXyHPSN_o8h3mDv1dEEhXwSqS30tN-eKN5UtHuBtQnmhgZtA1tvKHvG9BAgMm6HS2S-U8PkTlfptJZZMX7PHbgYdzm-Wq6bjIbulVDbnEFaXL6UjLE47OJxBSXX0arspek/s16000/20211110-090446+mythes.png)

### Lista completa de tesauros disponibles

* mythes-ar → Árabe
* mythes-bg → Búlgaro
* mythes-ca → Catalán
* mythes-cs → Checo
* mythes-da → Danés
* mythes-de → Alemán
* mythes-de-ch → Alemán suizo
* mythes-en-au → Inglés australiano
* mythes-en-us → Inglés EE.UU.
* mythes-es → Español
* mythes-fr → Francés
* mythes-gl → Gallego
* mythes-gug → Guaraní
* mythes-hu → Húngaro
* mythes-id → Indonesio
* mythes-is → Islandés
* mythes-it → Italiano
* mythes-lv → Letón
* mythes-ne → Nepalí
* mythes-no → Noruego
* mythes-pl → Polaco
* mythes-pt-pt → Portugués
* mythes-ro → Rumano
* mythes-ru → Ruso
* mythes-sk → Eslovaco
* mythes-sl → Esloveno
* mythes-sv → Sueco
* mythes-uk → Ucraniano

### Recomendaciones adicionales

Es posible que haya alguna extensión relacionada a algún diccionario de sinónimos que desea revisar. Buscar desde extensiones:
   [https://extensions.libreoffice.org/](https://extensions.libreoffice.org/)

### CONSULTA

Thesaurus
[https://help.libreoffice.org/Writer/Thesaurus/es](https://help.libreoffice.org/Writer/Thesaurus/es)

---

# Instalar estilos de iconos

```bash
sudo apt update && sudo apt upgrade
```

```bash
sudo apt install libreoffice-style-breeze \
libreoffice-style-elementary \
libreoffice-style-karasa-jaga \
libreoffice-style-sifr \
libreoffice-style-sukapura
```

**Nota:** Puede que en algún momento pueda cambiar el nombre de algún paquete, en ese caso revisar los nombres en Synaptic. Además puede que en algún momento pongan más.

Ruta:

**Herramientas → Opciones → Ver → Tema de Iconos**

![Tema de iconos](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcy41LGg_vz9pedHCVTfRxtQWJTPpYuM95j1aD19xJFg1yWJXgOOVSovJNxKqC6nyOW3TovhqX5CmaCILmKyV0RnNbhqkMoOPjvGRWjYcJ_QuGE-OTIlhB9maHED4C6SYo-4d6sePLfysAyt2YouSxlX3BaMF70lZcib_8giSpJ27EGAPShP3S7bBwIBE/s16000/20250725-000245%20elige%20otro%20tema%20de%20iconos.png)

y allí probar los que desee, por ejemplo Elementary:

![Otros temas](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrAzCkHaA4qPivefUCgRCQbru0eg5pWi-tVFkZE7xDuz578EkumKXvnAT2_2n7lzkdUinlTbEz8AzUgX_7V-hUN-KZ6zW6SAFB4yi_dUfFVqKiyuAYIOxYrdO0sLwciYKK9jA70QZ_ABZU423zJKsS5CRyb75dayKlmmMmBXIofwQawQaaHxvr76G6s60/s16000/20250725-000509%20podr%C3%A1s%20elegir%20otros%20temas%20de%20iconos.png)

---


# Instalar reglas de división de palabras

```bash
sudo apt-get install hyphen-es
```

**Nota:** En Synaptic hay para otros idiomas tambén

* **Windows/macOS:**
  Es posible que los archivos de división vengan incluidos con la extensión del diccionario del idioma usado.
  Si faltan, revisa en **Herramientas > Extensiones**.

Este paquete contiene los patrones de división de palabras en español. Puedes usar estos patrones con programas que utilizan libhyphen, como LibreOffice.

## ¿Qué hace `hyphen-es` en la práctica?

El paquete `hyphen-es` instala **patrones de división silábica** del español. Estos patrones son usados por programas que usan **libhyphen** (como LibreOffice) para:

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

---

Dios les bendiga

---

## Consultas

**Using Hyphenation**  
[https://help.libreoffice.org/latest/en-GB/text/swriter/guide/using_hyphen.html](https://help.libreoffice.org/latest/en-GB/text/swriter/guide/using_hyphen.html)

**Using Hyphenation**  
[https://help.libreoffice.org/latest/en-GB/text/swriter/guide/using_hyphen.html](https://help.libreoffice.org/latest/en-GB/text/swriter/guide/using_hyphen.html)

**LibreOffice Bookshelf | libreOffice is a freely-available, full-featured office suite. It runs on Windows, Linux, and macOS computers**  
[https://books.libreoffice.org/en/](https://books.libreoffice.org/en/)
