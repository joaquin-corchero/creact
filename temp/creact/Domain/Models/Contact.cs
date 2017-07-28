using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Creact.Domain.Models
{
    public class Contact
    {
        public Guid ContactId { get; internal set; }

        [Required]
        [MaxLength(40)]
        public string Name { get; internal set; }

        [Required]
        [MaxLength(150)]
        public string Email { get; internal set; }

        [Required]
        [MaxLength(500)]
        public string Comment { get; internal set; }

        public Contact() { }

        public Contact(string name, string email, string comment)
        {
            Name = name;
            Email = email;
            Comment = comment;
        }
    }
}
