# Cómo convertir Markdown (.md) a HTML con clic derecho en Thunar usando Pandoc

Si utilizamos **Thunar** como administrador de archivos y trabajamos frecuentemente con documentos Markdown, podemos crear una **Acción personalizada** que permita convertir un archivo `.md` a `.html` simplemente haciendo clic derecho sobre él.

Para realizar la conversión utilizaremos **Pandoc**, pero no tendremos que abrir una terminal ni escribir manualmente el comando cada vez.

Después de configurar esta acción podremos hacer:

**Clic derecho sobre un archivo `.md` → Convertir Markdown a HTML**

Por ejemplo:

```text
Mi tutorial.md
```

se convertirá automáticamente en:

```text
Mi tutorial.html
```

El archivo HTML se guardará en el **mismo directorio donde se encuentra el Markdown original**.

---

## 1. Requisitos

Necesitamos tener instalados:

* **Thunar**
* **Pandoc**

Thunar será el administrador de archivos desde donde ejecutaremos la conversión, mientras que Pandoc será el encargado de convertir Markdown a HTML.

### Instalar Pandoc

En Debian, Ubuntu, MX Linux, AV Linux y otras distribuciones derivadas podemos instalar Pandoc mediante:

```bash
sudo apt install pandoc
```

Podemos comprobar que está correctamente instalado con:

```bash
pandoc --version
```

Si aparece la información de la versión de Pandoc, podemos continuar.

---

## 2. Abrir las Acciones personalizadas de Thunar

Abrimos **Thunar** y vamos al menú:

**Editar → Configurar acciones personalizadas...**

Se abrirá la ventana desde donde podemos administrar las acciones que aparecen al hacer clic derecho sobre archivos y directorios.

Pulsamos el botón:

**+**

para crear una nueva acción personalizada.

---

## 3. Crear la acción «Convertir Markdown a HTML»

En la pestaña **Básico** podemos configurar la acción de la siguiente manera.

### Nombre

```text
Convertir Markdown a HTML
```

### Descripción

```text
Convertir archivo Markdown a HTML usando Pandoc
```

### Comando

Este es el comando importante:

```bash
f=%f; pandoc "$f" -o "$(dirname "$f")/$(basename "$f" .md).html"
```

Podemos seleccionar también un icono relacionado con documentos, HTML, Markdown o conversión de archivos.

---

## 4. Configurar las Condiciones de aparición

Ahora entramos en la pestaña:

**Condiciones de aparición**

En **Patrón de archivos** escribimos:

```text
*.md
```

Y marcamos:

```text
[x] Archivos de texto
[x] Otros archivos
```

Esta configuración es importante.

En algunas instalaciones, los archivos Markdown `.md` son identificados por el sistema como archivos de texto. Por ejemplo, al ejecutar:

```bash
file --mime-type archivo.md
```

podemos obtener:

```text
archivo.md: text/plain
```

Por este motivo debemos habilitar **Archivos de texto**.

En nuestra configuración dejamos habilitados:

```text
[x] Archivos de texto
[x] Otros archivos
```

De esta manera la acción aparece correctamente al hacer clic derecho sobre un archivo `.md`.

Guardamos la acción.

---

## 5. Convertir un archivo Markdown a HTML

Ahora buscamos con Thunar cualquier documento Markdown.

Por ejemplo:

```text
Mi tutorial de Linux.md
```

Hacemos **clic derecho directamente sobre el archivo**.

En el menú contextual aparecerá nuestra nueva opción:

**Convertir Markdown a HTML**

Hacemos clic sobre ella.

Pandoc realizará la conversión automáticamente y en el mismo directorio aparecerá:

```text
Mi tutorial de Linux.html
```

Por lo tanto tendremos:

```text
Mi tutorial de Linux.md
Mi tutorial de Linux.html
```

No es necesario abrir una terminal.

---

## 6. ¿Qué comando de Pandoc estamos ejecutando?

Normalmente, desde una terminal podríamos convertir un Markdown escribiendo:

```bash
pandoc archivo.md -o archivo.html
```

La Acción personalizada de Thunar automatiza este procedimiento.

Nuestro comando completo es:

```bash
f=%f; pandoc "$f" -o "$(dirname "$f")/$(basename "$f" .md).html"
```

Vamos a analizarlo.

### `%f`

Thunar proporciona varios parámetros especiales para sus Acciones personalizadas.

En nuestro caso utilizamos:

```text
%f
```

que representa el archivo sobre el que hemos hecho clic derecho.

