![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68n7Ci1RpYmLyzKMD2IjhjT7-AXEunEtNpEhqIqbykDWFTtID1lLkROmJPpSpNSsxdktlFkKdomf3Ypif6dlcPFG015Z_XEjd6e-m5h-OLTlkWBJ3Kq9rzljB6Wc4FZw7xkTTfJpVrFjR9r__KuXFpvhN3miC8ytkvXuHmVkkK7PxDzRY9LQ28sd9OIc/s1536/Portada.jpg =700x)

# Usando Timidity en el modo servidor para abrir y escuchar un MIDI

Hoy veremos cómo usar Timidity en modo servidor, con este modo no podremos usar la manera simple para abrir un midi, ejemplo `timidity tu_archivo.mid`

## Instalar Timidity y dependencias

Instalar Timidity y dependencias:

```bash
sudo apt-get install timidity fluid-soundfont-gm alsa-utils
```

El paquete “fluid-soundfont-gm” es necesario para timidity para que suenen los instrumentos virtuales porque sino se lo instala aparece este error leyendo el archivo configuration file timidity.cfg:

```bash
/etc/timidity/fluidr3_gm.cfg: No such file or directory
timidity: Error reading configuration file.
Please check /etc/timidity/timidity.cfg
```

el cual dentro de sí tiene el archivo:

/etc/timidity/fluidr3_gm.cfg

se lo puede ver en Synaptic

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFHg0e3fLAPhclJCsgu8Ih3lHYE6yky7tnbV_Ja-NMPgGmQt9TIgBhyphenhyphend6P_FyiPWQ9MT8sH1Q3UhzhiXOVTHmfT8aNLqmigcKWRactmxZ7w2DDiKZETt8R8N_hkLrexfdn_hkVBGZSBY8/s16000/ksnip_20210724-220225.png)


### Cargar (activar) el soporte de "secuenciador

Poner en el terminal:

```bash
modprobe snd_seq
```

El comando `modprobe snd_seq` sirve para **cargar (activar) el soporte de "secuenciador"** en el núcleo (kernel) de Linux.

#### La diferencia entre Audio y MIDI

*   **Audio normal (PCM):** Cuando escuchas un MP3 o un video, Linux necesita un controlador para mandar sonido a los altavoces.
*   **MIDI (Secuenciador):** El MIDI no es audio, son "instrucciones" (como partituras digitales: "toca esta nota", "sube el volumen"). Para que Linux entienda estas instrucciones y pueda enrutarlas de un programa a otro (de `aplaymidi` a `Timidity`), necesita un sistema específico de gestión.
*   **`modprobe`**: Es la herramienta de Linux para agregar funcionalidades al kernel en tiempo real sin reiniciar.
*   **`snd_seq`**: Es el nombre del controlador (**S**ou**nd** **Seq**uencer). Crea una red interna dentro de tu computadora donde los programas pueden conectarse entre sí para enviarse notas musicales. **Sin este comando:** El sistema sabe reproducir sonido, pero no tiene "cables" internos para conectar la salida del reproductor con la entrada del sintetizador. **Con este comando:** Se activan los "puertos virtuales". Por eso cuando ejecutas `aconnect -l` ves la lista de clientes (TiMidity, System, etc.).

### Arranca Timidity en modo servidor y en segundo plano

Debemos arrancar Timidity en modo servidor y en segundo plano activando los puertos MIDI para recibir notas de otros programas, optimizando el rendimiento y ajustando la estabilidad del audio

Poner este comando:

```bash
timidity -iA -Os -B2,8 &
```

El comando hace lo siguiente: *"Ejecuta **Timidity**, activa los **puertos MIDI** de ALSA (`-iA`), usa el **modo rápido** para no saturar el procesador (`-Os`), configura una **memoria intermedia** de tamaño medio para evitar cortes (`-B2,8`) y hace todo esto **en segundo plano** para que yo pueda seguir usando la terminal (`&`)."*

Este comando es la "llave maestra" que configura tu sintetizador virtual. Cada letra y número tiene una función específica para decirle a la computadora **cómo** debe comportarse el sonido.

En mi caso en mi ordenador me devuelve:

```
wachin@mx23:~
$ Requested buffer size 2048, fragment size 1024
ALSA pcm 'default' set buffer size 2048, period size 1024 bytes
TiMidity starting in ALSA server mode
Opening sequencer port: 128:0 128:1 128:2 128:3
```

La traducción de la tercer línea es **"TiMidity se inicia en modo servidor ALSA"** es decir está corriendo de fondo (corriendo como un "sintetizador virtual" en segundo plano)

## Probando que funciona

Para probar con archivo MIDI a ver si escuchamos los instrumentos, estando así no se puede ejecutar `timidity archivo.mid` para escuchar el archivo, en su lugar, debemos enviarle el archivo usando el puerto que se abrió (el **128:0**) y para eso necesitamos usar un reproductor de MIDI para ALSA llamado `aplaymidi` porque TiMidity está esperando recibir notas musicales. 

**Nota:** Cualquier programa en Linux que funcione como secuenciador MIDI o reproductor MIDI y que sea compatible con ALSA puede conectarse a ese puerto para enviarle notas y que TiMidity las reproduzca

### **Identifica el puerto:** 

Normalmente, cuando inicias TiMidity así, usa el puerto **128:0**. Puedes verificarlo escribiendo:

```bash
aconnect -l
```

Deberías ver una línea que dice `client 128: 'TiMidity'...`, en mi caso aparece:

```
wachin@mx23:~
$ aconnect -l
client 0: 'System' [type=kernel]
    0 'Timer           '
	Connecting To: 144:0
    1 'Announce        '
	Connecting To: 144:0
client 14: 'Midi Through' [type=kernel]
    0 'Midi Through Port-0'
client 128: 'TiMidity' [type=user,pid=8691]
    0 'TiMidity port 0 '
    1 'TiMidity port 1 '
    2 'TiMidity port 2 '
    3 'TiMidity port 3 '
client 144: 'PipeWire-System' [type=user,pid=1481]
    0 'input           '
	Connected From: 0:1, 0:0
client 145: 'PipeWire-RT-Event' [type=user,pid=1481]
    0 'input           '
```

### Reproduce el archivo enviándolo a ese puerto:

Abre una terminal en el lugar donde está el archivo MIDI, ejemplo:

```bash
aplaymidi -p 128:0 "nombre archivo.mid"
```

**Explicación del comando:**

*   `aplaymidi`: Es el comando para reproducir MIDI.
*   `-p 128:0`: Le dice "envía la música al puerto 128", que es donde está escuchando tu TiMidity.
*   `tu_archivo.mid`: Es el archivo que quieres escuchar.

---

### Si quieres detener el servidor (Volver al modo normal)

Podemos detenerlo poniendo en una terminal:

```bash
killall timidity
```

o buscarlo desde el administrador o gestor de tareas del Sistema Operativo (siempre debe venir uno instalado) y buscar la palabra timidity y darle clic derecho y cerrar o matar proceso.

### El porqué de este tutorial

Lo hice porque que quiero hacer funcionar otra vez al programa DrumBurp del cual he hecho un Fork en:

[https://github.com/wachin/DrumBurp](https://github.com/wachin/DrumBurp)

Porque Linux no carga este controlador por defecto. Así me aseguro de que la "infraestructura MIDI" esté lista y funcionando, para que Drumburp pueda reproducir sonido

---

Dios les bendiga

---

