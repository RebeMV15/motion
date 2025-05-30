#!/bin/bash

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Create backend directory and initialize
cd ..
mkdir -p backend
cd backend
npm init -y

# Install backend dependencies
npm install express cors dotenv googleapis
npm install --save-dev typescript @types/node @types/express @types/cors ts-node-dev

# Create TypeScript configuration
cat > tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
EOL

# Create backend source directory
mkdir -p src

# Create basic backend files
cat > src/index.ts << EOL
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
EOL

# Update backend package.json scripts
npm pkg set scripts.dev="ts-node-dev --respawn --transpile-only src/index.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="node dist/index.js"

# Create .env file
cat > .env << EOL
PORT=3000
GOOGLE_SHEETS_ID=your_sheet_id_here
EOL

# Create .gitignore
cat > .gitignore << EOL
node_modules
dist
.env
.DS_Store
EOL

echo "Setup complete! Don't forget to:"
echo "1. Add your Google Sheets API credentials"
echo "2. Update the .env file with your Google Sheets ID"
echo "3. Run 'npm run dev' in both frontend and backend directories" 