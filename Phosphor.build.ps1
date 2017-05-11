#
# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project root for full license information.
#

param(
    [ValidateSet("Debug", "Release")]
    [string]$Configuration = "Debug"
)

#Requires -Modules @{ModuleName="InvokeBuild";ModuleVersion="3.2.1"}

$script:IsCIBuild = $env:APPVEYOR -ne $null
$script:IsUnix = $PSVersionTable.PSEdition -and $PSVersionTable.PSEdition -eq "Core" -and !$IsWindows

if ($PSVersionTable.PSEdition -ne "Core") {
    Add-Type -Assembly System.IO.Compression.FileSystem
}

task SetupDotNet -Before Restore, Clean, BuildModule, Test {

    $requiredSdkVersion = "1.0.0"

    $needsInstall = $true
    $dotnetPath = "$PSScriptRoot/.dotnet"
    $dotnetExePath = if ($script:IsUnix) { "$dotnetPath/dotnet" } else { "$dotnetPath/dotnet.exe" }
    $originalDotNetExePath = $dotnetExePath

    if (!(Test-Path $dotnetExePath)) {
        $installedDotnet = Get-Command dotnet -ErrorAction Ignore
        if ($installedDotnet) {
            $dotnetExePath = $installedDotnet.Source
        }
        else {
            $dotnetExePath = $null
        }
    }

    # Make sure the dotnet we found is the right version
    if ($dotnetExePath -and (& $dotnetExePath --version) -eq $requiredSdkVersion) {
        $script:dotnetExe = $dotnetExePath
    }
    else {
        # Clear the path so that we invoke installation
        $script:dotnetExe = $null
    }

    if ($script:dotnetExe -eq $null) {

        Write-Host "`n### Installing .NET CLI $requiredSdkVersion...`n" -ForegroundColor Green

        # The install script is platform-specific
        $installScriptExt = if ($script:IsUnix) { "sh" } else { "ps1" }

        # Download the official installation script and run it
        $installScriptPath = "$([System.IO.Path]::GetTempPath())dotnet-install.$installScriptExt"
        Invoke-WebRequest "https://raw.githubusercontent.com/dotnet/cli/rel/1.0.0-rc3/scripts/obtain/dotnet-install.$installScriptExt" -OutFile $installScriptPath
        $env:DOTNET_INSTALL_DIR = "$PSScriptRoot/.dotnet"

        if (!$script:IsUnix) {
            & $installScriptPath -Version $requiredSdkVersion -InstallDir "$env:DOTNET_INSTALL_DIR"
        }
        else {
            & /bin/bash $installScriptPath -Version $requiredSdkVersion -InstallDir "$env:DOTNET_INSTALL_DIR"
            $env:PATH = $dotnetExeDir + [System.IO.Path]::PathSeparator + $env:PATH
        }

        Write-Host "`n### Installation complete." -ForegroundColor Green
        $script:dotnetExe = $originalDotnetExePath
    }

    # This variable is used internally by 'dotnet' to know where it's installed
    $script:dotnetExe = Resolve-Path $script:dotnetExe
    if (!$env:DOTNET_INSTALL_DIR)
    {
        $dotnetExeDir = [System.IO.Path]::GetDirectoryName($script:dotnetExe)
        $env:PATH = $dotnetExeDir + [System.IO.Path]::PathSeparator + $env:PATH
        $env:DOTNET_INSTALL_DIR = $dotnetExeDir
    }

    Write-Host "`n### Using dotnet v$requiredSDKVersion at path $script:dotnetExe`n" -ForegroundColor Green
}

function NeedsRestore($rootPath) {
    # This checks to see if the number of folders under a given
    # path (like "src" or "test") is greater than the number of
    # obj\project.assets.json files found under that path, implying
    # that those folders have not yet been restored.
    $projectAssets = (Get-ChildItem "$rootPath\*\obj\project.assets.json")
    return ($projectAssets -eq $null) -or ((Get-ChildItem $rootPath).Length -gt $projectAssets.Length)
}

task Restore -If { "Restore" -in $BuildTask -or (NeedsRestore(".\src")) } -Before Clean, BuildModule, Test {
    exec { & $script:dotnetExe restore .\src\Phosphor\Phosphor.csproj }
}

task Clean {
    exec { & $script:dotnetExe clean .\src\Phosphor\Phosphor.csproj }
}

task BuildModule {
    if (!$script:IsUnix) {
        exec { & $script:dotnetExe publish -c $Configuration .\src\Phosphor\Phosphor.csproj -f net451 }
        Write-Host "" # Newline
    }

    exec { & $script:dotnetExe publish -c $Configuration .\src\Phosphor\Phosphor.csproj -f netstandard1.6 }
}

task BuildClient {
    Set-Location ./src/Phosphor.Client
    exec { & npm install }
    exec { & npm run tsc }
}

task BuildElectron {
    # TODO: Build the Electron binaries here
}

task Build BuildModule, BuildClient

task Test {
    # TODO: Add tests
}

task LayoutModule {
    # TODO: Will be used to layout the release version of the Phosphor module
}

task PackageModule {
    # [System.IO.Compression.ZipFile]::CreateFromDirectory(
    #     "$PSScriptRoot/module/Phosphor",
    #     "$PSScriptRoot/module/Phosphor-$($script:FullVersion).zip",
    #     [System.IO.Compression.CompressionLevel]::Optimal,
    #     $true)
}

task UploadArtifacts -If ($script:IsCIBuild) {
    # if ($env:APPVEYOR) {
    #     Push-AppveyorArtifact .\module\PowerShellEditorServices-$($script:FullVersion).zip
    # }
}

task RunModule Build, {
   powershell -NoProfile -NoExit -Command {
        param($repoPath)

        function prompt {
            Write-Host -NoNewline -ForegroundColor Yellow "[PHOSPHOR] $($pwd.Path)"
            return ' > '
        }

        Set-Location $repoPath
        Import-Module ./src/Phosphor/Phosphor.psd1
        Show-Module -OpenInBrowser
    } -Args $PSScriptRoot
}

# The default task is to run the entire CI build
task . Clean, Build, BuildElectron, Test, PackageModule, UploadArtifacts
