import React, { Component } from 'react';
import { withLastLocation } from 'react-router-last-location';
import { getPostDetailsById } from '../services/herokuApi';
import { Editor, EditorState, convertFromRaw } from "draft-js";

const blogStyle = {
    width: "60%"
  };

class TestDisplay extends Component {
  state = {
    postInfo: {content: EditorState.createEmpty()},
    loading: true,
    error: true
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      try {
        const postInfo = await getPostDetailsById(this.props.match.params.id);
        postInfo.content = EditorState.createWithContent(
            convertFromRaw(JSON.parse(postInfo.content))
          );
        this.setState({
          loading: false,
          postInfo,
          error: false
        });
      } catch (err) {
        this.setState({ loading: false, error: true });
      }
    }
  }

  render() {
    const { postInfo, loading, error } = this.state;
   

    let movieDetails = null;

    if (error) {
      movieDetails = (

        <h1 class="title is-1">Error</h1>
   
      );
    }

    if (loading) {
      movieDetails = (
        <h1 class="title is-1">Loading</h1>
      );
    }

    if (!loading && postInfo) {
      movieDetails = (
       
        <div>
        <h1 class="title is-1">{postInfo.title}</h1>
        <Editor
          id={postInfo.id}
          editorState={postInfo.content}
          readOnly
        />
        </div>
   
      );
    }

    return (<div class="container is-fluid" style={blogStyle}>{movieDetails}</div>);
  }
}

export default withLastLocation(TestDisplay);