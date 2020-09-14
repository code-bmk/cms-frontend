import React, { Component } from "react";
import PageContainer from "./containers/PageContainer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import PostDetailContainer from "./containers/PostDetailContainer";

class DetailDisplay extends Component {
	constructor(props) {
   super(props);
    this.state = {
      displayedNote: '',
      blogPost: ''
    };
  }
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.loadOneNote(params.id);

    if (this.props.displayedNote === null) {
      this.setState({
        displayedNote: '',
        blogPost: ''
      });
    } else {
      this.setState({
        displayedNote: this.props.displayedNote,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {

    this.props.loadOneNote(params.id);
      
        this.setState({
            displayedNote: this.props.displayedNote
        });
        
      
    
  }
  

	render() {
		return (
			<div class="container is-fluid">
        <h1 class="title">{this.state.displayedNote.title}</h1>
        <p>{this.state.displayedNote.content}</p>
		  	</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
    displayedNote: state.displayedNote,
    blogPost: state.blogPost
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDisplay);
