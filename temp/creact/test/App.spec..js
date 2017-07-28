import React from 'react';
import App from '../client/components/App';

describe('When working with the app component',  () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('contains a weather component', ()=> {
        expect(wrapper.find('Weather')).to.be.present();
    });

    it('contains a contact component', ()=> {
        expect(wrapper.find('Contact')).to.be.present();
    });

});