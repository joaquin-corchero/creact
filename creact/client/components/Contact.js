import React, {Component} from 'react';

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
        fetch(
            'https://mywebsite.com/endpoint/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    this.state
                )
            }
        )
        .then(function(response) {
            console.log('jheeeee');
            console.log('jheeeee');
            console.log('jheeeee');
            console.log('jheeeee');
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            this.setState(
                {
                    name: '',
                    email: '',
                    comment: '',
                    commentSent: true
                }
            );
        })
        .catch((error) => {
            console.log('There was an exception');
            this.setState({commentSent : false})
        });
        console.log('jheeeee');
            console.log('jheeeee');
            console.log('jheeeee');
            console.log('jheeeee');
    }

    render(){
        return(
            <form id="contactForm" onSubmit={ this.handleSubmit }>
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
                    <textarea id="comment" placeholder="Your comment goes here" onChange={this.handleChangeComment} value={this.state.comment} />
                </div>
                <div>
                    <button id="send">Send</button>
                </div>
            </form>
        );
    }
}

export default Contact;