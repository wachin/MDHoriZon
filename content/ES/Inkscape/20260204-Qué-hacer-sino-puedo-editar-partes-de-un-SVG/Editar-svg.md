# ¿Por qué no podía editar partes de un archivo SVG? (Y cómo solucionarlo)

Puede ocurrir que cuando descargamos un archivo **SVG**, a veces ocurre algo extraño: -> vemos el dibujo, pero **no podemos editar partes internas**, como teclas, formas o textos.

Eso no es un error del programa. Es por cómo fue construido el SVG.

---

## El problema: el SVG usa “plantillas internas”

Muchos SVG usan esta estructura:

-   `<defs>` → guarda dibujos como plantillas
-   `<use href="#algo">` → coloca una copia de esa plantilla en el documento

Es como un **sello** o **molde**.

Ejemplo simple:

> Dibujas un teclado una sola vez, y luego el archivo lo “reutiliza” muchas veces.

### ¿Qué pasa entonces?

El editor ve eso como un **objeto enlazado**, no como un dibujo independiente. Por eso:

-   No puedes editar una tecla específica
-   No puedes borrar una forma interna
-   No puedes cambiar textos dentro del teclado

Porque en realidad **no están ahí directamente**.

---

## Solución en Inkscape

haz esto:

### ✅ Pasos

1.  Abre el archivo SVG.
2.  Haz clic sobre el objeto que no puedes editar (por ejemplo, un teclado).
3.  Ve al menú:

```
Edición → Clonar → Desvincular clon
```

_(En inglés: **Edit → Clone → Unlink Clone**)_

1.  Luego presiona varias veces:

```
Shift + Ctrl + G
```

Eso es **Desagrupar**.

Hazlo hasta que las piezas se separen:

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_UUovRhgeDzDmA8sDZxMJkw_BrpgYykeWVOV-KrK5CorjweJKZAKFmGJ-4ityP_oJcQr-Cil0CV8wAzbg-Ce93zfqOE_v3cKWPAqAHm_PdqSxu8avYXxgQnb8PkDiRlmCrAxA8MtO70CkZtNPf7gWVHFfCDMGFfrAi_idbeNSvtY1qb42-LsRZ0MuneI/s16000-rw/Inkscape,%20Edici%C3%B3n%20-%20Clonar%20-%20Desconectar%20clones%20recursivamente.png "Inkscape, Edición - Clonar - Desconectar clones recursivamente")](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_UUovRhgeDzDmA8sDZxMJkw_BrpgYykeWVOV-KrK5CorjweJKZAKFmGJ-4ityP_oJcQr-Cil0CV8wAzbg-Ce93zfqOE_v3cKWPAqAHm_PdqSxu8avYXxgQnb8PkDiRlmCrAxA8MtO70CkZtNPf7gWVHFfCDMGFfrAi_idbeNSvtY1qb42-LsRZ0MuneI/s790/Inkscape,%20Edici%C3%B3n%20-%20Clonar%20-%20Desconectar%20clones%20recursivamente.png)
