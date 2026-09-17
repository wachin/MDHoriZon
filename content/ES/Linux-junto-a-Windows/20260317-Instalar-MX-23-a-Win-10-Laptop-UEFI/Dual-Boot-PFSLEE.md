
# 🐧 Instalar MX Linux 23 junto a Windows 10 (Dual Boot) UEFI | Guía completa paso a paso

Si tienes un ordenador con Windows 10 y quieres probar Linux sin eliminar tu sistema actual, este tutorial te guiará paso a paso para instalar **MX Linux 23 en dual boot** de forma segura (también puede servir para nuevas versiones de MX Linux pero no se en qué cambien ciertas opciones del Instalador).

Este procedimiento fue probado en una laptop HP Pavilion, pero **puedes aplicarlo en otros equipos** con configuraciones similares.




---

# ⚠️ IMPORTANTE ANTES DE CONTINUAR

Antes de realizar cualquier modificación:

* Realiza copia de seguridad de tus archivos importantes
* Este proceso modifica las particiones del disco
* Si se hace incorrectamente, existe riesgo de pérdida de datos

---

# 🖥️ ENTORNO UTILIZADO EN ESTE TUTORIAL

* Sistema operativo: **Windows 10 Home**
* Distribución Linux: **MX Linux 23**
* Equipo: **Laptop HP Pavilion**
* Disco duro: 1 TB
* Modo de arranque: **UEFI**
* Tabla de particiones: **GPT**

💡 Nota: Aunque este tutorial usa este equipo **Laptop HP Pavilion**, puedes aplicarlo en otros ordenadores con UEFI y GPT.

---

# 💾 PREPARACIÓN DEL PENDRIVE BOOTEABLE

Para instalar MX Linux necesitas un USB booteable.

En este tutorial se utilizó:

