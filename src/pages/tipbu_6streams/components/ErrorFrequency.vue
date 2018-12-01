<template>
<v-flex lg6 sm12 xs12>
  <v-layout v-if="yichangCishu.byType.show" row>
    <v-flex xs12>
      <v-widget :title="'机故类型次数分析（'+ yichangCishu.byType.date +'）'" content-bg="#282a30">
        <div slot="widget-header-action" style="width:260px;display:flex;">
          <v-menu
            :close-on-content-click="false"
            v-model="datePicker[0].menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="datePicker[0].date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="datePicker[0].date" @input="datePicker[0].menu = false"></v-date-picker>
          </v-menu>
          <v-menu
            :close-on-content-click="false"
            v-model="datePicker[1].menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="datePicker[1].date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="datePicker[1].date" @input="datePicker[1].menu = false"></v-date-picker>
          </v-menu>
        </div>
        <div slot="widget-content">
          <e-chart
            ref="cishuByType"
            :path-option="yichangCishu.byType.chartOption"
            height="400px"
            width="100%"
            >
          </e-chart>   
        </div>
      </v-widget> 
    </v-flex>
  </v-layout>
  <v-layout v-if="yichangCishu.byDay.show" row>
    <v-flex xs12>
      <v-widget :title="'机故次数走势（'+ yichangCishu.byDay.type +'）'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
        <div slot="widget-content">
          <e-chart
            ref="cishuByDay"
            :path-option="yichangCishu.byDay.chartOption"
            height="400px"
            width="100%"
            >
          </e-chart>
          <v-toolbar flat :color="$vuetify.dark ? 'grey' : 'white'">
            <v-toolbar-title>异常处理方法：</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="table.headers"
            :items="table.desserts"
            :hide-actions="true"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.date }}</td>
              <td class="text-xs-right">{{ props.item.machineName }}</td>
              <td class="text-xs-right">{{ props.item.errorCode }}</td>
              <td class="text-xs-right">{{ props.item.errorInfo }}</td>
              <td class="text-xs-right">{{ props.item.errorRoot }}</td>
              <td class="text-xs-right">{{ props.item.errorAction }}</td>
              <td class="text-xs-right">{{ props.item.count }}</td>
              <td class="text-xs-right">
                <v-btn color="success">修改</v-btn>
              </td>
            </template>
          </v-data-table>
        </div>
      </v-widget>
    </v-flex>
  </v-layout>
  <v-layout v-if="yichangCishu.byHour.show" row>
    <v-flex xs12>
      <v-widget :title="'机故次数走势（'+ yichangCishu.byHour.date +' '+ yichangShijian.byDay.type +'）'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
        <div slot="widget-content">
          <e-chart 
            :path-option="yichangCishu.byHour.chartOption"
            height="400px"
            width="100%"
            >
          </e-chart>   
        </div>
      </v-widget>
    </v-flex>
  </v-layout>
</v-flex>
</template>

<script>
export default {
  data () {
    return {
    };
  }
};
</script>

<style lang='stylus' scoped>

</style>