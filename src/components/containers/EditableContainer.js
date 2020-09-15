import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

class EditableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedNote: "new",
      posts: [],
      inputValue: "",
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    if (this.props.note === null) {
      this.setState({
        displayedNote: "new",
        posts: [],
        editorState: EditorState.createEmpty(),
      });
    }
  }

  onChange = (editorState) => {
    this.setState({
      editorState: editorState,
    });
  };

  submitEditor = () => {
    let contentState = this.state.editorState.getCurrentContent();
    let note = { content: convertToRaw(contentState) };
    note["content"] = JSON.stringify(note.content);
    note.title = this.state.inputValue;
    console.log(note);
    this.props.createNote(note);
  };

  handleKeyCommand = (command) => {
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
  updateInputValue = (evt) => {
    this.setState({
      inputValue: evt.target.value,
    });
  };

  render() {
    return (
      <div className="container is-fluid">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Title of Post</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Title of the Blog Post"
                  value={this.state.inputValue}
                  onChange={this.updateInputValue}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-grouped">
          <div class="control">
            <button class="button is-link" onClick={this.onUnderlineClick}>
              U
            </button>
          </div>
          <div class="control">
            <button class="button is-link" onClick={this.onBoldClick}>
              <b>B</b>
            </button>
          </div>
          <div class="control">
            <button class="button is-link" onClick={this.onItalicClick}>
              <em>I</em>
            </button>
          </div>
        </div>
        <div className="field">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-link" onClick={this.submitEditor}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  console.log(this.props);
  return {
    note: state.displayedNote,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableContainer);
