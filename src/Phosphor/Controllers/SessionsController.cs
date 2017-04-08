//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Microsoft.PowerShell.Phosphor
{
    [Route("api/[controller]")]
    public class SessionsController : Controller
    {
        // GET api/sessions
        [HttpGet]
        public IEnumerable<PhosphorSession> Get()
        {
            return SessionManager.Current.Sessions;
        }

        // GET api/sessions/5
        [HttpGet("{id}")]
        public PhosphorSession Get(int id)
        {
            return SessionManager.Current.GetSession(id);
        }
    }
}
