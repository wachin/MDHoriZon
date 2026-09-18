# Git-Crypt para Dummies: Cómo Proteger Tus Archivos Sensibles en GitHub

> **Enemigo número 1:** Hackers que clonan repositorios privados.
> **Tu arma secreta:** git-crypt (¡gratis y de código abierto!)

---

## ¿Qué es git-crypt?

git-crypt es una herramienta que **encripta automáticamente** archivos específicos dentro de tu repositorio Git. Cuando los subes a GitHub, están encriptados y **nadie puede leerlos** aunque clonen tu repositorio. Pero **tú localmente** los ves normales y puedes trabajar con ellos como siempre.

### ¿Qué puede hacer?

- ✅ Encriptar archivos específicos (fotos de cédula, contraseñas, documentos)
- ✅ Modificar archivos dentro de la carpeta encriptada
- ✅ Agregar nuevos archivos a la carpeta encriptada
- ✅ Eliminar archivos de la carpeta encriptada
- ✅ Mantener los archivos encriptados en GitHub (si alguien hackea, solo ve basura cifrada)
- ✅ Trabajar normalmente en tu computadora local

---

## ¿Cómo Funciona? (La Explicación Fácil)

Imagina que tienes un cofre del tesoro:

1. **En tu casa** (computadora local): El cofre está abierto, puedes meter y sacar lo que quieras
2. **Cuando lo envías a GitHub**: El cofre se cierra con candado
3. **Si alguien roba el cofre** (hackea GitHub): Solo ven el candado, no pueden abrirlo
4. **Cuando lo traes de vuelta a tu casa**: El cofre se abre automáticamente con tu llave

---

## Instalación (Paso 1)

### En Linux (Ubuntu/Debian):

```bash
sudo apt install git-crypt
```

### En Mac:

```bash
brew install git-crypt
```

### En Windows:

1. Descarga git-crypt desde: https://github.com/AGWA/git-crypt
2. Sigue las instrucciones de instalación

---

## Configuración (Paso 2)

### Paso 2.1: Inicializar git-crypt en tu repositorio

Ve a la carpeta de tu repositorio y ejecuta:

```bash
cd /ruta/a/tu/repositorio
git-crypt init
```

Esto genera una **llave secreta** que se guarda en tu computadora. **¡NUNCA pierdas esta llave!**

### Paso 2.2: Exportar tu llave (¡MUY IMPORTANTE!)

```bash
git-crypt export-key /ruta/segura/git-crypt-key.key
```

**¿Por qué?** Si pierdes esta llave, **nunca podrás desencriptar tus archivos**. Guárdala en:
- Un USB que guardes en lugar seguro
- Un disco duro externo
- Un lugar seguro en tu casa

**NUNCA la subas a GitHub ni a ningún servicio en línea.**

### Paso 2.3: Decirle a git-crypt qué archivos encriptar

Crea o edita el archivo `.gitattributes` en la raíz de tu repositorio:

```bash
# Crear el archivo .gitattributes
nano .gitattributes
```

Agrega las siguientes líneas:

```
# Encriptar todo en la carpeta "sensitive/"
sensitive/** filter=git-crypt diff=git-crypt

# Encriptar archivos específicos
*.password filter=git-crypt diff=git-crypt
cedula*.jpg filter=git-crypt diff=git-crypt
cedula*.png filter=git-crypt diff=git-crypt
documentos-secretos/** filter=git-crypt diff=git-crypt
```

**Explicación:**
- `sensitive/**` = Todo dentro de la carpeta "sensitive/"
- `*.password` = Cualquier archivo que termine en .password
- `cedula*.jpg` = Fotos de cédula que empiecen con "cedula"
- `documentos-secretos/**` = Todo dentro de "documentos-secretos/"

### Paso 2.4: Confirmar la configuración

```bash
git-crypt status
```

Deberías ver algo como:

```
    encrypted: sensitive/foto-cedula.jpg
    encrypted: sensitive/contraseñas.password
    encrypted: documentos-secretos/nota.pdf
```

---

## Uso Diario (Paso 3)

### Agregar archivos nuevos

Simplemente crea archivos normalmente:

```bash
# Crear carpeta si no existe
mkdir -p sensitive

# Copiar archivos a la carpeta
cp ~/fotos/cedula-2025.jpg sensitive/
cp ~/documentos/certificado.pdf sensitive/

# Agregar al git
git add sensitive/
git commit -m "Agrego cédula y certificado"
git push
```

