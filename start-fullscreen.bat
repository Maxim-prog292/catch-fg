@echo off
setlocal
cd /d "%~dp0"

set "GAME_FILE=%CD%\index.html"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "EDGE64=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "CHROME86=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"

if exist "%EDGE%" (
  start "" "%EDGE%" --kiosk "%GAME_FILE%" --edge-kiosk-type=fullscreen --no-first-run
  exit /b
)

if exist "%EDGE64%" (
  start "" "%EDGE64%" --kiosk "%GAME_FILE%" --edge-kiosk-type=fullscreen --no-first-run
  exit /b
)

if exist "%CHROME%" (
  start "" "%CHROME%" --kiosk "%GAME_FILE%" --no-first-run
  exit /b
)

if exist "%CHROME86%" (
  start "" "%CHROME86%" --kiosk "%GAME_FILE%" --no-first-run
  exit /b
)

start "" "%GAME_FILE%"
