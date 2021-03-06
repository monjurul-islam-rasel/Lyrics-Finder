import React, { Component } from "react";
import axios from "axios";
import Reducer from './Reducer';
import parse from 'html-react-parser';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    track_list: [],
    heading: parse(' Top Ten Tracks  <hr style="border-color:snow;" id="foo" class="bar" data-baz="qux">'),
    dispatch: action => this.setState(state => Reducer(state, action))
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=8639fffb6bb1b03de77e80187bcfd640`
      )
      .then(res => {
        //console.log(res.data);
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
