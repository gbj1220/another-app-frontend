import React, { Component } from "react";
import axios from "axios";

export class MovieDetails extends Component {
  state = {
    movieInfo: null,
  };

  componentDidMount = async () => {
    try {
      let payload = await axios.get(
        `http://omdbapi.com/?apikey=e739e00a&t=${this.props.match.params.title}&plot=full`
      );

      // console.log(payload);

      this.setState({
        movieInfo: payload.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        {this.state.movieInfo ? (
          <div className='container'>
            <div className='row'>
              <div className='col-md-6'>
                <img src={this.state.movieInfo.Poster} alt='something' />
              </div>
              <div className='col-md-6'>
                <h1>{this.state.movieInfo.Title}</h1>
                <p>{this.state.movieInfo.Plot}</p>
                {this.state.movieInfo.Ratings.map((item) => {
                  return (
                    <div key={item.Source}>
                      {item.Source}: {item.Value}
                    </div>
                  );
                })}
                <div>
                  <a
                    className='btn btn-primary'
                    target='_blank'
                    href={`https://www.imdb.com/title/${this.state.movieInfo.imdbID}/`}
                  >
                    IMDB Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>...Loading</div>
        )}
      </>
    );
  }
}

export default MovieDetails;