* Pendrive SanDisk 16 GB
* Ventoy instalado en el USB [https://facilitarelsoftwarelibre.blogspot.com/2021/12/creando-pendrive-usb-multiboot-con-ventoy-desde-linux.html](https://facilitarelsoftwarelibre.blogspot.com/2021/12/creando-pendrive-usb-multiboot-con-ventoy-desde-linux.html)
* ISO de MX Linux 23 copiada dentro

---

## DESCARGAR MX LINUX

Descarga la ISO desde la página oficial de MX Linux 23:

[https://sourceforge.net/projects/mx-linux/files/Old](https://sourceforge.net/projects/mx-linux/files/Old)

Las nuevas versiones de MX Linux aquí: [https://sourceforge.net/projects/mx-linux/](https://sourceforge.net/projects/mx-linux/)

---

## 🔄 Métodos alternativos

También puedes usar:

* Rufus
* Balena Etcher
* Otros creadores de USB booteable

---

# 🧱 REDUCCIÓN DE PARTICIÓN EN WINDOWS

Desde Windows:

1. Da clic derecho en el logotipo de Windows y clic en **Administración de discos**
2. Selecciona la unidad principal (C:)
3. Haz clic en **Reducir volumen**
4. Visita mi página [https://wachin.github.io/windows-disk-shrink-simulator/](https://wachin.github.io/windows-disk-shrink-simulator/) y sigue los pasos allí explicados
5. Libera espacio (en este caso se dejaron ~366 GB)

Resultado:

* Espacio **no asignado** para Linux

---

# 🔁 MENÚ DE ARRANQUE (BOOT)

Al iniciar desde el USB elige según tu laptop la tecla para que puedas bootear (arrancar) desde el USB, esto lo debes de buscar en internet, y cuando lo logres, verás opciones como:

* USB (UEFI) → ✔ CORRECTO
* USB (Legacy) → ❌ NO usar

Siempre elige:

👉 **UEFI: nombre del pendrive**

Menú del "Administrador de arranque - Menú de opciones de arranque":

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjwyCjL-53QOO_8aDKUQOqaEgtWDfiBUJIYf9Gv3n0t3Tu1Ql-zW6s7xQvu7JGZ6RR6Jt_8QrFgsW0iscM2FUToQSYrVBsj9vvpkrNGF-NyoR9u-vOVfPTnQ5mh968WSbqnf4FHZXQjzdBSMcYW-nXWC4DYroun3E0Qwzm-awSp0gBB_zYZfXvuBIOYN0/s16000-rw/Menu%20de%20arranque.jpg =740x)

---

## 📌Nota: ¿Qué es GiB?

Linux muestra el tamaño en **GiB (Gibibytes)** en lugar de GB.

* 1 GiB = 1.073 GB aproximadamente

Esto es normal. GiB y GB no son exactamente lo mismo, pero en el uso cotidiano la diferencia suele ser pequeña

---


# 🔧 CREACIÓN DE PARTICIÓN EN LINUX

Desde el Live USB da clic en **Instalar** que está en el Escritorio:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzUkyB37RQjBd5sZIygsWiX99wAvt3uCQN4yBN2puLkcONOzd_DeBxWJdekLNwXxSuJfuNl9KbVBgNyFvQdBXflMbYBgDGt0oyXR0d1pTc-yp48MRaSqwdkA5FTVXNfRjia09gbaVV0twZMEGXZxNSUs9UZCM_uKyagF-7CZCdNSMuiNbhF7U8DdAA2ZU/s16000-rw/Menú%20Instalar%20en%20Escritorio%20de%20MX%20Linux.png =640x)

 y se abrirá la ventana, revisa, da clic en siguiente hasta llegar a, en mi caso aparece así:
 
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDGK2rIE9xsvwmpV-Sq58iIVFaqqOK0PmYCUjgzXcAyNo59Egc9stBOxQllL1jqZzImUt_ZnLdtuo-kNraB9-pO1yzrYjtBTmeO6AHBNGtaZnZfh8CHbfM1aeNEJlJaeXnkWJ-sGNYHBXkPv8sMGGBKOMjZwUqeDAOPW-FurjeRkqF4_jOBzSwQArfn88/s16000-rw/No%20aparece%20la%20partición%20con%20espacio%20no%20asignado.png =640x)

como ven no aparece la particion con espacio no asignado

|         Device         |   Size   | Use For |  Label  | Encrypt | Format | Check |
| ---------------------- | -------- | ------- | ------- | ------- | ------ | ----- |
| sda                    | 931.5 GB |         |         |         | GPT    |       |
| ├─ sda1                | 100.0 MB |         |         |         | FAT32  |       |
| ├─ sda2                | 16.0 MB  |         |         |         |        |       |
| ├─ sda3                | 564.5 GB |         |         |         | ntfs   |       |
| └─ sda4                | 559.0 MB |         |         |         | ntfs   |       |
| sdb                    | 14.3 GB  |         |         |         | DOS    |       |
| ├─ sdb1                | 14.3 GB  |         | Ventoy  | 🔒      | exfat  |       |
| └─ sdb2                | 32.0 MB  |         | VTOYEFI |         | FAT16  |       |
| Dispositivos virtuales |          |         |         |         |        |       |
| ├─ sdb1                | 14.3 GB  |         |         |         |        |       |
| └─ ventoy              | 2.2 GB   |         |         |         |        |       | 

como observan no hay la partición sin espacio asignado que dejé para Linux, y para que aparezca, de clic en el botón a la derecha abajo de Gparted:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJ9TRmWAmjBx2dpha0cfjO8tW-Y2vhAKj7Cx1RmxfN7fcJIMrYpte_QXCJVdJbPMi8-thAmkF56nf0twCBe9sd7vO0HNuQFiGyZrlIDkuXCif68fKgm4NHItHaYFEbtttw5Zfa_my4uIicQAh9qTBudu-conEgYmlxQYMVWbm1BdNFAOMxGKP3wWfGW8Q/s16000-rw/Mostrar%20campos%20avanzados.png =640x)

entonces los pasos son estos:

1. Abre **GParted**
2. Localiza el espacio no asignado (unallocated)
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiz7nNTTjXbrZDCYNY71wsI7ds8VCTaCDNr133bDz6O4lNrW2_XP5w7YrSymGLbtiyj2P4bdNnlZ0dXWO-5l9E6q-cBOfDryjvkhSryCdksHdg-mwnqFqiuqMiV-5G58eESGxSV4FxSxt2MEhHYl-_oGwuPXmtdo6stfGQbysGIzeoZWvSsv8bFWeGxGDU/s16000-rw/Espacio%20no%20localizado,%20visto%20en%20Gparted.png =640x)

