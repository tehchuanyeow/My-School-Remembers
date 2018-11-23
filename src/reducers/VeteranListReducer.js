import { FIND_PROFILES } from "../Constants";
import sampleDataFor_biography_veteranBio from "../sampleData/VeteranBio.json";

export default function(prevState = [], action) {
  if (action.type === FIND_PROFILES) {
    const { category, searchTerm } = action.payload;
    return sampleDataFor_biography_veteranBio.data.filter(
      vBio => vBio[category] === searchTerm
    );
  } else return prevState;
}
