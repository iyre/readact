$('#input').on('blur', function() {fillOutput()})
$('#weight').on('input', function() {fillOutput()})

fillOutput()

function fillOutput() {
  $('#output').empty()
  var weight = $('#weight').val()
  var wordlist = parseText()
  for (var i = 0; i < wordlist.length; i++) {
    var word = wordlist[i]
    $('#output').append(redactWrap(word,weight))
  }
}

function parseText() {
  words = $('#input').val().match(/\'?\w+([-']\w+)*\'?|\n|\w+|\s+|[^\s\w]+|\n|/g)
  return words
}

function redactWrap(word,weight) {
  if (word == "\n") {return "<br>"}
  else if (!word.match(/[a-zA-Z]/)) {return word}
  else if (Math.floor(Math.random() * 100 + 1) > weight) {return word}
  else {return "<a class='redacted'>" + word + "</a>"}
}
