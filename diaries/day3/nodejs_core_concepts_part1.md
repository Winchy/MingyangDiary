Node.js Core Concepts
====================

## Blocking vs Non-Blocking

## The Node.js Event Loop, Timers, and `process.nextTick()`

### Waht is the Event Loop?

Event loop 让Node.js可以将异步操作交给系统内核（System kernel）去执行，由于系统内核一般来说是多线程的，它们可以同时在后台执行多条任务，然后将执行结果加入**poll**队列返回给Node.js。

### Event Loop Explained

Node.js启动时，先初始化event loop，处理输入，规划timer，调用`process.nextTick()`，然后开始处理event loop。

       ┌───────────────────────────┐
    ┌─>│           timers          │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    │  │     pending callbacks     │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    │  │       idle, prepare       │
    │  └─────────────┬─────────────┘      ┌───────────────┐
    │  ┌─────────────┴─────────────┐      │   incoming:   │
    │  │           poll            │<─────┤  connections, │
    │  └─────────────┬─────────────┘      │   data, etc.  │
    │  ┌─────────────┴─────────────┐      └───────────────┘
    │  │           check           │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    └──┤      close callbacks      │
       └───────────────────────────┘

*Windows和Unix/Linux的实现略有不同，实际上会有7或8个步骤，但最重要的几个就在上图*

- 每个阶段都有自己的FIFO队列，进入每个阶段时，会首先执行这个阶段的特定操作，然后调用该阶段队列中的回调函数，知道队列被清空或者调用次数达到上限，之后进入下一阶段。

- **poll**阶段的队列由内核插入，所以该阶段的队列可以在被处理的过程中同时被插入。


## Phases

### timer

传递给定时器的时间设定的是定时器的阈值（threshold），而不是定时器执行的准确时间。

例如：设定一个定时器的阈值时100ms，然后开始一个执行时间为95ms的一不操作（如读取一个文件），当event loop进入**poll**阶段后，由于此时**poll**阶段的队列为空，所以它会等待下一个timer的阈值到来，当95ms过去以后，异步操作完成并插入到**poll**队列，这时由于还在**poll**阶段，该异步操作会被从队列中取出并执行回调，假设回调执行的时间是10ms，那定时器的执行就会被推迟到10ms之后，也就是说从设定阈值到执行，定时器所用的时间是105ms，而不是确切的100ms

### peding callbacks

该阶段执行一些系统回调，如某些TCP错误。

### poll

该阶段有两个主要函数：

1. Calculating how long it should block and poll for I/O, then

2. Processing events in the poll queue.

进入该阶段时

- 队列不为空，遍历队列执行同步回调；

- 队列为空

    - 如果有通过`setImmediate()`计划执行的脚本，event loop会结束该阶段进入check阶段执行计划脚本；

    - 否则等待回调加入队列；

当**poll**队列为空时，event loop会检查是否有已经达到阈值的定时器，如果有的话，event loop会折回timer阶段执行定时器回调。

### check

`setImmediate()`的回调会在该阶段执行。

### close callbacks

`close`事件会在该阶段由`process.nextTick()`或socket及句柄（handle）的关闭触发。

---

## 问题：

以下脚本的输出

``` javascript

    setTimeout(() => {
        console.log(2);
    }, 0);

    let promise = new Promise((resolve, reject) => {
        resolve(1);
    });


    promise.then(ret => console.log(ret));

```

结果：

    1
    2

原因：

- `setTimeout`设置了一个阈值为0的定时器，timer阶段事件还没有超过阈值，进入下一阶段；

- `new Promise()`立即完成，结果插入**poll**队列；

- 进入**poll**阶段后，**poll**队列不为空，执行回调，输出`1`；

- 达到定时器阈值，回到timer阶段执行定时器回调，输出`2`；