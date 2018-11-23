import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import PortfolioTable from "./PortfolioTable";

const styles = {
  root: {
    width: 300
  }
};

class Portfolio extends React.Component {
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
        title="View Portfolio"
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
        label="Summary"
        icon={<ReceiptIcon />}
      />
      </BottomNavigation>
      </Tooltip>

      <Modal open={isVisible} onClose={this.handleClose}>
        <PortfolioTable
          veteranBio={this.props.profileList[0]}
          externalResources={this.props.externalResources}/>
      </Modal>
    </div>
  )}
}

Portfolio.propTypes = {
  classes: PropTypes.object.isRequired
};

const PortfolioStyles = withStyles(styles)(Portfolio);

const mapAppStateToProps = appState => ({
  profileList: appState.veteranList
});

export default connect(mapAppStateToProps)(PortfolioStyles);