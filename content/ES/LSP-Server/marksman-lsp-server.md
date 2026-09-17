# Instalar Marksman LSP (binario precompilado, sin .NET SDK)

Marksman es un servidor LSP para Markdown con soporte de wiki-links, ideal para
Zettelkasten y note-taking. Sus releases incluyen binarios autónomos (self-contained)
que **no requieren** tener instalado .NET SDK ni runtime.

# Requisito

Necesitas tener instalado el Cliente LSP

**Habilitar formato automático o autocompletado con Cliente LSP o LSP Server (python3-pylsp) en Kate ("Esquema de Símbolos" python y otros lenguajes)**  
[https://facilitarelsoftwarelibre.blogspot.com/2025/01/kate-habilitar-autocomplementado-con-python3-pylsp.html](https://facilitarelsoftwarelibre.blogspot.com/2025/01/kate-habilitar-autocomplementado-con-python3-pylsp.html)

luego:

## 1. Descargar el binario

```bash
# Linux x86_64
curl -LO https://github.com/artempyanykh/marksman/releases/latest/download/marksman-linux-x64

# macOS ARM (Apple Silicon)
curl -LO https://github.com/artempyanykh/marksman/releases/latest/download/marksman-osx-arm64

# macOS Intel
curl -LO https://github.com/artempyanykh/marksman/releases/latest/download/marksman-osx-x64
```

## 2. Hacerlo ejecutable

```bash
chmod +x marksman-linux-x64
```

## 3. Moverlo a `/usr/local/bin` (requiere `sudo`)

```bash
sudo mv marksman-linux-x64 /usr/local/bin/marksman
```

`/usr/local/bin` está en el PATH del sistema por defecto, por lo que no necesitas
modificar `~/.bashrc`. El `sudo` es necesario porque `/usr/local/bin` pertenece a
`root` — es el directorio estándar para binarios instalados manualmente que deben
estar disponibles para todos los usuarios del sistema.

## 4. Verificar

```bash
marksman --version
```

## 5. Configurar el editor (Kate)

Kate busca el binario `marksman` en el PATH automáticamente — no requiere
configuración adicional. Si el mensaje de advertencia persiste, reinicia Kate.

## Enlaces

- Repositorio: https://github.com/artempyanykh/marksman
- Releases: https://github.com/artempyanykh/marksman/releases