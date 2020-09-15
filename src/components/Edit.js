import React, { Component } from "react";
import EditableContainer from "./containers/EditableContainer";
import DashboardNavContainer from "./containers/DashboardNavContainer";
import FooterContainer from "./containers/FooterContainer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";

class Edit extends Component {
  render() {
    return (
      <div className="container is-fluid">
        <DashboardNavContainer />
        <EditableContainer />
		<FooterContainer/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    note: state.displayedNote,
    fetching: state.fetching,
    fetched: state.fetched,
    posts: state.posts,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
