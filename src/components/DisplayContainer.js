import React from "react";
import { Card } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";

class DisplayContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
	}

	componentDidMount() {
		this.setState({
				posts: this.props.posts
		})
	}

	componentDidUpdate(prevProps, prevState) {
		this.props.posts.map(
			post => 
			post.content = EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))
			)
		this.setState({
			posts: this.props.posts
		})
	}

	render() {
		return (
			<div className="displayContainer">
				<div>
				{this.state.posts.map(post =>
					<Card>
					<Card.Header>{post.id}</Card.Header>
					<Card.Body>
						<Card.Title>{post.title}</Card.Title>
						<Card.Text>{post.date}</Card.Text>
						<Button variant="primary">Read More...</Button>
					</Card.Body>
					</Card>
					 )}
				</div>
				
			</div>
		
		);
	}

}


function mapStateToProps(state, props) {
	return {
		posts: state.posts
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContainer);
