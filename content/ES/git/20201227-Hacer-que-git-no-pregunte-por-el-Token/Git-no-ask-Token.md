
# Hacer que git no pregunte por el token Classic en el almacenamiento de credenciales

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhNODlD4HP74R1QYo43v4UXK7fYm9TlpXA8yVk7KeD4PKMmTMAhrI4VUDKMmdM2fvPt0lTWuNjArZ6CCPuZLUPx7vgcz-wXg0XUQ1Q54GszfIHMJpHVBYT0Ew-2ymKDi0q-Whr8Ak8tbhyUD8s35uHnGlvr6X0B7cI7QUtK8fzLho0hEGNNKndBWRrCwsI/s1536/Portada.jpg)

Debido a que GitHub ha descontinuado el soporte para la autenticación mediante contraseña, el uso de un Personal Access Token (PAT) se ha convertido en un requisito obligatorio para realizar operaciones remotas (como push o pull) de forma segura.

Sin embargo, dado que estos tokens son cadenas de texto largas y complejas, introducirlos manualmente en cada interacción con el repositorio resulta tedioso e ineficiente. El objetivo de esta guía es mostrarle cómo configurar el asistente de credenciales de Git para que las almacene de forma permanente. Siguiendo estos pasos, logrará que Git recuerde su token automáticamente, optimizando su flujo de trabajo y evitando solicitudes de inicio de sesión repetitivas.

## CREAR Y USAR UN TOKEN COMO CONTRASEÑA *(Si ya tiene el token omita este paso)*

Ud entre en la siguiente dirección (también está allí en las opciones de GitHub):

[https://github.com/settings/](https://github.com/settings/)

Allí dé clic en:

* Developer Settings
* Personal Access Token
* Tokens (classic)
* Generate New Token (Classic)

O también directamente en la dirección:

[https://github.com/settings/tokens](https://github.com/settings/tokens)

Allí en **"Note"** póngale algún nombre descriptivo  
(ej: `mi-laptop`, `git-windows`, `servidor`)

En **"Expiration"** seleccione un tiempo de expiración (GitHub aconseja poner un tiempo de expiración: [https://bit.ly/3BrIvA9](https://bit.ly/3BrIvA9)).
Por tal motivo, cuando expire habrá que crear otro Token y cambiarlo manualmente del repositorio que haya clonado (explicaciones más abajo).

Allí en **"Select scopes"** marque **"repo"** (pero si necesita algún otro permiso márquelo) y al final de la página clic en **"Generate token"**.

### 🔐 Guardar el Token

> ⚠️ **MUY IMPORTANTE:**  
> El token solo se muestra una vez.

👉 Cópialo inmediatamente y guárdalo en:

-   Un gestor de contraseñas
-   Un archivo seguro

---

## IDENTIFICARSE EN GIT

Para que esto funcione usted debe identificarse en Git para que sepa quién es.
Si ya lo hizo, omita este paso.

Ejecute los siguientes comandos (puede hacerlo uno por uno) en el siguiente orden:

```bash
git config --global user.name "suusuario"

git config --global user.email su.correo@gmail.com

git config --global credential.helper store
```

👉 Modifique los datos de las dos primeras líneas con los suyos.

**Consejo en Windows.-** Para evitar errores al copiar estas líneas en Windows (vea [mi entrada](https://washingtonindacochea.blogspot.com/2025/09/instalar-git-en-windows-para-usar-un-repositorio-de-linux.html) de cómo instalar git en Windows), recomiendo usar **PowerShell**. Si usa Git Bash, asegúrese de copiar correctamente sin espacios adicionales, porque sino le dará errores como muestra la siguiente imagen:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhx71ToTAtBe0ItGuinBreBZ9m2nODKERYDi-590yY9pfqfKSMfl2P2zIt9pNNC6hXUB3qNNr7ZSQEJDXXvzbh9aB3RwRvCLU6ySnIs_a_bx4EHlNiWlOFhk-1CidMm2u9cM5oG2QxP7hnxjnteUnPOHcUsXasRZ7O-ZskbVc-r3FpvHRwu4WZq9tmoyRk/s516/20251224-085701%20clonando%20en%20Git%20Bash,%20ejemplos.png)

---

Luego, en un repositorio suyo (ejemplo uno mio):

```bash
git clone https://github.com/wachin/Cancionero
```

Modifique algún archivo y ejecute:

```bash
git add .
git commit -m update
git push
```

Cuando le pida:

* **Usuario** → su usuario
* **Password** → su Token

En Linux oculto en HOME se creará el archivo:

```
.git-credentials
```

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhNjckfJvuQ3EOuwbpyAr2sERfiGh-EijsRYm6k2w-kCBW7Gu0He2axd7G1aFxU5Uw1l7602mqc2azdyCelgYELlwRv7DM0rSMLRijsW_lEcx_QY_s0Hw1WRxo7u1XK9kiTX8hRfMWvkBc/s16000-rw/20201227-135557.png)

Este contendrá el Token, y después ya no se lo volverá a pedir.

---

## Datos creados

En Linux se habrá creado el archivo:

```
~/.gitconfig
```

Con contenido como:

```ini
[user]
    name = suusuario
    email = su.correo@gmail.com

[credential]
    helper = store
```
---

## Editar o actualizar datos manualmente en Linux

Ejemplo de token:

```
ghp_jfg1o7OLxV6KgYjUiKoDeFgHtHyO8sy56kgfW
```

Si desea modificarlo manualmente sin usar comandos en Linux se puede hacer así:

- En Linux mostrar archivos ocultos (Ctrl + H)
- Editar con un editor como Gedit

Abrir configuración:

```bash
gedit ~/.gitconfig
```

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbIlS_ODjoLNNEDaZx_NtUXxXUaIyX-VtRBhr_Hk67ez2bFfU1t2qmG0j-Ija_unGK_VaCV6TTQVh9gp8JGiKQoyREpWxLYorReahllJT3pJrkvJnPn8fTjlu-TEIQjh-wFM0SWh67CE8/s722/20201229-174736.png)

Editar credenciales:

```bash
gedit ~/.git-credentials
```

Debe quedar así:

```text
https://usuario:ghp_jfg1o7OLxV6KgYjUiKoDeFgHtHyO8sy56kgfW@github.com
```

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOqZYJyYyu3Lf-6oLm772VFxOFlKuBOfSx1Cd4PvnN2QfkDCyyVpmpPrhcBFpLnozW1hVvvbPui7NBQdpx5vNXsBGjiasD9vXK6tFAhi2F5wueJAddwEDyDO2PdE8OTTxPC-QLSy0KlMg/s736/20201229-175052.png)

👉 Reemplace:

* `usuario` por su usuario
* `token` por el nuevo token

---

**Dios les bendiga**

---

## CONSULTAS

Git - Config Username & Password - Store Credentials - ShellHacks
[https://www.shellhacks.com/git-config-username-password-store-credentials/](https://www.shellhacks.com/git-config-username-password-store-credentials/)



