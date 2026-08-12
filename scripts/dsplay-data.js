/**
 * Contents of this file will be ignored at runtime
**/


var dsplay_config = {
  orientation: 'landscape', // 'landscape' or 'portrait'
  width: 1280, // Screen width of device
  height: 720, // Screen height of device
  os: 'android', // for future use
  osVersion: 17, // Android SDK version
  appVersion: 101, // DSPLAY App version code
  appVersionName: '2.50.8', // DSPLAY App version name
  locale: 'pt_br', // Current locale
};

var dsplay_media = {
  // General Info
  id: 1, // Media ID
  name: 'DSPLAY - Digital Signage', //
  count: 25, // A internal counter that stores how many media items were played until this point
  iteration: 4, // A internal counter that stores haw many times this particular media was played
  duration: 15000, // The media duration in milliseconds

  // The current ticket/queue number to display, as a string. app.js strips any
  // non-digit characters and zero-pads a single-digit result (e.g. "5" -> "05").
  buffer: '42',
};

// this template has no dsplay_template variables - it's driven entirely by
// dsplay_media.buffer (see above)
var dsplay_template = {};
