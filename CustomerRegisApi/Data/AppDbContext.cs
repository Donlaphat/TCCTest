using Microsoft.EntityFrameworkCore;
using CustomerRegisApi.Entities;

namespace CustomerRegisApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Gender> Genders => Set<Gender>();
    public DbSet<Occupation> Occupations => Set<Occupation>();
}