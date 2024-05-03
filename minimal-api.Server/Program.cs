using minimal_api.Server.Service.IServices;
using minimal_api.Server.Service.Services;
using System.Text.Json;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<ITenantService, TenantService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
var app = builder.Build();

app.MapGet("/api/tenants", async (ITenantService tenantService) =>
{
    var tenants = tenantService.GetAllTenants();
    return tenants;
});

app.MapGet("/api/tenants/{id}", (int id, ITenantService tenantService) =>
{
    var tenant = tenantService.GetTenantById(id);
    if (tenant == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(tenant);
});

app.UseCors("AllowAnyOrigin");
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
