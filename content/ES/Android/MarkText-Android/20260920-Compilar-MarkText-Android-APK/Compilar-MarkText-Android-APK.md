# Cómo compilar MarkText para Android y enviar el APK a tu celular

Guía práctica, probada en **MX Linux 25 / Debian 13**, con **Android Studio instalado en `/opt/android-studio`** y un celular Android conectado por USB.

Al final tendrás el APK instalado en el teléfono, con la función de **imágenes locales** (las que están en una carpeta `images/` junto a tu `.md`) funcionando.

---

## 0. Resumen rápido (lo que de verdad se usa)

```bash
cd ~/AndroidStudioProjects/marktext-android

pnpm install        # 1) dependencias
pnpm android:sync   # 2) compila la web y la copia al proyecto Android
pnpm android:open   # 3) abre Android Studio
```

Y ya dentro de Android Studio: esperar el *Gradle sync* y pulsar **Run ▶**.

Si prefieres **sin Android Studio** (solo terminal, con el celular conectado):

```bash
cd ~/AndroidStudioProjects/marktext-android/android
sh gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

## 1. Requisitos (una sola vez)

| Qué | Cómo comprobarlo | Nota |
| --- | --- | --- |
| Node.js + pnpm | `node -v` · `pnpm -v` | El repo fija `pnpm@10.33.3` |
| Android Studio | menú de aplicaciones, o `ls /opt/android-studio/bin/studio.sh` | En este equipo está en `/opt` |
| Android SDK | `echo $ANDROID_HOME`, o Android Studio → *SDK Manager* | Necesita **platform 36** y **build-tools 35** |
| JDK 21 | `java -version` | Android Studio ya trae uno |

> **Importante:** no actualices pnpm aunque te avise que hay versión nueva. El proyecto fija `pnpm@10.33.3` en `package.json`; saltar a otra versión puede reescribir `pnpm-lock.yaml` y ensuciar tus cambios.

---

## 2. Configuración que se hace UNA sola vez

### 2.1 Que `pnpm android:open` encuentre Android Studio

**Síntoma.** Al ejecutar `pnpm android:open` sale:

```
[error] Unable to launch Android Studio. Is it installed?
        Attempted to open Android Studio at: /usr/local/android-studio/bin/studio.sh
        You can configure this with the CAPACITOR_ANDROID_STUDIO_PATH environment variable.
