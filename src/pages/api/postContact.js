// /pages/api/postContact.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://technicalblognextversion.netlify.app'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end(); // Respond with 200 for preflight requests
        return;
    }

    if (req.method === 'POST') {
        try {
            const userData = req.body; // Get the data from the request body

            // Specify the path of the file you want to read from
            const filePath = path.join(process.cwd(), 'src', 'contactdata', 'existingData.txt');

            // Ensure the file exists before reading it
            if (fs.existsSync(filePath)) {
                // Read the file contents
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                // console.log('File Content:', fileContent);
            } else {
                console.log('File does not exist, skipping reading');
            }

            // Specify the path where the new file will be written
            const newFilePath = path.join(process.cwd(), 'src', 'contactdata', `userData-${Date.now()}.txt`);

            // Write the user's data to the new file
            fs.writeFileSync(newFilePath, JSON.stringify(userData, null, 2), 'utf-8');

            // Send a success response back to the client
            res.status(200).json({ message: 'Data written to file successfully', filePath: newFilePath });
        } catch (error) {
            // Catch any errors that occur during file operations
            console.error('Error writing file:', error);
            res.status(500).json({ error: 'Failed to write data to file', details: error.message });
        }
    } else {
        // Only allow POST requests
        res.status(405).json({ message: 'Method not allowed' });
    }
}
