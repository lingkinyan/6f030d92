const keyMirror = require("keymirror");

const CallTypes = keyMirror({
  missed: null,
  answered: null,
  voicemail: null,
});

export default CallTypes;
