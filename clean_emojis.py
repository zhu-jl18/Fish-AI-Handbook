#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Clean all emojis and bilingual patterns from Markdown files
"""

import re
import os
from pathlib import Path

def remove_emojis(text):
    """Remove specific common emoji characters from text"""
    # Only target specific commonly used emojis, NOT broad Unicode ranges
    # This prevents accidentally removing Chinese characters
    common_emojis = [
        '🔢', '🪙', '📏', '🎓', '💡', '🔗', '📌', '✅', '❌',
        '🚀', '📊', '⚙️', '🤖', '🎯', '💬', '📝', '👋', '📚',
        '🌟', '✨', '🔥', '💻', '📱', '⚡', '🎨', '🔧', '📈',
        '🎉', '💪', '🌈', '🔍', '📖', '🎓', '🏆', '🎪', '🎭',
        '🎬', '🎮', '🎲', '🎸', '🎹', '🎺', '🎻', '🎼', '🎤',
    ]
    
    for emoji in common_emojis:
        text = text.replace(emoji, '')
    
    return text

def remove_bilingual_patterns(text):
    """Remove bilingual patterns like 'English（Chinese）' or 'English (Chinese)'"""
    # Pattern: English text followed by Chinese in parentheses
    pattern = r'([A-Za-z0-9\s\-]+)\s*[（(]([\u4e00-\u9fa5]+)[）)]'
    return re.sub(pattern, r'\1', text)

def clean_markdown_file(file_path):
    """Clean a single markdown file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remove emojis
        content = remove_emojis(content)
        
        # Remove bilingual patterns
        content = remove_bilingual_patterns(content)
        
        # Clean up multiple spaces after removal
        content = re.sub(r'^(#{1,6})\s{2,}', r'\1 ', content, flags=re.MULTILINE)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8', newline='\n') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function"""
    docs_dir = Path(r'X:\WorkSapce\Fish-AI-Handbook\src\content\docs')
    
    if not docs_dir.exists():
        print(f"Error: Directory {docs_dir} does not exist")
        return
    
    modified_count = 0
    total_count = 0
    
    for md_file in docs_dir.rglob('*.md'):
        total_count += 1
        if clean_markdown_file(md_file):
            modified_count += 1
            print(f"✓ Cleaned: {md_file.name}")
    
    print(f"\n{'=' * 60}")
    print(f"Total files scanned: {total_count}")
    print(f"Files modified: {modified_count}")
    print(f"Files unchanged: {total_count - modified_count}")
    print(f"{'=' * 60}")

if __name__ == '__main__':
    main()
