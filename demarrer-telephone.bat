@echo off
cd /d "%~dp0"
echo.
echo  ================================================
echo    Entrainement C - acces depuis le telephone
echo  ================================================
echo.
echo  1. Ton telephone doit etre sur le MEME Wi-Fi que ce PC.
echo  2. Tape l'une de ces adresses dans le navigateur du telephone :
echo.
for /f %%i in ('powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 ^| Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254*' }).IPAddress"') do echo        http://%%i:4173
echo.
echo  3. Si Windows demande une autorisation pare-feu : AUTORISER.
echo  4. Laisse cette fenetre ouverte pendant l'entrainement.
echo.
python -m http.server 4173 --bind 0.0.0.0
pause
