import React from 'react';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  icon: {
    marginLeft: theme.spacing.unit * 2,
  },
  smallIcon: {
    fontSize: 30,
    color: grey[500],
  },
  smallIconButton: {
    padding: 0,
    marginBottom: 1,
    minWidth: 30,
  },
  smallChip: {
    backgroundColor: grey[500],
    margin: theme.spacing.unit * 0.2,
    color: grey[100],
    fontSize: 10,
    fontWeight: 'bold',
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
      <Chip
        label={`${voteScore} VOTES`}
        className={classes.smallChip}
      />
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
