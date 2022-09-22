const Figma = require('figma-api');
const {buildTagTree, buildCode, buildCssString} = require('figma-tree-parser');
const findExportedNode = require('../utils/findExportedNode');
const transformNode = require('../utils/transformNode');

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
        const cssStr = buildCssString(tag, 'css');
        console.log(codeStr);
        console.log(cssStr);
        //todo
        //export to file
    })
    return file;
}

module.exports = importFigma;