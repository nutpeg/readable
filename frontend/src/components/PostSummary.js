import React from 'react';
import Typography from '@material-ui/core/Typography';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { prettyDate } from '../utils/prettyDate';
import VotingControls from './VotingControls';
import EditDeleteControls from './EditDeleteControls';

const styles = theme => ({
  icon: {
    marginLeft: theme.spacing.unit * 2,
  },
  commentIcon: {
    color: grey[600],
    fontSize: 20,
  },
});

const PostSummary = props => {
  const {
    classes,
    post,
    onUpVote,
    onDownVote,
    onDeletePost,
    onEditPost,
  } = props;
  return (
    <div className="list">
      <div className="list__controls-left">
        <VotingControls
          post={post}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
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
        <EditDeleteControls
          item={post}
          onDeleteItem={onDeletePost}
          onEditItem={onEditPost}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(PostSummary);
