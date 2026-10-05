using System.ComponentModel.DataAnnotations;

namespace CustomerRegisApi.Entities;
public class Occupation
{
    public int Id { get; set; }

    [StringLength(200)]
    public string OccupationName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}