using BFF.web.Interfaces;
using BFF.web.Middleware;
using BFF.web.Services;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<IEpisodiosService, EpisodiosService>((sp, client) =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    client.BaseAddress = new Uri(config["rickandmortyBaseURL"]!);
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});

// Nombre de la política CORS (puede ser cualquiera)
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Agregar el servicio CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            // con la URL real donde se ejecuta tu aplicación Angular.
            policy
                //.WithOrigins("http://localhost:4200", "https://mi-tienda.com") // Dominio(s) de tu frontend
                .AllowAnyOrigin() // Permite cualquier dominio
                .AllowAnyHeader() // Permite cualquier encabezado HTTP (Content-Type, etc.)
                .AllowAnyMethod(); // Permite GET, POST, PUT, DELETE, etc.

            // Si usas credenciales (cookies o autenticación), usa:
            // .AllowCredentials(); 
            // En ese caso, NO puedes usar *.WithOrigins("*")
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Habilitar el Middleware CORS usando la política definida
app.UseCors(MyAllowSpecificOrigins);

app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
