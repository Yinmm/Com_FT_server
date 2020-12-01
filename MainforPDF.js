const DownPic = require('./DownloadErrorimg')
const MakePDF = require('./MakePDF')


async function main(PDFname,data) {
    await  DownPic.DownloadErrorimg(data)
    await  MakePDF.MakePDF(PDFname,data)
}


module.exports = {
    main,
}

module.exports = {
    main,
}


