
const weeks = [];
let students;
let group_combinations;

function create_groups() {
    students = Object.values(student_list);
    create_group_combinations();

    for (let w = 1; w < tab_count; w++) {
        const used_ppl = [];
        const groups = [];
        const leftovers = [];
        for (let i = 0; i < students.length; i++) {
            // If person is already in a group
            if (used_ppl.indexOf(i) !== -1) {
                // Find which group person is in
                for (let group in groups) {
                    // Person is in group
                    if (group.indexOf(i) !== -1) {
                        // Remove people in group from group_combinations
                        for (let j = 0; j < group.length; j++) {
                            const index = group_combinations[i][1].indexOf(j);
                            if (index > -1) {
                                group_combinations[i][1].splice(index, 1);
                            }
                        }
                    }
                }
                //console.log("skip " + i);
                continue;
            }

            let new_group = [];
            new_group.push(group_combinations[i][0]);
            used_ppl.push(group_combinations[i][0]);

            let partner_index = 0;
            while (new_group.length < min_group_size) {
                if (partner_index >= group_combinations[i][1].length) {
                    while (new_group.length > 0) {
                        leftovers.push(new_group.pop());
                    }
                    break;
                }
                if (used_ppl.indexOf(group_combinations[i][1][partner_index]) === -1) {
                    // Add member to group if they are not already in a group
                    let moved_member = group_combinations[i][1][partner_index];
                    group_combinations[i][1].splice(partner_index, 1);
                    new_group.push(moved_member);
                    used_ppl.push(moved_member);
                } else {
                    partner_index++;
                }
            }
            if (new_group.length !== 0) {
                groups.push(new_group);
            }

        }
        console.log(leftovers);

        let leftover_group = [];
        while (leftovers.length >= min_group_size - leftover_group.length) {
            leftover_group.push(leftovers.pop());
            if (leftover_group.length === min_group_size) {
                groups.push(leftover_group);
                leftover_group = [];
            }
        }

        let group_index = 0;
        while (leftovers.length > 0) {
            groups[group_index].push(leftovers.pop());
            group_index++;
            if (group_index === groups.length) {
                group_index = 0;
            }
        }
        weeks.push(groups);
        sort_group_combinations();
    }
    console.log(weeks);
    //console.log(group_combinations);
}


function create_group_combinations() {
    group_combinations = [];
    for (let i = 0; i < students.length; i++) {
        let partners = [];
        for (let j = 0; j < students.length; j++) {
            if (i !== j) {
                partners.push(j);
            }
        }
        group_combinations.push([i, partners]);
    }
}

function sort_group_combinations() {
    console.log(group_combinations);

    let new_combination = [];
    let insert;
    for (let combination of group_combinations) {
        console.log("combination")
        console.log(combination);
        insert = true;
        for (let i = 0; i < new_combination.length; i++) {
            if (combination[1].length > new_combination[i][1].length) {
                new_combination.splice(i, 0, combination);
                insert = false;
                break;
            }
        }
        if (insert) {
            new_combination.push(combination);
        }
    }
    group_combinations = new_combination;
}


function create_week() {
    const week = [];
    const index = weeks.length;

    let group;
    for (let i = 0; i < students.length; i++) {
        group = [i];
    }
}