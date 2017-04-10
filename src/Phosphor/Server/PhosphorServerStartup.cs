//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//

using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace Microsoft.PowerShell.Phosphor
{
    internal class PhosphorServerStartup
    {
        public IConfigurationRoot Configuration { get; }

        public PhosphorServerStartup(IHostingEnvironment env)
        {

            var builder =
                new ConfigurationBuilder()
                    .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDirectoryBrowser();
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddDebug(LogLevel.Trace);

            var clientPath =
                Path.GetFullPath(
                    Path.Combine(
                        Path.GetDirectoryName(this.GetType().GetTypeInfo().Assembly.Location),
                        "../../../../../Phosphor.Client/"));

            app.UseFileServer(new FileServerOptions()
            {
                FileProvider = new PhysicalFileProvider(clientPath),
                RequestPath = new PathString(""),
                EnableDirectoryBrowsing = true
            });

            app.UseMvc();
        }
    }
}
