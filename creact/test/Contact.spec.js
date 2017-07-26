import React from 'react';
import Contact from '../client/components/Contact';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';


describe('When working with the contact component',  () => {
    const wrapper = shallow(<Contact />)

    function setformFieldValue(id, value)
    {
        wrapper.find(id).simulate('change', { target: { value: value } });
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
        setformFieldValue('#name' , newValue);

        expect(wrapper.state().name).to.equal(newValue);
    });

    it('changes the email state when input changes', () => {
        const newValue = "email@gmail.com";
        setformFieldValue('#email' , newValue);

        expect(wrapper.state().email).to.equal(newValue);
    });

    it('changes the comment state when input changes', () => {
        const newValue = "This is the new comment";
        setformFieldValue('#comment' , newValue);

        expect(wrapper.state().comment).to.equal(newValue);
    });

    describe('And submitting the form', () => {
        function setFormValues(){
            setformFieldValue('#name' , 'A name');
            setformFieldValue('#email' , 'email@gmail.com');
            setformFieldValue('#comment' , 'A long, very long comment');
        };
        /*
        it('resets the state when post ok', () =>{
            setFormValues();
            var res = new Response('{"hello":"world"}', {
                status: 200,
                headers: {
                'Content-type': 'application/json'
                }
            });
            stubedFetch.returns(Promise.resolve(res));
            wrapper.find('#contactForm').simulate('submit', { preventDefault() {} })

            expect(wrapper.state().name).to.equal('');
            expect(wrapper.state().email).to.equal('');
            expect(wrapper.state().comment).to.equal('');
            expect(wrapper.state().commentSent).to.equal(true);
        });*/
        
        it('posts the data', () => {
            fetchMock.post('*', {hello: 'world'});
            wrapper.find('#send').simulate('click');
            //assert(jQuery.ajax.calledWithMatch({ url: '/todo/42/items' }));
            expect(fetchMock.calls().matched.length).to.equal(1);
            fetchMock.restore();
        });

        /*
        it('sets commment sent to false when post fails', () =>{
            stubedFetch.returns(new Error("oh noes!"));
            wrapper.find('#send').simulate('click');

            expect(wrapper.state().commentSent).to.equal(false);
        });*/
    });
});