**¡Listo!** Los archivos se encriptan automáticamente al hacer commit.

### Modificar archivos existentes

Edita los archivos normalmente:

```bash
# Abrir un archivo para editarlo
nano sensitive/nota-importante.txt

# Guardar cambios
git add sensitive/
git commit -m "Actualizo nota importante"
git push
```

### Eliminar archivos

```bash
# Eliminar un archivo
git rm sensitive/archivo-viejo.jpg
git commit -m "Elimino archivo viejo"
git push
```

### Ver qué archivos están encriptados

```bash
git-crypt status
```

---

## ¿Qué Ven en GitHub? (La Prueba de Seguridad)

Cuando alguien (incluido un hacker) clona tu repositorio, **NO puede ver tus archivos reales**. Solo ve:

```
ABBUX+G7b3K4gF9x2mN5pQ8rS1tU3vW6yZ0aB4cD7eF0gH2iJ5kL8mN1oP4qR7sT0
```

**Pura basura cifrada.** Imposible de leer sin la llave.

### Ejemplo visual:

**En tu computadora (local):**
```
sensitive/
├── foto-cedula.jpg        ← Imagen real
├── contraseñas.password   ← Texto legible
└── certificado.pdf        ← PDF normal
```

**En GitHub (lo que ven los hackers):**
```
sensitive/
├── foto-cedula.jpg        ← FfffKk9x2mN5pQ8r...
├── contraseñas.password   ← AaBbCc112233...
└── certificado.pdf        ← XxYyZz778899...
```

---

## Trabajar en Múltiples Computadoras

Si trabajas en más de una computadora, necesitas la llave en ambas:

### En la segunda computadora:

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

# Desencriptar con tu llave
git-crypt unlock /ruta/a/tu-llave/git-crypt-key.key
```

**¡Listo!** Ahora puedes ver y modificar los archivos normalmente.

---

## Compartir con Otros (Si Necesitas)

Si alguien más necesita acceso a los archivos encriptados:

```bash
# Exportar la llave para esa persona
git-crypt export-key /ruta/para/compartir/git-crypt-key.key

# Enviarle la llave por un canal seguro (NO por email)
# Por ejemplo: USB en persona, Signal, etc.
```

---

## Preguntas Frecuentes (FAQ)

### ¿Puedo usar git-crypt con GitHub privado y público?

**Sí.** Funciona con ambos. Para repositorios públicos es aún más importante porque cualquiera puede clonarlo.

### ¿Qué pasa si pierdo la llave?

**Desastre.** No podrás desencriptar nunca tus archivos. Por eso es vital exportarla y guardarla en lugar seguro.

### ¿Puedo usar git-crypt en repositorios existentes?

**Sí.** Solo necesitas:
1. Hacer `git-crypt init`
2. Configurar `.gitattributes`
3. Desencriptar los archivos existentes: `git-crypt unlock`
4. Hacer commit de los cambios

### ¿Funciona con Git LFS?

**No directamente.** Si usas Git LFS para archivos grandes, necesitarías una configuración adicional. Para fotos de cédula (< 100MB), no necesitas LFS.

### ¿Es seguro contra hackers?

**Sí.** git-crypt usa AES-256, el mismo estándar que usan los bancos y gobiernos. Mientras no pierdas tu llave, tus archivos están seguros.

---

## Resumen: Tu Plan de Acción

1. **Instalar git-crypt** (`sudo apt install git-crypt`)
2. **Inicializar** en tu repositorio (`git-crypt init`)
3. **Exportar la llave** y guardarla en USB seguro
4. **Crear .gitattributes** con tus archivos/carpetas a encriptar
5. **Trabajar normalmente** (agregar, modificar, eliminar archivos)
6. **Hacer commit y push** (se encriptan automáticamente)
7. **Dormir tranquilo** sabiendo que si hackean GitHub, solo ven basura

---

## ⚠️ Advertencia Final

git-crypt protege tus archivos **en GitHub**, pero no olvides:

- **Proteger tu computadora** con contraseña
- **No perder la llave** de git-crypt
- **No subir la llave** a ningún servicio en línea
- **Usar contraseñas fuertes** para tu cuenta de GitHub
- **Activar 2FA** (autenticación de dos factores) en GitHub

---

