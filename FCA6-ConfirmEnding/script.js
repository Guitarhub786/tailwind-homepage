

document.getElementById("btn-answer").addEventListener("click", loadAnswer);
document.getElementById("btn-auto").addEventListener("click", buttonAuto);

var storeHTML;
var storeJS;
var show = true;
var autoRun = false;
var attempt = 0;

setTimeout(loadQuestion, 100);

// click btn-auto at start
document.getElementById("btn-auto").click();
document.getElementById("run_button").style.color = "#999";


run_button.addEventListener("click", function () {
  attempt++;
  storeHTML = editor.getValue();
  storeJS = editor2.getValue();
  storeMix =
    "Attempt: " + attempt +
    "<script>" +
    storeJS +
    "</script>" +
    storeHTML;
  // console.log(storeHTML);
  // console.log(storeJS);
  var jsDoc2 = document.getElementById("iframe2").contentWindow.document;

  jsDoc2.open();
  jsDoc2.write(storeMix);
  // console.log(storeMix);
  jsDoc2.close();
});

//============== ACE EDITOR ==============
// ACE 1
function update() {

  var idoc = document.getElementById("iframe").contentWindow.document;

  idoc.open();
  idoc.write(editor.getValue());
  idoc.close();
}

function setupEditor() {
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  editor.getSession().setTabSize(2);
  editor.getSession().setUseWrapMode(true);
  editor.setValue(
    // === SET x = result HERE ===
    `
    <!DOCTYPE html><html><body>
        <h2 id="idOutput">Output...</h2>
        <h2 id="idDone" onclick="myFunction()" style='color: crimson' >Waiting ...</h2>
    <script>
        
        document.getElementById("idOutput").innerHTML = x;  
        
        if (x === true) {
          document.body.style.backgroundColor = "#FFFF66";
          document.getElementById("idDone").style.color = "green"; 
          document.getElementById("idDone").innerHTML = '&#128504; Done!!!'; 
        } else {
          document.body.style.backgroundColor = "#282828"; 
          document.body.style.color = "darkturquoise";
        }
    </script></body></html>
    `,
    1
  ); //1 = moves cursor to end

  editor.getSession().on("change", function () {
    update();
  });

  // editor.focus();

  editor.setOptions({
    fontSize: "12pt",
    showLineNumbers: false,
    showGutter: false,
    vScrollBarAlwaysVisible: true,
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false
  });

  editor.setShowPrintMargin(false);
  editor.setBehavioursEnabled(false);
}

//==================================================
// ACE 2

function update2() {

  if (autoRun) {

    storeHTML = editor.getValue();
    storeJS = editor2.getValue();
    storeMix =
      "<script>" +
      storeJS +
      "</script>" +
      storeHTML;

    var idoc2 = document.getElementById("iframe2").contentWindow.document;

    idoc2.open();
    // idoc2.write(editor2.getValue());  // original (need 'RUN' button)
    idoc2.write(storeMix);            // updates live
    idoc2.close();
  }

}

function setupEditor2() {
  loadQuestion();

  window.editor2 = ace.edit("editor2");
  editor2.setTheme("ace/theme/monokai");
  editor2.getSession().setMode("ace/mode/javascript");
  editor2.getSession().setTabSize(2);
  editor2.getSession().setUseWrapMode(true);
  editor2.setValue(
    // === SET TEMPLATE HERE ===
    `
  function confirmEnding(str, target) {
    return str;
  }
  
  x = confirmEnding("Abstraction", "action");
`,
    1
  ); //1 = moves cursor to end

  editor2.getSession().on("change", function () {
    update2();
  });

  editor2.focus();

  editor2.setOptions({
    fontSize: "12pt",
    showLineNumbers: true,
    showGutter: true,
    vScrollBarAlwaysVisible: true,
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false
  });

  editor2.setShowPrintMargin(false);
  editor2.setBehavioursEnabled(false);
}

//==================================================
// ACE 3

