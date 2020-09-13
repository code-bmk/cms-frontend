import React, { Component } from "react";
import PageContainer from "./containers/PageContainer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import PostDetailContainer from "./containers/PostDetailContainer";

class DetailDisplay extends Component {
	componentDidMount() {
    const {
      match: { params },
    } = this.props;
		this.props.loadOneNote(params.id);
	}

	render() {
		return (
			<div class="container is-fluid">
        <PostDetailContainer />
		  	</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		displayedNote: state.displayedNote
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDisplay);
