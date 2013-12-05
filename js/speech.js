/*
   @Vignesh Shanmugam
   @_vigenshh - twitterId 
 */
var startBtn = document.getElementById('startBtn');
startBtn.onclick = function(){
  recognition.start();
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = function(event) {
  var results = event.results;

  var interimTranscript = '';
  for (var i = event.resultIndex; i != results.length; ++i) {
    var result = results[i];
    
    if (result.isFinal) {
      showInfo('Final transcript: ' + results[0][0].transcript);
      recognition.stop();
      return;
    } else {
      interimTranscript += result[0].transcript;
    }
  }
  showInfo('Interim transcript: ' + interimTranscript);
}

recognition.onend = function(event) {
  showInfo('Speech Capture is stopped');
}
recognition.onerror = function(event) {
  showInfo('Error Occured: ' + event.error);
}


var results = document.getElementById('result');

function showInfo(message){
  results.innerHTML = message + '<br><br>' + results.innerHTML;
}

