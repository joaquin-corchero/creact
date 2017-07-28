using Creact.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Creact.Domain
{
    public class ContactsContext : DbContext
    {
        public ContactsContext(DbContextOptions options)
        : base(options) { }

        public ContactsContext() { }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Data Source =Creact.db");
            }
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
