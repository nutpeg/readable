export const prettyDate = timestamp => {
  const date = new Date(timestamp);
  const monthLookup = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = monthLookup[date.getMonth()];
  const month = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`
};
