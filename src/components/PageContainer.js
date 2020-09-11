import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayedNote: "new",
			editorState: EditorState.createEmpty()
		};
	}

	componentDidMount() {
		if (this.props.note === null) {
			this.setState({
				displayedNote: "new",
				editorState: EditorState.createEmpty()
			})
		} else {
			console.log(this.props)
				this.setState({
					displayedNote: this.props.note.id,
					editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.note.content)))
			})
			console.log(this.props)
		}
}

componentDidUpdate(prevProps, prevState) {


	if (prevProps.note == null && !!this.props.note) {
		//this.props.loadNote
		this.setState({
			displayedNote: this.props.note.id,
			editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.note.content)))
		})
		console.log(this.props)
	}
}

	onChange = (editorState) => {
		this.setState({
			editorState: editorState
		});
	};


	submitEditor = () => {
	let contentState = this.state.editorState.getCurrentContent()
	console.log(this.state.displayedNote)
	if (this.state.displayedNote == "new") {
		let note = {content: convertToRaw(contentState)}
		note["content"] = JSON.stringify(note.content)
		console.log(note)
		this.props.createNote(note.content)
	} else {
		console.log(this.state.displayedNote)

		let note = {content: convertToRaw(contentState)}
		note["content"] = JSON.stringify(note.content)
		this.props.createNote(note.content)
		//this.props.updateNote(this.state.displayedNote, note.content) NOT UPDATING IT BUT CREATING IT FOR NOW //TODO
	}
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
			<div className="editorContainer">
				<div className="toolbar">
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
				<Editor id="ed2"
						editorState={this.state.editorState}
						readOnly
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

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
