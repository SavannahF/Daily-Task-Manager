tasks = [];

//load tasks
var loadTasks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = {};
  }
  printTasks(tasks);
};

var printTasks = function () {
  $.each(tasks, function (list, arr) {
    var taskP = $("<p>")
      .addClass("description task-item-" + list)
      .text(arr);

    // console.log(list)
    // console.log(taskP);

    $("#task-item-" + list).replaceWith(taskP);
  });
};

var Today = moment().format("MMMM D, YYYY");
$("#currentDay").text(Today);

//color code hours bins
var hourAudit = function () {
  var currentHour = moment().hour();

  for (var i = 8; i < 18; i++) {
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

//Task update with click
$(".taskBin").on("click", "p", function () {
  // console.log("<p> was clicked");
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass("form-control").val(text);

  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

//Task needs to be updated
$(".taskBin").on("blur", "textarea", function () {
  //get the textareas; current value/text
  var text = $(this).val().trim();
  // console.log(text)

  //recreate p element
  var taskP = $("<p>").addClass("taskItem").text(text);

  // replace textarea with p element
  $(this).replaceWith(taskP);
});

//Save tasks
$(".saveBtn").on("click", function () {
  //   console.log("<save button> was clicked");
  var index = $(".saveBtn").index(this);
  //   console.log(index)
  tasks[index] = $(this).parent().find(".taskItem").text();
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

setInterval(function () {
  hourAudit();
}, 1000 * 60 * 60);

loadTasks();
hourAudit();
