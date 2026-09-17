# Cómo pasar los commit desde github.com a salsa.debian.org

Tengo el siguiente problema, hace casi un año creé en salsa.debian.org el proyecto:

https://salsa.debian.org/wachin/xinput-plus

y estuve desarrollando ese programa, este luego lo copié a un repositorio en github con el nombre:

https://github.com/wachin/xinput-plus

y lo seguí desarrollando allí por un año, y ahora quiero pasar los commit desde allí github hacia salsa.debian, pregunto si es posible?

y ya está listo. Pregunto, se pude pasar todos los commit desde https://github.com/wachin/xinput-plus a https://salsa.debian.org/wachin/xinput-plus


Sí, se puede hacer perfectamente. Como ambos son repositorios Git, simplemente cambias el remote o haces un push forzado. Todo el historial de commits se preserva.

Hay dos escenarios:


---

## SOLUCIÓN: Método recomendado: Agregar Salsa como remoto adicional

### Paso 1: Clona tu repositorio de GitHub (si no lo tienes localmente | Omite si la yo tienes)

```bash
git clone https://github.com/wachin/xinput-plus.git
cd xinput-plus
```

### Paso 2: Agrega Salsa como un nuevo remoto

```bash
git remote add salsa git@salsa.debian.org:wachin/xinput-plus.git
```

Nota:  Si prefieres usar HTTPS en lugar de SSH:

```bash
git remote add salsa https://salsa.debian.org/wachin/xinput-plus.git
```

### Paso 3: Verifica los remotos configurados

```bash
git remote -v
```
Deberías ver algo como:

```
origin	https://github.com/wachin/xinput-plus (fetch)
origin	https://github.com/wachin/xinput-plus (push)
salsa	git@salsa.debian.org:wachin/xinput-plus.git (fetch)
salsa	git@salsa.debian.org:wachin/xinput-plus.git (push)
```

### Paso 4: Forzar empujar tus cambios a Salsa

En mi caso yo quiero sobrescribir todo en Salsa sin importar lo que haya allá, así que usaré `--force`. Este comando no verifica el estado previo y simplemente impone tu historial:

```bash
git push salsa main --force
```

Para empujar forzando todas las ramas 

```bash
git push salsa --all --force
```

Una vez que la rama principal se haya subido, no olvides sincronizar las etiquetas forzandolas:

```bash
git push salsa --tags --force
```

### Paso 5: Empuja tus cambios a Salsa

Lo siguiente se usa para empujar la rama principal (main o alguna otra rama que tengas configurada por defecto) y se preguntará hacer fetch, merge, o pull para corregir algo, y se descargarán los cambios que hayan en Salsa lo cual puede no convenirle:

```bash
git push salsa main
```

Para empujar todas las ramas 

```bash
git push salsa --all
```
Para empujar todos los tags:

```bash
git push salsa --tags
```

## Requisitos previos importantes

1. **Clave SSH configurada en Salsa**: Para poder hacer push vía SSH, debes tener tu clave pública agregada en tu cuenta de Salsa. 
2. **Permisos de escritura**: Debes ser miembro o tener acceso de "Maintainer" en el proyecto de Salsa.
3. **Nombre de rama consistente**: Asegúrate de que la rama que quieres sincronizar tenga el mismo nombre en ambos repositorios, o especifica el mapeo explícitamente:


---

## 🔑 Diferencia entre SSH y GPG en Salsa

|  Tipo   |                Propósito principal                 |                      ¿Para qué la usas?                      |
| ------- | -------------------------------------------------- | ------------------------------------------------------------ |
| **SSH** | 🔐 Autenticación para acceder a repositorios Git   | Hacer `git push`, `git pull`, `git clone` vía SSH            |
| **GPG** | ✍️ Firmar commits/tags para verificar autenticidad | Que tus commits aparezcan como "Verified" en la interfaz web |

> 💡 **Para tu caso** (sincronizar GitHub → Salsa), **necesitas configurar la llave SSH**