```

El CLI de Capacitor busca por defecto en `/usr/local/android-studio`, pero aquí está en `/opt`.

**Solución.**

```bash
echo 'export CAPACITOR_ANDROID_STUDIO_PATH=/opt/android-studio/bin/studio.sh' >> ~/.bashrc
source ~/.bashrc
```

Comprobar que quedó:

```bash
echo $CAPACITOR_ANDROID_STUDIO_PATH
# /opt/android-studio/bin/studio.sh
```

> ⚠️ **No pongas esta variable en ningún archivo del repositorio** (ni `.env`, ni `capacitor.config.ts`, ni `local.properties` versionado). Es configuración de *tu* máquina: si se cuela en un commit, el mantenedor la rechazará.

### 2.2 Instalar Android SDK Build-Tools 35 (si hace falta)

**Síntoma.** Al compilar:

```
Failed to find Build Tools revision 35.0.0
```

El Android Gradle Plugin (8.13.0) usa por defecto la build-tools 35.

**Solución.** Android Studio → **SDK Manager** → pestaña **SDK Tools** → marcar **Show Package Details** (abajo a la derecha) → desplegar **Android SDK Build-Tools** → marcar **35.0.0** → *Apply*.

---

## 3. Compilar paso a paso

### 3.1 `pnpm install` — dependencias

```bash
cd ~/AndroidStudioProjects/marktext-android
pnpm install
```

**Mensajes normales que verás:**

- `? The modules directory at ".../node_modules" will be removed and reinstalled from scratch. Proceed?` → responde **`Y`**. Solo reinstala dependencias; no toca tu código.
- Un recuadro `Update available! 10.33.3 → 12.x.x` → **ignóralo** (ver aviso en el punto 1).

**Al terminar, revisa el lockfile:**

```bash
git status --short
```

Si aparece `M pnpm-lock.yaml`, es una deriva conocida y **no relacionada** con tus cambios: pnpm resuelve el tarball de `file-icons` a otro commit. Revíertelo para que tus commits queden limpios:

```bash
git checkout -- pnpm-lock.yaml
```

### 3.2 `pnpm android:sync` — compilar la web y copiarla a Android

```bash
pnpm android:sync
```

Esto hace internamente:

1. `pnpm typecheck` → comprueba tipos con `vue-tsc`.
2. `vite build` → genera la app web en `dist/`.
3. `cap sync android` → copia `dist/` a `android/app/src/main/assets/public/` y actualiza la configuración de Capacitor.

**Salida esperada:**

```
✓ built in 5.36s
✔ Copying web assets from dist to android/app/src/main/assets/public
✔ Creating capacitor.config.json in android/app/src/main/assets
✔ update android in 59.63ms
[info] Sync finished in 0.272s
```

**Mensaje normal (no es error):**

```
(!) Some chunks are larger than 500 kB after minification.
```

Es solo un aviso de tamaño de los *bundles*. No afecta al funcionamiento.

### 3.3 `pnpm android:open` — abrir Android Studio

```bash
pnpm android:open
```

Abre Android Studio directamente en la carpeta `android/` del proyecto.

### 3.4 Compilar e instalar desde Android Studio

1. **Espera el *Gradle sync*.** Abajo verás una barra de progreso; la primera vez tarda bastante. Cuando termine, ya no hay barra.
   - Si no arranca solo: *File → Sync Project with Gradle Files*.
2. **Conecta el celular** por USB con la **depuración USB** activada (ver punto 4.1). Debe aparecer en el desplegable de dispositivos de la barra superior.
3. Pulsa **Run ▶** (o `Shift+F10`).
4. Android Studio compila, instala y abre la app en el teléfono.

**Dónde queda el APK que generó** (si quieres copiarlo a otro lado):

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Para generarlo sin ejecutarlo: *Build → Build App Bundle(s) / APK(s) → Build APK(s)*.

### 3.5 Alternativa: compilar solo por terminal (sin IDE)

```bash
cd ~/AndroidStudioProjects/marktext-android/android
sh gradlew assembleDebug
```

> Usa **`sh gradlew`**, no `./gradlew`: en este repositorio el archivo `gradlew` está guardado **sin permiso de ejecución**, así que `./gradlew` da `Permiso denegado`.

El APK queda en:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 4. Enviar el APK al celular

### 4.1 Activar la depuración USB (una sola vez por celular)

1. Ajustes → **Información del teléfono** → toca **Número de compilación** 7 veces (se activan las *Opciones de desarrollador*).
2. Ajustes → **Opciones de desarrollador** → activa **Depuración USB**.
3. Conecta el cable USB. En el teléfono aparece un diálogo *¿Permitir depuración USB?* → **Permitir** (y marca "Recordar").

Comprobar que el equipo lo ve:

```bash
adb devices
# Debe listar tu teléfono como "device", no "unauthorized"
```

### 4.2 Opción A — instalar por USB con `adb` (la más cómoda)

```bash
cd ~/AndroidStudioProjects/marktext-android
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

- `-r` reinstala conservando los datos de la app (si la firma coincide).
- Si `adb` no está en el PATH: `~/Android/Sdk/platform-tools/adb`.

### 4.3 Opción B — copiar el archivo y abrirlo en el teléfono

1. Copia `app-debug.apk` al teléfono (por MTP desde el gestor de archivos, o `adb push`).
2. En el teléfono, ábrelo con el gestor de archivos.
3. Android pedirá permitir **instalar apps de origen desconocido** para esa app → concédelo.

### 4.4 ⚠️ Conflicto de firma (muy habitual)

Si tienes instalada la versión **de release** (el APK de GitHub) e intentas instalar la de **debug**, falla:

```
INSTALL_FAILED_UPDATE_INCOMPATIBLE: Package io.github.renakoni.marktextandroid
signatures do not match previously installed version
```

El build de debug se firma con la *debug keystore* (`~/.android/debug.keystore`), distinta de la del release.

**Solución:** desinstala antes MarkText del teléfono (perderás borradores y lista de recientes), o pruébalo en otro dispositivo/emulador.

---

## 5. Mensajes que **parecen** errores pero no lo son

