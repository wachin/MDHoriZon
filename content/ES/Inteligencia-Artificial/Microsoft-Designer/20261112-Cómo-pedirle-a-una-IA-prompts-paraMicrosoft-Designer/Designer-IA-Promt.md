# Cómo pedirle a una IA que cree prompts para Microsoft Designer Image Creator (sin que se corten)

Si alguna vez le pediste a ChatGPT, Claude o cualquier IA que te escribiera un prompt para **Microsoft Designer Image Creator** ([https://designer.microsoft.com/image-creator](https://designer.microsoft.com/image-creator)) y al pegarlo te apareció cortado a la mitad, este post es para ti.

## El problema real que viví

Estaba creando una portada para un video de YouTube de un popurrí de alabanzas juveniles. Le pedí a la IA un prompt detallado y me devolvió uno de **1135 caracteres**. Ilusión: pegarlo en Designer. Realidad: el campo solo acepta **1000 caracteres máximo**, y el texto se cortó en:

> *"...Colores vivos, saturados y vibrantes: dorado azul"*

A partir de "dorado azul" se perdió todo el resto del prompt. La imagen salió incompleta y mal enfocada. Error mío por no conocer el límite.

## El límite que nadie te dice

**Microsoft Designer Image Creator acepta máximo 1000 caracteres por prompt.** Punto. No importa cuán detallado quieras ser, todo lo que pase de 1000 se borra al pegar.

## IAs que puedes usar para generar el prompt

Cualquiera de estas funciona bien para que te redacten el prompt antes de pasarlo a Designer:

- **chat.z.ai**
- **DeepSeek**
- **Qwen**
- **ChatGPT**
- **Claude**

Todas entienden la instrucción de límite de caracteres si se la dices explícitamente.

## Plantilla reutilizable

Copia y pega esta plantilla en la IA que uses:

```
Crea un prompt para Microsoft Designer Image Creator con un MÁXIMO de 
1000 caracteres (no te pases ni uno). El prompt debe describir una 
imagen de [TEMA AQUÍ], estilo [ESTILO], con [ELEMENTOS PRINCIPALES], 
[COMPOSICIÓN], [COLORES], y debe pedir explícitamente que la imagen 
no incluya texto escrito. Verifica que el prompt final tenga 1000 
caracteres o menos antes de entregármelo.
```

## Tips extra que aprendí

1. **Pide explícitamente "sin texto"** — Designer suele agregar texto por su cuenta si no se lo prohibes.
2. **Especifica el formato horizontal (16:9)** si la usarás como portada de YouTube.
3. **Deja espacio negativo** en un lado de la composición para poner tu título después.
4. **Pídele a la IA que cuente los caracteres** antes de darte el resultado — así no te llevas sorpresas.
5. **Genera variantes** — Designer siempre da 4 opciones, no te quedes con la primera.

## Enlace directo

Genera tus imágenes gratis en: **[https://designer.microsoft.com/image-creator](https://designer.microsoft.com/image-creator)**

## El resultado que me dió

![](images/Designer.jpg)