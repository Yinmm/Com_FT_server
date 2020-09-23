const express = require('express');
const history = require('connect-history-api-fallback');
//const os = require('os')
// 引入body-parser模块
const bodyParser = require('body-parser');

// const compression = require('compression')
const app = express()


// app.use(compression())
// 配置body-parser模块
//var networkInterfaces = os.networkInterfaces();
//var ip = networkInterfaces.en0[1].address
//console.log(networkInterfaces);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(history());
app.post('/', (req, res) => {
    // 接收请求参数
    //console.log(JSON.stringify(req.body));
    var value = JSON.stringify(req.body)
    var Jsessionid = JSON.parse(value)
    //console.log(Jsessionid.JSESSIONID)
    //res.redirect("http://10.0.12.154:8093?JESSIONID="+Jsessionid.JSESSIONID)
    res.redirect("http://10.0.10.246:8093?JESSIONID="+Jsessionid.JSESSIONID)

})
app.use(express.static('./dist'))


app.listen(8093,() => {
    console.log('server  running at http://127.0.0.1')
})