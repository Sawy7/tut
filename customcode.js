var timecodes = [
    {
        "start": "7:15",
        "end": "8:00"
    },
    {
        "start": "8:00",
        "end": "8:45"
    },
    {
        "start": "9:00",
        "end": "9:45"
    },
    {
        "start": "9:45",
        "end": "10:30"
    },
    {
        "start": "10:45",
        "end": "11:30"
    },
    {
        "start": "11:30",
        "end": "12:15"
    },
    {
        "start": "12:30",
        "end": "13:15"
    },
    {
        "start": "13:15",
        "end": "14:00"
    },
    {
        "start": "14:15",
        "end": "15:00"
    },
    {
        "start": "15:00",
        "end": "15:45"
    },
    {
        "start": "16:00",
        "end": "16:45"
    },
    {
        "start": "16:45",
        "end": "17:30"
    },
    {
        "start": "17:45",
        "end": "18:30"
    },
    {
        "start": "18:30",
        "end": "19:15"
    }
]
console.log(timecodes);

fetch("./timetable.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonResponse) {
    for (let i = 0; i < jsonResponse.length; i++) {
        //console.log(jsonResponse[i]["name"]);
        var plotAlong = false;
        for (let j = 0; j < timecodes.length; j++) {
            //console.log(jsonResponse[i]["start"]);
            if (jsonResponse[i]["start"] == timecodes[j]["start"] || plotAlong) {
                document.getElementById(jsonResponse[i]["day"] + j).innerHTML = "YAS";
                document.getElementById(jsonResponse[i]["day"] + j).classList.add("table-info");
                plotAlong = true;
            }
            if (jsonResponse[i]["end"] == timecodes[j]["end"]) {
                break;
            }
        }
    }
  });

