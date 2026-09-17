# Cómo subir archivos grandes a un repositorio Git usando Git LFS

Cuando trabajamos con Git, tarde o temprano podemos encontrarnos con archivos demasiado grandes para subirlos cómodamente a un repositorio remoto como GitHub.

Por ejemplo, un proyecto puede necesitar almacenar:

* Archivos `.docx` grandes.
* Archivos `.zip`.
* Imágenes de alta resolución.
* Vídeos.
* Archivos de audio.
* Modelos de inteligencia artificial.
* Archivos binarios generados por un programa.
* Bases de datos o archivos de datos grandes.

Una solución diseñada específicamente para este problema es **Git LFS (Git Large File Storage)**.

Git LFS permite mantener los archivos grandes asociados al repositorio Git sin almacenar directamente todo su contenido dentro del historial normal de Git.

En este tutorial veremos cómo instalar Git LFS, configurarlo en un repositorio, subir archivos grandes y qué hacer si el archivo ya fue agregado al repositorio antes de configurar Git LFS.

---

## 1. ¿Qué problema existe con los archivos grandes en Git?

Git funciona especialmente bien con archivos de texto porque puede comparar las diferencias entre versiones.

Por ejemplo:

```
README.md
main.py
config.json
style.css
```

Sin embargo, los archivos binarios grandes son diferentes.

Supongamos que tenemos:

```
manual.docx
```

con un tamaño de 86 MB.

Si lo agregamos directamente:

```bash
git add manual.docx
git commit -m "Añado manual"
git push
```

Git intentará almacenar el archivo dentro de su historial normal.

Esto puede provocar varios problemas:

* El repositorio aumenta considerablemente de tamaño.
* Las operaciones de Git pueden volverse más pesadas.
* Los archivos binarios grandes no se benefician de la misma forma de las diferencias que los archivos de texto.
* El servicio Git remoto puede imponer límites de tamaño.

Por eso, para archivos grandes conviene utilizar Git LFS.

---

# 2. ¿Qué es Git LFS?

**Git LFS** significa:

> Git Large File Storage

Es una extensión de Git destinada a manejar archivos grandes.

La idea fundamental es bastante sencilla.

En lugar de guardar directamente dentro del repositorio Git un archivo de 100 MB, Git guarda un pequeño archivo de referencia llamado **puntero LFS**.

El contenido real del archivo se almacena en el almacenamiento LFS.

Conceptualmente tenemos:

```
Git repository
│
├── código
├── documentación
├── configuración
└── pequeño puntero LFS
        │
        └──► archivo grande almacenado en Git LFS
```

De esta manera Git continúa controlando la versión del archivo, pero el contenido pesado se maneja mediante Git LFS.

---

# 3. Comprobar si Git LFS está instalado

Primero podemos comprobar si Git LFS está disponible:

```bash
git lfs version
```

Si está instalado, veremos algo parecido a:

```
git-lfs/3.x.x
```

También podemos ejecutar:

```bash
git lfs install
```

Este comando configura Git LFS para nuestro usuario.

Normalmente solamente necesitamos hacerlo una vez en nuestro sistema.

---


# 4.1 Cómo trackear un archivo individual con Git LFS

No siempre queremos que todos los archivos de un determinado tipo sean administrados mediante Git LFS.

Por ejemplo, podemos tener muchos archivos `.docx` pequeños en nuestro proyecto, pero solamente uno de ellos puede ser muy grande.

En ese caso podemos indicarle a Git LFS que controle **solamente ese archivo**.

## 1. Sintaxis

La sintaxis es:

```bash
git lfs track "ruta/al/archivo"
```

Por ejemplo:

```bash
git lfs track "documentos/manual-grande.docx"
```

Git LFS agregará una regla específica al archivo `.gitattributes`, similar a:

```text
documentos/manual-grande.docx filter=lfs diff=lfs merge=lfs -text
```

De esta manera, solamente ese archivo será administrado mediante Git LFS.

---

## 2. Ejemplo con un archivo concreto

Supongamos que nuestro repositorio tiene:

```text
mi-proyecto/
├── documentos/
│   ├── manual.docx
│   ├── informe.docx
│   └── libro-grande.docx
├── src/
└── README.md
```

Solamente `libro-grande.docx` tiene un tamaño considerable.

Podemos ejecutar:

```bash
git lfs track "documentos/libro-grande.docx"
```

Después comprobamos `.gitattributes`:

```bash
cat .gitattributes
```

Podremos encontrar:

```text
documentos/libro-grande.docx filter=lfs diff=lfs merge=lfs -text
```

Ahora podemos agregar el archivo y `.gitattributes`:

```bash
git add .gitattributes
git add documentos/libro-grande.docx
```

Crear el commit:

```bash
git commit -m "Añado libro grande mediante Git LFS"
```

