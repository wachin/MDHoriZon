# Cómo usar Minka (Repositorio Nacional de Software Público) igual que GitHub

![](images/Portada.jpg)

Si ya sabes usar **GitHub** para hacer:

```bash
git clone
git pull
git push
```

Entonces también puedes hacerlo en **Minka**, el Repositorio Nacional de Software Público del Ecuador.

Minka es una plataforma impulsada por el Estado ecuatoriano para promover el desarrollo de software libre en el país .

---

# ¿Qué es Minka?

Minka es una plataforma web colaborativa para el desarrollo de proyectos de software libre que:

* Ofrece repositorios de código fuente
* Permite versionamiento con Git
* Incluye foros de discusión
* Fomenta el desarrollo abierto

Está orientada a:

* Desarrolladores independientes
* Estudiantes
* Funcionarios públicos
* Entusiastas del software libre
* Cualquier ciudadano interesado en innovación tecnológica

Sitio oficial:
[https://www.minka.gob.ec](https://www.minka.gob.ec)

---

# 1. ¿Qué es un Token en Minka (GitLab) y GitHub?

Un **Personal Access Token (PAT)** es una clave que permite autenticarnos sin usar la contraseña directamente.

Se usa cuando trabajamos con Git mediante HTTPS.

Con un token podemos:

* Clonar repositorios
* Hacer pull
* Hacer push
* Automatizar tareas
* Usar la API

---

## 🔎 Traducción de los Scopes de Minka

A continuación, traduzco y explico los permisos (scopes) disponibles en Minka:

---

### 🔹 `api`

**Traducción oficial:**

Otorga acceso completo de lectura y escritura a la API, incluyendo todos los grupos y proyectos, el registro de contenedores (container registry) y el registro de paquetes (package registry).

**Explicación sencilla:**

Este es el permiso más amplio.
Permite administrar prácticamente todo mediante la API.

⚠ No es necesario para hacer `git clone`, `pull` o `push`.

---

### 🔹 `read_api`

**Traducción oficial:**

Otorga acceso de solo lectura a la API, incluyendo todos los grupos y proyectos, el registro de contenedores y el registro de paquetes.

**Explicación sencilla:**

Permite consultar información mediante la API, pero no modificarla.

No es necesario para trabajar con Git normalmente.

---

### 🔹 `read_user`

**Traducción oficial:**

Otorga acceso de solo lectura al perfil del usuario autenticado mediante el endpoint `/user` de la API, incluyendo nombre de usuario, correo público y nombre completo. También permite acceso a endpoints de solo lectura bajo `/users`.

**Explicación sencilla:**

Permite que aplicaciones consulten tu información básica de perfil.

No es necesario para `clone`, `pull` o `push`.

---

### 🔹 `read_repository`

**Traducción oficial:**

Otorga acceso de solo lectura a repositorios en proyectos privados usando Git-over-HTTP o la API de archivos del repositorio.

**Explicación sencilla:**

Permite:

* Clonar repos privados
* Hacer `git pull`
* Leer archivos del repositorio

Este sí es necesario.

---

### 🔹 `write_repository`

**Traducción oficial:**

Otorga acceso de lectura y escritura a repositorios en proyectos privados usando Git-over-HTTP (no mediante la API).

**Explicación sencilla:**

Permite:

* Hacer `git push`
* Subir cambios al repositorio
* Crear ramas y commits

También es necesario para trabajo normal con Git.

---

## ¿Por qué usar tokens?

Porque:

* GitHub y GitLab ya no permiten usar contraseña en HTTPS.
* Son más seguros.
* Permiten controlar exactamente qué permisos otorgamos.

---

# 2. Permisos de Token en GitHub

En GitHub existe el permiso:

```
repo   Full control of private repositories
```

Este permite:

* Leer y escribir en repositorios privados
* Trabajar con repos públicos
* Gestionar contenido mediante Git

En la práctica, es el permiso necesario para trabajar normalmente con Git.

---

# 3. Permisos de Token en Minka (Scopes actuales)

Minka funciona sobre GitLab.
Los scopes disponibles son:

* api
* read_api
* read_user
* read_repository
* write_repository

---

## ¿Qué significan los más importantes para Git?

* **read_repository** → Permite clonar y leer repos privados.
* **write_repository** → Permite hacer push.
* **api** → Da acceso completo a la API (muy amplio).

---

# 4. ¿Qué scopes elegir para hacer lo mismo que `repo` en GitHub?

Si solo quieres hacer:

```bash
git clone
git pull
git push
```

Entonces debes marcar únicamente:

✔ read_repository
✔ write_repository

Eso es suficiente.

---

## ¿Cuándo usar `api`?

Solo si:

* Vas a usar la API REST.
* Vas a automatizar administración de proyectos.
* Alguna herramienta externa lo requiere.

Para uso normal con Git, **no es necesario**.

---

# 5. Pasos para crear el token en Minka

## Paso 1: Iniciar sesión

Ve a:

[https://www.minka.gob.ec/users/sign_in](https://www.minka.gob.ec/users/sign_in)

E inicia sesión con tu cuenta.

---

## Paso 2: Ir a tu perfil

1. Haz clic a la derecha en tu avatar.
2. Selecciona a la izquierda **Preferences**.
3. Ve a **Access Tokens**.

---

## Paso 3: Crear el token

Completa:

* **Nombre** (ejemplo: `git-pc-personal`)
* **Expiration date** (recomendable)
* **Scopes**:

✔ read_repository
✔ write_repository

---

## Paso 4: Crear el token

Haz clic en crear.

---

## Paso 5: Guardarlo

⚠ El token se muestra solo una vez.
Guárdalo en un lugar seguro.

---

# 6. Cómo usar el Token

Cuando Git te pida contraseña:

* Username → tu usuario
* Password → pega el token

---

# Método recomendado: Helper de credenciales

Configura:

```bash
git config --global credential.helper store
```

Luego haz un `git push` e ingresa el token cuando lo solicite.

⚠ Esto lo guarda en texto plano en `~/.git-credentials`.
No usar en equipos compartidos.

---

# Método NO recomendado: Incluir el token en la URL

```bash
git remote set-url origin https://usuario:token@minka.gob.ec/namespace/repositorio.git
```

⚠ Esto guarda el token en `.git/config`.
No es recomendable por seguridad.

---

# 7. ¿Qué hacer cuando el token caduque?

1. Crear uno nuevo.
2. Reemplazarlo donde lo hayas guardado.
3. Seguir trabajando normalmente:

```bash
git add .
git commit -m "mensaje"
git push
```

---

# Nota sobre otros scopes

Minka incluye otros scopes como `read_api` y `read_user`.

Para trabajar normalmente con Git, no son necesarios.

Aplica siempre el principio de **mínimo privilegio**.

---

Dios les bendiga

---

# Referencias oficiales

Repositorio Nacional de Software Público
[https://www.minka.gob.ec](https://www.minka.gob.ec)

Presentación oficial de Minka (IEPI)
[https://www.derechosintelectuales.gob.ec/el-iepi-presento-minka-una-plataforma-para-el-software-libre/](https://www.derechosintelectuales.gob.ec/el-iepi-presento-minka-una-plataforma-para-el-software-libre/)

---
