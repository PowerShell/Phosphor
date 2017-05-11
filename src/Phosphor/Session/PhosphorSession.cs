//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System;
using System.IO;
using System.Reflection;
using Microsoft.PowerShell.Phosphor.Model;

namespace Microsoft.PowerShell.Phosphor
{
    public class PhosphorSession
    {
        private static string ClientPath;

        public int Id { get; private set; }

        public Uri Uri { get; private set; }

        public ModelBase Model { get; private set; }

        public PhosphorSession(
            int sessionId,
            Uri serverBaseUri,
            ModelBase model)
        {
            this.Id = sessionId;
            this.Uri = new Uri(serverBaseUri, $"?session={sessionId}");
            this.Model = model;
        }

        public string GetClientPath(string subPath = "")
        {
            if (ClientPath == null)
            {
                ClientPath =
                    Path.GetFullPath(
                        Path.Combine(
                            Path.GetDirectoryName(this.GetType().GetTypeInfo().Assembly.Location),
                            "../../../../../Phosphor.Client/"));
            }

            return $"\"{Path.Combine(ClientPath, subPath)}\"";
        }
    }
}
