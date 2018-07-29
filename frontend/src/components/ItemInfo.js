import React from 'react';
// import ModeCommentIcon from '@material-ui/icons/ModeComment';
// import Badge from '@material-ui/core/Badge';
// import { withStyles } from '@material-ui/core/styles';
// import grey from '@material-ui/core/colors/grey';
import { prettyDate } from '../utils/prettyDate';

// const styles = theme => ({
//   icon: {
//     marginLeft: theme.spacing.unit * 2,
//   },
//   commentIcon: {
//     color: grey[600],
//     fontSize: 20,
//   },
// });

const ItemInfo = props => {
  const {
    // classes,
    author,
    timestamp,
    children,
    // commentCount
  } = props;
  return (
    <React.Fragment>
      <span className="lighter">by </span>
      <span className="bolder">{author}</span>
      <span className="lighter">{` on ${prettyDate(timestamp)}`}</span>
      {/* <Badge
        className={classes.icon}
        badgeContent={commentCount}
        color="primary"
      >
        <ModeCommentIcon className={classes.commentIcon} />
      </Badge> */}
      {children}
    </React.Fragment>
  );
};

// export default withStyles(styles)(ItemInfo);
export default ItemInfo;
