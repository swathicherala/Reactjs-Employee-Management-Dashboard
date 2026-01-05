const KEY = "employees"

export const getEmployees = () => {
    return JSON.parse(localStorage.getItem(KEY)) || []
}

export const saveEmployees = (employees) => {
    localStorage.setItem(KEY, JSON.stringify(employees))
}