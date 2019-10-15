

document.getElementById("btn-answer").addEventListener("click", loadAnswer);
document.getElementById("btn-auto").addEventListener("click", buttonAuto);

var storeHTML;
var storeJS;
var show = true;
var autoRun = false;
var attempt = 0;

setTimeout(loadQuestion, 100);


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
        <h2 id="idDone" onclick="myFunction()" style='color: red' >Waiting ...</h2>
    <script>
        
        document.getElementById("idOutput").innerHTML = x;  
        
        if (x === 'abcabcabc') {
          document.body.style.backgroundColor = "#FFFF64";
          document.getElementById("idDone").style.color = "green"; 
          document.getElementById("idDone").innerHTML = '&#128504; Done!!!'; 
        } else {
          document.body.style.backgroundColor = "white";
        }
    </script></body></html>
    `,
    1
  ); //1 = moves cursor to end

  editor.getSession().on("change", function () {
    update();
  });

  editor.focus();

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

setupEditor();
update();

//==================================================

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
    idoc2.write(editor2.getValue());  // original (need 'RUN' button)
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
    function repeatStringNumTimes(str, num) {
      // repeat after me
      return str;
    }
    
    x = repeatStringNumTimes("abc", 3);
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
    show = false;
  } else {
    document.getElementById("btn-answer").innerText = "Show Answer";
    document.getElementById("myTextarea").style.color = "green";
    document.getElementById("myTextarea").value = displayQuestion;
    show = true;
  }

}

function buttonAuto() {

  if (!autoRun) {
    document.getElementById("btn-auto").innerText = "Auto: off";
    document.getElementById("run_button").setAttribute("disabled", "false");
    document.getElementById("run_button").style.cursor = "not-allowed";
    autoRun = true;

  } else {
    document.getElementById("btn-auto").innerText = "Auto: on";
    document.getElementById("run_button").removeAttribute("disabled");
    document.getElementById("run_button").style.cursor = "pointer";
    autoRun = false;
  }
}

setupEditor2();
update2();

// === input QUESTION here ===
var displayQuestion =
  `
Repeat a given string str(first argument) for numtimes (second argument). Return an empty string if numis not a positive number.

repeatStringNumTimes("abc", 3) should return "abcabcabc".
`;

// === input ANSWER here ===
var displayAnswer =
  `
function repeatStringNumTimes(str, num) {
  var accumulatedStr = '';

  while (num > 0) {
    accumulatedStr += str;
    num--;
  }
  return accumulatedStr;
}

repeatStringNumTimes("abc", 3);

// solution 2
var result = "";
if(num < 0) return "";
for (var i = 0; i < num; i++) {
  result += str;
}
return result;

// solution 3
if(num < 0) return "";
if(num === 1) return str; // base case
return str + repeatStringNumTimes(str, num -1);
`;