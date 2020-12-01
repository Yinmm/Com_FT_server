const node_echarts =  require('node-echarts');
const path = require('path');
const IMGpath = ''
// const TestData = require('./DataforPDF');
//通过率
function makePicture(TestData) {
    const rate = TestData.summary.res.Summery.PassRate
    let picname = ''
    let option={}
    let color=[]
    let data=[]
    let width=500
    let height=500

    let problemdata= [
        {value: TestData.error.res.InstallFail.length, name: '安装失败'},
        {value: TestData.error.res.LaunchFail.length, name: '启动失败'},
        {value: TestData.error.res.ForceExit.length, name: '闪退'},
        {value: TestData.error.res.Black.length, name: '黑屏'},
        {value: TestData.error.res.FuncError.length, name: '功能错误'},
        {value: TestData.error.res.NoRep.length, name: '卡死'},
        {value: TestData.error.res.UiError.length, name: 'UI异常'},
        {value: TestData.error.res.Other.length, name: '其他'},
    ]
    let Noproblemdata=[{value:0,name:"无异常问题"}]
    let devices=[
        {value: TestData.summary.res.brand.DevicesNum[0], name: TestData.summary.res.brand.brand[0]},
        {value: TestData.summary.res.brand.DevicesNum[1], name: TestData.summary.res.brand.brand[1]},
        {value: TestData.summary.res.brand.DevicesNum[2], name: TestData.summary.res.brand.brand[2]},
        {value: TestData.summary.res.brand.DevicesNum[3], name: TestData.summary.res.brand.brand[3]},
        {value: TestData.summary.res.brand.DevicesNum[4], name: TestData.summary.res.brand.brand[4]},
        {value: TestData.summary.res.brand.DevicesNum[5], name: TestData.summary.res.brand.brand[5]},
    ]

    let currentAvg = []
    currentAvg.push(TestData.summary.res.cpu.Current,TestData.summary.res.data.Current,TestData.summary.res.memory.Current,TestData.summary.res.fps.Current)
    let TypeAvg = []
    TypeAvg.push(TestData.summary.res.cpu.TypeAvg,TestData.summary.res.data.TypeAvg,TestData.summary.res.memory.TypeAvg,TestData.summary.res.fps.TypeAvg)
    let HistoryAvg=[]
    HistoryAvg.push(TestData.summary.res.cpu.HistoryAvg,TestData.summary.res.data.HistoryAvg,TestData.summary.res.memory.HistoryAvg,TestData.summary.res.fps.HistoryAvg)


    const PassRate_option = {
        toolbox: {
            show: false,
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        color:["#8da2e9",'#c5cce2'],
        series: [
            {
                type: 'pie',
                radius: ['40%', '75%'],
                center:['50%','60%'],
                data: [{
                    value: rate,
                    name: '通过',
                    label:{
                        // color:"red",
                        show:true,
                        formatter:'通过率：{d}%',
                    }},
                    {value: 100-rate,
                        name:'不通过',
                        label:{
                            show:false,
                        }
                    },
                ],
                label:{
                    show:true,
                    position:"center",
                    fontSize:"30",
                    fontWeight:"bold"
                }
            }
        ]
    }


    let optionPie = {
        // tooltip: {
        //     trigger: 'item',
        //     formatter: '{a} <br/>{b}: {c} ({d}%)'
        // },
        color:[],
        series: [
            {
                name:"123",
                type: 'pie',
                radius:'65%',
                center:['50%','50%'],
                selectMode:'single',
                label:{
                    formatter: '{b|{b}：}{c|{c}} ',
                    rich: {
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        c:{
                            lineHeight: 33
                        }
                    }
                },
                data:[]
            }
        ]
    };

    let optionLine = {
        xAxis: {
            type: 'category',
            data: TestData.summary.res.Trend.arrayVersion
        },
        yAxis: {
            show:true,
            type: 'value'
        },
        series: [{
            data: TestData.summary.res.Trend.arrayPassRate,
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            markLine:{data:[{type:'average',name:'均值'}]}
        }]
    };

    let optionLine2 = {
        color:['#1b4f9b','#d30c0c'],
        legend: {
            selectedMode:false,
            data:['台数', '未通过']
        },
        xAxis: {
            type: 'category',
            data: ''
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name:'台数',
            data: [],
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }},
            {
                name:'未通过',
                data: [],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }},
        ]


    }

    let optionLine3 = {
        legend: {
            selectedMode:false,
            data:['本次数据', '同类平均','历史平均'],
            x:"center",
            y:'bottom'
        },
        xAxis: {
            type: 'category',
            data: ['CPU占用率[%]','数据流量[KB]','内存占用[MB]','帧数率[FPS]']
        },
        yAxis: {
            show:false,
            type: 'value'
        },
        series: [{
            name:'本次数据',
            data: [],
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }},
            {
                name:'同类平均',
                data: [],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }},
            {
                name:'历史平均',
                data: [],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }},
        ]
    }

    let optionLine4 = {
        color:["#5c60aa"],
        // legend:{
        //     selectedMode:false,
        //     data:['台数'],
        // },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            show:true,
            type: 'value'
        },
        series: [{
            name:'台数',
            data: [],
            type: 'bar',
            barWidth:'40%',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
        }]
    };

    let optionLine5 = {
        color:["#aa0003"],
        title: {
            text: '',
            x:'center'
        },
        xAxis: {
            type: 'value',
            splitLine:{show: false}
        },
        yAxis: {
            type: 'category',
            data: []
        },
        series: [
            {
                type: 'bar',
                data: [],
                barWidth:'50%',
                label: {
                    normal: {
                        show: true,
                        position: 'right'
                    }
                },
            },

        ]
    };
    changesort=function(type,index){
        const key1 = 'perf'
        const key2 = type
        const sortData = TestData.device.res
        if(index ==1){ //降序
            sortData.sort(sortkey(key1,key2,true))
        }
        if(index==2){ //升续
            sortData.sort(sortkey(key1,key2,false))
        }
        return sortData.slice(0,5)
    }
    sortkey =function(key1,key2,order){
        if(order){
            return (val1,val2)=>{
                return val1[key1][key2]<val2[key1][key2]?1:-1
            }
        }else{
            return (val1,val2)=>{
                return val1[key1][key2]>val2[key1][key2]?1:-1
            }
        }
    }

    MakePicture=function (type) { //1-Passrate 2-problem 3-Devices 4-Trend 5-errorSystem 6-errorBrand 7-errorRam 8-screen

        if(type==1){
            picname = 'PassRatePie'
            option = PassRate_option
        }
        if(type==2){
            if(TestData.summary.res.Summery.Result==true){
                optionPie.series[0].data = Noproblemdata
                optionPie.color = ["#2cea39"]
            }else{
                optionPie.color = ["#840344","#3730a5","#215682","#217e82","#267c3a","#343d22","#bcb045",'#bf3fa9']
                optionPie.series[0].data= problemdata
                //console.log(optionPie.series[0].data)
                //option.series[0].data= problemdata
            }
            option = optionPie
            picname = 'ProblemPie'


        }
        if(type==3){
            optionPie.color=["#840344","#bcb045","#3730a5","#215682","#217e82","#267c3a","#343d22",'#bf3fa9']
            optionPie.series[0].data=devices
            option = optionPie
            picname = 'DevicesPie'
            width=520

        }
        if(type==4){
            option = optionLine
            picname = 'HistoryTrend'
            width = 600
            height=250
        }
        if(type==5){
            optionLine2.xAxis.data=TestData.analyse.res.system_version.system_version
            optionLine2.series[0].data = TestData.analyse.res.system_version.DevicesNum
            optionLine2.series[1].data = TestData.analyse.res.system_version.Devices_error
            option = optionLine2
            picname = 'errorSystem'
            width = 600
            height=400
        }
        if(type==6){
            optionLine2.xAxis.data=TestData.analyse.res.brand.brand
            optionLine2.series[0].data = TestData.analyse.res.brand.DevicesNum
            optionLine2.series[1].data = TestData.analyse.res.brand.Devices_error
            option = optionLine2
            picname = 'errorBrand'
            width = 400
            height=300
        }
        if(type==7){
            optionLine2.xAxis.data=TestData.analyse.res.total_memory.total_memory
            optionLine2.series[0].data = TestData.analyse.res.total_memory.DevicesNum
            optionLine2.series[1].data = TestData.analyse.res.total_memory.Devices_error
            option = optionLine2
            picname = 'errorRam'
            width = 400
            height=300
        }
        if(type==8){
            optionLine2.xAxis.data=TestData.analyse.res.resolution.resolution
            optionLine2.series[0].data = TestData.analyse.res.resolution.DevicesNum
            optionLine2.series[1].data = TestData.analyse.res.resolution.Devices_error
            option = optionLine2
            picname = 'errorScreen'
            width = 600
            height=400
        }
        if(type==9){
            optionLine3.series[0].data = currentAvg
            optionLine3.series[1].data = TypeAvg
            optionLine3.series[2].data = HistoryAvg
            option = optionLine3
            picname = 'Performance'
            width = 1000
            height=500
        }
        if(type==10){
            optionLine4.xAxis.data=['0-10%','10%-20%','20%-30%','30%-50%','50%以上']
            optionLine4.series[0].data=TestData.perform.res.cpu.DevicesNum
            option = optionLine4
            width = 800
            height=400
            picname = 'CPU_performance'
        }
        if(type==11){
            optionLine4.xAxis.data=['0-100MB','100MB-200MN','200MB-500MB','500MB-1000Mb%','1000MB以上']
            optionLine4.series[0].data=TestData.perform.res.memory.DevicesNum
            option = optionLine4
            width = 800
            height=400
            picname = 'Memory_performance'
        }
        if(type==12){
            optionLine4.xAxis.data=['0-100kb','100kb-200kb','200kb-500kb','500kb-1000kb','1000kb以上']
            optionLine4.series[0].data=TestData.perform.res.data.DevicesNum
            option = optionLine4
            width = 800
            height=400
            picname = 'Network_performance'
        }
        if(type==13){
            optionLine4.xAxis.data=['0-10','10-20','20-30','30-50','50以上']
            optionLine4.series[0].data=TestData.perform.res.fps.DevicesNum
            option = optionLine4
            width = 800
            height=400
            picname = 'Fps_performance'
        }
        if(type==14){
            const array = changesort('avg_cpu',1)
            const yData =[]
            const data = []
            yData.push(array[4].DeviceName,array[3].DeviceName,array[2].DeviceName,array[1].DeviceName,array[0].DeviceName)
            data.push(array[4].perf.avg_cpu,array[3].perf.avg_cpu,array[2].perf.avg_cpu,array[1].perf.avg_cpu,array[0].perf.avg_cpu)
            optionLine5.title.text ='CPU占用top5终端[%]'
            optionLine5.yAxis.data = yData
            optionLine5.series[0].data = data
            option = optionLine5
            width = 1200
            height=450
            picname = 'CPU_Devices'
        }
        if(type==15){
            const array = changesort('avg_memory',1)
            const yData =[]
            const data = []
            yData.push(array[4].DeviceName,array[3].DeviceName,array[2].DeviceName,array[1].DeviceName,array[0].DeviceName)
            data.push(array[4].perf.avg_memory,array[3].perf.avg_memory,array[2].perf.avg_memory,array[1].perf.avg_memory,array[0].perf.avg_memory)
            optionLine5.title.text ='内存占用top5终端[MB]'
            optionLine5.yAxis.data = yData
            optionLine5.series[0].data = data
            option = optionLine5
            width = 1200
            height=450
            picname = 'Memory_Devices'
        }
        if(type==16){
            const array = changesort('avg_data',1)
            const yData =[]
            const CPUdata = []
            yData.push(array[4].DeviceName,array[3].DeviceName,array[2].DeviceName,array[1].DeviceName,array[0].DeviceName)
            data.push(array[4].perf.avg_data,array[3].perf.avg_data,array[2].perf.avg_data,array[1].perf.avg_data,array[0].perf.avg_data)
            optionLine5.title.text ='流量占用top5终端[kb]'
            optionLine5.yAxis.data = yData
            optionLine5.series[0].data = data
            option = optionLine5
            width = 1200
            height=450
            picname = 'Data_Devices'
        }
        if(type==17){
            const array = changesort('avg_fps',2)
            const yData =[]
            const data = []
            yData.push(array[4].DeviceName,array[3].DeviceName,array[2].DeviceName,array[1].DeviceName,array[0].DeviceName)
            data.push(array[4].perf.avg_fps,array[3].perf.avg_fps,array[2].perf.avg_fps,array[1].perf.avg_fps,array[0].perf.avg_fps)
            optionLine5.title.text ='FPS top5终端'
            optionLine5.yAxis.data = yData
            optionLine5.series[0].data = data
            option = optionLine5
            width = 1200
            height=450
            picname = 'FPS_Devices'
        }


        node_echarts({
            width:width,
            height:height,
            option:option,
            path: path.join(IMGpath+picname+'.png'),
            enableAutoDispose: false
        })

    }

    for(let i=1;i<=17;i++){
        MakePicture(i)
    }

}

module.exports = {
    makePicture,
}








