## 三处六流专案

### 页面说明

#### 车间布局图页面 layout.vue

显示车间布局图，点击后进入进入线体显示页面 line.vue

#### 生产线页面 line.vue

此页面列出车间所有生产线信息

每条线分线头和机台名

### 信息获取：
#### 状态图例：

path： http://10.167.192.146/SixStream/api/LineConfig/GetState

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: [
    {
      state: '正常',     // 状态显示文字
      stateCode: '',     // 状态代码
      stateDetails: '',  // 状态描述（预留）
      color: 'green'     // 状态指示颜色
    },
    { state: '待机', stateCode: '', stateDetails: '', color: 'orange' },
    { state: '异常', stateCode: '', stateDetails: '', color: 'red' },
    { state: '断网', stateCode: '', stateDetails: '', color: 'grey' },
    { state: '关机', stateCode: '', stateDetails: '', color: 'black' }
  ]
}
```
#### 线体数据：
路径: http://10.167.192.146/SixStream/api/LineConfig/GetLineData

参数：area //预留参数，用于以后区分需要显示哪几条线的数据

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: [ //按顺序列出该区域所有的线体
    {
      id: Int,          //线体ID
      name: String,     //线体名称
      totalTarget: Int, //整线目标
      achievingRate: Number(.2) // 达成率，前端计算
      stations: [ //按顺序列出该线所有工站
        {
          id: Int,            //工站ID
          name: String,       //工站的名称
          stateCode: String,  //工站状态码
          output: Int         //工站产出
        }
      ]
    },
    ...
  ]
}
```

### 产出与稼动率每天趋势

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: {
    date: Array, // X轴信息
    'Output LineName': Array,//后面都是一样的
    'utilizationRate lineName LineName': Array,//后面都是一样的
  }
}
```

### 产出与稼动率每小时趋势

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: {
    hour: Array, // X轴信息
    'Output LineName': Array,//后面都是一样的
    'utilizationRate lineName LineName': Array,//后面都是一样的
  }
}
```


