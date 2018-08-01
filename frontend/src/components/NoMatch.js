import React from 'react';

const NoMatch = ({ location }) => (
  <div>
    <h3>404 Error - Page not found.</h3>
    <p>
      It looks like the page you tried to access does not exist. If you were
      trying to access a post, it may have been deleted. Please click on one of
      the links to the left to continue your browsing.
    </p>
  </div>
);

export default NoMatch;
