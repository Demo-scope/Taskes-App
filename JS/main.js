// بسم الله الرحمن الرحيم 
// Start Project





let input = document.querySelector(".taskes-App .form .text")
let submit = document.querySelector(".taskes-App .form .submit")
let taskesContaner = document.querySelector(".taskes-App .tasks")

let ArrayOfTaskes = []


if (localStorage.getItem("Taskes")) {
    ArrayOfTaskes = JSON.parse(localStorage.getItem("Taskes"))
}
getDataFromLockalStorage()


//add task
submit.onclick = function() {
    if (input.value !== "") {
        addTaskToArray(input.value)
        input.value = "";
        input.focus()
    }
}


taskesContaner.addEventListener("click", function(ele) {
    if (ele.target.classList.contains("del")) {
        // remove taske from local Storage
        Delete(ele.target.parentElement.getAttribute("data-id"))
        // remove task from taskes contaner
        ele.target.parentElement.remove();
    }

    if (ele.target.classList.contains("task")){
        ele.target.classList.toggle("done")
        toggleStatiusCompleted(ele.target.getAttribute("data-id"))
    }
})


function addTaskToArray(taskText){
    const task = {
        ID : Date.now(),
        title: taskText,
        completed: false,
    }
    ArrayOfTaskes.push(task)

    addElementsToPage(ArrayOfTaskes)

    addDatatoLockalStorage(ArrayOfTaskes)
}


function addElementsToPage(Array) {
    taskesContaner.innerHTML = ""

    Array.forEach(task => {
        let div = document.createElement("div")
        div.classList.add("task")
        if (task.completed) {
            div.classList.add("done")
        } 
        div.setAttribute("data-id", task.ID)
        div.appendChild(document.createTextNode(task.title))

        let span = document.createElement("span")
        span.classList.add("del")
        span.appendChild(document.createTextNode("Delete"))

        div.appendChild(span)
        taskesContaner.appendChild(div)

    });
}

function addDatatoLockalStorage(array) {
    window.localStorage.setItem("Taskes", JSON.stringify(array))
}

function getDataFromLockalStorage(){
    let data = window.localStorage.getItem("Taskes")
    if (data) {
        let taskes = JSON.parse(data)
        addElementsToPage(taskes)
    }
}

function Delete(taskId) {
    ArrayOfTaskes = ArrayOfTaskes.filter((Obj) =>`${Obj.ID}` !== `${taskId}`)
    addDatatoLockalStorage(ArrayOfTaskes)
}

function toggleStatiusCompleted(taskId) {
    for(let i = 0; i < ArrayOfTaskes.length; i++) {
        if (ArrayOfTaskes[i].ID === parseInt(taskId)) {
            ArrayOfTaskes[i].completed == false ? ArrayOfTaskes[i].completed = true : ArrayOfTaskes[i].completed = false
        }
    }
    addDatatoLockalStorage(ArrayOfTaskes)
}