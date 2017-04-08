//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System.Collections.ObjectModel;
using System.Management.Automation;
using System.Management.Automation.Runspaces;

namespace Microsoft.PowerShell.Phosphor.Model
{
    public class ModuleViewModel : ModelBase
    {
        private Collection<PSObject> commandList;

        // Provides a runspace for executing commands so
        // that we don't use the host Runspace
        internal Runspace Runspace { get; private set; }
        
        public ModuleViewModel(Collection<PSObject> commandList)
            : base(ModelType.ModuleView)
        {
            this.commandList = commandList;
            this.Runspace = RunspaceFactory.CreateRunspace();
        }
    }
}
