# Qoder CLI en Linux: cómo activar YOLO Mode y trabajar sin confirmaciones constantes

## Introducción

Quienes desarrollamos software con agentes de inteligencia artificial desde la terminal de Linux sabemos que las confirmaciones de permisos pueden interrumpir el flujo de trabajo. Cada vez que el agente necesita ejecutar un comando, modificar archivos o realizar determinadas operaciones, puede detenerse y solicitar autorización.

**Qoder CLI ofrece una solución para este problema: YOLO Mode**, un modo de permisos que permite trabajar con mayor autonomía, evitando las solicitudes de aprobación habituales.

En esta entrada veremos cómo activarlo de forma rápida mientras Qoder ya está trabajando en un repositorio.

## ¿Qué es Qoder CLI?

Qoder CLI es una herramienta de programación asistida por inteligencia artificial que funciona directamente desde la terminal. Permite trabajar sobre un repositorio, analizar código, corregir errores, modificar archivos y desarrollar nuevas funcionalidades sin necesidad de utilizar un entorno de desarrollo gráfico.

Su página oficial es:

https://qoder.com/cli

Desde allí se puede consultar información sobre la herramienta y encontrar las instrucciones de instalación para los distintos sistemas operativos compatibles.

## ¿Qué es YOLO Mode?

YOLO Mode es un modo de permisos de Qoder CLI que permite al agente ejecutar sus operaciones sin solicitar confirmación para cada acción que normalmente requeriría autorización.

El nombre técnico de este modo es `bypass_permissions`.

Cuando está activo, el agente puede trabajar con mayor fluidez, lo que resulta especialmente útil durante sesiones de desarrollo en las que se realizan numerosos cambios en el código fuente.

Sin embargo, no significa que desaparezcan todas las protecciones: Qoder mantiene algunas restricciones de seguridad para determinadas operaciones destructivas y rutas sensibles.

## Cómo activar YOLO Mode mientras Qoder está funcionando

Esta es la parte más importante de esta guía.

Si ya has abierto un repositorio y Qoder CLI está funcionando en la terminal de Linux, **no necesitas cerrar el programa ni iniciar una nueva sesión**.

Simplemente presiona esta combinación de teclas:

**Ctrl + Y**

Qoder cambiará directamente a YOLO Mode, siempre que el directorio de trabajo sea de confianza y la configuración permita utilizar este modo.

A partir de ese momento, podrás continuar trabajando con el agente sin las confirmaciones habituales de permisos.

Este atajo está documentado oficialmente por Qoder.

## ¿Cómo comprobar los demás modos de permisos?

Qoder CLI también permite cambiar entre los distintos modos de permisos mediante el atajo:

**Shift + Tab**

Puedes utilizarlo para recorrer los modos disponibles y elegir el que mejor se adapte a tu tarea.

Por ejemplo, `accept_edits` permite aprobar automáticamente determinadas modificaciones de archivos dentro del directorio de trabajo, mientras que otras operaciones, como los comandos de terminal, pueden seguir requiriendo autorización.

## ¿Se puede iniciar Qoder directamente en YOLO Mode?

Sí. Si prefieres activar este modo desde el principio, puedes entrar en el directorio de tu proyecto y ejecutar Qoder con el parámetro correspondiente:

```bash
cd /ruta/a/tu/repositorio
qoder --yolo
```

También puedes utilizar el nombre completo del modo:

```bash
qoder --permission-mode bypass_permissions
```

Ambos comandos permiten iniciar una sesión con YOLO Mode. El directorio debe ser de confianza y la configuración de seguridad no debe bloquear este modo.

## ¿Es seguro trabajar con todos los permisos?

YOLO Mode puede ahorrar tiempo, pero debe utilizarse con responsabilidad.

Al permitir que el agente ejecute acciones sin las confirmaciones habituales, existe el riesgo de que modifique archivos incorrectamente, ejecute comandos no deseados o elimine información importante.

Por eso, antes de utilizarlo, conviene tomar algunas precauciones:

- Trabajar dentro de un repositorio de confianza.
- Mantener el código bajo control de versiones con Git.
- Realizar commits antes de comenzar tareas importantes.
- Conservar copias de seguridad de los archivos esenciales.
- Revisar los cambios realizados por el agente antes de publicarlos o desplegarlos.

Es importante recordar que YOLO Mode no convierte al agente en infalible ni garantiza que sus modificaciones sean correctas.

## Instalación de Qoder CLI

Para quienes todavía no han instalado la herramienta, la página oficial es:

https://qoder.com/cli

La documentación oficial proporciona instrucciones para Linux, macOS y Windows.

En Linux y macOS, el método recomendado utiliza este comando:

```bash
curl -fsSL https://qoder.com/install | bash
```

En Windows PowerShell se puede utilizar:

```powershell
irm https://qoder.com/install.ps1 | iex
```

También existen instrucciones para Windows CMD en la página oficial. Conviene consultar la documentación antes de instalar o actualizar la herramienta, ya que los requisitos y procedimientos pueden cambiar.

## Conclusión

Para quienes desarrollamos software con agentes de inteligencia artificial desde la terminal de Linux, conocer los atajos de Qoder CLI puede mejorar considerablemente el flujo de trabajo.

La combinación **Ctrl + Y** permite activar YOLO Mode directamente durante una sesión en curso, sin tener que cerrar Qoder ni reiniciar el trabajo.

Es una función especialmente útil para desarrollar programas, refactorizar código y realizar tareas repetitivas en repositorios, siempre que se utilice con las precauciones necesarias.

**Documentación oficial:**

- Qoder CLI: https://qoder.com/cli
- Permisos y YOLO Mode: https://docs.qoder.com/cli/permissions
- Instalación y actualización: https://docs.qoder.com/cli/installation

*Explorar estas herramientas y aprender a utilizarlas correctamente nos permite aprovechar mejor la inteligencia artificial para desarrollar software desde el escritorio Linux y mantener el control sobre nuestros proyectos.*
