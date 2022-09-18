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
  locale: 'en_us', // Current locale
};

var dsplay_media = {
  // General Info
  id: 1, // Media ID
  name: 'DSPLAY - Digital Signage', //
  count: 25, // A internal counter that stores how many media items were played until this point
  iteration: 4, // A internal counter that stores haw many times this particular media was played
  duration: 15000, // The media duration in milliseconds

  // here you will have more fields depending on the media type
  buffer: '10',
};

// these variables must be registered during the template creation in the Web Manager
var dsplay_template = {
  title_opacity: '.9',
  text_opacity: '.5',
  base_font_size: '2em',
  title: 'Hello!',
  image: 'https://dsplay.tv/site/wp-content/uploads/2019/11/logo.png',
};