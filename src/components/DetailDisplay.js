import React from 'react';
import {Link} from 'react-router-dom';

class DetailDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {postId: ''}
  }

  componentDidMount(){
    const {match : {params}} = this.props
    this.setState({postId: params.id})
  }
  render() {
    return(
      <div className="detailDisplay">
        <h1>Detail Display</h1>
        <p>{this.state.postId}</p>
      </div>
    )
  }
}

export default DetailDisplay;