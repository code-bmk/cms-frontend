import React, { Component } from "react";
import PageContainer from "./containers/PageContainer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import PostDetailContainer from "./containers/PostDetailContainer";

class DetailDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedNote: "",
      blogPost: "",
    };
  }
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.loadOneNote(params.id);

    if (this.props.displayedNote === null) {
      this.setState({
        displayedNote: "",
        blogPost: "",
      });
    } else {
      let displayedNote = { ...this.state.displayedNote };
      displayedNote.content = EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.props.displayedNote.content))
      );
      this.setState({ displayedNote });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      match: { params },
    } = this.props;
    this.props.loadOneNote(params.id);

    this.setState({
      displayedNote: this.props.displayedNote,
    });
  }

  render() {
    return (
      <div class="container is-fluid">
        <h1 class="title">{this.state.displayedNote.title}</h1>
        <Editor id={this.state.displayedNote.id} editorState={this.state.displayedNote.content} readOnly/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    displayedNote: state.displayedNote,
    blogPost: state.blogPost,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDisplay);