Primero guardamos ese archivo en una variable:

```bash
f=%f
```

Después podemos utilizar:

```bash
"$f"
```

para referirnos al archivo.

Esto es especialmente importante cuando tenemos nombres que contienen espacios, por ejemplo:

```text
Cómo configurar Thunar en Linux.md
```

---

## 7. Conversión con Pandoc

Esta parte ejecuta Pandoc:

```bash
pandoc "$f"
```

Es equivalente a ejecutar manualmente algo como:

```bash
pandoc "Cómo configurar Thunar en Linux.md"
```

Después necesitamos indicarle dónde guardar el resultado mediante:

```text
-o
```

que significa archivo de salida.

---

## 8. Mantener el archivo HTML en la misma carpeta

Utilizamos:

```bash
dirname "$f"
```

para obtener el directorio donde está almacenado el Markdown.

Si nuestro archivo estuviera en:

```text
/home/usuario/Documentos/Tutoriales/tutorial.md
```

`dirname` nos permite obtener:

```text
/home/usuario/Documentos/Tutoriales
```

Así podemos asegurarnos de que el HTML se cree en esa misma ubicación.

---

## 9. Cambiar automáticamente `.md` por `.html`

Esta parte:

```bash
basename "$f" .md
```

obtiene el nombre del archivo eliminando la extensión `.md`.

Por ejemplo:

```text
Tutorial Thunar.md
```

se convierte temporalmente en:

```text
Tutorial Thunar
```

Después añadimos:

```text
.html
```

por lo que el resultado final será:

```text
Tutorial Thunar.html
```

Así, el comando:

```bash
f=%f; pandoc "$f" -o "$(dirname "$f")/$(basename "$f" .md).html"
```

automatiza todo el proceso.

---

## 10. Importante: no estamos usando `--standalone`

Podríamos encontrarnos con ejemplos de Pandoc que utilizan:

```bash
pandoc --standalone archivo.md -o archivo.html
```

o:

```bash
pandoc -s archivo.md -o archivo.html
```

En este tutorial **no utilizamos `--standalone`**.

La razón es que `--standalone` hace que Pandoc genere un documento HTML completo, añadiendo una estructura similar a:

```html
<!DOCTYPE html>
<html>
<head>
    ...
</head>
<body>
    ...
</body>
</html>
```

En cambio, nosotros queremos el mismo comportamiento que obtenemos al ejecutar:

```bash
pandoc archivo.md -o archivo.html
```

Es decir, convertir directamente el contenido Markdown a HTML sin solicitar a Pandoc que genere toda la estructura de un documento HTML independiente.

Esto puede resultar especialmente práctico cuando el HTML generado posteriormente se va a copiar dentro de un editor web, un CMS o una entrada de blog.

---

## 11. Configuración final

Nuestra Acción personalizada de Thunar queda finalmente así:

### Pestaña «Básico»

**Nombre:**

```text
Convertir Markdown a HTML
```

**Descripción:**

```text
Convertir archivo Markdown a HTML usando Pandoc
```

**Comando:**

```bash
f=%f; pandoc "$f" -o "$(dirname "$f")/$(basename "$f" .md).html"
```

### Pestaña «Condiciones de aparición»

**Patrón de archivos:**

```text
*.md
```

Activamos:

```text
[x] Archivos de texto
[x] Otros archivos
```

---

## Resultado

A partir de ahora podemos utilizar Thunar como una pequeña interfaz gráfica para Pandoc.

En lugar de abrir una terminal y escribir cada vez:

```bash
pandoc "Mi documento.md" -o "Mi documento.html"
```

simplemente hacemos:

**Clic derecho sobre `Mi documento.md` → Convertir Markdown a HTML**

y automáticamente tendremos:

```text
Mi documento.md
Mi documento.html
```

en el mismo directorio.

Esta es una de las ventajas de las **Acciones personalizadas de Thunar**: podemos integrar herramientas de línea de comandos directamente en nuestro administrador de archivos y utilizarlas mediante el menú contextual.

## Documentación oficial

Para conocer más sobre las Acciones personalizadas de Thunar podemos consultar la documentación oficial del proyecto Xfce:

[https://docs.xfce.org/xfce/thunar/custom-actions](https://docs.xfce.org/xfce/thunar/custom-actions)

También podemos consultar la documentación oficial de Pandoc para conocer todos los formatos y opciones de conversión disponibles:

[https://pandoc.org/](https://pandoc.org/)
