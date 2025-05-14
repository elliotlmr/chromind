// utils/generate-types/parseDtos.ts
import { Project, SourceFile, ClassDeclaration } from 'ts-morph';
import path from 'path';
import fs from 'fs';

const dtoDirs = [
  '../../apps/nest/src/auth/dto',
  '../../apps/nest/src/emotions/dto',
  '../../apps/nest/src/emotions-records/dto',
];

export function getDtoTypes(): string {
  const project = new Project({
    tsConfigFilePath: path.resolve(__dirname, '../../apps/nest/tsconfig.json'),
  });

  const allTypes: string[] = [];

  for (const dtoDir of dtoDirs) {
    const fullDir = path.resolve(__dirname, dtoDir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir).filter((f) => f.endsWith('.ts'));

    for (const file of files) {
      const filePath = path.join(fullDir, file);
      const sourceFile = project.addSourceFileAtPath(filePath);

      const classes = sourceFile.getClasses();
      for (const cls of classes) {
        const name = cls.getName();
        if (!name) continue;

        const fields = cls.getProperties().map((prop) => {
          const propName = prop.getName();
          const typeNode = prop.getTypeNode();
          const type = typeNode ? typeNode.getText() : 'any';
          return `  ${propName}: ${type};`;
        });

        allTypes.push(`export type ${name} = {\n${fields.join('\n')}\n};`);
      }
    }
  }

  return allTypes.join('\n\n');
}
