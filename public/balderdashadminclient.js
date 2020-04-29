// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $.get("/adminanswers", function(answers) {
    answers.forEach(function(answer) {
      $("<li></li>")
        .text(answer[0] + " " + answer[1])
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
    var number = $("input#number").val();
    var question = $("input#question").val();
    $.post(
      "/questions?" + $.param({ number: number, question: question }),
      function() {
        $("<li></li>")
          .text(number + ". " + question)
          .appendTo("ul#questionlist");
        $("input#number").val("");
        $("input#answer").val("");
        $("input").focus();
      }
    );
  });
});
