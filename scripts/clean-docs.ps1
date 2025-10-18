[CmdletBinding()]
param(
  [string]$Root = "src/content/docs",
  [switch]$DryRun
)

$ErrorActionPreference = 'Continue'
$rootPath = Resolve-Path $Root
$files = Get-ChildItem -Path $rootPath -Recurse -Include *.md,*.mdx -File

# Emoji removal regex patterns
$emojiSurrogate = [regex]'[\uD800-\uDBFF][\uDC00-\uDFFF]'
$emojiMisc = [regex]'[\u2600-\u27BF]'
$emojiExtras = [regex]'[\uFE0F\u200D\u20E3]'

function Remove-Emoji([string]$text) {
  if ([string]::IsNullOrWhiteSpace($text)) { return $text }
  $t = $emojiSurrogate.Replace($text, '')
  $t = $emojiMisc.Replace($t, '')
  $t = $emojiExtras.Replace($t, '')
  return $t
}

function Clean-Heading([string]$line) {
  if ($line -notmatch '^\s*#{2,6}\s+') { return $line }
  
  if ($line -match '^(?<hash>\s*#{2,6}\s+)(?<txt>.+)$') {
    $hash = $matches['hash']
    $txt = $matches['txt']
    
    # Remove emoji first
    $txt = Remove-Emoji $txt
    
    # Remove Chinese parentheses with content: English（Chinese） -> English
    $txt = $txt -replace '([A-Za-z0-9][A-Za-z0-9\s\-\+/\.&:,]*?)（[^）]+）', '$1'
    
    # Normalize whitespace
    $txt = $txt -replace '\s{2,}', ' '
    $txt = $txt.Trim()
    
    return "$hash$txt"
  }
  return $line
}

function Process-File([string]$path, [switch]$DryRun) {
  try {
    $content = Get-Content -LiteralPath $path -Raw -Encoding UTF8 -ErrorAction Stop
    if ([string]::IsNullOrWhiteSpace($content)) { return }
    
    $lines = $content -split '(\r?\n)'
    $output = New-Object System.Collections.ArrayList
    $inFrontmatter = $false
    $inCodeBlock = $false
    $changed = $false
    $lineNum = 0
    
    for ($i = 0; $i -lt $lines.Length; $i++) {
      $line = $lines[$i]
      
      # Handle newlines
      if ($line -match '^\r?\n$') {
        [void]$output.Add($line)
        continue
      }
      
      $lineNum++
      $newLine = $line
      
      # Detect frontmatter
      if ($lineNum -eq 1 -and $line -match '^---\s*$') {
        $inFrontmatter = $true
      } elseif ($inFrontmatter -and $line -match '^---\s*$') {
        $inFrontmatter = $false
      }
      
      # Skip frontmatter and code blocks
      if (-not $inFrontmatter) {
        if ($line -match '^\s*(```|~~~)') {
          $inCodeBlock = -not $inCodeBlock
        } elseif (-not $inCodeBlock) {
          if ($line -match '^\s*#{2,6}\s+') {
            $newLine = Clean-Heading $line
          } else {
            $newLine = Remove-Emoji $line
          }
        }
      }
      
      if ($newLine -ne $line) { $changed = $true }
      [void]$output.Add($newLine)
    }
    
    if ($changed) {
      if ($DryRun) {
        Write-Host "[DRY] $path"
      } else {
        $newContent = $output -join ''
        [System.IO.File]::WriteAllText($path, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $path"
      }
    }
  } catch {
    Write-Warning "Error processing $path : $_"
  }
}

Write-Host "Processing $($files.Count) files in $rootPath"
foreach ($f in $files) { 
  Process-File -path $f.FullName -DryRun:$DryRun
}
Write-Host "Done!"