3. Crea una nueva partición, para hacerlo da clic derecho y clic en **New**:

* Tipo: **ext4**
* Deja espacio para SWAP: Reduce un poco, deja más del doble de espacio del que tiene tu memoria RAM para que se pueda hibernar el sistema con la SWAP. En la laptop donde estaba haciendo esto la memoria RAM es de 4 GB y le dejé 8 GB pero puede ser 5 GB y estará muy bien (esto está explicado en el video)

me queda así:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzOP66dvJj4yBwfAlWJ6XT_sLGHhyphenhyphen7pcjIBjFGXB6O5EXbumUKdVOqEL3MTD43V3IUBn6v_YnYU8aYiYrbRFf37iE-EB4jIrK9s3uHWYZSsnFxfDV2iauaSi02rPnc2tw_jhDmRRezSxRQl9kNFkEDMuu2dH2pQ9Q6wH3ggcc0xZ1JsOrnBruKuQ04xzc/s16000-rw/Particion%20con%20espacio%20no%20asignado,%20ahora%20visible.png =640x)

|         Device         |     Size     | Use For  |    Label    | Encrypt |  Format  | Check |
| ---------------------- | ------------ | -------- | ----------- | ------- | -------- | ----- |
| sda                    | 931.5 GB     |          |             |         | GPT      |       |
| ├─ sda1                | 100.0 MB     |          |             |         | FAT32    |       |
| ├─ sda2                | 16.0 MB      |          |             |         |          |       |
| ├─ sda3                | 564.5 GB     |          |             |         | ntfs     |       |
| ├─ **sda5**            | **358.3 GB** |          | **mxlinux** |         | **ext4** |       |
| ├─ **sda6**            | **8.1 GB**   | **swap** | **swap**    |         | **swap** |       |
| └─ sda4                | 569.0 MB     |          |             |         | ntfs     |       |
| sdb                    | 14.3 GB      |          |             |         | DOS      |       |
| ├─ sdb1                | 14.3 GB      |          | Ventoy      | 🔒      | exfat    |       |
| └─ sdb2                | 32.0 MB      |          | VTOYEFI     |         | FAT16    |       |
| Dispositivos virtuales |              |          |             |         |          |       |
| ├─ sdc1                | 14.3 GB      |          |             |         |          |       |
| └─ ventoy              | 2.2 GB       |          |             |         |          |       |

---

# ⚙️ INSTALACIÓN DE MX LINUX

Inicia el instalador y configura:

## Particiones

* Reutilizar Partición EFI (FAT32, ~100MB) → **ESP**
* Partición ext4 → **/** (raíz)
* **SWAP**: si quieres hibernar, conviene dejar una swap de tamaño similar o mayor que la RAM. En este tutorial, como la laptop tenía 4 GB de RAM, se dejé 8 GB de swap.

**Nota:** Si alguien tiene 32 GB de RAM no debe de pensar ue necesita 64 GB de swap, puede ponerle 33 GB y funcionará.


⚠️ **Nota:** No formatear la partición EFI porque la vamos a reutilizar

Me queda así:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5IAmsRapDzpNGIdxQxD8jtz2lNnaGtiozwJBWTAZ3DH9mVgYr1kPDU0mVVNqS_I6Pmq-UnUwJVuQMOraGWp3__CsaPCvhI2CNi7CYbe8XlxU8OMtbugqFM5aD18PUvfjOOux-sM6gH9_8DJ5-hUPUzu9ZM3NUkLWOQ8VrSG4rdm7tDFs-oDChPX-J6lQ/s16000-rw/Así%20deben%20quedar%20configuradas%20las%20particiones.png =640x)

|         Device         |   Size   | Use For  |  Label  | Encrypt | Format | Check |
| ---------------------- | -------- | -------- | ------- | ------- | ------ | ----- |
| sda                    | 931.5 GB |          |         |         | GPT    |       |
| ├─ sda1                | 100.0 MB | **ESP**  |         |         | FAT32  |       |
| ├─ sda2                | 16.0 MB  |          |         |         |        |       |
| ├─ sda3                | 564.5 GB |          |         |         | ntfs   |       |
| ├─ sda5                | 358.3 GB | **/**    | mxlinux |         | ext4   |       |
| ├─ sda6                | 8.1 GB   | **swap** | swap    |         | swap   |       |
| └─ sda4                | 569.0 MB |          |         |         | ntfs   |       |
| sdb                    | 14.3 GB  |          |         |         | DOS    |       |
| ├─ sdb1                | 14.3 GB  |          | Ventoy  | 🔒      | exfat  |       |
| └─ sdb2                | 32.0 MB  |          | VTOYEFI |         | FAT16  |       |
| Dispositivos virtuales |          |          |         |         |        |       |
| ├─ sdc1                | 14.3 GB  |          |         |         |        |       |
| └─ ventoy              | 2.2 GB   |          |         |         |        |       |