function setupEditor3() {
  window.editor3 = ace.edit("editor3");
  editor3.setTheme("ace/theme/monokai");
  // editor3.getSession().setMode("ace/mode/javascript");
  editor3.getSession().setTabSize(0);
  editor3.getSession().setUseWrapMode(true);

  document.getElementById('editor3').style.fontSize = '16px';
  document.getElementById('editor3').style.color = 'cyan';
  editor3.setValue(
    // === SET x = result HERE ===
    `
Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.

For the purpose of this exercise, you should also capitalize connecting words like "the" and "of".

titleCase("No need to SHOUT!") should return "No Need To Shout!"
`,
    1
  ); //1 = moves cursor to end

  editor3.getSession().on("change", function () {
    update();
  });

  // editor3.focus();

  editor3.setOptions({
    fontSize: "12pt",
    showLineNumbers: false,
    showGutter: false,
    vScrollBarAlwaysVisible: true,
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false
  });

  editor3.setShowPrintMargin(false);
  editor3.setBehavioursEnabled(false);
  editor3.setReadOnly(true);
}

//==================================================
// Load Questions and Answers

function loadQuestion() {
  document.getElementById("myTextarea").style.color = "green";
  document.getElementById("myTextarea").value = displayQuestion;

}

function loadAnswer() {

  if (show) {
    document.getElementById("btn-answer").innerText = "Hide Answer";
    document.getElementById("myTextarea").style.color = "blue";
    document.getElementById("myTextarea").value = displayAnswer;
    // .value = displayQuestion + displayAnswer;

    // hide myTextarea and to only show ACE answer
    document.getElementById("myTextarea").style.display = "none";
    document.getElementById('editor3').style.width = '33.7%';

    // document.getElementById('editor3').style.fontSize = '15px';
    document.getElementById('editor3').style.color = '#DCDCDC';
    // // editor3.getSession().setUseWrapMode(true);

    window.editor3 = ace.edit("editor3");
    editor3.setTheme("ace/theme/monokai");
    editor3.getSession().setMode("ace/mode/javascript");
    editor3.getSession().setTabSize(0);
    editor3.getSession().setUseWrapMode(true);

    editor3.setValue(displayAnswer);
    editor3.insert(displayAnswer);

    show = false;
  } else {
    document.getElementById("btn-answer").innerText = "Show Answer";
    document.getElementById("myTextarea").style.color = "green";
    document.getElementById("myTextarea").value = displayQuestion;

    // show myTextarea and to only hide ACE answer
    document.getElementById("myTextarea").style.display = "";
    document.getElementById('editor3').style.width = '0%';

    document.getElementById('editor3').style.fontSize = '16px';
    document.getElementById('editor3').style.color = 'cyan';
    editor3.getSession().setMode();
    editor3.setValue(displayQuestion);
    editor3.insert(displayQuestion);

    show = true;
  }

}

function buttonAuto() {

  if (!autoRun) {
    document.getElementById("btn-auto").innerText = "Auto: off";
    document.getElementById("run_button").setAttribute("disabled", "false");
    document.getElementById("run_button").style.cursor = "not-allowed";
    document.getElementById("run_button").style.color = "#999";
    autoRun = true;

  } else {
    document.getElementById("btn-auto").innerText = "Auto: on";
    document.getElementById("run_button").removeAttribute("disabled");
    document.getElementById("run_button").style.cursor = "pointer";
    document.getElementById("run_button").style.color = "#DCDCDC";
    autoRun = false;
  }
}

//==================================================
// Run Functions 
setupEditor();
update();
setupEditor2();
update2();
setupEditor3();


// === input QUESTION here ===
var displayQuestion =
  `
Check if a string (first argument, str) ends with the given target string (second argument, target).

This challenge can be solved with the .endsWith()method, But we would like you to use one of the JavaScript substring methods instead.

confirmEnding("Abstraction", "action") should return true.
`;

// === input ANSWER here ===
var displayAnswer =
  `
function confirmEnding(str, target) {
  return str.substr(-target.length) === target;
}

confirmEnding("Abstraction", "action");


// solution 2
if (str.endsWith(target)) {
  return true;
}
return false;

return str.endsWith(target);


// solution 3
if (str.substr(-target.length) === target) {
  return true;
}
return false;
`;