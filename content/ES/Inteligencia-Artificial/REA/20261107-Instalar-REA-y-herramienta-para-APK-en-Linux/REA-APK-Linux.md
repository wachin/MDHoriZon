Aquí tienes el tutorial redactado especialmente para tu blog. Está estructurado paso a paso, utilizando **exclusivamente** los comandos y soluciones que te funcionaron en nuestra sesión, y explicando el *por qué* de cada paso para que los lectores lo entiendan fácilmente.

Puedes copiar y pegar este texto directamente en tu editor de Markdown para el blog.

***

# Cómo instalar REA (Reverse Engineer Anything) y JADX para analizar APKs en Linux

**REA** (Reverse Engineer Anything) es una potente herramienta de ingeniería inversa que se integra con asistentes de IA (como DeepSeek Harness o Claude) para analizar todo tipo de archivos. Si tu objetivo es auditar o investigar una aplicación de Android (APK), REA necesita un motor especializado llamado **JADX**.

En este tutorial, veremos cómo instalar REA en Linux y cómo configurar manualmente el motor JADX para que la IA pueda decompilar y analizar aplicaciones de Android paso a paso.

---

## Paso 1: Preparar Node.js (La base de REA)

REA se ejecuta sobre Node.js. Para evitar errores de compatibilidad (como el temido error `EBADENGINE`), necesitas una versión reciente. La herramienta exige al menos la versión **22.23.4** o **24.22.1**.

Si estás en Debian, Ubuntu o MX Linux, puedes actualizar tu Node.js a través de los repositorios (si ya usas NodeSource) o simplemente actualizando tu sistema:

```bash
sudo apt update && sudo apt upgrade
```

Puedes verificar tu versión actual con:
```bash
node --version
```
*(Si tienes una versión menor a la 22.23.4, el instalador de REA se detendrá y te pedirá que actualices).*

---

## Paso 2: Instalar REA en tu cliente de IA

El método más sencillo para instalar REA es usar `npx`. Abre tu terminal y ejecuta el instalador indicando el cliente que uses (en este ejemplo, usaremos `dsh` para DeepSeek Harness):

```bash
npx rea-agents@latest setup --client dsh
```

El instalador te mostrará un resumen de lo que va a hacer. Te preguntará si deseas aplicar los cambios (crear el archivo de configuración MCP y descargar la habilidad de ingeniería inversa). Selecciona **"Yes, apply"**.

> ⚠️ **Importante:** Una vez terminada la instalación, **debes reiniciar tu cliente de IA** (cerrar y volver a abrir DeepSeek Harness) para que cargue el nuevo servidor MCP.

---

## Paso 3: Requisitos previos para Android (Java y herramientas)

Para que la IA pueda leer una APK, necesitas herramientas externas. En Linux (Debian/Ubuntu), instala lo siguiente:

1.  **JDK 17 o superior** (JADX lo necesita para funcionar; la versión 25 funciona perfectamente):
    ```bash
    sudo apt install openjdk-17-jdk
    ```
2.  **Herramientas opcionales pero recomendadas** (para recursos y extracción desde el dispositivo):
    ```bash
    sudo apt install apktool adb
    ```

---

## Paso 4: Descargar el motor JADX (Manual)

REA no descarga JADX por ti por razones de seguridad. Debes obtenerlo tú mismo.

1. Ve a la página oficial de releases en GitHub:
   [https://github.com/1013503897/jadx-headless-mcp/releases](https://github.com/1013503897/jadx-headless-mcp/releases)
2. Busca la versión más reciente (en la parte superior). En el momento de escribir esto, es la **v0.8.0**, pero el número puede cambiar.
3. En la sección **Assets**, haz clic en el archivo que termine en **`-all.jar`** (por ejemplo: `jadx-headless-mcp-0.8.0-all.jar`).
4. Mueve el archivo a una carpeta estable. Por ejemplo:
   ```bash
   mkdir -p ~/.local/share/rea/android/
   mv ~/Descargas/jadx-headless-mcp-*-all.jar ~/.local/share/rea/android/
   ```

---

## Paso 5: Configurar la variable de entorno

REA necesita saber exactamente dónde guardaste ese archivo `.jar`. Abre tu archivo de configuración de terminal:

```bash
nano ~/.bashrc
```

Añade la siguiente línea al final del archivo (asegúrate de poner el nombre exacto de tu archivo `.jar`):

```bash
export REA_JADX_MCP_JAR="$HOME/.local/share/rea/android/jadx-headless-mcp-0.8.0-all.jar"
```

Guarda el archivo, cierra el editor y recarga tu terminal para aplicar los cambios:
```bash
source ~/.bashrc
```
Puedes comprobar que la ruta es correcta ejecutando `echo $REA_JADX_MCP_JAR`.

---

## Paso 6: Refrescar la configuración de REA

Como agregaste una nueva variable de entorno (`REA_JADX_MCP_JAR`) después de instalar REA inicialmente, debes volver a ejecutar el setup para que el cliente de IA lo detecte:

```bash
npx rea-agents@latest setup --client dsh
```
Vuelve a decir **"Yes, apply"** y, al terminar, **reinicia tu cliente de IA** (DeepSeek Harness).

---

## Paso 7: Verificar la instalación

Para confirmar que todo salió bien, ejecuta el comando "doctor" de REA:

```bash
npx rea-agents@latest doctor --client dsh
```

Verás un reporte largo. Busca el bloque llamado `providerInspections` y ubica la sección `- id: jadx`. Si todo está bien, debería verse así:

```yaml
  - id: jadx
    configured: true
    available: true
    registrationEnvironment:
      REA_JADX_MCP_JAR: /home/tu-usuario/.local/share/rea/android/jadx-headless-mcp-0.8.0-all.jar
```

*Nota: Si el reporte muestra `configured: false`, asegúrate de haber reiniciado tu cliente de IA desde la misma terminal donde ejecutaste el `source ~/.bashrc`.*

---

## ¡Listo para analizar!

Con `available: true`, tu IA ya tiene la capacidad de abrir y entender aplicaciones de Android. Puedes probarlo en una sesión de chat con tu cliente de IA usando un prompt como:

> *"Usa REA para analizar la APK `/ruta/a/tu/app.apk`. Extrae el nombre del paquete, las actividades exportadas y los permisos del manifiesto, mostrando la evidencia."*

¡Feliz ingeniería inversa!
