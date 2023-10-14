
contact_list = []


function add_contact(){
    contact_name = prompt("Name of the contact: ");
    while (!isNaN(contact_name) || contact_name == ""){
        contact_name = prompt("Name of the contact: ");
    }
    contact_age = parseInt(prompt("Age of the contact: "));
    while (isNaN(contact_age) || contact_age < 0 || contact_age > 120){
        contact_age = parseInt(prompt("Age of the contact: "));
    }
    contact = {
        name: contact_name,
        age: contact_age,
    };
    contact_list.push(contact)

    let p = document.createElement("p");
    p.innerHTML = contact.name + ": " + contact.age;
    let container = document.querySelector("div#contacts_lists");
    container.appendChild(p);
}

function find_contact_name(contact_to_find){
    let found = false;
    contact_list.forEach(element => {
        if (element.name == contact_to_find){
            alert("Contact found: " + element.name + ": " + element.age);
            found = true;
        }
    });
    if(!found){
        alert("Contact not found");
    }
    return found
}

function find_contact(){
    contact_to_find = prompt("Name of the contact to find: ");
    find_contact_name(contact_to_find);
}

function delete_contact(){
    if (contact_list.length == 0){
        alert("No contacts to delete");
        return
    }
    contact_to_delete = prompt("Name of the contact to delete: ");
    if (!find_contact_name(contact_to_delete)){
        return;
    }
    let container = document.querySelectorAll("p");
    container.forEach(element => {
        if (element.innerHTML.includes(contact_to_delete)){
            element.remove();
        }
    });
    let index_of_contact = 0;
    contact_list.forEach(element => {
        if (element.name == contact_to_delete){
            index_of_contact = contact_list.indexOf(element);
        }
    });
    contact_list.splice(index_of_contact,1);
}

function setEvents(){
    document.querySelector("button#add").addEventListener("click", add_contact);
    document.querySelector("button#search").addEventListener("click",find_contact);
    document.querySelector("button#delete").addEventListener("click",delete_contact);
}

let elements_container = document.createElement("div");
elements_container.setAttribute("id","contacts_lists");

let container_div = document.querySelector("body #container_div");
container_div.appendChild(elements_container);

setEvents();





