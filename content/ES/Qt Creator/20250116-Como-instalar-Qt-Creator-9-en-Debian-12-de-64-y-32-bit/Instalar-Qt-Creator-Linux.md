![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKxqQCg35NY6_WNRZ-hnimIbnUuw1vfkhPaXFFkRmAwBCzuJoXda3m7X_NbqPFFWg0Qo_G0tsBQzqLqYQ0NrJamBEeTZgNQGZIfKiBUfTfdJ0iGw18CTdLx-TByYiv7-h0k3bVbA5Fnk_4y5soPcoyjiNmiYq9WQX5QLuDCO92CCa8QbFaod4xDn-3v7k/s1536/Portada.jpg =640x)

# Como instalar Qt Creator 9 en Debian 12 de 64 y 32 bit

Estaba instalando Qt Creator y me salió este mensaje:

Can't add kits and can't choose Qt version in Qt Creator

Aquí les dejo algunas palabras clave para buscar en Google:

There is no GCC as a compiler and is compatible with your version of Qt for Qt Creator

Después de investigar, encontré que este problema ocurre porque faltan dependencias importantes como el compilador, herramientas de Qt y otras librerías necesarias.

A continuación se muestran los pasos para solucionarlo.

## Actualizar e instalar actualizaciones

```bash
sudo apt-get update && sudo apt upgrade
```

**Nota:** Esta instalación es para instalar Qt Creator desde los paquetes de Debian 12, no desde [Qt](https://www.qt.io/offline-installers).

---

# **Instalar Qt Creator y Qt**

Los siguientes son los pasos para instalar Qt Creator en Debian 12 de 32 o 64 bit

## 1. Instalar las dependencias

Abre una terminal y ejecuta el siguiente comando:

```bash
sudo apt-get install cmake build-essential libqt5x11extras5-dev qt5-qmake \
      dh-make qtbase5-dev-tools extra-cmake-modules qtdeclarative5-dev-tools \
      qtdeclarative5-dev qtcreator qttools5-dev qttools5-dev-tools \
      libqt5svg5-dev clang xterm cmake-extras qmlscene-qt6 qmlscene \
      qml qmake6 qt6-base-dev libdbusmenu-qt5-dev gdb qtcreator-doc
```

Este comando instala:

* Qt Creator (IDE)
* Librerías de Qt (Qt5 y Qt6)
* Compilador (GCC)
* Herramientas de construcción (cmake, qmake)
* Debugger (`gdb`) para depuración

### Dependencias adicionales (opcional)

En la siguiente guía también recomiendan instalar:

[https://web.stanford.edu/dept/cs_edu/resources/qt/install-linux](https://web.stanford.edu/dept/cs_edu/resources/qt/install-linux)

```bash
sudo apt-get -y install openssl libssl-dev libxkbcommon-x11-dev \
      libgl1-mesa-dev libqt5x11extras5 '^libxcb.*-dev' libx11-xcb-dev \
      libglu1-mesa-dev libxrender-dev libxi-dev libxkbcommon-dev
```

**Nota:** Posible paquete obsoleto ya no necesario `libssl1.0`

👉 En la práctica, Qt Creator funciona sin estas dependencias adicionales,
pero pueden ser útiles en algunos casos específicos.

✔ Esto instalará todo lo necesario para desarrollar aplicaciones en Qt.

## 2. **Abrir Qt Creator**

* Una vez instalado, abre Qt Creator desde el menú de aplicaciones o ejecutando `qtcreator` en la terminal o desde sus aplicaciones:

## 3. **Crear un nuevo proyecto**

* En Qt Creator, haz clic en **"File"** (Archivo) > **"New Project"** (Nuevo  proyecto).

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiDt1zPdmGzUJfVwKwzAcIa9vKZu28tQbryNOrK6GYYyZtTvxHzaXfIGDnQSDZgRRGN4eUJrXnx90HyhRACEyz4i33jhpFWNBC9b1SGaccGfl12sj-3ftpg-tEUp9d6m2Z7pYOdLZxuV_4UUwxgJfb5esA0DHYrucyDNbK_oxio56lwWRmIATb5Km_9_aY/s874/00%20New%20project.png)

* En Projects por defecto estará en **"Application (Qt)"** y de la ventana que aparece, selecciona **"Qt Widgets Application"** si deseas crear una aplicación de escritorio con interfaz gráfica. (También puedes seleccionar otros tipos de proyectos como **"Qt Console Application"** o **"Qt Quick Application"** según tus necesidades.)
* Ahora haz clic en el botón **"Choose...**

## 4. **Configurar el proyecto**

Ahora debes de rellenar:

* Escribe un nombre para tu proyecto (Sin espacios) en **"Name:"**
* Elige la ubicación donde deseas guardar el proyecto en **"Create in:"** da clic en el botón **"Browse..."** y busca un lugar para tus proyectos de Qt

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTl1-ay27_1n7pI5upRbzVADIna6DX4UO9QtJb0i0Pa2uxbjev7XwEJlqjwyrneCAKu0ejvIllBvC5zeymC-LFdXR8G3K1XymkD-hhQhYXl0I5BHQY7dIMYH-UOqvJaKobWSZR7yETDMmyTWpGEK2BzneFag6FEYaLkXzJKh_6pI-jIm2_vSgFu-XMVn4/s799/01%20Projects%20location%20-ok.png)

* Si deseas puedes seleccionar marcando **"Use as default project location"** para que allí el programa entienda que estarán tus proyectos
* Haz clic en **"Next"** (Siguiente).

