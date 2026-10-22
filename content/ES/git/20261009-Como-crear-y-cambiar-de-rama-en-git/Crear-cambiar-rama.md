# Tutorial: Cómo crear y cambiar de rama con Git

Este tutorial utiliza únicamente los comandos que hemos usado para guardar el logro de rendimiento de PDFAR en una rama de Git y publicarla en GitHub.

## 1. Comprobar la rama actual

Abre una terminal dentro de la carpeta de tu proyecto y ejecuta:

```
git branch --show-current
```

Este comando muestra el nombre de la rama en la que estás trabajando.

Por ejemplo:

```
main
```

## 2. Crear una rama nueva y cambiarte a ella

Para crear una rama y comenzar a trabajar en ella inmediatamente, utiliza:

```
git switch -c milestone/pdfar-large-pdf-performance
```

Este comando realiza dos acciones:

* Crea la rama `milestone/pdfar-large-pdf-performance`.

* Te cambia automáticamente a esa rama.

Comprueba que estás en la rama correcta:

```
git branch --show-current
```

Resultado esperado:

```
milestone/pdfar-large-pdf-performance
```

## 3. Publicar la rama en GitHub

Para subir la rama a GitHub y configurar su seguimiento remoto, ejecuta:

```
git push -u origin milestone/pdfar-large-pdf-performance
```

Este comando publica la rama en el repositorio remoto `origin` y configura el seguimiento entre tu rama local y la rama remota.

En nuestro caso, Git confirmó que la rama se había publicado correctamente.

## 4. Cambiar entre ramas existentes

Cuando quieras cambiar de una rama a otra, utiliza `git switch` seguido del nombre de la rama.

Para volver a `main`:

```
git switch main
```

Para regresar a la rama que conserva las mejoras de PDFAR:

```
git switch milestone/pdfar-large-pdf-performance
```

Puedes comprobar en cualquier momento dónde estás:

```
git branch --show-current
```

## Resumen de comandos

| Acción                          | Comando                                            |
| ------------------------------- | -------------------------------------------------- |
| Ver la rama actual              | `git branch --show-current`                        |
| Crear una rama y cambiar a ella | `git switch -c nombre-de-rama`                     |
| Publicar la rama en GitHub      | `git push -u origin nombre-de-rama`                |
| Cambiar a `main`                | `git switch main`                                  |
| Cambiar a tu rama de respaldo   | `git switch milestone/pdfar-large-pdf-performance` |

## Consejo para tu proyecto PDFAR

Conserva `main` para el desarrollo principal y utiliza `milestone/pdfar-large-pdf-performance` como referencia del logro que ya probaste.

Si en el futuro haces nuevas mejoras y algo deja de funcionar, podrás volver a esa rama para recuperar el estado que preservaste.

Importante: antes de cambiar de rama, comprueba que no tengas cambios sin guardar que puedan interferir con el cambio.

---

## 5. Actualizar una rama con los cambios de `main`

Con el tiempo seguirás desarrollando en `main` y querrás que la rama `milestone/pdfar-large-pdf-performance` también reciba esas mejoras, para que no se quede atrás.

Para lograrlo, el procedimiento es: **cambiarte a la rama que quieres actualizar** y luego **fusionar `main` dentro de ella**.

### Paso 1: Comprobar que no tienes cambios sin guardar

Antes de cambiar de rama, verifica el estado:

```
git status
```

Si aparece `nothing to commit, working tree clean`, puedes continuar. Si tienes cambios sin guardar, guárdalos primero con `git add` + `git commit`, o guárdalos temporalmente con `git stash`.

### Paso 2: Cambiarte a la rama que quieres actualizar

```
git switch milestone/pdfar-large-pdf-performance
```

### Paso 3: Fusionar `main` dentro de esa rama

```
git merge main
```

Este comando toma los commits de `main` y los integra en la rama en la que estás parado (`milestone`). El orden importa: `git merge` siempre fusiona **lo que indicas dentro de la rama actual**, no al revés.

Si la rama `milestone` no tenía commits propios que no estuvieran en `main`, Git hará un **fast-forward** y mostrará algo como:

```
Actualizando bed3c66..210f349
Fast-forward
 last-agent.md        |   8 +++-
 src/pdfar/main.py    |  42 ++++++++++++++++++-
 src/pdfar/tabs.py    |   5 ++-
 src/pdfar/viewer.py  | 103 ++++++++++++++++++++++++++++++++++++++++++++--
 tests/test_resume.py | 260 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 5 files changed, 411 insertions(+), 7 deletions(-)
 create mode 100644 tests/test_resume.py
```

El fast-forward significa que Git no necesitó crear un commit de fusión: simplemente movió el puntero de `milestone` hacia adelante, hasta donde estaba `main`. Es el mejor escenario posible.

Si ambas ramas tuvieran commits propios distintos, Git crearía un **commit de fusión** y, si hubiera cambios en las mismas líneas, te pediría resolver conflictos.

### Paso 4: Publicar la rama actualizada en GitHub

Como ya configuraste el seguimiento remoto antes (con `git push -u origin ...` en el paso 3), basta con:

```
git push
```

Resultado esperado:

```
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/wachin/PDF-Advanced-Reader
   bed3c66..210f349  milestone/pdfar-large-pdf-performance -> milestone/pdfar-large-pdf-performance
```

### Paso 5: Volver a `main`

```
git switch main
```

### Resumen del procedimiento

| Paso | Acción                                          | Comando                                            |
| ---- | ----------------------------------------------- | -------------------------------------------------- |
| 1    | Comprobar que no hay cambios sin guardar        | `git status`                                       |
| 2    | Cambiarte a la rama que quieres actualizar      | `git switch milestone/pdfar-large-pdf-performance` |
| 3    | Fusionar `main` dentro de esa rama              | `git merge main`                                   |
| 4    | Publicar la rama actualizada en GitHub          | `git push`                                         |
| 5    | Volver a `main`                                 | `git switch main`                                  |

### Nota importante sobre `git merge`

`git merge` **no** funciona como `git merge origen destino`. La sintaxis correcta es:

```
git switch rama-destino
git merge rama-origen
```

Es decir: primero te colocas en la rama que **recibirá** los cambios, y luego indicas la rama que **aportará** los cambios.

Por ejemplo, si estás en `main` y ejecutas:

```
git merge milestone/pdfar-large-pdf-performance main
```

No estarías actualizando `milestone`, sino intentando fusionar dos ramas dentro de `main` (y pasar `main` como argumento es redundante). Por eso el orden correcto es siempre **cambiarse primero** y **fusionar después**.

### Alternativa: si quieres que una rama sea idéntica a `main`

Si en algún momento quieres que `milestone` sea **exactamente igual** a `main`, descartando cualquier cambio exclusivo de `milestone`, puedes usar:

```
git switch milestone/pdfar-large-pdf-performance
git reset --hard main
git push --force-with-lease origin milestone/pdfar-large-pdf-performance
```

Cuidado: `git reset --hard` **borra** los cambios que solo existan en `milestone`. Úsalo solo si estás seguro de que no necesitas conservarlos. Para el flujo normal, `git merge main` es siempre la opción recomendada.