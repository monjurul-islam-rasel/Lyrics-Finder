import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: ""
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchTrack = (dispatch, e) => {
    e.preventDefault();

    dispatch({
        type: "LOADING"
      });

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=8639fffb6bb1b03de77e80187bcfd640`
      )
      .then(res => {
          dispatch({
            type: "SEARCH_RESULT",
            payload: res.data.message.body.track_list
          });

          this.setState({trackTitle:''});          
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Consumer>
        {value => {
            const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For Song
              </h1>
              <p className="lead text-center">Get the lyrics from any song</p>
              <form onSubmit={this.searchTrack.bind(this, dispatch)}>
                <div className="from-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search for a song..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button 
                    className="btn btn-primary btn-lg btn-block mt-4"
                    type="submit"
                    >
                  Get Track Leyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
