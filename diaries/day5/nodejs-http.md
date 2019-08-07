# 构建web应用

## 解析URL

`url`模块用于处理与解析URL。

### Legacy API

``` javascript
    const url = require('url');
    const myUrl = url.parse('http://user:pass@sub.host.com:8080/p/a/t/h?query=q#has');
    console.log(myUrl);
```

输出如下：

``` javascript
    Url {
    protocol: 'http:',
    slashes: true,
    auth: 'user:pass',
    host: 'sub.host.com:8080',
    port: '8080',
    hostname: 'sub.host.com',
    hash: '#has',
    search: '?query=q',
    query: 'query=q',
    pathname: '/p/a/t/h',
    path: '/p/a/t/h?query=q',
    href: 'http://user:pass@sub.host.com:8080/p/a/t/h?query=q#has' }
```
