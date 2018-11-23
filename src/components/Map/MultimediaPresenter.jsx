import React, { Component } from "react";
import ImgsViewer from "react-images-viewer";

class MultimediaPresenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: true
    };
  }

  gotoPrevImg = () => {
    this.state.photoIndex > 0 &&
      this.setState({ photoIndex: this.state.photoIndex - 1 });
  };

  gotoNextImg = imagesLength => {
    this.state.photoIndex < imagesLength &&
      this.setState({ photoIndex: this.state.photoIndex + 1 });
  };

  closeImgsViewer = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { photoIndex } = this.state;
    const { isOpen, images, onClose } = this.props;
    return (
      <div>
        <ImgsViewer
          currImg={photoIndex}
          imgs={images}
          isOpen={isOpen}
          onClickPrev={this.gotoPrevImg}
          onClickNext={() => this.gotoNextImg(images.length)}
          onClose={onClose}
        />
      </div>
    );
  }
}

export default MultimediaPresenter;
