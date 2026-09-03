const employees = [
    {
        name: "Rahul Sharma",
        department: "IT",
        role: "Developer"
    },
    {
        name: "Priya Patel",
        department: "HR",
        role: "Manager"
    },
    {
        name: "Amit Shah",
        department: "Sales",
        role: "Executive"
    },
    {
        name: "Neha Joshi",
        department: "IT",
        role: "Tester"
    },
    {
        name: "Karan Mehta",
        department: "Finance",
        role: "Accountant"
    },
    {
        name: "Riya Desai",
        department: "Marketing",
        role: "Designer"
    }
];

const employeeList = document.getElementById("employeeList");

const totalEmployees = document.getElementById("totalEmployees");

function displayEmployees(list) {

    employeeList.innerHTML = "";

    list.forEach(employee => {

        const employeeDiv = document.createElement("div");

        employeeDiv.className = "employee";

        employeeDiv.innerHTML = `
            <div>
                <div class="name">${employee.name}</div>
                <div class="department">${employee.department}</div>
            </div>

            <div>${employee.role}</div>
        `;

        employeeList.appendChild(employeeDiv);
    });
}

totalEmployees.textContent = employees.length;

displayEmployees(employees);