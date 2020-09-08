import React, { useState } from 'react';
import axios from 'axios';
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
        return ( <div>
            <h1>HomePage</h1>
            <div className="posts">
            <ul>
                {this.state.posts.map(post =>
                <li key={post.id}>{post.content}</li>
                )}
            </ul> 
            </div>
        </div>);
    }
}
 
export default HomePage;