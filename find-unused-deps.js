const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const deps = Object.keys({
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
});

const exts = [".js", ".jsx", ".ts", ".tsx"];
const ignoreDirs = ["node_modules", ".git", "android", "ios"];

let files = [];

function getFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (ignoreDirs.includes(file)) return;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getFiles(fullPath);
    } else if (exts.includes(path.extname(file))) {
      files.push(fullPath);
    }
  });
}

getFiles(process.cwd());

const unused = [];

for (const dep of deps) {
  const regex = new RegExp(`['"\`]${dep}['"\`]`);
  let found = false;
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    if (regex.test(content)) {
      found = true;
      break;
    }
  }
  if (!found) {
    unused.push(dep);
  }
}

if (unused.length === 0) {
  console.log("✅ No unused dependencies found.");
} else {
  console.log("📦 Unused dependencies:");
  unused.forEach(dep => console.log(" - " + dep));
}
