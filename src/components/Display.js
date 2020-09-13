import React, { Component } from "react";
import DisplayContainer from "./containers/DisplayContainer";
import NavContainer from "./containers/NavContainer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";


class Display extends Component {
	componentDidMount() {
		this.props.loadNote();
	}

	render() {
		return (
			<div className="container is-fluid">
				<NavContainer />
				<DisplayContainer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Display);
