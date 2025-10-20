# coding: utf-8
import re
import string
from pathlib import Path

DOCS_DIR = Path("src/content/docs")
COMMON_PATH = Path("scripts/common-zh-1000.txt")
OUT_PATH = Path("scripts/used-chars.txt")


def read_text(p: Path) -> str:
    try:
        return p.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


def strip_code_blocks(s: str) -> str:
    # remove fenced code blocks
    s = re.sub(r"```[\s\S]*?```", "", s)
    # remove inline code
    s = re.sub(r"`[^`]+`", "", s)
    # remove html tags
    s = re.sub(r"<[^>]+>", "", s)
    return s


def collect_docs_chars() -> set[str]:
    chars: set[str] = set()
    for pattern in ("*.md", "*.mdx"):
        for p in DOCS_DIR.rglob(pattern):
            t = strip_code_blocks(read_text(p))
            chars.update(t)
    return chars


def load_common_chars() -> set[str]:
    if COMMON_PATH.exists():
        t = read_text(COMMON_PATH)
        return {c for c in t if not c.isspace()}
    print("WARNING: scripts/common-zh-1000.txt not found; proceeding without buffer.")
    return set()


def main() -> None:
    used = collect_docs_chars()
    ascii_base = string.ascii_letters + string.digits + string.punctuation + " "
    zh_punct = "，。！？：；“”‘’（）【】《》、—…·「」『』〔〕—–－"
    safety = set(ascii_base + zh_punct)
    common = load_common_chars()
    charset = sorted(used | safety | common)
    OUT_PATH.write_text("".join(charset), encoding="utf-8")
    print(f"Wrote {OUT_PATH} with {len(charset)} unique chars")


if __name__ == "__main__":
    main()
