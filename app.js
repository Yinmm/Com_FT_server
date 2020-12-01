const MakePDF = require('./MainforPDF');
const express = require('express');
const history = require('connect-history-api-fallback');
const os = require('os');
const path = require('path');
const fs = require('fs');
// const compression = require('compression')
const app = express()
// 引入body-parser模块
const bodyParser = require('body-parser');
// 配置body-parser模块
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// app.use(compression())
//var networkInterfaces = os.networkInterfaces();
//var ip = networkInterfaces.en0[1].address
//console.log(networkInterfaces);
app.use(history());
app.post('/', (req, res) => {
    // 接收请求参数
    //console.log(JSON.stringify(req.body));
    var value = JSON.stringify(req.body)
    var Jsessionid = JSON.parse(value)
    //console.log(Jsessionid.JSESSIONID)
    //res.redirect("http://10.0.12.154:8093?JESSIONID="+Jsessionid.JSESSIONID)
    res.redirect("http://10.0.12.155:8091?JESSIONID="+Jsessionid.JSESSIONID)

})

app.post('/downloadAdReport', (req,res)=>{
    res.header('Content-Type','application/octet-stream')
    const PDFname=req.body.Name+req.body.version+req.body.id;
    const PDFpath = ''
    if(fs.existsSync(PDFpath+PDFname+'.pdf')){
        return  res.status(200).sendfile(PDFpath+PDFname+'.pdf');
    } else {
        MakePDF.main(PDFname,req.body.data)
    }
    res.send({data:'',meta:{
            status:204,
            msg:'PDF已生成完毕，再次点击即可下载'
    }});
})

app.use(express.static('./dist'))




var server = app.listen(8091,function () {
    var networkInterfaces=os.networkInterfaces();
    var ip = networkInterfaces.en0[1].address
    var host = server.address().address
    //console.log(server.address())
    var port = server.address().port

    console.log("访问地址为 http://%s:%s", ip, port)
});