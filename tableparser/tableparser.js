var HTMLParser = require('node-html-parser');
var fs = require("fs");
const { time } = require('console');

var data = fs.readFileSync("../myTimetables/timetable.txt", "utf-8");
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
        console.log(abbr);
    });
    return courseArray;
}

function getCourseTimes(parsed)
{
    weekArray = []
    for (let i = 2; i < 6*2; i+=2) {
        workingDayArray = [[],[]]
        workingDayArray[0].push(parsed.querySelector("tbody").childNodes[i].childNodes[0].childNodes[0].innerHTML)
    

        var courseTDTags = parsed.querySelector("tbody").childNodes[i].childNodes;
        courseTDTags.shift();
        var colSum = 0;
        courseTDTags.forEach(tag => {
            var colspan = tag.getAttribute("colspan");
            if (colspan != undefined) {
                colSum += parseInt(colspan);
                var courseAbbr = tag;

                for (let j = 0; j < 5; j++) {
                    courseAbbr = courseAbbr.childNodes[0];
                }
                var courseTitle = courseAbbr.getAttribute("title");
                courseAbbr = courseAbbr.innerHTML;

                var courseTeacher = tag;

                for (let j = 0; j < 2; j++) {
                    courseTeacher = courseTeacher.childNodes[0];
                }
                var courseRoom = courseTeacher.childNodes[2].childNodes[0].innerHTML;
                courseTeacher = courseTeacher.childNodes[1].childNodes[0].childNodes[0].getAttribute("title");
                
                var courseMultiArray = [courseAbbr, courseTitle, courseRoom, courseTeacher];

                for (let j = 0; j < colspan; j++) {
                    workingDayArray[1].push(courseMultiArray);               
                }
            }
            else {
                colSum += 1;
                workingDayArray[1].push("[Free]");
            }
        });
        weekArray.push(workingDayArray);
    }
    return weekArray;
}

function addTimesToWeekArray(timesArray, weekArray)
{
    for (let i = 0; i < weekArray.length; i++) {
        for (let j = 0; j < timesArray.length; j++) {
            if (weekArray[i][1][j] != "[Free]") {
                weekArray[i][1][j].push(timesArray[j]);
                console.log(weekArray[i][1][j][1] + " => " + timesArray[j])
            }
        }
        console.log("==================");
        for (let j = 0; j < timesArray.length; j++) {
            if (weekArray[i][1][j] != "[Free]") {
                // remove duplicates
            }
        }
    }
    return weekArray;
}

// console.log(getTimes(parsed));
// console.log(getCourses(parsed));

// console.log(parsed.querySelectorAll("abbr")[0].parentNode.parentNode.parentNode.parentNode.parentNode);
// console.log(parsed.querySelectorAll("abbr")[0].parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("colspan"));



var timesArray = getTimes(parsed);
var weekArray = getCourseTimes(parsed);
weekArray = addTimesToWeekArray(timesArray, weekArray);

console.table(weekArray[0][1]);


//console.log(parsed.querySelectorAll("abbr")[0].innerHTML);