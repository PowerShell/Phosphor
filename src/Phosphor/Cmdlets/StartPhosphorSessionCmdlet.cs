//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System.Management.Automation;
using Microsoft.PowerShell.Phosphor.Model;

namespace Microsoft.PowerShell.Phosphor
{
    [Cmdlet(VerbsLifecycle.Start, "PhosphorSession")]
    public class StartPhosphorSessionCmdlet : Cmdlet
    {
        [ValidateNotNull]
        public ModelBase Model { get; set; }

        protected override void ProcessRecord()
        {
            this.WriteObject(
                SessionManager.Current.StartSession(
                    this.Model));
        }
    }
}
