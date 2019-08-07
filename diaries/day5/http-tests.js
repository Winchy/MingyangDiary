const http = require('http');
// url 模块用于处理和解析URL
const url = require('url');

let myUrl = url.parse('http://user:pass@sub.host.com:8080/p/a/t/h?query=q#has');
console.log(myUrl);

myUrl = new URL('http://user:pass@sub.host.com:8080/p/a/t/h?query=q#has')
console.log(myUrl);