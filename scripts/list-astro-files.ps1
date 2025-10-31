Get-ChildItem -Path dist/_astro -File | Sort-Object Length -Descending | Select-Object -First 15 | ForEach-Object {
    $sizeKB = [math]::Round($_.Length/1KB, 2)
    Write-Host ("{0,-50} {1,10} KB" -f $_.Name, $sizeKB)
}

