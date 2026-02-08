import os
import sys
from pathlib import Path

def export_clean(src_path, output_file):
    """Exportación limpia con separadores mínimos"""
    
    src_path = Path(src_path)
    
    TARGETS = {"header", "footer", "landing", "projects", "clients", 
               "partners", "catalog", "marketing", "contact", "layout", "styles"}
    
    file_count = 0
    
    with open(output_file, 'w', encoding='utf-8') as out:
        for root, dirs, files in os.walk(src_path):
            root_path = Path(root)
            
            # Saltar directorios no deseados
            if any(d in str(root_path) for d in ['.git', 'node_modules', 'dist','ui','assets', '.json']):
                continue
            
            # Verificar si es un directorio objetivo
            root_lower = str(root_path).lower()
            if not any(target in root_lower for target in TARGETS):
                if "app" not in root_lower:
                    continue
            
            for file in sorted(files):
                if file.endswith('.json'):
                    continue
                    
                if not file.endswith(('.tsx', '.ts', '.jsx', '.js', '.css')):
                    continue
                
                # Solo CSS importantes
                if file.endswith('.css') and file not in ['App.css', 'index.css']:
                    continue
                
                file_path = root_path / file
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read().strip()
                    
                    if content:
                        rel_path = file_path.relative_to(src_path)
                        # Separador de 2 caracteres + ruta
                        out.write(f"\n>>{rel_path}\n")
                        out.write(content)
                        out.write("\n")
                        file_count += 1
                        
                except Exception:
                    pass
    
    print(f"Exportado: {file_count} archivos")

if __name__ == "__main__":
    export_clean(
        "/Users/MiguelBernal/APPS/REACT/op-ingenieria/op-ingenieria/src",
        "frontend_clean.txt"
    )