let employees = [
    {
        id: 1,
        name: "Rahul Sharma",
        department: "IT",
        role: "Developer"
    },
    {
        id: 2,
        name: "Priya Patel",
        department: "HR",
        role: "Manager"
    },
    {
        id: 3,
        name: "Amit Shah",
        department: "Sales",
        role: "Executive"
    },
    {
        id: 4,
        name: "Neha Joshi",
        department: "IT",
        role: "Tester"
    },
    {
        id: 5,
        name: "Karan Mehta",
        department: "Finance",
        role: "Accountant"
    },
    {
        id: 6,
        name: "Riya Desai",
        department: "Marketing",
        role: "Designer"
    }
];

const employeeList = document.getElementById("employeeList");
const totalEmployees = document.getElementById("totalEmployees");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const addEmployeeForm = document.getElementById("addEmployeeForm");
const nameInput = document.getElementById("nameInput");
const deptInput = document.getElementById("deptInput");
const roleInput = document.getElementById("roleInput");

function updateDepartmentFilterOptions() {
    const currentSelected = departmentFilter.value || "All";
    const departments = Array.from(new Set(employees.map(emp => emp.department))).sort();

    departmentFilter.innerHTML = `<option value="All">All Departments</option>`;
    departments.forEach(dept => {
        const option = document.createElement("option");
        option.value = dept;
        option.textContent = dept;
        departmentFilter.appendChild(option);
    });

    if (departments.includes(currentSelected) || currentSelected === "All") {
        departmentFilter.value = currentSelected;
    } else {
        departmentFilter.value = "All";
    }
}

function displayEmployees() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedDepartment = departmentFilter.value;

    const filtered = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm) ||
                              emp.role.toLowerCase().includes(searchTerm);
        const matchesDept = selectedDepartment === "All" || emp.department === selectedDepartment;
        return matchesSearch && matchesDept;
    });

    employeeList.innerHTML = "";

    if (filtered.length === 0) {
        employeeList.innerHTML = `<div class="no-results">No employees found matching criteria.</div>`;
    } else {
        filtered.forEach(employee => {
            const employeeDiv = document.createElement("div");
            employeeDiv.className = "employee";

            employeeDiv.innerHTML = `
                <div class="employee-info">
                    <div class="name">${employee.name}</div>
                    <div class="department">${employee.department}</div>
                </div>
                <div class="employee-meta">
                    <span class="role">${employee.role}</span>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${employee.id})">Delete</button>
                </div>
            `;

            employeeList.appendChild(employeeDiv);
        });
    }

    totalEmployees.textContent = employees.length;
}

function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    updateDepartmentFilterOptions();
    displayEmployees();
}

addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const department = deptInput.value.trim();
    const role = roleInput.value.trim();

    if (!name || !department || !role) return;

    const newEmployee = {
        id: Date.now(),
        name,
        department,
        role
    };

    employees.push(newEmployee);
    nameInput.value = "";
    deptInput.value = "";
    roleInput.value = "";

    updateDepartmentFilterOptions();
    displayEmployees();
});

searchInput.addEventListener("input", displayEmployees);
departmentFilter.addEventListener("change", displayEmployees);

// Initial setup
updateDepartmentFilterOptions();
displayEmployees();
