//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;

#if NETSTANDARD1_6
using System.Runtime.Loader;
#endif

namespace Microsoft.PowerShell.Phosphor
{
    public class PhosphorServer
    {
        private IWebHost host;
        
        private string assemblyBasePath;

        public bool IsStarted { get; private set; }

        public Uri ServerBaseUri { get; private set; }

        public void Start()
        {
            this.assemblyBasePath = Path.GetDirectoryName(this.GetType().GetTypeInfo().Assembly.Location);

            var clientPath =
                Path.GetFullPath(
                    Path.Combine(
                        Path.GetDirectoryName(this.GetType().GetTypeInfo().Assembly.Location),
                        "../../../../../Phosphor.Client/"));

#if NETSTANDARD1_6
            AssemblyLoadContext.Default.Resolving += this.OnAssemblyResolve;
#elif NET451
            AppDomain.CurrentDomain.AssemblyResolve += this.OnAssemblyResolve;
#endif

            this.ServerBaseUri = new Uri("http://localhost:5001");

            this.host = new WebHostBuilder()
#if NETSTANDARD1_6
                .UseKestrel()
#elif NET451
                .UseWebListener()
#endif
                .UseContentRoot(clientPath)
                .UseSetting("detailedErrors", "true")
                .UseStartup<PhosphorServerStartup>()
                .CaptureStartupErrors(true)
                .UseUrls(this.ServerBaseUri.AbsoluteUri)
                .Build();

            this.host.Start();

            this.IsStarted = true;
        }

        public void Stop()
        {
            if (this.IsStarted && this.host != null)
            {
                this.IsStarted = false;
                this.host.Dispose();
            }
        }

#if NETSTANDARD1_6
        private Assembly OnAssemblyResolve(AssemblyLoadContext assemblyLoadContext, AssemblyName assemblyName)
        {
            string assemblyNameString = assemblyName.Name;
#elif NET451
        private Assembly OnAssemblyResolve(object sender, ResolveEventArgs args)
        {
            string assemblyNameString = args.Name;
#endif
            try
            {
                if (assemblyNameString.StartsWith("Phosphor"))
                {
                    return this.GetType().GetTypeInfo().Assembly;
                }
                else
                {
                    // Console.WriteLine("Looking for assembly: " + assemblyName.Name);

                    // return
                    //     assemblyLoadContext.LoadFromAssemblyPath(
                    //         Path.Combine(
                    //             this.assemblyBasePath,
                    //             assemblyName.Name + ".dll"));
               }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Exception while loading assembly {assemblyNameString}:\n\n{e.ToString()}");
            }

            return null;
        }
    }
}
