//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System.Diagnostics;
using System.Management.Automation;
using System.Runtime.InteropServices;
using Microsoft.PowerShell.Phosphor.Model;

namespace Microsoft.PowerShell.Phosphor
{
    [Cmdlet(VerbsCommon.Show, "Module")]
    public class ShowModuleCmdlet : PSCmdlet
    {
        private PhosphorSession currentSession;

        [Parameter]
        public string[] Module { get; set; }

        protected override void ProcessRecord()
        {
            var getCommandScript =
                this.Module != null
                    ? $"Get-Command -Module {string.Join(", ", this.Module)}"
                    : "Get-Command";

            var commandList = this.InvokeCommand.InvokeScript(getCommandScript, true);

            this.currentSession =
                SessionManager.Current.StartSession(
                    new ModuleViewModel(commandList));

            Process browserProcess = new Process();
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                browserProcess.StartInfo.FileName = "xdg-open";
                browserProcess.StartInfo.Arguments = this.currentSession.Uri.AbsoluteUri;
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                browserProcess.StartInfo.FileName = "open";
                browserProcess.StartInfo.Arguments = this.currentSession.Uri.AbsoluteUri;
            }
            else
            {
                // TODO: This won't work on Windows when running in CoreCLR.  See this
                // code in PowerShell Core:
                // https://github.com/PowerShell/PowerShell/blob/7f83c48ca5e39bc98dbb9071d414bd02166cd4af/src/System.Management.Automation/engine/Utils.cs#L1608
                browserProcess.StartInfo.FileName = this.currentSession.Uri.AbsoluteUri;
            }

            browserProcess.Start();
        }
    }
}