Estando configurado así, ahora si ya podemos continuar con la instalación

---

## GRUB

Se instalará automáticamente en:

```
/dev/sda
```

---

# ⚠️ MENSAJE IMPORTANTE DURANTE LA INSTALACIÓN

Si ves un mensaje como:

> “Este equipo usa EFI…”

revisa estas dos cosas:

* Que hayas arrancado el pendrive en modo **UEFI** y no en modo Legacy
* Que estés reutilizando la partición EFI de Windows como **ESP** en el Instalador

En mi caso la partición EFI era **sda1**, pero en otros equipos puede tener otro nombre, por ejemplo **sda2** o similar. Lo importante no es el número de la partición, sino identificar la partición **FAT32** marcada como **EFI/ESP** y reutilizarla como **ESP**, sin formatearla.

---

# ✅ RESULTADO FINAL

Después de instalar y reiniciar:

Aparecerá el menú GRUB con:

```
MX Linux
Advanced options
Windows Boot Manager
```

Podrás elegir entre:

* MX Linux
* Windows 10

---

# ⚠️ RECOMENDACIÓN IMPORTANTE DESACTIVA FAST STARTUP

En Windows 10 conviene desactivar **Inicio rápido (Fast Startup)** antes o después de instalar MX Linux en dual boot.

## ¿Por qué hay que desactivarlo?

Porque Windows, cuando tiene activado Inicio rápido, no se apaga por completo. En lugar de cerrar totalmente el sistema, deja el disco en un estado parecido a una hibernación parcial.

Esto puede provocar en Linux problemas como:

* La partición de Windows aparece bloqueada o en estado no seguro
* Linux solo puede montar la partición NTFS en modo lectura
* Errores al intentar copiar o modificar archivos en la partición de Windows
* Riesgo de corrupción de datos si se fuerza el montaje de la partición
* Problemas en el arranque compartido entre Windows y Linux

En pocas palabras: Windows no “suelta” completamente el disco, y Linux lo detecta como algo peligroso.

## Cómo desactivarlo en Windows 10

1. Presiona `Win + R`
2. Escribe `control` y pulsa Enter
3. Ve a **Hardware y sonido**
4. Entra en **Opciones de energía**
5. Da clic en **Elegir el comportamiento de los botones de inicio/apagado**
6. Da clic en **Cambiar la configuración actualmente no disponible**
7. Busca la opción **Activar inicio rápido (recomendado)**
8. Desmárcala
9. Guarda los cambios

## Recomendación adicional

Después de desactivar **Fast Startup**, apaga Windows normalmente usando **Apagar**, no solo **Reiniciar**, para que el cambio se aplique correctamente.

## Nota importante

Si en Linux alguna vez intentas abrir la partición de Windows y aparece un aviso indicando que la partición NTFS está en un estado no seguro, casi siempre se debe a que Windows no se apagó completamente o todavía tiene activado Fast Startup.

# 🎯 CONCLUSIÓN

Con este procedimiento puedes:

* Mantener Windows
* Instalar MX Linux
* Aprender Linux sin riesgos

Este método funciona en la mayoría de equipos modernos con:

* UEFI
* GPT

---

# 💬 ¿Te fue útil?

Si este tutorial te ayudó:

* Compártelo
* Déjame un comentario
* Apoya el software libre

---






