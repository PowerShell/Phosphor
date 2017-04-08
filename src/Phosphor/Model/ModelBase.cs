//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Microsoft.PowerShell.Phosphor.Model
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum ModelType
    {
        ModuleView,
    }

    public class ModelBase
    {
        public ModelType Type { get; private set; }

        public ModelBase(ModelType modelType)
        {
            this.Type = modelType;
        }
    }
}