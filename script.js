// jquery listeners
$('#input').on('blur', function() {fillOutput()})
$('#weight').on('input', function() {fillOutput()})
$('#filename').on('input', function() {openFile()})
$('#save').on('click', function() {saveFile()})
$('#toggleui').on('click', function() {toggleStealth()})
// delegated event since output is dynamic
$(document).on('click', '.redacted', function() {$(this).toggleClass('show')})

loadStorage()
openFile()

// refresh the output text
function fillOutput() {
  $('#output').empty()
  var weight = $('#weight').val()
  var wordlist = parseText()
  var line = '<li>'
  for (var i = 0; i < wordlist.length; i++) {
    var word = wordlist[i]
    if (word == "\n") {$('#output').append(line+'</li>');line='<li>';}
    else {line+=redactWrap(word,weight)}
  }
  $('#output').append(line+'</li>')
}

// split input text into an array, separating the words, spaces, newlines, and punctuation
function parseText() {
  words = $('#input').val().match(/\'?\w+([-']\w+)*\'?|\n|\w+|\s+|[^\s\w]+|\n|/g)
  return words
}

// wrap valid words in span tags according to random weight selected
function redactWrap(word,weight) {
  if (!word.match(/[a-zA-Z]/)) {return word}
  else if (Math.floor(Math.random() * 100 + 1) > weight) {return word}
  else {return "<span class='redacted'>" + word + "</span>"}
}

// initialize localstorage variables on first run
function initStorage() {
  localStorage.setItem("files", JSON.stringify(['u_beatit']))
  localStorage.setItem("last_file", "u_beatit")
  localStorage.setItem("u_beatit", "They told him don't you ever come around here\nDon't wanna see your face, you better disappear\nThe fire's in their eyes and their words are really clear\nSo beat it, just beat it\n\nYou better run, you better do what you can\nDon't wanna see no blood, don't be a macho man\nYou wanna be tough, better do what you can\nSo beat it, but you wanna be bad\n\nJust beat it, beat it, beat it, beat it\nNo one wants to be defeated\nShowin' how funky, strong it's your fight\nIt doesn't matter who's wrong or right\n\nJust beat it, beat it, just beat it, beat it\nJust beat it, beat it, just beat it, beat it")
}

// refresh the file selection drop-down
function loadStorage() {
  if (localStorage.getItem("files") == null) {initStorage()}
  var files = JSON.parse(localStorage.getItem("files"))
  var selected = localStorage.getItem("last_file")
  $('#filename').empty()
  for (i=0; i<files.length; i++) {
    $('#filename').append("<option value='" + files[i] + "'>" + files[i].slice(2) + "</option>")
  }
  $('#filename').val(selected)
  return files
}

// write input text to localstorage
function saveFile() {
  var fileName = $('#filename').val()
  var saveName = $('#newfile').val()
  var saveContent = $('#input').val()
  var files = loadStorage()
  if (saveName=="" || saveName == null) {saveName=fileName.slice(2)}
  if (files.indexOf("u_"+saveName)<1) {
    files.push("u_" + saveName)
    localStorage.setItem("files", JSON.stringify(files))
    $('#filename').append("<option value='u_" + saveName + "'>" + saveName + "</option>")
  }
  $('#filename').val('u_'+saveName)
  localStorage.setItem("u_" + saveName, saveContent)
  localStorage.setItem("last_file", 'u_'+saveName)
}

// load selected file
function openFile() {
  var fileName = $('#filename').val()
  var fileContent = localStorage.getItem(fileName)
  localStorage.setItem("last_file", fileName)
  if (fileContent != "") {
    $('#input').val(fileContent)
    fillOutput()
  }
}

// toggle ui elements
function toggleStealth() {
  $('#instructions').toggleClass('hide')
  $('#input').toggleClass('hide')
  $('#filename').toggleClass('hide')
  $('#newfile').toggleClass('hide')
  $('#save').toggleClass('hide')
  $('#weight').toggleClass('hide')
}