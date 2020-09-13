import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import {
  Editor,
  EditorState,
  convertFromRaw,
} from "draft-js";

class PostDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        displayedNote: ''
    };
  }

  componentDidMount() {
    if (this.props.displayedNote === null) {
      this.setState({
        displayedNote: ''
      });
    } else {
      console.log(this.props);
      this.setState({
        displayedNote: this.props.displayedNote
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.displayedNote == null && !!this.props.displayedNote) {
        console.log(this.props);
        // this.props.displayedNote = EditorState.createWithContent(
        //     convertFromRaw(JSON.parse(this.props.displayedNote.content))
        //   );
      this.setState({
        displayedNote: this.props.displayedNote
      });
      console.log(this.state);
    }
  }

  render() {
    return (
    <div className="container is-fluid">
        <h1 class="title">{this.state.displayedNote.title}</h1>
        {/* <Editor editorState={this.state.displayedNote.content}></Editor> */}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  console.log(this.props);
  return {
    displayedNote: state.displayedNote,
    fetching: state.fetching,
    fetched: state.fetched
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContainer);
