
//依赖模块
const fs = require('fs');
const async = require('async')
const request = require("request");
const http = require('http')
const mkdirp = require('mkdirp');
const path = require('path');
const IMGpath = ''
// const TestData = require('./DataforPDF');
//本地存储目录
const dir = path.join(__dirname + '/img/Errorimg');

function DownloadErrorimg(data){
    const array = data.error.res.InstallFail.concat(data.error.res.LaunchFail).concat(data.error.res.ForceExit).concat(data.error.res.FuncError).concat(data.error.res.Black).concat(data.error.res.NoRep).concat(data.error.res.UiError).concat(data.error.res.Other)
    for(let i=0;i<array.length;i++){
        const url = 'http://10.0.10.246'+array[i].DevicePath+'/'+array[i].ScreenShot
        console.log(url)
        download2(url,IMGpath+'Errorimg',i+'.png')
    }
    download2('http://10.0.10.246/icon/'+data.IconPath,IMGpath,'icon.png')




}
// var urlArr = [
//     TestData.error_type.FuncError[0].DevicePath+'/'+TestData.error_type.FuncError[0].ScreenShot,
// ];
// urlArr.map(function(val) {
//     // download(val, dir, val.split('daikuan/')[1]);
//     download(val, dir, 'test.png');
// })


// pipe下载图片文件。进程完毕后才会生成。弃用
var download =  function(url, dir, filename){
    request.head(url, function(err, res, body){
        request(encodeURI(url)).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};

function download2 (url, dir, filename) {
    url = encodeURI(url)
    //console.log(url)
    var req = http.get(url,function (res) {
        var imgData ='';
        res.setEncoding('binary');
        res.on('data',function (chunk) {
            imgData +=chunk
        });
        res.on('end',function () {
            fs.writeFileSync(dir + "/" + filename,imgData,'binary')
            // process.exit();
        })
    })

}

module.exports = {
    DownloadErrorimg,
}
//
// const test = '从零开始的异世界生活-无限.png'
// download('http://10.0.10.246/icon/'+test,'./img','icon.png')