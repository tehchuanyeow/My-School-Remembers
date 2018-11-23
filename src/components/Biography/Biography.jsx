import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import BiographyTable from "./BiographyTable";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { connect } from "react-redux";
import DescriptionIcon from "@material-ui/icons/Description";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const styles = {
  root: {
    width: 300
  }
};

class Biography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  handleClick = event => {
    this.setState({ isVisible: true });
  };

  handleClose = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const { isVisible } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Tooltip
          TransitionComponent={Zoom}
          title="View a Summary of Details listed for the Veteran"
          placement="right"
        >
          <BottomNavigation
            value={classes}
            onChange={this.handleClose}
            showLabels
            onClick={this.handleClick}
            className={classes.root}
          >
            <BottomNavigationAction
              label="Biography"
              icon={<DescriptionIcon />}
            />
          </BottomNavigation>
        </Tooltip>

        <Modal open={isVisible} onClose={this.handleClose}>
          <BiographyTable
            veteranBio={this.props.profileList[0]}
            externalResources={this.props.externalResources}
          />
        </Modal>
      </div>
    );
  }
}

Biography.propTypes = {
  classes: PropTypes.object.isRequired
};

const BiographyStyles = withStyles(styles)(Biography);

const mapAppStateToProps = appState => ({
  profileList: appState.veteranList
});

export default connect(mapAppStateToProps)(BiographyStyles);
