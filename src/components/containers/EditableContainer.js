import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";

class EditableContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayedNote: "new",
			posts: [],
			editorState: EditorState.createEmpty()
		};
	}

	componentDidMount() {
		if (this.props.note === null) {
			this.setState({
				displayedNote: "new",
				posts: [],
				editorState: EditorState.createEmpty()
			})
		} 
}


	onChange = (editorState) => {
		this.setState({
			editorState: editorState
		});
	};


	submitEditor = () => {
	let contentState = this.state.editorState.getCurrentContent()
		let note = {content: convertToRaw(contentState)}
		note["content"] = JSON.stringify(note.content)
		console.log(note)
		this.props.createNote(note.content)
	
}

	handleKeyCommand = command => {
		const newState = RichUtils.handleKeyCommand(
			this.state.editorState,
			command
		);
		if (newState) {
			this.onChange(newState);
			return "handled";
		}
		return "not-handled";
	};

	onUnderlineClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
		);
	};

	onBoldClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
	};

	onItalicClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
		);
	};


	render() {
		return (
			<div className="editorActualContainer">
				<div className="toolbarActual">
					<button onClick={this.onUnderlineClick}>U</button>
					<button onClick={this.onBoldClick}>
						<b>B</b>
					</button>
					<button onClick={this.onItalicClick}>
						<em>I</em>
					</button>
				</div>

				<div className="editors">
					<Editor
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
					/>
					
				</div>
				
				<div>
					<button className="save" onClick={this.submitEditor}>Save</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	console.log(this.props)
	return {
		note: state.displayedNote
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableContainer);
