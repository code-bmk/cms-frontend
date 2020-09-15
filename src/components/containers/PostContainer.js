import React from "react";
import { Link, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import Timestamp from "react-timestamp";

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

const blogStyle = {
  width: "60%",
};

class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    if (this.props.note === null) {
      this.setState({
        posts: [],
      });
    } else {
      console.log(this.props);
      this.setState({
        posts: this.props.posts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.note == null && !!this.props.note) {
      // this.props.posts.map(
      //   (post) =>
      //     (post.content = EditorState.createWithContent(
      //       convertFromRaw(JSON.parse(post.content))
      //     ))
      // );
      this.setState({
        posts: this.props.posts,
      });
    }
  }

  render() {
    return (
      <div className="container is-fluid" style={blogStyle}>
        <div>
          {this.state.posts.map((post) => (
            <div class="box">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <Link to={`/posts/${post.id}`}>
                      <p>{post.title}</p>
                    </Link>
                  </div>
                  <nav class="level is-mobile">
                    <Timestamp class="level-right" date={post.date}></Timestamp>
                  </nav>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  console.log(this.props);
  return {
    note: state.displayedNote,
    posts: state.posts,
    fetching: state.fetching,
    fetched: state.fetched,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
