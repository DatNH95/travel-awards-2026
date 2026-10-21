param([int]$Port = 3000)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$localUrl = "http://127.0.0.1:$Port/dang-ky-de-cu"
$listener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1

if ($listener) {
    $serverProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($listener.OwningProcess)"
    $isProject = $false
    for ($index = 0; $index -lt 4 -and $serverProcess; $index++) {
        if ($serverProcess.CommandLine -and $serverProcess.CommandLine.IndexOf($projectRoot, [StringComparison]::OrdinalIgnoreCase) -ge 0) { $isProject = $true; break }
        $serverProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($serverProcess.ParentProcessId)" -ErrorAction SilentlyContinue
    }
    if (-not $isProject) { throw "Port $Port is already in use. No process was stopped or replaced." }
    $response = Invoke-WebRequest -Uri $localUrl -UseBasicParsing -TimeoutSec 20
    Write-Output "Local server already running: $localUrl (HTTP $($response.StatusCode))"
    exit 0
}

$logDirectory = Join-Path $projectRoot '.local-runtime'
New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null
$nextCli = Join-Path $projectRoot 'node_modules/next/dist/bin/next'
$nodeExecutable = (Get-Command node -CommandType Application | Select-Object -First 1).Source
$serverProcess = Start-Process -FilePath $nodeExecutable -ArgumentList @("`"$nextCli`"", 'dev', '--hostname', '127.0.0.1', '--port', "$Port") -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logDirectory 'stdout.log') -RedirectStandardError (Join-Path $logDirectory 'stderr.log') -PassThru
$serverProcess.Id | Set-Content -LiteralPath (Join-Path $logDirectory 'pid.txt')

$deadline = (Get-Date).AddSeconds(25)
while ((Get-Date) -lt $deadline) {
    $serverProcess.Refresh()
    if ($serverProcess.HasExited) { throw "Local server exited. Inspect $logDirectory/stdout.log and stderr.log." }
    try {
        $response = Invoke-WebRequest -Uri $localUrl -UseBasicParsing -TimeoutSec 3
        Write-Output "Local server ready: $localUrl (HTTP $($response.StatusCode)); PID $($serverProcess.Id)"
        exit 0
    } catch { Start-Sleep -Milliseconds 500 }
}
throw "Local server is still starting. Inspect $logDirectory/stdout.log and stderr.log; do not start another server."
