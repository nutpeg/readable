import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import VotingControls from './VotingControls';
import SimpleControl from './SimpleControl';
import ItemInfo from './ItemInfo';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Badge from '@material-ui/core/Badge';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  icon: {
    marginLeft: theme.spacing.unit * 2,
  },
  commentIcon: {
    color: grey[600],
    fontSize: 20,
  },
});

class ListItem extends Component {
  state = {
    selectedId: '',
  };

  handleEditClick = id => {
    this.setState({ selectedId: id });
    this.props.onEditItem();
  };

  render() {
    const {
      item,
      onUpVote,
      onDownVote,
      onDeleteItem,
      isEditing,
      classes,
    } = this.props;
    return (
      <div className="list">
        {isEditing &&
          item.id === this.state.selectedId && (
            <Redirect to={`/posts/${this.state.selectedId}`} />
          )}
        <div className="list__controls-left">
          <VotingControls
            id={item.id}
            voteScore={item.voteScore}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </div>
        <div className="list__item">
          <Link to={`${item.category}/${item.id}`}>
            <Typography variant="subheading" gutterBottom>
              {item.title}
            </Typography>
            <p>
              <ItemInfo
                author={item.author}
                commentCount={item.commentCount}
                timestamp={item.timestamp}
              >
                <Badge
                  className={classes.icon}
                  badgeContent={item.commentCount}
                  color="primary"
                >
                  <ModeCommentIcon className={classes.commentIcon} />
                </Badge>
              </ItemInfo>
            </p>
          </Link>
        </div>
        <div className="list__controls-right">
          <SimpleControl
            controlText="Edit"
            id={item.id}
            isEditing={isEditing}
            handleClick={this.handleEditClick}
          >
            <EditIcon />
          </SimpleControl>
          <SimpleControl
            controlText="Delete"
            id={item.id}
            handleClick={onDeleteItem}
          >
            <DeleteIcon />
          </SimpleControl>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ListItem);
