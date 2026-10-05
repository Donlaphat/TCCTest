using System.ComponentModel.DataAnnotations;

namespace CustomerRegisApi.Entities;

public class Customer
{
    public int Id { get; set; }

    [Required(ErrorMessage = "First Name is required.")]
    [StringLength(200)]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Last Name is required.")]
    [StringLength(200)]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email address format.")]
    [StringLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Phone number is required.")]
    [Phone(ErrorMessage = "Invalid phone number format.")]
    [StringLength(15)]
    public string Phone { get; set; } = string.Empty;

    [Required(ErrorMessage = "Profile is required.")]
    public byte[] Profile { get; set; } = [];

    [Required(ErrorMessage = "BirthDay is required.")]
    public DateOnly BirthDay { get; set; }

    [Required(ErrorMessage = "Occupation is required.")]
    public int OccupationId { get; set; }

    [Required(ErrorMessage = "Gender is required.")]
    public int GenderId { get; set; }
    public DateTime CreatedAt { get; set; }
}