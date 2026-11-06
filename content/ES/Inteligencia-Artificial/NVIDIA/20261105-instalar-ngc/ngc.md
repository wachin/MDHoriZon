Tutorial: Cómo instalar NVIDIA NGC CLI en Linux Debian, Ubuntu, AV Linux y MX Linux

Instalación comprobada en AV Linux MXe
 NGC CLI 4.36.6

En este tutorial vamos a documentar el procedimiento que hemos probado y que funcionó correctamente en tu ordenador AV Linux MXe.

La instalación también sirve para distribuciones basadas en Debian, como:
- Debian.
- Ubuntu.
- Linux Mint.
- AV Linux.
- MX Linux.
No utilizaremos instaladores complicados ni gestores de paquetes. Instalaremos directamente el archivo ZIP oficial de NVIDIA, conservando todos sus componentes y dependencias.
1. ¿Qué es NVIDIA NGC CLI?
NVIDIA NGC CLI es una herramienta de línea de comandos que permite interactuar con NVIDIA GPU Cloud (NGC).

Entre sus funciones están:
- Autenticarse en una cuenta NVIDIA NGC.
- Acceder a recursos y catálogos de NVIDIA.
- Descargar modelos y contenedores disponibles.
- Administrar determinados recursos de NVIDIA.
Página oficial:

NVIDIA NGC CLI – Download and Installation.
2. Descargar NVIDIA NGC CLI
Entra en la página oficial:

Descargar NVIDIA NGC CLI.

Selecciona la versión para Linux.

En nuestro caso utilizamos la versión 4.36.6:

Descargar NGC CLI 4.36.6 para Linux (ZIP).

Guarda el archivo en la carpeta Descargas.
3. Extraer el archivo ZIP
Abre una terminal y dirígete a la carpeta donde descargaste el archivo.

En nuestro caso:
cd ~/Descargas/NVIDIA


Extrae el ZIP:
unzip ngccli_linux.zip


Entra en la carpeta:
cd ngccli_linux/ngc-cli


Comprueba su contenido:
ls -la


4. Comprender la estructura de archivos
Este paso es especialmente importante.

NGC CLI no es un ejecutable independiente. El archivo ngc necesita la carpeta _internal, que contiene las bibliotecas y dependencias necesarias para funcionar.

La estructura es similar a esta:
ngc-cli/
│
├── _internal/
│   ├── aiohttp/
│   ├── boto3/
│   ├── botocore/
│   ├── yaml/
│   ├── certifi/
│   └── ...muchas otras dependencias
│
└── ngc


En nuestro caso, el archivo ngc.txt, generado con tree > ngc.txt, registró aproximadamente:
- 2.405 archivos.
- 1.092 directorios.
No debes copiar solamente el archivo ngc. Es necesario conservar toda la carpeta _internal.
5. Instalar NGC CLI en /opt/ngc-cli/
Vamos a utilizar una instalación centralizada en /opt, conservando la estructura original.

Primero, asegúrate de estar dentro de:
~/Descargas/NVIDIA/ngccli_linux/ngc-cli


Puedes comprobarlo con:
pwd


Paso 1. Crear el directorio de instalación
sudo mkdir -p /opt/ngc-cli


Paso 2. Copiar todos los archivos y directorios
Ejecuta:
sudo cp -a . /opt/ngc-cli/


El parámetro -a conserva la estructura de directorios y los atributos de los archivos durante la copia.
Paso 3. Dar permisos de ejecución
sudo chmod +x /opt/ngc-cli/ngc


Paso 4. Crear un enlace simbólico
sudo ln -sfn /opt/ngc-cli/ngc /usr/local/bin/ngc


Esto permite ejecutar ngc desde cualquier directorio de la terminal, sin tener que escribir la ruta completa.

La estructura final queda así:
/opt/
└── ngc-cli/
    ├── _internal/
    │   ├── aiohttp/
    │   ├── boto3/
    │   ├── botocore/
    │   └── ...dependencias
    │
    └── ngc

/usr/local/bin/
└── ngc -> /opt/ngc-cli/ngc


6. Comprobar que NGC CLI está instalado
Ejecuta:
ngc --version


En nuestra instalación obtuvimos:
NGC CLI 4.36.6


Comprueba también que existen las dependencias:
ls /opt/ngc-cli/_internal | head


