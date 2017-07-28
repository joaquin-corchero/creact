import React from 'react';
import Contact from '../client/components/Contact';
import sinon from 'sinon';
import Client from '../client/Client';

describe('When working with the contact component',  () => {
    const wrapper = shallow(<Contact />);

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
        expect(wrapper.type()).to.eql('form');
    });

    it('has a field for the name', () => {
        expect(wrapper.find('#name')).to.have.tagName('input');
    });

    it('has a field for the email', () => {
        expect(wrapper.find('#email')).to.have.tagName('input');
    });

    it('has a field for comment', () => {
        expect(wrapper.find('#comment')).to.have.tagName('textarea')
    });

    it('has a submit button', () => {
        expect(wrapper.find('#send')).to.have.tagName('button');
    });

    it('when loaded email is be empty', () =>
    {
        expect(wrapper.state().email).to.equal('');
        expect(wrapper.state().name).to.equal('');
        expect(wrapper.state().comment).to.equal('');
        expect(wrapper.state().commentSent).to.equal(null);
    });

    it('when loaded name is be empty', () =>
    {
        expect(wrapper.state().name).to.equal('');
    });
    
    it('when loaded comment is be empty', () =>
    {
        expect(wrapper.state().comment).to.equal('');
    });

    it('changes the name state when input changes', () => {
        const newValue = "A name";
        setformFieldValue('#name' , newValue, wrapper);

        expect(wrapper.state().name).to.equal(newValue);
    });

    it('changes the email state when input changes', () => {
        const newValue = "email@gmail.com";
        setformFieldValue('#email' , newValue, wrapper);

        expect(wrapper.state().email).to.equal(newValue);
    });

    it('changes the comment state when input changes', () => {
        const newValue = "This is the new comment";
        setformFieldValue('#comment' , newValue, wrapper);

        expect(wrapper.state().comment).to.equal(newValue);
    });

    describe('And submitting the form', () => {
        const wrapper = mount(<Contact />);
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

            wrapper.find('#contactForm').simulate('submit');

            expect(post.once().callCount).to.equal(1);

            ClientMock.verify();
        });
    });

    describe('And calling the contact created', () => {
        it('resets the state when post ok', () => {
            setFormValues();
            wrapper.instance().contactCreated({ok: "response"});

            expect(wrapper.state().name).to.equal('');
            expect(wrapper.state().email).to.equal('');
            expect(wrapper.state().comment).to.equal('');
            expect(wrapper.state().commentSent).to.be.true;
        });
    });

    describe('And calling the contact failed', () => {
        it('sets commment sent to false when post fails', () => {
            setFormValues();
            wrapper.instance().contactFailed("There was an error");

            expect(wrapper.state().commentSent).to.equal(false);
            expect(wrapper.state().name).to.equal('A name');
            expect(wrapper.state().email).to.equal('email@gmail.com');
            expect(wrapper.state().comment).to.equal('A long, very long comment');
        });
    });
});