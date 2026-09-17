# MarkText editor de Markdown que en Linux va tan rápido como Obsidian (y que también vive en Android)

Llevo años buscando el editor de Markdown definitivo para Linux. He probado de todo, y durante mucho tiempo
VNote fue mi favorito: nativo, potente, con un ecosistema de notas muy completo. Pero me topé con un muro
que no pude rodear: **cuando abro archivos grandes en varias pestañas, se pone lento**. Con dos pestañas
aguanta; a partir de la tercera, la escritura deja de sentirse inmediata y el flujo se rompe.

Buscando alternativa encontré **MarkText**, y la sorpresa fue grande: en mi equipo va **tan fluido como
Obsidian**. No noto diferencia. Y lo mejor vino después: hay un **fork para Android** que hace unas semanas
probé durante varias horas seguidas, y funciona tan bien que ya es mi editor en el teléfono.

Si usas Linux y escribes en Markdown, esta entrada es para ti.

---

## Qué es MarkText

|                 |                                                                         |
| --------------- | ----------------------------------------------------------------------- |
| **Qué es**      | Un editor de Markdown sencillo y elegante, con **vista previa en vivo** |
| **Licencia**    | **MIT** (código abierto de verdad, úsalo como quieras)                  |
| **Plataformas** | Linux, macOS y Windows                                                  |
| **Popularidad** | Más de **61.000 estrellas** en GitHub                                   |
| **Repositorio** | <https://github.com/marktext/marktext>                                  |

### Lo que trae (y que a mí me convenció)

- **CommonMark + GFM completos**: tablas, listas de tareas, tachado, autolinks.
- **Vista previa en vivo**: no es un panel al lado; el documento _se ve formateado mientras escribes_, y la
  sintaxis Markdown aparece cuando pones el cursor encima. Es el mismo concepto que el "Live Preview" de Obsidian.
- **Matemáticas con KaTeX**, **diagramas con Mermaid**, gráficos con **Vega/Vega-Lite**, diagramas **PlantUML**.
- **Resaltado de código con Prism** y números de línea opcionales.
- **Notas al pie** (`[^1]`), **frontmatter** YAML, **enlaces de referencia**.
- **Búsqueda y reemplazo con expresiones regulares**.
- **Pestañas**, temas claro/oscuro, y **11 idiomas** — entre ellos **español**.
- **Exporta a PDF y a HTML con estilo** con `Ctrl + Alt + E`.

---

## Por qué me cambió el flujo de trabajo

Mi caso de uso es exigente: **documentos largos, varios abiertos a la vez**. Es exactamente ahí donde otros
editores se caen.

Con MarkText, en mi máquina:

- Abrir un archivo grande es instantáneo.
- Puedo tener **varias pestañas abiertas** y cambiar entre ellas sin esperas.
- Escribir no se degrada: el cursor no se atasca.

Y lo digo con todas las letras: **la sensación es la misma que con Obsidian**. No he hecho un benchmark
cronometrado, hablo de uso real, todos los días, con mis documentos. Si alguien quiere números, que los mida;
yo te cuento lo que siento al escribir, que al final es lo que importa.

### Comparativa honesta

Esto es **mi experiencia personal**, no una medición científica:

| Criterio                                       | MarkText                            | Obsidian                                  | VNote                                                            |
| ---------------------------------------------- | ----------------------------------- | ----------------------------------------- | ---------------------------------------------------------------- |
| Fluidez con archivos grandes y varias pestañas | ✅ Excelente                         | ✅ Excelente                               | ⚠️ Se pone lento con siete pestañas abiertas con archivos grandes |
| Licencia                                       | **MIT** (abierto)                   | Código cerrado (gratis para uso personal) | LGPL-3.0 (abierto)                                               |
| Vista previa en vivo                           | ✅                                   | ✅                                         | ✅                                                                |
| Aplicación para Android                        | ✅ (fork del mismo motor, ver abajo) | ✅ (app oficial)                           | ❌                                                                |
| Nativo o web                                   | Electron                            | Electron                                  | **C++ nativo**                                                   |
| Ideal para                                     | Escribir Markdown y publicarlo      | Notas enlazadas y bases de conocimiento   | Notas y libretas                                                 |

**Ojo con un prejuicio:** que VNote sea nativo (C++) y MarkText sea Electron no significa automáticamente que VNote sea más rápido. En _mi_ equipo pasó justo lo contrario. La arquitectura no es el rendimiento.

### Sobre VNote, con respeto