## 5. **Configurar el kit de desarrollo**

* En **"Build System"** cambia la opciòn por defecto (CMake) por **qmake**

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCdCcyQTX2O_sBIctEjrSIoBfde9_aFUSoLyPuIMkFeW5Lbt098AWCO9cN0T5hFx4rPsRmbkGoEj5JmTH4lI1nvpxaokJ1eqV3rA6pfTdu4BwgzTqr5hMddp_OAuPdy3B4ijjXoxjv_iGYcq5LN2RWtchXJwfc6C8H4GJHzA5P3tm5_GwpFZJ1nnJCF4M/s16000-rw/02%20Build%20system.png)

porque si no hace esto en Debian 12 luego no se crea el archivo .pro

## 6. **Class Information (Información de la clase)**

En esta ventana Qt Creator define automáticamente la estructura básica de tu aplicación. Aquí se crean los archivos principales de la ventana.

A continuación se explica cada opción:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZIg3BPSnsAPahK8kkoIxXfF3amH6nGypEW01byImrG7OrADd_oHdZLZP4etNrVn4ee5ox74ZLHBgv-b8iD8Ij6Vnt63LeyBncdd45f8iot_d4DhpBoyxzZkTz7xl2c5IMpq-oj25h9J-xdyTpyWjSA_Q1s3Z-qsWBvBFxVmJZmY3yvgW2b0_CD1BlEZo/s799/03%20Class%20Information.png)

* **Class name:**
  Es el nombre de la clase principal de tu aplicación.
  👉 Por defecto es `MainWindow`, y puedes dejarlo así si estás comenzando.
  👉 Si quieres un nombre personalizado, puedes cambiarlo (ejemplo: `MiVentana`), pero evita espacios.

* **Base class:**
  Define de qué tipo será tu ventana principal.
  👉 `QMainWindow` es la opción más común para aplicaciones con menú, barras y estructura completa.
  👉 No es necesario cambiarlo si estás empezando.

* **Header file:**
  Es el archivo `.h` donde se declara la clase.
  👉 Ejemplo: `mainwindow.h`
  👉 Normalmente no necesitas cambiarlo.

* **Source file:**
  Es el archivo `.cpp` donde se implementa la clase.
  👉 Ejemplo: `mainwindow.cpp`
  👉 Tampoco es necesario modificarlo.

* **Generate form:**
  Esta opción genera automáticamente la interfaz gráfica.
  ✅ Déjala marcada SIEMPRE si quieres trabajar con interfaz visual (lo recomendado).
  ❌ Si la desmarcas, tendrás que crear toda la interfaz por código.

* **Form file:**
  Es el archivo `.ui` que contiene el diseño gráfico.
  👉 Ejemplo: `mainwindow.ui`
  👉 Este archivo se edita visualmente (arrastrando botones, textos, etc).

---

### ✅ Recomendación

Para empezar, **no cambies nada en esta ventana** y simplemente haz clic en:

👉 **Next (Siguiente)**

---

Aquí tienes el bloque listo para añadir a tu archivo `Instalar Qt Creator v2.md`, justo debajo de la imagen **"04 Translation File.png"**:

---

## 7. **Translation File (Archivo de traducción)**


![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkaMWiTbsooYxF8Calp77-a_0gUZ5-QT4aBSiDHy3Fz9nyZKVdYfLfhHKfSrzNXV9RRwH26tmLGkwT9j5jtmcH0g1PBYPmmiyMfpo5jG-UMMRLc4dqMVNwEJL5N3W8qfaYtMabFPR8Y6C1CFmaCsgPRTf_0FIyIevTAdr8hzmZY0PQw64y0j4ivKy47Ps/s798/04%20Translation%20File.png)

En esta ventana Qt Creator te da la opción de preparar tu aplicación para múltiples idiomas usando **Qt Linguist**.

Esto sirve si deseas que tu programa esté disponible en varios idiomas (por ejemplo: español, inglés, etc).

### Explicación de las opciones:

* **Language:**
  Permite seleccionar el idioma al que deseas traducir tu aplicación.
  👉 Ejemplo: Spanish (es), English (en), etc.

* **Translation file:**
  Aquí se generará automáticamente un archivo con extensión `.ts`
  👉 Ejemplo: `MiPrograma_es.ts`
  👉 Este archivo se usa para traducir los textos de la aplicación.

### ¿Debo configurar esto ahora?

* Si estás empezando o solo quieres probar Qt:
  👉 Déjalo en **`<none>`** (como está por defecto)
* Si deseas crear una aplicación en varios idiomas:
  👉 Selecciona un idioma y Qt generará el archivo de traducción automáticamente

### ✅ Recomendación

Para este tutorial:

👉 **No cambies nada** y haz clic en **Next (Siguiente)**
💡 Más adelante puedes añadir traducciones sin problema, no es obligatorio hacerlo en este paso.


---

## 8. **Kits (Configuración del entorno de compilación)**

En esta sección Qt Creator define el entorno que se usará para compilar y ejecutar tu aplicación, si le das clic en Detalles se verá así:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5euiNzF12kJA4qAedr6m3VP6HjF3E2RmN5KBNubyt2TkkMH0qkFJcpTdSylvURdMytC13RaGWQt9hBJ98ZdVNJRhw8hJPsp0Iw9f0O8Gychxg-WiATRZJ8l3fJejE8ONp4U0Dzn4XNV-Vzrthz6qj67toyDPOpjsHQSwRR2MVhD6EMDsn_P04t3dAODQ/s1029/05%20Kit%20Selection.png)

