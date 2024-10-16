import fs from 'fs';
import path from 'path';
export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'src', 'blogdata');
  try {
    let Allblog = [];
    let files = fs.readdirSync(filePath);
    
    // Get the count from query, with default value
    const count = parseInt(req.query.count) || 2;
    
    // Slice the files array to return the next batch of blogs
    files = files.slice(0, count);

    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      const fileContent = fs.readFileSync(`src/blogdata/${item}`, 'utf-8');
      Allblog.push(JSON.parse(fileContent));
    }

    res.status(200).json(Allblog);
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ message: 'Directory not found or cannot be read' });
  }
}
