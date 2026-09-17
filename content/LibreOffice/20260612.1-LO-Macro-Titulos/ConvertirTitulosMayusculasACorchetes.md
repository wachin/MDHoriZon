
# Macro para LibreOffice Writer que convierte automáticamente los títulos de secciones en canciones con acordes

Si trabajas con canciones cristianas, cancioneros, archivos de acordes o letras para grupos de alabanza, seguramente te has encontrado con documentos como este:

```
INTRO
G C G C D

VERSO
G               D
De tal manera al mundo Tu amaste...

PRE-CORO
G               D
Gracias, te doy gracias...

CORO x2
G D Em C
```

Aunque este formato es perfectamente funcional, muchas aplicaciones de proyección, programas de música y sistemas de presentación utilizan una notación más estructurada, donde los nombres de las secciones aparecen entre corchetes:

```
[Intro]

[Verso]

[Pre-Coro]

[Coro x2]
```

Convertir manualmente decenas o cientos de canciones puede ser una tarea tediosa. Por eso desarrollé una macro para LibreOffice Writer que realiza este trabajo automáticamente.

## ¿Qué hace la macro?

La macro recorre todos los párrafos del documento y detecta líneas que parecen títulos de secciones musicales:

* INTRO
* VERSO
* PRE-CORO
* CORO
* CORO x2
* PUENTE
* INTERMEDIO
* FINAL
* MINISTRACIÓN
* ESPONTÁNEO

Y también cualquier otro título escrito completamente en mayúsculas.

Cuando encuentra uno de estos títulos lo convierte al formato:

```
[Título]
```

Por ejemplo:

```
INTRO
```

se transforma en:

```
[Intro]
```

y

```
CORO x2
```

se transforma en:

```
[Coro x2]
```

## Lo mejor de todo

La macro fue diseñada para NO modificar líneas de acordes.

Por ejemplo:

```
G C G C D
```

o

```
G D Em C
```

permanecen exactamente iguales.

Esto evita que los acordes sean confundidos con títulos de secciones.

## Antes y después

### Antes

```
INTRO
G C G C D

VERSO
G               D
De tal manera al mundo Tu amaste...

CORO x2
G D Em C
```

### Después

```
[Intro]
G C G C D

[Verso]
G               D
De tal manera al mundo Tu amaste...

[Coro x2]
G D Em C
```

## Cómo instalar la Maco

Pega esta macro:

