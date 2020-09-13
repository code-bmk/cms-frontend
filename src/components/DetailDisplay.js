import React from "react";
import { Link } from "react-router-dom";

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
      "https://infinite-falls-77019.herokuapp.com/post/" + params.id,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();

        this.setState({
          postContent: data.content,
          postTitle: data.title,
          postDate: data.date,
          postAuthor: data.author,
          postId:  params.id
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  render() {
    return (
      <div className="detailDisplay">
        <h1>Detail Display</h1>
        <p>{this.state.postId}</p>
        <p>{this.state.postContent}</p>
      </div>
    );
  }
}

export default DetailDisplay;
