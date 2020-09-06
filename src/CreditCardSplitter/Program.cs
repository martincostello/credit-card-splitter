// Copyright (c) Martin Costello, 2020. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace MartinCostello.CreditCardSplitter
{
    public static class Program
    {
        public static async Task Main()
        {
            var builder = WebAssemblyHostBuilder.CreateDefault();

            builder.RootComponents.Add<App>("app");

            await builder.Build().RunAsync();
        }
    }
}
