var $ = require("jquery");
var soundManager = require("SoundManager2").soundManager;
var sounds = require("./sounds");

$(function() {
  soundManager.setup({
    debugMode: false,
    onready: function() {
      sounds.forEach(function(sound) {
        var button = $("<button />", {
          text: sound.name,
          disabled: "disabled"
        }).on("click", function() {
          soundManager.stopAll();
          soundManager.getSoundById(sound.name).play();
        }).appendTo("#sounds");

        soundManager.createSound({
          id: sound.name,
          url: "sounds/" + sound.file,
          autoLoad: true,
          onload: function() {
            button.removeAttr("disabled");
          }
        });
      });
    }
  });
});
