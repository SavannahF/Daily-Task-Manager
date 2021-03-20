/*JS work on hourly divs to save user input locally,
change color of each to reflect past, present or future hour block*/

tasks = [];

//Load tasks
var loadTasks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = {};
  }
  printTasks(tasks);
};

//Print tasks
var printTasks = function () {
  $.each(tasks, function (list, arr) {
    var taskP = $("<p>")
      .addClass("description task-item-" + list)
      .text(arr);

    $("#task-item-" + list).replaceWith(taskP);
  });
};

// moment for today's date, use to compare ppp
var today = moment().format("MMMM D, YYYY");
$("#currentDay").text(today);

//compare moment to past, present, or future
var changeHour = function () {
  var currentHour = moment().hour();

  for (var i = 8; i < 19; i++) {
    var taskArea = $("#task-" + i);
    if (currentHour > i) {
      $(taskArea).addClass("past");
    } else if (currentHour === i) {
      $(taskArea).addClass("present");
    } else {
      $(taskArea).addClass("future");
    }
  }
};

setInterval(function () {
  changeHour();
}, 1000 * 60 * 60);

loadTasks();
changeHour();

//Update p on click
$(".taskBin").on("click", "p", function () {
  // console.log("<p> element clicked");
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass("form-control").val(text);

  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

//Task needs to be updated
$(".taskBin").on("blur", "textarea", function () {
  //get the text areas; current value/text
  var text = $(this).val().trim();
  // console.log(text)

  //recreate p element
  var taskP = $("<p>").addClass("taskItem").text(text);

  // replace textarea with p element
  $(this).replaceWith(taskP);
});

// Save button click to...
$(".saveBtn").on("click", function () {
  // console.log("saveBtn clicked");

  //Save tasks in local storage
  var index = $(".saveBtn").index(this);
  tasks[index] = $(this).parent().find(".taskItem").text();
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
