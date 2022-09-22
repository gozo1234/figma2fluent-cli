const Figma = require('figma-api');
const fs = require('fs');
const {buildTagTree, buildCode, buildCssString} = require('figma-tree-parser');
const findExportedNode = require('../utils/findExportedNode');
const transformNode = require('../utils/transformNode');
const { stringify } = require('querystring');

const importFigma = async (token, fileKey, exportTo) => {
    const api = new Figma.Api({
        personalAccessToken: token
    });

    const file = await api.getFile(fileKey);
    const nodes = findExportedNode(file.document);
    nodes.forEach(n => {
        transformNode(n, file.components);
        const tag = buildTagTree(n);
        const codeStr = buildCode(tag, 'css');
        const codeStrFile = 'codeStr.txs'
        fs.writeFile(codeStrFile, codeStr, (err) => {
            if(err) throw err
        })
        
        const cssStr = buildCssString(tag, 'css');
        const cssStrFile = 'cssStr.txs'
        fs.writeFile(cssStrFile, cssStr, (err) => {
            if(err) throw err
        })
        // console.log(codeStr);
        // console.log(cssStr);
    })
    return file;
}

module.exports = importFigma;