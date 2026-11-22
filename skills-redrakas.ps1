# Skill-rendrakás: a felesleges design skilleket NEM törli, hanem _to_delete mappába mozgatja.
# Ha 1-2 hétig nem hiányzik semmi, a _to_delete mappák kézzel törölhetők.

$ErrorActionPreference = 'Stop'

function Move-Skills($skillsDir, $names) {
    $trash = Join-Path (Split-Path $skillsDir -Parent) '_to_delete'
    New-Item -ItemType Directory -Force -Path $trash | Out-Null
    foreach ($n in $names) {
        $src = Join-Path $skillsDir $n
        if (Test-Path $src) {
            Move-Item -Path $src -Destination (Join-Path $trash $n) -Force
            Write-Host "Áthelyezve: $src"
        } else {
            Write-Host "Nincs ilyen (kihagyva): $src"
        }
    }
}

# Csak a linket törli, a cél tartalmát nem (nem rekurzív).
function Remove-DanglingLinks($claudeSkillsDir, $names) {
    foreach ($n in $names) {
        $p = Join-Path $claudeSkillsDir $n
        $item = Get-Item -LiteralPath $p -Force -ErrorAction SilentlyContinue
        if ($item -and $item.LinkType) {
            [System.IO.Directory]::Delete($p)
            Write-Host "Link törölve: $p"
        }
    }
}

# 1) Globális skillek (~\.agents\skills)
#    Marad: design-taste-frontend, ui-ux-pro-max, emil-design-eng, ckm-banner-design
$global = @('gpt-taste', 'high-end-visual-design', 'ckm-ui-styling')
Move-Skills "$HOME\.agents\skills" $global
Remove-DanglingLinks "$HOME\.claude\skills" $global

# 2) webpages projekt: a globálisan is meglévő duplikátumok + az elavult v1
$proj = 'C:\Users\megye\Documents\dani\git\webpages'
$projNames = @('design-taste-frontend', 'design-taste-frontend-v1', 'gpt-taste', 'high-end-visual-design')
Move-Skills "$proj\.agents\skills" $projNames
Remove-DanglingLinks "$proj\.claude\skills" $projNames

Write-Host "`nKész. Ellenőrzés:"
Get-ChildItem "$HOME\.agents\skills", "$proj\.agents\skills" -Directory | Select-Object FullName