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
    <button type="button">
      <span><i class="fa fa-cog fa-spin"></i> Loading&hellip;</span>
    </button>`
  ).appendTo("#sounds");
  let pulseFade = () => button.fadeToggle(400, () => button.queue().length > 0 && pulseFade());
  let startPulseFade = () => button.queue().length <= 0 && pulseFade();
  let stopPulseFade = () => button.stop(true, true).show();

  soundManager.createSound({
    id: sound.name,
    url: `sounds/${sound.file}`,
    onload: () => {
      button.on("click", () => {
        soundManager.stopAll();
        soundManager.getSoundById(sound.name).play();
      }).children("span").text(sound.name);
    },
    onplay: startPulseFade,
    onstop: stopPulseFade,
    onfinish: stopPulseFade
  });

  // For some reason, mobile browsers don't handle loading all sounds
  // simultaneously. So load the sounds at random intervals instead.
  setTimeout(() => soundManager.getSoundById(sound.name).load(), Math.random() * 10000);
}

// Google Analytics.
(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");
ga("create", "UA-24505142-5", "auto");
ga("send", "pageview");
