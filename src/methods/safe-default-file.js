const fs = require("fs");
const path = require("path");

function safeDefaultFile(contentOfFile, ...pathchain){
    const resolvedPath = path.resolve(...pathchain)

    try{
        fs.accessSync(
          resolvedPath,
          fs.constants.R_OK|fs.constants.W_OK
        );
        //EXISTS
        return [false, resolvedPath, []];
    }catch(err){
        try{
            fs.writeFileSync(
            resolvedPath,
            contentOfFile
            //'<!DOCTYPE html><html><head><title>404 NOT FOUND</title></head><body><h1>ERROR 404</h1><p>not found</p></body></html>'
            );
            return [true, resolvedPath, [err]];
        }catch(unpredictedErr){
            return [false, resolvedPath, [err, unpredictedErr]];
        }
    }
}


module.exports = safeDefaultFile 