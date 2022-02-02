let currentTime = moment();
let currentHour = moment().format('h');
    currentHour = parseInt(currentHour);
const taskBox = $("textarea");

let hour = $('.hour');

let startOfDay = moment().startOf('day');

let currentDay = document.getElementById('currentDay');
$(currentDay).text(currentTime.format("dddd, MMMM Do"));


function timeAudit() {
    // add persistance to each slot
    for (let i = 9; i <= 17; i++) {
        // retrievedata from local storage for each slot 
        $(`#${i}`).siblings('.description').val(localStorage.getItem(`${i}`));

        // offset index by 9 and store in variable
        let textIndex = taskBox[i - 9];

        // current hour is greater than current index 
        if (currentHour > i){
            // addclass to textarea
            textIndex.classList.add("past");
        }
        // current hour is equal to index
        else if (currentHour === i) {
            //add class to text area
            textIndex.classList.add('present')
        }
        // if any other condition, add class to text area 
        else {
            textIndex.classList.add('future')
        }
    }
}
 
$(".saveBtn").on("click",function() {
    // gets the id from the button that was cliked through the use of "this"
    const time = $(this).attr('id');
    // gets the value of the text area which is a sibling to the button b/c its in the same div
    const value = $(this).siblings('.description').val();
    // stored the key value pair in to local storag
    localStorage.setItem(time, value)
});

// audit time automatically every 30 mins
setInterval(function() {
    $(".time-block .description").each(function(index, el){
      timeAudit(el);
    })
  }, (1000 * 60) * 30);

timeAudit();

