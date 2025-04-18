import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Example: List files in a directory
    const directoryPath = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(directoryPath);
    
    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 