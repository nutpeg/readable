import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '90%',
    maxWidth: 360,
  },
});

const MyLink = props => <Link {...props} />;

class PostsNav extends Component {
  render() {
    const { classes, categories } = this.props;
    return (
      <nav className="nav">
        <div className={classes.root}>
          <List component="nav">
            <ListItem button component={MyLink} to="/">
              <ListItemText primary="All" />
            </ListItem>
            {categories.map(category => (
              <ListItem
                button
                key={category.name}
                component={MyLink}
                to={`/${category.path}`}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </nav>
    );
  }
}

export default withStyles(styles)(PostsNav);
