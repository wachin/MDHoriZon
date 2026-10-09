# Tutorial: Cómo crear y cambiar de rama con Git

Este tutorial utiliza únicamente los comandos que hemos usado para guardar el logro de rendimiento de PDFAR en una rama de Git y publicarla en GitHub.

## 1. Comprobar la rama actual

Abre una terminal dentro de la carpeta de tu proyecto y ejecuta:

Bash

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

Bash

```
git switch -c milestone/pdfar-large-pdf-performance
```

Este comando realiza dos acciones:

* Crea la rama `milestone/pdfar-large-pdf-performance`.

* Te cambia automáticamente a esa rama.

Comprueba que estás en la rama correcta:

Bash

```
git branch --show-current
```

Resultado esperado:

```
milestone/pdfar-large-pdf-performance
```

## 3. Publicar la rama en GitHub

Para subir la rama a GitHub y configurar su seguimiento remoto, ejecuta:

Bash

```
git push -u origin milestone/pdfar-large-pdf-performance
```

Este comando publica la rama en el repositorio remoto `origin` y configura el seguimiento entre tu rama local y la rama remota.

En nuestro caso, Git confirmó que la rama se había publicado correctamente.

## 4. Cambiar entre ramas existentes

Cuando quieras cambiar de una rama a otra, utiliza `git switch` seguido del nombre de la rama.

Para volver a `main`:

Bash

```
git switch main
```

Para regresar a la rama que conserva las mejoras de PDFAR:

Bash

```
git switch milestone/pdfar-large-pdf-performance
```

Puedes comprobar en cualquier momento dónde estás:

Bash

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
