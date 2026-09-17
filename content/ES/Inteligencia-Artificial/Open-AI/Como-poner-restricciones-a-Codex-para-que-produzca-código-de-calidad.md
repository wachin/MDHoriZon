Me parece una excelente idea. Además, hay algo que suele confundirse al empezar a trabajar con agentes como Codex.

La idea **no es poner todas las restricciones desde el primer día**. Lo recomendable es ir añadiéndolas conforme el proyecto madura.

Te propongo una guía "For Dummies".

---

# Guía For Dummies: Cómo poner restricciones a Codex para que escriba código de calidad

## ¿Qué significa "poner restricciones"?

Cuando le pides algo a Codex, normalmente haces algo así:

> Crea una ventana en PyQt6 para gestionar clientes.

Eso es muy abierto.

En cambio, puedes decir:

> Crea una ventana en PyQt6 para gestionar clientes. Debe cumplir las reglas de mi proyecto, usar type hints, pasar Ruff, mypy y pytest.

Ya no sólo le dices **qué** hacer.

También le dices **cómo** debe hacerlo.

---

# Nivel 1 (Principiante)

Este nivel es suficiente para proyectos pequeños.

Al principio del prompt añade algo como:

```
Reglas del proyecto:

- Usa Python 3.13.
- Usa PyQt6.
- Escribe código limpio.
- Añade comentarios cuando sean necesarios.
- Usa nombres descriptivos.
```

Eso ya mejora mucho el resultado.

---

# Nivel 2

Cuando el proyecto empieza a crecer.

Añades:

```
- Todas las funciones deben tener type hints.
- No escribas código duplicado.
- Divide el código en clases pequeñas.
- Sigue los principios SOLID cuando sea posible.
```

Aquí ya estás empezando a "encerrar" al agente.

---

# Nivel 3

Aquí entra Ruff.

Añades:

```
Todo el código debe pasar Ruff sin errores.

No finalices la tarea hasta que Ruff no informe de cero errores.
```

Eso obliga a Codex a escribir código mucho más limpio.

---

# Nivel 4

Ahora entra mypy.

Añades:

```
Todo el proyecto debe pasar mypy sin errores.

Todas las funciones deben tener anotaciones de tipos.
```

Ahora Codex tiene mucho menos margen para cometer errores.

---

# Nivel 5

Ahora llegan los tests.

```
Toda nueva funcionalidad debe incluir pruebas con pytest.

No des por terminada la tarea si las pruebas no pasan.
```

Aquí ya aparece la famosa carpeta

```
tests/
```

que seguramente ya has visto.

Es completamente normal.

---

# ¿Por qué Codex crea siempre la carpeta tests?

Porque es el estándar en Python.

Normalmente un proyecto queda así:

```
proyecto/

app/

core/

database/

ui/

tests/

README.md

requirements.txt
```

Dentro de

```
tests/
```

hay muchos archivos:

```
tests/

test_login.py

test_database.py

test_clientes.py

test_pdf.py

test_reportes.py
```

Cada uno prueba una parte del programa.

---

# Nivel 6

Cobertura de pruebas.

Ahora añades:

```
Las pruebas deben cubrir la mayor parte del código.

Usa pytest-cov.
```

Así sabes cuánto código está siendo probado.

Por ejemplo:

```
95 % de cobertura
```

es muchísimo mejor que

```
15 %
```

---

# Nivel 7

Aquí aparece el CI.

En el prompt puedes poner:

```
Todo cambio debe poder ejecutarse automáticamente mediante GitHub Actions.
```

Entonces Codex suele generar algo como:

```
.github/

workflows/

tests.yml
```

Cada vez que haces

```
git push
```

GitHub ejecuta:

* Ruff
* mypy
* pytest

automáticamente.

---

# Nivel 8

Ahora ya piensas como Uncle Bob.

El prompt puede decir:

```
No confíes en que el código sea correcto.

Demuéstralo.

Si algo puede verificarse automáticamente, crea la verificación correspondiente.

No termines la tarea hasta que todas las restricciones hayan sido superadas.
```

Eso cambia completamente la calidad del código generado.

---

# ¿Hay que poner todo eso desde el principio?

**No.**

De hecho, yo recomendaría este orden para tus proyectos:

## Semana 1

Sólo:

* Python 3.13
* PyQt6
* Código limpio

---

## Semana 2

Añadir:

* Ruff

---

## Semana 3

Añadir:

* mypy

---

## Semana 4

Añadir:

* pytest

---

## Semana 5

Añadir:

* pytest-cov

---

## Semana 6

Añadir:

* GitHub Actions

---

## Semana 7

Añadir reglas específicas del proyecto.

---

## Un consejo para tus proyectos

Como estás desarrollando aplicaciones relativamente grandes como **Lamiconstruct**, **LivingNotes**, el gestor de archivos y otros programas en PyQt6, una buena práctica es crear un archivo llamado, por ejemplo:

```
CODING_RULES.md
```

o

```
AI_DEVELOPMENT_RULES.md
```

En ese documento escribes todas las reglas una sola vez. Luego, en tus prompts, en lugar de repetirlas siempre, simplemente le indicas a Codex:

> "Lee `AI_DEVELOPMENT_RULES.md` y cumple todas sus reglas antes de comenzar a programar."

Es un enfoque muy utilizado porque mantiene los prompts más cortos y hace que todos los agentes trabajen siguiendo exactamente los mismos estándares.
