const fs = require('fs');

const findDeepDivs = () => {
    // We just want to log out the first few levels of div nesting for each page
    const files = fs.readdirSync('./src/pages').filter(f => f.endsWith('.tsx'));
    files.forEach(f => {
        // very rudimentary, not full AST parser
        console.log(`--- ${f} ---`);
    });
};
findDeepDivs();
