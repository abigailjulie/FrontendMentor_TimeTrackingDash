const dailyBtn = document.getElementById("dailyBtn");
const weeklyBtn = document.getElementById("weeklyBtn");
const monthlyBtn = document.getElementById("monthlyBtn");

// Fetch and populate
async function populate() {
  const requestData = "./data.json";
  // Fetch Data
  try {
    const response = await fetch(requestData);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const activityInfo = await response.json();

    // Initially populate with daily data
    populateTimeframe(activityInfo, "daily");

    // Repopulate data based on timeframe clicked
    dailyBtn.addEventListener("click", () => {
      populateTimeframe(activityInfo, "daily");
    });

    weeklyBtn.addEventListener("click", () => {
      populateTimeframe(activityInfo, "weekly");
    });

    monthlyBtn.addEventListener("click", () => {
      populateTimeframe(activityInfo, "monthly");
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. Please try again later.");
  }
}

// Populate the timeframe data into the page
function populateTimeframe(activityInfo, timeframe) {
  activityInfo.forEach((activity) => {
    // Create a variable that matches the actual data in the json file
    const currentHrs = activity.timeframes[timeframe].current;
    const prevHrs = activity.timeframes[timeframe].previous;

    // Get the elements to update based on the activity title
    const activityElement = document.querySelector(
      `[data-type="${activity.title.toLowerCase()}"].hours`
    );
    const prevElement = document.querySelector(
      `[data-type="${activity.title.toLowerCase()}"].previous`
    );

    // This is wha actually updates the data
    if (activityElement && prevElement) {
      activityElement.textContent = `${currentHrs}hrs`;
      prevElement.textContent = `Previous - ${prevHrs}hrs`;
    }
  });
}

// calls the function when page loads
populate();
