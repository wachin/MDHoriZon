
# Macro para LibreOffice para formatear texto con corchetes en las secciones de una canción

Me puedes ayudar en lo siguiente, aquí tengo una canción:

```text
Este es mi deseo
Claudio Friedson

[Verso]
Este es mi deseo
Honrarte tí
Con todo mi ser
Te adoro tí

Con todas mis fuerzas
Te ala_baré,
Mi adoración eres tú

[Coro]
Hoy te rindo mi ser
Te doy mi corazón
Yo vivo para tí

En cada palpitar
Mientras haya aliento en mi
Dios haz tu obra en mi
```

pregunto si es posible hacer un extensión para LibreOffice que lo tengo instalado en Debian 12, que cuando yo ponga esa canción allí, que con la extensión y algún botón que haya instalado, que a las dos primeras líneas donde está el título y el nombre del cantante que les ponga de color rojo y negrita, y que en cada línea donde estén los corchetes "[]" que a los corchetes y a lo que esté dentro les ponga el color #1C99E0 y negrita

# Me responde, 1ro crear un macro

Sí, se puede hacer. En tu archivo, las dos primeras líneas son el título y cantante, y luego hay secciones como `[Intro]`, `[Verso]`, `[Coro]`, etc. 

La idea sería crear una **extensión para LibreOffice Writer** con un botón que haga esto:

1. **Primera línea:** rojo + negrita.
2. **Segunda línea:** rojo + negrita.
3. **Todo texto entre corchetes `[ ... ]`:** color `#1C99E0` + negrita.

También vi un pequeño detalle en tu archivo:

```text
[Coro x2
```

Le falta el corchete de cierre:

```text
[Coro x2]
```

Para comenzar, lo más fácil es hacerlo primero como **macro de LibreOffice Basic**, y luego convertirlo en extensión `.oxt`.

Ejemplo de macro:

```basic
Sub FormatearCancion
    Dim doc As Object
    Dim text As Object
    Dim cursor As Object
    Dim lineas() As String
    Dim contenido As String
    Dim i As Integer
    Dim pos As Long
    Dim inicio As Long
    Dim fin As Long

    doc = ThisComponent
    text = doc.Text
    contenido = text.String
    lineas = Split(contenido, Chr(10))

    ' Formatear primera línea: título
    If UBound(lineas) >= 0 Then
        FormatearRango 0, Len(lineas(0)), RGB(255, 0, 0)
    End If

    ' Formatear segunda línea: cantante
    If UBound(lineas) >= 1 Then
        FormatearRango Len(lineas(0)) + 1, Len(lineas(1)), RGB(255, 0, 0)
    End If

    ' Formatear textos entre corchetes
    pos = 1
    Do
        inicio = InStr(pos, contenido, "[")
        If inicio = 0 Then Exit Do

        fin = InStr(inicio, contenido, "]")
        If fin = 0 Then Exit Do

        FormatearRango inicio - 1, fin - inicio + 1, RGB(28, 153, 224)

        pos = fin + 1
    Loop
End Sub

Sub FormatearRango(posInicio As Long, largo As Long, colorTexto As Long)
    Dim doc As Object
    Dim cursor As Object

    doc = ThisComponent
    cursor = doc.Text.createTextCursor()

    cursor.gotoStart(False)
    cursor.goRight(posInicio, False)
    cursor.goRight(largo, True)

    cursor.CharWeight = com.sun.star.awt.FontWeight.BOLD
    cursor.CharColor = colorTexto
End Sub
```

Para probarlo en LibreOffice Writer:

En LibreOffice 7.4 en:

`Herraemientas > Organizar macros > BASIC`

![](vx_images/Herramientas%20-%20Organizar%20macros%20-%20BASIC.png)

y dar clic en `Nuevo` y aparecerá la siguiente ventana y le pones nombre:

```text
FormatearCancion
```

![](vx_images/03%20Poner%20nombre%20FormatearCancion.png)

y aparece la siguiente instancia de LibreOffice Basic:

![](vx_images/94735573240635.png)

allí aparece este contenido: 

```basic
REM  *****  BASIC  *****

Sub Main

End Sub
```

borra todo ese contenido, y reemplazarlo completamente por la macro

Luego:

1. Guarda.
2. Regresa al documento.
3. Ve a:

```text
Herramientas → Macros → Ejecutar macro
```

4. Busca y dale clic para que se despliegue:

   * `Mis macros`
   
y mostrará:

   * `Standard`
   
y allí estará el nombre del módulo que le pusimos:

   * `FormatearCancion`

5. Selecciona:

```
FormatearCancion
```

y también en la sección de la derecha selecciona:

```
FormatearCancion
```

6. Pulsa:

```
Ejecutar
```

Y debería formatear automáticamente el archivo de la canción.











y pegas el código y ejecutas:


Después se puede añadir un botón desde:

```text
Herramientas → Personalizar → Barras de herramientas
```

Sí se puede convertir en extensión `.oxt`, pero primero conviene probar la macro para confirmar que el formato queda exactamente como quieres.

