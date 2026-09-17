# Los 3 Mejores Packs de Iconos Gratuitos para Aplicaciones PyQt6 en Linux, Windows y macOS

Cuando desarrollamos aplicaciones modernas en PyQt6, uno de los aspectos más importantes es la consistencia visual. Un buen conjunto de iconos puede hacer que nuestra aplicación se vea más profesional, más intuitiva y más agradable para el usuario.

Después de investigar las opciones disponibles, estas son las tres bibliotecas de iconos que más recomiendo para proyectos de escritorio multiplataforma.

---

# 1. Tabler Icons

[https://tabler.io/icons](https://tabler.io/icons)

## ¿Qué es Tabler Icons?

Tabler Icons es una colección de más de 6000 iconos SVG gratuitos y de código abierto. Todos los iconos están diseñados siguiendo una cuadrícula uniforme de 24×24 píxeles y mantienen el mismo grosor de línea, lo que les da una apariencia muy consistente. Además, están publicados bajo licencia MIT, compatible con proyectos GPL, LGPL, BSD, MIT y con los repositorios oficiales de Debian.

## Ventajas

* Más de 6000 iconos SVG.
* Licencia MIT.
* Uso personal y comercial.
* Excelente para interfaces oscuras.
* Muy fácil de integrar en PyQt6.
* Gran cobertura temática.

## Ideal para

* Gestores de notas tipo Obsidian.
* Programas de contabilidad.
* Aplicaciones bíblicas.
* Editores Markdown.
* Herramientas para Linux.

---

# 2. Lucide

[https://lucide.dev](https://lucide.dev)

## ¿Qué es Lucide?

Lucide es una biblioteca de iconos de código abierto mantenida por la comunidad. Se caracteriza por ofrecer un diseño extremadamente limpio, ligero y consistente. Los iconos están optimizados como SVG escalables y pueden personalizarse fácilmente en tamaño, color y grosor. El proyecto nació como una evolución de Feather Icons y actualmente cuenta con más de 1700 iconos.

## Ventajas

* Diseño minimalista.
* Excelente legibilidad.
* Muy consistente visualmente.
* Licencia abierta.
* Muy popular entre desarrolladores modernos.

## Ideal para

* Aplicaciones de productividad.
* Gestores de tareas.
* Herramientas para programadores.
* Aplicaciones estilo Notion u Obsidian.

---

# 3. Phosphor Icons

[https://phosphoricons.com](https://phosphoricons.com)

## ¿Qué es Phosphor Icons?

Phosphor es una familia de iconos extremadamente flexible. Su principal característica es que cada icono suele estar disponible en varios estilos: Thin, Light, Regular, Bold, Fill y Duotone. Esto permite adaptar la apariencia visual de toda una aplicación sin cambiar de biblioteca. Actualmente cuenta con miles de iconos y licencia MIT.

## Ventajas

* Múltiples grosores y estilos.
* Versiones rellenas y contorneadas.
* Excelente para interfaces modernas.
* Gran cantidad de iconos.
* Muy versátil.

## Ideal para

* Suites de oficina.
* Aplicaciones empresariales.
* Dashboards.
* Herramientas profesionales.

---

# ¿Cuál elegir?

Si tuviera que elegir una sola biblioteca para todos mis proyectos PyQt6, elegiría:

1. Tabler Icons
2. Lucide
3. Phosphor Icons

Tabler Icons ofrece actualmente la colección más amplia y completa, mientras que Lucide destaca por su elegancia y Phosphor por su flexibilidad.

---

# Cómo usar estos iconos en proyectos PyQt6

Lo más recomendable es descargar los iconos SVG y almacenarlos dentro de los recursos Qt.

Ejemplo de estructura:

```
resources/
├── icons/
│   ├── folder.svg
│   ├── save.svg
│   ├── settings.svg
│   └── search.svg
└── resources.qrc
```

Archivo `resources.qrc`:

```xml
<RCC>
    <qresource prefix="/">
        <file>icons/folder.svg</file>
        <file>icons/save.svg</file>
        <file>icons/settings.svg</file>
    </qresource>
</RCC>
```

Compilar los recursos:

```bash
pyrcc6 resources.qrc -o resources_rc.py
```

Utilizar un icono:

```python
from PyQt6.QtGui import QIcon

boton.setIcon(QIcon(":/icons/save.svg"))
```

También es posible cambiar el color de los SVG dinámicamente mediante hojas de estilo o procesándolos antes de cargarlos.

---

# Conclusión

Si estás desarrollando aplicaciones modernas con PyQt6, Tabler Icons, Lucide y Phosphor Icons son actualmente tres de las mejores opciones disponibles. Son gratuitos, de código abierto, compatibles con Linux, Windows y macOS, y pueden utilizarse sin problemas en proyectos distribuidos mediante GitHub, paquetes Debian, Flatpak, AppImage o instaladores para Windows.

Un buen conjunto de iconos no solo mejora la apariencia de una aplicación, sino que también mejora la experiencia del usuario y transmite una sensación de profesionalismo desde el primer momento.
