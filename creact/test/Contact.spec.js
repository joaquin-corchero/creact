import React from 'react';
import Contact from '../client/components/Contact';

describe('Contact form',  () => {
    const wrapper = shallow(<Contact />)

    it('should contain a form', ()=> {
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

    it('when loaded email should be null', () =>
    {
        expect(wrapper.state().email).to.equal(null);
        expect(wrapper.state().name).to.equal(null);
        expect(wrapper.state().comment).to.equal(null);
        expect(wrapper.state().commentSent).to.equal(null);
    });

    it('when loaded name should be null', () =>
    {
        expect(wrapper.state().name).to.equal(null);
    });
    
    it('when loaded comment should be null', () =>
    {
        expect(wrapper.state().comment).to.equal(null);
    });

    it('changes the name state when input changes', () => {
        const newValue = "A name";
        wrapper.find('#name').simulate('change', { target: { value: newValue } });

        expect(wrapper.state().name).to.equal(newValue);
    });

    it('changes the email state when input changes', () => {
        const newValue = "email@gmail.com";
        wrapper.find('#email').simulate('change', { target: { value: newValue } });

        expect(wrapper.state().email).to.equal(newValue);
    });

    it('changes the comment state when input changes', () => {
        const newValue = "This is the new comment";
        wrapper.find('#comment').simulate('change', { target: { value: newValue } });

        expect(wrapper.state().comment).to.equal(newValue);
    });
});