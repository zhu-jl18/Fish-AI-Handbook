param(
  [Parameter(Mandatory=$true)][string]$MsgFile
)

# Windows PowerShell commit-msg hook
# Validates Conventional Commits with project-specific extensions.

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $MsgFile)) { exit 0 }

$raw = Get-Content -LiteralPath $MsgFile -Raw -ErrorAction Stop
if (-not $raw) { exit 0 }

$first = ($raw -split "`n")[0]

# Skip merge commits, version bumps, or empty subjects
if ($first -match '^Merge ' -or $first -match '^#' -or [string]::IsNullOrWhiteSpace($first)) { exit 0 }

# Allowed types (extendable)
$types = @(
  'init','release','style','feat','ui/ux','fix','docs','refactor','perf','dx',
  'workflow','types','wip','test','build','chore','deps','content'
)

# Build composite type group like: (type|type2)(\(scope\))?(+(type|type2)(\(scope\))?)*
$typeAlt = ($types -join '|')
$pat = '^(?<type>(?:' + $typeAlt + ')(?:\([a-z0-9-]+\))?(?:\+(?:' + $typeAlt + ')(?:\([a-z0-9-]+\))?)*)\:\s+(?<subj>.+)$'

$m = [regex]::Match($first, $pat, 'IgnoreCase')
if (-not $m.Success) {
  Write-Host "✖ commit message 不符合规范: $first" -ForegroundColor Red
  Write-Host "  期望: type[+type][(scope)]: subject" -ForegroundColor Yellow
  Write-Host "  允许类型: $($types -join ', ')" -ForegroundColor Yellow
  exit 1
}

# Enforce lowercase type tokens
$typePart = $m.Groups['type'].Value
$typeTokens = ($typePart -split '\+') | ForEach-Object { $_.ToLowerInvariant() }
$fixedType = $typeTokens -join '+'

# Enforce subject first ASCII letter lowercase
$subj = $m.Groups['subj'].Value
$chars = $subj.ToCharArray()
for ($i=0; $i -lt $chars.Length; $i++) {
  $c = [int][char]$chars[$i]
  if ($c -ge 65 -and $c -le 90) { # 'A'..'Z'
    $chars[$i] = [char]($c + 32)
    break
  }
  if ($c -ge 97 -and $c -le 122) { break } # already lowercase ascii
}
$fixedSubj = -join $chars

$recomposed = "${fixedType}: $fixedSubj"
if ($recomposed -ne $first) {
  # Auto-fix first line while preserving body
  $lines = @($raw -split "`n")
  $lines[0] = $recomposed
  [IO.File]::WriteAllText($MsgFile, ($lines -join "`n"))
}

exit 0
