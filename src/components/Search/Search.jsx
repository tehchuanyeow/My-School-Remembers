import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ReactMapGL, { Marker } from "react-map-gl";
import SearchBox from "./SearchBox";
import SearchIcon from "@material-ui/icons/Search";
import changeProfile from "../../actions/changeProfile";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const searchContainerMargin = 20;

class Search extends Component {
  constructor(props) {
    super(props);
    this.mapDefaultAttributes = {
      width: 1000,
      height: 700,
      dragRotate: false
    };
      (this.state = {
        VeteranID: "",
        Name: ""
      });

    const initialCoordinates = this.parseCoordinates(
      this.props.initialCoordinates
    );

    this.state = {
      isVisible: false,
      viewport: {
        latitude: initialCoordinates.lat,
        longitude: initialCoordinates.lon,
        zoom: 14
      }
    };
  }

  parseCoordinates(Coordinates) {
    const coords = Coordinates.split(",");
    return { lat: parseFloat(coords[0]), lon: parseFloat(coords[1]) };
  }

  handleClick = () => {
    this.setState({ isVisible: true });
    this.props.timelineSlider
  };

  handleClose = () => {
    this.setState({ isVisible: false });
  };

  selectProfile = () => {
    this.setState({ isVisible: false });
    this.props.changeProfile(this.state.Name, this.state.VeteranID);
  };

  render() {
    const { isVisible } = this.state;
    const { classes, veteranList } = this.props;

    return (
      <React.Fragment>
        <Tooltip
          TransitionComponent={Zoom}
          title="Search for a Veteran"
          placement="right"
        >
          <BottomNavigation
            value={classes}
            onClick={this.handleClick}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction
              label="Search Veteran"
              icon={<SearchIcon />}
            />
          </BottomNavigation>
        </Tooltip>

        <Modal open={isVisible} onClose={this.handleClose}>
          <div className={classes.searchContainer}>
            <ReactMapGL
              // mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
              mapboxApiAccessToken={
                "pk.eyJ1IjoicmFzb29saS1iZWhuYW0iLCJhIjoiY2psaDl5ajd6MHVmbTNrcGtiY3VxZGQ5diJ9.qars2_NNloH9bcNMUEfHBA"
              }
              {...this.mapDefaultAttributes}
              {...this.state.viewport}
              onViewportChange={viewport => {
                this.setState({ viewport });
              }}
            >
              {veteranList.map(vBio => {
                const coords = this.parseCoordinates(vBio.Coordinates);
                return (
                  <Marker latitude={coords.lat} longitude={coords.lon}>
                    <Button
                      className={classes.markerButton}
                      variant="contained"
                      onClick={this.selectProfile}
                    >
                      {`${vBio.Name} (${vBio.VeteranID})`}
                    </Button>
                  </Marker>
                );
              })}
            </ReactMapGL>
            <SearchBox />
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  searchContainer: {
    position: "absolute",
    top: searchContainerMargin * 3,
    left: searchContainerMargin * 30,
    height: 700,
    width: 1000
  },
  markerButton: {
    backgroundColor: "#fcf79c",
    fontWeight: "bold"
  },
  root: {
    width: 300
  }
});

const SearchWithStyles = withStyles(styles)(Search);

const mapAppStateToProps = appState => ({
  initialCoordinates: appState.activeProfile.veteranBio.Coordinates,
  veteranList: appState.veteranList
});

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
      )
    )
});

export default connect(
  mapAppStateToProps,
  mapDispatchToProps
)(SearchWithStyles);
