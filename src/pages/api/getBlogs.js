// pages/api/getBlog.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  //req.query.slugs :This is used for query from the url
  // Resolve the path to the JSON file inside the src/blogdata folder
  // slugs
  // http://localhost:3000/api/getBlogs?slugs=javascriptblog.json
  const filePath = path.join(process.cwd(), `src/blogdata/${req.query.slugs}`);
  console.log("getBlogs run",req.query.slugs)
  try {
    // Read the file
    const fileContent = fs.readFileSync(filePath, 'utf-8'); 
    const data = JSON.parse(fileContent);

    // Send the data as a response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ message: 'File not found or cannot be read' });
  }
}