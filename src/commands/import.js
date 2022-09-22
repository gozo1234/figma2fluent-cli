const Figma = require('figma-api');
const fs = require('fs');
const {buildTagTree, buildCode, buildCssString} = require('figma-tree-parser');
const findExportedNode = require('../utils/findExportedNode');
const transformNode = require('../utils/transformNode');
const { stringify } = require('querystring');

const importFigma = async (token, fileKey, exportTo = "./figmaExported/") => {
    const api = new Figma.Api({
        personalAccessToken: token
    });

    if(!fs.existsSync(exportTo)) {
        fs.mkdirSync(exportTo);
    }

    const file = await api.getFile(fileKey);
    const nodes = findExportedNode(file.document);
    nodes.forEach(n => {
        transformNode(n, file.components);
        const tag = buildTagTree(n);
        const codeStr = buildCode(tag, 'css');
        const codeFileName = `${exportTo}/${n.name}.tsx`;
        fs.writeFile(codeFileName, codeStr, (err) => {
            if(err) throw err
        })
        
        const cssStr = buildCssString(tag, 'css');
        const cssFileName = `${exportTo}/${n.name}.css`
        fs.writeFile(cssFileName, cssStr, (err) => {
            if(err) throw err
        })
    })
    return file;
}

module.exports = importFigma;