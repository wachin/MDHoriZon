
# LibreOffice Writer Macro para formatear texto de canciones con acordes con corchetes, títulos a color

Aquí tengo una canción (muy conocida) con acordes:

```
Señora Señora
Denisse de Kalafe

Acordes:
B7sus4  x24200
Dsus4   xx0233
Dsus2   xx0230

Tono: D

[Intro]
D  Dsus4  D  Dsus2
D  Dsus4  D  Dsus2

|-2-----3---------3--2-----0---|
|---3------3-----------3-------|
|-----2------2-----------2-----|
|------------------------------|
|------------------------------|
|------------------------------|

[Verso I]
   D                  F#7
A ti que me diste tu vida,
                Bm   Am7 D7
tu amor y tu espacio
   G                      A
A ti que cargaste en tu vientre
            D     Am7 D7
dolor y cansancio
   G                  A
A ti que peleaste con uñas y dientes
    F#7                    Bm
Valiente en tu casa y en cualquier lugar
   E                   E7
A ti rosa fresca de abril
   G             A7
A ti mi fiel querubin

[Verso II]
   D                F#7
A ti te dedico mis versos,
                Bm    Am7 D7
mi ser, mis victorias
   G                 A
A ti mis respetos Señora,
         D     Am7 D7
Señora, Señora
   G                    A
A ti, mi guerrera invencible
   F#7                Bm
A ti, luchadora incansable
   E7               A7
A ti, mi amiga constante
              D    G A7
de todas las horas

[Verso III]
    D                     F#7
Su nombre es un nombre comun,
               Bm   Am7 D7
como las Margaritas
  G                 A
Siempre mi poca presencia
                 D    Am7 D7
constante en mi mente
   G                    A
Y para no hacer tanto alarde
F#                  Bm
Esa mujer de quien hablo
    G                  A
Es linda mi amiga, gaviota
                  D    A
Su nombre es: mi Madre

[Verso I]
   D                  F#7
A ti que me diste tu vida,
                Bm   Am7 D7
tu amor y tu espacio
   G                      A
A ti que cargaste en tu vientre
            D     Am7 D7
dolor y cansancio
   G                  A
A ti que peleaste con uñas y dientes
    F#7                    Bm
Valiente en tu casa y en cualquier lugar
   G
A ti rosa fresca de abril
   G             A7
A ti mi fiel querubin

[Verso II]
   D                F#7
A ti te dedico mis versos,
                Bm    Am7 D7
mi ser, mis victorias
   G                 A
A ti mis respetos Señora,
         D     Am7 D7
Señora, Señora
   G                    A
A ti, mi guerrera invencible
   F#7                Bm
A ti, luchadora incansable
   E7               A7
A ti, mi amiga constante
              D    G A7
de todas las horas

|-2-----3-------3--2---0----2-|
|--3-----3----------3-------3-|
|---2-----2----------2------2-|
|---------------------------0-|
|---------------------------0-|
|---------------------------0-|
```

y la estoy editando en LibreOffice:

![](vx_images/01%20LibreOffice%20con%20la%20canción%20que%20quiero%20formatear.png)


Este es un macro para formatear el texto de la siguiente manera:

- A las dos primeras líneas donde está el título y el nombre del cantante se les pondrá de color rojo y negrita
- En cada línea donde estén los corchetes "[]" y a lo que esté dentro se les pondrá el color #1C99E0 y negrita


El siguiente es el **macro de LibreOffice Basic**:

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

# Para probarlo en LibreOffice Writer

En LibreOffice 7.4 en las siguientes opciones:

`Herraemientas > Organizar macros > BASIC`




![](vx_images/03%20Herramientas%20-%20Macros%20-%20Organizar%20macros%20-%20BASIC.png)

y dar clic en `Nuevo` y aparecerá la siguiente ventana y le pones nombre:

```text
FormatearCancion
```

![](vx_images/03.2%20Poner%20nombre%20FormatearCancion.png)

y aparece la siguiente instancia de LibreOffice Basic:

![](vx_images/04.2%20Mis%20macros%20y%20dialogos.standard%20LibreOffice%20Basic.png)

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
   
y dale clic para que se despliegue y allí estará el nombre del módulo que le pusimos:

   * `FormatearCancion`

5. Selecciona:

```
FormatearCancion
```

y también en la sección de la derecha selecciona (aunque ya debe estar seleccionado por defeco):

```
FormatearCancion
```

6. Pulsa:

```
Ejecutar
```
![](vx_images/05%20Ejecutar%20la%20Macro.png)

pero si no aparece así, puede aparecer así:

![](vx_images/05.2%20Ejecutar%20la%20Macro.png)

Y debería formatear automáticamente el archivo de la canción, quedando así:

![](vx_images/06%20Ejecución%20correcta,%20documento%20de%20LibreOffice%20formateado.png)

Después se puede añadir un botón desde:

```text
Herramientas → Personalizar → Barras de herramientas
```

Sí se puede convertir en extensión `.oxt`, pero primero conviene probar la macro para confirmar que el formato queda exactamente como quieres.

