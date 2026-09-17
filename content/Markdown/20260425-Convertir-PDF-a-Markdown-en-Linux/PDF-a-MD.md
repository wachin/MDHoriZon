
# Manual para convertir PDF a Markdown en MX Linux 23 (Debian 12)

Usando los paquetes instalados (`pandoc`, `poppler-utils`, `python3-pypdf2`), puedes convertir un PDF a Markdown manualmente. La conversión extrae el texto del PDF y lo guarda como archivo Markdown (que es texto plano con posibles elementos de formato básico). Nota: Los PDFs con imágenes o layouts complejos no se convertirán perfectamente; solo se extrae el texto.

#### Opción 1: Usando `pdftotext` (recomendado para simplicidad)
`pdftotext` de `poppler-utils` extrae el texto preservando algo de layout.

1. Abre una terminal.
2. Navega al directorio donde está el PDF: `cd /ruta/al/directorio`
3. Ejecuta: 

```bash
pdftotext -layout input.pdf output.md
```

   - Reemplaza `input.pdf` con el nombre de tu PDF y `output.md` por el nombre que desees que tenga.
   - `-layout` mantiene algo de estructura (espacios, saltos de línea).
4. El archivo output.md se crea con el texto extraído. Ábrelo en un editor para verificar/ajustar.

Ejemplo: `pdftotext -layout documento.pdf documento.md`

#### Opción 2: Usando Python con `PyPDF2` (para más control)
`python3-pypdf2` permite extraer texto vía script Python.

1. Crea un script Python, por ejemplo `convert_pdf.py`:

```python
import PyPDF2

def pdf_to_md(pdf_path, md_path):
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ''
        for page in pdf_reader.pages:
            text += page.extract_text() + '\n'
        with open(md_path, 'w') as md_file:
            md_file.write(text)

# Uso: pdf_to_md('input.pdf', 'output.md')
pdf_to_md('input.pdf', 'output.md')
```
   
2. En terminal: `python3 convert_pdf.py`
3. El archivo output.md se crea. Edítalo si necesitas agregar formato Markdown (como `#` para títulos).

#### Notas adicionales
- Si el PDF tiene OCR o texto incrustado, funciona mejor.
- Para PDFs escaneados, usa herramientas como `tesseract` (instala con `sudo apt install tesseract-ocr`), pero requiere más pasos.
- Si necesitas formato Markdown avanzado (tablas, enlaces), edita manualmente el archivo extraído.
- Prueba con un PDF pequeño primero para validar.
