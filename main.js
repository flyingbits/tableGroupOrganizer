

const tab_dir_element = document.getElementById("tab-dir");
const tab_info_dir_element = document.getElementById("tab-info-dir");


let current_active_tab;

function create_tab(name) {
    const new_tab_info = document.createElement("div");
    new_tab_info.classList.add("tab-info");
    tab_info_dir_element.appendChild(new_tab_info);

    const new_tab = document.createElement("span");
    new_tab.classList.add("tab");
    new_tab.textContent = name || `Week ${tab_dir_element.children.length}`;
    new_tab.reference = new_tab_info;
    new_tab.onclick = function () {
        current_active_tab.classList.remove("active");
        current_active_tab.reference.classList.remove("active");
        this.classList.add("active");
        this.reference.classList.add("active");
        current_active_tab = this;
    };
    return tab_dir_element.appendChild(new_tab);
}

let student_list_element;
let student_list = {};

function add_student() {
    if (document.getElementsByClassName("edit-student-name").length > 0) {
        console.log("FINISH UPDATING STUDENT INFORMATION FIRST");
        document.getElementsByClassName("edit-student-name").item(0).lastChild.focus();
        return;
    }
    const id = `student-name-input-${Object.keys(student_list).length}`;
    student_list_element.insertAdjacentHTML("beforeend", `
        <tr>
            <th style="width: 20%"><button onclick="modify_student(${id}, 'button')">...</button></th>
            <th style="width: 80%" id="${id}" class="edit-student-name"><p></p>
            <input type="text" placeholder="New Student Name" onchange="modify_student(this.parentElement.id, 'input')"></th>
        </tr>
    `);
    document.getElementById(id).children.item(1).focus();
}

function modify_student(input, type) {
    const element = document.getElementById(input);
    if (type === "button") {
        element.classList.add("edit-student-name");
        element.children.item(1).focus();
    } else {
        element.classList.remove("edit-student-name");
        element.firstChild.textContent = element.children.item(1).value;
        student_list[input] = element.children.item(1).value;
    }
}

let min_group_size = 0;
function set_group_size(input) {
    input.value = Math.round(input.value);
    if (input.value < parseInt(input.min)) {
        input.value = input.min;
    } else if (input.value > parseInt(input.max)) {
        input.value = input.max;
    }
    min_group_size = parseInt(input.value);
}


{
    // create Settings tab
    const settings_tab = create_tab("Config");
    settings_tab.classList.add("active");
    settings_tab.reference.classList.add("active");

    settings_tab.reference.innerHTML = `
        <label for="tab-count">How many weeks of class will there be this quarter?</label>
        <input type="number" id="tab-count" name="tab-count" min="1" max="99" value="10">
        <br>
        <label for="student-list-import">Import student file</label>
        <input type="file" id="student-list-import" name="student-list-import" accept=".txt">
        <br>
        <table id="student-list">
            <tr>
                <th style="width: 20%">Edit</th>
                <th style="width: 80%">Student</th>
            </tr>
        </table>
        <button onclick="add_student()">Add Student</button>
        <button onclick="save_student_list()">Save List</button>
        <br>
        <label for="min-group-size">What is the minimum group size?</label>
        <input type="number" id="min-group-size" name="min-group-size" min="1" max="99" onchange="set_group_size(this)">
        <br>
        <button onclick="create_groups()">Create Groups</button>
    `;

    student_list_element = document.getElementById("student-list")

    tab_dir_element.appendChild(settings_tab);

    current_active_tab = settings_tab;
}



let tab_count = 1;
const tab_count_element = document.getElementById("tab-count");

tab_count_element.onchange = function(ev) {
    // Check if new value meats parameters for input
    const new_value = Math.round(tab_count_element.value);
    if (new_value > parseInt(tab_count_element.max)) {
        tab_count_element.value = tab_count_element.max;
    } else if (new_value < parseInt(tab_count_element.min)) {
        tab_count_element.value = tab_count_element.min;
    }

    const new_tab_count = parseInt(tab_count_element.value) + 1;
    if (new_tab_count > tab_count) {
        while (tab_dir_element.children.length < new_tab_count) {
            create_tab();
        }
    } else if (new_tab_count < tab_count) {
        while (tab_dir_element.children.length > new_tab_count) {
            tab_dir_element.removeChild(tab_dir_element.lastChild);
        }
    }
    tab_count = tab_dir_element.children.length;
}
