//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Management.Automation;
using System.Management.Automation.Runspaces;

namespace Microsoft.PowerShell.Phosphor.Model
{
    public class VerbMetadata
    {
        public string Name { get; set; }
    }

    public class NounMetadata
    {
        private List<VerbMetadata> verbList = new List<VerbMetadata>();
        
        public string Name { get; set; }

        public IEnumerable<VerbMetadata> Verbs => verbList;

        public void AddVerb(string verbName)
        {
            this.verbList.Add(new VerbMetadata { Name = verbName });
        }
    }

    public class ModuleMetadata
    {
        private Dictionary<string, NounMetadata> nounIndex = new Dictionary<string, NounMetadata>();

        public string Name { get; set; }

        public IEnumerable<NounMetadata> Nouns => nounIndex.Values;

        public void AddCommand(string verbName, string nounName)
        {
            NounMetadata nounMetadata;

            if (!this.nounIndex.TryGetValue(nounName, out nounMetadata))
            {
                nounMetadata = new NounMetadata { Name = nounName };
                nounIndex.Add(nounName, nounMetadata);
            }

            nounMetadata.AddVerb(verbName);
        }
    }

    public class ModuleViewModel : ModelBase
    {
        private IDictionary<string, ModuleMetadata> moduleIndex;

        // Provides a runspace for executing commands so
        // that we don't use the host Runspace
        internal Runspace Runspace { get; private set; }

        public IEnumerable<ModuleMetadata> Modules => moduleIndex.Values;

        public ModuleViewModel(Collection<PSObject> commandList)
            : base(ModelType.ModuleView)
        {
            this.moduleIndex = this.BuildModuleIndex(commandList);
            this.Runspace = RunspaceFactory.CreateRunspace();
            this.Runspace.Open();
        }

        public Collection<PSObject> GetItemsForNoun(string nounName)
        {
            using (var ps = System.Management.Automation.PowerShell.Create())
            {
                ps.Runspace = this.Runspace;
                ps.AddCommand($"Get-{nounName}");
                return ps.Invoke();
            }
        }

        public TypeData GetTypeData(string typeName)
        {
            using (var ps = System.Management.Automation.PowerShell.Create())
            {
                ps.Runspace = this.Runspace;
                ps.AddCommand("Get-TypeData");
                ps.AddParameter("TypeName", typeName);

                return
                    ps.Invoke()
                      .Select(o => o.BaseObject)
                      .OfType<TypeData>()
                      .FirstOrDefault();
            }
        }

        private IDictionary<string, ModuleMetadata> BuildModuleIndex(Collection<PSObject> commandList)
        {
            Dictionary<string, ModuleMetadata> moduleIndex = new Dictionary<string, ModuleMetadata>();

            foreach (PSObject commandObj in commandList)
            {
                string moduleName = (string)commandObj.Properties["Source"].Value;
                string commandName = (string)commandObj.Properties["Name"].Value;
                CommandTypes commandType = (CommandTypes)commandObj.Properties["CommandType"].Value;

                var commandParts = commandName.Split('-');

                if ((commandType == CommandTypes.Function ||
                     commandType == CommandTypes.Cmdlet) &&
                    commandParts.Length == 2)
                {
                    string noun = commandParts[1];
                    string verb = commandParts[0];

                    ModuleMetadata moduleMetadata = null;

                    if (!moduleIndex.TryGetValue(moduleName, out moduleMetadata))
                    {
                        moduleMetadata = new ModuleMetadata { Name = moduleName };
                        moduleIndex.Add(moduleName, moduleMetadata);
                    }

                    moduleMetadata.AddCommand(verb, noun);
                }
            }

            return moduleIndex;
        }
    }
}