| Mensaje | Qué es | Qué hacer |
| --- | --- | --- |
| `SDK processing. This version only understands SDK XML versions up to 3 but an SDK XML file of version 4 was encountered...` | Desajuste entre tu Android Studio (IDE) y los paquetes del SDK, que son más nuevos. Es cosmético. | Nada. La compilación funciona igual. Solo se quita actualizando Android Studio. |
| `Project update recommended — Android Gradle plugin version 8.13.0 has an upgrade version available` | La *AGP Upgrade Assistant* sugiere subir el Android Gradle Plugin. | **No la aceptes.** Dale a *Remind me later* / *Don't ask again*. Cambiaría `android/build.gradle` y el wrapper, riesgo innecesario y ruido en el repositorio. |
| `WARNING: Using flatDir should be avoided because it doesn't support any meta-data formats.` | Aviso de la configuración de Capacitor. | Nada. |
| `Unable to initialize metrics, ensure ~/.android is writable` | Android Studio no pudo escribir una métrica de uso. | Nada. |
| `Some chunks are larger than 500 kB after minification` | Tamaño de los *bundles* web. | Nada. |
| `Update available! 10.33.3 → 12.x.x` (pnpm) | Hay pnpm más nuevo. | No actualices (el repo fija 10.33.3). |

---

## 6. Problemas comunes

| Síntoma | Causa | Solución |
| --- | --- | --- |
| `[error] Unable to launch Android Studio` | Capacitor busca el IDE en `/usr/local` | Ver **2.1** |
| `Failed to find Build Tools revision 35.0.0` | Falta la build-tools 35 | Ver **2.2** |
| `./gradlew: Permiso denegado` | `gradlew` sin bit de ejecución | Usa `sh gradlew ...` |
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | Firma debug vs. release | Desinstala la app antes (ver **4.4**) |
| `adb devices` vacío o `unauthorized` | Depuración USB apagada / no autorizado | Ver **4.1** |
| `git status` muestra `M pnpm-lock.yaml` | Deriva de resolución de pnpm | `git checkout -- pnpm-lock.yaml` |
| La app abre pero las imágenes locales no se ven | Falta conceder la carpeta | Ver **7** |

---

## 7. Probar la función de imágenes locales

Esta versión ya carga las imágenes que están **en una carpeta junto a tu `.md`**.

1. Copia al teléfono la **carpeta completa** del documento, no solo el `.md`. Por ejemplo:
   ```
   /sdcard/Documents/8vo/20260920-MarkText-.../
   ├── MarkText.md
   └── images/
       └── Designer.png
   ```
   Debe ir el `.md` **y** su carpeta `images/`.
2. Abre `MarkText.md` desde MarkText (inicio → **Abrir**).
3. Aparecerá un diálogo:

   > **¿Mostrar las imágenes locales?**
   > Este documento enlaza N imágenes guardadas en la carpeta «…». Permite a MarkText acceder a esa carpeta para mostrarlas.
   > **[ Permitir ] [ Ahora no ]**

   Pulsa **Permitir**.
4. Se abre el selector de carpetas de Android, ya situado en la carpeta del documento. Confirma con **Usar esta carpeta** / **Permitir**.
5. Las imágenes aparecen. **La concesión se recuerda**: los siguientes documentos de esa misma carpeta ya no preguntan.

**Detalles útiles:**

- Si pulsas **Ahora no**, las imágenes quedan ocultas; al reabrir el documento vuelve a preguntar.
- Una imagen que escribas **mientras editas** (por ejemplo `![](images/otra.png)`) también se resuelve, siempre que la carpeta ya esté concedida.
- La **exportación a PDF** también incluye estas imágenes locales.
- Para revocar el permiso: Ajustes de Android → Apps → MarkText → *Almacenamiento y permisos*, o desde el propio selector de carpetas del sistema.

---

## 8. Flujo de trabajo con Git (mantener los commits limpios)

```bash
cd ~/AndroidStudioProjects/marktext-android

# Antes de empezar a trabajar, revisa que no arrastras cambios raros
git status --short

# Después de compilar, pnpm puede haber tocado el lockfile por su cuenta:
git checkout -- pnpm-lock.yaml      # si aparece modificado y no lo cambiaste tú
```

Cosas que **no** deben entrar en un commit de este repositorio:

- `pnpm-lock.yaml` con la deriva de `file-icons` (no es tu cambio).
- La variable `CAPACITOR_ANDROID_STUDIO_PATH` (es de tu máquina).
- Carpetas personales como `8vo/`, `node_modules/`, `dist/`, `android/app/build/` (ya están en `.gitignore`).

---

## 9. Chuleta final

```bash
# Compilar todo y abrir el IDE
cd ~/AndroidStudioProjects/marktext-android
pnpm install
pnpm android:sync
pnpm android:open
# …esperar Gradle sync y pulsar Run ▶

# O bien, sin IDE:
cd ~/AndroidStudioProjects/marktext-android/android
sh gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk

# Si algo se rompe, reconstruir limpio:
sh gradlew clean assembleDebug
```

---

*Documento local. La carpeta `8vo/` está ignorada por git, así que este manual no se sube al repositorio.*
