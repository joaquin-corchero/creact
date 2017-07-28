using System.ComponentModel.DataAnnotations;

namespace Creact.Models
{
    public class ContactModel
    {
        [Required]
        [MaxLength(40)]
        [MinLength(3)]
        public string Name { get; set; }

        [Required]
        [MaxLength(150)]
        [MinLength(5)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(500)]
        [MinLength(5)]
        public string Comment { get; set; }
    }
}
