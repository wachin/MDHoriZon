
# Todos los permisos de GitHub Token (Classic) - 2026

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjguDoMty7MlakqW7iG_f90VEYDk8nh-QF9SE1yjAJeAcrriQ0wZD84sT2ZZzZ86ByRy3ctBrcxCrVPKmMFkzrjUbetGzl1gyGzRKGa3iKcHZo_yVlfW6Nm1lg7mOMDwUQXuSpMscGCSj3suh8Tj-W6ILgqp1_skOTjx7Ji0aJr2Yz4xMAVM2T9kufHhVE/s1536/Portada%20Tokens.jpg)

En GitHub, los **Personal Access Tokens (Classic)** permiten autenticarte sin necesidad de usar tu contraseña, especialmente cuando trabajas con Git, APIs o automatización.

Sin embargo, al momento de crear un token, GitHub nos presenta una gran cantidad de **permisos (scopes)**, lo cual puede generar dudas:

👉 ¿Cuáles debo activar?  
👉 ¿Cuáles son peligrosos?  
👉 ¿Cuáles necesito realmente para programar?  

En esta guía te explico **todos los permisos disponibles (actualizado a marzo 2026)**, incluyendo:

- Su nombre original en inglés  
- Su traducción al español  
- Para qué sirve cada uno en la práctica  

Además, al final encontrarás recomendaciones basadas en experiencia real para elegir los permisos correctos según tu uso.

Estos son todos los permisos que a esta fecha marzo 2026 están cuando uno va a crear un nuevo Token classic

## 🧠 ¿Qué es un Personal Access Token?

Un **Personal Access Token (PAT)** es una clave que reemplaza tu contraseña de GitHub cuando:

- Usas Git desde la terminal
- Trabajas con scripts o automatización
- Te conectas a la API de GitHub

Ejemplo:

```bash
git clone https://github.com/usuario/repositorio.git
```

---

# 🔐 **Buenas prácticas**

- Siempre selecciona SOLO los permisos necesarios.  
- Mientras menos permisos tenga tu token, más seguro será tu sistema.  

---

# 🧾 Permisos de GitHub Token (Classic) – Tabla

