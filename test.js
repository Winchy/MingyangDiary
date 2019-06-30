setImmediate(() => {
    console.log(3);
});

process.nextTick(() => {
    console.log(4);
});

setTimeout(() => {
    console.log(2);
}, 0);

let promise = new Promise((resolve, reject) => {
    resolve(1);
});


promise.then(ret => console.log(ret));