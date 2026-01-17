@echo off
REM Image to WebP Conversion Script for Windows
REM Converts all JPG, JPEG, and PNG images to WebP format

echo.
echo Image to WebP Converter
echo ==========================
echo.

REM Check if cwebp is in PATH
where cwebp >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: cwebp is not installed or not in PATH
    echo.
    echo Download from: https://developers.google.com/speed/webp/download
    echo Extract and add to PATH or place cwebp.exe in this directory
    echo.
    pause
    exit /b 1
)

REM Check if directory argument is provided
if "%~1"=="" (
    echo Usage: convert-to-webp.bat ^<directory^> [quality]
    echo Example: convert-to-webp.bat .\public\images 85
    echo.
    pause
    exit /b 1
)

set TARGET_DIR=%~1
set QUALITY=85

REM Check if quality argument is provided
if not "%~2"=="" set QUALITY=%~2

echo Target directory: %TARGET_DIR%
echo Quality: %QUALITY%%%
echo.

REM Check if directory exists
if not exist "%TARGET_DIR%" (
    echo Error: Directory '%TARGET_DIR%' does not exist
    pause
    exit /b 1
)

set CONVERTED=0
set SKIPPED=0

REM Convert all image files
for /r "%TARGET_DIR%" %%f in (*.jpg *.jpeg *.png) do (
    set "file=%%f"
    set "filename=%%~dpnf"
    set "webp_file=!filename!.webp"
    
    if exist "!webp_file!" (
        echo Skipping (already exists): %%~nxf
        set /a SKIPPED+=1
    ) else (
        echo Converting: %%~nxf
        cwebp -q %QUALITY% "%%f" -o "!webp_file!" >nul 2>&1
        if !ERRORLEVEL! EQU 0 (
            echo Created: %%~nf.webp
            set /a CONVERTED+=1
        ) else (
            echo Failed: %%~nxf
        )
        echo.
    )
)

echo ==========================
echo Conversion complete!
echo    Converted: %CONVERTED% files
echo    Skipped: %SKIPPED% files
echo.
echo Tip: Keep original files for fallback support
echo.
pause
