import React, {Component} from 'react';
import * as httpClient from '../httpClient';
import Success from './Success';
import Failure from './Failure';

class Contact extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            name: '',
            comment: '',
            commentSent: null
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.commentCreated = this.commentCreated.bind(this);
        this.commentFailed = this.commentFailed.bind(this);
    }


    handleChangeName(e){
        this.setState(
            {name: e.target.value}
        );
    }

    handleChangeEmail(e){
        this.setState(
            {email: e.target.value}
        );
    }

    handleChangeComment(e){
        this.setState(
            {comment: e.target.value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        return httpClient.post('http://localhost:5000/api/contacts', this.state, this.contactCreated.bind(this), this.contactFailed.bind(this));
    }

    contactCreated(response) {
        this.setState(
            {
                name: '',
                email: '',
                comment: '',
                commentSent: true
            }
        );
    }

    contactFailed(error) {
        this.setState({ commentSent: false });
    }

    commentCreated(component){
        component.setState(
                {
                    name: '',
                    email: '',
                    comment: '',
                    commentSent: true
                }
        );
    }

    commentFailed(component){
        component.setState({commentSent : false});
    }

    render(){
        return (
            <form action="/" id="contactForm" onSubmit={this.handleSubmit}>
                <legend>Contact:</legend>
                {this.state.commentSent === true ? <Success /> : null}
                
                {this.state.commentSent === false ? <Failure /> : null}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" className="form-control" id="name" placeholder="Your name" value={this.state.name} onChange={this.handleChangeName} maxLength="40" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" className="form-control" id="email" placeholder="mail@gmail.com" value={this.state.email} onChange={this.handleChangeEmail} maxLength="150" required />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea id="comment" name="comment" className="form-control" placeholder="Your comment goes here" onChange={this.handleChangeComment} value={this.state.comment} maxLength="500" required />
                </div>
                <button type="submit" id="send" className="btn btn-primary">Send</button>
            </form>
        );
    }
}


export default Contact;