import fs from "node:fs";
import ts from "typescript";

// Reuse the same content as the site; standard PDF fonts keep this dependency-light.
async function dataModule(file) {
  const source = fs.readFileSync(
    new URL(`../src/data/${file}.ts`, import.meta.url),
    "utf8",
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
}
const { personal } = await dataModule("personal");
const { experiences } = await dataModule("experience");
const { skillCategories } = await dataModule("skills");
const normalize = (value) =>
  value
    .replace(/[–—]/g, "-")
    .replace(/[’]/g, "'")
    .replace(/[^\x20-\x7E]/g, "");
const escape = (value) =>
  normalize(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
let y = 794;
const commands = [];
function line(text, size = 10, bold = false) {
  commands.push(
    `BT /${bold ? "F2" : "F1"} ${size} Tf 0.14 0.18 0.16 rg 46 ${y} Td (${escape(text)}) Tj ET`,
  );
  y -= size + 5;
}
function paragraph(text, size = 9.5) {
  const words = normalize(text).split(/\s+/);
  let current = "";
  for (const word of words) {
    if ((current + word).length > 103) {
      line(current, size);
      current = "";
    }
    current += `${word} `;
  }
  if (current) line(current.trim(), size);
}
function heading(text) {
  y -= 11;
  line(text.toUpperCase(), 10, true);
  y -= 2;
}
line("SAMPLE RESUME - REPLACE BEFORE USE", 10, true);
line(personal.name, 25, true);
line(`${personal.title} | ${personal.location}`, 11);
line(personal.email, 10);
heading("Profile");
paragraph(personal.shortBio);
heading("Professional experience");
for (const experience of experiences) {
  line(`${experience.role} | ${experience.company}`, 10, true);
  line(`${experience.start} - ${experience.end || "Present"}`, 9);
  for (const item of experience.responsibilities) paragraph(`- ${item}`);
  y -= 7;
}
heading("Technical toolkit");
for (const category of skillCategories)
  paragraph(`${category.title}: ${category.skills.join(", ")}`, 9);
heading("Education");
line(personal.education.degree, 10, true);
paragraph(`${personal.education.school} | ${personal.education.years}`, 9);
if (y < 35)
  throw new Error("Resume exceeds one page. Adjust layout before generating.");
const stream = commands.join("\n");
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
];
let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
pdf += offsets
  .slice(1)
  .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
  .join("");
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
const directory = new URL("../public/resume/", import.meta.url);
fs.mkdirSync(directory, { recursive: true });
fs.writeFileSync(new URL("sample-resume.pdf", directory), pdf);
console.log("Generated resume from portfolio data.");
