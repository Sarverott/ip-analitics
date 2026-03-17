const fs = require("fs");
const path = require("path");

function safeMkdir(...pathchain){ /* from main.js::LINES[173:196] then rewritten */
    try{
        fs.accessSync(
            path.resolve(
                ...pathchain
            // __dirname, 
            //     "../dataset",
            //     "./config"
            ),
            fs.constants.R_OK|fs.constants.W_OK
        );
    }catch(err){
        console.debug(err)

        fs.mkdirSync(
            path.resolve(
                ...pathchain
                    // __dirname, 
                    // "../dataset",
                    // "./config"
            )
        );
    }
}

module.exports = safeMkdir 
