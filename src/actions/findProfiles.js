import { FIND_PROFILES } from "../Constants";

export default function findProfiles(category, searchTerm) {
  return {
    type: FIND_PROFILES,
    payload: {
      category,
      searchTerm
    }
  };
}
