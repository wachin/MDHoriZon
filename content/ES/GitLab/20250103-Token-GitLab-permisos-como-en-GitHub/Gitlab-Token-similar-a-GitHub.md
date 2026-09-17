
### Cómo crear un token en GitLab con permisos similares a los de GitHub

Este tutorial te ayudará a entender cómo crear un **token de acceso personal en GitLab** con permisos equivalentes al permiso **repo** de GitHub, especialmente para trabajar con repositorios privados y públicos mediante Git (HTTPS).

---

## 1. ¿Qué es un Token en GitLab y GitHub?

Un **Personal Access Token (PAT)** es una clave que permite autenticarte en GitLab o GitHub sin usar tu contraseña directamente.

Con un token puedes:

- Hacer `git clone`
- Hacer `git pull`
- Hacer `git push`
- Acceder a la API
- Automatizar procesos

### ¿Por qué usar tokens?

GitHub y GitLab ya no permiten autenticación con contraseña al usar HTTPS.  
El token reemplaza la contraseña de forma más segura y controlada.

---

## 2. Permisos de Token en GitHub

En GitHub, al crear un **token clásico**, existe un permiso llamado:

```
repo   Full control of private repositories
```

Este permiso permite:

- Acceso completo a repositorios privados
- Acceso a repositorios públicos
- Modificar contenido
- Gestionar estados y eventos relacionados

En la práctica, `repo` permite trabajar completamente con Git mediante HTTPS.

---

## 3. Permisos de Token en GitLab (Scopes actuales)

En GitLab, los permisos están divididos en **scopes** (ámbitos).  
Actualmente existen, entre otros, los siguientes:

```
read_user
read_repository
read_virtual_registry
read_registry
read_api
self_rotate
write_repository
write_virtual_registry
write_registry
api
ai_features
create_runner
manage_runner
k8s_proxy
```

### ¿Qué significan los más importantes para Git?

- **read_repository**  
  Permite acceso de solo lectura a repositorios privados mediante Git-over-HTTP.

- **write_repository**  
  Permite lectura y escritura en repositorios privados mediante Git-over-HTTP.

- **read_user**  
  Permite leer información básica del perfil mediante la API.

- **read_api**  
  Permite acceso de solo lectura a la API.

- **api**  
  Permite acceso completo de lectura y escritura a toda la API de GitLab, incluyendo:
  - Proyectos
  - Grupos
  - Container registry
  - Dependency proxy
  - Package registry

⚠ El scope `api` es muy amplio y normalmente no es necesario para trabajar con Git.

---

## 4. ¿Qué scopes elegir para hacer lo mismo que `repo` en GitHub?

Si en GitHub usas `repo` solo para:

- `git clone`
- `git pull`
- `git push`

En GitLab debes aplicar el **principio de mínimo privilegio**.

Selecciona únicamente:

✔ `read_repository`  
✔ `write_repository`

Eso es suficiente para trabajar con repositorios privados y públicos mediante HTTPS.

---

### ¿Cuándo usar `api`?

Solo si:

- Vas a usar la API REST de GitLab
- Una herramienta externa lo exige explícitamente
- Vas a automatizar administración de proyectos o grupos

En caso contrario, no es recomendable marcarlo.

---

### ¿Necesito marcar `read_user`?

No.

`read_user` solo permite leer información básica del perfil a través de la API.  
Para trabajar con Git normalmente no es necesario.

---

## 5. Pasos para crear el token en GitLab

### Paso 1: Iniciar sesión

Ve a:

[https://gitlab.com/](https://gitlab.com/)

E inicia sesión.

---

### Paso 2: Ir a tu perfil

1. Haz clic en tu avatar (esquina superior derecha).
2. Selecciona **Preferences**.
3. En el menú lateral de la izquierda selecciona **Personal  access tokens**.

---

### Paso 3: Crear el token

Completa:

- **Nombre**: Ejemplo `token-repositorios`
- **Fecha de expiración** (recomendable)
- **Scopes**:

Para uso normal con Git:

✔ read_repository  
✔ write_repository  

(No marques `api` salvo que realmente lo necesites)

---

### Paso 4: Crear el token

Haz clic en:

Create personal access token

---

### Paso 5: Guardarlo

⚠ GitLab mostrará el token una sola vez.  
Guárdalo en un lugar seguro.

No podrás volver a verlo.

---

## 6. Cómo usar el Token

Cuando Git solicite contraseña:

- Username → tu usuario normal
- Password → pega el token

---

## Método recomendado: Helper de credenciales

Configura:

```bash
git config --global credential.helper store
```

Luego haz:

```bash
git push
```

Git almacenará las credenciales en:

```
~/.git-credentials
```

⚠ Este archivo guarda el token en texto plano.  
No es recomendable en equipos compartidos.

---

## Método NO recomendado: Incluir el token en la URL

```
git remote set-url origin [https://usuario:token@gitlab.com/namespace/repositorio.git](https://usuario:token@gitlab.com/namespace/repositorio.git)
```

⚠ Esto guarda el token en texto plano dentro de:

```
.git/config
```

No es recomendable por razones de seguridad.

---

## 7. ¿Qué hacer cuando el token caduque?

1. Crear uno nuevo.
2. Reemplazarlo en:
   - El helper de credenciales
   - El archivo `~/.git-credentials`
   - O la URL remota (si la configuraste así)

Después podrás continuar trabajando normalmente:

```bash
git add .
git commit -m "mensaje"
git push
```

---

## Nota sobre otros scopes

GitLab incluye otros scopes como:

- `read_registry`
- `write_registry`
- `ai_features`
- `create_runner`
- `manage_runner`
- `k8s_proxy`
- `self_rotate`

Estos están relacionados con:

- Container Registry
- Runners
- Kubernetes
- Funciones de IA
- Rotación automática del token

Para trabajar normalmente con repositorios usando Git, no son necesarios.

---

## Conclusión

Si vienes de GitHub y usas el permiso `repo`, el equivalente práctico en GitLab para trabajar con Git mediante HTTPS es:

✔ `read_repository`  
✔ `write_repository`

Usa `api` solo cuando realmente lo necesites.

Aplicar el principio de mínimo privilegio mejora tu seguridad y reduce riesgos.

---

## Referencias oficiales

GitHub Docs – Personal Access Tokens  
[https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)  

GitLab Docs – Personal Access Tokens  
[https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)  

GitLab Docs – Scopes  
[https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#scopes](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#scopes)
