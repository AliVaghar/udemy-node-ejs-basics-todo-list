// we can also say exports.getDate ...
module.exports.getDate = function() {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date().toLocaleDateString('en-us', options);
};
