# Cómo usar FreeLLMAPI gratis con OpenCode en Linux

**FreeLLMAPI** es un router de modelos de inteligencia artificial que permite utilizar los niveles gratuitos de diferentes proveedores mediante una sola API compatible con OpenAI.

Una de sus ventajas es que funciona de manera **local y autoalojada**, por lo que las claves de los proveedores permanecen en el equipo del usuario. Además, puede utilizarse con diferentes agentes de programación, entre ellos **OpenCode, Codex CLI, Cline, Aider, Qwen Code** y otros clientes compatibles con OpenAI. ([FreeLLMAPI][2])

En este tutorial veremos específicamente cómo configurarlo para utilizarlo con **OpenCode CLI en Linux**.

---

## 1. Conocer FreeLLMAPI

El primer paso es visitar la página oficial:

[FreeLLMAPI](https://freellmapi.co/)

FreeLLMAPI se puede utilizar **gratuitamente**. El router es de código abierto y autoalojado, y el uso de los niveles gratuitos de los proveedores no requiere pagar por el router. ([FreeLLMAPI][3])

Existe además un servicio Premium opcional para quienes quieran mantener actualizado el catálogo de modelos en tiempo real.

Actualmente existen dos modalidades Premium:

* **$19 al año**
* **$49 una sola vez, de por vida**

El plan Premium ofrece:

1. **The live catalog on every device.**
2. **New free models, quotas, and fixes as they ship.**
3. **Cancel anytime, fully self-serve.**

Es decir, Premium mantiene actualizado el catálogo de modelos gratuitos, incluyendo nuevos modelos, cambios de cuotas y correcciones, mientras que la versión gratuita utiliza una instantánea del catálogo con cierto retraso. ([FreeLLMAPI][1])

**Sin embargo, para seguir este tutorial no es necesario comprar Premium.**

La versión gratuita es suficiente para utilizar FreeLLMAPI con los proveedores que tengan niveles gratuitos disponibles.

---

# 2. Descargar FreeLLMAPI para Linux

El programa puede descargarse desde el repositorio oficial de GitHub:

[FreeLLMAPI en GitHub](https://github.com/tashfeenahmed/freellmapi)

entrar directamente en la sección de versiones:

[FreeLLMAPI Releases](https://github.com/tashfeenahmed/freellmapi/releases)

En la sección **Releases**, se debe descargar la versión correspondiente a **Linux**, que se distribuye como una aplicación **AppImage**.

Por ejemplo:

```text
FreeLLMAPI-0.11.0.AppImage
```

Una AppImage no necesita una instalación tradicional mediante el gestor de paquetes del sistema.

---

# 3. Dar permisos de ejecución a la AppImage

Después de descargarla, localice el archivo `.AppImage`.

En el administrador de archivos de Linux:

1. Haga clic derecho sobre la AppImage.
2. Seleccione **Propiedades**.
3. Entre en la pestaña **Permisos**.
4. Active la opción que permita **ejecutar el archivo como programa**.
5. Cierre la ventana.

Después haga doble clic sobre la AppImage para ejecutarla.

---

# 4. Configurar FreeLLMAPI

Al abrir FreeLLMAPI, el programa mostrará las instrucciones necesarias para configurarlo.

El usuario deberá agregar las claves API de los proveedores gratuitos que quiera utilizar.

Una vez agregados los proveedores, FreeLLMAPI podrá utilizarlos como fuentes para realizar el enrutamiento de los modelos.

FreeLLMAPI funciona como una capa intermedia: el programa recibe la solicitud del agente de programación y la dirige hacia uno de los proveedores configurados.

Además, FreeLLMAPI proporciona una API compatible con OpenAI, por lo que los programas que permiten configurar una URL base compatible con OpenAI pueden utilizarlo. ([FreeLLMAPI][2])

Vea el siguiente video donde están todas las indicaciones de cómo configurarlo:

[El secreto para desbloquear tokens de IA ilimitados en Linux](https://youtu.be/jipjio0KH30?si=C3RS6KOqmO8rf9ct)

---

# 5. Configurar OpenCode

FreeLLMAPI proporciona una herramienta para configurar automáticamente diferentes agentes de programación.

Para OpenCode nos da este comando:

```bash
npx freellmapi setup-opencode --url http://127.0.0.1:31415
```

Este comando configura OpenCode para utilizar FreeLLMAPI, seguie sus instrucciones.

La configuración utiliza el endpoint local de FreeLLMAPI y la clave API unificada proporcionada por el programa. La documentación oficial de FreeLLMAPI incluye `setup-opencode` entre sus configuradores para agentes compatibles con OpenAI. ([GitHub][4])

Pero **todavía falta un paso muy importante**.

---

# 6. Agregar las dos líneas a `.bashrc`

Este fue el paso fundamental para que OpenCode pudiera utilizar correctamente FreeLLMAPI.

La clave API que proporciona FreeLLMAPI debe estar disponible como una variable de entorno para los programas que se ejecuten desde la terminal.

Para ello hay que editar el archivo:

```text
~/.bashrc
```

## Para usuarios no avanzados: utilizar Gedit

Abra una terminal y escriba (tenga instalado Gedit. Tamién puede usar otro editor de texto):

```bash
gedit ~/.bashrc
```

Al final del archivo agregue las siguientes dos líneas (la primera es para el comentario, o sea son tres):

```bash
# Configuración de FreeLLMAPI para OpenCode
export FREELLMAPI_API_KEY='TU_CLAVE_API_DE_FREELLMAPI'
export OPENCODE_CONFIG="$HOME/.config/opencode/opencode.json"
```

Reemplace:

```text
TU_CLAVE_API_DE_FREELLMAPI
```

por la clave API que proporciona FreeLLMAPI.

Por ejemplo:

```bash
# Configuración de FreeLLMAPI para OpenCode
export FREELLMAPI_API_KEY='freellmapi-XXXXXXXXXXXXXXXX'
export OPENCODE_CONFIG="$HOME/.config/opencode/opencode.json"
```

Guarde el archivo y ciérrelo.

### Para usuarios avanzados: utilizar Nano

Si se prefiere trabajar desde la terminal:

```bash
nano ~/.bashrc
```

Se agregan exactamente las mismas líneas. Después se guarda el archivo y se sale de Nano.

---

# 7. ¿Por qué son importantes estas dos líneas?

La configuración que genera FreeLLMAPI para OpenCode utiliza la variable de entorno:

```text
FREELLMAPI_API_KEY
```

para proporcionar a OpenCode la clave necesaria para comunicarse con el router local.

Por eso, aunque FreeLLMAPI esté correctamente instalado y los proveedores estén configurados, **es necesario que esta variable esté disponible en el entorno donde se ejecuta OpenCode**.

La segunda línea:

```bash
export OPENCODE_CONFIG="$HOME/.config/opencode/opencode.json"
```

indica explícitamente a OpenCode qué archivo de configuración utilizar.

De esta manera, la configuración queda disponible cada vez que se abre una nueva terminal.

> **Importante:** no publique nunca su clave API. Si está grabando un vídeo o haciendo una captura de pantalla, tenga especial cuidado de que la clave no aparezca.

Si se ejecuta:

```bash
echo "$FREELLMAPI_API_KEY"
```

la terminal mostrará la clave API configurada.

**No debe mostrar esa clave a otras personas**, por ejemplo en un vídeo, captura de pantalla o publicación en Internet.

---

# 8. Cerrar y volver a abrir la terminal

Después de modificar `.bashrc`, cierre la terminal y abra una nueva.

Esto hace que Linux cargue nuevamente las variables de entorno definidas en `.bashrc`.

A partir de ese momento, los programas ejecutados desde esa terminal podrán utilizar:

```text
FREELLMAPI_API_KEY
```

---

# 9. Importante: FreeLLMAPI debe estar ejecutándose

Hay algo que conviene entender sobre FreeLLMAPI.

La AppImage no es simplemente una aplicación que se configura una vez y queda funcionando independientemente.

**FreeLLMAPI debe estar ejecutándose para que los demás programas puedan utilizar su API local.**

En Linux, al hacer doble clic sobre la AppImage, FreeLLMAPI puede aparecer primero en la **bandeja del sistema** como un enrutador.

En ese estado el programa está funcionando como router local.

Si se vuelve a hacer doble clic sobre la AppImage, se puede abrir la interfaz principal de FreeLLMAPI.

Por lo tanto, el orden de uso es:

1. Ejecutar FreeLLMAPI.
2. Comprobar que el router está funcionando en la bandeja del sistema.
3. Después abrir OpenCode.
4. OpenCode utilizará la API local proporcionada por FreeLLMAPI.

**Nota**: Este comportamiento podría cambiar en nuevas versiones

Esto es importante porque **OpenCode no se comunica directamente con cada proveedor**. OpenCode se comunica con FreeLLMAPI, y FreeLLMAPI realiza el enrutamiento hacia los proveedores configurados.

---

# 10. Abrir OpenCode

Una vez que FreeLLMAPI está ejecutándose y las variables de entorno fueron agregadas a `.bashrc`, se puede abrir OpenCode:

```bash
opencode
```

Dentro de OpenCode se puede utilizar:

```text
/models
```

para abrir el selector de modelos.

En la lista aparecerá el proveedor:

```text
FreeLLMAPI
```

Seleccione:

```text
Auto
```

FreeLLMAPI se encargará entonces de seleccionar el modelo disponible según su catálogo y los proveedores configurados.

---

# 11. Comenzar a programar con OpenCode

Una vez seleccionado:

```text
FreeLLMAPI → Auto
```

ya se puede comenzar a trabajar normalmente con OpenCode.

Por ejemplo, se puede entrar en un proyecto:

```bash
cd ~/mi-proyecto
```

y ejecutar:

```bash
opencode
```

Después de seleccionar **FreeLLMAPI → Auto**, OpenCode utilizará el router local para realizar las solicitudes a los modelos disponibles.

La ventaja de esta configuración es que el usuario puede cambiar o agregar proveedores en FreeLLMAPI sin tener que configurar individualmente cada proveedor dentro de OpenCode.

---

# 12. ¿Se puede utilizar FreeLLMAPI con otros agentes?

Sí.

Aunque este tutorial está dedicado a **OpenCode**, FreeLLMAPI no está limitado a este programa.

La documentación oficial incluye configuradores para otros agentes como:

* Claude Code
* Codex CLI
* Cline
* Continue
* Aider
* OpenCode
* Goose
* Qwen Code
* Roo Code
* Kilo
* Crush
* Hermes Agent
* y otros.

([GitHub][4])

La idea fundamental es la misma: FreeLLMAPI proporciona un endpoint compatible con OpenAI que puede ser utilizado por diferentes herramientas.

Por eso, una vez configurada correctamente la variable:

```bash
FREELLMAPI_API_KEY
```

otros agentes que puedan utilizar la API de FreeLLMAPI también pueden configurarse para trabajar con ella.

---

## Resumen de la configuración

El procedimiento completo es:

### 1. Descargar FreeLLMAPI

Desde:

[GitHub Releases de FreeLLMAPI](https://github.com/tashfeenahmed/freellmapi/releases)

### 2. Dar permisos de ejecución

Hacer clic derecho sobre la AppImage → **Propiedades → Permisos → permitir ejecutar como programa**.

### 3. Ejecutar FreeLLMAPI

Abrir la AppImage y seguir las instrucciones del programa.

### 4. Agregar las claves de los proveedores

Configurar los proveedores gratuitos que se quieran utilizar.

### 5. Configurar OpenCode

```bash
npx freellmapi setup-opencode --url http://127.0.0.1:31415
```

### 6. Editar `.bashrc`

```bash
gedit ~/.bashrc
```

Y agregar:

```bash
# Configuración de FreeLLMAPI para OpenCode
export FREELLMAPI_API_KEY='TU_CLAVE_API_DE_FREELLMAPI'
export OPENCODE_CONFIG="$HOME/.config/opencode/opencode.json"
```

### 7. Cerrar y abrir nuevamente la terminal

### 8. Ejecutar primero FreeLLMAPI

Debe estar funcionando en la bandeja del sistema.

### 9. Ejecutar OpenCode

```bash
opencode
```

### 10. Dentro de OpenCode

Ejecutar:

```text
/models
```

y seleccionar:

```text
FreeLLMAPI → Auto
```

¡Y listo!

A partir de ese momento, OpenCode podrá utilizar FreeLLMAPI como su proveedor de modelos y FreeLLMAPI se encargará de enrutar las solicitudes hacia los proveedores gratuitos que hayan sido configurados.

---

[1]: https://freellmapi.co/es/pricing "Precios de FreeLLMAPI: router gratis, Premium 19 $/año"
[2]: https://freellmapi.co/faq "FreeLLMAPI FAQ — free LLM API questions answered"
[3]: https://freellmapi.co/ "Free LLM API — every free model behind one key | FreeLLMAPI"
[4]: https://github.com/tashfeenahmed/freellmapi/blob/main/README.md "freellmapi/README.md at main · tashfeenahmed/freellmapi · GitHub"
