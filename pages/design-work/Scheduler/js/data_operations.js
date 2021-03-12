/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//array to store all ids
var ids = [
    'name', 'date',
    'first-fall',
    'first-spring',
    'first-summer',
    'second-fall',
    'second-spring',
    'second-summer',
    'third-fall',
    'third-spring',
    'third-summer',
    'fourth-fall',
    'fourth-spring',
    'fourth-summer',
    'corea', 'coreb', 'capstone', 'spec', 'gedu'];
 
//javascript function to store data in local storage
function saveplan() {
    for (var i = 0; i < ids.length; i++) {
        ele = document.getElementById(ids[i]);
        if (ele.tagName == "INPUT") {
            localStorage.setItem(ids[i], ele.value);
        } else if (ele.tagName == "DIV") {
            localStorage.setItem(ids[i], ele.innerHTML);
        }
    }
    alert("Your Plan of Study has been saved.");
}
 
//reset data
function resetplan() {
    var c = confirm("Are you sure you wanted to reset the plan?");
    if (c == true) {
        for (var i = 0; i < ids.length; i++) {
            localStorage.setItem(ids[i], '');
            ele = document.getElementById(ids[i]);
            if (ele.tagName == "INPUT") {
                ele.value = '';
            }
        }
        location.reload();
    }
}
 
//load saved data
window.onload = function () {
    for (var i = 0; i < ids.length; i++) {
        if (typeof (localStorage.getItem(ids[i])) != "undefined" && localStorage.getItem(ids[i]) != '') {
            ele = document.getElementById(ids[i]);
            if (ele.tagName == "INPUT") {
                ele.value = localStorage.getItem(ids[i]);
            } else if (ele.tagName == "DIV") {
                ele.innerHTML = localStorage.getItem(ids[i]);
            }
        }
    }
}
 
//print plan
function printplan() {
    window.print();
}


//This function adds a course
var count = 1;
 
function addCourse(event) {
    count = count + 1;
 
    //get the course group id
    var group = event.target.parentNode.id;   //get the container
    var group_id = group.replace("-header", "");
 
    var id = group_id + "-" + count;     //id of the new div
 
    //create a new div node
    var div = document.createElement('div');
    document.getElementById(group_id).appendChild(div);
    div.outerHTML = '<div class="course" id="' + id + '" draggable="true" ondragstart="drag(event)"><input type="text" class="' + group_id + '-header" placeholder="Course title"><textarea placeholder="Type course name" maxlength="45"></textarea></div>';
}