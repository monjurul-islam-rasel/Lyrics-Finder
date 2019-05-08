import React, { Component } from "react";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

class Tracks extends Component {

  delItem = (track_id, dispatch) => {
    NotificationManager.error("Music Track Deleted");

    dispatch({
      type: "DELETE_TRACK",
      payload: track_id
    });
  };

  sortByName = (dispatch, track_list, type) => {
    dispatch({
      type: "LOADING"
    });

    const byName = track_list.slice(0);

    if (type === "a-z") {
      byName.sort((a, b) =>
        a.track.artist_name.localeCompare(b.track.artist_name)
      );
    } else {
      byName.reverse((a, b) =>
        a.track.artist_name.localeCompare(b.track.artist_name)
      );
    }
    
    dispatch({
      type: "SEARCH_RESULT",
      payload: byName
    });
  };

  render() {
    return (
      <React.Fragment>
        <Consumer>
          {value => {
            const { track_list, heading, dispatch } = value;

            if (track_list === undefined || track_list.length === 0) {
              return <Spinner />;
            } else {
              return (
                <React.Fragment>
                  <h1 className="text-center mb-4">{heading}</h1>
                  <div className="text-right ml-4">
                    <button
                      className="btn btn-sm btn-default"
                      onClick={this.sortByName.bind(
                        this,
                        dispatch,
                        track_list,
                        "a-z"
                      )}
                    >
                      <i className="fas fa-sort-alpha-down" />
                    </button>

                    <button
                      className="btn btn-sm btn-default"
                      onClick={this.sortByName.bind(
                        this,
                        dispatch,
                        track_list,
                        "z-a"
                      )}
                    >
                      <i className="fas fa-sort-alpha-up" />
                    </button>
                  </div>

                  <div className="row">
                    {track_list.map(item => (
                      <Track
                        key={item.track.track_id}
                        track={item.track}
                        dispatch={dispatch}
                        delItem={this.delItem}
                      />
                    ))}
                  </div>
                </React.Fragment>
              );
            }
          }}
        </Consumer>

        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default Tracks;
