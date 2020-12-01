const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const PDFpath=''
const IMGpath=''
// Create a document
const doc = new PDFDocument;
const MakePicture=require('./MakePicture')
//const TestData = require('./DataforPDF');


function MakePDF(PDFname,TestData){
    MakePicture.makePicture(TestData)
// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
    doc.pipe(fs.createWriteStream(PDFpath+'outPDF/'+PDFname+'.pdf'));
// doc.pipe(fs.createWriteStream('output.pdf'));

// Embed a font, set the font size, and render some text
    doc.font('fonts/msyh.ttf')
        .fontSize(25)


//项目相关信息
    const ProjectName = "Re0-从零开始的异世界生活"
    const Version = "2.1.5"
    const Date = "2020年10月30日"
    const platform = "Android"
    const DevicesNum = "59"
    const PassRate = "95%"
    const ErrorDevices = 5


//第一页，测试概况
    doc.save()
        .moveTo(0, 0)
        .lineTo(0, 30)
        .lineTo(1000, 30)
        .lineTo(1000, 0)
        .fill("#6070ff");

    doc.fontSize(20)
        .fillColor("white")
        .text('兼容性适配报告', 220, 0,)

//项目logo
    doc.image(IMGpath+'icon.png', 20, 80, {
        scale: 1,
        align: 'center',
        valign: 'center'
    });

//分隔
    doc.moveTo(308,70)
        .lineTo(308,170)
        .stroke()

//通过率饼图
    doc.image(IMGpath+'PassRatePie.png', 310, 40, {
        scale: 0.28,
        align: 'center',
        valign: 'center'
    });




    doc.fontSize(11)
        .fillColor("black")

// doc.text('游戏名称： ${ProjectName}',120,80,)

    doc.text(`游戏名称： ${ProjectName}`, 100, 80, {
            align: 'left'
        }
    );
    doc.text(`测试版本： ${Version}`, 100, 100, {
            align: 'left'
        }
    );
    doc.text(`测试日期： ${Date}`, 100, 120, {
            align: 'left'
        }
    );
    doc.text(`测试平台： ${platform}`, 100, 140, {
            align: 'left'
        }
    );
    doc.text(`通过率： ${PassRate}`, 450, 80, {
            align: 'left'
        }
    );
    doc.text(`测试设备数： ${DevicesNum}`, 450, 110, {
            align: 'left'
        }
    );
    doc.text(`问题设备数： ${ErrorDevices}`, 450, 140, {
            align: 'left'
        }
    );


//问题统计&机型分布图

//机型分布图
    doc.image(IMGpath+'DevicesPie.png', 340, 270, {
        scale: 0.4,
        align: 'center',
        valign: 'center'
    });
//问题分布图
    doc.image(IMGpath+'ProblemPie.png', 40, 270, {
        scale: 0.4,
        align: 'center',
        valign: 'center'
    });

//适配率走势图
    doc.image(IMGpath+'HistoryTrend.png', 0, 520, {
        scale: 1,
        align: 'center',
        valign: 'center'
    });


    doc.fontSize(12)
        .fillColor("#0b0201")

    doc.text(`问题类型分析`, 100, 250, {
            align: 'left'
        }
    );

    doc.text(`机型品牌分析`, 400, 250, {
            align: 'left'
        }
    );

    doc.text(`适配率走势`, 250, 530, {
            align: 'left'
        }
    );


// 兼容性分析页 page
    doc.addPage()

    doc.save()
        .moveTo(0, 10)
        .lineTo(0, 30)
        .lineTo(130, 30)
        .lineTo(130, 10)
        .fill("#7b95ff");

    doc.fontSize(15)
        .fillColor("white")
        .text('1.游戏兼容性分析', 5, 10,)

    doc.fontSize(10)
        .fillColor("#0b0201")

    doc.text(`不兼容问题类型分布`, 40, 50, {
            align: 'left'
        }
    );
    let problemList='安装失败 启动失败  功能错误  UI异常 闪退 黑屏 卡死 其他'
    doc.fontSize(10)
        .fillColor("grey")
        .text(problemList,70,80,{
            width: 1000,
            wordSpacing:28
        })
    doc.fontSize(10)
        .fillColor("black")
        .text(TestData.error.res.InstallFail.length, 90, 115,)
        .text(TestData.error.res.LaunchFail.length,160,115)
        .text(TestData.error.res.FuncError.length,230,115)
        .text(TestData.error.res.UiError.length,300,115)
        .text(TestData.error.res.ForceExit.length,350,115)
        .text(TestData.error.res.Black.length,405,115)
        .text(TestData.error.res.NoRep.length,455,115)
        .text(TestData.error.res.Other.length,505,115)



    let x = 60;
    let y = 100;
    for(let i=0;i<2;i++){
        doc.lineWidth(0.2);
        doc.moveTo(x,y)
            .lineTo(x+470,y)
            .stroke()
        y = y+40
    }


    doc.text(`不兼容品牌分布`, 120, 230, {
            align: 'left'
        }
    );
    doc.image(IMGpath+'errorBrand.png',40, 260, {
        scale: 0.7,
        align: 'center',
        valign: 'center'
    });

    doc.text(`不兼容内存分布`, 380, 230, {
            align: 'left'
        }
    );
    doc.image(IMGpath+'errorRam.png',320, 260, {
        scale: 0.7,
        align: 'center',
        valign: 'center'
    });
    doc.text(`不兼容分辨率分布`, 120, 500, {
            align: 'left'
        }
    );
    doc.image(IMGpath+'errorScreen.png',40, 520, {
        scale: 0.5,
        align: 'center',
        valign: 'center'
    });
    doc.text(`不兼容版本分布`, 380, 500, {
            align: 'left'
        }
    );
    doc.image(IMGpath+'errorSystem.png',320, 520, {
        scale: 0.5,
        align: 'center',
        valign: 'center'
    });


// 性能分析页
    doc.addPage()
    doc.save()
        .moveTo(0, 10)
        .lineTo(0, 30)
        .lineTo(180, 30)
        .lineTo(180, 10)
        .fill("#7b95ff");

    doc.fontSize(15)
        .fillColor("white")
        .text('2.游戏运行性能指标分析', 5, 10,)

    doc.fontSize(7)
        .fillColor("#FF1D0F")
        .text('注：同类平均基于该游戏竞品数据(性能数据平台可查看)，历史平均基于该游戏历史版本数据', 185, 20,{
            oblique:true
        })
//性能数据总体图
    doc.image(IMGpath+'Performance.png',10,60, {
        scale: 0.6,
        align: 'center',
        valign: 'center'
    });



    let x1 = 75;
    let y1 = 450;
    for(let i=0;i<5;i++){
        doc.lineWidth(0.1);
        doc.moveTo(x1,y1)
            .lineTo(x1+470,y1)
            .stroke("grey") //可以接受颜色作为描边
        y1+=40
    }

    let Performanc ='CPU占用率 数据流量  内存占用  帧数率'
    doc.fontSize(10)
        .fillColor("grey")
        .text(Performanc,200,465,{
            width: 1000,
            wordSpacing:45
        })
    const color1 = TestData.summary.res.cpu.Current>=TestData.summary.res.cpu.HistoryAvg?'#32c114':'#ff153b'
    const color2 = TestData.summary.res.data.Current>=TestData.summary.res.data.HistoryAvg?'#32c114':'#ff153b'
    const color3 = TestData.summary.res.memory.Current>=TestData.summary.res.memory.HistoryAvg?'#32c114':'#ff153b'
    const color4 = TestData.summary.res.fps.Current>=TestData.summary.res.fps.HistoryAvg?'#32c114':'#ff153b'
    doc.fontSize(8)
        .fillColor("grey")
        .text('本次测试数据',100,505)
        .text('同类平均数据',100,545)
        .text('历史平均数据',100,585)
        .fillColor(color1)
        .text(TestData.summary.res.cpu.Current+'%',215,505)
        .fillColor(color2)
        .text(TestData.summary.res.data.Current+'kb',310,505)
        .fillColor(color3)
        .text(TestData.summary.res.memory.Current+'MB',390,505)
        .fillColor(color4)
        .text(TestData.summary.res.fps.Current,478,505)
        .fillColor('black')
        .text(TestData.summary.res.cpu.TypeAvg+'%',215,545)
        .text(TestData.summary.res.data.TypeAvg+'kb',310,545)
        .text(TestData.summary.res.memory.TypeAvg+'MB',390,545)
        .text(TestData.summary.res.fps.TypeAvg,478,545)
        .text(TestData.summary.res.cpu.HistoryAvg+'%',215,585)
        .text(TestData.summary.res.data.HistoryAvg+'kb',310,585)
        .text(TestData.summary.res.memory.HistoryAvg+'MB',390,585)
        .text(TestData.summary.res.fps.HistoryAvg,478,585)

    const textInfo='绿色代表性能表现优于历史平均；红色代表性能表现差于历史平均'
    doc.fontSize(7)
        .fillColor("#32c114")
        .text(textInfo.slice(0,2), 325, 625,{
            continued: true
        }).fillColor('grey')
        .text(textInfo.slice(2,15),{
            continued: true
        }).fillColor('#ff153b')
        .text(textInfo.slice(15,17),{
            continued: true
        }).fillColor('grey')
        .text(textInfo.slice(17),{
            continued: true
        });


//性能数据分布页
    doc.addPage()
    doc.save()
        .moveTo(0, 10)
        .lineTo(0, 30)
        .lineTo(160, 30)
        .lineTo(160, 10)
        .fill("#7b95ff");

    doc.fontSize(15)
        .fillColor("white")
        .text('3.游戏运行性能分布', 5, -10,)

    doc.fontSize(10)
        .fillColor("black")
        .text('CPU占用分布', 30, 40,)
        .text('内存占用分布', 30, 230,)
        .text('流量耗用分布', 30, 410,)
        .text('FPS分布', 30, 590,)

//性能数据设备分布图
    doc.image(IMGpath+'CPU_performance.png',10,55, {
        scale: 0.35,
        align: 'center',
        valign: 'center'
    });
    doc.image(IMGpath+'Memory_performance.png',10,245, {
        scale: 0.35,
        align: 'center',
        valign: 'center'
    });
    doc.image(IMGpath+'Network_performance.png',10,425, {
        scale: 0.35,
        align: 'center',
        valign: 'center'
    });

    doc.image(IMGpath+'Fps_performance.png',10,605, {
        scale: 0.35,
        align: 'center',
        valign: 'center'
    });

//top5占用图
    doc.image(IMGpath+'CPU_Devices.png',260,50, {
        scale: 0.315,
    });
    doc.image(IMGpath+'Memory_Devices.png',260,245, {
        scale: 0.315,
        align: 'center',
        valign: 'center'
    });
    doc.image(IMGpath+'Data_Devices.png',260,425, {
        scale: 0.315,
        align: 'center',
        valign: 'center'
    });
    doc.image(IMGpath+'FPS_Devices.png',260,605, {
        scale: 0.315,
        align: 'center',
        valign: 'center'
    });


//问题详情页
    doc.addPage()
    doc.save()
        .moveTo(0, 10)
        .lineTo(0, 30)
        .lineTo(100, 30)
        .lineTo(100, 10)
        .fill("#7b95ff");

    doc.fontSize(15)
        .fillColor("white")
        .text('4.问题详述', 5, 10,)
    if(TestData.summary.res.Summery.Result==true){
        doc.fontSize(10)
            .fillColor("black")
            .text('本次测试无错误类型，故本页不做分析。', 50, 50,)
    }else {
        let array = TestData.error.res.InstallFail.concat(TestData.error.res.LaunchFail).concat(TestData.error.res.ForceExit).concat(TestData.error.res.FuncError).concat(TestData.error.res.Black).concat(TestData.error.res.NoRep).concat(TestData.error.res.UiError).concat(TestData.error.res.Other)
        //const index = TestData.Summery.ProblemDevices
        const Gap =160
        let y2 = 190
        let y3 = 60
        let m=0
        doc.lineWidth(0.2);
        // doc.on('pageAdded', () => doc.text("Page Title"));
        for(let i=0;i<array.length;i++){
            if(i!=0&&i%4==0){
                doc.addPage()
                doc.save()
                    .moveTo(0, 10)
                    .lineTo(0, 30)
                    .lineTo(100, 30)
                    .lineTo(100, 10)
                    .fill("#7b95ff");
                doc.fontSize(15)
                    .fillColor("white")
                    .text('4.问题详述', 5, 10,)
                m=0
            }
            doc.moveTo(50,y2+m*Gap) //横
                .lineTo(550,y2+m*Gap)
                .stroke("grey")
            doc.moveTo(300,y3+m*Gap) //竖
                .lineTo(300,y3+120+m*Gap)
                .stroke("grey") //可以接受颜色作为描边
            doc.fontSize(8)
                .fillColor("grey")
                .text('问题设备：', 350, y3+m*Gap,)
                .text('问题类型：', 350, y3+30+m*Gap,)
                .text('问题步骤：', 350, y3+60+m*Gap,)
                .text('问题摘要：', 350, y3+90+m*Gap,)
                .fillColor("#7b95ff")
                .text(array[i].deviceNum, 400, y3+m*Gap,)
                .text(array[i].FailType, 400, y3+30+m*Gap,)
                .text(array[i].Step, 400, y3+60+m*Gap,)
                .text(array[i].detail, 400, y3+90+m*Gap,)
            doc.image(IMGpath+'Errorimg/'+i+'.png',50,y3+10+m*Gap, {
                scale: 0.2,
                align: 'center',
                valign: 'center'
            });
            m +=1;
        }

    }

//设备详情页
    doc.addPage()
    doc.save()
        .moveTo(0, 10)
        .lineTo(0, 30)
        .lineTo(120, 30)
        .lineTo(120, 10)
        .fill("#7b95ff");

    doc.fontSize(15)
        .fillColor("white")
        .text('5.测试设备汇总', 5, 10,)
    let Devicecontent ='序号 设备型号 内存  分辨率  系统版本 测试结果'
    //列表头
    doc.fontSize(10)
        .fillColor("#0D00FF")
        .text(Devicecontent,65,68,{
            width: 2000,
            wordSpacing:55
        })
    const y4 = 120
    const Gap1 = 30
    let m1 =0
    doc.moveTo(50,60) //横
        .lineTo(550,60)
        .stroke("grey")
    doc.moveTo(50,90) //横
        .lineTo(550,90)
        .stroke("grey")
    for(let i=0;i<TestData.device.res.length;i++){
        if(i!=0&&i%21==0){
            doc.addPage()
            doc.save()
                .moveTo(0, 10)
                .lineTo(0, 30)
                .lineTo(120, 30)
                .lineTo(120, 10)
                .fill("#7b95ff");
            doc.fontSize(15)
                .fillColor("white")
                .text('5.测试设备汇总', 5, 10,)
            let Devicecontent ='序号 设备型号 内存  分辨率  系统版本 测试结果'
            //列表头
            doc.fontSize(10)
                .fillColor("#0D00FF")
                .text(Devicecontent,65,68,{
                    width: 2000,
                    wordSpacing:55
                })
            doc.moveTo(50,60) //横
                .lineTo(550,60)
                .stroke("grey")
            doc.moveTo(50,90) //横
                .lineTo(550,90)
                .stroke("grey")
            m1=0
        }
        doc.moveTo(50,y4+Gap1*m1) //横
            .lineTo(550,y4+Gap1*m1)
            .stroke("grey")
        const color1 = TestData.device.res[i].Result ? 'black':'red'
        doc.fontSize(8)
            .fillColor(color1)
            .text(i+1,70, y4-20+Gap1*m1,)
            .text(TestData.device.res[i].DeviceName, 150, y4-20+Gap1*m1,)
            .text(TestData.device.res[i].Memory, 243, y4-20+Gap1*m1,)
            .text(TestData.device.res[i].Screen,315, y4-20+Gap1*m1,)
            .text(TestData.device.res[i].SystemVersion, 410, y4-20+Gap1*m1,)
        if(TestData.device.res[i].Result==true){
            doc.fontSize(8)
                .text('成功', 520, y4-20+Gap1*m1,)
        }else {
            doc.fontSize(8)
                .text('失败', 520, y4-20+Gap1*m1,)
        }
        m1+=1
    }


// Finalize PDF file
    doc.end();
    console.log('PDF 生成完成-----------'+PDFname)
}

module.exports = {
    MakePDF,
}

