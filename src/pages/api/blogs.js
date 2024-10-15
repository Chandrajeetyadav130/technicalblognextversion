import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Resolve the path to the JSON file inside the src/blogdata folder
  const filePath = path.join(process.cwd(), 'src', 'blogdata');

  try {
    // Read the directory (synchronously) and get an array of filenames
    let Allblog=[]
    const files = fs.readdirSync(filePath);
    for(let i=0;i<files.length;i++){
        const item=files[i]
        const fileContent = fs.readFileSync(`src/blogdata/${item}`, 'utf-8');
        Allblog.push(JSON.parse(fileContent))

    }

    // Send the data (filenames) as a response
    res.status(200).json(Allblog);
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ message: 'Directory not found or cannot be read' });
  }
}