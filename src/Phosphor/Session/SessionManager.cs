//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System.Collections.Generic;
using System.Linq;
using Microsoft.PowerShell.Phosphor.Model;

namespace Microsoft.PowerShell.Phosphor
{
    public class SessionManager
    {
        #region Private Fields

        private PhosphorServer phosphorServer;
        private List<PhosphorSession> sessionList = new List<PhosphorSession>();

        private static SessionManager currentInstance;

        #endregion

        #region Public Properties

        public static SessionManager Current
        {
            get
            {
                if (currentInstance == null)
                {
                    currentInstance = new SessionManager();
                }

                return currentInstance;
            }
            set
            {
                currentInstance = value;
            }
        }

        public IEnumerable<PhosphorSession> Sessions => this.sessionList.Where(s => s != null);

        #endregion

        #region Public Methods

        public PhosphorSession StartSession(ModelBase sessionModel)
        {
            if (this.phosphorServer == null)
            {
                this.phosphorServer = new PhosphorServer();
                this.phosphorServer.Start();
            }

            PhosphorSession newSession =
                new PhosphorSession(
                    this.sessionList.Count + 1,
                    this.phosphorServer.ServerBaseUri,
                    sessionModel);

            this.sessionList.Add(newSession);

            return newSession;
        }

        public void StopSession(PhosphorSession phosphorSession)
        {
            this.sessionList[phosphorSession.Id - 1] = null;
        }

        public PhosphorSession GetSession(int sessionId)
        {
            return this.sessionList[sessionId - 1];
        }

        #endregion
    }
}