---

## 🛠️ Cómo generar y agregar tu llave SSH a Salsa

### Paso 1: Generar una nueva llave SSH + passphrase

```bash
# Generar llave ED25519 (recomendada)
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com" -f ~/.ssh/id_ed25519_salsa
```

Presiona **Enter** para aceptar la ubicación por defecto y establece una frase de paso **passphrase** segura, la cual debes anotar en algún lado o en un gestor de contraseñas, y luego por ejemplo:

```bash
wachin@mx23:~
$ ssh-keygen -t ed25519 -C "tu-email@ejemplo.com" -f ~/.ssh/id_ed25519_salsa
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/tuusuario/.ssh/id_ed25519_salsa
Your public key has been saved in /home/tuusuario/.ssh/id_ed25519_salsa.pub
The key fingerprint is:
SHA256:HKLASFASDADFDFhHIOUPOQWERIJdFAidalgaThWEgdH tu-email@ejemplo.com
The key's randomart image is:
+--[ED25519 256]--+
|. . .o o*=B++... |
|.+  ..oo+/.+o.  .|
|.o. ....+ O =.  .|
|+  o . . + = . . |
|o . . . S o + .  |
| .       o E o   |
|          . .    |
|                 |
|                 |
+----[SHA256]-----+
wachin@mx23:~
```

### Paso 2: Copiar tu llave pública

Mostrar la llave pública (la que termina en .pub)

```bash
cat ~/.ssh/id_ed25519_salsa.pub
```
Copia **todo el contenido** que se muestra (comienza con `ssh-ed25519`).

### Paso 3: Agregarla a tu cuenta de Salsa

