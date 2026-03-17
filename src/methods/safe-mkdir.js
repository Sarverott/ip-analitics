const fs = require("fs");
const path = require("path");

function safeMkdir(...pathchain){ /* from main.js::LINES[173:196] then rewritten */
    const resolvedPath = path.resolve(...pathchain)
            // __dirname, 
            //     "../dataset",
            //     "./config"
            //)
    try{
        fs.accessSync(
            resolvedPath,
            // path.resolve(
            //     ...pathchain
            // // __dirname, 
            // //     "../dataset",
            // //     "./config"
            // ),
            fs.constants.R_OK|fs.constants.W_OK
        );
        return [false, resolvedPath, []];
    }catch(err){
        //console.debug(err)
        try{
            fs.mkdirSync(
                resolvedPath
                // path.resolve(
                //     ...pathchain
                //         // __dirname, 
                //         // "../dataset",
                //         // "./config"
                // )
            );
            return [true, resolvedPath, [err]];
        }catch(unpredictedErr){
            return [false, resolvedPath, [err, unpredictedErr]];
        }
    }
}

module.exports = safeMkdir 
