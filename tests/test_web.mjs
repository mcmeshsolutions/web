import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const rootDir = path.resolve(import.meta.dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter((f) => f.endsWith('.html')).sort();

test('repository contains expected HTML pages', () => {
  assert.ok(htmlFiles.length >= 10, `expected at least 10 html files, found ${htmlFiles.length}`);
});

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  test(`${file}: valid HTML5 shell and metadata`, () => {
    assert.match(content, /^\s*<!doctype html>/i, `${file} must start with <!doctype html>`);
    assert.match(content, /<meta\s+charset=["']?utf-8["']?\s*\/?>/i, `${file} must declare utf-8 charset`);
    assert.match(content, /<meta\s+name=["']?viewport["']?/i, `${file} must declare viewport meta`);
    assert.match(content, /<title>[^<]+<\/title>/i, `${file} must have a non-empty <title>`);
  });

  test(`${file}: inline scripts parse without syntax errors`, () => {
    const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let count = 0;
    while ((match = scriptRegex.exec(content)) !== null) {
      const code = match[1].trim();
      if (!code) continue;
      count += 1;
      assert.doesNotThrow(
        () => new vm.Script(code, { filename: `${file}#script-${count}` }),
        `JS syntax error in ${file} script #${count}`
      );
    }
  });

  test(`${file}: inline styles have balanced braces`, () => {
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let match;
    while ((match = styleRegex.exec(content)) !== null) {
      const css = match[1];
      const opens = (css.match(/\{/g) || []).length;
      const closes = (css.match(/\}/g) || []).length;
      assert.equal(opens, closes, `unbalanced CSS braces in ${file}: ${opens} '{' vs ${closes} '}'`);
    }
  });
}
