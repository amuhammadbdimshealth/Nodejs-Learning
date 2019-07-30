const fetchData = (callback) => {
    setTimeout(() => {
        callback("Done")
    }, 2000)
}

setTimeout(() => {
    console.log('Timer is done')
    fetchData(text => { 
        console.log(text);
    })
}, 4000)


console.log('Hello');
console.log('Hi');