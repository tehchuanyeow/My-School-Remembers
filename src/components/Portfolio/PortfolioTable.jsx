import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
  root: {
    width: 300
  }
};

class PortfolioTable extends React.Component {
  state = {
    bottom: true
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;
    const { veteranBio, externalResources } = this.props;

    const portfolioList = (

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <img width={200} height={250} src={veteranBio.Photo} />
              </TableCell>
              <TableCell>
              <h3>Veteran Name</h3><p>{veteranBio.Name}</p>
                </TableCell>
                <TableCell>
                <h3>Veteran ID</h3><p>{veteranBio.VeteranID}</p>
                </TableCell>
                <TableCell>
                <h3>Veteran Regimental Number</h3><p>{veteranBio.RegimentalNumber}</p>
                </TableCell>
              <TableRow>
                <TableCell>
                <h3>Summary</h3><p>{veteranBio.Summary}</p>
                </TableCell>
              </TableRow>
              {externalResources.map(er => {
              return (
                <TableRow>
                  <TableCell>
                    <a href={er.ResourceLink} target="_blank">
                      {er.ResourceName}
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
            </TableRow>
          </TableHead>
        </Table> 
        );

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
        <div>
          <Drawer
            anchor="bottom"
            open={this.state.bottom}
            onClose={this.toggleDrawer("bottom", false)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer("bottom", false)}
              onKeyDown={this.toggleDrawer("bottom", false)}
            >
              {portfolioList}
            </div>
          </Drawer>
        </div>
      );
    }
  }
}
PortfolioTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PortfolioTable);
