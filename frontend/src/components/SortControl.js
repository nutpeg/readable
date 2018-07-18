import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 20,
    paddingLeft: 0,
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    minWidth: 120,
  },
});

class SortControl extends React.Component {
  handleChange = event => {
    this.props.onSortOrderChange(event.target.value);
  };

  render() {
    const { classes, sortOrder } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="sortOrder">Sort by</InputLabel>
          <Select
            value={sortOrder}
            onChange={this.handleChange}
            inputProps={{ name: 'sortOrder', id: 'sortOrder' }}
          >
            <MenuItem value={'timestamp'}>Most recent</MenuItem>
            <MenuItem value={'voteScore'}>Most votes</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(SortControl);
