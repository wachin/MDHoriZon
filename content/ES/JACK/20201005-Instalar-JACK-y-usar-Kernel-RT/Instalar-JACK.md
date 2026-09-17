# Cómo instalar y usar Jack Audio Connection Kit JACK + Ardour y sus plugins con un Kernel Tiempo Real en MX Linux, Debian



**Actualización Mayo 2026.** Este tutorial funciona para Linux que usen tanto PipeWire como Pulseaudio

# Este tutorial es para Linux que usen PulseAudio o Pipewire

Antes de continuar les digo que para mi un Kernel es como las llantas de un auto, uno las puede cambiar por otras las cuales pueden tener otro labrado que pueda servir mejor para tal o cual terreno, pero primero hay que apagar el auto y luego hacer el cambio. Así mismo es con el Kernel, el que vamos a usar ha sido creado para un propósito especial, para Audio, y para cambiarlo debemos de instalarlo y luego reiniciar el ordenador y elegirlo en el Grub para iniciar sesión con el

# ¿Por qué hice este tutorial?

* Porque cada vez escasea más software para 32 bits. Ejemplo [AV Linux](https://www.bandshed.net/) ya no tiene una versión de 32 bits como antes la tenía en el 2022 (UbuntuStudio dejó hace años de tenerla).
* Porque si ustedes usen un Linux en particular y no quieran usar [AV Linux](https://www.bandshed.net/) o [Ubuntu Studio](https://ubuntustudio.org/) (los cuales tienen instalado y configurado JACK listo para usar) podrán aprender aquí cómo configurar su Sistema Operativo Linux para que funcione igual.
* Porque puede que ustedes quieran usar el ordenador para grabar desde el micrófono y que se grabe al mismo tiempo una pista de Karaoke que esté sonando y que esto se escuche al mismo tiempo por los parlantes; esto se puede hacer ejemplo con Ardour y se llama Stereo Mix (en Windows hay algo parecido que se puede hacer con [Virtual Audio Cable](https://vb-audio.com/Cable/)) pero esto solo se logra sin ruidos molestosos con el Kernel de AV Linux que hizo Trulan (explicado en este tutorial).
* Porque puede que Ud. quiera usar bajas latencias para algún programa de Audio.
* Para editar audio con Audacity y que no haya un retardo mientras uno le da Play a alguna parte en específico de la onda de la pista de audio y lo que se oye por los parlantes (se puede instalar y usar el Kernel Real Time que vienen en los repositorios de Debian, o el de AV Linux).
* Porque puede que envien algún Kernel nuevo en el que hayan quitado alguna caracteristica, ejemplo en el Kernel 6 no puedo ponerle [75 Hz de Frecuencia de Actualización al monitor](https://facilitarelsoftwarelibre.blogspot.com/search/label/75%20Hz) de esa laptop

# Qué es la baja latencia en el Kernel?

Para usar en un sistema operativo bajas latencias lo puedo explicar con mis palabras, significa haya un retardo mínimo casi imperceptible ejemplo en el audio que se transmite desde un micrófono hasta los parlantes de un ordenador u otro dispositivo conectado, para esto necesitamos usar un Kernel especial llamado Kernel Realtime, en contraste en AV Linux o UbuntuStudio ya viene todo configurado, y esas mismas configuraciones las vamos a aprender a usar. Este tutorial es para Sistemas basados en Debian, pero tal vez lo podrían adaptar para otro Linux.

## Probado en

Este tutorial ha sido testeado en:

- MX Linux 19 de 64 y 32 bit (PulseAudio)
- antiX 19 de 64 y 32 bit (PulseAudio)
- MX Linux 21 de 64 y 32 bit (PulseAudio)
- Debian 12 Netinstall CD con LXQT (este por defecto usa PulseAudio, no usa PipeWire), de 64 y 32 bit
- MX Linux 23 (Pipewire)

## ¿Cómo instalaremos la baja latencia?

Aquí dejo unas opciones, escojan según necesiten

### 1ra Opción: Instalando el Kernel en Tiempo Real (Real Time) de los repositorios de Debian

En Debian hay unos paquetes de Kernel llamados **rt** (Realtime = Tiempo Real), un Kernel consta generalmente de dos partes, están en los repositorios de la Distro pero si desean los pueden buscar así:

[https://packages.debian.org/linux-headers-rt](https://packages.debian.org/linux-headers-rt)

[https://packages.debian.org/linux-image-rt](https://packages.debian.org/linux-image-rt)

los he probado y me funciona bien con **"Jack Audio Connection Kit (JACK)"** 

Las siguientes instrucciones son para un Sistema Operativo Debian 10, 11, 12 instalado desde Netinstall CD el cual no usa PipeWire sino usa PulseAudio. 

Primero es necesario recargar los repositorios:

```bash
sudo apt-get update
```

luego instalar las actualizaciones:

```bash
sudo apt-get upgrade
```

**Nota:** Los siguientes dos paquetes que tienen dentro del nombre: image y headers son paquetes de configuración que instalan automáticamente el último Kernel RT que esté disponible

#### Instalar Kernel Realtime para 32 bits desde Debian repositorios

Si su ordenador usa 32 bits, poner en la terminal:

```bash
sudo apt-get install dkms linux-image-rt-686-pae linux-headers-rt-686-pae
```

puede investigar sobre ellos también en linea en los paquetes de debian:

[https://packages.debian.org/linux-image-rt-686-pae](https://packages.debian.org/linux-image-rt-686-pae)

[https://packages.debian.org/linux-headers-rt-686-pae](https://packages.debian.org/linux-headers-rt-686-pae)

**Para desinstalar los paquetes actualizadores automáticos del kernel RT**

Estos paquetes sirven para que cuando envien una nueva actualización del Kernel para que cuando usted aplique todas las actualizaciones del sistema se instale automáticamente la ultima versión del Kernel y además que esté disponible en primer orden en el Grub, para desinstalar (no se preocupe no se desinstalaran los Kernel RT):

```bash
sudo apt-get remove linux-image-rt-686-pae linux-headers-rt-686-pae
```

#### Instalar Kernel Realtime para 64 bits desde Debian repo

Si su ordenador usa 64 bits, poner en la terminal:

```bash
sudo apt-get install dkms linux-image-rt-amd64 linux-headers-rt-amd64
```

puede ver información de esos paquetes aquí:

[https://packages.debian.org/linux-image-rt-amd64](https://packages.debian.org/linux-image-rt-amd64)

[https://packages.debian.org/linux-headers-rt-amd64](https://packages.debian.org/linux-headers-rt-amd64)

**Para desinstalar**
Ponga en la terminal:

```bash
sudo apt-get remove linux-image-rt-amd64 linux-headers-rt-amd64
```

recuerde que esto no hace que los Kernel que usted tenía instalados se desinstalen.

#### Instalando los paquetes del Kernel Real Time desde Synaptic

También si desea puede buscarlos uno por uno en Synaptic (a veces se demoran en aparecer). Las siguientes capturas de pantalla son de MX Linux 21 de 32 bit:

linux-image-rt-686-pae

![20240314-184220 linux-image-rt-686-pae en MX Linux 21.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBEtuKDvz8cDOWAo72jauFTmT0ji5FxLJyVzGl8Uzd43Zb1FWDqgm1l0xszQ1v51jy4dGIQ9eKOQLGY-ozlmQmfVc0-Ad_xZv5yb_szBlFrAloH9VZ1K0blzSZbm4GfbF-eULfkS7mojxEA5B8GF0EJLTmKhEbElI9ACvjPshQKClBbzR4_6ET9FAr2Rk/s16000/20240314-184220%20linux-image-rt-686-pae%20en%20MX%20Linux%2021.png)

luego:

linux-headers-rt-686-pae

![20240314-184406 linux-headers-rt-686-pae en MX Linux 21.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEicJ7faXuU_MI0fBRbKhNrGOitN9oNNo6xqyAo2xfGBcjWaxvVq2QASPU4KFS2i-0csUsEPAaaZUiG_6t5Q_qjmz0RXDfr_C8_GGPohA305m_9zefYfy8D3fa6RLc_0KAnxbojgswh4pEmpqGhcVsOHWSsNW-FWfFYcekeDSoZgKXAL9jkM1Mfz2pL4x1U/s16000/20240314-184406%20linux-headers-rt-686-pae%20en%20MX%20Linux%2021.png)

y:

dkms

![20240314-184517 dkms.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMgHvBRGsPWDcUmcFRZHVsQ6iS1yanZazJ2qpVdcPD5rUK3elWsu6QLTubvoOEtwoyEyAfK20LkmQCajO9iiAOeZY_3qQZn6KgpMTZROstKMH9fcM_D1q0V-NFX2O6QraOs2mvTie1lWeXQv51Sy5fr_dsLAfqOsL_D89gw2RWvj3-1pVpPE7ThbSPvfQ/s16000/20240314-184517%20dkms.png)

la siguiente captura de pantalla es en synaptic viendo cómo se instala el Kernel Real Time en MX Linux 21:

![20240314-193755 en synaptic viendo cómo se instala el Kernel Real Time en MX Linux 21.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrD6i4_WCB4tdHzrf_pjy4Es3NLMMeKx2a-mBvzV3IbFytbw7ud1imSm_ty3LCS4eLwwmEFAqHGZBMMEVQZyZ0_chZ1aZjBtbt3uh2Wb1IyiFrtDOgwF9X0ffprcsX0kiVIbSgmxafVwYOlmzC-tOMqmf__HlcKiMeJss_QSzTeSF1kfsks4U7pPdew64/s16000/20240314-193755%20en%20synaptic%20viendo%20c%C3%B3mo%20se%20instala%20el%20Kernel%20Real%20Time%20en%20MX%20Linux%2021.png)

Se demora bastantito.

### 2da opción - Compilar usted mismo el Kernel Real Time (Opcional, muy opcional)

Esto podría ser útil si usted tenga un ordenador de bajos recursos (un ordenador viejo) al que le quiera poner un Kernel que no tiene tantos drivers modernos incluidos, o sea un Kernel más liviano (más viejo), además de que con los Kernel modernos puede que algo de su hardware no funcione, ejemplo el lector de tarjestas SD u otro lo cual sí debería funcionar con un Kernel viejo, vea:

[https://facilitarelsoftwarelibre.blogspot.com/search/label/Compilar%20Kernel%20Real%20Time](https://facilitarelsoftwarelibre.blogspot.com/search/label/Compilar%20Kernel%20Real%20Time)

También podría querer compilar usted mismo el Kernel para personalizarlo, ejemplo yo generalmente le desabilito los módulos la máquina virtual Guest y Host ya que no voy a usar el Sistema en ninguno de los dos casos 

---

## Instalar los paquetes para usar Jack Audio Connection Kit (JACK)

Ahora si, después de ya instalado un Kernel RT, la siguiente lista de paquetes que debemos de instalar es para una Distro basada en Debian (no se si todos funcionarán en alguna Distro basada en Ubuntu pero pueden probar). 

Los siguientes son los paquetes más usuales para usar con JACK, Ud. copie de una sola vez las siguientes tres lineas y póngalas en la terminal:

---

## 📄 Archivo original

```bash
sudo apt install ardour pulseaudio-module-jack qjackctl mediainfo-gui \
     calf-plugins amb-plugins tap-plugins fluid-soundfont-gm \
     dssi-host-jack dssi-utils pavucontrol a2jmidid qsynth vmpk \
     jack-keyboard jack-tools meterbridge jackd2-firewire git muse
```

De ENTER y siga los pasos:

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAx2XImgsP-2o_IG360b75L_oT6sKqPsmtUISYFW_iHs5GDuhLQ1NgXs9w9D4OB1MeOeXanhpwb4Zbd53URaiXjjLVlho47Fo6zCBlorz0psij4qX7X87r4qEV_4HR5YKAUJXDtp8CN2I/s16000/20210317-011624.png)

**Nota:** Usen un editor de texto que les guste, aquí verán a Gedit algunas veces.

---

### Configuración de jackd2

durante la instalación aparecen una ventana que dice:

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiv6AMTOXSTN309WXMMTL0nkHvfy2hX_rtaY544OwhFJIIOQqdWIlJLg1Sdh9bsMdwAcTDOwb2cN95deBSVTF66KiZ_i8fT9SI_z3z6IZdwHQsBhx0Yd8_yxAdPuTCOMhDgDfCA12sLChs/s640/Selecci%25C3%25B3n_006.png)

```
Configuración de jackd2

Si quiere ejecutar jackd con prioridades en tiempo real, el usuario que
ejecute jackd necesita tener permisos para dicha prioridad. Acepte esta
opción para crear el archivo /etc/security/limits.d/audio.conf, para
permitir la prioridad en tiempo real y los privilegios de <memlock> al
grupo audio.

Ejecutar jackd con la prioridad en tiempo real reduce la latencia, pero
puede llevar a un bloqueo completo del sistema al pedir toda la memoria
física disponible del sistema, lo que es inaceptable en entornos
multiusuario.

¿Desea habilitar la prioridad en tiempo real del proceso?

<Sí>    <No>
```

póngale que sí (use las flechas del teclado para llegar allí y luego de ENTER)

también aparecerá la siguiente ventana que le pregunta:

"¿Desea habilitar la prioridad en tiempo real del proceso?"

dar clic en "**Next**"

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJ2dFyOPPmbWqluBHOpXthHa9JJ_Pte7RNTSu3WvyTAup22AuelZbP3_-mGaj6rUk24VBq2wBXR6G74awUypXpSxJMPmOuRaO1-VArGedOkEZgDCnG5DTVVB8WN1d71ttD1apLwSH2Vhk-fjmEQaP0kdyEcLptfjwkYiXD6Bs2wifls25hlPSZn79HCII/s16000/20240311-093947%20marcar%20habilitar%20la%20prioridad%20en%20tiempo%20real.png)

Ahora bien, si por un caso se confundió y aplastó ENTER en "No" o no Marcó la instrucción y no se configuró el sistema con RealTime pues vuelva a intentarlo, para eso ponga en la terminal este comando:

```bash
sudo dpkg-reconfigure -p high jackd2
```

y allí si confírmelo.

---

**Nota:** Antes aquí yo tenía una sección donde explicaba cómo hacer una verificación del grupo de audio cuando se instala el Kernel en Tiempo Real, pero la he quitado debido a que en los Sistemas Operativos Linux eso ya viene configurado al hacer la instalación, pero lo he dejado como consulta [aquí](https://facilitarelsoftwarelibre.blogspot.com/2024/03/verificando-el-grupo-audio-en-el-kernel-real-time.html).

---

Y es necesario **Reiniciar** y debe elegir el Kernel Real Time desde el Grub

## Cómo escoger el Kernel Real Time (RT) en el GRUB

Después de instalar el kernel de tiempo real, debemos seleccionarlo manualmente desde el menú de arranque (**GRUB**)

### Paso 1: Reiniciar el sistema

Reinicia tu computadora

### Paso 2: Entrar en “Opciones avanzadas”

En el menú de GRUB verás algo como:

```
MX Linux
Opciones avanzadas para MX Linux
```

Selecciona:

👉 **Opciones avanzadas para MX Linux**

y presiona `Enter`.

---

### Paso 3: Elegir el Kernel Real Time

Ahora verás una lista de kernels instalados, algo como:

```
MX Linux, con Linux 6.x.x-rt-amd64
MX Linux, con Linux 6.x.x-rt-amd64 (Systemd)
MX Linux, con Linux 6.x.x-amd64 
MX Linux, con Linux 6.x.x-amd64 (Systemd)
```

Aquí debes elegir:

👉 **El que tenga `-rt-amd64`**

Ejemplo:

```
MX Linux, con Linux 6.1.0-rt-amd64
```

Ese es el **Kernel Real Time (RT)**.

### Paso 4: Verificar que estás usando el kernel RT

Una vez iniciado el sistema, abre una terminal y ejecuta:

```bash
uname -r
```

Si todo está correcto, verás algo como:

```
6.x.x-rt-amd64
```

### Nota para audio (muy importante)

El kernel RT permite:

* Menor latencia en JACK
* Mejor rendimiento en tiempo real (audio profesional)
* Menos cortes (xruns)

Pero también puede ser más sensible, así que siempre prueba bien antes de usarlo en producción.

**VIDEO:**
El siguiente es un video que hice de cómo elegí en el Grub al Kernel RT al reiniciar el ordenador:

<iframe width="560" height="315" 
src="https://www.youtube.com/embed/kN_jFjBW21U" 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
allowfullscreen>
</iframe>

**Nota**: Si por un caso no se vea sincronizado el audio con el video mejor abran el video aparte en Youtube mismo.

---

## Cómo identificar tu hardware para optimizar JACK (Opcional)

Cuando trabajamos con **audio en tiempo real (JACK + Kernel RT)**, conocer exactamente el hardware que estamos usando es clave para:

* Reducir la latencia
* Evitar cortes de audio (xruns)
* Detectar problemas de compatibilidad
* Lograr un sistema más estable

## 1. Identificar la placa base (Motherboard)

Ejecuta en la terminal:

```bash
sudo dmidecode -t 2
```

**Nota**: Este comando, lee información del BIOS/UEFI, No siempre muestra todos los detalles, pero es muy útil para diagnóstico inicial.

Ejemplo de salida:

```
Base Board Information
    Manufacturer: Dell Inc.
    Product Name: 0GRMXT
```

👉 Esto te permite:

* Saber el modelo exacto de tu placa
* Buscar problemas conocidos en Linux
* Investigar compatibilidad con audio profesional

💡 Puedes buscar en Internet algo como:

```
Dell 0GRMXT linux jack audio latency
```

## 2. Ver información general del sistema

```bash
sudo dmidecode -t system
```

Esto te muestra:

* Fabricante del equipo
* Modelo del portátil o PC
* Número de serie

## 3. Ver el procesador (CPU)

```bash
sudo dmidecode -t processor
```

👉 Importante para JACK porque:

* CPUs más rápidas → menor latencia
* Algunos procesadores manejan mejor el tiempo real

## 4. Ver la memoria RAM

```bash
sudo dmidecode -t memory
```

👉 Útil para saber:

* Cuánta RAM tienes
* Tipo de memoria
* Posibles ampliaciones

💡 JACK + Ardour + plugins pueden consumir bastante RAM.

## 5. ¿Por qué esto es importante para JACK?

No todos los equipos funcionan igual con audio en tiempo real.
Con esta información puedes:

### Investigar problemas específicos

Ejemplo:

```
Dell Inspiron 1750 jack xruns linux
```

### Detectar cuellos de botella

* CPU lenta → más latencia
* Poca RAM → fallos en plugins
* Chipset problemático → cortes de audio

### Optimizar mejor tu sistema

Conociendo tu hardware puedes:

* Ajustar mejor el buffer en JACK
* Decidir si usar un Sistema Operativo Linux más ligero
* Decidir si necesitas mejorar tu equipo

---

# Verificar "real-time priority" y "memlock"

```bash
ulimit -r -l
```

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRJpI8lYirYaI6J-CitSV472G2xD8o1A1qefJZarWhtcHbOevxPjK_r98nqnBgb147oX5J3zps-p9EXGZ4NUbwni8wwnDjtjU_TnQsE62FxMjRxlQG4GZAPzTqFpp19xN73hY8hbowFHg/s16000/20201005-122447.png)

---

## Checkeando la configuración de Audio en Tiempo Real

Programa:

[https://github.com/raboof/realtimeconfigquickscan](https://github.com/raboof/realtimeconfigquickscan)

Instalar dependencia:

```bash
sudo apt install perl-tk
```

Comandos:

```bash
git clone https://github.com/wachin/realtimeconfigquickscan
cd realtimeconfigquickscan
perl ./QuickScan.pl
```

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7gdq2ikbJHrfa0dJIPxCQXDIUS79EJrL9xLJKrlNqUleK6TkBR11hFVfcCWnV_M30IZCH132_PL9ikBo-M_4EFzYs-3M_qhg1ek4mdl38BLMykQIcN6b7b4yrHjx2xY7wNhj1uK28xms/s16000/2da+parte%252C+checkeada.png)

```
cd realtimeconfigquickscan
perl ./QuickScan.pl
```

![20210928-081857.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLSwr35OOeKP7jHv8f9uWgFtnN04P6JPBLROcL3xGsinbxg-TkzaTJmexZutAL58zTPdd6JdXucgUMsuXYIahwEJv-6snOho2yIpnhO7FsM_RTwgOB1KSUFRqPiAFJxbT8i2nnzhLuWG8/s16000/20210928-081857.png)

o también pueden usar un lanzador que he creado para abrirlo con facilidad (está allí mismo, es lo único que he añadido al fork que hice de raboof), en Dolphin funciona:

![Lanzador QuickScan](https://blogger.googleusercontent.com/img/a/AVvXsEiJhqj8pjt-DYRN6BlD_GTABISTI6YzJvD_IryKm-8vSbTr7LRzwHKQEc05ujPYocEQiytwihBy-l0mEUmelbFywkNdXeoEShCzf4i_G2xAlXv9z5RQhLJZ5eBuGdMW0lITsjwYtlTPsFHdsKM7DcknQr-fH2wcpyOKnBzccmJVlQbftF6IacVFZb6l=s16000)

en Thunar deberán añadir primero el poder abrir los archivos .sh con bash eso se hace con clic derecho.

### Verificaciones por realizar

Veo que me faltaban estos tres:

checking cpu governors
checking swappiness
checking sysctl inotify max_user_watches

porque dice allí: "**not good**"

**Nota:** Si en algún Kernel les aparece: "Checking the ability to priorize processes with chrt" esto después de configurar lo siguiente desaparece cuando uno ha reiniciado el ordenador.

## Checking cpu governor

Aquí les pondré una parte de una lectura:

**System configuration [Linux-Sound]**
[https://wiki.linuxaudio.org/wiki/system_configuration](https://wiki.linuxaudio.org/wiki/system_configuration)

![System configuration Linux Sound](https://blogger.googleusercontent.com/img/a/AVvXsEhM3RkaWa-JiYpcgGzjjKEWboNlXEgqAt_gp50nB85FR6FGjMMISHC5ywmroOroGhX2MFiAhm9c7xwtIfvI0cu_TkZW6L5-41iWSRVnJx0MoIH446C_sjjAVcZslOa2edv_cdTmjtWzpovxPqounNuNgBTqtx5UrJJegRM9Gw-bgDMqFfM4wIxOY1Nz=s16000)

Traducción posible:

> Si su CPU admite el escalado de frecuencia y el gobernador de escalado de frecuencia de la CPU está configurado a demanda (que es el valor predeterminado en muchas distribuciones), podría encontrarse con xruns. El gobernador bajo demanda escala la frecuencia de acuerdo con la carga de la CPU, cuanto mayor sea la carga, mayor será la frecuencia. Pero esto está sucediendo independientemente de la carga de DSP en su sistema, por lo que podría suceder que la carga de DSP aumente repentinamente, por ejemplo, exigiendo más potencia de CPU, y que el daemon de escala se active demasiado tarde, lo que resultará en xruns porque la carga de DSP alcanza su máximo. Una solución sería usar un daemon de escalado de frecuencia de CPU que escala la frecuencia de acuerdo con la carga de DSP en su sistema como jackfreqd o simplemente deshabilitar el escalado de frecuencia de CPU por completo. Esto último se puede lograr configurando el regulador de escala en rendimiento.

esto quiere decir que como la CPU está configurada por defecto a demanda tendrá un bajo consumo de energía y creará eventos de latencia larga que producirán xruns (ruidos), para evitar esto hay establecer la CPU en configuración performance (rendimiento), le dejo dos opciones posibles, debe leer ambas para entender todo:

### Cambiar cpu governor desde la configuración del sistema a performance y dejar el cambio permanente

Haremos uso de una aplicación que viene instalada por defecto en MX Linux y que me supongo que en otros Linux también, se llama: [cpufrequtils](https://askubuntu.com/a/1406529/145772) y se puede ver en Synaptic instalada:

![20240314-105920 verificando cpufrequtils en synaptic.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKn3xOQO3-hG8QCdfavYhFp88k0yKO5PRUa0B6LcrxtNglJRNUnmnCLl4PVYDG5PtFCWeHrItW5K4K5tVpIb6wGPKvAa0AMNYPl_SOVzgKEP6_OYiJahbMYLvpzqbQUs0AHtWbbCMW7hKWJsz8M3noLwCbjxlrDU82QnyMHEYfZrRPzi1I8_dI8yLEq_4/s16000/20240314-105920%20verificando%20cpufrequtils%20en%20synaptic.png)

En caso de que no esté intalado instálelo desde Synaptic o desde la terminal:

```bash
sudo apt install linux-cpupower cpufrequtils
```

Ahora debo editar el archivo de configuración, para hacer esto usaré Gedit (usted puede usar otro, o también nano si su Sistema Linux no les dejara usar el editor de Texto al elevar los privilegios -pero nano es dificil de usar- deberá cambiarlo allí), pongo en la terminal:

```bash
sudo gedit /etc/init.d/cpufrequtils
```

con nano

```bash
sudo nano /etc/init.d/cpufrequtils
```

Si no sabe usar nano vea [este tutorial](https://facilitarelsoftwarelibre.blogspot.com/2024/08/como-usar-nano-en-linux.html).

es una aplicación que sirve para configurar el desempeño del procesador de su ordenador, y debo de cambiar en:

`GOVERNOR="ondemand"`

![20240314-105536 cambiar la configuración de cpufreq.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKAx0SapgyFCVH_wYGUa02sVcA79TolHKPDOMgQ2KVacO0XN0jekXPhi6x1HfEIIiiTCB5AsASs6AuV1Oi2uT_6Zew7_k73NqA0Ptfr-Lzb2JnruQeefh0s7geTU5QgVN2ka_wywek2wBgYgRkvLaIfoB7-9UbjYD9eRSnSr-fnpiYel-aAyv7anxx2hY/s16000/20240314-105536%20cambiar%20la%20configuraci%C3%B3n%20de%20cpufreq.png)

por:

```
GOVERNOR="performance"
```

así:

![20240314-110321 poniendo performance en cpufreq.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGASUIoIpjdii9aqnbc98y69v9wP-FoK1_LNT03idVQuLORmtnzKE2Xo4LR3r3W8RCrVnB9kkmihom3gvigUZajhRSVV7eeUrv6lyMrJRR2QEvuKqLcpxkt9Y2dPMt-fvPSEXyBn4EXfvHjPo1KOnoTxHh3mDyyasonOFw1nkgBu2wBJRkyEIvOZ1SVPU/s16000/20240314-110321%20poniendo%20performance%20en%20cpufreq.png)

guardar y cerrar

Reiniciar aquí si quiere ver los cambios ya o sino reiniciar después

### Cambiar cpu governor con cpupower-gui (OPCIONAL, no queda permanente el cambio)

Si ustedes por ejemplo usen una laptop y quieran usarla y ahorrar batería seía bueno que no usen el método de arriba sino que lo dejen como está y que instalen esta aplicación la cual es una interfaz gráfica, y se puede elegir cualquier modo del gobernador del cpu, pero no queda guardado el cambio. 

Podemos usar cpupower-gui, revisemos su disponibilidad en:

[https://packages.debian.org/cpupower-gui](https://packages.debian.org/cpupower-gui)

a la fecha 23 de Mayo de 2025 que reviso, la veo en Debian 11 bullseye, y no la veo en Debian 12 bookworm, pero si la veo en testing y unstable. 

También se la puede descargar e instalar desde:

[https://github.com/vagnum08/cpupower-gui](https://github.com/vagnum08/cpupower-gui)

Nota: Pueden subir el .deb a virustotal.como para su tranquilidad.

en Debian 13 ya está disponible.

Para instalar:

```bash
sudo apt install cpupower-gui
```

Este paquete no está disponible en Debian 12 bookwork pero si ven en:

[https://packages.debian.org/cpupower-gui](https://packages.debian.org/cpupower-gui)

si está disponible en bullseye, trixie 

Una vez instalado busque entre sus aplicaciones a:

cpupower-gui

![cpupower-gui icono](https://blogger.googleusercontent.com/img/a/AVvXsEilZby0Jr9pO0pNsAbIdwyBzU9Y-iCjc-xjXXHIPO03T24lFu7Tk3HQcfi7QOmryXHNSylDCfC5jNbT3-z8ff5OO9wZn6B8u36EHsx9mkSCC9_B1yY7YcZ7iEzWwIIMTyK5jXRgKeoFUPSTHJycIJGI1GtdS88Eed4L45q3jgoqkuctm094zdtdqUz9=s16000)

abralo, y elija uno de los modos que necesite, en este caso performance:

![cpupower-gui interfaz](https://blogger.googleusercontent.com/img/a/AVvXsEjJYVAvHJQ73Qk8VE2sm-glWJjNpCxC0WxFrr0Uk2vewBxCyzhEnLbvYJ0xGX1e4F9Yld10Ig627W8RmgxAK__SlqGJkbiRdQ8ne5NRsw8d8xoWLn-5d2KOKaLceYbWKNSsDy9-NVdRMDws1UokrF4IxQs6SSBqNFwu-MSI13EjHg0GnzSxxgDmT4JV=s16000)

**Performance** signfica que su procesador estará trabajando en su maxima capacidad, y lo unico que si usted usa esta configuración en una laptop en la cual use la batería esto hará que se descague más rápido de lo normal

Les cuento que en mi ordenador de escritorio yo he usado el primer método y he dejado permanentemente al cpu en modo performance. 

Por defecto el Gobernador de la CPU está en:

Ondemand 

Por todo se pueden manejar los siguientes perfiles: 

powersave
conservative
userspace
ondemand
performance
schedutil

Con esta herramienta cpupower-gui tendremos una herramienta como la que venía en AV Linux 2021:

[https://download.linuxaudio.org/avlinux/AVL-MXE/](https://download.linuxaudio.org/avlinux/AVL-MXE/)

![Set CPU Governor.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSqAl5-XQ6Dpd7rFZmxExVr_Ecv5Q_V8eClFuz4dN0Ay9eNWhtg65tWgGQnvfdL5z6hUJ1rYphFK-0xBrvBEGjQJvemV5vfU8IHpeQaR2eMTM1tZxEjutDCHd9E_VTkcxWguUxxQZZWUk/s16000/Set+CPU+Governor.png)

también les pido que lean la siguiente traducción pues importante saber lo siguiente cuando usemos performance, tomado de:

**How to get low latency audio**
[http://fernandoquiros.com/articles/131123-compile-linux-realtime-kernel/](http://fernandoquiros.com/articles/131123-compile-linux-realtime-kernel/)

cuya traducción vendría a ser:

> . . . importante es ajustar Linux para evitar el escalado de la CPU porque cuando la CPU tiene un bajo consumo de energía, crea eventos de latencia larga que producirán xruns. Una opción es cambiar el gobernador del sistema a "performance". El procesador funcionará a máxima velocidad todo el tiempo y no se interrumpirán los procesos en tiempo real. La computadora se calentará más de lo normal, así que trate de mantenerla ventilada. Puede cambiar el "gobernador" usando "cpufrequtils".

Entonces según esta enseñanza, cuando usemos el ordenador o laptop en performance debemos cuidar de que esté bien ventilado para que no se caliente mucho

### Cambiar checking swappiness

Ahora debemos configurar el ordenador para evitar que en algún momento use la memoria swap, es decir que siempre use la memoria RAM y núnca use la SWAP, esto es porque si se usara la SWAP esta es más lenta y hará que la velocidad se reduzca y creará que se creen xruns o ruidos en JACK. Si usted tiene curiosidad usted leer sobre cómo ajustar la memoria virutal [aquí](https://ubunlog.com/swappiness-como-ajustar-el-uso-de-la-memoria-virtual/).

Para ver qué valor de swappiness tiene por defecto su Sistema Operativo ponga en una terminal:

```bash
cat /proc/sys/vm/swappiness
```

me da 15

![20210928-092427.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj-NKd-xh-dwKz9aRq0H3J8N29kUZxxtlPH_4eDAz90qVCcwfXQfGAzfSn6ZYn406IGXvv0zXNJpPNlYZJq0vEloeN9yXIxCqx-key7obDLtEgWvmyTzsGgZtLSljHBU3yCNW1UcKL-O-o/s16000/20210928-092427.png)

para que no se use la memoria SWAP debemos hacer que tenga 10 ese valor y para ello poner en la termial, para facilitar esto con gedit:

```bash
sudo gedit /etc/sysctl.conf
```

Opcional si sabe usar nano: 

```bash
sudo nano /etc/sysctl.conf
```

allí se abrirá, y vaya hasta el final: 

![20210928-093024.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjT5Vq8NI5kZidmAS-BWFaQovhd4gfEk_o9V66m7b-2vN58uvm-Ij4FA70ymgb_2wup18K1qcE4JqJNhulszltBWT-d-qItkgNLIOaEaW6Vk9Ii2KoLjuFD8mKGhjo64vcEB_q1QVj_5GY/s16000/20210928-093024.png)

allí añada la siguiente línea:

```
vm.swappiness = 10
```

le deberá quedar así:

![20210928-093229.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXm2kMZ9_KkSeXyE-HnEMm7cYte-UFjsiY4nWhM9-fPwpSh-NxN5o6MPTPbYInHQVeGa9CeuxLSKnRxWmOyZWyj6-ras79TAJ3wyfldBkSUi3d2BSCfkpVzHg9DTWetfNQbAvKuPniTck/s16000/20210928-093229.png)

guarde y deje abierto

### Cambiar sysctl inotify max_user_watches

A continuación voy a poner la imagen de arriga de AV Linux (AVL-MXE) para que vean el valor que tiene por defecto:

![MX Tools - RT Diagnostic max_users_watches.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiY4NBBUl7ZfdyYTIPz5Vx-XhqCYLMh4jQK5d4814AZ_yd0und39Z-QHLjQEW_3jUgQj6HBABfkmz3D60rPGvazUeLHV9OIFnstFvxpAXfyX9QL0k7lJ1MeuKq0ViMB60KpZcCdCviL0kw/s16000/MX+Tools+-+RT+Diagnostic+max_users_watches.png)

Listen utiliza inotify de forma predeterminada en Linux para monitorear los directorios en busca de cambios, para saber qué valor está en nuestro ordenador debemos poner en una terminal:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

en MX Linux 21 de 32 bits me da:

8192

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGrr7lMNGLI5jwRy7aWzPrX8md_8sdBqAhsusFWFr7oQr772FNwgFGeahEqPRNmy00jUKpnAppRLuXuSh5ShoH5BLhQ0hBdeju6TRYXCj2dF0cJAQQWvMZeqZea-MRhwj2VPhmdUOdgY4/s16000/20210928-102448.png)

Está configurado por defecto un límite del sistema Linux en la cantidad de archivos que puede monitorear. Por ejemplo, el límite de notificación que vemos está establecido en 8192 en MX Linux

Para cambiar el valor en el sistema operativo y dejarlo como AV Linux a 524288 debemos poner en el archivo que dejamos abierto, al final, la siguiente línea:

```
fs.inotify.max_user_watches = 524288
```

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjPrBTLGC1JGAkPW-4tS-x29Zww2MW1O_hbEM6MMqJx21rEoz1CwWURBs6aP_1kRkToyjzE-j8UWPqMM1pXvXXt3NkRF0a3i1OawYaR_4H09ZCg36LtVsY0F_Lwf2SKSUaqnU4wQMloPQ/s16000/20210928-103641.png)

guarde y cierre

luego poner en una terminal

```bash
sudo sysctl -p
```

me devuelve:

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiohrvbAg0y-0BmSI-peD0UWoLvhwx3chwt82H7tRfwBIOIylfU5eb8P7LRhGxzZKOedDI8ZBfwMvV4KFI2_GuT7quq1T-sPSeORsaLCFagZI4ikFla-dkY2pYDMDWs6L2aXPt-0eTf1UI/s16000/20210928-104212.png)

lo cual significa que está bien.

**REINICIE EL ORDENADOR**

Si tiene curiosidad y desea leer más al respeto puede leer (usar el traductor de google):

**Increasing the amount of inotify watchers**
[https://gist.github.com/ntamvl/7c41acee650d376863fd940b99da836f](https://gist.github.com/ntamvl/7c41acee650d376863fd940b99da836f)

**Generic Kernel users: How low can you go, and under what load**
[https://forum.cockos.com/showpost.php?s=380ff3a18229522dd58c72a4e829e674&p=2464865&postcount=6](https://forum.cockos.com/showpost.php?s=380ff3a18229522dd58c72a4e829e674&p=2464865&postcount=6)

[https://forum.cockos.com/showthread.php?t=255727](https://forum.cockos.com/showthread.php?t=255727)

---

### Escaneando la configuración Real Time en mi Ordenador

Ahora si estando en la terminal en el lugar (sea cual sea) donde tengo a realtimeconfigquickscan pongo el comando y lo lanzo (o si lo tenía usted abierto sólo de clic en start):

```bash
perl ./QuickScan.pl
```

y al dar clic en start me aparece todo verde (**Recuerden** que para que sean reconocidos los cambios que hemos hemo hay que reiniciar y elegir el Kernel Real Time en las opciones Avanzadas del Grub, de lo contrario nunca aparecerán verdes las opciones que hemos configurado)

**Nota**: La siguiente captura de pantalla es en mi ordenador:

ASUSTek Computer INC. LEONITE Version: 5.00 Serial Number: MS1C6CS29109829

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0_wVK6i64A-WT155zdRWcnMn_p6sB0L9ZVjls-3BjOSzNiZ_whyphenhyphen5sqF3wjtlOsoa_qNzyiRBWyLbRvU0Re2XkJ8dWn2dgCyutR4edNGqILN0I64SIfKLf6Y_2s9qevbCfPQmaggvJWNU/s16000/20210928-122126+realtimequickscan.png)

La siguiente captura de pantalla es el chequeo del QuickScan en el Kernel 5.10.0-28-rt-686-pae de los repositorios de Debian en MX Linux 21 tomada el 14 de marzo del 2024 en el mismo ordenador que pude armar gracias a que mi primo Paco me regaló esa Mainboard:

ASUSTek Computer INC. LEONITE Version: 5.00 Serial Number: MS1C6CS29109829

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0lxkRMh_SwGNhiBfz1u0rU8wj9hhN7amdZyUocGVWOHcVkqP88pGFq0idT5ApdHqPGsK5ryjBh9HkaVTiVEyI3NmaVWa61_hEWTpCxhSp0nscBe7WwT9MV4abZz5RbSk9wfUKZoL9e4nEKDlZ9BLWjPVUdkNheDwC-WZoR4BtdiQZtGjUEc6VQGoW7fg/s16000/20240314-203949%20el%20siguiente%20es%20el%20chequeo%20del%20QuickScan%20en%20el%20Kernel%205.10.0-28-rt-686-pae.png)

está con las mismas configuraciones de arriba, no se porqué dice que está configurado sin usar la SWAP en todo caso dice que está bien.

---

### Escaneo en Debian 12 bookworm con Kernel Real Time 6

A la fecha 23 de Mayo de 2025 en Debian 12 donde instalé el Kernel RT (mencionado arriba), cuando pongo:

```bash
uname -r
```

me da:

```
6.1.0-35-rt-amd64
```

me falta:

"kernel support for tickless timer"

![Imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHK2OQnh1m4g2-WHJ_t66M-lVqt4hRvPe6bk2JugvSJeB2QFlMBhetOQs5e24Lr5RfbeMftsRCCOtkU-kZ18gw62jkuXjZ7Ato6FBf-mjUHZBNu3_qoZlATgzvzoVM0VZBHa41dGBYQaPZsHM-My10ajIsVQLvvgk1JWoopGnUv2S0fgxv-B8u1tmne_M/s16000/20250523-235942%20quickscan%20not%20good%20tickless%20timer.png)

eso no se puede solucionar, pero de todas maneras se puede trabajar muy bien así.

---

## Configurar QjackCtl para que cargue los módulos de Pulseaudio Jack con pajackonnect

Este script pajackonnect usaba AV Linux 2021, lo usaremos aquí

### Dependencias de pajackconnect

```bash
sudo apt install a2jmidid
```

### Instalando el script pajackconnect

```bash
wget https://github.com/brummer10/pajackconnect/archive/refs/tags/v1.0.tar.gz
tar xf v1.0.tar.gz
cd pajackconnect-1.0
sudo cp pajackconnect /usr/bin
```

ponga su password y se instalará pajaconnect en /usr/bin

puede cerrar la terminal si lo desea, o poner cd .. para ir al directorio anterior o cd para ir al principio al inicio a HOME

también puede borrar es carpeta pues ya no la necesitamos

**Nota:**
Instalo esa versión del 2022
[https://github.com/brummer10/pajackconnect/releases/tag/v1.0](https://github.com/brummer10/pajackconnect/releases/tag/v1.0)

porque es la que más se acerca a la fecha de liberación de MX Linux 21
[https://es.wikipedia.org/wiki/MX_Linux#Lanzamientos](https://es.wikipedia.org/wiki/MX_Linux#Lanzamientos)

además de que es la unica que está en Releases al menos por el momento (me imagino que esta ha de ser una liberación estable)

# Integrando el script pajackconnect a QjackCtl

Abra QjackCtl y de clic en "**Setup ..**":

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijYfyzYRctozTwIa15YXe_2LoVaanJvOQecoxpwTai2E74gVXUguEGKH-_D93tkh3f6KWkat1Ht33b7fMFioN9jZ3TUAkJOb2razEx1ojLGJpQMXbf9iHfwETt0MmPfFdpV0Ok0Or8i5A/s16000/20211001-091025.png)

de clic en:

**Opciones**

y marque las siguientes tres casillas:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNvSTS696SCaBmVzgv67mlMpa-fP3OpkrJkJXNZmv49k3m06MkP71tB2uh_V3ILtyB8YxRKvaNCCiMQdg3guDlqpylmjb2KzdiCVB-tMO8GV2UqUjWew9-HNn0-8Is-JsM8s1ikwx9_sw/s16000/20211001-091234.png)

y allí añada en cada una de ellas las siguientes tres líneas:

```
/usr/bin/pajackconnect start && a2jmidid -e &
/usr/bin/pajackconnect stop &
/usr/bin/pajackconnect reset &
```

debe quedarle así:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEik7VDLHk094hWODkPniNnlDm00BhpNt5sHN_K8SfXI1U1d5Kj0wIt_zDVdDvqY-j93YoLIZTI3PouLSnS4EWUInLcY6XojViFDFrGAw8G1MeWXxThsm6dexCByUUySiQF3CXwuU5esuFY/s16000/20211001-091451.png)

y cierre

Ahora si ya lo tenemos instalado y configurado.

---

# Configurando MIDI en QjackCtl

En QjackCtl clic en Setup:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhaHCd5D5-dWvyI7rT8t_DoxRJQ-Lz7k7lh-rXXkHfFrk-kXF7XQnI5RGpq0VxGiXK1paENlUNyfgOPnBmFaKuJqdb1mdvpp9wJ3vrdrocokSHtTd0GXKu-VyZi6bMUKkmUS7GNO6rZ8cfcDastP-BnBMlfuGmZ2QeGDTomqSak2l1MBEy7AXXb0xV55I0/s16000/20240524-174022%20setup.webp)

en seq:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtWMEcBNEUNPmSga5vJRa7NdPy-jkE8OYm8AJ1PgDl02XYU3Sg6uz0fNB1TNDYcVBE8ZV-zBUu75UEf_P_Em9y2p8OF_4sjp3o2mUwQBkUFLkFKPBJvabW_11C8EfZwK0jaGoNT6c1y3iIYT1-whxOLZA4ez_qmCagEOm2csQpMUnD98EmeLjuJ0Pn5Zw/s16000/20240524-174322poner%203%20y%20poner%20seq.webp)

por cierto se fijará que en la latencia dice:

n/d

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijQMPBqz0R0PULFVlxp7BILMeKwBYJRCBim-UZivvKyUWCbzzUFkTw3YMgae718EJarx1VAT34GPzrhXqlm-_yyn5J4-JtVtDeB6DpEY6bw8H7jjeg2zyifgqjE2vBA02PR0J-dvQ2a1zBsAFK5RS4MMc7RDjLK1w9KY5Ez_TBr880CZKXDMKznQ-3g0M/s16000/20240524-174602%20latencia%20no%20definida.webp)

o sea no definido, para que nos muestre la latencia a la que estamos debemos escoger los valores de:

Frecuencia de muestreo: 48000
Cuadros / Periodo: 1024

que son los valores de AV Linux 2021

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8rzNl1RxLuIvHHDiSi39QvXcOLTe9uQ8PQUUY5Z2mGhO5iMAJSqd_PuVbU_svQ1M4ZkUgelWRiVZFa-aq0LWh3KG_Sc6X7KkvY22BRQeKmEI0nRfZ0jBz32y-BI_hO5FpZ7vw_dghEfi3qrS8K6chGA-BOWTov5_DhcG0_YfENubaReK-JmlKXe7tdDQ/s16000/20240524-174839%20puesta%20la%20configuraci%C3%B3n%20por%20defecto%20de%20AV%20Linux%202021.webp)

me da de latencia 64 mili segundos, o sea ese es el retardo. Dar clic en **Aceptar** y **Aplicar**

---

# Sobre la Frecuencia de muestreo

En la Frecuencia de muestreo le puse 48000, pero si usted en su sistema usa audios a 44100 pongale mejor a esa frecuencia para que los programas ejemplo Ardour no tengan que convertir de una frecuencia a otra pues eso lleva tiempo, para ver qué frecuencia de muestreo tiene su audio dele clic derecho y abralo con Mediainfo:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirJX3qVNNGiPpIC4Sg9BfYJ6g5qrOWWaw0vUnen5GYvFFMof4p4otu6erFwXQoUl9JAYxjLkCG_yOV_z1Issl1D1Y88nxm_LnfneJwaU2-K4Af3f8VpU_KiZiLQEtZ5BZ3ddOzt7kiW6QK44g-qY84Qv96vvT3lrXtEkzIwD2Avpcct_ykQfojXhum0do/s16000/20240706-191243%20abreindo%20un%20audio%20con%20Mediainfo.png)

y verá:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZ6CLC0pDlKbsfAhdenimSgh-Co-OsGzMOXv8U9r4IIrFjP3eBRlgIwx0153UtQTTingQwkmhE0e2m6NKm8o9nUqxKRp5GO_kdV4LyoDvF04BtB3PoaOpSQk_-HFqy9Aqzt2T2ipIvnI_p0sY5qtinac_bJcauCG5fonU5sMDcGr7DGLUVOIT52Mj-v1o/s16000/20240706-191043%2044,1%20es%2044100.png)

o sean este caso le pongo 44100:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGKZDZotRvX5kavfpXeCA4PHtD5pFNq9uilhJ_oCKViKhwgDH7Qw_MYrWaSGqkzvUJ8cj7mVohd0-5MacJXcbTa3IWh_JhkIt_uVXfOuYu7FLFwN4R_23Fzf-irFHpGZTCgjEh0lIql8CfaY6NVm8lS67p6FjO2vFUPAUDsMPH3tglMwFa-vkPsXxbVVo/s16000/20240706-191442%20eligiendo%2044100%20en%20frecuencia%20de%20muestreo.png)

porque voy a cargar esos archivos ejemplo en Ardour

---

# Otras maneras de conectar los modulos de Pulseaudio Jack

Aquí antes tenía otras maneras de hacerlo funcionar sin usar pajackconnect pero las saqué pues ya no son necesarias, pero si usted las desea revisarlas, las puse en un documento en Google Drive:

[https://docs.google.com/document/d/1JFM3qhF_FG9gMUHLVURTODmAQok3jGxoP8ubJIDVmBk/edit?usp=sharing](https://docs.google.com/document/d/1JFM3qhF_FG9gMUHLVURTODmAQok3jGxoP8ubJIDVmBk/edit?usp=sharing)

---

# Si son curiosos con la configuración del Driver MIDI a seq

Si desean saber por qué en "Driver MIDI" le puse "seq", encontré en un foro de musescore lo siguiente:

[https://musescore.org/en/node/52876](https://musescore.org/en/node/52876)

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdkpwb7Wm9dFKIe1PJDV7zeG5e-HsONNYLkazG9NbMPTF3cOwXwcpMxZVejNAdGOEs9PoZ3XXFr_YTSG9BLD6qYNkq1LGsUhFKctnpwnIYtT5wTzKObwmclGlv4vX1DkRFIcA_Kcxqwpo/s16000/20211002-094304.png)

la traducción es:

> Hola,
> Utilizo jackd para mis programas de música.
> Tengo un teclado midi usb (Korg nanoKEY2).
> En qjackctl, no puedo conectarlo a MuseScore para ingresar notas. De hecho, el teclado midi aparece en la pestaña "Alsa", mientras que MuseScore aparece en la pestaña "midi".
> Entonces, no puedo conectar el teclado a MuseScore.
> ¿Cómo le va en este caso?
> Mi versión de Musescore es 2.0 y mi sistema operativo es Ubuntu 14.04.

la mejor respuesta:

> Just in case anyone comes across this issue: I was experiencing the same problem with MuseScore 3.1. I solved it by setting the MIDI driver to 'seq', then in the ALSA tab in the Connections dialog I connected my MIDI keyboard to MIDI Through, and then in the MIDI tab I connected system to mscore. See images below:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtdb0cLC-WIqIWfx9gdgT7YNDzZaS39QNrKuQs-YTSQ4Z1DevQKPZOTtL2Jtx0NYTZmr2mfYdCEqc8Xcm7T5oRMNI1gZJY2aLV6dopnVNmBCqZ4SMA_o-cmazj8iK1b3efw_97H1ZmigI/s16000/20211002-094618.png)

la traducción sería:

> En caso de que alguien se encuentre con este problema: estaba experimentando el mismo problema con MuseScore 3.1. Lo resolví configurando el controlador MIDI en 'seq', luego en la pestaña ALSA en el cuadro de diálogo Conexiones conecté mi teclado MIDI a MIDI Through, y luego en la pestaña MIDI conecté el sistema a mscore

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0Xo2Ik6yzIhWz5Z5Cc3Ngk_ZD2B_7lgIGr__J0JvxnjlHO5mzNpPepX0j32eA1qMca2ZWL0LK-OpeEp36k_vaMku9tPBehm1CZEIQ97N678NdShyphenhyphensCNCH3vOpoWSyP4-u91HA5nN_KFY/s16000/20211002-094944.png)

**Nota:** Las cosas aparecen el na pestaña MIDI porque está instalado el paquete a2jmidid.

ahora si, ya tiene QjackCtl configurado como en AV Linux ALV-MXE 2021

---

# La nueva interfaz gráfica de las Conexiones en QjackCtl

Al abrir QjackCtl y dar clic en Play y clic en el botón Graph en estas imagenes ven la interfaz nueva que por defecto viene desde MX Linux 19:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4QwVqq91fUio8WGrvx1Q0VE1_1K2d1VHM9noU5-kU8FUARHMhAvBdg4wnXeLtfAYZfuY5df6Ed2wHR9V248QbOEfaM4q3FA0tzOO8-_SI2x0mDVbCLCcfv5LvEfU20k9AEfQUZ9wP1Mg/s16000/20210319-093119+Jack+Audio+Connection+Kit+iniicado+%252B+Graph.png)

pero yo no lo uso, porque no lo se usar. Si ustedes lo saben usar usenlo, yo uso la anterior (hay más tutoriales con esa), así que para desactivarla y usar la antigua, de clic en el botón:

**Setup**

y clic en el botón "otras" y desmarque:

**Replace Connections with Graph button**

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCDdxXovI4seV0N7AB5-U0PLV9oezDG948zwgINoLruboqOsdzGRNtNLKirINM40Xjn0pghcrZrww83WQK9vYC7jj6kpiLXoVRTwpu_aOo7G9ciQidMA-c7mdV8SiFKp4zoOtGYxaZKsY/s16000/20210319-092552.png)

Aplicar y cerrar

Ahora si aparece:

![imagen](https://blogger.googleusercontent.com/img/a/AVvXsEiyZB0Qi8gSS9vckruMlCuXhDZkq4iqY_qN9quT6C5P-W2RID6-RCBS6PPCsevJ0YYd9hiBz4D8fKXl6EXBtfJRXqc_ZCNaw2mYS7BHRLe_xrWCQkWgsvhVq4xxCSRG5-odyEeHOG89BfOnzxuFBTAIHHxgHEbyoPxs7-nxypzUfzMg9q2RgAl952gX=s16000)

**Nota:** Si desean usar la anterior reviertan lo que hicimos.

---

# Inciando QjackCtl

Sólo dele Play:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjSY5hRFn_Mq9qOWhcTGKbw47heLyGDBqPPI2idz9wpcGr7X0uxc0RKOu0sRp6grbtZYJwCRDCYeeQTbeM5Zc8Rh2yRZa40jYwuqCkPk5KsKQQSjheCJMMc_C56su9R-2SWE6V2bYCMYxw/s16000/20211003-213050.png)

---

# Consejo: No suspenda su ordenador si está usando JACK con QjackCtl

Por cierto les cuento que pajackconnect trae cómo instalar un script para que funcione bien JACK en QjackCtl después de haber Suspendido el ordenador:

![imagen](https://blogger.googleusercontent.com/img/a/AVvXsEhTGiU60fcvVH4eAV3rP9fvhFZ12Fy4_7lplq4uwgTIyCca-bXm2n4Im8piKDMpVdL8IGy2e3hygz6TW8XG2-9PG0AT8p5VD-_AauqLMHlFrT3nO_P3WNJ67N-bUrD5X5XASFiS9PiDa8LXBvtA2XvjiXhc6_M-YMvvCpnnp0yePo8GL5mXYenrDomT=s16000)

pero ya intenté y no funciona, por eso lo mejor es no Suspender el ordenador si está usando JACK con QjackCtl en esta instalación que estámos haciendo usando pajackconnect (si lo desea suspender, detenga QjackCtl en Stop y allí si suspenda, y cuando saque de suspensión al ordenador y lo quiera volver a usar dele Play otra vez)

Al respecto de esto pueden leer lo que yo estaba escribiendo en el siguiente enlace:

[https://docs.google.com/document/d/1rZqdpbVrnweaP-ZUCc-OJFaIIoe8qmh25HBZ5RgXIVg/edit?usp=sharing](https://docs.google.com/document/d/1rZqdpbVrnweaP-ZUCc-OJFaIIoe8qmh25HBZ5RgXIVg/edit?usp=sharing)

---

# Consejos para dar Play a QjackCtl

Como les decía lo mejor es **reiniciar** el ordenador para que al dar Play aparezca el modulo pulseaudio Jack como debería ser. Cuando haya hecho login allí si dar Play (Iniciar):

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpBedrtxqf3LyN98Os82HZX5rolUNqSe9gbft613CSK2Q9FbzFnW6mp6H_9vbRjR5XbYclIqRifMf_JuSiOGnI292ETcpr3V7TogafFcLprlK08tZoWxjKSYq85XPmdFqn9BoLlW9GDRk/s16000/20201005-125102.png)

y correcto, como verá en la siguiente figura está todo funcionando bien:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggn8qrp-Jg57nJc8tfojc_m_gxQnGJmMSr3YIDXw38QYhQ-r_3PqaSN8xROcS2m_7Ot6FrqlhbQUYO8w6TiPeLkdL4qHps7clr8jG2GCHdD8QZfxraAZf6joOdlSEuQPE_ebbEmeXe4f0/s16000/20201005-131237.png)

los módulos de PulseAudio están cargados y funcionando correctamente, puedo verificar también cómo va el funcionamiento en ·Mensajes·:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdNzn9P58rc4xmfNI_nNST8SiSPjXNEt5Th59k4BH8OOWvAWaXoygeL46sKzZqLPzLWYlAQ7z9l_qpf-xQiAT_p5ftpA8p2Og0wOGoTgMJOzcAqeNkFleP8iKwbG3IPvUU05pES7cvTgg/s16000/20201005-131610.png)

Esto en mi caso, como les decía, ustedes en frecuencia de muestreo podrían usar lo que viene por defecto 48000 y en el Tamaño del Buffer yo le cambié de la que venía por defecto y tengo 128 porque quiero usarlo para hacer Karaoke y que cuando yo cante me pueda escuchar en los parlantes de esta laptop al mismo tiempo que yo cante (solo que a veces aparece un mensaje del disco duro que dice que se ha relentizado la escritura, bueno, para mejorar eso usaré luego un disco de estado sólido que es más rápido).

## Al abrir Ardour elegir JACK

Cuando usted abra Ardour y lo esté configurando de clic en:

Sistema de audio

y cambie:

ALSA

![imagen](https://blogger.googleusercontent.com/img/a/AVvXsEgn037ASoPlC_qzFWc5ivV--9FHgTJOmxykklWb0TAWmocjbYEdFOCE33w2Z1hyYYz_PJSS_XvgcZqqvpvSYEH8W9ydXRdmmWJwztZ7uMOyBvuNGscukOh26QKSIvKAQhz0VJGo7njSE50RXwz7zGALbKZwjXIM4RQ8PM_9uCCad8JVzt5VKn1ekzjD=s16000)

por JACK (se supone que usted ya le ha dado Play a QjackCtl para poder hacer esto), así:

![imagen](https://blogger.googleusercontent.com/img/a/AVvXsEhzNocWQ5r9OFd9IcYQLhtIBh4PNqhiH3DhYSbQWVpqmIXLMjva6hPSPA_VExMaheSeWeEpwX-cmFoUSYyXPh6BnPG4OR71U_ouliPMA0IC88e4G5OiJjj0Wn61zpBhiqqHKmC92mVm_sEp3ofR5bh450tMQEZ1a6vd7BN1-UfIdwv5oBJ1Zn4HErTv=s16000)

y clic en:

Connect to JACK

![imagen](https://blogger.googleusercontent.com/img/a/AVvXsEg1ksDoMTKbUvAqM35oDsXOwZvLJx_spMTpTa4CIQWj21TRwTsBphNrRLdP541JSkeJTNYOmPR02poD3NIMiZibGV9ndNMpQL92qbwtEdQQd2qOmyRI6ue39MUKlbtM6Xhdzncqk92oZ8E9NKq8PIXkJ1pNZ09kHcIE74V0jbtoRLQxRHxIW85Wnt7q=s16000)

listo

## Los plugins de audio de UbuntuStudio

En Ubuntu Studio 20.04 LTS (abril de 2020) estaban instaldos los siguientes plugins:

```bash
sudo apt install abgate aeolus amb-plugins autotalent blepvco calf-plugins \
     caps cmt csladspa drumkv1 dssi-host-jack dssi-utils eq10q fil-plugins \
     fluidsynth-dssi foo-yc20 ghostess hexter invada-studio-plugins-ladspa \
     invada-studio-plugins-lv2 ir.lv2 jconvolver lv2vocoder mcp-plugins mda-lv2 \
     omins rev-plugins rubberband-ladspa samplv1 swh-lv2 swh-plugins synthv1 \
     tap-plugins vco-plugins vocproc wah-plugins whysynth x42-plugins zita-at1 \
     zita-lrx zita-mu1 zita-resampler zita-rev1
```

**Nota 1:** De esta lista quité a un paquete llamado "blop" porque desinstala Audacity. Esta lista la he probado en MX Linux 19 y 21, en caso que en una versión superior algún paquete cause alguna molestia deben quitarlo (o en otro tipo de Linux)

**Nota 2**: Hice un tutorial aparte sobre [cómo obtuve esta lista](https://facilitarelsoftwarelibre.blogspot.com/2020/10/plugins-de-autio-de-ubuntustudio-para-mx-linux.html).

---

# Plugins con interfaz moderna / usable (tipo DAW)

Estos son los que **sí tienen GUI decente (gráfica, sliders, visual)** y valen la pena:

## 1. Calf Studio Gear (calf-plugins)

* ✔ Muy recomendados
* ✔ Interfaz tipo DAW
* ✔ Gráficos (EQ, compresor, etc.)

✔ Incluyen:

* Compresor
* EQ
* Reverb
* Synths

👉 Sirven para mezcla completa: ecualizar, comprimir, añadir reverb y crear sonidos.

🎧 Ejemplo de uso:

- Quitar frecuencias molestas a una voz (EQ)
- Nivelar volumen de una guitarra (compresor)
- Dar ambiente a una alabanza (reverb)

👉 LOS MÁS IMPORTANTES de la lista. **Instalación** con:

```bash
sudo apt install calf-plugins
```

---

## 2. Invada Studio Plugins (invada-studio-plugins-lv2)

* ✔ GUI decente (no tan moderna pero usable)
* ✔ Estilo “analógico”

👉 Sirven para procesamiento básico de audio con carácter analógico.

🎧 Ejemplo de uso:

* Calentar una voz (saturación)
* Ajustar dinámica en pistas sencillas
* Mezclas rápidas en equipos modestos

👉 Muy buenos para mezcla básica. **Instalación**:

```bash
sudo apt install invada-studio-plugins-lv2
```

---

## 3. x42 Plugins

* ✔ Interfaces modernas (Qt)
* ✔ Muy usados en mastering

Especialmente:

* medidores
* EQ
* herramientas profesionales

👉 Sirven para análisis y control preciso del audio.

🎧 Ejemplo de uso:

* Ver niveles exactos antes de exportar (metering)
* Analizar espectro de frecuencias
* Ajustes finos en mastering

```bash
sudo apt install x42-plugins
```

---

## 4. eq10q

* ✔ EQ gráfico tipo DAW
* ✔ Muy limpio

👉 Sirve para ecualización precisa por bandas.

🎧 Ejemplo de uso:

* Quitar graves innecesarios en micrófono
* Resaltar claridad en voz o piano
* Ajustar mezcla final

```bash
sudo apt install eq10q
```

---

## 5. zita-rev1 y familia zita

✔ Interfaz simple pero usable
✔ Sonido profesional

👉 Sirven principalmente para efectos de reverb y utilidades de audio.

🎧 Ejemplo de uso:

* Simular una iglesia o auditorio (reverb)
* Mezclas en vivo con ambiente natural
* Procesamiento de señal en JACK

👉 No es “bonito”, pero es serio

```bash
sudo apt install zita-rev1 zita-lrx zita-mu1 zita-resampler zita-at1
```

---

## Plugins con GUI básica (no moderna pero usable)

Estos sí tienen interfaz, pero:

* muy simple
* estilo antiguo
* poco visual

---

### synthv1 / samplv1 / drumkv1

* GUI tipo sintetizador clásico
* Bastante funcional

👉 Sirven para crear sonidos e instrumentos virtuales.

🎧 Ejemplo de uso:

* Crear pads para alabanzas
* Programar baterías electrónicas
* Simular instrumentos en vivo

```bash
sudo apt install synthv1 samplv1 drumkv1
```

---

### ir.lv2 / jconvolver

* GUI técnica (no bonita)
* Muy usados para convolución

👉 Sirven para aplicar respuestas de impulso (IR).

🎧 Ejemplo de uso:

* Simular acústica de una iglesia real
* Usar impulsos de amplificadores de guitarra
* Reverbs ultra realistas

```bash
sudo apt install ir.lv2 jconvolver
```

---

### vocproc / lv2vocoder

* Interfaz funcional

👉 Sirven para procesar la voz con efectos tipo vocoder.

🎧 Ejemplo de uso:

* Efectos electrónicos en voz
* Sonido tipo “robot”
* Producción musical moderna

```bash
sudo apt install vocproc lv2vocoder
```

## Nota: algunos plugins pueden necesitar reiniciar

Algunos plugins pueden no aparecer inmediatamente en Ardour o QjackCtl.
Si eso sucede, reinicia el sistema o vuelve a escanear plugins dentro del DAW.

---

# Plugins SIN interfaz o muy básicos (evítalos si quieres GUI moderna)

Aquí está el problema grande en Linux 👇

👉 Muchos plugins usan **LADSPA**, que:

* NO tiene GUI real ([Wikipedia][3])
* Solo sliders del host

## ❌ De la lista (sin GUI moderna)

Estos son los que NO tienen interfaz amigable:

* amb-plugins
* caps
* cmt
* mcp-plugins
* swh-plugins / swh-lv2
* tap-plugins
* vco-plugins
* wah-plugins
* blepvco
* fil-plugins
* rev-plugins
* rubberband-ladspa
* abgate
* aeolus (interfaz aparte, no plugin moderno)
* autotalent (muy básica)
* ghostess
* hexter
* whysynth
* fluidsynth-dssi
* dssi-*

👉 Estos son:  
💀 viejos  
💀 técnicos  
💀 sin GUI tipo DAW  

**Si los quires probar**

```bash
sudo apt install amb-plugins caps cmt mcp-plugins swh-plugins swh-lv2 \
tap-plugins vco-plugins wah-plugins blepvco fil-plugins rev-plugins \
rubberband-ladspa abgate aeolus autotalent ghostess hexter whysynth \
fluidsynth-dssi dssi-host-jack dssi-utils
```

**🗑️ Para desinstalar:**

```bash
sudo apt remove amb-plugins caps cmt mcp-plugins swh-plugins swh-lv2 \
tap-plugins vco-plugins wah-plugins blepvco fil-plugins rev-plugins \
rubberband-ladspa abgate aeolus autotalent ghostess hexter whysynth \
fluidsynth-dssi dssi-host-jack dssi-utils
```

---

# 🎛️ Plugins modernos para Linux (fuera de repositorios Debian)

Como estos plugins no están en los repositorios de Debian, cuando los descargue subalos a [https://www.virustotal.com/](https://www.virustotal.com/) para que los analice

## 🔹 LSP Plugins

**Para qué sirve:** Suite profesional de audio (EQ, compresores, limiters, analizadores, etc.) con interfaz moderna tipo DAW.
**Descarga:** [https://github.com/lsp-plugins/lsp-plugins](https://github.com/lsp-plugins/lsp-plugins)

---

## 🔹 ZamAudio Plugins

**Para qué sirve:** Plugins de mezcla inspirados en hardware real (compresor, EQ, reverb) con GUI amigable.
**Descarga:** [https://www.zamaudio.com/](https://www.zamaudio.com/)

---

## 🔹 Dragonfly Reverb

**Para qué sirve:** Reverbs de alta calidad (hall, room, plate) ideales para mezcla y ambiente.
**Descarga:** [https://github.com/michaelwillis/dragonfly-reverb](https://github.com/michaelwillis/dragonfly-reverb)

---

## 🔹 Cardinal

**Para qué sirve:** Sintetizador modular tipo VCV Rack dentro del DAW, muy visual y potente.
**Descarga:** [https://github.com/DISTRHO/Cardinal](https://github.com/DISTRHO/Cardinal)

---

## 🔹 Odin2

**Para qué sirve:** Sintetizador avanzado tipo wavetable/subtractivo con interfaz moderna.
**Descarga:** [https://github.com/TheWaveWarden/odin2](https://github.com/TheWaveWarden/odin2)

---

## 🔹 Surge XT

**Para qué sirve:** Sintetizador profesional completo, ideal para producción musical avanzada.
**Descarga:** [https://surge-synthesizer.github.io/](https://surge-synthesizer.github.io/)

---

## 🔹 Vital

**Para qué sirve:** Sintetizador wavetable moderno (tipo Serum), muy visual y potente.
**Descarga:** [https://www.audiopluginsforfree.com/vital/](https://www.audiopluginsforfree.com/vital/)

---

## 🔹 Airwindows

**Para qué sirve:** Plugins de mastering y mezcla de alta calidad (sin interfaz gráfica).
**Descarga:** [https://www.airwindows.com/](https://www.airwindows.com/)

---

### Escanear los plugins

Estos plugins los necesito para **Ardour**, si ya había abierto Ardour y había escaneado los plugins, vuélvalos a escanear así, clic en:

Editar/Preferencias

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcY8yrmq-stCNgPFoeBVo2fkb_IUnEJJ5PV3cSmX9pGzoJYZEzP_o3_vm_MwtWMM8xYAxYq-CdVVjMO0X7gkqdyJdRigTaDf6khfpw8p688do1Qo0xN5T6W41DPc-VFP-ViFdP498UeEc/s16000/20201006-111013.png)

allí clic en:

Plugins / Escanear plugins

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEit_Z_dwwf-Tmsx00BDt9hltOUbJ_Drc2qWirl0URLy9aATzUF6SmQ0D1-UhirD6zk09y-XfamcayKEtQR8sAH1JFwW_ZkljvU266lW6HixUFhUwnrTMZPmWJnwFVo9TOHhx8mbE3-2bMU/s16000/20201006-111111.png)

para salir de esa sección a la anterior de clic en "Editor"

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioAHSVLlnc6bQx1E5DERDHlpgVYq6IFbx3ml5ioDsDLIpc6l5Hy1gjoyYLikZHMsarWJ441_wEzFQGbe0On1H5YcDTvSiz_owFeXL6MlVt2EkWOoIDwC1WSrVp4wYqXOnv9PP-mM2Icmo/s16000/20201006-111328.png)

### Para añadir los plugins

den clic en:

Ver / Mostrar Mezclador en Editor

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLNFl8hC0PYxKP1zZ1utibkjBJz57gK7KXP7C11Rt9DoxKDxZMrEZHjDc2JJ6UJ6-8vI4EGWz5eu4zh03Hv9ORp0oeQPQEmckKuB7Q_FXA7gsFnX1p9KClEWOnfQQh8mZGe0uTpB6Jfoo/s16000/20201006-112103.png)

Antes de añadir el plugin seleccione la pista en la que lo quiere añadir, ejemplo yo tengo tres pistas cargadas y lo voy a añadir en la segunda, hay que dar clic donde indica la flecha:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjyYefuxYZuxS3jJ3oDA7VvAsr8dmXDIT0rXnhOEcOnsOMGKOmld6Tout5J4WBWc_j6bXOCKMrBHDQDfBqx-0XdZjrhJ_wUgf2kAaQi7PaeGLZwHoV-iLeb41Oyh1l5wjjdkUJsQ2DmNOw/s16000/20201006-112606.png)

ahora si, allí en "**Fader**" los puede buscar por autor o por categoría y añadir:

![imagen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpRR9fQ5JJFEfQCVymAkfWYIzqhlK8fDm-Np5j4KduKFLFyeKfGZH1ZiqOWRzbKB2HfFwJofwlVpqNjk-Y6w4GxoIX-u_6tVIe7CsyDYDkF07iWAGMWR7j2v_Y4oFpyoL2kRgFExVvH7M/s16000/20201006-112304.png)

---

# **Cómo conectar dispositivos MIDI y que sean reconocidos por JACK**

Para eso es necesario tener instalado el programa a2jmidid el que ya instalamos arriba:

```bash
sudo apt install a2jmidid
```

si usted ha usado el script pajackconnect que se usa en AV Linux (que se menciona arriba) omita este paso de poner en la terminal:

```bash
a2jmidid
```

ahora, en la pestaña "MIDI" de QjackCtl están los puertos disponibles, ejemplo la siguiente imagen:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHzRcuBiih9hmmC_FtkyNt7EL7iDi5OXtlh65lcgz-Wd5f8QlfPxS2SwBN8Qc75CgPnq-8BWopyaFA-maFx_DGePeaW5ycEO0zp5tyuu9AtgP7QnT28CVhSjtGgmhPyUKMBTE3-hxSe_4/s16000/20211003-223230.png)

ahora vamos a conectar un teclado virtual, cuyo paquete ya lo instalamos arriba, pero si tal vez necesite el comando de instalación es:

```bash
sudo apt install jack-keyboard
```

lo siguiente sería así mismo como pasaría con un teclado real, es para poder hacer un simulacro de cómo se haría en la vida real, pues cuando usted conecte un teclado de verdad aparecerá en esa pestaña. Para abrir ese programa ponga en una terminal:

```bash
jack-keyboard
```

o busquelo entre todos sus programas. En la siguiente imagen está en xfce4-appfinder:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5b-KkxWSMSbdM0tFFZG7buisI9Wyofsi6krIiiqqOKA11Qu3DFErUSpYCLvzRfegic2AUZMYJCOLkfhejOpSLdBU7uvPOvKq6WdbkSQnN5ILxMv3z_FtQnyKQu2sMaeMu_T41v_Att9o/s16000/20211003-223528.png)

y aquí el programa:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjC-SxaRg-3viPOJ0-uZP2-0P2eeYJcwuG7BsdesLdqHXlopCHToDDC3tgpihfX3HSTk2Y5OwntIexq6Q2wGywnTga4qbPXsr1PrI0bZiY8gknID2EiI7jswtCp4_cULUfQseuqpc2_NsM/s16000/20211003-223814.png)

Además tenemos que abrir a Qsynth (ya lo instalamos arriba) pero si necesita el comando para instalar es:

```bash
sudo apt install qsynth
```

donde he cargado una fuente de Sonido sf2, la cual ya habíamos instalado arriba, pero si necesita el comando es:

```bash
sudo apt install fluid-soundfont-gm
```

las fuentes se instalan en:

/usr/share/sounds/sf2 

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhISHUINnqnvz5PqBjL98omlBQpnB5K4IXoEKfCOeV8idJ2Ejxrl_L4Ay_8b6U6f4EDE8ZApAX8eH8cBxI0Qlxu5w1fzZMOHiYUkkYyOVUhwyOSFtxedy1srVhMh4026NV-1Q3eW3XZHg/s16000/20211003-224044.png)

esa fuente de sonido es para que me proporcione los Instrumentos virtuales y poder reproducirlos y escucharlos al cargarlos en Qsynth. 

**Nota**: También puede cargar otras fuentes de sonido 

### Cargando la fuente de sonido en Qsynth

Si usted no sabe cómo cargar una, se hace así (aparecerán porque a hemos instalado), se abre Qsynth y clic en "Configuracion":

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYS8bPr2pMgMSSosVhToeFL2bhIQ6yK46oTWJtWGtZznPFAjowfk9mQGTNUig4y5pMNko0ZFAoT4EyDMpGg9gwmUybsuqwR5OnXcOKLLaN01fFBUMnPdPLwP1vFW3_NFhGjZW7xtLsyJ8/s16000/20211003-222206.png)

y clic en la pestaña "Soundfont" en el botón "Abrir":

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0qaLxoyCmHgbbfT3DGImoydtJsfHrpJM1GU2jTG1CqhNLy9nSTwm-c8gOe4aBbzfR6MEOyS93sUG98Bbe4AXb8RIOM1SxtoMoKk0ntOpvVIdtIDZ3q9wpgnXkKx7bNq97Wp6lgmEVF6I/s16000/20211003-222351.png)

se busca la fuente de sonido, esa aparecerá allí:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhM7Hjd3Mi093Nc8WxjMZqVP7b_70LSQlOW5o0b1B3rOmtNU3kyXQZp2rvVr0Xih-go0xWOjGYFgCwJvNXLHsqCRAEHMyCW5FbKhpnBy1qIOoiO2S9E7PLIIsKafvltpCBwTMVg_k6kPoE/s16000/20211003-222557.png)

y después de darle clic se da clic en "Abrir"

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhO5pWVco53qbSMV1Cpdo8TOr6Y6YzuiQJgdyfA29tUlSX-iy1Sv-0bj5Df_REXB4NlZHqmtiz1bZP1NC9MMi8TJNE0dnlyH7Dv69JvCFzvyJ6vnXUC7SnDqNkXXy6mj8skMAnBlrvErG0/s16000/20211003-222710.png)

y clic en Aceptar:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9jjx208OimY3iy5iGU2siibI7F260SqdT2ksxLGtWJBX1Pkc2rGYhbMJ2GR8XBgVhyIDQtqo4FSwLNfO3FRxJ4DWBaDs3tB4OLBBRoJ_nz7NbuqU901tI6SyHswYqLg2Cx3ELzcg8V_Q/s16000/20211003-222747.png)

y hay que reiniciar el motor:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaGVqXnNzWDyhmgdmgTamloS3cyWQrJzFhiLS_gHOx2QLZCaiixZe0rOMmyfAO23bcodNbiQdgWYQlvJYMhLjclo6U02Fgsk-SqHx_4KChObHXF90IKT1QsV0KRfIiLe5AGtPlzRpE40M/s16000/20211003-222845.png)

y está cargada las fuente de sonido 

#### Conectando jack-keyboard con Qsynth

Ahora en la pestaña MIDI de QjackCtl tenemos esto y de clic como allí está la explicación:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMqoPgNZAzrft3Hp_N0WcSv8_Mt8BoUDAHROjdkgJxEXGbpi4Js2YSobE_C9CGXYjJJzziTFPlhjjTJ6Dvp1DQwvKYngFF4fQHc44EAvCk6VnX4PqUg_J-REYyFTgRzxW58ymviTWxXkI/s16000/20211003-224510.png)

ahora quedará así:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2f7rOwFJCgG0PZFrPpZZlLyEbH4fLQzTC2s_vfzzPoJtcE6URCmG7IqOwLwGWBS-Zj55tdHG4W7yBAxQ4xOHjGnPnYVqhFcPRfecGho8xVtAUWin5Gl5lmA5bzHGplQUIOo854-XP5e0/s16000/20211003-224651.png)

de clic en el puerto de salida del Teclado Virtual **"midi_out"** (allí apareería si fuera uno de verdad) y clic en "**FLUID Synth . . . . .**" y clic derecho y Conectar:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhD6gLBs3EQhFjLe25p9f8PX-_xELhrpd1Xpjf-xLtwbYGC_bCcJvFH-f75_pe_k_eo01RztUYLAMUNJApjpG8O_sirijyx2XzkoM8dhcJ6W_rHcIejqE0VpuqpMb8yrF-nKomU2Z0z5OM/s16000/20211003-224944.png)

y quedará así:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAAYRR5DW474uM116WAyfSx8L-NedbPIdFEUu319oy1RpjTIzHce9b9yaU2xZ6OpYKA7S5HPzqh0ZxfG9qcEpz8dYYzjD5uIv99-UU74U0nqLTcMENmBNPR58b1r8AMiuuVIi0IbBm-zs/s16000/20211003-225105.png)

ahora si toque en el Teclado Virutal y verá que suena, pero también se puede usar el teclado de su Ordenador

### Otras Fuentes de Sonido (sf2)

Puede buscar más en (deberá ponerlas en alguna carpeta como puede ser la de Música y desde Qsynth buscar allí la que necesite):

**Fuentes de sonido (SoundFonts) gratis desde paquetes de Ubuntu, Debian, Deepin Linux y TuxGuitar - Listos para usar**
[https://facilitarelsoftwarelibre.blogspot.com/2019/11/fuentes-de-sonido-soundfonts-gratuitas.html](https://facilitarelsoftwarelibre.blogspot.com/2019/11/fuentes-de-sonido-soundfonts-gratuitas.html)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcgZ51tc-p0rGMhjRKK_ibP2DwbKh0JyQuL5PIsbhqW4ugG2atHSxc2CR3DxqOCQp0wSDSn5U3b_1AbO3z3_p8xsttgqOODlHBv3lVHw4Edymzj6YWfTeYIFOpktwlPVZVQgCfd0Q5fMY/s16000/20210319-115905.png)

**VirtualMIDISynth | CoolSoft**
[http://coolsoft.altervista.org/en/virtualmidisynth#soundfonts](http://coolsoft.altervista.org/en/virtualmidisynth#soundfonts)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgr763GK7IqlxmsRR2MX5MqG18RsoJsKj-EVD-4QDjdAJ6Hr45bXh2bOyzGypIhcemIuWtEEEa8kYLTz6WCUdOGkkgxDaAZQUdUBpwRbHpCjsgevWyPtEBvJyG48Tr38_yzeiB-uj2m79w/s16000/20210319-115534+fuentes+de+sonido+en+pagina+virtualmidisynth.png)

## Configurar QjackCtl para hacer Estereo Mix (Opcional)

Lo siguiente es para lo cual yo uso QjackCtl en la mayoría de las veces, para esto hay que abrir QjackCtl y de clic en "Setup":

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4ONgrXa6UidPyPgGpZCbTIO5f6xTsSk9Ads-LRs-AqFsGCC_HGvzOzCRwuwDKWVVc67kbHFhARqmeYUqRVNgME26VIKsdvBTpzAWEhTzV1ST50ItWYOXlGe1AlV5Qei54adBXdT1_RBc/s16000/20201005-125320.png)

por defecto me aparece así:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjATlioGgPMyIfirQxS7Nf_H5Ku0w_cK1QZKQH34diQj8mv1BsC_YZDM36nBXE3nk6WcCeiEpCmMbImv6KS_zS9za97JL3V3yO3QSXTweRoCSu6dYeON1QKaXjuRZjbvENWxiiGV2wNEbs/s16000/20201005-125408.png)

**Nota**: La latencia está en 42.7 mseg

### **Frecuencia de muestreo a 44100 (opcional)**

La mayoría de los audios que manejo yo son están en 44100, y ese valor le voy a poner (en mi caso en particular solamente). Pero esto es opcional, todo depende de lo que usted vaya a hacer, puede dejarlo como estaba en 48000

### Cómo hacer Estereo Mix

Quiero usar Jack para hacer Estereo Mix pues lo quiero para usarlo como Karaoke y escuchar al mismo tiempo el audio que estoy cantando en los parlantes además de hacer una grabación en video de todo ello o sólo audio, por lo cual le pondré en **"Cuadros / Periodos"** el valor de **128**

Dios les bendiga

## RESPALDO DE LAS CONFIGURACIONES DE AV LINUX

He hecho un respaldo de las configuraciones más importantes de AVL Linux del Release del 2021 aquí:

[https://github.com/wachin/AV-Linux-archivos-importantes/tree/master/AVL-MXE-2021.05.22-xfce4-openbox-i386.iso](https://github.com/wachin/AV-Linux-archivos-importantes/tree/master/AVL-MXE-2021.05.22-xfce4-openbox-i386.iso)

**CONSULTAS:**

PulseAudio Modules
[https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/)

Linux HOWTO: Pulseaudio & Jack server
[https://forum.renoise.com/t/linux-howto-pulseaudio-jack-server/41434](https://forum.renoise.com/t/linux-howto-pulseaudio-jack-server/41434)

Configuring the real-time access for "audio" group users and applications
[https://help.ubuntu.com/community/UbuntuStudioPreparation](https://help.ubuntu.com/community/UbuntuStudioPreparation)

Ubuntu Studio PackageList
[https://wiki.ubuntu.com/UbuntuStudio/PackageList](https://wiki.ubuntu.com/UbuntuStudio/PackageList)

Ubuntu Studio low latency kernel
[https://askubuntu.com/questions/758106/ubuntu-studio-low-latency-kernel](https://askubuntu.com/questions/758106/ubuntu-studio-low-latency-kernel)

Installing Geonkick broke my QJackCtl/pulseaudio-module-jack setup for some unknown reason : linuxaudio
[https://www.reddit.com/r/linuxaudio/comments/is37tj/installing_geonkick_broke_my/](https://www.reddit.com/r/linuxaudio/comments/is37tj/installing_geonkick_broke_my/)

QjackCtl and the Patchbay | rncbc.org
[https://www.rncbc.org/drupal/node/76](https://www.rncbc.org/drupal/node/76)

Using JACK for lower-latency audio on Linux for piano practice
[https://kcore.org/2021/02/21/midi-jackd-linux/](https://kcore.org/2021/02/21/midi-jackd-linux/)

Ejemplo de grabación de audio bajo GNU/Linux
[https://aerilon.wordpress.com/2012/04/23/ejemplo-de-grabacion-de-audio-bajo-gnulinux/](https://aerilon.wordpress.com/2012/04/23/ejemplo-de-grabacion-de-audio-bajo-gnulinux/)