En la ventana:

* **Desktop:**
  Representa el entorno de desarrollo para aplicaciones de escritorio en tu computadora.

* Dentro de Desktop aparecen tres configuraciones:

  * **Debug:**
    Se utiliza para pruebas durante el desarrollo.

  * **Release:**
    Genera una versión optimizada del programa para uso final.

  * **Profile:**
    Permite analizar el rendimiento de la aplicación.

👉 Todas estas opciones pueden dejarse marcadas por defecto.

👉 Cada una tiene una ruta de compilación (build), donde Qt Creator guardará los archivos generados.

### Selección del Kit

Si le das clic en "Manage" se verá así:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAvkvcJ5wXzRmhyphenhyphenw1AaVg9zTHTyusufIV_2kjyXK5-Lg36QvZSbkzHM-dzaxvjq_RNvbIEXFaXmzCCoXdzawKqA_JrFl6mFNls8elK28Cig77rwwWAkynOJclkDDsLz7YWTAEzpaNa3jyssV5HC6UJTWqQo5Q9joaluT2p_u4teUTy8gj5swFq2nwTeJ8/s909/06%20Kits%20-%20Manual%20-%20Desktop.png)


### ⚙️ Configuración interna del Kit

Al hacer clic en **Manage...**, se abre la configuración detallada del Kit:

* **Device type:**
  Tipo de dispositivo donde se ejecutará la aplicación (en este caso, Desktop).

* **Device / Build device:**
  Indica que el programa se ejecutará en tu computadora local.

* **Compiler (C y C++):**
  Aquí se muestra el compilador que se utilizará (normalmente GCC).

* **Qt version:**
  Versión de Qt detectada automáticamente en el sistema.

* **CMake Tool:**
  Herramienta usada para compilar proyectos basados en CMake.

👉 Estas configuraciones normalmente se detectan automáticamente y **no es necesario modificarlas**.

### ✅ Recomendación

Para este paso del tutorial:

👉 Deja todas las opciones como están
👉 Haz clic en **Next (Siguiente)**
💡 Esta sección es clave porque asegura que Qt Creator tenga todo listo para compilar correctamente tu aplicación.

---

Aquí tienes el bloque listo para añadir a tu archivo `Instalar Qt Creator v2.md`, correspondiente a la imagen **"07 Project Management.png"**:

---

## 9. **Summary / Project Management (Resumen del proyecto)**

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmZUq9l1vtQNwsUYzTWMvefOuNM49ouV4KrPoiNyrwCacdMVkgBmxiwWTVHNgrKl4blUa1jvgu4rXInCdlHfyt86pxgf6Xg3g5EYH_WXzbYwSFxyrVCVaxkB4Y9Z-wo2W_NQRCepjs2pAa6vgB2IMBPXbzHFr8tY-VtWVy3L3rAeiP-d5pCptZUzIOB8U/s986/07%20Project%20Management.png)

En esta última ventana Qt Creator muestra un resumen de todo lo que se va a crear para tu proyecto.

### Opciones superiores

* **Add as a subproject to project:**
  Permite añadir este proyecto como subproyecto dentro de otro.
  👉 Para este tutorial déjalo en **`<None>`**

* **Add to version control:**
  Permite añadir el proyecto a un sistema de control de versiones como Git.
  👉 Puedes dejarlo en **`<None>`** si estás empezando
  👉 Más adelante puedes usar Git sin problema abriendo la terminal desde la carpeta y usando los comandos git para tal propósito.

### Archivos que se crearán

En la parte inferior verás algo como:

```
Files to be added in:
/home/wachin/Dev2/Qt-Creator/Prueba-de-programa-Qt:

Prueba-de-programa-Qt.pro
main.cpp
mainwindow.cpp
mainwindow.h
mainwindow.ui
```

Estos son los archivos principales de tu aplicación:

* **.pro** → Archivo de configuración del proyecto
* **main.cpp** → Punto de entrada del programa
* **mainwindow.cpp / .h** → Lógica de la ventana principal
* **mainwindow.ui** → Diseño gráfico de la interfaz

### ✅ Finalizar

Si todo está correcto:

👉 Haz clic en **Finish (Finalizar)**
💡 Después de esto, Qt Creator abrirá automáticamente tu proyecto y ya podrás comenzar a programar.

## Resultado final

Con esto ya tienes:

✔ Qt Creator instalado correctamente
✔ Proyecto creado desde cero
✔ Entorno listo para desarrollar aplicaciones en Qt

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiq4yt9zbAJMFZgc4N8zEa5rj1mwinVsqVQZ_oHj4pE8R3iDjNDTNV0crEXL1e-tz6RduawRqYU8-lXZjVS0PyUwF_EA9neTtVwA6qY6A4eN0mM3xjJ3Cxtyg0owYfOAY8s02gOucJ4VvF7AGd-m7hHB4MJ2_CfLnSuHZfcO_MR_npskVti8HPbaabpPmQ/s906/08%20Proyecto%20creado.png)

---

## 10. **Proyecto creado correctamente**

Después de hacer clic en **Finish**, Qt Creator abrirá automáticamente tu nuevo proyecto.

### ¿Qué estás viendo?

