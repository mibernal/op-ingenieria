import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// -----------------------------
// Configuración base
// -----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.resolve(rootDir, "public", "logos");
const outputJson = path.resolve(outputDir, "companies.json");

const CLEARBIT_BASE = "https://logo.clearbit.com";
const WIKI_API = "https://en.wikipedia.org/w/api.php";
const REQUEST_TIMEOUT_MS = 12_000;

// -----------------------------
// JSON de empresas (exacto)
// -----------------------------
const companies = [
  { id: "1", name: "Schneider Electric", logo: "" },
  { id: "2", name: "ABB", logo: "" },
  { id: "3", name: "Siemens", logo: "" },
  { id: "4", name: "Eaton", logo: "" },
  { id: "5", name: "Legrand", logo: "" },
  { id: "6", name: "General Electric", logo: "" },
  { id: "7", name: "Caterpillar", logo: "" },
  { id: "8", name: "Cummins", logo: "" },
  { id: "9", name: "Chint", logo: "" },
  { id: "10", name: "Perkins", logo: "" },
  { id: "11", name: "Doosan", logo: "" },
  { id: "12", name: "Fawde", logo: "" },
  { id: "13", name: "Powest", logo: "" },
  { id: "14", name: "Coexito", logo: "" },
  { id: "15", name: "Victron", logo: "" },
  { id: "16", name: "Pylontech", logo: "" },
  { id: "17", name: "Deye", logo: "" },
  { id: "18", name: "JAsolar", logo: "" },
  { id: "19", name: "Trojan", logo: "" },
  { id: "20", name: "Sylvania", logo: "" },
  { id: "21", name: "Green Point", logo: "" },
  { id: "22", name: "Must", logo: "" },
  { id: "23", name: "SRNE", logo: "" },
  { id: "24", name: "York", logo: "" },
  { id: "25", name: "Midea", logo: "" },
  { id: "26", name: "LG", logo: "" },
  { id: "27", name: "Epever", logo: "" },
];

// -----------------------------
// Dominios recomendados
// -----------------------------
const domainHints = {
  "Schneider Electric": ["schneider-electric.com"],
  ABB: ["abb.com"],
  Siemens: ["siemens.com"],
  Eaton: ["eaton.com"],
  Legrand: ["legrand.com"],
  "General Electric": ["ge.com"],
  Caterpillar: ["caterpillar.com", "cat.com"],
  Cummins: ["cummins.com"],
  Chint: ["chint.com", "chintglobal.com", "chint.net"],
  Perkins: ["perkins.com"],
  Doosan: ["doosan.com"],
  Fawde: ["fawde.com", "fawde.cn"],
  Powest: ["powest.com.co", "powest.com"],
  Coexito: ["coexito.com.co", "coexito.com"],
  Victron: ["victronenergy.com"],
  Pylontech: ["pylontech.com.cn", "pylontech.com"],
  Deye: ["deyeinverter.com", "deye.com"],
  JAsolar: ["jasolar.com"],
  Trojan: ["trojanbattery.com"],
  Sylvania: ["sylvania.com"],
  "Green Point": ["greenpoint.com", "greenpoint.com.co"],
  Must: ["mustpower.com"],
  SRNE: ["srne.com"],
  York: ["york.com", "yorkair.com"],
  Midea: ["midea.com"],
  LG: ["lg.com"],
  Epever: ["epever.com"],
};

// -----------------------------
// Utilidades
// -----------------------------
const normalizeValue = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const kebabCase = (value) => normalizeValue(value).replace(/\s+/g, "-");

