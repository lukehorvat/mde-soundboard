soundManager.setup({
  onready: function() {
    var urls = [
      "//upload.wikimedia.org/wikipedia/commons/d/d9/Wilhelm_Scream.ogg",
      "//upload.wikimedia.org/wikipedia/commons/c/c8/Kk-kazakh.ogg",
      "//upload.wikimedia.org/wikipedia/commons/7/71/En-us-amidst_the_mists.ogg"
    ];

    var sounds = urls.map(function(url) {
      return soundManager.createSound({
        url: url,
        autoLoad: true
      });
    });

    sounds.forEach(function(sound) {
      sound.play();
    });
  }
});
