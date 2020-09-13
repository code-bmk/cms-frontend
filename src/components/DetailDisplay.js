import React from "react";
import { Link } from "react-router-dom";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";

class DetailDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      postId: "" ,
      postContent:"",
      postTitle: "",
      postDate: "",
      postAuthor: ""};
  }

  componentWillMount() {
    const {
      match: { params },
    } = this.props;

    let token = localStorage.getItem("token");

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(
      "https://infinite-falls-77019.herokuapp.com/post/getOne/" + params.id,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();

        this.setState({
          postContent: EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))),
          postTitle: data.title,
          postDate: data.date,
          postAuthor: data.author,
          postId:  data.id
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  render() {
    return (
      <div className="container is-fluid">
        <h1 class="title">{this.state.postTitle}</h1>
        <Editor editorState={this.state.postContent}></Editor>
      </div>
    );
  }
}

export default DetailDisplay;
