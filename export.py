import os
import sys
from pathlib import Path

def export_ultra_minimal(src_path, output_file):
    """
    Versión ultra minimalista - solo lo esencial.
    """
    src_path = Path(src_path)
    
    if not src_path.exists():
        print(f"Error: {src_path} no existe.")
        sys.exit(1)
    
    # Archivos y carpetas a ignorar
    IGNORE_FILES = {
        src_path / "data" / "categories.json",
        src_path / "data" / "products_normalized.json"
    }
    
    # Extensiones a ignorar (incluyendo .css)
    IGNORE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot','.DS_Store'}
    
    file_count = 0
    
    with open(output_file, 'w', encoding='utf-8') as out:
        for root, dirs, files in os.walk(src_path):
            root_path = Path(root)
            
            # Filtrar directorios
            dirs[:] = [d for d in dirs if d not in {'.git', 'node_modules', '__pycache__'}]
            
            # Omitir carpeta ui dentro de components
            if root_path.name == 'ui' and 'components' in root_path.parts:
                dirs.clear()
                continue
            
            for file in sorted(files):
                file_path = root_path / file
                
                # Omitir archivos específicos
                if file_path in IGNORE_FILES:
                    continue
                
                # Omitir archivos por extensión
                ext = file_path.suffix.lower()
                if ext in IGNORE_EXTENSIONS:
                    continue
                
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read().strip()
                    
                    if content:
                        rel_path = file_path.relative_to(src_path)
                        # Separador ultra simple: # ruta/archivo.ext
                        out.write(f"# {rel_path}\n")
                        out.write(content)
                        out.write("\n\n")  # Dos líneas en blanco entre archivos
                        file_count += 1
                        
                except:
                    pass
    
    print(f"Exportados: {file_count} archivos -> {output_file}")

if __name__ == "__main__":
    src = "/Users/MiguelBernal/APPS/REACT/op-ingenieria/op-ingenieria/src"
    output = "codigo_exportado.txt"
    export_ultra_minimal(src, output)