using Ventas.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.OpenApi.Models;
using Ventas.AutoMapperConfig;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Configuracion de DbContext

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
// );

builder.Services.AddAutoMapper(typeof(AutoMapperConfigProfile));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Add Identity
// builder.Services
//     .AddIdentity<ApplicationUser, IdentityRole>()
//     .AddEntityFrameworkStores<ApplicationDbContext>()
//     .AddDefaultTokenProviders();

// Config Identity

// builder.Services.Configure<IdentityOptions>(options =>
// {
//     options.Password.RequiredLength = 8;
//     options.Password.RequireDigit = false;
//     options.Password.RequireLowercase = false;
//     options.Password.RequireUppercase = false;
//     options.Password.RequireNonAlphanumeric = false;
//     options.SignIn.RequireConfirmedAccount = false;
//     options.SignIn.RequireConfirmedEmail = false;
//     options.SignIn.RequireConfirmedPhoneNumber = false;
// });

// Autenticacion
// builder.Services
//     .AddAuthentication(options =>
//     {
//         options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//         options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//         options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//     })
//     .AddJwtBearer(options =>
//     {
//         options.SaveToken = true;
//         options.RequireHttpsMetadata= false;
//         options.TokenValidationParameters = new TokenValidationParameters()
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidIssuer = builder.Configuration["JwtSettings:ValidIssuer"],
//             ValidAudience = builder.Configuration["JwtSettings:ValidAudience"],
//             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Secret"]))
//         };
//     });

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Please enter your token with this format: ''Bearer YOUR_TOKEN''",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Name = "Bearer",
                In = ParameterLocation.Header,
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithHeaders("Authorization"); 
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
        options.DocumentTitle = "Inventario Ventas";
    }
    );
}

// app.UseStatusCodePages();
app.UseHttpsRedirection();
app.UseCors("MyPolicy");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.MapSwagger().RequireAuthorization();
app.MapControllers();
app.Run();