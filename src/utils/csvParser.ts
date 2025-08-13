import { parse } from 'csv-parse/sync';
import fs from 'fs';

export interface Employee {
    name: string;
    email: string;
}

export function parseCsv(filePath: string): Employee[] {
    const fileContent = fs.readFileSync(filePath);
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    return records.map((record: any) => ({
        name: record.name,
        email: record.email
    }));
}