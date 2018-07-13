import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  icon: {
    marginLeft: theme.spacing.unit * 2,
  },
  smallIcon: {
    fontSize: 30,
  },
  smallIconButton: {
    padding: 0,
    marginBottom: 1,
    minWidth: 30,
  },
});

const VotingControls = props => {
  const { classes, item, onUpVote, onDownVote } = props;
  return (
    <div className="list__voting-controls">
      <div>
        <Button
          className={classes.smallIconButton}
          size="small"
          onClick={() => onUpVote(item.id)}
        >
          <ExpandLessIcon className={classes.smallIcon} color="action" />
        </Button>
      </div>
      <Typography variant="caption">{`${item.voteScore} VOTES`}</Typography>
      <div>
        <Button
          className={classes.smallIconButton}
          size="small"
          onClick={() => onDownVote(item.id)}
        >
          <ExpandMoreIcon className={classes.smallIcon} color="action" />
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(VotingControls);
