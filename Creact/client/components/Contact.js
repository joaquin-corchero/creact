import React, {Component} from 'react';
import Client from '../Client';
import Success from './Success';
import Failure from './Failure';
import Field from './Field';
import isEmail from 'validator/lib/isEmail';

class Contact extends Component{
    constructor(props){
        super(props);

        this.state = {
            commentSent: null,
            fields: {
                name: '',
                email: '',
                comment: ''
            },
            fieldErrors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.contactCreated = this.contactCreated.bind(this);
        this.contactFailed = this.contactFailed.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) return;
        return Client.post('http://localhost:5000/api/contacts', this.state.fields, this.contactCreated.bind(this), this.contactFailed.bind(this));
    }

    contactCreated(response) {
        this.setState(
            {
                commentSent: true,
                fields: {
                    name: '',
                    email: '',
                    comment: ''
                },
                fieldError: []
            }
        );
    }

    contactFailed(error) {
        this.setState({ commentSent: false });
    }

    onInputChange({ name, value, error }) {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({ fields, fieldErrors });
    };

    validate() {
        const contact = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        if (!contact.name) return true;
        if (!contact.email) return true;
        if (!contact.comment) return true;
        if (errMessages.length) return true;

        return false;
    };

    render(){
        return (
            <form action="/" id="contactForm" onSubmit={this.handleSubmit}>
                <legend>Contact:</legend>
                {this.state.commentSent === true ? <Success /> : null}
                {this.state.commentSent === false ? <Failure /> : null}
                <Field
                    type="text"
                    name="name"
                    displayName="Name"                        
                    placeholder="Your name" 
                    value={this.state.fields.name} 
                    maxLength="40" 
                    isRequired="true"
                    onChange={this.onInputChange}
                    validate={(val) => (val ? false : 'Name Required')}
                />
                <Field
                    type="email"
                    name="email"
                    displayName="Email"                        
                    placeholder="your@email.com" 
                    value={this.state.fields.email} 
                    maxLength="150" 
                    isRequired="true"
                    onChange={this.onInputChange}
                    validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
                />
                <Field
                    type="textarea"
                    name="comment"
                    displayName="Comment"                        
                    placeholder="Add your comment" 
                    value={this.state.fields.comment} 
                    maxLength="500" 
                    isRequired="true"
                    onChange={this.onInputChange}
                    validate={(val) => (val ? false : 'Comment Required')}
                />
                <button type="submit" id="send" className="btn btn-primary" disabled={this.validate()}>Send</button>
            </form>
        );
    }
};

export default Contact;