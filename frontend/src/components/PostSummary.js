import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { prettyDate } from '../utils/prettyDate';

const styles = theme => ({
  icon: {
    marginLeft: theme.spacing.unit * 2,
  },
  smallIcon: {
    fontSize: 30,
  },
  commentIcon: {
    color: grey[600],
    fontSize: 20,
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: grey[600],
  },
  smallIconButton: {
    padding: 0,
    marginBottom: 1,
    minWidth: 30,
  },
});

const PostSummary = props => {
  const { classes, post, onUpVote, onDownVote } = props;
  return (
    <div className="list">
      <div className="list__controls-left">
        <div className="list__voting-controls">
          <div>
            <Button
              className={classes.smallIconButton}
              size="small"
              onClick={() => onUpVote(post.id)}
            >
              <ExpandLessIcon className={classes.smallIcon} color="action" />
            </Button>
          </div>
          <Typography variant="caption">{`${post.voteScore} VOTES`}</Typography>
          <div>
            <Button
              className={classes.smallIconButton}
              size="small"
              onClick={() => onDownVote(post.id)}
            >
              <ExpandMoreIcon className={classes.smallIcon} color="action" />
            </Button>
          </div>
        </div>
      </div>
      <div className="list__item">
        <Typography variant="subheading" gutterBottom>
          {post.title}
        </Typography>
        <p>
          <span className="lighter">by </span>
          <span className="bolder">{post.author}</span>
          <span className="lighter">{` on ${prettyDate(post.timestamp)}`}</span>
          <Badge
            className={classes.icon}
            badgeContent={post.commentCount}
            color="primary"
          >
            <ModeCommentIcon className={classes.commentIcon} />
          </Badge>
        </p>
      </div>
      <div className="list__controls-right">
        <IconButton aria-label="Edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default withStyles(styles)(PostSummary);