No quiero que esto suene a ataque. **VNote es un gran proyecto** (<https://github.com/vnotex/vnote>):
nativo, con más de 12.000 estrellas, mantenido y con una comunidad seria. Si buscas un sistema de notas completo, tiene cosas que MarkText no tiene.

Lo mío es un problema concreto: **documentos largos en varias pestañas**. No he investigado la causa técnica, y no voy a inventarla. Pero tampoco me lo estoy imaginando: hay **reportes públicos de problemas con documentos largos** en VNote, por ejemplo esta discusión:
<https://github.com/vnotex/vnote/discussions/2208>.

Si tu forma de trabajar son documentos cortos o de tamaño medio, VNote probablemente te va perfecto. Si son documentos largos y muchas pestañas, **y si no tienes un ordenador con muchos recursos pruébalo** con tus propios archivos antes de decidir.

---

## Instalar MarkText en Linux (paso a paso)

### 1. Descarga el paquete

Entra en la página de descargas: <https://github.com/marktext/marktext/releases>

Encontrarás, entre otros:

| Archivo                         | Tamaño  | Para quién                                                                  |
| ------------------------------- | ------- | --------------------------------------------------------------------------- |
| `marktext-linux-x.y.z.AppImage` | ~150 MB | Cualquier distribución, sin instalar nada (solo dale permisos de ejecución) |
| `marktext-linux-x.y.z.deb`      | ~115 MB | Debian, Ubuntu, Mint, Pop!\_OS…                                             |

**Dos avisos importantes:**

1. La rama **0.20.0 está en _release candidate_** (RC): es la que trae el motor nuevo y es la que yo uso.
   Si prefieres algo más conservador, la **última versión estable es la 0.19.1** (junio de 2026). Puedes instalarla desde la misma página buscando ese tag.
2. El proyecto está **activo**: hay versiones nuevas con regularidad.

### 2A. Instalar el .deb (lo que hice yo)

```bash
cd ~/Descargas
sudo apt install ./marktext-linux-*.deb
```

Se instala en `/opt/marktext` y te crea el lanzador en el menú de aplicaciones.

### 2B. O usar el AppImage (sin instalar)

Sino quieres usar la terminal solo dale clic derecho y en la pestaña de propiedades la marcas como ejecutable y luego cierras y le das doble clic y se abre

Y si quieres desde la terminal, ejemplo:

```bash
cd ~/Descargas
chmod +x marktext-linux-*.AppImage
./marktext-linux-*.AppImage
```

Si te gusta así, mueve el archivo a una carpeta fija (`~/Apps`, por ejemplo).

**Un AppImage no se instala**: por diseño es un archivo portable que no crea entrada en el menú, ni icono, ni
asociación de archivos. Eso es una ventaja (lo llevas en un pendrive y funciona), pero si lo quieres en el menú
tienes dos caminos:

1. **A mano** (sin instalar nada): crea `~/.local/share/applications/marktext.desktop` con esto:

   ```ini
   [Desktop Entry]
   Type=Application
   Name=MarkText
   Exec=/home/TU_USUARIO/Apps/marktext.AppImage %U
   Icon=/home/TU_USUARIO/Apps/marktext.png
   Terminal=false
   Categories=Office;TextEditor;
   MimeType=text/markdown;
   ```

El icono lo puedes sacar del propio AppImage con `./marktext.AppImage --appimage-extract`, y copiar el PNG que aparece en `squashfs-root/`.

2. **Con una herramienta**: [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) mueve el
   AppImage a `~/Applications`, extrae el icono y crea la entrada automáticamente. Ojo: **no está en los
   repositorios de Debian ni de Ubuntu** (hay que bajar su `.deb` de su página de releases, y la versión actual
   es un *beta*). **Gear Lever**, que sí está en Flathub, hace lo mismo.

**Si usas el paquete `.deb`, nada de esto te hace falta**: el paquete ya deja la entrada en el menú, el icono y la
asociación de archivos `.md`. Es la vía que yo usé.

### 3. Primeros ajustes que recomiendo

1. **Tema**: Preferencias → _Theme_. El oscuro es cómodo para sesiones largas.
2. **Tipografía y tamaño**: sube un poco el tamaño de fuente y elige una fuente monoespaciada para el código.
3. **Abre una carpeta completa**, no archivos sueltos: `Archivo → Abrir carpeta`. Así tienes el árbol de
   documentos a la izquierda y navegas como en cualquier editor de proyectos.
4. **Mira los atajos**: están en _Preferencias → Keybindings_, se pueden cambiar casi todos. El que más uso:
   `Ctrl + Alt + E` para **exportar a PDF**.
5. **Foco**: si te distraes, activa el modo de enfoque para atenuar el resto del texto.

---

## MarkText en Android: el fork que lo hizo posible

MarkText es de escritorio. Pero el motor de edición (**Muya**) es un componente web independiente, y alguien
construyó sobre él una app para Android:

|                    |                                                |
| ------------------ | ---------------------------------------------- |
| **Repositorio**    | <https://github.com/Renakoni/marktext-android> |
| **Licencia**       | **MIT**                                        |
| **Última versión** | v0.2.1 (agosto de 2026)                        |
| **Descarga**       | `marktext-android-v0.2.1.apk` — **solo 7 MB**  |
| **Tecnología**     | Vue 3 + **Capacitor**                          |

### Cómo instalarlo

1. Ve a la página de **releases**: <https://github.com/Renakoni/marktext-android/releases>
2. Descarga el `.apk` y, si quieres, su `.sha256` para comprobar la integridad.
3. En Android, permite **instalar aplicaciones de origen desconocido** para tu navegador o gestor de archivos.
4. Abre el APK e instala.

### Mi experiencia

Lo probé durante **varias horas seguidas** con documentos reales: abrir, editar, moverme por el texto, cambiar de documento. **Perfecto.** Sin tirones, sin cierres, sin teclado que se atasca. Para escribir Markdown en el móvil es lo mejor que he probado.

**Dos notas honestas:** es un fork de un desarrollador independiente con ~130 estrellas, así que no tiene el respaldo de Obsidian; y no es "MarkText completo" en el teléfono, sino el mismo enfoque de edición adaptado a pantalla táctil. Aun así, funciona.

---

## Conclusión

Si escribes Markdown en Linux y has notado que tu editor se atraganta con documentos largos, pruébalo:

- **Escritorio:** <https://github.com/marktext/marktext/releases>
- **Android:** <https://github.com/Renakoni/marktext-android/releases>

Es **MIT**, se instala en dos minutos y en mi equipo va **al mismo nivel de fluidez que Obsidian**. Y si algo falla, los repositorios están abiertos: se puede reportar y se puede contribuir.

¿Alguien más ha comparado estos editores con documentos grandes? Cuéntame tu experiencia en los comentarios:
me interesa saber si lo que me pasa con VNote le pasa a más gente, o si es algo de mi equipo.
