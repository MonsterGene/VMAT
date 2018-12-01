<template>
<v-flex lg6 sm12 xs12>
  <v-layout row v-if="yichangShijian.byType.show">
    <v-flex xs12>
      <v-widget :title="'异常类型分析（'+ yichangShijian.byType.date +'）'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
        <div slot="widget-header-action" style="width:260px;display:flex;">
          <v-menu
            :close-on-content-click="false"
            v-model="datePicker[2].menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="datePicker[2].date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="datePicker[2].date" @input="datePicker[2].menu = false"></v-date-picker>
          </v-menu>
          <v-menu
            :close-on-content-click="false"
            v-model="datePicker[3].menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="datePicker[3].date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="datePicker[3].date" @input="datePicker[3].menu = false"></v-date-picker>
          </v-menu>
        </div>
        <div slot="widget-content">
          <e-chart
            ref="shijianByType"
            :path-option="yichangShijian.byType.chartOption"
            height="400px"
            width="100%"
            >
          </e-chart>              
        </div>
      </v-widget>
    </v-flex>
  </v-layout>
  <v-layout row v-if="yichangShijian.byDay.show">
    <v-flex xs12>
      <v-widget :title="'机故时间走势（'+ yichangShijian.byDay.type +'）'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
        <div slot="widget-content">
          <e-chart 
            ref="shijianByDay"
            :path-option="yichangShijian.byDay.chartOption"
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
  <v-layout row v-if="yichangShijian.byHour.show">
    <v-flex xs12>
      <v-widget :title="'机故时间走势('+ yichangShijian.byHour.date +' '+ yichangShijian.byDay.type +')'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
        <div slot="widget-content">
          <e-chart
            ref="shijianByHour"
            :path-option="yichangShijian.byHour.chartOption"
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