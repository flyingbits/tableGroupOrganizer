
function load_student_list() {
    fs.readdir("./student_lists", function(err, dir) {
        console.log(dir);
    });
}

load_student_list();

function create_new_file() {

}

function save_student_list() {

}