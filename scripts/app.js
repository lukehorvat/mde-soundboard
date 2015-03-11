var sounds = [{
  name: "Sound A",
  url: "//upload.wikimedia.org/wikipedia/commons/d/d9/Wilhelm_Scream.ogg"
}, {
  name: "Sound B",
  url: "//upload.wikimedia.org/wikipedia/commons/c/c8/Kk-kazakh.ogg"
}, {
  name: "Sound C",
  url: "//upload.wikimedia.org/wikipedia/commons/7/71/En-us-amidst_the_mists.ogg"
}];

$(function() {
  soundManager.setup({
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
          url: sound.url,
          autoLoad: true,
          onload: function() {
            button.removeAttr("disabled");
          }
        });
      });
    }
  });
});
