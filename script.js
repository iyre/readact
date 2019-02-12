$('#input').on('blur', function(){fillOutput()});
$('#weight').on('input', function(){fillOutput()});

function fillOutput() {
  $('#output').empty()
  var weight = $('#weight').val()
  var wordlist = parseText()
  for (var i = 0; i < wordlist.length; i++) {
    var word = wordlist[i]
    if (word == "\n") {word="<br>"}
    else if (word.length > 1) {word=redactWrap(word,weight)}
    $('#output').append(word)
  }
}

function parseText() {
  words = $('#input').val().match(/\'?\w+([-']\w+)*\'?|\n|\w+|\s+|[^\s\w]+|\n|/g)
  return words
}

function redactWrap(word,weight) {
  if (Math.floor(Math.random()*100+1) > weight) {return word}
  return "<a class='redacted'>" + word + "</a>"
}
fillOutput()