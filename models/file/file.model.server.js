const fs = require('fs');

filewrite = (policy) => {
  console.log('Data in Policy ', JSON.stringify(policy))
  fs.writeFile('PolicyCopyData.txt', JSON.stringify(policy), function (err) {
    if (err) throw err;
    console.log('Saved!');
  })
  return policy
}

module.exports = {
  filewrite
}