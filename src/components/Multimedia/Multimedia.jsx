import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CollectionsIcon from "@material-ui/icons/Collections";
import Modal from "@material-ui/core/Modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const styles = theme => ({
  galleryContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    maxWidth: Math.min(window.innerWidth, window.innerHeight) * 0.8,
    maxHeight: Math.min(window.innerWidth, window.innerHeight) * 0.8
  },
  root: {
    width: 300
  }
});

function findBestResolution(width, height) {
  if (width < height) return width * 0.8;
  else return height * 0.8;
}

class Multimedia extends React.Component {
  state = {
    open: false,
    showFullscreenButton: true,
    showGalleryFullscreenButton: true,
    showPlayButton: true,
    showGalleryPlayButton: true,
    showVideo: {}
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: true });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: true });
      }
    }
  }

  _renderVideo(item) {
    return (
      <div className="image-gallery-image">
        {this.state.showVideo[item.embedUrl] ? (
          <div className="video-wrapper">
            <a
              className="close-video"
              onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
            />
            <iframe
              width={Math.min(window.innerWidth, window.innerHeight) * 0.8}
              height={Math.min(window.innerWidth, window.innerHeight) * 0.6}
              src={item.embedUrl}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
            <div className="play-button" />
            <img src={item.original} />
            {item.description && (
              <span
                className="image-gallery-description"
                style={{ right: "0", left: "initial" }}
              >
                {item.description}
              </span>
            )}
          </a>
        )}
      </div>
    );
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  render() {
    const { classes, pictures, picturedesc } = this.props;
    const images = [
      {
        original:
          "https://s3-ap-southeast-2.amazonaws.com/awm-media/collection/P05051.001/screen/3790855.JPG",
        thumbnail:
          "https://s3-ap-southeast-2.amazonaws.com/awm-media/collection/P05051.001/screen/3790855.JPG"
      },

      {
        original:
          "https://s3-ap-southeast-2.amazonaws.com/awm-media/collection/P11807.001/screen/6075084.JPG",
        thumbnail:
          "https://s3-ap-southeast-2.amazonaws.com/awm-media/collection/P11807.001/screen/6075084.JPG"
      }
    ];

    return (
      <div>
        <Tooltip TransitionComponent={Zoom} title="Summary of all the Veteran's Events" placement="right">
        <BottomNavigation
          value={classes}
          onChange={this.handleClose}
          showLabels
          onClick={this.handleOpen}
          className={classes.root}
        >
          <BottomNavigationAction
            label="Media Gallery"
            icon={<CollectionsIcon />}
          />
        </BottomNavigation>
        </Tooltip>

        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className={classes.galleryContainer}>
            <ImageGallery
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                margin: "auto"
              }}
              showFullscreenButton={
                this.state.showFullscreenButton &&
                this.state.showGalleryFullscreenButton
              }
              items={images}
              autoPlay={false}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

Multimedia.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Multimedia);
