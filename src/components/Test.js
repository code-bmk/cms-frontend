import React, { Component } from "react";
import PageContainer from "./containers/PageContainer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";

class Test extends Component {
	componentDidMount() {
		this.props.loadNote();
	}

	render() {
		return (
			<div class="container is-fluid">
				<PageContainer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);
