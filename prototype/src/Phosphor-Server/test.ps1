function List-For {
    [CmdletBinding()]
    
    Param (
        [parameter(Mandatory=$true,Position=0)]
        [AllowEmptyString()]
        [string]$directory,

        [parameter(Mandatory=$true,Position=1)]
        [AllowEmptyString()]
        [string]$search          
    )

    PROCESS {
        $children = Get-ChildItem -Recurse -Path $directory;

        foreach ($child in $children) {
            if ($child.Name.Contains($search)) {
                Write-Host $child.Name
            }
        }

    }
}

Get-Command