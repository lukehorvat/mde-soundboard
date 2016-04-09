import $ from "jquery";
import {soundManager} from "soundmanager2";
import sounds from "./sounds";

$(() => {
  soundManager.setup({
    debugMode: false,
    onready: () => sounds.forEach(loadSound)
  });
});

function loadSound(sound) {
  let button = $(`
    <a id="${sound.file}" href="#${sound.file}">
      <span>${sound.name}</span>
    </a>`
  ).appendTo("#sounds").hide();
  let pulseFade = () => button.fadeToggle(400, () => button.queue().length > 0 && pulseFade());
  let startPulseFade = () => button.queue().length <= 0 && pulseFade();
  let stopPulseFade = () => button.stop(true, true).show();

  soundManager.createSound({
    id: sound.name,
    url: `sounds/${sound.file}`,
    onload: () => {
      button.fadeIn(1500, () => {
        // Once sound and button are ready, enable clicking.
        button.on("click", () => {
          soundManager.stopAll();
          soundManager.getSoundById(sound.name).play();
        });
      })
    },
    onplay: startPulseFade,
    onstop: stopPulseFade,
    onfinish: stopPulseFade
  });

  // For some reason, mobile browsers don't handle loading all sounds
  // simultaneously. So load the sounds at random intervals instead.
  setTimeout(() => soundManager.getSoundById(sound.name).load(), Math.random() * 10000);
}