* En el panel izquierdo (**Projects**):

  * **Headers:** Archivos `.h` (definiciones de clases)
  * **Sources:** Archivos `.cpp` (código fuente)
  * **Forms:** Archivos `.ui` (interfaz gráfica)

👉 Aquí puedes navegar fácilmente por todos los archivos de tu proyecto.

### Archivo principal: `main.cpp`

En el centro de la pantalla verás el archivo `main.cpp`, que contiene el punto de entrada de tu aplicación:

```cpp
#include "mainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
    w.show();
    return a.exec();
}
```

### ¿Qué hace este código?

* `QApplication` → Inicializa la aplicación Qt
* `MainWindow w;` → Crea la ventana principal
* `w.show();` → Muestra la ventana en pantalla
* `a.exec();` → Ejecuta el bucle principal del programa

### ▶️ Ejecutar el programa

Para probar tu aplicación:

* Haz clic en el botón **▶ (Run)** en la parte inferior izquierda
  **o**
* Presiona: `Ctrl + R`

👉 Si todo está correcto, se abrirá una ventana vacía:
¡Tu primera aplicación Qt!

### 💡 Nota

Puede aparecer un mensaje en la parte inferior ofreciendo un recorrido por la interfaz (*UI Tour*).
👉 Puedes cerrarlo sin problema o explorarlo si deseas conocer mejor el entorno.

---

### 3. **Modificar `mainwindow.h` y `mainwindow.cpp`:**

* Abre `mainwindow.h` y `mainwindow.cpp` para editar la clase de la ventana principal.

