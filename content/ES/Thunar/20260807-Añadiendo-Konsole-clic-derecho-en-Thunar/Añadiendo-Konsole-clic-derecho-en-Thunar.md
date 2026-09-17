# Cómo añadir «Abrir Konsole aquí» al menú de clic derecho de Thunar

Thunar es el administrador de archivos del escritorio Xfce y dispone de una característica muy útil llamada **Acciones personalizadas** (*Custom Actions*), que permite añadir nuestros propios comandos al menú contextual que aparece al hacer clic derecho.

En este tutorial vamos a crear una acción llamada **«Abrir Konsole aquí»**, de manera que podamos hacer clic derecho dentro de cualquier directorio abierto en Thunar y abrir inmediatamente la terminal **Konsole** en esa misma ubicación.

Por ejemplo, si con Thunar estamos ubicados en:

```text
/home/usuario/Dev/mi-proyecto/build/
```

al hacer clic derecho y seleccionar:

**Abrir Konsole aquí**

Konsole se abrirá directamente en:

```text
/home/usuario/Dev/mi-proyecto/build/
```

Esto resulta especialmente útil para programación, compilación de proyectos, Git y, en general, para cualquier tarea que requiera trabajar frecuentemente con la terminal.

---

## 1. Requisitos

Necesitamos tener instalados:

* **Thunar**
* **Konsole**

En Debian, Ubuntu, MX Linux y distribuciones derivadas podemos instalar Konsole con:

```bash
sudo apt install konsole
```

Podemos comprobar que está disponible ejecutando:

```bash
konsole
```

---

## 2. Abrir las acciones personalizadas de Thunar

Abrimos **Thunar**.

En el menú superior entramos en:

**Editar → Configurar acciones personalizadas...**

Se abrirá la ventana donde Thunar permite administrar las acciones que aparecen en el menú contextual.

Pulsamos el botón:

**+**

para crear una nueva acción personalizada.

---

## 3. Crear la acción «Abrir Konsole aquí»

En la pestaña **Básico** configuramos los campos de la siguiente manera:

**Nombre:**

```text
Abrir Konsole aquí
```

**Descripción:**

```text
Abrir Konsole en esta ubicación
```

**Comando:**

```bash
for f in %F; do konsole --workdir "$f"; done
```

También podemos seleccionar un icono relacionado con una terminal. Dependiendo del tema de iconos instalado podemos buscar, por ejemplo:

```text
konsole
```

o:

```text
utilities-terminal
```

![AVvXsEhNQ7_qw3kgaMe3lzwW4_i3kZkabuWCq3-MkDxJZlE8nwnNL0ouHB31lkqP6eR0Vde2T1ZSJSQdDqe47KMigv_y3Ah05MHz12M2h6k7hh6kg79BZDwIO7hD6P1zBJdcpQ6rSAB2okVOnYqU5Mxzc6B1UKKov_a0Y1yxLqR50u6QONr9UUCN6rn0c8CsXts=s1600-rw](Añadiendo%20Konsole%20clic%20derecho%20en%20Thunar_assets/DseJnw)


---

## 4. Configurar las condiciones de aparición

Ahora entramos en la pestaña:

**Condiciones de aparición**

En **Patrón de archivo** dejamos:

```text
*
```

Y habilitamos la opción correspondiente a:

[*] **Carpetas** **

Después guardamos la acción, da clic en **Aceptar**

![AVvXsEjuDhWzGErMSjLQWtCXYI9YY-xxc63drbcmCacJKb_6d2f74N3A3j0MFCBINlDqerg8OKS3YQX1KEHRuOfT9SQDRoEb72s7YK_KntAuwtxXi4EI2lGOn6gxaFXeZ3Xq6MW9S4YTC9wlZZ8BO5WfKX71HhY476yNhY1enMjTK0yDb59d7E6pcML2cxjzdyo=s1600-rw](Añadiendo%20Konsole%20clic%20derecho%20en%20Thunar_assets/okoMqj)

---

## 5. Probar «Abrir Konsole aquí»

Ahora navegamos normalmente con Thunar.

Supongamos que estamos dentro del directorio:

```text
/home/usuario/Dev/mi-proyecto/build/
```

