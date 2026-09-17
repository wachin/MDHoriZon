
Hice la pregunta:

```
Utiliza Context7 para buscar la documentación actual de PyQt6 y explícame cómo funciona QGraphicsView. No modifiques ningún archivo del proyecto.
```

y me responde:

```
MCP Server: context7
Tool: resolve-library-id

Allow execution of MCP tool "resolve-library-id" from server "context7"?

1. Yes, allow once
2. Switch to Default Mode and allow once (recommended)
3. No, suggest changes (esc)

Waiting for user confirmation.
```


y le pongo que si y luego sale:

```
Encontré la documentación oficial de PyOt6 (Riverbank Computing). Ahora consulto sobre
QGraphicsView:

? query-docs (context7 MCP Server)
{"libraryId":"/websites/riverbankcomputing_static_pyqt6","query":"QGraphicsView class: creating
a view, attaching a QGraphicsScene, displaying QGraphicsItem items, coordinate mapping between
scene and view"}

    MCP Server: context7
    Tool: query-docs

Allow execution of MCP tool "query-docs" from server "context7"?

1. Yes, allow once
2. Always allow mcp__context7_query-docs in this project
3. Always allow mcpcontext7_query-docs for this user
4. No, suggest changes (esc)
```

y me responde:

```
◆︎ Listo. Basado en la documentación oficial de PyQt6 (Riverbank Computing, vía Context7), así 
funciona QGraphicsView:

Arquitectura: el patrón Modelo-Vista de Qt Graphics View

QGraphicsView no almacena contenido gráfico; es solo el widget visor de una arquitectura de tres piezas:


┌────────────────┬──────────────────────────────────────────────────────────────────────────┐
│ Clase          │ Rol                                                                      │
├────────────────┼──────────────────────────────────────────────────────────────────────────┤
│ QGraphicsScene │ El modelo: contenedor que gestiona los ítems (QGraphicsItem), maneja     │
│                │ eventos y propagación. No tiene apariencia visual propia.                │
├────────────────┼──────────────────────────────────────────────────────────────────────────┤
│ QGraphicsItem  │ Los elementos: rectángulos, elipses, textos, pixmaps, paths o ítems      │
│                │ personalizados.                                                          │
├────────────────┼──────────────────────────────────────────────────────────────────────────┤
│ QGraphicsView  │ La vista: widget scrollable que renderiza la escena y traduce la         │
│                │ interacción del usuario.                                                 │
└────────────────┴──────────────────────────────────────────────────────────────────────────┘


Uso mínimo (el ejemplo clásico de la documentación):

scene = QGraphicsScene()
scene.addText("Hello, world!")

view = QGraphicsView(scene)   # o: view = QGraphicsView(); view.setScene(scene)
view.show()

El constructor QGraphicsView(scene, parent=None) crea la vista y le asigna la escena directamente.

Sistemas de coordenadas

Hay dos espacios de coordenadas distintos, y la vista proporciona funciones para convertir entre ellos:

- Coordenadas de escena (QPointF, flotantes): el espacio lógico donde viven los ítems.
- Coordenadas de vista/viewport (QPoint, enteras): píxeles del widget, con (0,0) en la esquina 
superior izquierda del viewport.

Funciones clave:

- mapToScene(punto_vista) → convierte de vista a escena
- mapFromScene(punto_escena) → convierte de escena a vista
- items(pos) / itemAt(pos) → obtiene los ítems en una posición del viewport

Ejemplo típico al manejar eventos de ratón:

def mousePressEvent(self, event: QMouseEvent):

    print("Hay", len(self.items(event.position().toPoint())),
          "ítems en", self.mapToScene(event.position().toPoint()))

Esto es esencial cuando la vista tiene zoom o rotación aplicados, porque la posición del cursor ya no coincide 1:1 con la escena.

Transformaciones: zoom, rotación, desplazamiento

La vista aplica una matriz de transformación (QTransform) sobre la escena:

- scale(sx, sy) — escala la transformación actual (zoom). Factores > 1 acercan, < 1 alejan.
- rotate(angulo), translate(dx, dy), shear(sh, sv)
- setTransform(t) / transform() — reemplazar u obtener la matriz completa
- viewportTransform() — la matriz escena→viewport; útil para cálculos avanzados (p. ej. 
item.deviceTransform(view.viewportTransform()))

view.scale(1.25, 1.25)   # zoom in
view.scale(0.8, 0.8)     # zoom out

Calidad de renderizado

QGraphicsView expone los mismos hints que QPainter:

view.setRenderHint(QPainter.RenderHint.Antialiasing)
view.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform)

- setRenderHint(hint, on=True) / setRenderHints(hints, on=True) — activar/desactivar
- renderHints() — consultar los hints actuales

Ojo: en PyQt6 los enums son scoped, así que es QPainter.RenderHint.Antialiasing, no QPainter.Antialiasing como en PyQt5.

Interacción personalizada

Dos vías:

1. Modos integrados: setDragMode(QGraphicsView.DragMode.ScrollHandDrag) activa el 
desplazamiento con la mano; RubberBandDrag permite selección por arrastre.
2. Subclase de QGraphicsView: reimplementar mousePressEvent, mouseMoveEvent, keyPressEvent, 
etc. para interacción a medida (es lo que hace ksnip para dibujar anotaciones). La documentación recomienda combinar esto con mapToScene()/mapFromScene() y items()/itemAt() para interactuar con los ítems usando coordenadas del viewport.

Relevancia para este proyecto

ksnip usa exactamente este patrón: la captura de pantalla es un pixmap en una QGraphicsScene, las anotaciones son QGraphicsItem con coordenadas de escena, y el zoom con Ctrl+rueda (commit reciente 20dad559) se implementa con scale() sobre la vista — por eso el mapeo de coordenadas es crítico para que las anotaciones queden donde el usuario hace clic aunque el zoom cambie.

No modifiqué ningún archivo, solo consulté la documentación.
```

