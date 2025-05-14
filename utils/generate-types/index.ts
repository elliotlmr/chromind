// utils/generate-types/index.ts

import fs from 'fs';
import path from 'path';
import { getDtoTypes } from './parseDto';
import { getPrismaTypes } from './parsePrisma';

async function generate() {
  const date = new Date().toISOString().split('T')[0];
  const outputDir = path.resolve(__dirname, './generated');
  const outputFile = path.resolve(outputDir, `types-${date}.ts`);

  const prismaTypes = await getPrismaTypes();
  const dtoTypes = await getDtoTypes();

  const content = `// ✅ Types générés automatiquement le ${date}
// Ne pas modifier manuellement.

///////////////////////////
// Prisma Models
///////////////////////////

${prismaTypes}

///////////////////////////
// NestJS DTOs
///////////////////////////

${dtoTypes}
`;

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, content);
  console.log(`✅ Types générés dans ${outputFile}`);
}

generate();