* Si necesitas agregar widgets adicionales o personalizar la ventana principal, puedes hacerlo aquí. La clase `MainWindow` debería heredar de `QMainWindow`, y típicamente se verá así en el archivo `mainwindow.h`:

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
};
#endif // MAINWINDOW_H
```

* En `mainwindow.cpp`, se construye y configura la interfaz:

```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}
```



### 4. **Diseño de la Interfaz Gráfica (`mainwindow.ui`):**

* En `Forms` dale doble clic a `mainwindow.ui` y se abrirá el editor de diseño gráfico de Qt Creator. Aquí puedes arrastrar y soltar widgets para diseñar la interfaz visual de tu aplicación.

* Para compilar el proyecto, haz clic en el botón **"Build"** (Construir) o presiona `Ctrl + B`.

* Para ejecutar el proyecto, haz clic en **"Run"** (Ejecutar) o presiona Ctrl + R.

## 9. **Modificar y agregar código**

* Puedes comenzar a modificar el archivo principal (main.cpp) y la ventana principal (mainwindow.ui y mainwindow.cpp) para desarrollar tu aplicación.

## 10. Abrir un ejemplo de aplicación escrita en Qt

* Cierre Qt Creator y vuelvalo a abrir
* Clone el siguiente repositorio en algún directorio (debe tener instalado git):

```bash
git clone https://github.com/Anchakor/MRichTextEditor
```

* En Qt Creator de clic en **"File"** > **"Open File or Project..."** y busque el archivo:

**MRichTextEditor.pro**

* a la derecha de la ventana de clic en **"Configure Project"** y a la izquierda arriba en **"Projects"**  en **"MRichTextEditor (Master)"** busque el archivo: **MRichTextEditor.pro** dandole doble clic para que lo abra, y luego dele clic en:

* **"Build"** > **"Build Project MRichTextEditor"** y a la esquina abajo derecha está la información de la compilación, cuando se ponga verde ya está y de clic en:

* **"Build"** > **"Run"**

y se abrirá el programa.

### Proyectos de programas en Qt en GitHub

Puede buscar en [www.github.com](www.github.com) las palabras:

Text Editor Qt

allí encontré otro proyecto que también se abre:

[https://github.com/pr-ravi/TextEditor-Qt](https://github.com/pr-ravi/TextEditor-Qt)

---

## Consultas:

**How to install qt version?(for Linux)**  
[https://forum.qt.io/topic/116658/how-to-install-qt-version-for-linux](https://forum.qt.io/topic/116658/how-to-install-qt-version-for-linux)  

**Instalar ksnip 1.9.0 en Linux desde código fuente 32 y 64 bits (cmake prefix hacia /usr**  
[https://facilitarelsoftwarelibre.blogspot.com/2021/03/compilar-ksnip-desde-codigo-fuente-en-linux.html](https://facilitarelsoftwarelibre.blogspot.com/2021/03/compilar-ksnip-desde-codigo-fuente-en-linux.html)  

**"No QML utility installed" not letting me use Qt6**  
[https://forum.qt.io/topic/145219/no-qml-utility-installed-not-letting-me-use-qt6/9](https://forum.qt.io/topic/145219/no-qml-utility-installed-not-letting-me-use-qt6/9)  
sudo apt install qml-qt6  

**qtcreator: no qml utility**  
[https://groups.google.com/g/linux.debian.user/c/T9yImA-5abY](https://groups.google.com/g/linux.debian.user/c/T9yImA-5abY)
But if i execute on cmdline  
qml -v  
the output is  
Qml Runtime 5.15.8  
"which qml" says /usr/bin/qml  
This packages are installed:  
sudo apt install qtcreator qml build-essential qtbase5-dev qt5-qmake cmake  

**Getting Started With Qt and Qt Creator on Linux**  
By Jeff Tranter Wednesday, October 12, 2016  
[https://www.ics.com/blog/getting-started-qt-and-qt-creator-linux](https://www.ics.com/blog/getting-started-qt-and-qt-creator-linux)  
sudo apt-get install build-essential libgl1-mesa-dev  

**clazy**  
[https://github.com/KDE/clazy](https://github.com/KDE/clazy)  
Ubuntu: sudo apt install g++ cmake clang llvm-dev git-core libclang-dev  

**Ubuntu 22.04 with Qt6 - qmake: could not find a Qt installation of ''**  
[https://askubuntu.com/questions/1460242/ubuntu-22-04-with-qt6-qmake-could-not-find-a-qt-installation-of](https://askubuntu.com/questions/1460242/ubuntu-22-04-with-qt6-qmake-could-not-find-a-qt-installation-of)  

**How to Compile Qt from Source Code on Linux**  
By Jeff Tranter Wednesday, January 4, 2017  
[https://www.ics.com/blog/how-compile-qt-source-code-linux](https://www.ics.com/blog/how-compile-qt-source-code-linux)  

[https://vitux.com/compiling-your-first-qt-program-in-ubuntu/](https://vitux.com/compiling-your-first-qt-program-in-ubuntu/)  
sudo apt-get install qt5-doc qtbase5-examples qtbase5-doc-html  

**Instalando dmidiplayer 1.7.0 en MX Linux 21 de 32 o 64 bits desde código fuente**  
[https://facilitarelsoftwarelibre.blogspot.com/2022/10/instalando-dmidiplayer-1.7-en-mx-linux-21-desde-src.html](https://facilitarelsoftwarelibre.blogspot.com/2022/10/instalando-dmidiplayer-1.7-en-mx-linux-21-desde-src.html)  

---

# 11. Crear una app con PySide6 o PyQt6 en Qt Creator

Qt Creator está diseñado principalmente para C++, pero también permite trabajar con Python usando **PySide6** o **PyQt6**.

En esta sección crearemos una aplicación sencilla tipo *Hola Mundo*

## PySide6 & PyQt6 (IMPORTANTE)

Antes de empezar, debes saber:

* **PySide6** → Oficial de Qt (recomendado por Qt)
* **PyQt6** → Muy popular y ampliamente usado

👉 Ambos funcionan casi igual
👉 El código es prácticamente el mismo

**Nota:** Si tienes un programa en PyQt6, puedes seguir usándolo sin problema, pero es necesario instalar PySide6 en Qt Creator:

---

## PASO 1: Crear proyecto Python

### 1.1 Appliction Qt for Python

Ve a:

👉 **File → New Project**

Selecciona:

**Appliction (Qt for Python) →  Empty Application**

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiB-k_1tWLbWX18dsYvq0E800Yls5ocOijqQ6sHAjAe8n9iq2ttdOIzXUXe4cwhVBoXgg_H03nApPPDE4p1UnBqruIe6Z_DkYzB9jrbML5WIetuKSf_3z6aMP0PV10_9kz8zG76FReJmXufJ7DBz-Sxy-vUdlxxwH2G5fdobE4IGobj8wBAQ8Jvi0dGFY/s923/01%20Appliction%20(Qt%20for%20Python)%20-%20Empty%20Application.png)


**Qué significa “Empty Application”?**.- Esta opción crea:

✔ Un proyecto básico en Python
✔ Con la estructura mínima de una aplicación Qt
✔ Incluye un archivo `main.py` listo para comenzar

Una vez seleccionado:

👉 Haz clic en el botón **“Choose…”**

**Recomendación.-** Para comenzar con PyQt6 o PySide6, esta es la mejor opción porque:

* Es simple
* No añade código innecesario
* Permite construir la aplicación desde cero

**Tip.-** Más adelante puedes probar otras opciones como:

* **Window UI** → para trabajar con interfaces gráficas más avanzadas
* **Qt Quick Application** → para interfaces modernas (QML)

### 1.2. Elige ubicación y nombre

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgY_8JoQUbNc1BgTsW5t_s2MnkKYFBuyqF0y9U2n1x1wCCzk5iThMKnYVxr0kF5SBQ3p8JuxhLXmT9D5EhkraBKnNXJ9W5xc7YnIuoB-9aabe4Rlejx-x0LrjBhjmPn_1_o_srj-CVM48iPM1_plI8kna34IkW4M_WqFpVvX-GqQPXEsHrr-Qr_opMYQyA/s802/02%20Qt%20Creator%20-%20Project%20location.png)


**Project Location =** Configurar ubicación del proyecto

En esta ventana debes definir el nombre y la ubicación donde se guardará tu proyecto Python.

Campos importantes **Name:** aquí escribes el nombre de tu proyecto.

  👉 Ejemplo: `My-proyecto-pyqt6`
  👉 Evita espacios para evitar problemas en rutas o código.

* **Create in:**
  Define la carpeta donde se guardará el proyecto.
  👉 Puedes escribir la ruta manualmente o usar el botón **Browse...** para elegirla.

* **Use as default project location:**
  Si marcas esta opción, Qt Creator usará esta carpeta como ubicación predeterminada para futuros proyectos.

👉 Es útil si quieres mantener todos tus proyectos organizados en un mismo lugar.

Después de configurar estos datos:

👉 Haz clic en **Next (Siguiente)**

**Recomendación:** Se recomienda usar una carpeta dedicada para desarrollo, por ejemplo:

```text
~/Dev
~/Proyectos
~/Qt-Creator
```

Esto facilita la organización de tus proyectos a largo plazo.

**Tip para tus proyectos: **Usar nombres claros como:

```text
mi-app-pyqt6
editor-texto-qt
visor-imagenes
```

te ayudará a identificar rápidamente tus proyectos en el futuro.

### 1.3 Finaliza el asistente

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGyd2Qrl4MuLYiPC9A7yUp5LpkIaG3Og4K6gkmKbscTYNQBMSerltNfFu2PhyKLsR7nj5_ukwDgtCmw3Nsl115IGJdFfS46wvi10lFtjtgHkFMww79JUNPz93MhtHUKfFfOg5fk6qko9rrdgUdwGVwyvdiS4t6VQo9m8vbdnbG32ADkPXS3RbEjQQe76M/s796/03%20Define%20Project%20Details.png)

**Define Project Details =** Definir detalles del proyecto (Python Qt)

En esta ventana Qt Creator te pide seleccionar la versión de Qt para Python que usará el proyecto.

**Opción disponible:**  **PySide version:**

  👉 Aquí aparece seleccionada por defecto la opción:

```text
PySide6
```
👉 Qt Creator creará el proyecto usando **PySide6**, que es la versión oficial de Qt para Python.

**Importante (muy útil para el lector)**.- Aunque aquí se seleccione PySide6:

👉 **Esto no es obligatorio**

✔ Puedes usar PySide6
✔ O puedes usar **PyQt6**

**¿Qué hacer en este paso?**.- Deja la opción en **PySide6** (no hay problema)

Luego Haz clic en **Next (Siguiente)**

**Nota importante**.- Qt Creator genera el proyecto usando PySide6 por defecto, pero:

👉 Más adelante puedes modificar el código para usar PyQt6 sin problema.

Ejemplo:

```
# PySide6
from PySide6.QtWidgets import QApplication
```

```
# PyQt6
from PyQt6.QtWidgets import QApplication
```

aunque igual si pegas un código hecho en PyQt6 igual lo cogerá

**Tip:** PySide6 y PyQt6 son muy similares, por lo que cambiar de uno a otro normalmente solo requiere modificar los imports.

### 1.4 Project Management.-

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiObwlx9ZKqMzBJ21eqEKc5pKnN8SZP-9pXcJvG8qmslWoIfNn32LTfm8ek-Af5T6ZHvVJOfaaFmffebz3QmKDENTY8mNTP5YS3RJdFSdZJGC2xk-tVkRJLyUCJbnnrb98qxu7ZIgiOnFdsGyxg4499TNfFZ-iPmp9G7spwkKmT5db_0fOOSForah2vin8/s795/04%20Project%20Management.png)

### 1.5 . Finalizar creación del proyecto (Project Management) y Cerrar Qt Creator

Tenemos que cerrarlo porque a continuación vamos a crear el entorno virual de python y si está abierto no lo va a reconocer)

**Sbre las opciones disponibles**

* **Add as a subproject to project:**
  Permite añadir este proyecto dentro de otro proyecto más grande, pero como no estámos creando este proyecto dentro de otro está en **`<None>`**

* **Add to version control:**
  Permite integrar el proyecto con sistemas como Git.
  👉 Puedes dejarlo en **`<None>`** si estás empezando
  👉 Más adelante puedes usar Git sin problema abriendo la terminal desde la carpeta y usando los comandos git para tal propósito.

**Archivos que se crearán.-** En la parte inferior verás algo como:

```
Files to be added in:
/home/wachin/Dev2/Qt-Creator/My-proyecto-pyqt6:

