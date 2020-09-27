// ==UserScript==
// @name         Alfred motion detector
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Takes a snapshot of Alfred security camera and sends it to localhost server, to check for motion
// @author       João Simões
// @match        https://alfred.camera/webapp/viewer/device/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


var name = window.prompt("Enter camera name: ");

function getSnapshot(videoplayer){

  return videoplayer.toDataURL('image/jpeg', 0.8).split("base64,")[1];

}

function sendSnapshot(){
    var videoplayer = document.getElementsByClassName("jss96")[0];//gets reference to videoplayer
    alert(videoplayer);
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "http://127.0.0.1:5000/update";
    var cameraID = (window.location.href).split("/")[6]

    setInterval(function(){
       var base64_string = getSnapshot(videoplayer);
       xmlhttp.open("POST", theUrl);
       xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
       xmlhttp.send(JSON.stringify({ "_id": cameraID,
                                     "name": name,
                                     "base64_string": base64_string }));
   }, 400)
}

window.onload = function(){
  setTimeout(function(){

      sendSnapshot();
    }, 10000);
};
