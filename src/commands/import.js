const Figma = require('figma-api');
const {buildTagTree, buildCode, buildCssString} = require('figma-tree-parser');
const findExportedNode = require('../utils/findExportedNode');
const transformNode = require('../utils/transformNode');

const importFigma = async () => {
    const api = new Figma.Api({
        personalAccessToken: 'figd_MD77SLFUyvbMYOImzQzTnhn_xHU7BJPpsMKTeGA3'
    });

    const file = await api.getFile('eyLp7ZHQrTO68N7KDuAhlm');
    const nodes = findExportedNode(file.document);
    nodes.forEach(n => {
        transformNode(n);
        const tag = buildTagTree(n);
        const codeStr = buildCode(tag, 'css');
        const cssStr = buildCssString(tag, 'css');
    })
    return file;
}

module.exports = importFigma;