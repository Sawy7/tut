var HTMLParser = require('node-html-parser');
var fs = require("fs");

var data = fs.readFileSync("timetable.txt", "utf-8");
var parsed = HTMLParser.parse(data);

function getTimes(parsed)
{
    timesArray = [];
    parsed.querySelector("tr").childNodes.forEach(tag => {
        var insideTag = tag.innerHTML;
        if (insideTag != "") {
            time_start = insideTag.split("<")[0];
            time_end = insideTag.split(">")[1];
            timesArray.push([time_start, time_end]);
        }
    });
    return timesArray;
}

function getCourses(parsed)
{
    courseArray = []
    parsed.querySelectorAll("abbr").forEach(abbr => {
        courseArray.push([abbr.innerHTML, abbr.getAttribute("title")])
        //console.log(abbr.getAttribute("title"));
    });
    return courseArray;
}

console.log(getTimes(parsed));
console.log(getCourses(parsed));


//console.log(parsed.querySelectorAll("abbr")[0].innerHTML);