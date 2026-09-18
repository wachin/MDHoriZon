#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera los diagramas didácticos del manual GIMP (px vs ppp).
Guarda cada diagrama en dos formatos:
  - .png  → en ../images/  (listos para incrustar en el manual)
  - .svg  → en ./          (vectoriales, para retocarlos con Inkscape)
"""
import os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from matplotlib.colors import to_rgb

# El script vive en resources/: los PNG van a images/ y los SVG se quedan aquí
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PNG_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "images"))
SVG_DIR = BASE_DIR
os.makedirs(PNG_DIR, exist_ok=True)

# ---------- Paleta ----------
BG = "#FBF9F4"        # papel cálido
INK = "#2F2A25"       # texto principal
BLUE = "#4A78C2"      # mundo digital (px)
BLUE_L = "#DCE7F5"
ORANGE = "#E8863A"    # mundo físico (papel)
ORANGE_L = "#FBE6D4"
GREEN = "#4E8F63"
GREEN_L = "#E3EFE7"
RED = "#C4544F"
GRAY = "#8A857E"
GRAY_L = "#EFECE6"
DARK = "#33302B"

plt.rcParams["font.family"] = "DejaVu Sans"


def new_ax(w, h):
    """Figura con coordenadas cuadradas: xlim 0-100, ylim 0-100*h/w."""
    fig, ax = plt.subplots(figsize=(w, h))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100 * h / w)
    ax.set_aspect("equal")
    ax.axis("off")
    fig.patch.set_facecolor(BG)
    return fig, ax


def box(ax, x, y, w, h, fc=GRAY_L, ec=INK, lw=1.4, r=0.8, z=2):
    b = FancyBboxPatch((x, y), w, h,
                       boxstyle=f"round,pad=0,rounding_size={r}",
                       fc=fc, ec=ec, lw=lw, zorder=z)
    ax.add_patch(b)
    return b


def txt(ax, x, y, s, size=10, color=INK, weight="normal", ha="center",
        va="center", z=5, style="normal", lh=1.25):
    return ax.text(x, y, s, fontsize=size, color=color, fontweight=weight,
                   ha=ha, va=va, zorder=z, style=style, linespacing=lh)


def arrow(ax, x1, y1, x2, y2, color=INK, lw=2.2, style="-|>", ms=16, z=4):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle=style, color=color, lw=lw,
                                mutation_scale=ms),
                zorder=z)


def banner(ax, y, h, s, size=10.5, fc=BLUE_L, ec=BLUE, color=INK, weight="bold"):
    box(ax, 3, y, 94, h, fc=fc, ec=ec, lw=1.4)
    txt(ax, 50, y + h / 2, s, size=size, color=color, weight=weight)


def title(ax, s, y=None, size=16):
    ylim = ax.get_ylim()[1]
    txt(ax, 50, y if y is not None else ylim - 3.5, s, size=size, weight="bold")


def save(fig, name):
    """Guarda el diagrama en PNG (para el manual) y en SVG (para Inkscape)."""
    base, _ = os.path.splitext(name)
    outputs = []
    for directory, ext, kwargs in ((PNG_DIR, ".png", dict(dpi=160)),
                                   (SVG_DIR, ".svg", {})):
        path = os.path.join(directory, base + ext)
        fig.savefig(path, facecolor=BG, bbox_inches="tight", pad_inches=0.22,
                    **kwargs)
        outputs.append(path)
    plt.close(fig)
    for path in outputs:
        print("OK", path)


def smiley(n):
    """Matriz n×n×3 con una carita pixel-art."""
    img = np.ones((n, n, 3), dtype=float)
    yy, xx = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2.0
    r = np.hypot(xx - c, yy - c) / (n / 2.0)
    face = r <= 0.92
    img[face] = to_rgb("#F7D154")
    eye = ((np.hypot(xx - 0.33 * n, yy - 0.62 * n) < 0.085 * n) |
           (np.hypot(xx - 0.67 * n, yy - 0.62 * n) < 0.085 * n))
    mouth = (r > 0.40) & (r < 0.55) & (yy < 0.45 * n)
    img[eye | mouth] = to_rgb(DARK)
    return img


def show_pixel_art(ax, img, x0, y0, w, grid=True):
    """Dibuja la matriz como cuadritos nítidos de ancho w."""
    n = img.shape[0]
    h = w
    ax.imshow(img, extent=(x0, x0 + w, y0, y0 + h), interpolation="nearest",
              zorder=3, aspect="auto")
    if grid:
        for i in range(n + 1):
            x = x0 + i * w / n
            y = y0 + i * h / n
            ax.plot([x, x], [y0, y0 + h], color="white", lw=0.7,
                    alpha=0.55, zorder=4)
            ax.plot([x0, x0 + w], [y, y], color="white", lw=0.7,
                    alpha=0.55, zorder=4)
    box(ax, x0, y0, w, h, fc="none", ec=INK, lw=1.6, r=0.3, z=5)


# =====================================================================
# 1) diagrama_lego.png — la analogía central
# =====================================================================
def diag_lego():
    fig, ax = new_ax(11.5, 6.4)
    ytop = ax.get_ylim()[1]          # 55.6
    title(ax, "La analogía central: los px son tus piezas, el ppp es cómo las aprietas",
          y=ytop - 3)

    # --- impresión a 300 ppp (mitad de tamaño) ---
    bx, by, bw, bh = 8, 13, 23, 17
    box(ax, bx, by, bw, bh, fc=ORANGE_L, ec=ORANGE, lw=2)
    cols, rows = 20, 14
    gx = bw / (cols + 1.5)
    gy = bh / (rows + 1.5)
    s = min(gx, gy) * 0.72
    for i in range(cols):
        for j in range(rows):
            ax.add_patch(plt.Rectangle(
                (bx + gx * 0.75 + i * gx, by + gy * 0.75 + j * gy),
                s, s, fc=BLUE, ec="none", alpha=0.85, zorder=3))
    txt(ax, bx + bw / 2, by + bh + 5.2, "Impresión a 300 ppp",
        size=12, weight="bold", color=GREEN)
    txt(ax, bx + bw / 2, by + bh + 2.2, "cuadritos MUY apretados",
        size=10, color=INK)
    arrow(ax, bx, by - 3.2, bx + bw, by - 3.2, color=ORANGE)
    txt(ax, bx + bw / 2, by - 5.6, "≈ 10 cm de papel", size=10, color=ORANGE,
        weight="bold")

    # --- impresión a 150 ppp (el doble) ---
    bx2, by2, bw2, bh2 = 47, 13, 46, 34
    box(ax, bx2, by2, bw2, bh2, fc=ORANGE_L, ec=ORANGE, lw=2)
    gx2 = bw2 / (cols + 1.5)
    gy2 = bh2 / (rows + 1.5)
    s2 = min(gx2, gy2) * 0.72
    for i in range(cols):
        for j in range(rows):
            ax.add_patch(plt.Rectangle(
                (bx2 + gx2 * 0.75 + i * gx2, by2 + gy2 * 0.75 + j * gy2),
                s2, s2, fc=BLUE, ec="none", alpha=0.85, zorder=3))
    txt(ax, bx2 + bw2 / 2, by2 + bh2 + 5.2, "Impresión a 150 ppp",
        size=12, weight="bold", color=ORANGE)
    txt(ax, bx2 + bw2 / 2, by2 + bh2 + 2.2, "cuadritos más separados",
        size=10, color=INK)
    arrow(ax, bx2, by2 - 3.2, bx2 + bw2, by2 - 3.2, color=ORANGE)
    txt(ax, bx2 + bw2 / 2, by2 - 5.6, "≈ 20 cm de papel (el doble)",
        size=10, color=ORANGE, weight="bold")

    # --- mensaje central ---
    txt(ax, 39, 44, "MISMA imagen digital:\n20 × 14 = 280 px\nen las dos",
        size=10.5, weight="bold", color=BLUE)
    arrow(ax, 39, 41, 32, 33, color=BLUE, lw=1.6)
    arrow(ax, 42.5, 41, 47, 36, color=BLUE, lw=1.6)

    banner(ax, 1, 5.5,
           "px = cuántos cuadritos tienes (NO cambia)  ·  "
           "ppp = qué tan apretados van al papel (cambia el tamaño impreso)",
           size=10.5)
    save(fig, "diagrama_lego.png")


# =====================================================================
# 2) diagrama_misma_imagen_distinta_impresion.png — los 3000 px
# =====================================================================
def diag_misma_imagen():
    fig, ax = new_ax(12, 5.8)
    ytop = ax.get_ylim()[1]          # 48.3
    title(ax, "Misma imagen, distinta impresión: el ejemplo de los 3000 px",
          y=ytop - 2.6)

    # imagen digital
    bx, by, bw, bh = 3, 8, 27, 27
    box(ax, bx, by, bw, bh, fc=BLUE_L, ec=BLUE, lw=2.2)
    cols, rows = 15, 8
    gx = (bw - 4) / cols
    gy = (bh - 4) / rows
    s = min(gx, gy) * 0.7
    for i in range(cols):
        for j in range(rows):
            ax.add_patch(plt.Rectangle(
                (bx + 2 + i * gx, by + 2 + j * gy), s, s,
                fc=BLUE, ec="none", alpha=0.85, zorder=3))
    txt(ax, bx + bw / 2, by + bh + 6.5, "IMAGEN DIGITAL", size=11.5,
        weight="bold", color=BLUE)
    txt(ax, bx + bw / 2, by + bh + 3.4, "3000 px de ancho (siempre la misma)",
        size=10)
    txt(ax, bx + bw / 2, by + 1.6, "3000 px", size=10, weight="bold",
        color=BLUE)

    txt(ax, 50, 45, "cm en el papel = px ÷ ppp × 2.54", size=11,
        weight="bold", color=GREEN)

    datos = [
        (30.5, 12.5, "72 ppp", "105.8 cm de ancho (¡como un camión!)"),
        (19.5, 9.5, "150 ppp", "50.8 cm de ancho"),
        (8.0, 7.5, "300 ppp", "25.4 cm de ancho"),
    ]
    for y, h, ppp, res in datos:
        box(ax, 55, y, 42, h, fc=ORANGE_L, ec=ORANGE, lw=1.6)
        txt(ax, 58.5, y + h / 2, ppp, size=11.5, weight="bold", color=ORANGE,
            ha="left")
        txt(ax, 67.5, y + h / 2, res, size=10.5, ha="left")
        arrow(ax, 30.8, 21.5, 54.4, y + h / 2, color=GRAY, lw=1.6)

    banner(ax, 0.8, 5.2,
           "La imagen NO cambió (3000 px en todos los casos): "
           "lo único que cambia es cuánto papel ocupa.")
    save(fig, "diagrama_misma_imagen_distinta_impresion.png")


# =====================================================================
# 3) diagrama_escalar_ventana.png — la ventana Escalar la imagen
# =====================================================================
def diag_escalar():
    fig, ax = new_ax(10.5, 6.8)
    ytop = ax.get_ylim()[1]          # 64.8
    title(ax, "La ventana «Escalar la imagen», traducida", y=ytop - 2.8)

    # diálogo
    dx, dy, dw, dh = 4, 10, 52, 50
    box(ax, dx, dy, dw, dh, fc="white", ec=INK, lw=1.8, r=1.0)
    box(ax, dx, dy + dh - 4, dw, 4, fc=GRAY_L, ec=INK, lw=1.4, r=1.0)
    txt(ax, dx + 2, dy + dh - 2, "Escalar la imagen", size=10.5,
        weight="bold", ha="left")
    txt(ax, dx + dw - 2.5, dy + dh - 2, "✕", size=10, color=GRAY)

    def fila(y, etiqueta, valor, unidad):
        txt(ax, dx + 2.5, y, etiqueta, size=10, ha="left")
        box(ax, dx + 15, y - 2.6, 14, 5.2, fc="white", ec=GRAY, lw=1.2, r=0.5)
        txt(ax, dx + 16.5, y, valor, size=10.5, ha="left", weight="bold")
        box(ax, dx + 30.5, y - 2.6, 17, 5.2, fc="white", ec=GRAY, lw=1.2, r=0.5)
        txt(ax, dx + 32, y, unidad, size=9, ha="left", color=DARK)

    txt(ax, dx + 2.5, 51, "Tamaño de la imagen", size=10, weight="bold",
        ha="left", color=BLUE)
    fila(45.5, "Anchura:", "1200", "px  ▼")
    fila(38.5, "Altura:", "900", "px  ▼")
    # icono de cadena
    ax.plot([dx + 12.2, dx + 12.2], [40.2, 43.8], color=GRAY, lw=3,
            solid_capstyle="round", zorder=4)
    ax.add_patch(plt.Circle((dx + 12.2, 44.4), 1.1, fc="none", ec=GRAY,
                            lw=2.2, zorder=4))
    ax.add_patch(plt.Circle((dx + 12.2, 39.6), 1.1, fc="none", ec=GRAY,
                            lw=2.2, zorder=4))

    txt(ax, dx + 2.5, 29.5, "Resolución (Opciones avanzadas)", size=10,
        weight="bold", ha="left", color=ORANGE)
    fila(23.5, "Resolución X:", "11.81", "pixeles/mm  ▼")
    fila(16.5, "Resolución Y:", "11.81", "pixeles/mm  ▼")

    # llamadas
    box(ax, 61, 34, 36, 14, fc=GREEN_L, ec=GREEN, lw=1.8)
    txt(ax, 79, 41, "TAMAÑO (px)", size=11, weight="bold", color=GREEN)
    txt(ax, 79, 37.2, "Cambiar esto SÍ cambia la imagen\n(pantalla y archivo)",
        size=9.5)
    arrow(ax, 60.5, 41, 57, 42, color=GREEN)

    box(ax, 61, 12, 36, 16, fc=ORANGE_L, ec=ORANGE, lw=1.8)
    txt(ax, 79, 23, "DENSIDAD (= 300 ppp)", size=11, weight="bold",
        color=ORANGE)
    txt(ax, 79, 17.5, "Cambiar esto NO cambia la imagen:\nsolo el tamaño "
        "en el papel", size=9.5)
    arrow(ax, 60.5, 20, 57, 20, color=ORANGE)

    banner(ax, 1.5, 5.5,
           "Regla rápida: lo de ARRIBA (px) es para pantalla  ·  "
           "lo de ABAJO (pixeles/…) es para impresión", size=10.5)
    save(fig, "diagrama_escalar_ventana.png")


# =====================================================================
# 4) diagrama_zoom_vs_calidad.png — el zoom no cambia la imagen
# =====================================================================
def diag_zoom():
    fig, ax = new_ax(12, 5.6)
    ytop = ax.get_ylim()[1]          # 46.7
    title(ax, "El zoom NO cambia tu imagen (ni su calidad de impresión)",
          y=ytop - 2.6)

    img = smiley(24)

    # zoom 100 %
    show_pixel_art(ax, img, 8, 9, 7, grid=False)
    txt(ax, 11.5, 22, "Zoom 100 %", size=11.5, weight="bold")
    txt(ax, 11.5, 5.6, "se ve pequeña y nítida", size=9.5, color=GRAY)

    arrow(ax, 19, 14.5, 36, 14.5, color=BLUE)
    txt(ax, 27.5, 17.5, "acercar la vista", size=10, color=BLUE,
        weight="bold")

    # zoom 800 %
    show_pixel_art(ax, img, 40, 4, 30, grid=True)
    txt(ax, 55, 39.5, "Zoom 800 %", size=11.5, weight="bold")
    txt(ax, 55, 36.4, "los cuadritos SE AGRANDAN en tu pantalla",
        size=9.5, color=GRAY)

    banner(ax, 0.8, 5.2,
           "El zoom solo agranda los cuadritos en pantalla: los px del "
           "archivo, su peso y la impresión no cambian nada.", size=10.5)
    save(fig, "diagrama_zoom_vs_calidad.png")


# =====================================================================
# 5) diagrama_ruta_windows_vs_gimp.png — traducción Windows → GIMP
# =====================================================================
def diag_windows_gimp():
    fig, ax = new_ax(12.5, 6.8)
    ytop = ax.get_ylim()[1]          # 54.4
    title(ax, "Veniste de Windows: es el mismo conocimiento, solo cambió de nombre",
          y=ytop - 2.6)

    box(ax, 6, 45.5, 38, 6, fc=BLUE_L, ec=BLUE, lw=1.8)
    txt(ax, 25, 48.5, "Antes, en WINDOWS", size=12, weight="bold", color=BLUE)
    box(ax, 56, 45.5, 38, 6, fc=ORANGE_L, ec=ORANGE, lw=1.8)
    txt(ax, 75, 48.5, "Ahora, en GIMP (Linux)", size=12, weight="bold",
        color=ORANGE)

    filas = [
        ("Clic derecho → Propiedades → Detalles:\nver el tamaño en píxeles",
         "Imagen → Propiedades de la imagen:\nver el tamaño en píxeles"),
        ("Paint → Cambiar tamaño\n(opción «Píxeles»)",
         "Imagen → Escalar la imagen…"),
        ("«Resolución horizontal: 300 dpi»\n(dato guardado dentro del JPEG)",
         "Resolución X / Y\n(300 pixeles/in = 300 ppp)"),
        ("Aplicación Fotos → botón Imprimir",
         "Archivo → Imprimir… (cm + ppp)"),
    ]
    for i, (l, r) in enumerate(filas):
        cy = 39.5 - i * 9.6
        box(ax, 6, cy - 3.6, 38, 7.2, fc="white", ec=BLUE, lw=1.4)
        txt(ax, 25, cy, l, size=9.3)
        box(ax, 56, cy - 3.6, 38, 7.2, fc="white", ec=ORANGE, lw=1.4)
        txt(ax, 75, cy, r, size=9.3)
        arrow(ax, 45, cy, 55, cy, color=GRAY, lw=1.8)

    banner(ax, 0.8, 5.2,
           "No tuviste que aprender algo nuevo: solo cambian el nombre y "
           "el lugar de cada cosa.", size=10.5, fc=GREEN_L, ec=GREEN)
    save(fig, "diagrama_ruta_windows_vs_gimp.png")


# =====================================================================
# 6) diagrama_decisor.png — ¿pantalla o papel?
# =====================================================================
def diag_decisor():
    fig, ax = new_ax(10, 6.8)
    ytop = ax.get_ylim()[1]          # 68
    title(ax, "La única pregunta que necesitas hacerte", y=ytop - 3)

    box(ax, 30, 56, 40, 8, fc="white", ec=INK, lw=2)
    txt(ax, 50, 60, "¿Para qué es tu imagen?", size=13, weight="bold")

    arrow(ax, 38, 55.4, 25, 47.5, color=BLUE, lw=2)
    arrow(ax, 62, 55.4, 75, 47.5, color=ORANGE, lw=2)
    txt(ax, 22, 52, "para VERLA\nen pantalla", size=10, color=BLUE,
        weight="bold")
    txt(ax, 79, 52, "para IMPRIMIRLA\nen papel", size=10, color=ORANGE,
        weight="bold")

    box(ax, 4, 24, 42, 22, fc=BLUE_L, ec=BLUE, lw=2)
    txt(ax, 25, 41.5, "Piensa solo en PX", size=12.5, weight="bold",
        color=BLUE)
    txt(ax, 25, 32.5, "• web, redes, avatar, iconos\n"
        "• cuenta cuadritos: 1080 × 1080\n"
        "• el ppp aquí no afecta nada", size=10)

    box(ax, 54, 24, 42, 22, fc=ORANGE_L, ec=ORANGE, lw=2)
    txt(ax, 75, 41.5, "Piensa en CM + PPP", size=12.5, weight="bold",
        color=ORANGE)
    txt(ax, 75, 32.5, "• fotos, folletos, carteles\n"
        "• 300 ppp = 11.81 pixeles/mm\n"
        "• cm = px ÷ ppp × 2.54", size=10)

    box(ax, 17, 6, 66, 11, fc=GREEN_L, ec=GREEN, lw=1.8)
    txt(ax, 50, 11.5, "¿Dudas? Hazla GRANDE en px.", size=11.5,
        weight="bold", color=GREEN)
    txt(ax, 50, 8.2, "Sobra calidad al imprimir; la que falta, no se puede "
        "arreglar.", size=10)
    save(fig, "diagrama_decisor.png")


# =====================================================================
# 7) diagrama_iconos_linux.png — iconos a tamaño real
# =====================================================================
def diag_iconos():
    fig, ax = new_ax(11.5, 6.2)
    ytop = ax.get_ylim()[1]          # 53.9
    title(ax, "En pantalla manda el px: por qué Linux guarda varios tamaños "
          "del mismo icono", y=ytop - 2.6)

    img = None
    paneles = [
        (18, 3, 16, "16 × 16 px", "lista de archivos"),
        (50, 9, 48, "48 × 48 px", "barra lateral y menús"),
        (82, 27, 256, "256 × 256 px", "vistas de iconos grandes"),
    ]
    for cx, disp, n, titulo, uso in paneles:
        img = smiley(min(n, 256))
        y0 = 12
        show_pixel_art(ax, img, cx - disp / 2, y0, disp, grid=(n >= 48))
        txt(ax, cx, y0 + disp + 4.5, titulo, size=11.5, weight="bold")
        txt(ax, cx, 7.5, uso, size=9.5, color=GRAY)
        txt(ax, cx, 4.6, "mismo ppp", size=8.5, color=GREEN, weight="bold")

    banner(ax, 44, 5.2,
           "El sistema elige el tamaño que necesita en cada sitio: por eso "
           "existen las carpetas 16×16, 48×48, 256×256…", size=10.5)
    save(fig, "diagrama_iconos_linux.png")


if __name__ == "__main__":
    diag_lego()
    diag_misma_imagen()
    diag_escalar()
    diag_zoom()
    diag_windows_gimp()
    diag_decisor()
    diag_iconos()
    print("Listo: 7 diagramas generados en PNG y SVG.")
