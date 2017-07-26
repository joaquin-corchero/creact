import React, {Component} from 'react';

class Contact extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: null,
            name: null,
            comment: null,
            commentSent: null
        };
        this.sendContactRequest = this.sendContactRequest.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
    }

    sendContactRequest(e){
        e.preventDefault();
    }

    handleChangeName(event){
        this.setState(
            {name: event.target.value}
        );
    }

    handleChangeEmail(event){
        this.setState(
            {email: event.target.value}
        );
    }

    handleChangeComment(event){
        this.setState(
            {comment: event.target.value}
        );
    }

    render(){
        return(
            <form method="post">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" placeholder="Your name" value={this.state.name} onChange={this.handleChangeName} />
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" placeholder="mail@gmail.com" value={this.state.email} onChange={this.handleChangeEmail} />
                </div>
                <div>
                    <label for="comment">Comment:</label>
                    <textarea id="comment" placeholder="Your comment goes here" onChange={this.handleChangeComment}>{this.state.comment}</textarea>
                </div>
                <div>
                    <button id="send" type="submit" onClick={ this.sendContactRequest }>Send</button>
                </div>
            </form>
        );
    }
}

export default Contact;