import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync("content/image-manifest.json", "utf8"));
const source = fs.readFileSync("content/products.ts", "utf8");

function parseObjects(arrayName) {
  const start = source.indexOf(`export const ${arrayName}`);
  const arrayStart = source.indexOf("[", start);
  const arrayEnd = arrayName === "productCategories"
    ? source.indexOf("export const products", arrayStart)
    : source.lastIndexOf("];", source.length);
  return source.slice(arrayStart, arrayEnd).split(/\n  \{\n/).slice(1).map((block) => {
    const body = `{\n${block}`;
    return {
      slug: body.match(/slug: "([^"]+)"/)?.[1] ?? "",
      categorySlug: body.match(/categorySlug: "([^"]+)"/)?.[1] ?? "",
      image: body.match(/(?:heroImage|image): "([^"]+)"/)?.[1] ?? "",
    };
  }).filter((item) => item.slug && item.image);
}

const expectedByCategory = {
  "du-lech-tam": "du-lech-tam",
  "du-tron-tam-giua": "du-chinh-tam",
  "du-in-logo": "du-in-logo",
  "nha-bat-di-dong": "nha-bat-di-dong",
};

const categories = parseObjects("productCategories").map((item) => ({ ...item, categorySlug: item.slug }));
const products = parseObjects("products");
const issues = [];

for (const item of [...categories, ...products]) {
  const tags = manifest[item.image];
  if (!tags) {
    issues.push(`${item.slug}: ${item.image} is missing from image manifest`);
    continue;
  }
  const expected = expectedByCategory[item.categorySlug];
  if (expected && !tags.productType.includes(expected)) issues.push(`${item.slug}: expected ${expected}, got ${tags.productType.join(",")}`);
  if (item.slug.includes("nha-bat") && !tags.productType.includes("nha-bat-di-dong")) issues.push(`${item.slug}: nhà bạt cannot use umbrella image`);
  if ((item.slug.includes("in-logo") || item.categorySlug === "du-in-logo") && !tags.productType.includes("du-in-logo")) issues.push(`${item.slug}: in-logo content needs logo/advertising image`);
  if (item.slug.includes("lech-tam") && !tags.productType.includes("du-lech-tam")) issues.push(`${item.slug}: lệch tâm cannot use non-lệch-tâm image`);
}

if (issues.length) {
  console.error("Image mapping validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}
console.log(`Image mapping validation passed for ${categories.length} categories and ${products.length} products.`);
