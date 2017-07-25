import React from 'react';
import CommentList from '../client/components/CommentList';

describe('Comment list', () => {
    it('calls componentDidMount', () => {
	    spy(CommentList.prototype, 'componentDidMount');
        const wrapper = mount(<CommentList />);
        expect(CommentList.prototype.componentDidMount.calledOnce).to.equal(true);
    });
});