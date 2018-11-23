import * as React from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import changeProfile from "./actions/changeProfile";

import Map from "./components/Map";
import Biography from "./components/Biography";
import Multimedia from "./components/Multimedia";
import PortfolioTable from "./components/Portfolio";
import Search from "./components/Search";
import Login from "./components/Login";

const UIMargin = window.innerHeight;

class App extends React.Component {
  handleSearch = searchResult => {
    console.log(searchResult);
  };

  componentDidMount() {
    this.props.changeProfile("James Martin", "189210");
    console.log(this.props.changeProfile("James Martin", "189210"));
  }

  render() {
    const { profileData } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Map
          events={profileData.events.sort(e => e.Date).map(reformatEventDate)}
          eventMultimedia={profileData.eventMultimedia.map(reformatEventDate)}
        />
        <MenuList
          style={{
            position: "absolute",
            top: "20px"
          }}
        >
        <MenuItem>
          <AppBar position="static">
          <Tabs value={5}>
          <Tab label={`My School Remembers: Welcome, ${profileData.Name}`}/>
          </Tabs>
          </AppBar>
        </MenuItem>
          <MenuItem>
            <Login
              veteranBio={profileData.veteranBio}
              externalResources={profileData.bioExternalResources}
            />
          </MenuItem>
          <MenuItem>
            <Search onSearch={this.handleSearch} />
          </MenuItem>
          <MenuItem>
            <Biography
              veteranBio={profileData.veteranBio}
              externalResources={profileData.bioExternalResources}
            />
          </MenuItem>
          <MenuItem>
            <Multimedia multimedias={profileData.multimedia} />
          </MenuItem>
          <MenuItem>
            <PortfolioTable
              veteranBio={profileData.veteranBio}
              externalResources={profileData.bioExternalResources} />
          </MenuItem>
        </MenuList>
      </React.Fragment>
    );
  }
}

const reformatEventDate = event => {
  event.Date = new Date(event.Date)
    .toJSON()
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");
  return event;
};

const mapAppStateToProps = appState => {
  return {
    profileData: appState.activeProfile
  };
};

const mapDispatchToProps = dispatch => ({
  changeProfile: (Name, VeteranID) => dispatch(changeProfile(Name, VeteranID))
});

export default connect(
  mapAppStateToProps,
  mapDispatchToProps
)(App);
