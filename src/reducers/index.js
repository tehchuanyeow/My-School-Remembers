import { combineReducers } from "redux";
import VeteranListReducer from "./VeteranListReducer";
import ActiveProfileReducer from "./ActiveProfileReducer";
import MapModeReducer from "./MapModeReducer";

const reducers = combineReducers({
  activeProfile: ActiveProfileReducer,
  mapMode: MapModeReducer,
  veteranList: VeteranListReducer
});

export default reducers;
