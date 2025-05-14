// utils/generate-types/parsePrisma.ts
import { DMMF } from '@prisma/generator-helper';
import { getDMMF } from '@prisma/internals';
import fs from 'fs';
import path from 'path';

const PRISMA_TO_TS_TYPE: Record<string, string> = {
  String: 'string',
  Int: 'number',
  Float: 'number',
  Boolean: 'boolean',
  DateTime: 'Date',
  Json: 'any',
  Decimal: 'number',
  BigInt: 'bigint',
  Bytes: 'Buffer',
};

export async function getPrismaTypes(): Promise<string> {
  const schemaPath = path.resolve(
    __dirname,
    '../../apps/nest/prisma/schema.prisma'
  );
  const datamodel = fs.readFileSync(schemaPath, 'utf-8');
  const dmmf = await getDMMF({ datamodel });

  // 1. Enums
  const enums = dmmf.datamodel.enums.map((e) => {
    const values = e.values.map((v) => `  "${v.name}"`).join(' |\n');
    return `export type ${e.name} =\n${values};`;
  });

  // 2. Models
  const models = dmmf.datamodel.models.map((model) => {
    const fields = model.fields
      .map((f) => {
        const baseType = PRISMA_TO_TS_TYPE[f.type] ?? f.type; // garde les enums ou relations intactes
        const type = f.isList ? `${baseType}[]` : baseType;
        const optional = f.isRequired ? '' : '?';
        return `  ${f.name}${optional}: ${type};`;
      })
      .join('\n');

    return `export type ${model.name} = {\n${fields}\n};`;
  });

  return [...enums, '', ...models].join('\n\n');
}
