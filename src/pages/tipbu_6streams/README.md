## 三处六流专案

### 页面说明

#### 车间布局图页面 layout.vue

显示车间布局图，点击后进入进入线体显示页面 line.vue

#### 生产线页面 line.vue

此页面列出车间所有生产线信息

每条线分线头和机台名

### 信息获取：
后台主机地址： http://10.167.192.146/SixStream/api

#### [状态图例](#/getLegendList)：

路径： `/LineConfig/GetState`

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

#### [线体数据](#/lines)
路径： `/LineConfig/GetLineData`

参数：

参数名称 | 说明 | 示例
------- | ---- | ---
area    | 预留参数，用于以后区分需要显示哪几条线的数据(暂时没有传参数)|

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
      // achievingRate: Number(.2)  // 达成率，前端计算
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

[产出路径](#/station/output/days)： `/GetOutput/getOutputByDay`  
[稼动率路径](#/station/utilization_rate/days)： `/GetUtilizationRate/ByDay`

参数：

参数名称   | 说明       | 示例
--------- | ---------- | ---
start_date | 查询起始日期|
end_date  | 查询截止日期|
line_id   | 线ID       |
area_id   | 工站ID     |


返回数据：
```javascript
// 产出数据格式
{
  success: Boolean,
  message: String,
  data: {
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
[产出路径](#/station/output/hours)： `/GetOutput/getOutputByHour`  
[稼动率路径](#/station/utilization_rate/hours)： `/GetUtilizationRate/ByHour`

参数：

参数名称 | 说明    | 示例
------- | ------- | ---
date    | 查询日期 |
line_id | 线ID    |
area_id | 工站ID  |

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

### [按天获取工站异常次数/时间](#/station/errors/frequency_time/days)
接口路径： `/GetAlertMessage/GetAlertByDay`  
参数：  

参数名称    | 说明
---------  | ---
startDate  |查询开始日期  
endDate    |查询结束日期  
areaid     |工站ID  
lineid     |线ID  


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

### [按类型获取工站异常的次数](#/stations/errors/frequency/days/types)
说明： 查询该工站所有异常，按异常类型统计次数降序排序，返回结果  
接口路径： `/GetAlertMessage/GetErrorTypeCount`  
参数： 

参数名称    | 说明
---------- | ---
startDate  |查询开始时间
endDate    |查询结束时间
lineID     |线ID
areaID     |工站ID

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

### [按类型获取异常的时间](#/station/errors/time/days/types)
说明： 查询该工站所有异常时间，按异常类型统计异常时间，降序排序，返回结果  
接口路径： `/GetAlertMessage/GetErrorTypeDate`  
参数：

参数名称    | 说明
---------- | ---
startDate  | 开始日期
endDate    | 结束日期
lineID     | 线ID
areaID     | 工站ID

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

### [按天获取某个异常的时间和次数趋势](#/station/errors/frequency_time/error/days)
说明： 按天统计该类型异常次数，返回数据  
接口路径： `/GetAlertMessage/GetAlertDayDataByType`  
参数：

参数名称   | 说明    | 示例
--------- | ------- | ---|
startDate | 开始时间 |
endDate   | 结束时间 |
lineID    | 线ID    |
areaID    | 工站ID   |
errorName | 异常描述 |M80-入盤位夾持汽缸異常

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: {
    date: Array(Date String),
    frequency: Array(Int),
    time: Array(Int)
  }
}
```

### [按小时获取异常的次数和时间](#/station/errors/frequency_time/error/hours)
说明： 按天统计该类型异常次数，返回数据  
接口路径： `/GetAlertMessage/GetAlertHourDataByType`  
参数：

参数名称 | 说明           | 示例
-------  | ------------- | ----
date     | 查询日期       | 2018-12-06
errorType| 查询的异常类型 | M80-入盤位夾持汽缸異常
lineID   | 线ID          | 1
areaID   | 工站ID        | 1 

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

### 异常类型的处理方法

#### [获取信息](#/station/error/solution/fetch)
说明： 返回该异常的处理方法  
接口路径： `/AlertConfig/getAlertSolution`  
参数：

参数名称   | 说明    | 示例
--------- |-------- | ---
areaID    | 工站ID  |
errorType | 异常类型 |

返回数据：
```javascript
{
  success: Boolean,
  message: String,
  data: {
    action: String,       // 异常解决方案
    address: String,      // 异常代码2
    alertID: String,      // 异常ID
    code: String,         // 异常代码1
    info: String,         // 异常描述
    rootCourse: String    // 异常原因
  }
}
```

#### [修改信息](#/station/error/solution/edit)
说明： 修改异常的处理方法  
接口路径： `/AlertConfig/updateAlertMessage`  
参数：

参数名称    | 说明             | 示例
---------- | ---------------- | ---
areaID     | 工站ID|
code       | 异常代码  |
info       | 修改后的异常描述  |
rootCourse | 修改后的异常原因  |
action     | 修改后的处理动作  |
alertID    | 错误ID|

返回数据： 
```javascript
{
  success: Boolean,
  message: String
}
```





