


// import * as Tone from "tone";
let file = "";

const players = new Tone.Players({
    sample1: "https://christinecheng1013.github.io/NetArt-Repo/media/chime1.wav",
    sample2: "https://christinecheng1013.github.io/NetArt-Repo/media/chime2.wav",
    sample3: "https://christinecheng1013.github.io/NetArt-Repo/media/chime3.wav",
    sample4: `${file}`
});

let slider1 = document.getElementById("slider1");
let slider2 = document.getElementById("slider2");
let slider3 = document.getElementById("slider3");
let slider4 = document.getElementById("slider4");
let slider5 = document.getElementById("slider5");
let slider6 = document.getElementById("slider6");
let slider7 = document.getElementById("slider7");

//attach a click listener to a play button
// document.querySelector("#onoff")?.addEventListener("click", async () => {
//     await Tone.start();
//     console.log("audio is ready");
// });

let chorus = new Tone.Chorus({
    frequency: 1.5,
    delayTime: 3.5,
    depth: 0.7
});
//resonance ranges from 0-1
chorus.toDestination();

let distortion = new Tone.Distortion({
    distortion: 0.4
});
distortion.toDestination();

let phaser = new Tone.Phaser({
    frequency: 0.5,
    octaves: 3,
    baseFrequency: 350
});
phaser.toDestination();


// slider1.value = 1;

slider1.oninput = () => {
    chorus.frequency.value = slider1.value * 0.7;
    console.log(slider1.value);
};

slider2.onchange = () => {
    chorus.delayTime = slider2.value * 1.3;
};

slider3.onchange = () => {
    chorus.depth = slider3.value * 0.1;
};
slider4.onclick = () => {
    distortion.distortion = slider4.value * 0.3;
};

slider5.onclick = () => {
    phaser.frequency.value = slider5.value * 1.2;
};
slider6.onclick = () => {
    phaser.octaves = slider6.value * 1.2;
};
slider7.onclick = () => {
    phaser.baseFrequency = slider7.value * 1.5;
};
//multiply by 0.1 for JCReverb param
// const comb1 = new
// Tone.FeedbackCombFilter(0).toDestination();
// const comb2 = new Tone.FeedbackCombFilter(0).toDestination();
// const comb3 = new Tone.FeedbackCombFilter(0).toDestination();

players.connect(chorus);
players.connect(distortion);
players.connect(phaser);

document.getElementById("buttonA").addEventListener("click", () => {
    players.player("sample1").start();
});

document.getElementById("buttonB").addEventListener("click", () => {
    players.player("sample2").start();
});

document.getElementById("buttonC").addEventListener("click", () => {
    players.player("sample3").start();
});

//attach a click listener to a play button
document.querySelector("#onoff")?.addEventListener("click", async () => {
    await Tone.start();
    console.log("audio is ready");
});


window.onload = function(){
    freesound.setToken("Sa2fz69rAvDoTQ94BoizW82lEnz1nDqF9GlP2wrT");
}
let soundfile = document.getElementById('soundfile');
let searchInput = document.getElementById('searchTerm');

searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    console.log("submit");
    findSounds();
    event.preventDefault();
  }
})

function findSounds(searchWord) {
  if(!searchWord){
      searchWord = document.getElementById('searchTerm').value;
  }
  console.log("find: ", searchWord)

  freesound.textSearch(searchWord, {}, function(sounds){
      console.log(sounds)
      let soundID = sounds.results[0].id;
      getSound(soundID);
  })
}

function getSound(soundID){
  freesound.getSound(soundID, function(sound){
      console.log(sound);
      file = sound.previews['preview-lq-mp3'];
      console.log("file: ", file)
      soundfile.src = file;



      players.sample4 = `${file}`;
      console.log(file, players.sample4);

      const players2 = new Tone.Players({
        sample4: `${file}`
    });
    
    players2.connect(chorus);
    players2.connect(distortion);
    players2.connect(phaser);
    
    document.getElementById("buttonD").addEventListener("click", () => {
        players2.player("sample4").start();
    });
    

    
    //   players[sample1] = file;    
    //   document.getElementById("buttonA").addEventListener("click", () => {
    //     players.player("sample4").start();
    // });
   
  })
}