//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System.Collections.Generic;
using System.Linq;
using System.Management.Automation;
using System.Management.Automation.Runspaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.PowerShell.Phosphor.Model;

namespace Microsoft.PowerShell.Phosphor
{
    [Route("api/sessions/{sessionId}/modules")]
    public class ModulesController : Controller
    {
        // GET api/sessions
        [HttpGet]
        public IActionResult Get()
        {
            int sessionId = -1;
            if (int.TryParse((string)this.RouteData.Values["sessionId"], out sessionId))
            {
                ModuleViewModel model = SessionManager.Current.GetSession(sessionId).Model as ModuleViewModel;

                return
                    new ObjectResult(
                        model != null
                            ? model.Modules
                            : Enumerable.Empty<ModuleMetadata>());
            }

            return this.NotFound();
        }

        [HttpGet]
        [Route("items/{nounName}")]
        public IActionResult GetItems()
        {
            int sessionId = -1;
            if (int.TryParse((string)this.RouteData.Values["sessionId"], out sessionId))
            {
                string nounName = (string)this.RouteData.Values["nounName"];
                ModuleViewModel model = SessionManager.Current.GetSession(sessionId).Model as ModuleViewModel;

                if (model != null)
                {
                    var items = model.GetItemsForNoun(nounName);
                    if (items.Count > 0)
                    {
                        TypeData typeData = model.GetTypeData(items[0].BaseObject.GetType().FullName);

                        PSObject psObject = items[0] as PSObject;
                        if (psObject == null)
                        {
                            psObject = new PSObject(items[0]);
                        }

                        string[] displayPropertyNames =
                            typeData != null && typeData.DefaultDisplayPropertySet != null
                                ? typeData.DefaultDisplayPropertySet.ReferencedProperties.ToArray()
                                : psObject.Properties.Select(p => p.Name).ToArray();

                        // Set the default runspace for grabbing property values
                        Runspace.DefaultRunspace = model.Runspace;

                        return new ObjectResult(
                            new {
                                Items = items.Select(obj => this.MakeDisplayObject(obj, displayPropertyNames, model)),
                                Headers = displayPropertyNames
                            });
                    }
                }

                return new ObjectResult(
                    new {
                        Items = new PSObject[0],
                        Headers = new string[0]
                    });
            }

            return this.NotFound();
        }

        private Dictionary<string, object> MakeDisplayObject(
            PSObject obj,
            string[] displayPropertyNames,
            ModuleViewModel model)
        {
            Dictionary<string, object> displayObj = new Dictionary<string, object>();

            foreach (var property in displayPropertyNames)
            {
                PSPropertyInfo propertyInfo = obj.Properties[property];
                object value =
                    propertyInfo != null
                        ? propertyInfo.Value?.ToString()
                        : string.Empty;

                displayObj.Add(property, value);
            }

            return displayObj;
        }
        
        [HttpGet]
        [Route("commands/{commandName}")]
        public IActionResult GetCommandInfo()
        {
            int sessionId = -1;
            if (int.TryParse((string)this.RouteData.Values["sessionId"], out sessionId))
            {
                string commandName = (string)this.RouteData.Values["commandName"];
                ModuleViewModel model = SessionManager.Current.GetSession(sessionId).Model as ModuleViewModel;

                if (model != null)
                {
                    var commandInfo = this.GetCommand(commandName, model.Runspace);

                    if (commandInfo != null)
                    {
                        return new ObjectResult(commandInfo);
                    }
                }
            }

            return this.NotFound();
        }

        private CommandDetails GetCommand(string commandName, Runspace runspace)
        {
            using (var ps = System.Management.Automation.PowerShell.Create())
            {
                ps.Runspace = runspace;
                ps.AddCommand("Get-Command");
                ps.AddArgument(commandName);

                var commandObject = ps.Invoke().FirstOrDefault();

                return CommandDetails.Create(commandObject);
            }
        }
    }

    public class CommandParameter
    {
        public string Name { get; set; }

        public bool IsMandatory { get; set; }

        public string Type { get; set; }

        public static CommandParameter Create(CommandParameterInfo parameter)
        {
            return new CommandParameter
            {
                Name = parameter.Name,
                IsMandatory = parameter.IsMandatory,
                Type = parameter.ParameterType.Name
            };
        }
    }

    public class CommandParameterSet
    {
        public string Name { get; set; }

        public CommandParameter[] Parameters { get; set; }

        public static CommandParameterSet Create(CommandParameterSetInfo paramSet)
        {
            return new CommandParameterSet
            {
                Name = paramSet.Name,
                Parameters = paramSet.Parameters.Select(CommandParameter.Create).ToArray()
            };
        }
    }

    public class CommandDetails
    {
        public string DefaultParameterSet { get; set; }

        public CommandParameterSet[] ParameterSets { get; set; }

        public static CommandDetails Create(PSObject commandObject)
        {
            var command = (System.Management.Automation.CommandInfo)commandObject.BaseObject;

            return new CommandDetails
            {
                DefaultParameterSet = (string)commandObject.Properties["DefaultParameterSet"].Value,
                ParameterSets = command.ParameterSets.Select(CommandParameterSet.Create).ToArray()
            };
        }
    }
}
