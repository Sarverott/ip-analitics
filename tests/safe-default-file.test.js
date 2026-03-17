const safeDefaultFile = require("../src/methods/safe-default-file.js");
const fs = require("fs")
//const path = require("path")
const UNIXUSAT = Date.now()

test(`before testing`, () => {
    //console.log()
    expect(fs.statSync("/tmp").isDirectory()).toBe(true);
    expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}.json`)).toBe(false);
    // safeMkdir(`/tmp/UNIXUSAT${UNIXUSAT}`)
    // expect(fs.statSync(`/tmp/UNIXUSAT${UNIXUSAT}`).isDirectory()).toBe(true);
});
test(`trying to make "/tmp/UNIXUSAT${UNIXUSAT}.json" as new file`, () => {
    //console.log()
    //expect(fs.statSync("/tmp").isDirectory()).toBe(true);
    //expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}`)).toBe(false);
    const results = safeDefaultFile(JSON.stringify({state:"correct",task:"testing"}), `/tmp/UNIXUSAT${UNIXUSAT}.json`);
    expect(results[0]).toBe(true);
    expect(results[1]).toBe(`/tmp/UNIXUSAT${UNIXUSAT}.json`);
    expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}.json`)).toBe(true);
    expect(fs.statSync(`/tmp/UNIXUSAT${UNIXUSAT}.json`).isFile()).toBe(true);
    //expect(results[2].length).toBe(0);
});
test(`trying to make "/tmp/UNIXUSAT${UNIXUSAT}.json" again`, () => {
    //console.log()
    //expect(fs.statSync("/tmp").isDirectory()).toBe(true);
    //expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}`)).toBe(false);
    const results = safeDefaultFile(JSON.stringify({state:"overriding"}), `/tmp`, `UNIXUSAT${UNIXUSAT}.json`);
    expect(results[0]).toBe(false);
    expect(results[1]).toBe(`/tmp/UNIXUSAT${UNIXUSAT}.json`);
    expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}.json`)).toBe(true);
    expect(fs.statSync(`/tmp/UNIXUSAT${UNIXUSAT}.json`).isFile()).toBe(true);
    expect(fs.readFileSync(`/tmp/UNIXUSAT${UNIXUSAT}.json`, {"encoding":"utf-8"})).toBe(JSON.stringify({state:"correct",task:"testing"}));
    //expect(results[2].length).toBe(1);
    //expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}`)).toBe(true);
    //expect(fs.statSync(`/tmp/UNIXUSAT${UNIXUSAT}`).isDirectory()).toBe(true);
});
