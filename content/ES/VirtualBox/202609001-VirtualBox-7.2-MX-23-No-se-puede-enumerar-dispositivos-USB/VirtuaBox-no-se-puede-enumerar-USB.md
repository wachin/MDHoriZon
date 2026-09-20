

# VirtualBox 7.2 error sobre MX Linux 23 (Debian 12) No se puede enumerar dispositivos USB

Cuando instalé VirtualBox 7.2 en MX Linux 23 (basado en Debian 12), me encontré con un mensaje bastante extraño al abrir la configuración USB de una máquina virtual:

> No se puede enumerar dispositivos USB.

Aunque ya había instalado correctamente el paquete de extensión de Oracle (Oracle VirtualBox Extension Pack), VirtualBox seguía mostrando el error y no permitía acceder correctamente a los dispositivos USB conectados al equipo.

En este artículo explico cuál era el problema y cómo solucionarlo.

## El entorno utilizado

* MX Linux 23 (base Debian 12)
* VirtualBox 7.2.8 descargado desde Oracle
* Oracle VirtualBox Extension Pack 7.2.8

## Verificando el Extension Pack

Lo primero fue comprobar que el paquete de extensión estuviera instalado correctamente:

```bash
VBoxManage list extpacks
```

La salida mostraba:

```text
Extension Packs: 1
Pack no. 0: Oracle VirtualBox Extension Pack
Version: 7.2.8
Usable: true
```

Por lo tanto, el Extension Pack no era el problema.

## El verdadero problema

Al revisar los grupos a los que pertenecía mi usuario, ejecuté:

```bash
groups
```

La salida era similar a:

```text
wachin lp dialout cdrom floppy sudo audio dip video plugdev users kvm netdev lpadmin vboxsf scanner libvirt sambashare
```

Observa que no aparecía el grupo:

```text
vboxusers
```

Ese grupo es fundamental para que VirtualBox pueda acceder a los dispositivos USB del sistema anfitrión.

## La solución

Agregar el usuario actual al grupo `vboxusers`:

```bash
sudo usermod -aG vboxusers $USER
```

Luego comprobé que el usuario había sido añadido correctamente:

```bash
getent group vboxusers
```

Resultado:

```text
vboxusers:x:129:wachin
```

##  Reiniciar

Después de agregar el usuario al grupo, es obligatorio reiniciar el sistema operativo.

Yo reinicié MX Linux.

Al volver a iniciar sesión, VirtualBox dejó de mostrar el mensaje:

> No se puede enumerar dispositivos USB.

Y la configuración USB de las máquinas virtuales volvió a funcionar normalmente.

---

## Nota para usuarios que vienen de Windows

En Windows normalmente basta con instalar VirtualBox y el Extension Pack para que el soporte USB funcione.

En Linux el modelo de permisos es diferente. Aunque el programa esté instalado correctamente, el usuario necesita pertenecer al grupo `vboxusers` para que VirtualBox pueda acceder al hardware USB.

Por eso es frecuente encontrarse con este error después de una instalación nueva de VirtualBox en Debian, MX Linux, Ubuntu y otras distribuciones derivadas (Linux es más seguro que Windows)


