# Instalación de Hermes Agent en Termux usando Zhipu AI (GLM)

Tutorial realizado en Android + Termux usando Hermes Agent y Zhipu AI GLM.

---

## 1. Instalar Hermes en Termux

Ejecutar:

```bash
pkg update -y && pkg upgrade -y
pkg install -y curl
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

---

## 2. Pantalla inicial de configuración

Seleccionar:

- `Quick setup — provider, model`

![Quick Setup](images/01_quick_setup.jpg)

---

## 3. Elegir proveedor Zhipu AI

Seleccionar:

- `Z.AI / GLM (Zhipu AI direct API)`

![Provider List](images/02_provider_list.jpg)

---

## 4. Obtener API Key en Zhipu AI

Sitio:

- https://open.bigmodel.cn/apikey/platform

La API debe tener formato:

```text
id.secreto
```

NO solamente el ID.

![Zhipu API](images/03_zhipu_api_page.jpg)

---

## 5. Base URL

Cuando Hermes pregunte:

```text
Base URL [https://api.z.ai/api/paas/v4]
```

Simplemente presionar ENTER.

![Base URL](images/04_base_url.jpg)

---

## 6. Backend de terminal

Seleccionar:

- `Keep current (local)`

![Local Backend](images/05_local_backend.jpg)

---

## 7. Mensajería

Seleccionar:

- `Skip — set up later`

![Skip Messaging](images/06_skip_messaging.jpg)

---

## 8. Instalación terminada

Hermes quedará instalado correctamente.

Comando principal:

```bash
hermes
```

![Install Finished](images/07_install_finished.jpg)

---

## 9. Ejecutar Hermes dentro de un repositorio Git

Entrar en un proyecto:

```bash
cd ~/mi_proyecto
hermes
```

Hermes detectará automáticamente el repositorio.

![Hermes Running](images/08_hermes_running.jpg)

---

## 10. Cambiar modelo

Dentro de Hermes:

```text
/model
```

Seleccionar:

- `glm-5.1`

![Model Picker](images/09_model_picker.jpg)

---

## 11. Confirmación del modelo

Hermes mostrará algo como:

```text
Model switched: glm-5.1
Provider: zai
Context: 202,752 tokens
```

![GLM Selected](images/10_glm_selected.jpg)

---

## 12. Qué significa la cantidad de tokens

La línea:

```text
Context: 202,752 tokens
```

significa la cantidad máxima de contexto que el modelo puede recordar dentro de una conversación.

Eso permite:

- analizar proyectos grandes
- leer muchos archivos
- mantener conversaciones largas
- trabajar mejor con código fuente

---

## 13. Comandos útiles

Abrir Hermes:

```bash
hermes
```

Cambiar configuración:

```bash
hermes setup
```

Cambiar modelo:

```text
/model
```

Actualizar Hermes:

```bash
hermes update
```

---

## 14. Ejemplos de uso

Analizar un proyecto:

```text
Analyze this repository and explain the architecture
```

Ayuda con PyQt6:

```text
Continue porting this C++ project to PyQt6
```

Crear README:

```text
Generate a README for this repository
```

---

Fin del tutorial.
