const express = require('express');
const history = require('connect-history-api-fallback');
// const compression = require('compression')
const app = express()

//下面代码需要写到静态资源托管之前
// app.use(compression())
app.use(history());
app.use(express.static('./dist'))


app.listen(8093,() => {
    console.log('server  running at http://127.0.0.1')
})