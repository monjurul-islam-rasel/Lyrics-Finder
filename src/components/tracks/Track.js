import React from "react";
import { Link } from "react-router-dom";

const Track = props => {
  const { track, delItem, dispatch } = props;
  return (
    <div className="col-md-6 ">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              {" "}
              <i className="fas fa-play"> </i> Track :{" "}
            </strong>
            {track.track_name}
            <br />
            <strong>
              {" "}
              <i className="fas fa-compact-disc"> </i> Album :{" "}
            </strong>
            {track.album_name}
          </p>
          <div className="text-right">
            <button className="btn btn-danger btn-sm text-right m-4" onClick={ delItem.bind(this, track.track_id, dispatch)}>
              <i className="fas fa-trash" />
            </button>
          </div>

          <Link
            to={`lyrics/track/${track.track_id}`}
            className="btn btn-dark btn-block"
          >
            <i className="fas fa-chevron-right">View Lyrics</i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
