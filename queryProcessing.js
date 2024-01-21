//  Search On Youtube---------------

function searchOnYoutube(query) {
  let command = query.replace(/ on|search|youtube|YouTube|Youtube/gi, "");
  if (query.includes("open") || query.includes("Open")) {
    window.open("https://www.youtube.com/");
    return true;
  } else if (
    query.includes("search") ||
    query.includes("Search") ||
    query.includes("on youtube") ||
    query.includes("on Youtube") ||
    query.includes("on YouTube")
  ) {
    window.open(`https://www.youtube.com/results?search_query=${command}`);
    return true;
  }
}

//  Search On Google -----------

function searchOnGoogle(query) {
  let command = query.replace(/ on|search|google|Google/gi, "");
  if (query.includes("open") || query.includes("Open")) {
    window.open("https://www.google.com");
    return true;
  } else if (
    query.includes("search") ||
    query.includes("Search") ||
    query.includes("on Google") ||
    query.includes("on google")
  ) {
    window.open(`https://www.google.com/search?q=${command}`);
    return true;
  }
}

// Get Date Time Details -----------

function getDateTime(query) {
  let currentDate = new Date();
  let command = query;

  if (command.includes("date") || command.includes("Date")) {
    changeOutputTextArea(
      "Date is " +
        currentDate.getDate() +
        " " +
        currentDate.toLocaleString("default", { month: "long" }) +
        " " +
        currentDate.getFullYear()
    );

    return true;
  } else if (command.includes("month") || command.includes("Month")) {
    changeOutputTextArea(
      "Current month is " +
        currentDate.toLocaleString("default", { month: "long" })
    );

    return true;
  } else if (command.includes("year") || command.includes("Year")) {
    return true;
  } else if (command.includes("Day") || command.includes("day")) {
    changeOutputTextArea(
      "Today is " + currentDate.toLocaleString("default", { weekday: "long" })
    );

    return true;
  } else if (command.includes("time") || command.includes("Time")) {
    changeOutputTextArea(
      "Time is " + currentDate.getHours() + ":" + currentDate.getMinutes()
    );
    return true;
  }
}

// function to search on wikipedia--------

async function searchWikipedia(searchQuery) {
  let command = searchQuery.replace(
    / on|search|wikipedia|Wikipedia|wiki pedia/gi,
    ""
  );
  window.open("https://en.wikipedia.org/wiki/" + command);

  return true;
}

// function to get a joke --------

function getJokes() {
  fetch("https://jokeapi.dev/joke/Any")
    .then((response) => response.json())
    .then((data) => {
      let joke = data.setup + " " + data.delivery;
      if (joke != "undefined undefined") {
        changeOutputTextArea(joke);
      } else {
        const jokes = [
          "Why did the tomato turn red? Because it saw the salad dressing!",
          "Why don't scientists trust atoms? Because they make up everything!",
          "Why was the math book sad? Because it had too many problems.",
        ];
        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        changeOutputTextArea(randomJoke);
      }
    });
  return true;
}

// main execution function-------

function search(query) {
  // textareainput.value = "Input : " + query;

  let command = query.split(" ");

  // Search on google-----

  if (command.includes("google")) {
    let result = searchOnGoogle(query);
    if (result) {
      return;
    }
  }

  // Search On Youtube-------

  if (command.includes("youtube")) {
    let result = searchOnYoutube(query);
    if (result) {
      return;
    }
  }

  // Get Date Time Details ------

  if (
    (command.includes("date") ||
      command.includes("month") ||
      command.includes("year") ||
      command.includes("day") ||
      command.includes("time")) &&
    command.includes("what")
  ) {
    let result = getDateTime(query);
    if (result) {
      return;
    }
  }

  // wikipedia --------

  if (command.includes("wikipedia")) {
    let result = searchWikipedia(query);
    if (result) {
      return;
    }
  }

  //  to tell jokes ----

  if (command.includes("joke")) {
    let result = getJokes();
    if (result) {
      return;
    }
  }

  // opening websites -----

  if (command.includes("open")) {
    let search = query.replace("open", "");
    search = search.replace(" ", "");

    window.open(`https://www.${search}.com`);
    return;
  }

  if (command.includes("hello") || command.includes("hey")) {
    changeOutputTextArea("Greetings! How can I assist you today?");
    return;
  }
  if (
    (command.includes("how") || command.includes("are")) &&
    command.includes("you")
  ) {
    changeOutputTextArea(
      "As a machine model created in java script, I don't have feelings, but I'm here and ready to help you! How can I assist you today?"
    );

    return;
  }

  changeOutputTextArea(
    "Sorry to tell you that I am a keyword based extension, so please provide correct information"
  );
}
