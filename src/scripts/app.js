import $ from "jquery";
import {soundManager} from "SoundManager2";
import sounds from "./sounds";

$(() => {
  soundManager.setup({
    debugMode: false,
    onready: () => {
      sounds.forEach(sound => {
        let button = $("<a />", {
          text: sound.name,
          href: "#",
          disabled: "disabled"
        }).on("click", () => {
          soundManager.stopAll();
          soundManager.getSoundById(sound.name).play();
        }).appendTo("#sounds").hide();

        let pulseFade = () => button.fadeToggle(400, () => button.queue().length > 0 && pulseFade());
        let startPulseFade = () => button.queue().length <= 0 && pulseFade();
        let stopPulseFade = () => button.stop(true, true).show();

        soundManager.createSound({
          id: sound.name,
          url: `sounds/${sound.file}`,
          autoLoad: true,
          onload: () => button.fadeIn(1000, () => button.removeAttr("disabled")),
          onplay: startPulseFade,
          onstop: stopPulseFade,
          onfinish: stopPulseFade
        });
      });
    }
  });
});
