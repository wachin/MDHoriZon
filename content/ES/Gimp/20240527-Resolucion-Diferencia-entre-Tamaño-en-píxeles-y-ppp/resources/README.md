# Recursos del manual: diagramas px vs ppp

Este script fue **creado por [Freebuff](https://freebuff.com)** (freebuff.com), el asistente de programación con IA.

## ¿Qué es `generar_diagramas.py`?

Es un script en Python que genera, de forma automática y reproducible, los **7 diagramas didácticos** que acompañan al manual *GIMP: Resolución — Diferencia entre Tamaño en píxeles y ppp*. Todos comparten la misma paleta de colores cálida y el mismo estilo, para que el manual tenga una imagen visual coherente.

Cada diagrama se guarda **en dos formatos**:

| Formato | Carpeta | Uso |
|---------|---------|-----|
| `.png` | `../images/` | Listos para incrustar en el manual |
| `.svg` | `resources/` (esta carpeta) | **Vectoriales, para personalizar con Inkscape** |

## Diagramas que genera

| Archivo | Contenido |
|---------|-----------|
| `diagrama_lego` | La analogía central: los px son tus piezas, el ppp es cómo las aprietas |
| `diagrama_misma_imagen_distinta_impresion` | El ejemplo de los 3000 px: misma imagen, distinto tamaño impreso |
| `diagrama_escalar_ventana` | La ventana «Escalar la imagen» de GIMP, traducida y explicada |
| `diagrama_zoom_vs_calidad` | El zoom no cambia tu imagen ni su calidad de impresión |
| `diagrama_ruta_windows_vs_gimp` | Equivalencias entre lo que hacías en Windows y cómo se hace en GIMP/Linux |
| `diagrama_decisor` | ¿Para pantalla o para papel? La única pregunta que necesitas hacerte |
| `diagrama_iconos_linux` | Por qué Linux guarda varios tamaños del mismo icono |

## Cómo usarlo

### Requisitos

- Python 3
- Las librerías `matplotlib` y `numpy`:

```bash
pip install matplotlib numpy
```

### Ejecución

Desde la carpeta raíz del proyecto (o desde cualquier sitio, el script resuelve sus rutas solo):

```bash
python3 resources/generar_diagramas.py
```

Verás una línea `OK <ruta>` por cada archivo generado. En total produce **14 archivos**: 7 PNG en `images/` y 7 SVG en `resources/`.

> ⚠️ Ojo: al ejecutarlo, los SVG se **regeneran desde cero**, así que si los habías personalizado con Inkscape y guardas los cambios en el mismo archivo, se perderán. Guarda tus versiones editadas con otro nombre (por ejemplo `diagrama_lego_editado.svg`) o en otra carpeta.

## Personalizar los diagramas con Inkscape

Los SVG son vectoriales: puedes abrirlos con [Inkscape](https://inkscape.org) y cambiar textos, colores, mover elementos, etc.

1. Abre el SVG con Inkscape (`Archivo → Abrir`).
2. Haz tus ajustes (el texto es texto real, no curvas, así que es editable).
3. Guarda tu versión personalizada **con otro nombre** para no perderla la próxima vez que se ejecute el script.
4. Si quieres que el manual use tu versión, exporta a PNG (`Archivo → Exportar a PNG`) con una escala suficiente (2× o 300 ppp) y colócala en `images/` con el nombre del PNG original.

## Modificar el script

- La **paleta de colores** está al principio del archivo (variables `BG`, `INK`, `BLUE`, `ORANGE`, `GREEN`, etc.).
- Cada diagrama es una función independiente (`diag_lego()`, `diag_decisor()`, …) que puedes ajustar por separado.
- El bloque final `if __name__ == "__main__":` controla qué diagramas se generan y en qué orden.
