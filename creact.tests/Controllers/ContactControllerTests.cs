using Creact.Controllers;
using Creact.Domain;
using Creact.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Creact.Tests.Controllers
{
    public class When_working_with_the_contact_controller
    {
        protected ContactController _contactController;
        protected ContactsContext _contactsContext;

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<ContactsContext>()
                .UseInMemoryDatabase();

            _contactsContext = new ContactsContext(builder.Options);

        }

        public When_working_with_the_contact_controller()
        {
            InitContext();
            _contactController = new ContactController(_contactsContext);
        }
    }

    public class And_adding_a_new_contact : When_working_with_the_contact_controller
    {
        IActionResult _result;
        ContactModel _model;

        void Execute()
        {
            _result = _contactController.Add(_model);
        }

        [Fact]
        public void A_null_contract_returns_bad_request()
        {
            _model = null;

            Execute();

            Assert.IsType<BadRequestObjectResult>(_result);
        }

        [Fact]
        public void Model_errors_are_returned()
        {
            _model = null;

            Execute();

            var expected = new Dictionary<string, string[]>();
            expected.Add("Name", new string[] { "No contact provided" });
            var actual = ((BadRequestObjectResult)_result).Value;
            Assert.Equal(actual, expected);
        }

        [Fact]
        public void A_valid_contact_returns_a_created_action_result()
        {
            _model = new ContactModel { Name = "name", Email = "email@mail.com", Comment = "the comment" };

            Execute();

            Assert.IsType<CreatedAtRouteResult>(_result);
        }

        [Fact]
        public void A_valid_contract_is_added_to_the_data_context()
        {
            _model = new ContactModel { Name = Guid.NewGuid().ToString(), Email = "email@mail.com", Comment = "the comment" };

            Execute();

            Assert.True(_contactsContext.Contacts.Any(c => c.Name == _model.Name));
        }
    }
}