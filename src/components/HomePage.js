import React, { useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Editor, EditorState, convertFromRaw} from 'draft-js';

class HomePage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        
        
    }

    componentWillMount() {
        axios.get("https://cryptic-escarpment-29124.herokuapp.com/post/getAll").then(res => {
          this.setState({posts: res.data});

          this.posts.map(function(post){
            let content = convertFromRaw(JSON.parse(post.content))
            post.content = EditorState.createWithContent(content)
            return post
          })
      })
    }
    render() { 
        return ( 
        <div>
            <div className="posts">
                {this.state.posts.map(post =>
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">{post.title}</h5>
                        <Editor editorState={post.content} readOnly={true} /> 
                    </div>
                </div>
                )}
            </div>
        </div>);
    }
}
 
export default HomePage;