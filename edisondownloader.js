// https://gist.github.com/danallison/3ec9d5314788b337b682
function downloadString(text, fileType, fileName) {
    var blob = new Blob([text], { type: fileType });
    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}
downloadString(document.getElementById("viewns_Z7_SHD09B1A084V90ITII3I3Q30P6_:form1:j_id_jsp_134298839_16").outerHTML, "text/csv", "timetable.txt");