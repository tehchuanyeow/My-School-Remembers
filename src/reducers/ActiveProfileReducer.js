import sampleDataFor_map_events from "../sampleData/Events.json";
import sampleDataFor_map_eventMultimedia from "../sampleData/EventMultimedia.json";
import sampleDataFor_biography_veteranBio from "../sampleData/VeteranBio.json";
import sampleDataFor_biography_externalResources from "../sampleData/ExternalResources.json";
import sampleDataFor_multimedia from "../sampleData/Multimedia.json";

const initialState = {
  events: sampleDataFor_map_events.data,
  eventMultimedia: sampleDataFor_map_eventMultimedia.data,
  veteranBio: sampleDataFor_biography_veteranBio.data[0],
  bioExternalResources: sampleDataFor_biography_externalResources.data,
  multimedia: sampleDataFor_multimedia.data
};

export default function(prevState = initialState, action) {
  if (typeof state === null) {
    return initialState;
  }
  return prevState;
}
