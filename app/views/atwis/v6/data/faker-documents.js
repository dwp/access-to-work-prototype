// app/views/atwis/v4/data/unallocated-documents.js
const { faker } = require('@faker-js/faker/locale/en_GB');

const DOCUMENT_TYPES = [
  'Invoice',
  'CSI',
  'Support Worker',
  'Support Worker (multiple)',
  'One off costs (SAE)',
  'Travel to work',
  'Travel in work',
  'Change bank details'
];

// 5 names to allocate documents to
const ALLOCATION_NAMES = [
  "Alex Thompson",
  "Charlie Murphy",
  "Sam Patel",
  "Jordan Ellis",
  "Taylor Singh"
];

function formatDateYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function randomDateInLastTwoMonths() {
  const now = new Date();
  const start = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  return faker.date.between({ from: start, to: now });
}

function buildEnvelopeRef(dateStr) {
  const yyyymmdd = dateStr.replace(/-/g, '');
  const tail = faker.string.numeric(12, { allowLeadingZeros: true });
  return `${yyyymmdd}${tail}`;
}

function randomFormReference() {
  if (faker.number.float() < 0.3) return 'Whitemail';

  const letter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const num = () => Math.floor(Math.random() * 10);

  return `${letter()}${letter()}${num()}${num()}${num()}${letter()}${letter()}`;
}

function generateDocument() {
  return {
    type: faker.helpers.arrayElement(DOCUMENT_TYPES),
    formReference: randomFormReference(),
    id: faker.string.uuid()
  };
}

function generateNINumber() {
  const digits = faker.string.numeric(6, { allowLeadingZeros: true });
  const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `QQ${digits}${suffix}`;
}

function generateURN() {
  return faker.string.numeric(10, { allowLeadingZeros: true });
}

function generateUsers(numUsers, seed) {
  faker.seed(seed);

  const users = [];

  for (let userIndex = 0; userIndex < numUsers; userIndex++) {

    // ---- Generate envelopes ----
    const envelopes = [];
    const envelopesCount = faker.number.int({ min: 1, max: 5 });

    for (let envelopeIndex = 0; envelopeIndex < envelopesCount; envelopeIndex++) {
      const date = randomDateInLastTwoMonths();
      const dateScanned = formatDateYMD(date);

      const docsForEnvelope = faker.number.int({ min: 1, max: 5 });
      const documents = Array.from({ length: docsForEnvelope }, generateDocument);

      const documentTypes = [...new Set(documents.map(doc => doc.type))];

      envelopes.push({
        id: envelopeIndex,
        dateScanned,
        envelopeRef: buildEnvelopeRef(dateScanned),
        documents,
        documentTypes
      });
    }

    // Sort envelopes oldest → newest
    envelopes.sort((a, b) => new Date(a.dateScanned) - new Date(b.dateScanned));

    const totalDocuments = envelopes.reduce(
      (sum, env) => sum + env.documents.length,
      0
    );

    // ---- NEW: allocatedDocuments is now an array of 0–2 items ----

    // Fixed name list
    const ALLOCATION_NAMES = [
      "John Doe",
      "Susan Quantas",
      "Savannah Eastwood",
      "David Connolly",
      "Sophia Wanless"
    ];

    // Determine how many allocations this user gets (0–2)
    const allocatedSummaryCount = faker.number.int({ min: 0, max: 2 });

    // Shuffle the names deterministically
    const shuffledNames = faker.helpers.shuffle(ALLOCATION_NAMES);

    // Take the first N unique names
    const selectedNames = shuffledNames.slice(0, allocatedSummaryCount);

    // Find oldest document across all envelopes
    let oldestDocument = null;
    envelopes.forEach(env => {
      if (!oldestDocument || new Date(env.dateScanned) < new Date(oldestDocument)) {
        oldestDocument = env.dateScanned;
      }
    });

    // Build allocatedDocuments array
    const allocatedDocuments = selectedNames.map(name => ({
      total: faker.number.int({ min: 1, max: 10 }),
      allocatedTo: name,
      oldestDocument
    }));

    // ---- Build user object ----
    users.push({
      id: userIndex,
      name: faker.person.fullName(),
      niNumber: generateNINumber(),
      urn: generateURN(),
      oldestEnvelope: envelopes[0]?.dateScanned ?? null,
      totalDocuments,
      allocatedDocuments,   // ⭐ now an array of 0–2 items
      envelopes
    });
  }

  // ---- Sort users by oldest envelope date ----
  return users.sort((a, b) => {
    const ad = a.oldestEnvelope ? new Date(a.oldestEnvelope) : new Date(8640000000000000);
    const bd = b.oldestEnvelope ? new Date(b.oldestEnvelope) : new Date(8640000000000000);
    return ad - bd;
  });
}

module.exports = { generateUsers };