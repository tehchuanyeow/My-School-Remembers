import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  media: {
    margin: "auto",
    width: 150,
    height: 150
  }
};

const markersize = 150;
const markerOffset = { x: 75, y: 215 };

class MultimediaMarker extends Component {
  render() {
    const { classes, position, eventName, onClick, image, desc } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          top: position.y - markerOffset.y,
          left: position.x - markerOffset.x
        }}
      >
        <Card>
          <CardActionArea onClick={onClick}>
            <CardMedia
              className={classes.media}
              image={image}
              title={eventName}
            />
            <hr />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {eventName}
              </Typography>
              <Typography component="p">{desc}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

MultimediaMarker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MultimediaMarker);
