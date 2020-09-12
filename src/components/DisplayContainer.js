import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";


class DisplayContainer extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		posts: []
	  };
	}
  
	componentDidMount() {
	  if (this.props.note === null) {
		this.setState({
		  posts: []
		});
	  } else {
		console.log(this.props);
		this.setState({
		  posts: this.props.posts
		});
	  }
	}
  
	componentDidUpdate(prevProps, prevState) {
	  if (prevProps.note == null && !!this.props.note) {
		//this.props.loadNote
		this.props.posts.map(
		  (post) =>
			(post.content = EditorState.createWithContent(
			  convertFromRaw(JSON.parse(post.content))
			))
		);
		this.setState({
		  posts: this.props.posts
		});
	  }
	}
  
	render() {
	  return (
		<div className="editorContainer">
		  <div>
			{this.state.posts.map((post) => (
			  <Card>
			  <Card.Header>{post.id}</Card.Header>
			  <Card.Body>
				  <Card.Title>{post.title}</Card.Title>
				  <Card.Text>{post.date}</Card.Text>
				  <Button variant="primary">Read More...</Button>
			  </Card.Body>
			  </Card>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(DisplayContainer);
