import "rc-slider/assets/index.css";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "rc-slider";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const styles = {
  sliderContainer: {
    width: window.innerWidth / 2.9,
    padding: 25,
    opacity: 0.85,
    fontWeight: "bold"
  }
};

class TimelineSlider extends React.Component {
  render() {
    const { classes, dates, height, onChange, disabled } = this.props;
      return (
        <Paper className={classes.sliderContainer}>
          <Slider
            horizontal
            included
            dots
            marks={dates}
            min={0}
            max={Object.keys(dates).length - 1}
            style={{ height: height, width: window.innerWidth / 3.2 }}
            onChange={onChange}
            disabled={disabled}
          />
        <br />
        <Button>+ Add Event</Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(TimelineSlider);
