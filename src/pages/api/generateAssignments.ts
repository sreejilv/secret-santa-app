import { NextApiRequest, NextApiResponse } from 'next';
import { getAssignments } from '../../utils/assignmentRules';
import { parseCsv } from './parseCsv';
import fs from 'fs';
import path from 'path';

export default async function generateAssignments(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { csvData, previousAssignments } = req.body;

    if (!csvData) {
        return res.status(400).json({ message: 'CSV data is required' });
    }

    try {
        const employees = await parseCsv(csvData);
        const assignments = getAssignments(employees, previousAssignments);

        const outputCsv = generateOutputCsv(assignments);
        const filePath = path.join(process.cwd(), 'public', 'assignments.csv');
        fs.writeFileSync(filePath, outputCsv);

        res.status(200).json({ message: 'Assignments generated successfully', filePath });
    } catch (error) {
        res.status(500).json({ message: 'Error generating assignments', error: error.message });
    }
}

function generateOutputCsv(assignments: any[]) {
    const header = 'Employee,Assigned\n';
    const rows = assignments.map(({ employee, assigned }) => `${employee},${assigned}`).join('\n');
    return header + rows;
}