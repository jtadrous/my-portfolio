//This function gets called when a course is being dragged.
//It transfers the id of the course.

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    console.log(ev.target.id);
}

//This function allows a drop.
function allowDrop(ev) {
    ev.preventDefault();
}

//
function drop(ev) {
    ev.preventDefault();  //prevent default handling of the data on drop; default is open as link on drop.
    var id = ev.dataTransfer.getData("text");  //get the id of the dropped course
    var target = ev.target;  //get the container in which the course is dropped.
    var className = target.className;

    //if the drop element is not a semester or a course group, set its parent as the drop element
    while (className != 'semester' && className != 'course-group') {
        target = target.parentNode;
        if (!target)
            return;
    }

    //determine the correct course group the dropped course belongs to
    if (className == 'course-group') {
        target_id = id.split("-")[0];
        target = document.getElementById(target_id);
    }

    //drop the course and append at the end
    target.appendChild(document.getElementById(id));
}

