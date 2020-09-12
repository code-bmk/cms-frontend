import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
	}

	componentDidMount() {
		if (this.props.posts === null) {
			this.setState({
				posts: []
			})
		} else {
				this.setState({
					posts: this.props.posts
			})
		}
}

componentDidUpdate(prevProps, prevState) {


	if (prevProps.posts == null && !!this.props.posts) {
		//this.props.loadNote
		this.props.posts.map(
			post => 
			post.content = EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))
			)
		this.setState({
			posts: this.props.posts
		})
	}
}

	


	render() {
		return (
			<div className="editorContainer">
				
				<div>
				{this.state.posts.map(post =>
				<Editor id={post.id}
				editorState={post.content}
				readOnly
				/>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
