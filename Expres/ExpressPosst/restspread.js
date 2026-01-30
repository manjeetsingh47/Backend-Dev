const emp = {
    id: 1,
    name: "billu",
    salary: "3000",
    address: "Delhi",
    age: 25,
    department: "SWE"
}

const empCopy = {...emp }

const { id, name, ...rest } = emp;
console.log(rest);

const updateEmp = {...emp, salary: "20000", location: "Noida" }
console.log(updateEmp);