Y subirlo:

```bash
git push
```

---

## 3. Trackear un archivo utilizando su ruta completa dentro del proyecto

También podemos utilizar rutas más profundas.

Por ejemplo:

```bash
git lfs track "pdf-to-docx-por-ilovepdf.com/Christofleau-Electroculture_text.docx"
```

Esto es especialmente útil cuando tenemos muchos archivos del mismo tipo, pero solamente queremos utilizar LFS para uno de ellos.

Por ejemplo, si nuestro proyecto contiene:

```text
pdf-to-docx/
    documento1.docx

pdf-to-docx-por-ilovepdf.com/
    Christofleau-Electroculture_text.docx

documentacion/
    README.docx
```

Podemos hacer tracking exclusivamente de:

```text
pdf-to-docx-por-ilovepdf.com/Christofleau-Electroculture_text.docx
```

sin convertir los otros `.docx` en archivos LFS.

---

## 4. Trackear varios archivos individuales

También podemos especificar varios archivos:

```bash
git lfs track "documentos/manual.docx"
git lfs track "documentos/libro.pdf"
git lfs track "archivos/datos.zip"
```

Esto producirá varias reglas en `.gitattributes`.

Por ejemplo:

```text
documentos/manual.docx filter=lfs diff=lfs merge=lfs -text
documentos/libro.pdf filter=lfs diff=lfs merge=lfs -text
archivos/datos.zip filter=lfs diff=lfs merge=lfs -text
```

---

# 5. ¿Archivo individual o extensión completa?

Esta es una distinción importante.

### Trackear una extensión

```bash
git lfs track "*.docx"
```

Significa:

> Todos los archivos `.docx` del repositorio serán administrados mediante Git LFS.

Es apropiado cuando prácticamente todos los archivos de ese tipo son grandes.

### Trackear un archivo individual

```bash
git lfs track "documentos/manual-grande.docx"
```

Significa:

> Solamente este archivo será administrado mediante Git LFS.

Es apropiado cuando tenemos solamente uno o unos pocos archivos grandes.

---

# 6. Comprobar qué archivos están siendo administrados por LFS

Después de configurar el tracking podemos ejecutar:

```bash
git lfs ls-files
```

Por ejemplo:

```text
a31f4b2c * documentos/manual-grande.docx
```

Esto permite verificar qué archivos están siendo almacenados mediante Git LFS.

También podemos consultar las reglas configuradas:

```bash
git lfs track
```

Git LFS mostrará los patrones que están siendo utilizados.

---

# 7. Importante: `git lfs track` no sube el archivo

El comando:

```bash
git lfs track
```

solamente configura qué archivos deben ser administrados por LFS.

Después debemos utilizar el flujo normal de Git:

```bash
git add .
git commit -m "Añado archivo grande"
git push
```

Por eso, podemos pensar en `git lfs track` como una **configuración del repositorio**, no como un comando para subir archivos.

---

# 8. Si el archivo ya estaba en Git

Si el archivo ya había sido agregado y confirmado mediante Git normal antes de ejecutar:

```bash
git lfs track "documentos/manual-grande.docx"
```

debemos tener presente que `git lfs track` no convierte automáticamente las versiones anteriores del archivo.

En ese caso podemos necesitar migrar el historial con:

```bash
git lfs migrate import --include="documentos/manual-grande.docx" --include-ref=refs/heads/main
```

Después podemos comprobar:

```bash
git lfs ls-files
```

Si la migración modificó los commits que ya estaban en el repositorio remoto, puede ser necesario actualizar la rama utilizando:

```bash
git push --force-with-lease origin main
```

Este procedimiento debe utilizarse con precaución porque reescribe el historial de Git.

---

# Resumen

Para controlar **todos los archivos de un tipo**:

```bash
git lfs track "*.docx"
```

Para controlar **un único archivo**:

```bash
git lfs track "ruta/al/archivo.docx"
```

Para comprobar los archivos administrados por LFS:

```bash
git lfs ls-files
```

Y después de configurar el tracking, el procedimiento normal continúa siendo:

```bash
git add .
git commit -m "Mi cambio"
git push
```

La elección depende de nuestro proyecto:

```text
Todos los .docx
       │
       ▼
git lfs track "*.docx"


Solamente un archivo
       │
       ▼
git lfs track "documentos/manual-grande.docx"
```
# 4. Configurar Git LFS en un repositorio

Supongamos que tenemos este proyecto:

```bash
cd ~/Dev3/mi-proyecto
```

Queremos que los archivos `.docx` grandes sean administrados por Git LFS.

Ejecutamos:

```bash
git lfs track "*.docx"
```

Git LFS creará o modificará el archivo:

```
.gitattributes
```

Podemos comprobarlo:

```bash
cat .gitattributes
```

