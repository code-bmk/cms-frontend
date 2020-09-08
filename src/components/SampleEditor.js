import React, { Component } from 'react';
import 'draft-js/dist/Draft.css';
import {
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  Editor as DraftEditor
} from 'draft-js';
import BlockStyleToolbar, {
  getBlockStyle
} from "./blockstyle/BlockStyleToolbar";
import styled from "styled-components";
import Toolbar from './toolbar/Toolbar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from "../redux/actions";



//Root Wrapper of the Editor 
const EditorWrapper = styled.div`
  min-width: 700px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-top: 3em;
`;
//DraftEditor Container 
const EditorContainer = styled.div`

min-height: 9em;
border-radius: 0 0 3px 3px;
background-color: #fff;
padding: 5px;
font-size: 17px;
font-weight: 300;
box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`;


class SampleEditor extends Component {
  componentDidMount() {
    if (this.props.note === null) {
     this.setState({
      displayedNote: "new",
      editorState: EditorState.createEmpty()
     })
    } else {
    //  this.setState({
    //   displayedNote: this.props.note.id,
    //   editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.note.content)))
    //  })
    }
   }
   
   componentDidUpdate(prevProps, prevState) {
    if (prevProps.note == null && !!this.props.note) {
     this.props.loadNote()
     this.setState({
      displayedNote: this.props.note.id,
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.note.content)))
     })
    }
   }
   
   submitEditor = () => {
    let contentState = this.state.editorState.getCurrentContent()
    if (this.state.displayedNote == "new") {
     let note = {content: convertToRaw(contentState)}
     note["content"] = JSON.stringify(note.content)
     this.props.createNote(note.content)
    } else {
     let note = {content: convertToRaw(contentState)}
     note["content"] = JSON.stringify(note.content)
     this.props.updateNote(this.state.displayedNote, note.content)
    }
   }

  constructor(props){
    super(props)
    this.state = {
      displayedNote: "new",
      editorState: EditorState.createEmpty()
    }
  }
  toggleBlockType = blockType => {
    this.updateEditorState(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  updateEditorState(editorState){
    this.setState({
      editorState
    })
  }

  render() { 
    return ( 
     
        <EditorWrapper>
      <BlockStyleToolbar
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
      <Toolbar editorState={this.state.editorState} updateEditorState={this.updateEditorState.bind(this)}/>
      <EditorContainer>
          <DraftEditor
          placeholder="Explore Your Way In..."
          editorState={this.state.editorState}
          onChange={this.updateEditorState.bind(this)}
          blockStyleFn={getBlockStyle}
          />
         
      </EditorContainer>
      <div>
					<button className="save" onClick={this.submitEditor}>Save</button>
				</div>
    </EditorWrapper>
    
      
     );
  }
}



function mapStateToProps(state, props) {
	return {
		note: state.displayedNote
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleEditor);
