import React, {Component} from 'react';

class Field extends Component{
    constructor(props){
        super(props);

        this.state = {
            value: '',
            error: ''
        };

        this.onChange = this.onChange.bind(this);
    };

    componentDidMount (){
        this.setState(
            {
                value: this.props.value,
                error: false
            }
        );
    };

    componentWillReceiveProps(update) {
        this.setState({ value: update.value });
    };

    onChange(evt) {
        const name = this.props.name;
        const value = evt.target.value;
        const error = this.props.validate ? this.props.validate(value) : false;

        this.setState({ value, error });

        this.props.onChange({ name, value, error });
    };

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.displayName}:</label>
                {this.props.type === "textarea" ? 
                    <textarea
                        name={this.props.name}
                        id={this.props.name}
                        value={this.state.value}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        maxLength={this.props.maxLength ? this.props.maxLength : null}
                        required={this.isRequired ? true : false}
                        onChange={this.onChange}
                    />
                    : <input
                    type={this.props.type}
                    name={this.props.name}
                    id={this.props.name}
                    value={this.state.value}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    maxLength={this.props.maxLength ? this.props.maxLength : null}
                    required={this.isRequired ? true : false}
                    onChange={this.onChange}
                />
                }
                <div className={this.state.error? "alert alert-danger": 'hide'}>
                    { this.state.error }
                </div>
            </div>
        );
    }
}

export default Field;