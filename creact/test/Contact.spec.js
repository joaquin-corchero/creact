import React from 'react';
import Contact from '../client/components/Contact';
import sinon from 'sinon';
import Client from '../client/Client';

describe('When working with the contact component',  () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Contact />);
    });

    function setformFieldValue(id, value, awrapper)
    {
        awrapper.find(id).simulate('change', { target: { value: value } });
    };

    function setFormValues() {
        setformFieldValue('#name', 'A name', wrapper);
        setformFieldValue('#email', 'email@gmail.com', wrapper);
        setformFieldValue('#comment', 'A long, very long comment', wrapper);
    };

    it('contains a form', ()=> {
        expect(wrapper.find('form')).to.be.present();
    });

    it('has a field for the name', () => {
        expect(wrapper.find('[name="name"]')).to.have.tagName('input');
    });

    it('has a field for the email', () => {
        expect(wrapper.find('[name="email"]')).to.have.tagName('input');
    });

    it('has a field for comment', () => {
        expect(wrapper.find('[name="comment"]')).to.have.tagName('textarea')
    });

    it('has a submit button', () => {
        expect(wrapper.find('#send')).to.have.tagName('button');
    });

    it('when loaded the model is empty', () =>
    {
        expect(wrapper.state().fields).to.eql({});
        expect(wrapper.state().fieldErrors).to.eql([]);
        expect(wrapper.state().commentSent).to.be.null;
    });

    it('changes the name state when input changes', () => {
        const newValue = "A name";
        setformFieldValue('#name' , newValue, wrapper);

        expect(wrapper.state().fields.name).to.equal(newValue);
    });

    it('changes the email state when input changes', () => {
        const newValue = "email@gmail.com";
        setformFieldValue('#email' , newValue, wrapper);

        expect(wrapper.state().fields.email).to.equal(newValue);
    });

    it('changes the comment state when input changes', () => {
        const newValue = "This is the new comment";
        setformFieldValue('#comment', newValue, wrapper);

        expect(wrapper.state().fields.comment).to.equal(newValue);
    });

    describe('And submitting the form', () => {
        let ClientMock;
        let post;

        before(function () {
            ClientMock = sinon.mock(Client);
            post = ClientMock.expects("post");
        });

        afterEach(function(){
            ClientMock.restore();
        });

        it('posts the data', () => {
            post.returns(Promise.resolve({ ok: true }));
            setFormValues();
            wrapper.find('#contactForm').simulate('submit');

            expect(post.once().callCount).to.equal(1);

            ClientMock.verify();
        });
    });

    describe('And calling the contact created', () => {
        it('resets the state when post ok', () => {
            setFormValues();
            wrapper.instance().contactCreated({ok: "response"});

            expect(wrapper.state().fields).to.eql({});
            expect(wrapper.state().fieldError).to.eql([]);
            expect(wrapper.state().commentSent).to.be.true;
        });
    });

    describe('And calling the contact failed', () => {
        it('sets commment sent to false when post fails', () => {
            setFormValues();
            wrapper.instance().contactFailed("There was an error");

            expect(wrapper.state().commentSent).to.equal(false);
            expect(wrapper.state().fields.name).to.equal('A name');
            expect(wrapper.state().fields.email).to.equal('email@gmail.com');
            expect(wrapper.state().fields.comment).to.equal('A long, very long comment');
        });
    });
});