const withTimeout = async (promise, ms, label) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  try {
    return await promise(controller.signal);
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Timeout (${label})`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

const fetchWithTimeout = (url, options = {}, label = "request") =>
  withTimeout((signal) => fetch(url, { ...options, signal }), REQUEST_TIMEOUT_MS, label);

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const fileExists = async (filepath) => {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
};

const saveBuffer = async (buffer, filepath) => {
  await fs.writeFile(filepath, buffer);
};

const getExtensionFromContentType = (contentType) => {
  if (!contentType) return null;
  if (contentType.includes("svg")) return "svg";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  return null;
};

const getExtensionFromUrl = (url) => {
  const match = url.match(/\.(svg|png|jpg|jpeg)(\?.*)?$/i);
  if (!match) return null;
  return match[1].toLowerCase() === "jpeg" ? "jpg" : match[1].toLowerCase();
};

// -----------------------------
// Descarga desde Clearbit
// -----------------------------
const fetchFromClearbit = async (companyName) => {
  const domains = domainHints[companyName] ?? [];
  for (const domain of domains) {
    const url = `${CLEARBIT_BASE}/${domain}`;
    try {
      const response = await fetchWithTimeout(url, {}, `Clearbit ${domain}`);
      if (!response.ok) continue;

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.startsWith("image/")) continue;

      const buffer = Buffer.from(await response.arrayBuffer());
      const ext = getExtensionFromContentType(contentType) || getExtensionFromUrl(url);

      if (!ext) continue;

      return { buffer, ext, source: "clearbit", url };
    } catch (error) {
      console.warn(`⚠️  Clearbit falló para ${companyName} (${domain}): ${error.message}`);
    }
  }

  return null;
};

// -----------------------------
// Descarga desde Wikipedia
// -----------------------------
const searchWikipediaTitle = async (query) => {
  const url = `${WIKI_API}?action=query&list=search&format=json&origin=*&srlimit=5&srsearch=${encodeURIComponent(
    query
  )}`;

  const response = await fetchWithTimeout(url, {}, "Wikipedia search");
  if (!response.ok) return null;

  const data = await response.json();
  const results = data?.query?.search ?? [];
  if (!results.length) return null;

  return results[0].title;
};

const getWikipediaImages = async (title) => {
  const url = `${WIKI_API}?action=query&format=json&origin=*&prop=images&titles=${encodeURIComponent(
    title
  )}`;

  const response = await fetchWithTimeout(url, {}, "Wikipedia images");
  if (!response.ok) return [];

  const data = await response.json();
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0];

  return page?.images ?? [];
};

const getWikipediaImageUrl = async (fileTitle) => {
  const url = `${WIKI_API}?action=query&format=json&origin=*&titles=${encodeURIComponent(
    fileTitle
  )}&prop=imageinfo&iiprop=url`;

  const response = await fetchWithTimeout(url, {}, "Wikipedia imageinfo");
  if (!response.ok) return null;

  const data = await response.json();
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];

  return info?.url ?? null;
};

const pickWikipediaCandidates = (images, companyName) => {
  const companyKey = normalizeValue(companyName).replace(/\s+/g, "");
  const candidates = images
    .map((image) => image.title)
    .filter(Boolean)
    .filter((title) => title.startsWith("File:"))
    .filter((title) => /\.(svg|png)$/i.test(title))
    .filter((title) => {
      const normalized = normalizeValue(title).replace(/\s+/g, "");
      return (
        normalized.includes("logo") ||
        normalized.includes("wordmark") ||
        normalized.includes(companyKey)
      );
    });

  // Preferir SVG
  const svg = candidates.filter((title) => title.toLowerCase().endsWith(".svg"));
  const png = candidates.filter((title) => title.toLowerCase().endsWith(".png"));

  return [...svg, ...png];
};

const fetchFromWikipedia = async (companyName) => {
  try {
    const title = await searchWikipediaTitle(companyName);
    if (!title) return null;

    const images = await getWikipediaImages(title);
    if (!images.length) return null;

    const candidates = pickWikipediaCandidates(images, companyName).slice(0, 8);

    for (const candidate of candidates) {
      const imageUrl = await getWikipediaImageUrl(candidate);
      if (!imageUrl) continue;

      const response = await fetchWithTimeout(imageUrl, {}, "Wikipedia download");
      if (!response.ok) continue;

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.startsWith("image/")) continue;

      const buffer = Buffer.from(await response.arrayBuffer());
      const ext = getExtensionFromContentType(contentType) || getExtensionFromUrl(imageUrl);

      if (!ext) continue;

      return { buffer, ext, source: "wikipedia", url: imageUrl };
    }
  } catch (error) {
    console.warn(`⚠️  Wikipedia falló para ${companyName}: ${error.message}`);
  }

  return null;
};

// -----------------------------
// Flujo principal
// -----------------------------
const run = async () => {
  await ensureDir(outputDir);

  const downloaded = [];
  const notFound = [];

  for (const company of companies) {
    const filenameBase = kebabCase(company.name);
    let result = null;

    try {
      // 1) Intentar Clearbit
      result = await fetchFromClearbit(company.name);

      // 2) Si falla, intentar Wikipedia
      if (!result) {
        result = await fetchFromWikipedia(company.name);
      }

      if (!result) {
        console.warn(`⚠️  No se encontró logo para ${company.name}`);
        notFound.push(company.name);
        continue;
      }

      const ext = result.ext === "jpeg" ? "jpg" : result.ext;
      const filename = `${filenameBase}.${ext}`;
      const filepath = path.resolve(outputDir, filename);

      // Evitar duplicados
      if (await fileExists(filepath)) {
        console.warn(`⚠️  Logo ya existe, se omite: ${filename}`);
        company.logo = `/logos/${filename}`;
        downloaded.push(company.name);
        continue;
      }

      await saveBuffer(result.buffer, filepath);
      company.logo = `/logos/${filename}`;
      downloaded.push(company.name);

      console.log(`✅ ${company.name} (${result.source}) -> ${company.logo}`);
    } catch (error) {
      console.warn(`⚠️  Error al procesar ${company.name}: ${error.message}`);
      notFound.push(company.name);
    }
  }

  console.log("\nResumen:");
  console.log("Logos descargados correctamente:");
  if (downloaded.length === 0) {
    console.log("- Ninguno");
  } else {
    downloaded.forEach((name) => console.log(`- ${name}`));
  }

  console.log("\nLogos no encontrados:");
  if (notFound.length === 0) {
    console.log("- Ninguno");
  } else {
    notFound.forEach((name) => console.log(`- ${name}`));
  }

  await fs.writeFile(outputJson, JSON.stringify(companies, null, 2), "utf8");
  console.log(`\nJSON actualizado guardado en: ${path.relative(rootDir, outputJson)}`);
};

run().catch((error) => {
  console.error("Error fatal:", error);
  process.exit(1);
});
