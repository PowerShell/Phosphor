#
# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
#

if (!$PSVersionTable.PSEdition -or $PSVersionTable.PSEdition -eq "Desktop") {
    Import-Module -Name "$PSScriptRoot/bin/Debug/net451/publish/Phosphor.dll" | Out-Null
}
else {
    Import-Module -Name "$PSScriptRoot/bin/Debug/netstandard1.6/publish/Phosphor.dll" | Out-Null
}
