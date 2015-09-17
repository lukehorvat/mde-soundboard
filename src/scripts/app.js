import $ from "jquery";
import {soundManager} from "soundmanager2";
import sounds from "./sounds";

$(() => {
  soundManager.setup({
    debugMode: false,
    onready: () => {
      sounds.forEach(sound => {
        let button = $("<a />", {
          text: sound.name,
          href: "#"
        }).appendTo("#sounds").hide();

        let pulseFade = () => button.fadeToggle(400, () => button.queue().length > 0 && pulseFade());
        let startPulseFade = () => button.queue().length <= 0 && pulseFade();
        let stopPulseFade = () => button.stop(true, true).show();

        soundManager.createSound({
          id: sound.name,
          url: `sounds/${sound.file}`,
          autoLoad: true,
          onload: () => button.fadeIn(1500, () => {
            // Once sound and button are ready, enable clicking.
            button.on("click", () => {
              soundManager.stopAll();
              soundManager.getSoundById(sound.name).play();
            });
          }),
          onplay: startPulseFade,
          onstop: stopPulseFade,
          onfinish: stopPulseFade
        });
      });
    }
  });
});
