// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  function updateTimeBlocks() {
    const currentHour = dayjs().hour();

    $(".time-block").each(function () {
      const blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  $(".saveBtn").on("click", function () {
    const textArea = $(this).siblings(".description");
    const hourId = $(this).parent().attr("id");
    const userInput = textArea.val();
    localStorage.setItem(hourId, userInput);
  });

  function setSavedUserInput() {
    $(".time-block").each(function () {
      const hourId = $(this).attr("id");
      const userInput = localStorage.getItem(hourId);
      $(this).children(".description").val(userInput);
    });
  }

  function displayCurrentDate() {
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  displayCurrentDate();

  function createTimeBlock(hour) {
    const timeBlock = `
    <div id="hour-${hour}" class="row time-block">
    <div class="col-2 col-md-1 hour text-center py-3">${hour}AM</div>
    <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;
    return timeBlock;
  }

  function generateTimeBlocks() {
    const container = $(".container-lg");
    for (let hour = 9; hour <=17; hour++) {
      container.append(createTimeBlock(hour));
    }
  }
  generateTimeBlocks();
  updateTimeBlocks();
  setSavedUserInput();

  setInterval(function () {
    updateTimeBlocks();
  }, 6000);
});

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.