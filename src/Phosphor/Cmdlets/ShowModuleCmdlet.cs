//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System.Management.Automation;
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

            // TODO: This needs to be modified for Linux and macOS
            // Example: https://github.com/PowerShell/PowerShell/blob/7f83c48ca5e39bc98dbb9071d414bd02166cd4af/src/System.Management.Automation/help/HelpCommands.cs#L635
            System.Diagnostics.Process.Start(this.currentSession.Uri.AbsoluteUri);
        }
    }
}