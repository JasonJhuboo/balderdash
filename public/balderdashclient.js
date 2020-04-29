// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $.get("/answers", function(answers) {
    answers.forEach(function(answer) {
      $("<li></li>")
        .text(answer[0])
        .appendTo("ol#answers");
    });
  });

  $.get("/questions", function(questions) {
    questions.forEach(function(question) {
      $("<li></li>")
        .text(question[0] + ". " + question[1])
        .appendTo("ul#questionlist");
    });
  });

  $("form").submit(function(event) {
    event.preventDefault();
    var name = $("input#name").val();
    var answer = $("input#answer").val();
    $.post("/answers?" + $.param({ name: name, answer: answer }), function() {
      $("<li></li>")
        .text(answer)
        .appendTo("ol#answers");
      $("input#name").val("");
      $("input#answer").val("");
      $("input").focus();
    });
  });
  
  var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
});
