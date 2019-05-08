const Reducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_RESULT":
        return {
          ...state,
          track_list: action.payload,
          heading: "Search Results"
        };
      case "DELETE_TRACK":
        return {
          ...state,
          track_list: [...state.track_list.filter(item => item.track.track_id !== action.payload)] 
        };
      case "LOADING":
        return {
          ...state,
          track_list: [],
          heading: "Search Results"
        };
      default:
        return state;
    }
  }

  export default Reducer;
  