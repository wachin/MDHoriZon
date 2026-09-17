# Prueba de cajas de código

Este párrafo contiene un `código en línea` para comparar con las cajas.

```bash
sudo apt install kate \
         dolphin krusader
```

Un bloque sin lenguaje declarado:

```
pkg install python pandoc pango
python3 -m pip install weasyprint
weasyprint --version
```

Y un bloque con líneas largas para comprobar el ajuste de texto:

```sh
pandoc informe.md --standalone --from=gfm --metadata lang=es --css=estilo-pdf-editor.css --pdf-engine=weasyprint -o informe.pdf
```
