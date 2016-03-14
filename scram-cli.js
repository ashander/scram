var scram = require('.');
type = process.argv[2];
guid = process.argv[3];
limit = process.argv[4];
function printHelp() {
  console.log('Explore Sac County Open datastreams');
  console.log('');
  console.log('Usage: node scram-cli (info|data) [GUID] [limit=50]');
  console.log('');
  console.log('Calling without arguments will return the possible GUIDs');
  console.log('');
}
if (typeof type === 'undefined' && typeof guid === 'undefined') {
  scram.available();
}
if (type === 'info' || type === 'data' || type === '-h' || type === '--help') {
  if (!/h/.test(type) && typeof guid === 'undefined') {
    console.log('Enter a guid!');
  } else {
    if (type === 'info') {
      scram.info(guid);
    }
    if (type === 'data') {
      scram.data(guid, limit);
    }
  }
  printHelp();
} else {
  printHelp();
}
