import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { Editor, EditorState, convertFromRaw } from "draft-js";

class PostDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
        match: { params },
      } = this.props;
    this.state = {
      displayedNote: { content: "" },
    };
  }

  componentDidMount() {
    if (this.props.displayedNote === null) {
      this.setState({
        displayedNote: { content: "" },
      });
    } else {
      this.setState({
        displayedNote: this.props.displayedNote,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    
      this.props.displayedNote.content = EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.props.displayedNote.content))
       );

      this.setState({
        displayedNote: this.props.displayedNote,
      });
    
  }

  render() {
    return (
      <div className="container is-fluid">
        <h1 class="title">{this.state.displayedNote.title}</h1>
        <Editor id={this.state.displayedNote.id} editorState={this.state.displayedNote.content} readOnly/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    displayedNote: state.displayedNote,
    fetching: state.fetching,
    fetched: state.fetched,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailContainer);
