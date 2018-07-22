import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Tooltip from '@material-ui/core/Tooltip';
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
  const { classes, id, voteScore, onUpVote, onDownVote } = props;
  return (
    <div className="list__voting-controls">
      <div>
        <Tooltip title="+1" placement="left">
          <Button
            className={classes.smallIconButton}
            size="small"
            onClick={() => onUpVote(id)}
          >
            <ExpandLessIcon className={classes.smallIcon} color="action" />
          </Button>
        </Tooltip>
      </div>
      <Typography variant="caption">{`${voteScore} VOTES`}</Typography>
      <div>
        <Tooltip title="-1" placement="right">
          <Button
            className={classes.smallIconButton}
            size="small"
            onClick={() => onDownVote(id)}
          >
            <ExpandMoreIcon className={classes.smallIcon} color="action" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default withStyles(styles)(VotingControls);
