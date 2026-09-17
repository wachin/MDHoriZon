# Instalar diccionarios e idiomas en MX Linux 23 y antiX 23 para el idioma Español | Guía paso a paso

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhey2EAf3vbmhV9ugA9U19Q49MAUax8zHV3lthsYFGLHTt8bKeS8rxIvpCdTwymr2cGRzqQ33zOOevRyq0Im_xnPDkpO15JmK4s1n8-C5U7oI-GaoU2JODWfz6IjQenybu52c5dG1vK0cYDgHH9bpF5WNVjzyh7VYvTlQGq25cBAhQKOpTSyvf68hDvMf4/s1536/Portada.jpg =640x)

Cuando instalamos **MX Linux** o **antiX**, es común que algunos programas no incluyan por defecto:

* Traducción completa al español
* Diccionario de corrección ortográfica
* Sinónimos

Esto ocurre porque estas distribuciones son **ligeras** y no instalan todos los paquetes de idioma automáticamente.

👉 La solución es instalar manualmente los paquetes de localización (*l10n*).

---

## Instalación rápida (recomendada)

Para la mayoría de usuarios, puedes instalar todo lo esencial con un solo comando, para:

- LibreOffice
- Firefox
- VLC

```bash
sudo apt-get install libreoffice-l10n-es firefox-l10n-xpi-es-es vlc-l10n hunspell-es mythes-es
```
Reiniciar si tenía abierto a LibreOffice y VLC y ya estarán en español

Lo mismo con el Navegador Firefox

Luego, abrir el Navegador e ir a:

**Edit > Settings**

por defecto está el inglés:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4hXTYali2MzzLdAqlRsH60i2OdxPyp3ksv-lmqWQ-Mb8QrDK7B4-i9AEM0qHQY2j6y2dcLco0VK9BJddH56RMHgtlPPWY-x_XFlDhLweQfxNKWVdk829oAMXyg-epNsJFv-qZRIq5MKABTcv1sE_ksiyNw9pztn9i7jneZxPPbpX2CsLX_0cMURxeInw/s16000/Seleccionar%20el%20lenguage%20en%20espa%C3%B1ol%20para%20Firefox.png)

y marcar en:

**Language**

seleccionar el:

**Español**

Para los diccionarios ejemplo en Español u otro dioma ver:

**Firefox, Firefox-ESR Idiomas interfaz & correctores ortográficos**  
[https://facilitarelsoftwarelibre.blogspot.com/2020/06/usar-varios-correctores-ortograficos-en-firefox.html](https://facilitarelsoftwarelibre.blogspot.com/2020/06/usar-varios-correctores-ortograficos-en-firefox.html)  

# Consejo 

Después de instalar los paquetes o los de más abajo:

1. Reinicia las aplicaciones  
2. Verifica el idioma en la configuración de cada programa  
3. En LibreOffice:  

   * Herramientas → Opciones → Configuración de Idiomas→  Idiomas  
   
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrRHBwd4fOxk5LEEI2WggdfRxqvs5x8aF11nIwYxoXZro0qQy2i10TC6ir77jnXeduDRoVjXxGNBkKOmUrycHX4KUf7Yu-Ys04bX5O8Ws4htmZYe3w5BLFoyzgJrBMuW8FNcNS6nF79dOrXtmDC8tEN45sqiWGRjISAhQZb7Xoe_3KUvvaD4KbemXGHME/s829/Configuración%20de%20los%20idiomas%20en%20LibreOffice.png)

---

## Caso especial: Firefox ESR

Si usas Firefox ESR el Idioma español es:

```bash
sudo apt-get install firefox-esr-l10n-es-es
```

---

## 📦 Paquetes de idioma más importantes, por paquetes
Los siguientes son todos los paquetes ya visto y además otro más:


### LibreOffice

#### 📦 `libreoffice-l10n-es`

Idioma español de la interfaz de LibreOffice

```bash
sudo apt-get install libreoffice-l10n-es
```

#### 📦 `hunspell-es`

Corrector ortográfico en español

```bash
sudo apt-get install hunspell-es
```

**Nota:** Este diccionario también lo pueden usar otro programas

#### 📦 `mythes-es`

Diccionario de sinónimos para LibreOffice

```bash
sudo apt-get install mythes-es
```

**Nota:** Este diccionario también lo pueden usar otro programas

---

### 🌐 Navegadores

#### 📦 `firefox-l10n-xpi-es-es`

Idioma español para Firefox

```bash
sudo apt-get install firefox-l10n-xpi-es-es
```

#### 📦 `firefox-esr-l10n-es-es`

Idioma español para Firefox ESR

```bash
sudo apt-get install firefox-esr-l10n-es-es
```

#### 📦 `chromium-l10n`

Idioma español para el Navegador Web Chromium

```bash
sudo apt-get install chromium-l10n
```

---

### 🎵 Multimedia

#### 📦 `vlc-l10n`

Idioma español para VLC

```bash
sudo apt-get install vlc-l10n
```

#### 📦 `smplayer-l10n`

Idioma español para SMPlayer

```bash
sudo apt-get install smplayer-l10n
```

---

#### 📦 `qttranslations5-l10n`

Traducciones para aplicaciones Qt5

```bash
sudo apt-get install qttranslations5-l10n
```

#### 📦 `calligra-l10n-es`

Idiomas para la suite Calligra

```bash
sudo apt-get install calligra-l10n-es
```

#### 📦 `qterminal-l10n`

Idioma para QTerminal

```bash
sudo apt-get install qterminal-l10n
```

---

### Internet y otros

#### 📦 `thunderbird-l10n-es-es`

Idioma español para Thunderbird

```bash
sudo apt-get install thunderbird-l10n-es-es
```

#### 📦 `aegisub-l10n`

Idioma para Aegisub (editor de subtítulos)

```bash
sudo apt-get install aegisub-l10n
```

---

### Diseño

#### 📦 `aspell-es`

Corrector ortográfico en español (usado por programas como Inkscape)

```bash
sudo apt-get install aspell-es
```

---

## Cómo encontrar más paquetes de idioma


### Desde Synaptic
Puedes buscar paquetes de idioma en synaptic buscando la palabra:

l10n

**Nota:** Esa "l" es la letra ele seguida del numero días y luego la ene.


###  Desde la terminal

Puedes buscar paquetes de idioma con:

```bash
apt search l10n
```

💡 Consejo:
Busca combinando el nombre del programa con `l10n`, por ejemplo:

* `vlc-l10n`
* `chromium-l10n`

---

## ⚠️ ¿Por qué pasa esto?

MX Linux y antiX priorizan:

* ⚡ Ligereza
* 💾 Bajo consumo de espacio
* 🧩 Instalación modular

Por eso, muchos paquetes de idioma **no vienen instalados por defecto** (en otros Sistemas Operativos de instalan todos los idiomas pero la ISO es más grande)

---

Dios les bendiga

---

    