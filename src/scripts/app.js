import $ from "jquery";
import {soundManager} from "SoundManager2";
import sounds from "./sounds";

$(() => {
  soundManager.setup({
    debugMode: false,
    onready: () => {
      sounds.forEach(sound => {
        let button = $("<button />", {
          text: sound.name
        }).on("click", () => {
          soundManager.stopAll();
          soundManager.getSoundById(sound.name).play();
        }).appendTo("#sounds").hide();

        soundManager.createSound({
          id: sound.name,
          url: `sounds/${sound.file}`,
          autoLoad: true,
          onload: () => button.fadeIn(3000)
        });
      });
    }
  });
});
