# 利用Markdown撰写文档

## 区块元素

### 段落和换行

段落由一个或多个连续文本组成，前后有一个以上空行

普通段落不应该用空格或制表符来缩进  
两个空格然后回车可以强制Markdown插入\<br/>换行，不过不建议通过这种方式排版


### 标题

1. 类Setext形式

        This is a title
        ===============

        This is a title
        --------------

2. 类Atx形式

    在行首插入 1 到 6 个 # ，对应到标题 1 到 6 阶

        # 1阶

        ## 2阶

        ### 3阶

### 区块引用

每行前加>：

    > 这是一段引用的文字

    > 格式就像email里的引用一样的

> 这是一段引用的文字

> 格式就像email里的引用一样的

### 列表

#### 无序号

* 这个前面是 *

+ 这个前面是 +

- 这个前面是 -

#### 有序号

1. 序号1

2. 序号2

2. 其实序号的数字无所谓

8. Markdown会自动增加序号


### 代码区块

以四个空格或一个制表符缩进即可称为代码区块

    一阶缩进（四个空格或一个制表符）会被解释成代码区块

    直到取消缩进

为不同语言代码着色

``` javascript
    var a = 0;
    console.log('hi');

    function sayHi() {
        console.log('hi');
    }

    sayHi();
```

### 表格

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### 分割线

    ***
***

    ---

---

    ___

___


## 区段元素

### 链接

* 行内式

        This is [an example](http://example.com/ "Title") inline link.

    This is [an example](http://example.com/ "Title") inline link.

* 参考式

        This is [an example][id] reference cycle link.

        [id]: http://example.com/  "Optional Title Here"

    This is [an example][id] reference cycle link. 

    Id can be placed in any where of the document.

    [id]: http://example.com/  "Optional Title Here"

    隐式链接可以省略制定链接标记

        [Google][]
    
        [Google]: http://google.com

    [Google][]

    [Google]: http://google.com

* 自动链接

        <http://google.com>
    
    <http://google.com>


### 强调

    *single asterisks*

    _single underscores_

    **double asterisks**

    __double underscores__

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__


### 代码

标记一小段行内代码

    Use the `printf()` function.

Use the `printf()` function.

如果要在代码区段内插入反引号，你可以用多个反引号来开启和结束代码区段：

``There is a literal backtick (`) here.``


### 图片

图片的标记和语法一样，只是前面多了`!`

    行内式：
    ![Alt text](/path/to/img.jpg)
    ![Alt text](/path/to/img.jpg "Optional title")

    参考式：
    ![Alt text][id]
    [id]: url/to/image  "Optional title attribute"