```bash
Option Explicit

Sub ConvertirTitulosMayusculasACorchetes()
    Dim doc As Object, enum As Object, parrafo As Object
    doc = ThisComponent
    enum = doc.Text.createEnumeration()

    Do While enum.hasMoreElements()
        parrafo = enum.nextElement()

        If parrafo.supportsService("com.sun.star.text.Paragraph") Then
            Dim texto As String
            texto = Trim(parrafo.String)

            If EsTituloDeSeccion(texto) Then
                parrafo.String = "[" & FormatearTitulo(texto) & "]"
            End If
        End If
    Loop

    MsgBox "Listo. Se convirtieron los títulos.", 64, "Macro terminada"
End Sub

Function EsTituloDeSeccion(texto As String) As Boolean
    Dim t As String
    t = Trim(texto)

    If t = "" Then
        EsTituloDeSeccion = False
        Exit Function
    End If

    If Left(t, 1) = "[" And Right(t, 1) = "]" Then
        EsTituloDeSeccion = False
        Exit Function
    End If

    If Len(t) > 40 Then
        EsTituloDeSeccion = False
        Exit Function
    End If

    If EsLineaDeAcordes(t) Then
        EsTituloDeSeccion = False
        Exit Function
    End If

    EsTituloDeSeccion = (QuitarNumeros(t) = UCase(QuitarNumeros(t)))
End Function

Function EsLineaDeAcordes(t As String) As Boolean
    Dim partes() As String
    Dim i As Integer
    Dim palabra As String
    Dim total As Integer
    Dim acordes As Integer

    partes = Split(Trim(t), " ")
    total = 0
    acordes = 0

    For i = LBound(partes) To UBound(partes)
        palabra = Trim(partes(i))

        If palabra <> "" Then
            total = total + 1

            If EsAcorde(palabra) Then
                acordes = acordes + 1
            End If
        End If
    Next i

    If total > 0 And acordes = total Then
        EsLineaDeAcordes = True
    Else
        EsLineaDeAcordes = False
    End If
End Function

Function EsAcorde(p As String) As Boolean
    Dim raiz As String
    p = Trim(p)

    If p = "" Then
        EsAcorde = False
        Exit Function
    End If

    raiz = Left(p, 1)

    If InStr("ABCDEFG", raiz) = 0 Then
        EsAcorde = False
        Exit Function
    End If

    EsAcorde = True
End Function

Function FormatearTitulo(t As String) As String
    Dim partes() As String
    Dim i As Integer
    Dim palabra As String
    Dim resultado As String

    t = LCase(Trim(t))
    partes = Split(t, " ")

    For i = LBound(partes) To UBound(partes)
        palabra = partes(i)

        If palabra <> "" Then
            palabra = UCase(Left(palabra, 1)) & Mid(palabra, 2)

            If resultado = "" Then
                resultado = palabra
            Else
                resultado = resultado & " " & palabra
            End If
        End If
    Next i

    resultado = Replace(resultado, "Pre-coro", "Pre-Coro")
    resultado = Replace(resultado, "Pre Coro", "Pre-Coro")
    resultado = Replace(resultado, "X2", "x2")
    resultado = Replace(resultado, "X3", "x3")
    resultado = Replace(resultado, "X4", "x4")

    FormatearTitulo = resultado
End Function

Function QuitarNumeros(t As String) As String
    Dim i As Integer
    Dim c As String
    Dim r As String

    For i = 1 To Len(t)
        c = Mid(t, i, 1)

        If InStr("0123456789xX ", c) = 0 Then
            r = r & c
        End If
    Next i

    QuitarNumeros = r
End Function
```

en LibreOffice Writer de la siguiente manera:

**Herramientas → Macros → Organizar macros → Basic → Organizador**

en esta ventana dar clic en:

**Mis macros → Nuevo**

poner nombre al módulo y "Aceptar"

| --- Aquí en esta ventana pegas la macro --- |

y Guardas

Luego ejecutas:

**Herramientas → Macros → Ejecutar macro → Mis macros → Standard → tu módulo → ConvertirTitulosCancionACorchetes**

---

## ¿Por qué me fue útil?

Tengo una colección grande de canciones con acordes en formato DOCX. Muchas de ellas provienen de diferentes fuentes y utilizan nombres de secciones escritos en mayúsculas.

Necesitaba un método rápido para estandarizar el formato y poder utilizar posteriormente otros programas de edición, proyección o procesamiento de letras y acordes.

Con esta macro puedo convertir documentos completos en segundos.

## LibreOffice sigue siendo una gran herramienta

Muchas veces pensamos en LibreOffice únicamente como una alternativa gratuita a Microsoft Office, pero su sistema de macros permite automatizar tareas muy específicas que pueden ahorrar horas de trabajo.

En este caso, una tarea repetitiva que normalmente tomaría varios minutos por canción queda resuelta con un solo clic.

---

Dios les bendiga

---

## Referencias

**LibreOffice Basic Programming Guide**  
[https://wiki.documentfoundation.org/Documentation/BASIC_Guide](https://wiki.documentfoundation.org/Documentation/BASIC_Guide)  

**LibreOffice Macros Explained**  
[https://help.libreoffice.org/latest/es/text/sbasic/shared/main0000.html](https://help.libreoffice.org/latest/es/text/sbasic/shared/main0000.html)  

**LibreOffice API Reference**  
[https://api.libreoffice.org/](https://api.libreoffice.org/)  

**LibreOffice Writer Guide**  
[https://documentation.libreoffice.org/en/english-documentation/](https://documentation.libreoffice.org/en/english-documentation/)  

**The Document Foundation - LibreOffice**  
[https://www.libreoffice.org/](https://www.libreoffice.org/)  

**LibreOffice Community Wiki**  
[https://wiki.documentfoundation.org/](https://wiki.documentfoundation.org/)  