Deberíamos encontrar una línea similar a:

```
*.docx filter=lfs diff=lfs merge=lfs -text
```

Esta línea le indica a Git:

> Los archivos que terminen en `.docx` deben ser administrados mediante Git LFS.

---

# 5. También podemos configurar otros tipos de archivos

Por ejemplo, para archivos ZIP:

```bash
git lfs track "*.zip"
```

Para archivos MP4:

```bash
git lfs track "*.mp4"
```

Para archivos PSD:

```bash
git lfs track "*.psd"
```

Para archivos ISO:

```bash
git lfs track "*.iso"
```

Incluso podemos utilizar varias reglas:

```
*.docx filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.iso filter=lfs diff=lfs merge=lfs -text
```

Es importante recordar que **Git LFS no significa que todos los archivos grandes serán detectados automáticamente**.

Hay que indicarle a Git LFS qué archivos o extensiones debe administrar.

---

# 6. Agregar el archivo grande

Después de configurar Git LFS, agregamos normalmente los archivos:

```bash
git add .
```

Después hacemos el commit:

```bash
git commit -m "Añado archivos grandes"
```

Y finalmente:

```bash
git push
```

Git se encargará de utilizar Git LFS para los archivos que coincidan con las reglas de `.gitattributes`.

Nuestro flujo habitual continúa siendo:

```bash
git add .
git commit -m "Mi cambio"
git push
```

No necesitamos utilizar un comando especial cada vez que queramos subir un archivo LFS.

---

# 7. Comprobar qué archivos están siendo administrados por Git LFS

Podemos ejecutar:

```bash
git lfs ls-files
```

Por ejemplo:

```
a31f4b2c * documentos/manual.docx
8e721c91 * archivos/documentacion.zip
```

Esto nos permite comprobar que Git LFS está administrando realmente nuestros archivos.

También podemos ejecutar:

```bash
git lfs status
```

para obtener información sobre el estado de los archivos LFS.

---

# 8. Un ejemplo completo

Supongamos que tenemos:

```
mi-proyecto/
├── README.md
├── src/
├── documentos/
│   └── manual.docx
└── archivos/
    └── datos.zip
```

Y queremos administrar `.docx` y `.zip` mediante Git LFS.

Primero:

```bash
cd mi-proyecto
```

Inicializamos Git LFS:

```bash
git lfs install
```

Configuramos los tipos de archivos:

```bash
git lfs track "*.docx"
git lfs track "*.zip"
```

Comprobamos:

```bash
cat .gitattributes
```

Después:

```bash
git add .gitattributes
git add .
```

Creamos el commit:

```bash
git commit -m "Añado archivos grandes mediante Git LFS"
```

Y finalmente:

```bash
git push origin main
```

Podemos comprobar:

```bash
git lfs ls-files
```

---

# 9. ¿Qué pasa si ya hice `git add` antes de configurar Git LFS?

Esta situación es muy importante.

Imaginemos que tenemos:

```
manual.docx
```

y hacemos:

```bash
git add manual.docx
git commit -m "Añado manual"
```

Después nos damos cuenta de que deberíamos utilizar Git LFS.

Podemos configurar LFS:

```bash
git lfs track "*.docx"
```

pero debemos tener cuidado.

El hecho de ejecutar `git lfs track` **no convierte automáticamente las versiones anteriores del archivo que ya están dentro del historial de Git en archivos LFS**.

La regla de `.gitattributes` afecta a los archivos que Git procese posteriormente.

---

# 10. ¿Qué pasa si ya hice `git push`?

Este es un caso todavía más importante.

Supongamos que hicimos:

```bash
git add .
git commit -m "Añado documento"
git push
```

y GitHub nos muestra una advertencia como:

```
warning: File manual.docx is 86.09 MB
warning: GH001: Large files detected.
```

El archivo fue subido mediante Git normal.

En este caso podemos migrar el archivo existente a Git LFS.

Primero configuramos LFS:

```bash
git lfs install
```

Después:

```bash
git lfs track "*.docx"
```

Y posteriormente podemos utilizar:

```bash
git lfs migrate import --include="*.docx" --include-ref=refs/heads/main
```

Este comando reescribe el historial indicado para convertir las versiones correspondientes del archivo en objetos administrados por Git LFS.

Podemos verificar el resultado:

```bash
git lfs ls-files
```

Si todo está correcto, el archivo debería aparecer en la lista.

---

# 11. Subir el historial modificado

Aquí debemos tener especial cuidado.

`git lfs migrate import` puede modificar los commits existentes.

Por lo tanto, el historial local ya no coincide exactamente con el historial que está en el servidor remoto.

En ese caso normalmente utilizaremos:

```bash
git push --force-with-lease origin main
```

Es preferible utilizar:

```bash
--force-with-lease
```

