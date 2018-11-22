## 三处六流专案

### 页面说明

#### 车间布局图页面 layout.vue

显示车间布局图，点击后进入进入线体显示页面 line.vue

#### 生产线页面 line.vue

此页面列出车间所有生产线信息

每条线分线头和机台名

信息获取：
状态图例：
path： /station/state
返回数据：
```
{
  success: Boolean,
  message: String,
  data: [
    { state: '正常', stateCode: '', color: 'green' },
    { state: '待机', stateCode: '', color: 'orange' },
    { state: '异常', stateCode: '', color: 'red' },
    { state: '断网', stateCode: '', color: 'grey' },
    { state: '关机', stateCode: '', color: 'black' }
  ]
}
```
线体数据：
path: /line/info
返回数据：
```
{
  success: Boolean,
  message: String,
  data: [
    {
      name: String,     //工站名称
      state: String,    //状态名称
      output: Int,      //工站产出
      totalTarget: Int, //整线目标
      achievingRate: Float(2) //整线达成率
    },
    ...
  ]
}
```


