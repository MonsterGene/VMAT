import { _isObject, _isArray } from '../../../../util/utils';
/**
 * @param {*} params
 * @param {*} t
 * @param {*} cb
 * @param {object} opts - 浮层配置项
 * @param {object} opts.seriesName
 * @param {boolean} opts.seriesName.show
 * @param {string} opts.seriesName.color
 * @param {string} opts.seriesName.formatter
 * @param {object} opts.legend
 * @param {boolean} opts.legend.show
 * @param {object} opts.dataName
 * @param {boolean} opts.dataName.show
 * @param {string} opts.dataName.color
 * @param {string} opts.dataName.formatter
 * @param {object} opts.dataValue
 * @param {boolean} opts.dataValue.show
 * @param {string} opts.dataValue.color
 * @param {string} opts.dataValue.formatter
 * @param {(string|array)} opts.dataValue.conversion
 * @param {number} opts.dataValue.conversionCondition
 * @param {object} opts.countTotal
 * @param {boolean} opts.countTotal.isCount
 * @param {string} opts.countTotal.nameColor
 * @param {string} opts.countTotal.valueColor
 *  */
const defaultFormatterFunction = (params, t, cb, opts) => {
  let seriesInfo = ``;
  if (opts.seriesName && opts.seriesName.show) {
    let sStr = params[0].seriesName;
    let styleStr = '';
    if (opts.seriesName.formatter) {
      sStr = opts.seriesName.formatter.replace(/\$0/, sStr);
    }
    if (opts.seriesName.color) {
      styleStr += `color:${opts.seriesName.color};`;
    }
    seriesInfo += `
      <div style="${styleStr}">${sStr}</div>
    `;
  }

  /**
   * @param {(number|string)} value - 需要格式化的值
   * @param {(string|array)} cvs - 单位换算规则
   * @param {number} cvsCon - 单位进位规则
   */
  const formatValueText = function (value, cvs, cvsCon) {
    if (typeof cvs === 'string') {
      return value + cvs;
    } else if (_isArray(cvs)) {
      value = Number(value);
      let acc = cvs.reduce((acc, cur, i, arr) => {
        if (acc.finish) return acc;
        if (cvsCon < 1) {
          if (arr[i + 1]) {
            if (acc.val > arr[i + 1][1] * cvsCon) {
              acc.val = acc.val / cur[1];
              acc.lv++;
            } else {
              acc.finish = true;
            }
          } else {
            acc.finish = true;
          }
        } else {
          if (arr[i + 1]) {
            if (acc.val > arr[i + 1][1]) {
              acc.val = acc.val / cur[1];
              acc.lv++;
            } else {
              acc.finish = true;
            }
          } else {
            acc.finish = true;
          }
        }
        console.log(acc);
        return acc;
      }, {
        lv: 0,
        val: value,
        finish: false
      });
      return (acc.val).toFixed(2) + cvs[acc.lv][0];
    } else {
      return value;
    }
  };

  const makeValueText = itemValue => {
    let itemValueText = '';
    if (opts.dataValue && opts.dataValue.show) {
      let t;
      if (opts.dataValue.formatter) {
        t = opts.dataValue.formatter.replace(/\$0/, itemValue);
      } else if (opts.dataValue.conversion) {
        t = formatValueText(itemValue, opts.dataValue.conversion, opts.dataValue.conversionCondition || 0.9);
      } else {
        t = itemValue;
      }
      let styleStr = opts.dataValue.color && `color:${opts.dataValue.color};` || '';
      itemValueText = `
        <span style="${styleStr}">${t}</span>
      `;
    }
    return itemValueText;
  };

  let total = 0;
  
  params.forEach(item => {

    let legendStr = '';
    if (opts.legend && opts.legend.show) {
      legendStr = `
        <div style="background:red;width:10px;height:10px;line-height:100%;display:inline-block"></div>
      `;
    }

    let itemNameText = '';
    if (opts.dataName && opts.dataName.show) {
      let t = '';
      let styleStr = '';
      if (opts.dataName.formatter) {
        t = opts.dataName.formatter.replace(/\$0/, item.seriesName);
      } else {
        t = item.seriesName;
      }
      if (opts.dataName.color) {
        styleStr += `color: ${opts.dataName.color};`;
      }
      itemNameText = `
        <span style="${styleStr}">${t}</span>
      `;
    }

    let itemValue = Number(item.data[item.seriesName]);
    let itemValueText = makeValueText(itemValue);
    if (opts.countTotal && opts.countTotal.isCount) {
      total += itemValue;
    }
    console.log(itemValue, itemValueText);
    seriesInfo += `
      <div>
        ${legendStr}
        ${itemNameText}
        ${itemValueText}
      </div>
    `;
  });
  let totalText = '';
  if (opts.countTotal && opts.countTotal.isCount) {
    totalText = makeValueText(total);
    let totalStyleStr = '';
    if (opts.legend && opts.legend.show) {
      totalStyleStr = `padding-left: 10px`;
    }
    let totalNameColor = opts.countTotal && opts.countTotal.nameColor && 'color:' + opts.countTotal.nameColor + ';' || '';
    let totalValueColor = opts.countTotal && opts.countTotal.nameColor && `color:${opts.countTotal.valueColor};` || '';
    seriesInfo += `
      <div style="${totalStyleStr}">
        <span style="${totalNameColor}">总和</span>
        <span style="${totalValueColor}">${totalText}</span>
      </div>
    `;
  }
  console.log(seriesInfo);
  return seriesInfo;
};


