const fs = require('fs');
const cheerio = require('cheerio');
let content = fs.readFileSync('./raw.html');

var info={variableName: '',script:'',variable:''};


$ = cheerio.load(content);
var textNode = $('body script').map((i, x) => x.children[0])
                                 .filter((i, x) => x && x.data.match(/flashvars/)).get(0);

info.script = textNode.data.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');  

let matchResult = textNode.data.match(/flashvars_\d+/);
info.variableName = matchResult[0];

let playerObjList={};                            
// fs.writeFileSync('./data.js', info.script);
eval(info.script)
eval('info.variable='+info.variableName);
// let self = global;
console.log(info.variable['mediaDefinitions']);
// console.log(media_1	);