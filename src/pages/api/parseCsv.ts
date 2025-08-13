import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { parseCsv } from '../../utils/csvParser';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseCsvHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the file' });
    }

    const filePath = files.file[0].filepath;

    try {
      const employeeData = await parseCsv(filePath);
      res.status(200).json(employeeData);
    } catch (error) {
      res.status(500).json({ error: 'Error reading the CSV file' });
    } finally {
      fs.unlinkSync(filePath); // Clean up the uploaded file
    }
  });
};

export default parseCsvHandler;