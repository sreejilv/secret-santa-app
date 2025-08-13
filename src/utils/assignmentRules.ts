export interface Employee {
    id: number;
    name: string;
    email: string;
    previousAssignment?: number; // ID of the previously assigned secret child
}

export function assignSecretChildren(employees: Employee[]): Record<number, number> {
    const assignments: Record<number, number> = {};
    const availableEmployees = [...employees];

    for (const employee of employees) {
        const eligibleChildren = availableEmployees.filter(child => 
            child.id !== employee.id && 
            child.id !== employee.previousAssignment &&
            !Object.values(assignments).includes(child.id)
        );

        if (eligibleChildren.length === 0) {
            throw new Error("Not enough eligible children to assign.");
        }

        const randomIndex = Math.floor(Math.random() * eligibleChildren.length);
        assignments[employee.id] = eligibleChildren[randomIndex].id;

        // Remove the assigned child from the available list
        availableEmployees.splice(availableEmployees.indexOf(eligibleChildren[randomIndex]), 1);
    }

    return assignments;
}