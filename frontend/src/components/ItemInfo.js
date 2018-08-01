import React from 'react';
import { prettyDate } from '../utils/prettyDate';

const ItemInfo = props => {
  const {
    author,
    timestamp,
    children,
  } = props;
  return <React.Fragment>
      <span className="lighter">by </span>
      <span className="bolder">{author}</span>
      <span className="lighter">{` on ${prettyDate(timestamp)}`}</span>
      {children}
    </React.Fragment>;
};

export default ItemInfo;
