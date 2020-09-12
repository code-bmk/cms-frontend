import React, { Component } from "react";
import PageContainer from "./PageContainer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";

class Test extends Component {
	componentDidMount() {
		this.props.loadNote();
	}

	render() {
		return (
			<div className="Test">
				<PageContainer />
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		note: state.displayedNote,
		fetching : state.fetching,
		fetched: state.fetched,
		posts: state.posts,
		error: state.error,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
