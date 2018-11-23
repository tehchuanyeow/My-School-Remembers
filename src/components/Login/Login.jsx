import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import LoginTable from "./LoginTable";

const styles = {
  root: {
    width: 300
  }
};

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isVisible: false
    };
  }

handleClick = () => {
  this.setState({ isVisible: true });
};

handleClose = () => {
  this.setState({ isVisible: false });
};

render() {
  const { isVisible } = this.state;
  const { classes, veteranList } = this.props;

  return (
    <div>
      <Tooltip
        TransitionComponent = {Zoom}
        title="Register or Login to your Profile"
        placement = "right"
      >
      <BottomNavigation
        value={classes}
        onChange={this.handleClose}
        showLabels
        onClick={this.handleClick}
        className={classes.root}
      >
      <BottomNavigationAction
        label="Login / Register"
        icon={<FingerprintIcon />}
      />
      </BottomNavigation>
      </Tooltip>

      <Modal open={isVisible} onClose={this.handleClose}>
        <LoginTable
          veteranBio={this.props.profileList[0]}
          externalResources={this.props.externalResources}
        />
      </Modal>
    </div>
  )}
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

const LoginStyles = withStyles(styles)(Login);

const mapAppStateToProps = appState => ({
  profileList: appState.veteranList
});

export default connect(mapAppStateToProps)(LoginStyles);