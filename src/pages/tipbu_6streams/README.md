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
产出路径： http://10.167.192.146/Sixstream/api/GetOutput/getOutputByDay
稼动率路径： http://10.167.192.146/Sixstream/api/GetUtilizationRate/ByDay

参数：
star_date  // 查询起始日期

end_date   // 查询截止日期

line_id    // 线ID

area_id    // 工站ID


返回数据：
```javascript
// 产出数据格式
{
  success: Boolean,
  message: String,
  data: [
    {date:}
  ]
    date: Array, // X轴信息
    'Output LineName': Array,//后面都是一样的
  }
}
// 稼动率数据格式
{
  success: Boolean,
  message: String,
  data: {
    date: Array, // X轴信息
    'UtilizationRate LineName': Array,//后面都是一样的
  }
}
```

### 产出与稼动率每小时趋势
产出路径： http://10.167.192.146/Sixstream/api/GetOutput/getOutputByHour 

稼动率路径： http://10.167.192.146/Sixstream/api/GetUtilizationRate/ByHour

参数：  
date  
line_id  
area_id

返回数据：
```javascript
// 产出数据格式
{
  success: Boolean,
  message: String,
  data: {
    hour: Array, // X轴信息
    'Output LineName': Array,//后面都是一样的
  }
}
// 稼动率数据格式
{
  success: Boolean,
  message: String,
  data: {
    hour: Array, // X轴信息
    'UtilizationRate  LineName': Array,//后面都是一样的
  }
}
```

### 异常次数/时间
提交数据：
startDate   // 开始日期

endDate     // 结束日期

stationId   // 工站ID

lineId      // 线ID


返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: {
    date: Array,         // X轴信息
    'Frequency LineName': Array,  // 异常次数
    'Time LineName': Array,       // 异常时间
  }
}
```

### 异常次数按类型降序
说明： 查询该工站所有异常，按异常类型统计次数降序排序，返回结果  
参数：   
startDate   // 查询开始日期  
endDate     // 查询结束日期  
lineId      // 线ID  
stationId   // 工站ID 

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: [
    { type: String, frequency: Int },
    ...//降序
  ]
}
```

### 异常时间按类型降序
说明： 查询该工站所有异常时间，按异常类型统计异常时间，降序排序，返回结果  
参数：  
startDate   // 查询开始日期  
endDate     // 查询结束日期  
lineId      // 线ID  
stationId   // 工站ID

返回数据： 
```javascript
{
  success: Boolean,
  message: String,
  data: [
    {type: String, time: Int}, // 时间单位为秒
    ... // 降序
  ]
}
```

### 异常类型次数每天趋势
说明： 按天统计该类型异常次数，返回数据  
参数：  
startDate     // 查询开始时间  
endDate       // 查询结束时间  
errorType     // 查询异常类型  
lineId        // 线ID  
stationId     // 工站ID

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: {
    date: Array(Date String),
    frequency: Array(Int)
  }
}
```

### 异常类型次数单天每小时趋势
说明： 按天统计该类型异常次数，返回数据  
参数：  
date     // 查询日期  
errorType     // 查询异常类型  
lineId        // 线ID  
stationId     // 工站ID  

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: {
    hour: Array(Date String),
    frequency: Array(Int)
  }
}
```

### 异常类型时间每天趋势
说明： 按天统计该类型异常时间，返回趋势数据  
参数：  
startDate   // 查询开始日期  
endDate     // 查询结束日期  
errorType   // 查询的异常类型  
lineId      // 线ID  
stationId   // 工站ID

返回数据： 
```javascript
{
  success: Boolean,
  message: String,
  data: {
    date: Array(Date String),
    time: Array(Int)
  }
}
```

### 异常类型时间单天每小时趋势
说明： 按天统计该类型异常时间，返回趋势数据  
参数：  
date        // 查询日期  
errorType   // 查询的异常类型  
lineId      // 线ID  
stationId   // 工站ID

返回数据： 
```javascript
{
  success: Boolean,
  message: String,
  data: {
    hour: Array(Datetime String),
    time: Array(Int)
  }
}
```

### 异常类型的处理方法
说明： 返回该异常的处理方法  
参数：  
errorType  // 异常类型

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: {
    code: String,       // 异常代码
    info: String,       // 异常描述
    rootCourse: String, // 异常原因
    action: String      // 处理动作
  }
}
```

### 异常类型处理方法编辑
说明： 修改异常的处理方法  
参数：  
errorType   // 异常类型，用于后台的查询条件  
info        // 修改后的异常描述  
rootCourse  // 修改后的异常原因  
action      // 修改后的处理动作

返回数据： 
```javascript
{
  success: Boolean,
  message: String
}
```





