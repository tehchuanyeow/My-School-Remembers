import React, { Component } from "react";
import ReactMapGL, { FlyToInterpolator, HTMLOverlay } from "react-map-gl";
import { easeCubic } from "d3-ease";
import MultimediaMarker from "./MultimediaMarker";
import TimelineSlider from "./TimelineSlider";
import MultimediaPresenter from "./MultimediaPresenter";
import Multimedia from "../Multimedia";
import changeProfile from "../../actions/changeProfile";

const timelineSliderMargin = 50;

const styles = {
  timelineSlider: {
    position: "absolute",
    bottom: timelineSliderMargin / 3,
    right: timelineSliderMargin * 10,
    left: timelineSliderMargin / 2
  }
};
const mapDispatchToProps = dispatch => ({
  changeProfile: (
    Name,
    VeteranID,
    Photo,
    RegimentalNumber,
    PlaceOfBirth,
    Religion,
    Occupation,
    StreetName,
    City,
    State,
    Postcode,
    Coordinates,
    AgeAtEmbarkation,
    Height,
    Weight,
    NextOfKin,
    PreviousMilitaryService,
    EnlistmentDate,
    RankOnEnlistment,
    UnitName,
    AWMembarkationRollNumber,
    EmbarkationDetails,
    Summary
  ) =>
    dispatch(
      changeProfile(
        "James Martin",
        "189210",
        Photo,
        RegimentalNumber,
        PlaceOfBirth,
        Religion,
        Occupation,
        StreetName,
        City,
        State,
        Postcode,
        Coordinates,
        AgeAtEmbarkation,
        Height,
        Weight,
        NextOfKin,
        PreviousMilitaryService,
        EnlistmentDate,
        RankOnEnlistment,
        UnitName,
        AWMembarkationRollNumber,
        EmbarkationDetails,
        Summary
      )
    )
});

export default class Map extends Component {
  constructor(props) {
    super(props);
    console.log(changeProfile);
    this.events = [...props.events];

    /*this.events = [
    ...props.events.filter(id => {
    return id.VeteranID === this.props.profileList[0];
    })
    ];      ADD INITIAL STATE FIRST, REPLACEMENT IN PROGRESS  */

    this.eventMultimedia = [...props.eventMultimedia];
    this.eventIndex = 0;
    this.mapDefaultAttributes = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollZoom: false,
      dragPan: true,
      dragRotate: false,
      doubleClickZoom: true,
      touchZoom: false
    };

    const initialCoordinates = this.parseCoordinates(
      this.events[this.eventIndex].Coordinates
    );

    this.state = {
      isTransitioning: false,
      viewport: {
        latitude: initialCoordinates.lat,
        longitude: initialCoordinates.lon,
        zoom: 7
      },
      marker: {
        latitude: initialCoordinates.lat,
        longitude: initialCoordinates.lon
      },
      isMultimediaPresenterOpen: false
    };
  }

  parseCoordinates(Coordinates) {
    const coords = Coordinates.split(",");
    return { lat: parseFloat(coords[0]), lon: parseFloat(coords[1]) };
  }

  getEventMultimediaSources = () => {
    const multimediaSources = this.eventMultimedia
      .filter(m => m.Date === this.events[this.eventIndex].Date)
      .map(m => {
        return {
          src: m.Source,
          caption: m.Description
        };
      });

    return multimediaSources;
  };

  flyToNewDestination = coordinates => {
    const isTransitioning = true;
    const viewport = {
      ...this.state.viewport,
      latitude: coordinates.lat,
      longitude: coordinates.lon,
      transitionDuration: 3000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    };
    const marker = {
      latitude: coordinates.lat,
      longitude: coordinates.lon
    };

    this.setState({ isTransitioning, viewport, marker });
  };

  handleTimelineChange = index => {
    this.eventIndex = index;
    const newCoordinates = this.parseCoordinates(
      this.events[index].Coordinates
    );
    this.flyToNewDestination(newCoordinates);
  };

  handleRedraw = data => {
    const [x, y] = data.project([
      this.state.marker.longitude,
      this.state.marker.latitude
    ]);
    const image = this.getEventMultimediaSources()[0].src;
    return (
      <MultimediaMarker
        position={{ x: x, y: y }}
        eventName={this.events[this.eventIndex].Name}
        desc={this.eventMultimedia[this.eventIndex].Description}
        onClick={this.handleMarkerClick}
        image={image}
      />
    );
  };

  handleMarkerClick = () => {
    this.setState({ isMultimediaPresenterOpen: true });
  };

  handleMultimediaPresenterClose = () => {
    this.setState({ isMultimediaPresenterOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <ReactMapGL
          // mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
          mapboxApiAccessToken={
            "pk.eyJ1IjoicmFzb29saS1iZWhuYW0iLCJhIjoiY2psaDl5ajd6MHVmbTNrcGtiY3VxZGQ5diJ9.qars2_NNloH9bcNMUEfHBA"
          }
          {...this.mapDefaultAttributes}
          {...this.state.viewport}
          // mapStyle={process.env.REACT_APP_MapboxMapStyleLink}
          mapStyle={"mapbox://styles/rasooli-behnam/cjlhd40vz03bm2rofi78mrqq1"}
          onViewportChange={viewport => {
            this.setState({ viewport });
          }}
          onTransitionEnd={() => this.setState({ isTransitioning: false })}
        >
          <HTMLOverlay captureClick redraw={this.handleRedraw} />
        </ReactMapGL>
        <div style={styles.timelineSlider}>
          <TimelineSlider
            dates={{ ...this.events.map(e => e.Date) }}
            height={17}
            onChange={this.handleTimelineChange}
            disabled={this.state.isTransitioning}
          />
        </div>
        <MultimediaPresenter
          isOpen={this.state.isMultimediaPresenterOpen}
          images={this.getEventMultimediaSources()}
          onClose={this.handleMultimediaPresenterClose}
        />
      </React.Fragment>
    );
  }
}