1. Ve a: [https://salsa.debian.org/-/user_settings/ssh_keys](https://salsa.debian.org/-/user_settings/ssh_keys) 
2. Pega el contenido de tu llave pública en el campo **"Key"**
3. Opcional: Agrega un título identificativo (ej: "Laptop Debian 32-bit")
4. Haz clic en **"Add key"**

### Paso 4: Configurar Git para usar tu llave específica

Si tienes múltiples llaves SSH, edita (o crea) el archivo:

```bash
nano ~/.ssh/config
```

agrega esto:

```bash
Host salsa.debian.org
    User git
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_ed25519_salsa
```

Esto asegura que Git use la llave correcta al conectarse a Salsa


### Paso 5: Verificar la conexión

Probar autenticación con Salsa:

```bash
ssh -T git@salsa.debian.org
```

y te pedirá esto:

```bash
Enter passphrase for key '/home/tuusuario/.ssh/id_ed25519_salsa':
```

debes colocar la passphrase anterior y deberías ver un mensaje como:

```
Welcome to GitLab, @wachin!
```

### Paso 6. Para que no tengas que reiniciar otra vez

Cada vez que abras una terminal nueva, necesitas que exista un `ssh-agent` con tu llave cargada.

#### Opción rápida (manual, cuando haga falta)

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_salsa
```

#### Opción cómoda (automática): instalar `keychain`

Esto hace que KDE/terminales recuerden tu llave y no te la pidan siempre:

```bash
sudo apt install keychain
```

Luego edita el archivo bashrc si sabes usar nano:

```bash
nano ~/.bashrc
```

sino sabes usar [nano](https://facilitarelsoftwarelibre.blogspot.com/2024/08/como-usar-nano-en-linux.html) usa Gedit:

```bash
gedit ~/.bashrc
```

 añade al final de `~/.bashrc` :

```bash
eval "$(keychain --eval --agents ssh id_ed25519_salsa)"
```

Guarda y cierra

Y para no tener que cerrar sesión pon en una terminal:

```bash
source ~/.bashrc
```

y listo

## Ahora sí: sincronizar desde GitHub a Salsa


Sigue el paso anterior:

`Paso 4: Empuja tus cambios a Salsa`


## Solución de problemas comunes

|                  Error                   |             Posible causa             |                                         Solución                                          |
| ---------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `Permission denied (publickey)`          | Llave SSH no agregada o no cargada    | Verifica que la llave pública esté en Salsa y usa `ssh-add ~/.ssh/id_ed25519_salsa` [[7]] |
| `Could not resolve hostname`             | Problema de DNS/red                   | Reinicia terminal o verifica conexión [[7]]                                               |
| Prompt de contraseña al hacer `git push` | SSH no está configurado correctamente | Ejecuta `ssh -Tvvv git@salsa.debian.org` para debuggear [[7]]                             |

---

## ✅ Verificación final

Después de hacer push:
1. Visita https://salsa.debian.org/wachin/xinput-plus
2. Confirma que los commits recientes de GitHub aparecen allí
3. Verifica que las ramas y tags se sincronizaron

---

## Opcional: Sincronización bidireccional futura

Una vez configurado, puedes mantener ambos repositorios sincronizados:

```bash
# Actualizar desde GitHub
git pull origin main

# Empujar cambios a Salsa
git push salsa main

# O viceversa: traer cambios de Salsa y subirlos a GitHub
git pull salsa main
git push origin main
```

---

## ⚠Consideraciones importantes

- **Historial de commits**: Git preservará todo el historial, autores y fechas originales al hacer push a Salsa.
- **Conflictos**: Si ambos repositorios han divergido significativamente, podrías necesitar hacer un `git merge` o `git rebase` antes de empujar.
- **Archivos específicos de Debian**: Si tu proyecto en Salsa está destinado a ser un paquete Debian, asegúrate de que el directorio `debian/` esté correctamente estructurado según las políticas de empaquetado [[17]].

---

## 🛠Verificación final

Después de ejecutar los comandos:

```bash
# Verificar que las ramas están alineadas
git log main salsa/main --oneline -3

# O visitar en tu navegador:
# 👉 https://salsa.debian.org/wachin/xinput-plus
```

Después de hacer push, visita tu proyecto en Salsa, ejemplo el mío:  

https://salsa.debian.org/wachin/xinput-plus  

y verifica que los commits, ramas y tags se hayan sincronizado correctamente.

---

Si encuentras errores de autenticación, verifica:
```bash
# Probar conexión SSH a Salsa
ssh -T git@salsa.debian.org

# Verificar que tu clave está cargada
ssh-add -l
```



# error `stale info`! Es un mecanismo de protección de `--force-with-lease`.

Este error ocurre porque tu repositorio local **no tiene información actualizada** sobre el estado remoto de Salsa. Como `--force-with-lease` verifica que no estés sobrescribiendo cambios "nuevos" que desconoces, necesita que primero actualices tu referencia remota.

Tienes dos soluciones sencillas:

---

## ✅ Opción 1: La rápida (Recomendada para tu caso)

Como confirmaste que **quieres sobrescribir todo en Salsa** sin importar lo que haya allá, usa `--force` normal. Este comando no verifica el estado previo y simplemente impone tu historial:

```bash
git push salsa main --force
```

> ⚠️ Ingresa tu passphrase cuando te la pida. Esto sobrescribirá completamente la rama `main` en Salsa con tu versión local de GitHub.

---

## ✅ Opción 2: Mantener --force-with-lease (Más "correcta")

Si prefieres usar el comando seguro, primero actualiza la información remota y luego reintenta:

```bash
# 1. Actualizar referencias remotas sin mezclar código
git fetch salsa

# 2. Ahora sí, forzar con lease (ya tienes la info actualizada)
git push salsa main --force-with-lease
```

---

## 🏁 Sincronizar etiquetas (Tags)

Una vez que la rama principal se haya subido, no olvides sincronizar las etiquetas:

```bash
git push salsa --tags --force
```

---


Deberías ver que el historial en Salsa ahora es **idéntico** al de GitHub. 🎉

---

## 📋 Resumen de comandos (Copia y pega)

```bash
# Opción rápida y directa:
git push salsa main --force
git push salsa --tags --force
```

