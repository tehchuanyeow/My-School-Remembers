import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Snackbar from '@material-ui/core/Snackbar';

const biographyContainerMargin = 50;

const styles = {
  biographyContainer: {
    position: "absolute",
    top: biographyContainerMargin / 2,
    left: 0,
    right: 0,
    margin: "auto",
    height: window.innerHeight - biographyContainerMargin,
    maxHeight: window.innerHeight - biographyContainerMargin,
    width: window.innerWidth - biographyContainerMargin,
    maxWidth: 700,
    overflowY: "auto"
  }
};

class BiographyTable extends Component {
  render() {
    const { classes } = this.props;
    const { veteranBio, externalResources } = this.props;

    if(veteranBio == undefined){
      {this.handleOpen}
      return(
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={true}
        autoHideDuration={6000}
        message={"Please select a Veteran"} />
      )
    }else{

      return (
        <Paper className={classes.biographyContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <img width={200} height={250} src={veteranBio.Photo} />
                </TableCell>
                <TableCell>
                  <h1>{veteranBio.Name}</h1>
                  <h2>{veteranBio.VeteranID}</h2>
                  <h3>{veteranBio.Summary}</h3>
                </TableCell>
              </TableRow>
              <TableRow
                style={{
                  backgroundColor: "black",
                  color: "white"
                }}
              >
                <TableCell style={{ color: "whitesmoke" }}>Attribute</TableCell>
                <TableCell style={{ color: "whitesmoke" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(veteranBio)
                .filter(k => k !== "Photo" && k !== "Coordinates")
                .map(k => {
                  return (
                    <TableRow key={k}>
                      <TableCell>{k}</TableCell>
                      <TableCell>{veteranBio[k]}</TableCell>
                    </TableRow>
                  );
                })}
              {externalResources.map(er => {
                return (
                  <TableRow key={er.ResourceName}>
                    <TableCell>{er.ResourceName}</TableCell>
                    <TableCell>
                      <a href={er.ResourceLink} target="_blank">
                        link
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}

BiographyTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BiographyTable);
