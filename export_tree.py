#!/usr/bin/env python3
import os
from pathlib import Path

# ========= CONFIG =========
ROOT_PATH = Path("/Users/MiguelBernal/APPS/REACT/op-ingenieria/op-ingenieria/src")
OUTPUT_FILE = "tree-src.txt"

EXCLUDE_DIRS = {
    "node_modules",
    ".git",
    "__pycache__",
    ".next",
    "dist",
    "build",
    "coverage"
    "assets",
    "ui",
    "assets"
}

EXCLUDE_FILES = {
    ".DS_Store",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    "webp"
}

EXCLUDE_EXTENSIONS = {
    ".DS_Store",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    "webp"
}
# ===========================


def should_exclude(path: Path) -> bool:
    """Determina si un path debe excluirse del árbol."""

    for part in path.parts:
        if part in EXCLUDE_DIRS:
            return True

    if path.name in EXCLUDE_FILES:
        return True

    if path.suffix.lower() in EXCLUDE_EXTENSIONS:
        return True

    return False


def generate_tree(root: Path) -> list[str]:
    """Genera un árbol visual del directorio respetando exclusiones."""

    lines = []

    def walk(dir_path: Path, prefix: str = ""):
        try:
            entries = sorted(
                [p for p in dir_path.iterdir() if not should_exclude(p)],
                key=lambda p: (p.is_file(), p.name.lower())
            )
        except PermissionError:
            return

        for idx, path in enumerate(entries):
            connector = "└── " if idx == len(entries) - 1 else "├── "
            lines.append(f"{prefix}{connector}{path.name}")

            if path.is_dir():
                extension = "    " if idx == len(entries) - 1 else "│   "
                walk(path, prefix + extension)

    lines.append(root.name)
    walk(root)
    return lines


def main():
    if not ROOT_PATH.exists():
        raise FileNotFoundError(f"Ruta no encontrada: {ROOT_PATH}")

    tree = generate_tree(ROOT_PATH)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(tree))

    print(f"✅ Árbol exportado correctamente a: {OUTPUT_FILE}")
    print(f"📁 Directorio analizado: {ROOT_PATH}")
    print(f"🚫 Carpetas excluidas: {', '.join(sorted(EXCLUDE_DIRS))}")
    print(f"🚫 Extensiones excluidas: {', '.join(sorted(EXCLUDE_EXTENSIONS))}")


if __name__ == "__main__":
    main()