My-proyecto-pyqt6.pyproject
main.py
```

**¿Qué significan estos archivos?**

* **.pyproject** → Archivo de configuración del proyecto en Qt Creator, es que luego cuando cierres Qt Creator debes de abrir para que se abra el proyecto.
* **main.py** → Archivo principal donde comienza tu aplicación

**Finalizar.-** Si todo está correcto 👉 Haz clic en **Finish (Finalizar)** y **Cerrar Qt Creator**

---

## PASO 2: Instalar el entorno venv para que Qt Creator pueda usar PySide6 o PyQt6

Si no se hace esto, al crear un proyecto Python en Qt Creator, aparecerá un mensaje indicando que falta instalar **PySide6**. Si se intenta instalar directamente, fallará en Debian 12 / MX Linux 23 debido a la protección del sistema (**PEP 668**), pues le daría el siguiente error:

```
tuusuario@tumaquina: ~/la/ruta/de/tu/proyecto
$ pip install PyQt6
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.

    If you wish to install a non-Debian-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make
    sure you have python3-full installed.

    If you wish to install a non-Debian packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.

    See /usr/share/doc/python3.11/README.venv for more information.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```

👉 **SOLUCION** **Crear manualmente un entorno virtual (venv)** dentro del proyecto

### Crear entorno virtual

En Debian 12 y MX Linux 23, el soporte para entornos virtuales no viene instalado por defecto.

**✅ Solución**

Instalar el paquete necesario:

```bash
sudo apt install python3-venv python3 python3-pip
```

**Nota:** Estos comandos sólo son para usar una vez, pues son paquetes de los repositorios y esos sólo se instalan una sóla vez (exepto que los desinstale)

Abre una terminal en la carpeta del proyecto Python/Qt Creator:

```bash
cd /ruta/del/proyecto-python
```

**Nota 1:**  Cuidado se equivoca y abra la terminal en una carpeta que no es la de su proyecto Python/Qt Creator.

**Nota 2:** Esto posiblemente en Windows también funcione, allí abría que usar PowerShell y buscar los comandos específicos para Windows.

Ejemplo en la carpeta de mi proyecto, en Thunar doy clic derecho y abro con la consola o terminal:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzwx67shaFwsoJ-xnj2qiT_DP9cYFCYPHTUy8OysaC8vuyNmt4xtedllS2XQiFmXLpq7fOSKvfpUFvumJ8D6OpImwDNn4v6odGq-oJO3EyEFH6cfRCLbn8jI-03tR1Zxx_2ArSPiXMhAeW7Ly9ogaJNS3ye0bBjdtzZFj5Ic34KBxovPt3Di7UX12foj4/s600/06%20abrir%20una%20terminal%20en%20el%20proyecto%20python.png)

y poner:

```bash
python3 -m venv venv
```

y luego activa el entorno con:

```bash
source venv/bin/activate
```

y verá algo semejante a esto:

```bash
(venv) tuusuario@tumaquina:...
```

en mi caso te compartiré cómo puse los comandos en la terminal en el lugar correcto (para mi):

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0soGWD7DLM7176q6WMAgVn6Vp_DvzhrEi9emO9UOPyJYFCVjwCfjhvVFHEMQmagLqkX47FJbXC0cyfk-DayspIwZr1i-YTsSxbeiQchYJIVwcXNTlE3cuk5AfLb6T9NC6CKs8Ri_z7iC0-2hYNfLSvBvfIOkGzguUXHearjiauupsgCI5_omCqrjvMUk/s815/06.2%20crear%20el%20entorno%20virtual.png)

deje abierta esa instancia de la terminal, **no la cierre**:

---

## PASO 3: Abrir nuevamente el proyecto Python en Qt Creator

Cuando ya ha activado el entorno virtual, abra Qt Creator y en:

**File > Open File or Project..**

o también más rapido en el botón **"Open Project..."** busque la carpeta de su proyecto Python/Qt Creator y abra el archivo .pyproject, y Qt Creator detectará automáticamente el entorno virtual venv.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDd3Lett5CQ3VfbwBxAt94GxI5P9glGv3fLUzj3EbrMfMEnaiMhSxVFtC7A3Gnem8AdCXXRj8bzUtsiOsc3qJVbLfbWYUfvKAW0a6yRtSC5g5GK6urbqIt0ThIXP7yZSyo0nBlyzrtTEwgENG_TSnZY6sOwn-KsTfxsAoRUzOotFsxMbhABCDZKcJQhMs/s960/07%20abrir%20el%20proyecto%20python.png)

##  PASO 4: instalar PySide6 desde Qt Creator

👉 Haz clic en el botón **"Install"** que aparecerá en Qt Creator:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi79urMpy5VJY8bDfIvhh8aff1TNy-3aqO6_HIbcPCsNOKi9yMHfeozF2B6ejNI-ABIaQ8D1T4ndPQ5ga__GG9gtvBdPV07OPUtrbTAupjENfVS00eBENS6WAstbUOMynnytvQoGsj6LG73XXsQTtSEsSi3iF3tfCtsOYgkivPkiYK5q1X_7avqZDnZm3s/s1023/08%20Instala%20PySide6%20y%20PyLS.png)

con esto:

✔ Qt Creator usará el entorno virtual
✔ La instalación se realizará correctamente
✔ No aparecerá el error `externally-managed-environment`

**Además instala PLS.-** Aparecerá ese mensaje, instalo.

**¿Por qué funciona?.-** Porque ahora Qt Creator **ya no usa el Python del sistema**, sino el Python dentro del entorno virtual:

👉 Este entorno no está restringido por Debian
👉 Permite que Qt Creator use `pip` sin conflictos

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizGjAKIAGWgYH-47ROIuHyG5yLLC_cxvMJEHA4PZrX3pxqy6G6uIguYAxV9f0v5cKOgG4HfBRruo0QbsGNLzq-Ile3P_JWUtxZEETiiVcTklZmElQPKMBv7N6wu-kmLutMx0Af_Zr2ZzE_IavWoCUflSZu6BjbqrYpiljUAKv8tOPz7gBYCb8sUvblmPw/s1019/09%20Instalados%20correctamente%20PySide6%20y%20PyLS.png)

## PASO 5: Crear aplicación Hello World

En Qt Creator de doble clic en la izquierda al archivo:

main.py

y borre todo su contenido

### Ejemplo con PySide6

Coloque allí el siguiente código:

```python
import sys
from PySide6.QtWidgets import QApplication, QLabel

