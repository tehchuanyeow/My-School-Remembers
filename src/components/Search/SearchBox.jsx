import React, { Component } from "react";
import { Paper, TextField, Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { findProfiles } from "../../actions";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";

const catergories = ["Name", "VeteranID", "City", "State", "Postcode"];

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: catergories[0],
      searchTerm: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.findProfiles(this.state.category, this.state.searchTerm);
  };

  handleCategoryChange = event => {
    this.setState({ category: event.target.value });
  };

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <form onSubmit={this.handleFormSubmit} noValidate autoComplete="off">
          <TextField
            select
            label="Category"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleCategoryChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
            variant="outlined"
          >
            {catergories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            label="Search field"
            type="search"
            className={classes.textField}
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            className={classes.searchButton}
            variant="fab"
            mini
          >
            <SearchIcon />
          </Button>
        </form>
      </Paper>
    );
  }
}

const styles = {
  root: {
    position: "absolute",
    top: -30,
    left: 0,
    right: 0,
    margin: "auto",
    width: 560
  },
  textField: {
    width: 200,
    paddingLeft: 10,
    marginRight: 30
  },
  searchButton: {
    backgroundColor: "#96FBA2",
    fontWeight: "bold"
  },
  menu: {
    width: 200
  }
};

const SearchBoxWithStyles = withStyles(styles)(SearchBox);

const mapDispatchToProps = dispatch => ({
  findProfiles: (category, searchTerm) => {
    dispatch(findProfiles(category, searchTerm));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBoxWithStyles);
