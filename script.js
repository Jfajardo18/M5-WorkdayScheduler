
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

  $(".container-lg").on("click", ".saveBtn", function () {
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