var synth = window.speechSynthesis;

var textForm = document.querySelector('form');
var textInput = document.querySelector('#textInput');
var voiceSelect = document.querySelector('#voiceSelect');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('#rateValue');
var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('#pitchValue');
var body = document.querySelector('body');


var voices = [];

function getVoices(argument) {
  voices = synth.getVoices();
  console.log(voices);

  voices.forEach(function(voice) {
    var option = document.createElement('option');
    option.textContent = voice.name + '(' + voice.lang + ')';
    option.setAttribute('data-name', voice.name);
    option.setAttribute('data-lang', voice.lang);

    voiceSelect.append(option);
  })
}

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//

function speak(argument) {
  if (synth.speaking) {
    console.error('Already Speaking.');
    return;
  } else if (textInput.value === '') {
    alert('please write a text.')
  } else if (textInput.value !== '') {
    var speakText = new SpeechSynthesisUtterance(textInput.value);
    speakText.onend = function(argument) {
      console.log('done speaking...')
    }
    speakText.onerror = function(argument) {
      console.error('something went wrong.')
    }

    var selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    voices.forEach(function(voice) {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText)

  }

}

textForm.addEventListener('submit', function(e) {
  e.preventDefault();
  speak();
  textInput.blur();
})
rate.addEventListener('change', function(argument) {
  rateValue.textContent = rate.value;
})

pitch.addEventListener('change', function(argument) {
  pitchValue.textContent = pitch.value
})