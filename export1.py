import os
import sys
from pathlib import Path

def export_ultra_minimal(src_path, output_file):
    """
    Exporta TODO lo relacionado con:
    - catalog
    - projects
    - clients
    
    Incluye CSS
    Excluye JSON y assets pesados
    """

    src_path = Path(src_path)

    if not src_path.exists():
        print(f"Error: {src_path} no existe.")
        sys.exit(1)

    TARGET_KEYWORDS = {"catalog", "projects", "clients"}

    IGNORE_EXTENSIONS = {
        '.png', '.jpg', '.jpeg', '.gif', '.ico',
        '.woff', '.woff2', '.ttf', '.eot',
        '.DS_Store', '.json'
    }

    IGNORE_DIRS = {
        '.git', 'node_modules', '__pycache__', 'dist', 'build', '.next'
    }

    file_count = 0

    with open(output_file, 'w', encoding='utf-8') as out:
        for root, dirs, files in os.walk(src_path):
            root_path = Path(root)

            # Limpiar carpetas basura
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

            # ¿Este path pertenece a alguno de los dominios?
            if not any(k in root_path.parts for k in TARGET_KEYWORDS):
                continue

            for file in sorted(files):
                file_path = root_path / file

                # Omitir extensiones
                if file_path.suffix.lower() in IGNORE_EXTENSIONS:
                    continue

                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read().strip()

                    if content:
                        rel_path = file_path.relative_to(src_path)
                        out.write(f"# {rel_path}\n")
                        out.write(content)
                        out.write("\n\n")
                        file_count += 1

                except Exception as e:
                    print(f"⚠️ Error leyendo {file_path}: {e}")

    print(f"\n✅ Exportados: {file_count} archivos -> {output_file}")

if __name__ == "__main__":
    src = "/Users/MiguelBernal/APPS/REACT/op-ingenieria/op-ingenieria/src"
    output = "catalog_projects_clients_export.txt"
    export_ultra_minimal(src, output)
