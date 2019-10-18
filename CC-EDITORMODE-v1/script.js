document.getElementById("btn-answer").addEventListener("click", loadAnswer);
document.getElementById("btn-auto").addEventListener("click", buttonAuto);
document.getElementById("btn-edit").addEventListener("click", buttonEdit);

// Start program wiht btn-auto on
document.getElementById("btn-auto").click();

var storeHTML;
var storeJS;
var show = true;
var autoRun = false;
var edit = false;
var attempt = 0;

setTimeout(loadQuestion, 100);

// click btn-auto at start
document.getElementById("btn-auto").click();


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
    `
<!DOCTYPE html><html><body>
    <h2 id="idOutput">Output...</h2>
    <h2 id="idDone" onclick="myFunction()" style='color: red' >Waiting...</h2>
<script>
    
    document.getElementById("idOutput").innerHTML = x;  
    
    if (x === 6) {
      document.getElementById("idDone").style.color = "green"; 
      document.getElementById("idDone").innerHTML = 'Done!'; 
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
    fontSize: "10pt",
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
    `
function add() {
  
}

x = add(2,4);`,
    1
  ); //1 = moves cursor to end

  editor2.getSession().on("change", function () {
    update2();
  });

  editor2.focus();

  editor2.setOptions({
    fontSize: "10pt",
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
    document.getElementById("myTextarea").value = displayQuestion + displayAnswer;
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

function buttonEdit() {
  if (!edit) {
    document.getElementById("btn-edit").innerText = "OFF";
    document.getElementById("editor").style.width = "38%";
    edit = true;

  } else {
    document.getElementById("btn-edit").innerText = "Edit";
    document.getElementById("editor").style.width = "0";
    edit = false;
  }
}

setupEditor2();
update2();

// input QUESTION here
var displayQuestion =
  `
Function that takes two arguments and then returns a value adding them together:

add(2,4) result... '6'
`;

// input ANSWER here
var displayAnswer =
  `
// Solution      
function add(sum1,sum2) {
  return (sum1+sum2);
}
      
x = add(2,4);
`;