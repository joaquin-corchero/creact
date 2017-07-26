import React, {Component} from 'react';

class Contact extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: null,
            name: null,
            comment: null
        };
    }

    render(){
        return(
            <form method="post">
                <input type="text" id="name"/>
                <input type="email" id="email"/>
                <textarea id="comment"/>
                <button id="submit" type="submit">Send</button>
            </form>
        );
    }
}

export default Contact;