import React, { useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import { stateToHTML } from "draft-js-export-html";

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

          this.state.posts.map(function(post){
            console.log(post.content)
            let content = convertFromRaw(JSON.parse(post.content))
            console.log("********")
            console.log(content)
            post.content = EditorState.createWithContent(content)
            console.log("********")
            console.log(post.content)
            let htmlContent = stateToHTML(post.content)
            console.log("********")
            console.log(htmlContent)
            return post
          })

          this.setState({posts: this.state.posts});
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
                    <p>{post.content}</p>
                    <Editor editorState={post.content} readOnly/>
                    </div>
                </div>
                )}
            </div>
        </div>);
    }
}
 
export default HomePage;