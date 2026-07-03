# NovaVision - pubblicazione GitHub + Vercel
# Esegui: powershell -ExecutionPolicy Bypass -File scripts/publish-github-vercel.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host ""
Write-Host "=== NovaVision: GitHub + Vercel ===" -ForegroundColor Cyan
Write-Host ""

# 1. GitHub username
$defaultUser = "TUO-USERNAME"
$githubUser = Read-Host "GitHub username (es. danielkhelz)"
if ([string]::IsNullOrWhiteSpace($githubUser)) { $githubUser = $defaultUser }

$repoName = Read-Host "Nome repository [novavision-web-app]"
if ([string]::IsNullOrWhiteSpace($repoName)) { $repoName = "novavision-web-app" }

$remoteUrl = "https://github.com/$githubUser/$repoName.git"
Write-Host ""
Write-Host "Repository: $remoteUrl" -ForegroundColor Yellow

# 2. Crea repo su GitHub (apri browser)
$createUrl = "https://github.com/new?name=$repoName&description=NovaVision+web+app+test"
Write-Host ""
Write-Host "PASSO 1 - Crea repository su GitHub (se non esiste):" -ForegroundColor Green
Write-Host "  $createUrl"
$open = Read-Host "Aprire il browser ora? [S/n]"
if ($open -ne "n" -and $open -ne "N") {
  Start-Process $createUrl
}

Write-Host ""
Write-Host "PASSO 2 - Assicurati che il repo sia VUOTO (no README, no .gitignore)" -ForegroundColor Green
Read-Host "Premi INVIO quando il repo e' creato"

# 3. Push GitHub
$existingRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Host "Remote origin esistente: $existingRemote"
  $change = Read-Host "Sostituire con $remoteUrl ? [S/n]"
  if ($change -ne "n" -and $change -ne "N") {
    git remote set-url origin $remoteUrl
  }
} else {
  git remote add origin $remoteUrl
}

Write-Host ""
Write-Host "Push su GitHub..." -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "Push fallito. Possibili cause:" -ForegroundColor Red
  Write-Host "  - Repo non creato su GitHub"
  Write-Host "  - Login GitHub richiesto (si apre finestra credenziali)"
  Write-Host "  - Username/repo errati"
  exit 1
}

Write-Host ""
Write-Host "GitHub OK: https://github.com/$githubUser/$repoName" -ForegroundColor Green

# 4. Vercel
Write-Host ""
Write-Host "PASSO 3 - Deploy Vercel" -ForegroundColor Green
Write-Host "Al primo avvio Vercel chiedera' login (browser)." -ForegroundColor Yellow
$deploy = Read-Host "Avviare deploy Vercel ora? [S/n]"
if ($deploy -eq "n" -or $deploy -eq "N") {
  Write-Host ""
  Write-Host "Fatto GitHub. Per Vercel:" -ForegroundColor Yellow
  Write-Host "  1. https://vercel.com/new -> Importa repo GitHub"
  Write-Host "  2. Aggiungi variabili da ENV_VARIABLES.txt"
  Write-Host "  3. Deploy"
  exit 0
}

Write-Host ""
Write-Host "Login Vercel (se necessario)..." -ForegroundColor Cyan
npx vercel login

Write-Host ""
Write-Host "Deploy produzione..." -ForegroundColor Cyan
npx vercel --prod --yes

Write-Host ""
Write-Host "=== Completato ===" -ForegroundColor Green
Write-Host ""
Write-Host "Prossimi passi OBBLIGATORI in Vercel Dashboard:" -ForegroundColor Yellow
Write-Host "  Project Settings -> Environment Variables"
Write-Host "  Copia tutte le variabili da ENV_VARIABLES.txt"
Write-Host ""
Write-Host "  Poi in Supabase -> Authentication -> URL Configuration:"
Write-Host "  Site URL e Redirect = URL Vercel"
Write-Host ""
Write-Host "  Stripe webhook:"
Write-Host "  https://TUO-SITO.vercel.app/api/stripe-webhook"
Write-Host ""