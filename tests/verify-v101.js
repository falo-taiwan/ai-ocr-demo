const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const sw = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

assert(html.includes("v1.01"), "index.html should show version v1.01");
assert(readme.includes("v1.01"), "README.md should document version v1.01");
assert(sw.includes("ocr-component-v101"), "service worker cache should be bumped for v1.01");

assert(html.includes('id="runModelAAnalysisButton"'), "UI should include Gemini model A analysis button");
assert(html.includes("async function runModelACloudAnalysis"), "script should implement Gemini model A cloud analysis");
assert(html.includes("Gemini 模型 A 分析成功"), "audit log should record model A analysis success");

[
  "nanoTemplateTitle",
  "saveNanoTemplateButton",
  "createNanoTemplateButton",
  "deleteNanoTemplateButton",
  "restoreNanoTemplatesButton"
].forEach((id) => {
  assert(html.includes(`id="${id}"`), `Nano Prompt template control missing: ${id}`);
});

assert(html.includes("falo_nano_prompt_templates_v101"), "Nano Prompt templates should persist with v1.01 storage key");
assert(html.includes("DEFAULT_NANO_TEMPLATES"), "Nano Prompt templates should have editable defaults");

console.log("v1.01 checks passed");