en lugar de:

```bash
--force
```

porque ofrece una protección adicional frente a sobrescribir cambios remotos que no conocemos.

**Importante:** no debemos hacer esto a la ligera en un repositorio donde trabajan varias personas. Reescribir el historial puede afectar a otros colaboradores.

---

# 12. Comprobar que el archivo realmente está en Git LFS

Una comprobación muy útil es:

```bash
git lfs ls-files
```

También podemos inspeccionar el archivo almacenado en el commit:

```bash
git show HEAD:manual.docx
```

Cuando Git LFS está funcionando correctamente, en lugar de aparecer el contenido binario completo veremos un pequeño puntero parecido a:

```
version https://git-lfs.github.com/spec/v1
oid sha256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
size 90267648
```

Ese pequeño archivo es el **puntero Git LFS**.

El archivo grande real se almacena mediante Git LFS.

---

# 13. ¿Git LFS elimina el límite de tamaño?

No debemos pensar que Git LFS significa:

> "Ahora puedo subir archivos de cualquier tamaño sin restricciones."

No es así.

El servicio donde alojemos nuestro repositorio puede establecer:

* límites de tamaño;
* límites de almacenamiento LFS;
* límites de transferencia;
* cuotas;
* restricciones dependiendo del plan.

Por eso siempre debemos consultar las condiciones del servicio que estamos utilizando.

Git LFS resuelve el problema técnico de manejar archivos grandes en Git, pero **no elimina las cuotas o límites del proveedor Git**.

---

# 14. ¿Qué archivos conviene poner en Git LFS?

Git LFS resulta especialmente útil para archivos binarios grandes, por ejemplo:

```
*.docx
*.pdf
*.zip
*.7z
*.mp3
*.wav
*.flac
*.mp4
*.mkv
*.png
*.jpg
*.psd
*.blend
*.iso
```

Sin embargo, no significa que debamos enviar absolutamente todos estos formatos mediante LFS.

La decisión depende del proyecto y del tamaño de los archivos.

Para archivos pequeños como:

```
README.md
main.py
config.json
style.css
```

normalmente no tiene sentido utilizar Git LFS.

---

# 15. Una recomendación importante: no subir archivos innecesarios

Antes de utilizar Git LFS para almacenar un archivo enorme, debemos preguntarnos:

> ¿Realmente necesito que este archivo forme parte del repositorio?

Por ejemplo, un archivo DOCX puede ser necesario, pero quizás también tengamos una copia descomprimida del DOCX:

```
manual.docx
manual/
├── word/
├── docProps/
├── _rels/
└── ...
```

Un archivo `.docx` ya es internamente un archivo ZIP.

Por lo tanto, subir simultáneamente:

```
manual.docx
manual.zip
manual/
```

puede almacenar información duplicada o innecesaria.

Antes de subir archivos grandes conviene revisar:

```bash
git status
```

y:

```bash
du -sh *
```

para conocer qué estamos agregando realmente al repositorio.

---

# 16. Comandos esenciales

Si solamente queremos recordar lo fundamental, podemos resumir el procedimiento:

### Instalar/configurar Git LFS

```bash
git lfs install
```

### Indicar qué archivos deben utilizar LFS

```bash
git lfs track "*.docx"
```

### Agregar los archivos

```bash
git add .
```

### Crear el commit

```bash
git commit -m "Añado archivo grande"
```

### Subir

```bash
git push
```

### Comprobar los archivos LFS

```bash
git lfs ls-files
```

---

# 17. El caso especial: archivo grande ya subido

Si el archivo ya está dentro del historial Git:

```bash
git lfs install
git lfs track "*.docx"
git lfs migrate import --include="*.docx" --include-ref=refs/heads/main
git lfs ls-files
git push --force-with-lease origin main
```

Este último procedimiento debe utilizarse con precaución porque puede reescribir el historial de la rama.

---

# Conclusión

Git LFS es una herramienta muy útil cuando nuestro proyecto necesita almacenar archivos binarios grandes.

La idea principal es sencilla:

```
Git
 │
 ├── código y archivos normales
 │
 └── puntero → Git LFS → archivo grande
```

Para un proyecto nuevo, lo ideal es **configurar Git LFS antes de realizar el primer commit del archivo grande**.

Por ejemplo:

```bash
git lfs install
git lfs track "*.docx"
git add .
git commit -m "Añado documentación"
git push
```

Si el archivo ya fue incluido en commits anteriores, podemos utilizar `git lfs migrate import` para migrarlo al almacenamiento LFS, teniendo en cuenta que esto puede requerir reescribir el historial y hacer un `push --force-with-lease`.

De esta manera podemos mantener nuestros repositorios Git organizados y utilizar Git LFS para aquellos archivos grandes que realmente necesitan formar parte del proyecto.
