# Como crear una api en zhipu z ai

Ellos tienen unos modelos gratis:

[https://docs.z.ai/guides/overview/pricing](https://docs.z.ai/guides/overview/pricing)

![](images/Z.AI-API-gratis.png)

Para crear una clave de API en **Zhipu AI (Z.AI)**, debes registrarte en su plataforma oficial y generar el token de acceso desde la sección de administración de claves

Pasos para crear y obtener tu API Key

-   **Registrarse o iniciar sesión:**
    -   Entra a la [Plataforma Z.AI](https://z.ai/model-api) 
    -   Crea una cuenta o inicia sesión con tu correo electrónico, Google o GitHub.

-   **Ir a la gestión de claves:**
    -   Haz clic en tu perfil o busca en el menú de configuración la sección de **API Keys** o administración de claves.
 
 [https://z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list)

-   **Crear la clave API:**
    -   Haz clic en el botón para **Crear una nueva API Key** (o _Create API Key_).
    -   Asigna un nombre único para identificar tu clave.
    -   Guarda o copia el token generado inmediatamente en un lugar seguro, ya que no se volverá a mostrar completo.

## Añadir la API al .bashrc en Linux

Si ya tienes la clave API de **Z.AI**, debes guardarla como una variable de entorno en `~/.bashrc`.

### 1. Abre tu `.bashrc`

Ejecuta:

```bash
gedit ~/.bashrc
```

**Nota**: Si eres usuario avanzado de Linux puedes usar nano.

Al final del archivo añade:

```bash
export ZAI_API_KEY="TU_API_KEY_AQUI"
```

Por ejemplo, si tu clave fuera `abc123...`, quedaría:

```bash
export ZAI_API_KEY="abc123..."
```

**No pongas literalmente `TU_API_KEY_AQUI`; reemplázalo por tu clave real.**

### 2. Guarda el archivo

En `nano`:

* `Ctrl + O` → guardar
* `Enter` → confirmar
* `Ctrl + X` → salir

### 3. Haz que Bash vuelva a cargar `.bashrc`

Ejecuta:

```bash
source ~/.bashrc
```

### 4. Comprueba que la variable existe

Puedes comprobarlo con:

```bash
echo "$ZAI_API_KEY"
```

Debería mostrar tu clave.

⚠️ **Pero no publiques ni compartas la salida de ese comando**, porque estarías mostrando tu API Key.

### Una forma más segura de comprobarla

Puedes comprobar solamente que está configurada:

```bash
if [ -n "$ZAI_API_KEY" ]; then
    echo "ZAI_API_KEY está configurada"
else
    echo "ZAI_API_KEY NO está configurada"
fi
```

### Si vas a utilizarla con OpenCode

Si tu objetivo es configurar **OpenCode para utilizar Z.AI**, hay un detalle importante: `ZAI_API_KEY` es el nombre de la variable que debes usar si la configuración de OpenCode/proveedor que estás siguiendo espera esa variable. La configuración concreta del proveedor y del modelo es independiente de guardar la clave en `.bashrc`.

Y una recomendación: **no pongas la API Key directamente dentro de `opencode.json` si puedes utilizar una variable de entorno**. Así puedes compartir tu configuración sin revelar accidentalmente la clave.


## Consultas

[Z.ai (+2) - Z.ai API Platform — Start building with GLM-5.3. Resultados relacionados](https://z.ai/model-api)

[Z.ai (+3) - Inicio rápido - Descripción general - Z.AI docs. Resultados relacionados](https://docs.z.ai/guides/overview/quick-start)