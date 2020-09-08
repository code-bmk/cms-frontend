import React, { useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        });
      }
    render() { 
        return ( 
        <div>
            <h1>HomePage</h1>
            <div className="posts">
                {this.state.posts.map(post =>
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">{post.title}</h5>
                    <p class="card-text">{post.content}</p>
                    </div>
                </div>
                )}
            </div>
        </div>);
    }
}
 
export default HomePage;