import { CHANGE_MAP_MODE } from "../Constants";

const initialState = { isSearching: false };

export default function(prevState = initialState, action) {
  if (action.type === CHANGE_MAP_MODE)
    return { ...prevState, isSearching: action.payload.isSearching };

  return prevState;
}