En nuestro caso aparecieron:
81d243bd2c585b0f4821__mypyc.cpython-311-x86_64-linux-gnu.so
aiohttp
attrs-25.4.0.dist-info
base_library.zip
boto3
botocore
certifi
_cffi_backend.cpython-311-x86_64-linux-gnu.so
charset_normalizer
crypt


Con esto comprobamos que la instalación conserva tanto el ejecutable como sus bibliotecas.
7. Configurar la autenticación de NVIDIA
Ahora necesitamos una API Key de NGC.

Puedes obtenerla desde:

NVIDIA – Personal API Keys.

Genera una clave personal y guárdala en un lugar seguro.

En la terminal ejecuta:
ngc config set


Se iniciará un asistente interactivo.

En nuestro caso, respondimos de la siguiente manera:

Primera pregunta: API Key
Enter API key [no-apikey]. Choices: [<VALID_APIKEY>, 'no-apikey']:


Introduce tu API Key.

Segunda pregunta: formato de salida
Enter CLI output format type [ascii]. Choices: ['ascii', 'csv', 'json']:


Escribe:
json


Tercera pregunta: organización
Enter org [no-org]. Choices: ['0968509827014480']:


Introduce el identificador de tu organización:
0968509827014480


Este identificador es un ejemplo correspondiente a nuestra configuración. Cada usuario debe seleccionar la organización disponible en su propia cuenta.

Cuarta pregunta: equipo
Enter team [no-team]. Choices: ['no-team']:


Pulsa simplemente Enter.

No necesitas introducir nada más porque la opción disponible es no-team.
8. Verificar que la configuración funciona
Al completar el asistente, deberías recibir un mensaje similar a este:
Validating configuration...
Successfully validated configuration.
Saving configuration...
Successfully saved NGC configuration to /home/usuario/.ngc/config


Ahora ejecuta las siguientes comprobaciones.

Comprobar la configuración:
ngc config current


En nuestra instalación obtuvimos:
[{
    "key": "apikey",
    "source": "user settings",
    "value": "******************************************************************RDE1"
},{
    "key": "format_type",
    "source": "user settings",
    "value": "json"
},{
    "key": "org",
    "source": "user settings",
    "value": "0968509827014480"
}]


Comprobar la versión:
ngc --version


Resultado:
NGC CLI 4.36.6


Instalación y autenticación verificadas
9. Ubicación de los archivos importantes
Archivo o directorio	Función
/opt/ngc-cli/	Instalación completa
/opt/ngc-cli/ngc	Ejecutable
/opt/ngc-cli/_internal/	Dependencias
/usr/local/bin/ngc	Enlace simbólico
~/.ngc/config	Configuración y API Key

Recuerda que ~/.ngc/config contiene información privada. No debes compartirlo.
10. Comandos utilizados en este tutorial
Esta es la secuencia principal de instalación que comprobamos en AV Linux MXe:
# Entrar en la carpeta extraída
cd ~/Descargas/NVIDIA/ngccli_linux/ngc-cli

# Crear el directorio de instalación
sudo mkdir -p /opt/ngc-cli

# Copiar toda la estructura
sudo cp -a . /opt/ngc-cli/

# Dar permisos de ejecución
sudo chmod +x /opt/ngc-cli/ngc

# Crear el enlace simbólico
sudo ln -sfn /opt/ngc-cli/ngc /usr/local/bin/ngc

# Comprobar la instalación
ngc --version

# Configurar NVIDIA NGC
ngc config set

# Consultar la configuración
ngc config current



11. Compatibilidad con distribuciones Linux
Distribución	Consideraciones
Debian	Distribución de la familia compatible; comprobar arquitectura y dependencias.
Ubuntu	NVIDIA documenta soporte para Ubuntu 16.04 y posteriores.
Linux Mint	Basado en Ubuntu; procedimiento equivalente.
MX Linux	Basado en Debian; procedimiento equivalente.
AV Linux MXe	Probado

La descarga utilizada es la versión Linux AMD64 (x86-64). Para equipos ARM64 se necesita el paquete diferente. NVIDIA publica ambas arquitecturas. 

NVIDIA NGC+1

Documentación oficial adicional:
- NVIDIA – Instalación de NGC CLI.
- NVIDIA – Quick Start Guide.
- NVIDIA – Versiones y verificaciones SHA256.
Conclusión: este es el procedimiento que utilizamos y verificamos en tu AV Linux MXe. Conserva la carpeta _internal completa y utiliza el enlace simbólico para disponer del comando ngc globalmente. No necesitas instalar Python, pip ni dependencias adicionales para esta instalación de NGC CLI.