/**
 * 
 * @param {object} opts - 自定义选项
 * @param {string} opts.trigger - 触发方式，默认为'axis'，可选：'item'，'none'
 * @param {object} opts.axisPointer - 坐标轴指示器配置项，具体参考echarts官网，默认为{type: 'shadow'}
 * @param {string} opts.backgroundColor - 提示框背景色
 * @param {(object|string)} opts.formatter - 自定义格式化模板
 * @param {boolean} opts.showContent - 是否显示浮框层，默认为true
 * @param {boolean} opts.alwaysShowContent - 是否总是显示浮框层，默认为false
 * @param {number} opts.showDelay - 浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
 * @param {number} opts.hideDelay - 浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
 * @param {boolean} opts.enterable - 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
 * @param {string} opts.renderMode - 浮层的渲染模式，可选'html'(默认),'richText'
 * @param {boolean} opts.confine - 是否将 tooltip 框限制在图表的区域内。默认false
 * @param {number} opts.transitionDuration - 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动， 默认0.4。
 * @param {(string|array|function)} opts.position - 提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。具体参考官网说明。
 * @param {string} opts.borderColor - 提示框浮层的边框颜色。
 * @param {string} opts.borderWidth - 提示框浮层的边框宽，默认0。
 * @param {(number|array)} opts.padding - 提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
 * @param {object} opts.textStyle - 提示框浮层的文本样式。
 * 
 */
export const ChartTooltip = function (opts = {}) {
  const _obj = {};
  _obj.trigger = opts.trigger || 'axis';
  _obj.axisPointer = opts.axisPointer || { type: 'shadow' };
  _obj.backgroundColor = opts.backgroundColor || '#FFF0';
  if (typeof opts.formatter === 'string') {
    _obj.formatter = opts.formatter;
  } else if (_isObject(opts.formatter)) {
    _obj.formatter = function (a, b, c) {
      return defaultFormatterFunction(a, b, c, opts.formatter);
    };
  }
  _obj.showContent = opts.showContent || true;
  _obj.alwaysShowContent = opts.alwaysShowContent || false;
  if (opts.showDelay) {
    _obj.showDelay = opts.showDelay;
  }
  if (opts.hideDelay) {
    _obj.hideDelay = opts.hideDelay;
  }
  _obj.enterable = opts.enterable || false;
  _obj.renderMode = opts.renderMode || 'html';
  _obj.confine = opts.confine || false;
  _obj.transitionDuration = opts.transitionDuration || 0.4;
  if (opts.position) {
    _obj.position = opts.position;
  }
  if (opts.borderColor) {
    _obj.borderColor = opts.borderColor;
  }
  if (opts.borderWidth) {
    _obj.borderWidth = opts.borderWidth;
  }
  if (opts.padding) {
    _obj.padding = opts.padding;
  }
  if (opts.textStyle) {
    _obj.textStyle = opts.textStyle;
  }
  return _obj;
};

const defaultTooltipOption = {
  backgroundColor: 'rgba(51, 51, 204, 0.5)',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  borderWidth: 5,
  formatter: {
    dataName: { show: true, color: '#ffcc33' },
    dataValue: {
      show: true,
      color: '#99ff00',
      conversion: [['KWH', 1], ['M·KWH', 1000000]],
      conversionCondition: 100000
    }
  }
};

export const DefaultChartTooltip = ChartTooltip(defaultTooltipOption);