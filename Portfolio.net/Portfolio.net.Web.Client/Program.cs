using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Portfolio.net.Shared.Services;
using Portfolio.net.Web.Client.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

// Add device-specific services used by the Portfolio.net.Shared project
builder.Services.AddSingleton<IFormFactor, FormFactor>();

await builder.Build().RunAsync();
