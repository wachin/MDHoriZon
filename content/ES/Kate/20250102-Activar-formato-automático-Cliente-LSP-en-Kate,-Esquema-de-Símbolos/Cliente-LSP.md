# Habilitar formato automático o autocompletado con Cliente LSP (python3-pylsp) en Kate ("Esquema de Símbolos" python y otros lenguajes) 

En el editor de texto **Kate** es posible habilitar funciones como el **formato automático** o el **autocompletado de código** al momento de escribir, similar a lo que ocurre en VS Code.

La siguiente imagen muestra el Editor de Texto Kate con el autocompletado habilitado para el lenguaje de programación Python:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjriKu6hb2bXSOYM8PDXX-e5BO8bG1Znj_3wLEohTWG5PjDmDiI81CYXGV8A9D8rbc5FtEwXzYMROGpu9oAfwih7sz1-6iI-flEHuTHxUDJ16vV6WivxBgU8-9bFEeyHJ7qxH3hJunnvNB97hb8QIq5slpyUfmY5DIdVJFsNTgguOg-JbkPGI9yg2isjM0/s965/Cliente%20LSP%20funcionando%20en%20archivo%20python.png)

---

## Dependencias

Necesitamos instalar el paquete principal:

```bash
sudo apt install python3-pylsp
```

Este paquete instala automáticamente `python3-docstring-to-markdown`.

Repositorio:
[https://github.com/python-lsp/docstring-to-markdown](https://github.com/python-lsp/docstring-to-markdown)

> ⚠️ Nota: este paquete es principalmente para sistemas de 64 bits.

---

## Paquetes para autocompletado, análisis de código y funciones avanzadas

Para que el autocompletado, análisis de código y funciones avanzadas funcionen correctamente (como se ve en las capturas), instalar

```bash
sudo apt install python3-rope python3-autopep8 python3-flake8 python3-pycodestyle python3-mccabe python3-pyflakes
```

### ¿Qué aporta cada paquete?

* **python3-rope**
  Mejora el autocompletado y permite refactorizar código (renombrar variables correctamente en todo el proyecto).

* **python3-autopep8**
  Formatea automáticamente el código siguiendo el estándar PEP 8.

* **python3-flake8**
  Detecta errores, variables no usadas y malas prácticas en tiempo real.
  
+ **python3-pycodestyle?**
Es un verificador del estilo de código Python

+ **python3-mccabe**
Analiza la complejidad del código.

+ **python3-pyflakes**
Detecta errores lógicos en el código.

---

### Resultado después de instalar estos paquetes

En la parte inferior de Kate aparecerán mensajes como:

```
lint: pyflakes [100%]
lint: pycodestyle [100%]
lint: mccabe [100%]
```

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEieRnuILLP1XdejnwHOdvnculhEI1oX7zmNYIRHG3dLidCBO_HbNW8i-wBFgpNtKut1QXU8P9rzWdniWFJiwmt9lxsbrs26Bjb7gFEzBWEmnScg06A1n6sSvUbpQhoMhXwEJFslPm_pEjQbGQlRighLacxJAIF4-XeaPxBt8JVQBnfBDuBsj_AgpZBnx5Y/s752/Cliente%20LSP%20activados%20pyflakes%20pycodestyle%20mccabe.png)

Esto indica que el código está siendo analizado correctamente en tiempo real.

---

## 📦 Paquetes sugeridos adicionales

El paquete `python3-pylsp` sugiere otros paquetes opcionales que pueden instalarse:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYbzfF67ucnqpTjlvruoJuNnpLCVOQg7_SlsZiQ2zK6Q09ECYLAIqxvSrhSUu4PGySHwCLQXEn0WRqjpktX0uapSr12q8iJqLIagZU4T8g7Zx6Dwb36UihAlOULosGRvIh7OScD5tPSPtxSocrgv4H1jtK3fyd7dlzU8Rsaqq9b2eqyVCSGZzXI4Sj118/s706/paquete%20python3-pylsp%20sugedidos.png)

### flake8

Comprobador de código que utiliza pycodestyle y pyflakes.

