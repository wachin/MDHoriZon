# Cómo instalar la última versión de Go (Golang) en MX Linux 23 (Debian 12)

Una de las limitaciones de **MX Linux 23**, al estar basado en **Debian 12 Stable**, es que los paquetes incluidos en sus repositorios no siempre contienen las versiones más recientes de algunos lenguajes de programación.

Por ejemplo, al momento de escribir este artículo, el paquete oficial disponible mediante APT instala **Go 1.19.8** (yo la había instalado con `sudo apt install golang`), mientras que muchos proyectos actuales requieren **Go 1.22 o superior**.

Afortunadamente, el propio equipo de Go recomienda instalar la versión oficial descargándola directamente desde su sitio web.

En este tutorial veremos cómo hacerlo.

---

# 1. Comprobar la versión instalada

Primero abrimos una terminal y ejecutamos:

```bash
go version
```

Si Go fue instalado desde los repositorios de Debian, probablemente veremos algo parecido a:

```text
go version go1.19.8 linux/amd64
```

---

# 2. Eliminar la versión instalada mediante APT

No es obligatorio, pero sí recomendable para evitar conflictos.

```bash
sudo apt remove golang-go golang
sudo apt autoremove
```

# 3. Descargar la última versión oficial

Visita la página oficial:

[https://go.dev/dl/](https://go.dev/dl/)

Descarga la versión correspondiente a tu arquitectura.

Para equipos de 64 bits (AMD64) normalmente será un archivo parecido a:

```
go1.26.4.linux-amd64.tar.gz
```

La versión cambiará con el tiempo, así que descarga siempre la más reciente.

---

# 4. Eliminar una instalación anterior

Si anteriormente instalaste Go manualmente, elimina la carpeta anterior:

```bash
sudo rm -rf /usr/local/go
```

---

# 5. Instalar Go

Sitúate en la carpeta donde descargaste el archivo.

Por ejemplo:

```bash
cd ~/Descargas
```

Comprueba el nombre del archivo:

```bash
ls
```

Obtendrás algo parecido a:

```text
go1.26.4.linux-amd64.tar.gz
```

Ahora instala Go.

Puedes escribir el nombre completo:

```bash
sudo tar -C /usr/local -xzf go1.26.4.linux-amd64.tar.gz
```

O, como hice yo, aprovechar los comodines del shell para no tener que escribir la versión completa:

```bash
sudo tar -C /usr/local -xzf go1.*.*.linux-amd64.tar.gz
```

Este método resulta muy práctico porque no es necesario modificar el comando cada vez que aparece una nueva versión de Go.

---

# 6. Configurar las variables de entorno

Edita tu archivo (usa Gedit que es más facil de usar `sudo apt install gedit`):

```bash
gedit ~/.profile
```

Añade al final las siguientes líneas:

```bash
export PATH=$PATH:/usr/local/go/bin
```

Guarda el archivo.

---

# 7. Aplicar los cambios

Sin cerrar la sesión puedes ejecutar:

```bash
source ~/.profile
```

---

# 8. Verificar la instalación

Comprueba que todo funciona correctamente:

```bash
go version
```

Deberías obtener un resultado parecido a:

```text
go version go1.26.4 linux/amd64
```

---

# ¿Cómo actualizar Go en el futuro?

Cuando aparezca una nueva versión solo tendrás que:

1. Descargar el nuevo archivo `.tar.gz`.
2. Eliminar la instalación anterior:

```bash
sudo rm -rf /usr/local/go
```

3. Instalar la nueva versión:

```bash
sudo tar -C /usr/local -xzf go1.*.*.linux-amd64.tar.gz
```

No será necesario volver a modificar el archivo `.profile`.

---

# REFERENCIAS

**The Go Programming Language**  
[https://go.dev/](https://go.dev/)

**Download and install - The Go Programming Language**  
[https://go.dev/doc/install](https://go.dev/doc/install)

**All Go Releases (Official Downloads)**  
[https://go.dev/dl/](https://go.dev/dl/)

**Go Documentation**  
[https://go.dev/doc/](https://go.dev/doc/)

**Go Command Documentation (cmd/go)**  
[https://pkg.go.dev/cmd/go](https://pkg.go.dev/cmd/go)

**golang/go - Official Go Repository on GitHub**  
[https://github.com/golang/go](https://github.com/golang/go)


