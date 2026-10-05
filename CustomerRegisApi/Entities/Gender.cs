using System.ComponentModel.DataAnnotations;

namespace CustomerRegisApi.Entities;

public class Gender
{
    public int Id { get; set; }

    [StringLength(50)]
    public string GenderName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}