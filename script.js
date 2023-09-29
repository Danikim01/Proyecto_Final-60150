alert("Hello, how old are you???")

let suma_edades = 0;
let promedio = 0;
let cantidad_iteraciones = 5;
for(let i = 0; i < 5;i++){
    age = parseInt(prompt("Enter your age:"));
    while (isNaN(age) || age < 0){
        alert("Invalid age, please try again");
        age = parseInt(prompt("Enter your age:"));
    }
    suma_edades += age;
}


promedio = suma_edades / cantidad_iteraciones;


if(promedio >= 18){
    alert("Most of the people are adults");
}else if(promedio < 18){
    alert("Most of the people are children");
}else{
    alert("Most of the people are teenagers");
}


