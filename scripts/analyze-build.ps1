$distPath = "dist"

Write-Host "=== Build Analysis ===" -ForegroundColor Cyan
Write-Host ""

# Total size
$totalSize = (Get-ChildItem -Path $distPath -Recurse -File | Measure-Object -Property Length -Sum).Sum
Write-Host "Total size: $([math]::Round($totalSize/1MB, 2)) MB" -ForegroundColor Green

# File count
$fileCount = (Get-ChildItem -Path $distPath -Recurse -File).Count
Write-Host "Total files: $fileCount" -ForegroundColor Green
Write-Host ""

# Largest files
Write-Host "Top 10 largest files:" -ForegroundColor Yellow
Get-ChildItem -Path $distPath -Recurse -File | 
    Sort-Object Length -Descending | 
    Select-Object -First 10 | 
    ForEach-Object {
        $sizeKB = [math]::Round($_.Length/1KB, 2)
        Write-Host "  $($_.Name.PadRight(50)) $sizeKB KB"
    }

Write-Host ""

# Category breakdown
Write-Host "Size by category:" -ForegroundColor Yellow
$categories = @{
    "HTML" = (Get-ChildItem -Path $distPath -Recurse -Filter *.html | Measure-Object -Property Length -Sum).Sum
    "CSS" = (Get-ChildItem -Path $distPath -Recurse -Filter *.css | Measure-Object -Property Length -Sum).Sum
    "JS" = (Get-ChildItem -Path $distPath -Recurse -Filter *.js | Measure-Object -Property Length -Sum).Sum
    "Fonts" = (Get-ChildItem -Path "$distPath/fonts" -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
    "Pagefind" = (Get-ChildItem -Path "$distPath/pagefind" -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
}

foreach ($cat in $categories.GetEnumerator() | Sort-Object Value -Descending) {
    $sizeMB = [math]::Round($cat.Value/1MB, 2)
    $percent = [math]::Round(($cat.Value/$totalSize)*100, 1)
    Write-Host "  $($cat.Key.PadRight(15)) $sizeMB MB ($percent%)"
}

