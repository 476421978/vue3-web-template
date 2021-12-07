export const dataList = [
  {
    title: '今日访问量',
    data: '+1000',
    bottomTitle: '总访问量',
    totalSum: '100万+',
    extra: {
      data: 1000,
      data1: 2350
    }
  },
  {
    title: '新增用户',
    data: '+500',
    bottomTitle: '总用户量',
    totalSum: '200万+',
    extra: {
      data: 700,
      data1: 968
    }
  },
  {
    title: '当月销售额',
    data: '￥50000',
    bottomTitle: '累计销售额',
    totalSum: '2000万+',
    extra: {
      data: 80
    }
  },
  {
    title: '当月订单量',
    data: '189笔',
    bottomTitle: '累计订单量',
    totalSum: '1万+',
    extra: {
      data: 80
    }
  }
]

export const option = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [
    {
      data: [1, 22, 3, 44, 5, 65, 7],
      type: 'line',
      areaStyle: {}
    }
  ]
}

export const optionBar = {
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130, 230, 330, 150, 120, 200],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}

export const optionLine = {
  color: ['#37A2FF'],
  // title: {
  //   text: 'Gradient Stacked Area Chart'
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  // legend: {
  //   data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
  // },
  // toolbox: {
  //   feature: {
  //     saveAsImage: {}
  //   }
  // },
  grid: {
    height: 100,
    left: '0%',
    right: '0%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: [
    {
      show: false,
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      show: false,
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: 'rgba(128, 255, 165)'
        //   },
        //   {
        //     offset: 1,
        //     color: 'rgba(1, 191, 236)'
        //   }
        // ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [0, 140, 232, 101, 264, 90, 340, 250]
    }
  ]
}
