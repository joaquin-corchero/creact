import React, { Component, PropTypes } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = { comments: [] };
  }

  componentDidMount() {
    this.setState({
      comments: ['Comment number one', 'Comment number two']
    });
  }

  renderComments(comments) {
    return comments.map((comment, idx) => <Comment key={idx} comment={comment} />);
  }

  render() {
    const commentsNode = this.renderComments(this.state.comments);
    return (
      <div className="comments-list">
        {commentsNode}
        <button onClick={this.props.onButtonClick}>A button</button>
      </div>
    )
  }
}

export default CommentList;