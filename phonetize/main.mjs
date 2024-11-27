#!/usr/bin/env node
import {
  mkdir,
  readdir,
  stat,
  readFile,
  writeFile,
  appendFile,
} from "fs/promises";
import { pipelines, TaraskConfig, lib as taraskLib } from "taraskevizer";
import * as path from "path";

const sourceDir = path.resolve(process.argv[2]);
const targetDir = path.resolve(process.argv[3]);
const errLogFile = path.resolve("errors.log");

const cfg = new TaraskConfig({
  j: "always",
  doEscapeCapitalized: false,
});

const additionalChanges = taraskLib.callableDict(
  JSON.parse(await readFile("./additional-changes.json", "utf8")),
);

for (const item of additionalChanges.value) {
  item[0] = new RegExp(item[0], "g");
}

if (!(await stat(targetDir).catch(() => false))) await mkdir(targetDir);

const addStress = (input) =>
  fetch("https://bnkorpus.info/other/rest/conv/naciski", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
    },
    body: input,
  }).then((res) => res.text());

let isFirstError = true;
const addToErrFile = (msg) => {
  if (isFirstError) {
    isFirstError = false;
    msg = Date() + "\n" + msg;
  }
  return appendFile(errLogFile, msg);
};

for (const relFilePath of await readdir(sourceDir, { recursive: true })) {
  if (relFilePath.endsWith("desktop.ini")) continue;
  const sourcePath = path.join(sourceDir, relFilePath);
  const targetPath = path.join(targetDir, relFilePath);
  if ((await stat(sourcePath)).isDirectory()) {
    await mkdir(targetPath, { recursive: true });
    continue;
  }

  readFile(sourcePath, "utf8")
    .then(addStress)
    .then((content) =>
      writeFile(
        targetPath,
        additionalChanges(pipelines.phonetic(content, cfg)),
      ),
    )
    .then(() => {
      process.stdout.write(`[done] ${targetPath}\n`);
    })
    .catch((err) => {
      process.stderr.write(`[error] ${sourcePath}\n`);
      addToErrFile(`[${sourcePath}] ${err.message}\n`);
    });
}