app = QApplication(sys.argv)

label = QLabel("¡Hola mundo desde PySide6!")
label.resize(300, 100)
label.show()

sys.exit(app.exec())
```

y guarde con "**Ctrl + S**" o en "**File > Save**"

### ▶️ Ejecutar la aplicación

* Haz clic en **Run (▶)**
  o
* Presiona `Ctrl + R`

👉 Se abrirá una ventana con el mensaje:

**¡Hola mundo!**

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUekR96ToXLoDgykdFnHMyyG8fW9BJfmsjdn1OhAW17IgD2BnvuuVnXhG0hFBMkEpEfro34rb3NMmlA1W8bLZq0N2jPIlzKv8klv5z4AkJmiqlebiZNWMFh7PoK_wiwTr-5N6GkxijokpfXpO8FBDazT3aiHYtB_d2sIryiJ7K-UC_vLOVRjtlTYQbTvs/s1021/10%20Hola%20mundo.png)

### Ejemplo con PyQt6

También puede reemplazar el código anterior con el siguiente y funcionará igual:

```python
import sys
from PyQt6.QtWidgets import QApplication, QLabel

app = QApplication(sys.argv)

label = QLabel("¡Hola mundo desde PyQt6!")
label.resize(300, 100)
label.show()

sys.exit(app.exec())
```

Si tiene una App que fue hecha con PyQt6 funcionará igual. Haz clic en **Run (▶)** o presiona `Ctrl + R` y funcionará.

### ¿Cómo desactivar el venv? (omitir si está trabajando en su entorno virtual)

Después de que termine usted de hacer lo que estaba desarrollando, para salir del entono virtual, en la terminal donde está algo semejante a esto:

```bash
(venv) tuusuario@tumaquina:...
```

para salir del entorno virtual simplemente ejecuta:

```bash
deactivate
```

y se cerrará.

###  Diferencia clave con C++

👉 Aquí NO se usan Kits
👉 NO se compila el programa
👉 Qt Creator actúa como editor + lanzador

### Acerca de los IDE

Si trabajas mucho con Python:

👉 Qt Creator funciona bien
👉 Pero herramientas como:

* VS Code
* PyCharm

👉 porían ser también usables, pero en Qt Creator está la herramienta para Diseñar interfaces, mencionada a continuación.

---

# 12. Crear interfaz con Qt Designer + usarla en PyQt6

Una de las formas más rápidas de crear interfaces gráficas en Qt es usando **Qt Designer**, una herramienta visual donde puedes diseñar ventanas arrastrando componentes.

Luego puedes usar ese diseño directamente en Python con **PyQt6** o **PySide6**.

## ¿Qué es Qt Designer?

Es una herramienta visual incluida con Qt que permite:

✔ Crear interfaces sin programar
✔ Arrastrar botones, textos, layouts, etc
✔ Guardar el diseño en un archivo `.ui`


## 1. Abrir Qt Designer

Puedes abrirlo de varias formas:

Desde terminal:

```bash
designer
```

o desde los programas buscar:

Qt 5 Designer

## 2. Crear una interfaz

1. Selecciona:

👉 **Main Window**

2. Haz clic en **Create**

## 3. Diseñar la ventana

Ahora puedes:

* Arrastrar un **QPushButton**
* Arrastrar un **QLabel**
* Cambiar textos desde el panel derecho

Ejemplo:

👉 Cambia el texto del botón a:

```
Click aquí
```

👉 Cambia el texto del label a:

```
Hola mundo
```

## 4. Guardar el archivo

Guarda el archivo como:

```bash
main.ui
```

## 5. Convertir `.ui` a Python

PyQt6 necesita convertir el archivo `.ui` a código Python.

Ejecuta:

```bash
pyuic6 main.ui -o ui_main.py
```

👉 Esto generará:

```
ui_main.py
```

este archivo lo puedes subir a una IA y ayudarte con ella a desarrollar la idea que tenías en mente pues ella te ayudará con el código necesario.

--

## El paquete PyQt6 se puede instalar de dos formas `apt` o `pip` en Linux

### Instalación con pip

El paquete PyQt6 se puede instalar así para el entorno virtual VENV:

```bash
pip install PyQt6
```

este tipo de instalación es para el entorno virtual venv.

👉 Muchos desarrolladores usan entorno virtual:

```bash
python3 -m venv venv
source venv/bin/activate
pip install PyQt6
```

Para usarlo en Windows también se usa este tipo de instalación, pero son otros comandos para activar el entorno virtual, eso debe usted de buscar.

---

### Instalación con paquete deb

En los repositorios de MX Linux 23 basado en Debian 12 y derivados además hay este paquete:

```bash
sudo apt install python3-pyqt6
```

puedes revisar la disponibilidad en:

[http://packages.debian.org/python3-pyqt6](http://packages.debian.org/python3-pyqt6)

También en Ubuntu y sabores, y derivados:

[https://packages.ubuntu.com/python3-pyqt6](https://packages.ubuntu.com/python3-pyqt6)

este tipo de paquete se usa cuando en un programa que se esté desarrollando todos los paquetes estén en la distribución Linux y no se quiera usar venv, así se trabaja directo y más rapido (generalmente esto hago yo).

---

# Referencias

Qt for Python (PySide6) – Documentación oficial  
[https://doc.qt.io/qtforpython/](https://doc.qt.io/qtforpython/)  

PyQt6 – Documentación oficial  
[https://www.riverbankcomputing.com/static/Docs/PyQt6/](https://www.riverbankcomputing.com/static/Docs/PyQt6/)  

Qt Creator – Documentación oficial  
[https://doc.qt.io/qtcreator/](https://doc.qt.io/qtcreator/)  

Python venv – Entornos virtuales (documentación oficial)  
[https://docs.python.org/3/library/venv.html](https://docs.python.org/3/library/venv.html)  

PEP 668 – Externally Managed Environments  
[https://peps.python.org/pep-0668/](https://peps.python.org/pep-0668/)  

python-lsp-server (PyLS moderno)  
[https://github.com/python-lsp/python-lsp-server](https://github.com/python-lsp/python-lsp-server)  

Qt Designer – Manual oficial  
[https://doc.qt.io/qt-6/qtdesigner-manual.html](https://doc.qt.io/qt-6/qtdesigner-manual.html)  

Paquete PyQt6 en Debian  
[https://packages.debian.org/python3-pyqt6](https://packages.debian.org/python3-pyqt6)  

---

Dios les bendiga

---
