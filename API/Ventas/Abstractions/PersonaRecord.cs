namespace Ventas.Abstractions
{
    public record PersonaRecord (
        int Id,
        string Nombre,
        string Apellido, 
        string Telefono,
        string Email,
        string DNI
    );

}

//var persona = new PersonaDto(1, "Daniel", "Féliz", "M", 18, "809-123-4567", "daniel@email.com");

//// Crear una nueva persona cambiando solo el email
//var otraPersona = persona with { Email = "nuevo@email.com" };