Hacemos **clic derecho en un espacio vacío** dentro de la ventana de Thunar.

En el menú contextual deberá aparecer:

**Abrir Konsole aquí**

Hacemos clic sobre la opción y se abrirá Konsole directamente en:

```text
/home/usuario/Dev/mi-proyecto/build/
```

Podemos comprobarlo escribiendo en Konsole:

```bash
pwd
```

La terminal debería mostrar:

```text
/home/usuario/Dev/mi-proyecto/build
```

---

## 6. ¿Qué hace el comando?

El comando utilizado es:

```bash
for f in %F; do konsole --workdir "$f"; done
```

Vamos a dividirlo para entenderlo mejor.

### `%F`

`%F` es uno de los parámetros especiales que Thunar proporciona a las acciones personalizadas.

Representa los archivos o directorios proporcionados por Thunar a la acción.

La documentación oficial de Thunar utiliza precisamente `%F` en su ejemplo **Open terminal here**.

### `for f in %F`

Esta parte recorre las ubicaciones que Thunar proporciona:

```bash
for f in %F
```

Cada ubicación se guarda temporalmente en la variable:

```bash
$f
```

### `konsole --workdir "$f"`

Después ejecutamos:

```bash
konsole --workdir "$f"
```

La opción:

```text
--workdir
```

indica a Konsole cuál debe ser su directorio de trabajo inicial.

Por eso Konsole se abre directamente en el directorio correspondiente.

Las comillas en:

```bash
"$f"
```

son importantes porque permiten manejar correctamente rutas que contienen espacios.

Finalmente:

```bash
done
```

termina el bucle.

---

## 7. ¿Por qué no utilizar simplemente `%d`?

Inicialmente podríamos pensar en utilizar un comando más sencillo:

```bash
konsole --workdir %d
```

Sin embargo, en determinadas situaciones esto puede abrir Konsole **un directorio atrás**.

Por ejemplo, si Thunar está situado en:

```text
/home/usuario/Dev/mi-proyecto/build/
```

podríamos terminar con Konsole abierto en:

```text
/home/usuario/Dev/mi-proyecto/
```

En cambio, en nuestras pruebas el siguiente comando funciona correctamente al utilizar la información que Thunar proporciona mediante `%F`:

```bash
for f in %F; do konsole --workdir "$f"; done
```

Además, esta forma sigue el mismo patrón recomendado por la documentación oficial de Thunar para trabajar de forma segura con varios argumentos:

```bash
for f in %F; do cmd "$f"; done
```

Por ello utilizaremos esta variante adaptada específicamente a **Konsole**.

---

## 8. Comparación con el ejemplo oficial de Thunar

La documentación oficial de Thunar proporciona como ejemplo para **Open terminal here** el siguiente comando:

```bash
for f in %F; do exo-open --working-directory "$f" --launch TerminalEmulator; done
```

Este comando abre el **emulador de terminal predeterminado** configurado en el entorno.

Nosotros lo hemos adaptado para que siempre utilice específicamente **Konsole**:

```bash
for f in %F; do konsole --workdir "$f"; done
```

Así no importa cuál sea el emulador de terminal predeterminado del escritorio: la acción abrirá **Konsole**.

---

## Configuración final

Nuestra acción personalizada queda resumida así:

**Nombre:**

```text
Abrir Konsole aquí
```

**Descripción:**

```text
Abrir Konsole en esta ubicación
```

**Comando:**

```bash
for f in %F; do konsole --workdir "$f"; done
```

**Patrón de archivo:**

```text
*
```

**Condición:**

```text
Directorios
```

Con esto tendremos integrada la terminal **Konsole directamente en el menú contextual de Thunar**, permitiéndonos abrir rápidamente una terminal en el directorio en el que estamos trabajando.

---

## Documentación oficial

Este procedimiento está basado en el sistema de **Custom Actions** incluido oficialmente en Thunar.

La documentación oficial explica tanto la creación de acciones personalizadas como el uso de `%F` y proporciona un ejemplo específico llamado **Open terminal here**.

**Documentación oficial de Xfce/Thunar:**

[https://docs.xfce.org/xfce/thunar/custom-actions](https://docs.xfce.org/xfce/thunar/custom-actions)

