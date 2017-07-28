using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Creact.Domain.Models;
using Creact.Domain;
using Creact.Models;

namespace Creact.Controllers
{
    [Route("api/[controller]s")]
    public class ContactController : Controller
    {
        readonly ContactsContext _contactsContext;

        public ContactController(ContactsContext contactsContext)
        {
            _contactsContext = contactsContext;
        }

        Dictionary<string, string[]> TransformModelState()
        {
            var errorList = ModelState.ToDictionary(
                 kvp => kvp.Key,
                 kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
             );
            return errorList;
        }

        [HttpPost]
        public IActionResult Add([FromBody] ContactModel model)
        {
            if (model == null)
                ModelState.AddModelError("Name", "No contact provided");

            if (!ModelState.IsValid)
                return BadRequest(TransformModelState());

            var contact = new Contact(model.Name, model.Email, model.Comment);

            _contactsContext.Add(contact);
            _contactsContext.SaveChanges();


            return CreatedAtRoute(contact.ContactId, contact);
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _contactsContext.Contacts.ToList();
        }
    }

}