### pylint

Analizador estático de código más avanzado que detecta errores y mejora la calidad del código.

Incluye herramientas como:

* pyreverse (diagramas UML)
* symilar (detector de similitudes)

### python3-pydocstyle

Verifica la documentación del código (docstrings).

### python3-whatthepatch

Permite analizar archivos de parches.

### python3-yapf

Otra herramienta de formateo de código (alternativa a autopep8).

---

## ⚙️ Activar el Cliente LSP en Kate

Después de instalar los paquetes:

1. Cierre Kate si está abierto.
2. Vuelva a abrir Kate.
3. Abra un archivo `.py`

Aparecerá un mensaje solicitando iniciar el servidor LSP. Presione **Sí**:

![](https://blogger.googleusercontent.com/img/a/AVvXsEhaSTqxR1Al3JTLruRiRWYsocU3YtSh6Exzm1Kv-w3YQ1VtozKAS80Qjpe9wYgm4AffjCWzYMNuBglJlzxs4OdbTehRjNOmExV_am_Xm_s7Jkirm3siMT-KGuQU9rgQOk_NwiOaYj_WBewAPU5FprWkfPkJQ1nIhmjZWQiYtCwyFv9SbLzfvOQReFk0jZg)

Si no aparece, puede activarlo manualmente:

**Preferencias → Configurar Kate → Complementos → Cliente LSP**

Al activarlo, aparecerá en el panel izquierdo:

👉 **Esquema de Símbolos**

![](https://blogger.googleusercontent.com/img/a/AVvXsEhnIJmg9vpFfvRDutmnXtoQioA_d4RsZBhKhOwGvg6ZP5Cx1t_YqYWhxJdf9tpiQzEk-xU7M1xzmYokySKmGk0HfJlTMa6vkfpWwZCcHwexloiGPW2mFq_fmUnb5d6C2832pwiIU0TVLxCfQyFz2zZg5CjoQucfGpbyhCYNBMNQA_AybiZpWQhsrmQVsWs)

ese **esquema de śimbolos** me muestra todos los **métodos**, en el ejemplo de la imagen de arriba le he dado clic al método:

**open_dropped_file**


---

## Añadir configuración manual (para sistemas no KDE)

Si usa Debian u otro entorno no KDE y no funciona correctamente (sólo en caso de que no funcione correctamente):

Ejecute:

```bash
kate ~/.config/kate/lspclient/settings.json
```

Copie el contenido desde:  

[https://github.com/KDE/kate/blob/master/addons/lspclient/settings.json](https://github.com/KDE/kate/blob/master/addons/lspclient/settings.json)  

Pegue el contenido en el archivo `settings.json` y guarde.

---

Al reiniciar Kate:

* Se activará el análisis del código
* Aparecerá el esquema del programa
* El autocompletado funcionará correctamente

---

## Marksman (Markdown LSP)

Este complemento sirve para escribir en Markdown con asistencia de código e inteligencia artificial desde la comodidad de tu editor favorito.

Si usted abre un archivo `.md`, y observa en Kate en la pestaña **Salida** aparecerá un enlace para instalar Marksman:  

[https://github.com/artempyanykh/marksman/](https://github.com/artempyanykh/marksman/)  

Instrucciones:  
[https://github.com/artempyanykh/marksman/blob/main/docs/install.md](https://github.com/artempyanykh/marksman/blob/main/docs/install.md)  

Pero yo aún no lo he instalado.

> ⚠️ Nota: No testá disponible para Linux32 bits.

---

## Consultas

**How to enable Kate's LSP Client for HTML and PHP?**  
[https://www.reddit.com/r/kde/comments/y34v70/how_to_enable_kates_lsp_client_for_html_and_php/](https://www.reddit.com/r/kde/comments/y34v70/how_to_enable_kates_lsp_client_for_html_and_php/)  

**Kate - LSP Client Status**  
[https://kate-editor.org/post/2020/2020-01-01-kate-lsp-client-status/](https://kate-editor.org/post/2020/2020-01-01-kate-lsp-client-status/)  


