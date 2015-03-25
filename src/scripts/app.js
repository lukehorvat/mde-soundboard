var sounds = [{
  name: "My name is",
  file: "my-name-is.mp3"
}, {
  name: "You're a really talented guy",
  file: "youre-a-really-talented-guy.mp3"
}, {
  name: "You should see my kid",
  file: "you-should-see-my-kid.mp3"
}, {
  name: "I'm proud of my son",
  file: "im-proud-of-my-son.mp3"
}, {
  name: "Gendersmash music",
  file: "gendersmash-music.mp3"
}, {
  name: "Big jelly donut gut",
  file: "big-jelly-donut-gut.mp3"
}, {
  name: "Munch munch munch",
  file: "munch-munch-munch.mp3"
}, {
  name: "He's different",
  file: "hes-different.mp3"
}, {
  name: "Sure, I'll get the job done (1)",
  file: "sure-ill-get-the-job-done-1.mp3"
}, {
  name: "Sure, I'll get the job done (2)",
  file: "sure-ill-get-the-job-done-2.mp3"
}, {
  name: "Sure, I'll get the job done (3)",
  file: "sure-ill-get-the-job-done-3.mp3"
}, {
  name: "Need it / breathe it",
  file: "need-it-breathe-it.mp3"
}, {
  name: "What inspires me",
  file: "what-inspires-me.mp3"
}, {
  name: "We're just gonna kill 'em",
  file: "were-just-gonna-kill-em.mp3"
}, {
  name: "Information retention",
  file: "information-retention.mp3"
}, {
  name: "Brooklyn by far",
  file: "brooklyn-by-far.mp3"
}, {
  name: "Look at my hands",
  file: "look-at-my-hands.mp3"
}, {
  name: "Underworld",
  file: "underworld.mp3"
}, {
  name: "You jelly?",
  file: "you-jelly.mp3"
}, {
  name: "Cut yourself",
  file: "cut-yourself.mp3"
}, {
  name: "New York credibility",
  file: "new-york-credibility.mp3"
}, {
  name: "You wanna be safe? (1)",
  file: "you-wanna-be-safe-1.mp3"
}, {
  name: "You wanna be safe? (2)",
  file: "you-wanna-be-safe-2.mp3"
}, {
  name: "You wanna be safe? (3)",
  file: "you-wanna-be-safe-3.mp3"
}, {
  name: "You wanna be safe? (4)",
  file: "you-wanna-be-safe-4.mp3"
}, {
  name: "Adopt a Cambodian kid",
  file: "adopt-a-cambodian-kid.mp3"
}, {
  name: "You a gamer dude?",
  file: "you-a-gamer-dude.mp3"
}, {
  name: "Lee mee alon",
  file: "lee-mee-alon.mp3"
}, {
  name: "When life sucks",
  file: "when-life-sucks.mp3"
}, {
  name: "Baby want milk",
  file: "baby-want-milk.mp3"
}, {
  name: "You know I'm smooth",
  file: "you-know-im-smooth.mp3"
}, {
  name: "Do not sexualize me",
  file: "do-not-sexualize-me.mp3"
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
