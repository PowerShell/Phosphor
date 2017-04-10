//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System;
using Microsoft.PowerShell.Phosphor.Model;

namespace Microsoft.PowerShell.Phosphor
{
    public class PhosphorSession
    {
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
    }
}
