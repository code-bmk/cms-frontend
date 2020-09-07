import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Editor, EditorState} from 'draft-js';

class Admin extends React.Component {
  constructor(props){
    super(props)
    const token = localStorage.getItem("token");
    let loggedIn = true
    if(token === null){
      loggedIn = false
    }
    this.state = {
      editorState: EditorState.createEmpty(),
      loggedIn
    }
  }
  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }
  render() {

    if(this.state.loggedIn === false){
      return <Redirect to="/" />
    }

    return(
      <div className="admin">
       <h1>This is an admin page. only auth people can see this</h1>
       <Editor editorState={this.state.editorState} onChange={this.onChange}></Editor>
       <Link to="/logout">Logout</Link>
      </div>
    )
  }
}

export default Admin;