|            Permiso             |       Nombre original (inglés)       |           Traducción            |                ¿Para qué sirve? (uso práctico)                |
| ------------------------------ | ------------------------------------ | ------------------------------- | ------------------------------------------------------------- |
| `repo`                         | Full control of private repositories | Control total de repos privados | Acceso completo a repos privados (clonar, push, borrar, etc.) |
| `repo:status`                  | Access commit status                 | Estado de commits               | Leer/actualizar estado de commits (CI/CD)                     |
| `repo_deployment`              | Access deployment status             | Despliegues                     | Controlar deploys (ej: GitHub Pages)                          |
| `public_repo`                  | Access public repositories           | Repos públicos                  | Control total SOLO en repos públicos                          |
| `repo:invite`                  | Access repository invitations        | Invitaciones de repos           | Aceptar/revisar invitaciones                                  |
| `security_events`              | Read and write security events       | Eventos de seguridad            | Gestionar alertas de seguridad                                |
| `workflow`                     | Update GitHub Action workflows       | Workflows                       | Modificar GitHub Actions                                      |
| `write:packages`               | Upload packages                      | Subir paquetes                  | Publicar paquetes                                             |
| `read:packages`                | Download packages                    | Leer paquetes                   | Descargar paquetes                                            |
| `delete:packages`              | Delete packages                      | Eliminar paquetes               | Borrar paquetes                                               |
| `admin:org`                    | Full control of orgs and teams       | Control total de organización   | Administración completa                                       |
| `write:org`                    | Read and write org membership        | Escribir en organización        | Gestionar miembros                                            |
| `read:org`                     | Read org membership                  | Leer organización               | Ver miembros                                                  |
| `manage_runners:org`           | Manage org runners                   | Runners organización            | Administrar runners                                           |
| `admin:public_key`             | Full control of public keys          | Llaves públicas (admin)         | Control total SSH keys                                        |
| `write:public_key`             | Write public keys                    | Escribir llaves públicas        | Añadir/modificar claves                                       |
| `read:public_key`              | Read public keys                     | Leer llaves públicas            | Ver claves                                                    |
| `admin:repo_hook`              | Full control of repository hooks     | Hooks repo (admin)              | Control total webhooks                                        |
| `write:repo_hook`              | Write repository hooks               | Escribir hooks                  | Crear/modificar webhooks                                      |
| `read:repo_hook`               | Read repository hooks                | Leer hooks                      | Ver webhooks                                                  |
| `admin:org_hook`               | Full control of organization hooks   | Hooks organización              | Administrar webhooks org                                      |
| `gist`                         | Create gists                         | Crear gists                     | Crear snippets                                                |
| `notifications`                | Access notifications                 | Notificaciones                  | Ver notificaciones                                            |
| `user`                         | Update ALL user data                 | Usuario (todo)                  | Modificar datos del usuario                                   |
| `read:user`                    | Read ALL user profile data           | Leer perfil                     | Ver perfil                                                    |
| `user:email`                   | Access user email addresses          | Correos                         | Leer emails                                                   |
| `user:follow`                  | Follow and unfollow users            | Seguir usuarios                 | Seguir/dejar de seguir                                        |
| `delete_repo`                  | Delete repositories                  | Eliminar repos                  | ⚠️ Borrar repositorios                                         |
| `write:discussion`             | Read and write discussions           | Escribir discusiones            | Crear/editar discusiones                                      |
| `read:discussion`              | Read discussions                     | Leer discusiones                | Ver discusiones                                               |
| `admin:enterprise`             | Full control of enterprises          | Empresa (admin)                 | Control total enterprise                                      |
| `manage_runners:enterprise`    | Manage enterprise runners            | Runners enterprise              | Administrar runners                                           |
| `manage_billing:enterprise`    | Manage enterprise billing            | Facturación enterprise          | Gestionar pagos                                               |
| `read:enterprise`              | Read enterprise profile              | Leer enterprise                 | Ver datos                                                     |
| `scim:enterprise`              | SCIM provisioning                    | SCIM                            | Gestión automática usuarios                                   |
| `audit_log`                    | Full control of audit log            | Logs (admin)                    | Acceso total auditoría                                        |
| `read:audit_log`               | Read audit log                       | Leer logs                       | Ver auditoría                                                 |
| `codespace`                    | Full control of codespaces           | Codespaces                      | Control total                                                 |
| `codespace:secrets`            | Manage codespace secrets             | Secrets Codespaces              | Gestionar variables                                           |
| `copilot`                      | Full control of Copilot              | Copilot                         | Administrar Copilot                                           |
| `manage_billing:copilot`       | Manage Copilot billing               | Facturación Copilot             | Gestionar licencias                                           |
| `write:network_configurations` | Write network configurations         | Config red                      | Configurar red                                                |
| `read:network_configurations`  | Read network configurations          | Leer red                        | Ver configuración                                             |
| `project`                      | Full control of projects             | Proyectos                       | Control total                                                 |
| `read:project`                 | Read projects                        | Leer proyectos                  | Ver proyectos                                                 |
| `admin:gpg_key`                | Full control of GPG keys             | GPG admin                       | Control total                                                 |
| `write:gpg_key`                | Write GPG keys                       | Escribir GPG                    | Añadir claves                                                 |
| `read:gpg_key`                 | Read GPG keys                        | Leer GPG                        | Ver claves                                                    |
| `admin:ssh_signing_key`        | Full control SSH signing keys        | SSH signing admin               | Control total                                                 |
| `write:ssh_signing_key`        | Write SSH signing keys               | Escribir SSH signing            | Añadir claves                                                 |
| `read:ssh_signing_key`         | Read SSH signing keys                | Leer SSH signing                | Ver claves                                                    |
                                                 |

---

## ⚠️ Seguridad

Nunca compartas tu token públicamente.

Si crees que tu token fue expuesto:

1. Revócalo inmediatamente
2. Genera uno nuevo
3. Usa solo los permisos necesarios

GitHub NO te avisará siempre si alguien usa tu token.

---

## ✅ Token mínimo recomendado (según uso)

### 🧑‍💻 Para uso básico con Git
- `repo` o `public_repo`

### 🤖 Para scripts / automatización

- `read:user`
- `user:email`
- `repo:status`

### 🚀 Para CI/CD (GitHub Actions)

- `workflow`
- `repo`

👉 Evita marcar todo por defecto.

---

## 🧠 Recomendación práctica (en mi caso 👨‍💻)

Como yo hago programas, estos son los **más útiles para mi persona**, usted debe de marcar los que necesite:

### 🔹 Básicos (casi siempre necesarios)

* `repo` → si trabajas con repos privados
* `public_repo` → si solo usas repos públicos
* `read:user` → para autenticación básica
* `user:email` → si necesitas el correo

---

### 🔹 Para desarrollo moderno

* `workflow` → si usas GitHub Actions
* `write:packages` → si publicas paquetes
* `read:packages` → si consumes paquetes

---

### 🔹 Para automatización / scripts

* `repo:status`
* `notifications`
* `gist`

---

### ⚠️ PELIGROSOS (usar con cuidado)

* `delete_repo`
* `admin:org`
* `admin:enterprise`
* `audit_log`

---