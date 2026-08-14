import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read lucide-animated index.d.ts to get all exports
const typingsPath = path.join(__dirname, 'node_modules', 'lucide-animated', 'dist', 'index.d.ts');
const typings = fs.readFileSync(typingsPath, 'utf8');

// The exports are at the end: export { AArrowDownIcon, ..., ZapOffIcon };
const exportLineMatch = typings.match(/export\s*\{([^}]+)\}/);
const exportedSymbols = new Set();
if (exportLineMatch) {
  const exports = exportLineMatch[1].split(',').map(s => s.trim());
  for (const exp of exports) {
    if (!exp.startsWith('type ')) {
      // Handle aliased exports like "RefreshCWIcon as RefreshCwIcon"
      if (exp.includes(' as ')) {
        const parts = exp.split(' as ');
        exportedSymbols.add(parts[1].trim());
        exportedSymbols.add(parts[0].trim());
      } else {
        exportedSymbols.add(exp);
      }
    }
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find import { ... } from "lucide-animated" (or single quotes)
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-animated['"]/g;
  
  let match;
  let newContent = content;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importedItems = match[1].split(',').map(s => s.trim()).filter(s => s);
    
    const animatedImports = [];
    const reactImports = [];
    
    for (const item of importedItems) {
      // Check if item is already aliased e.g. "LoaderIcon as Loader2"
      let nameToUse = item;
      let alias = item;
      if (item.includes(' as ')) {
        const parts = item.split(' as ');
        nameToUse = parts[0].trim();
        alias = parts[1].trim();
      }
      
      // Try to find the animated version
      let animatedName = null;
      if (exportedSymbols.has(nameToUse)) {
        animatedName = nameToUse;
      } else if (exportedSymbols.has(nameToUse + 'Icon')) {
        animatedName = nameToUse + 'Icon';
      } else if (exportedSymbols.has(nameToUse.replace('2', '') + 'Icon')) {
        animatedName = nameToUse.replace('2', '') + 'Icon'; // e.g. Code2 -> CodeIcon
      }
      
      if (animatedName) {
        if (animatedName === alias) {
          animatedImports.push(animatedName);
        } else {
          animatedImports.push(`${animatedName} as ${alias}`);
        }
      } else {
        // Not found in lucide-animated, fallback to lucide-react
        reactImports.push(item);
      }
    }
    
    let replacement = '';
    if (animatedImports.length > 0) {
      replacement += `import { ${animatedImports.join(', ')} } from "lucide-animated";\n`;
    }
    if (reactImports.length > 0) {
      replacement += `import { ${reactImports.join(', ')} } from "lucide-react";\n`;
    }
    
    newContent = newContent.replace(match[0], replacement.trim());
  }
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

processDirectory(path.join(__dirname, 'src'));
