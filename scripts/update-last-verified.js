// scripts/update-last-verified.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const filePath = path.join(process.cwd(), 'catalog-info.yaml');
const key = 'dwp.gov.uk/last-verified.on';

function todayISO() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
}

(function main() {
  if (!fs.existsSync(filePath)) {
    console.error('catalog-info.yaml not found.');
    process.exit(1);
  }

  const today = todayISO();
  const src = fs.readFileSync(filePath, 'utf8');

  // Regex matches the exact label key and replaces just the value in quotes
  // Handles both single and double quotes, preserves surrounding whitespace.
  const pattern = new RegExp(
    `(^\\s*${key.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\s*:\\s*["'])\\d{4}-\\d{2}-\\d{2}(["'])\\s*$`,
    'm'
  );

  let out;
  if (pattern.test(src)) {
    out = src.replace(pattern, `$1${today}$2`);
  } else {
    // If the key is missing, we can insert it under metadata.labels.
    // This is a conservative append that keeps file valid and minimal.
    const insertion =
      `\nmetadata:\n  labels:\n    ${key}: "${today}"\n`;
    out = src + insertion;
    console.warn(`Key not found; appended under metadata.labels.`);
  }

  if (out !== src) {
    fs.writeFileSync(filePath, out, 'utf8');
    execSync(`git add "${filePath}"`, { stdio: 'inherit' });
    console.log(`Updated ${key} → ${today}`);
  } else {
    console.log(`No change needed; already ${today}`);
  }
})();