import React, { Component } from 'react';
import { Breakpoint } from 'react-socks';
import { withLastLocation } from 'react-router-last-location';
import { getMovieDetailsById, getMovieReviews } from '../services/herokuApi';

class TestDisplay extends Component {
  state = {
    postInfo: null,
    loading: true,
    error: true
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      try {
        const postInfo = await getPostDetailsById(this.props.match.params.id);
        this.setState({
          loading: false,
          postInfo,
          error: false
        });
      } catch (err) {
        this.setState({ loading: false, error: true });
      }
    }
  }

  render() {
    const { postInfo, loading, error } = this.state;
   

    let movieDetails = null;

    if (error) {
      movieDetails = (
        <h3>Woops, something went wrong trying to fetch movie details.</h3>
      );
    }

    if (loading) {
      movieDetails = (
        <>
          <h1>Movie Details</h1>
          <h3>Loading movie details now...</h3>
        </>
      );
    }

    if (!loading && postInfo) {
      movieDetails = (
        <div className="movie-details-wrapper">
          
            <h1>{postInfo.title}</h1>
            <p>{postInfo.content}</p>
        </div>
      );
    }

    return <>{movieDetails}</>;
  }
}

export default withLastLocation(TestDisplay);