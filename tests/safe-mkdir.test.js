const safeMkdir = require("../src/methods/safe-mkdir.js");
const fs = require("fs")
//const path = require("path")
const UNIXUSAT = Date.now()

test(`before testing`, () => {
    //console.log()
    expect(fs.statSync("/tmp").isDirectory()).toBe(true);
    expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}`)).toBe(false);
    // safeMkdir(`/tmp/UNIXUSAT${UNIXUSAT}`)
    // expect(fs.statSync(`/tmp/UNIXUSAT${UNIXUSAT}`).isDirectory()).toBe(true);
});
test(`trying to make "/tmp/UNIXUSAT${UNIXUSAT}" as new dir`, () => {
    //console.log()
    //expect(fs.statSync("/tmp").isDirectory()).toBe(true);
    //expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}`)).toBe(false);
    const results = safeMkdir(`/tmp/UNIXUSAT${UNIXUSAT}`);
    expect(results[0]).toBe(true);
    expect(results[1]).toBe(`/tmp/UNIXUSAT${UNIXUSAT}`);
    expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}`)).toBe(true);
    expect(fs.statSync(`/tmp/UNIXUSAT${UNIXUSAT}`).isDirectory()).toBe(true);
    //expect(results[2].length).toBe(0);
});
test(`trying to make "/tmp/UNIXUSAT${UNIXUSAT}" again`, () => {
    //console.log()
    //expect(fs.statSync("/tmp").isDirectory()).toBe(true);
    //expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}`)).toBe(false);
    const results = safeMkdir("/tmp", `UNIXUSAT${UNIXUSAT}`);
    expect(results[0]).toBe(false);
    expect(results[1]).toBe(`/tmp/UNIXUSAT${UNIXUSAT}`);
    //expect(results[2].length).toBe(1);
    //expect(fs.existsSync(`/tmp/UNIXUSAT${UNIXUSAT}`)).toBe(true);
    //expect(fs.statSync(`/tmp/UNIXUSAT${UNIXUSAT}`).isDirectory()).toBe(true);
});
