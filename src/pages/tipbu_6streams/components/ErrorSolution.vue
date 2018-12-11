<template>
<v-layout row>
  <v-flex xs12>
    <v-widget title="异常处理方法：" :content-bg="$vuetify.theme.primary">
      <div slot="widget-content">
        <v-data-table
          :headers="solution.tableHeaders"
          :items="solution.data"
          :hide-actions="true"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
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
</template>

<script>
import VWidget from '@/components/VWidget';
import { stationApi } from '../api';

export default {
  components: { VWidget },
  props: ['stationId', 'errorType'],
  data () {
    return {
      scrollSettings: {
        maxScrollbarLength: 160
      },
      solution: {
        tableHeaders: [
          { text: 'Error code', value: 'errorCode' },
          { text: 'Error info', value: 'errorInfo' },
          { text: 'Error rootc', value: 'errorRoot' },
          { text: 'Error action', value: 'errorAction' },
          { text: 'Count', value: 'count' },
          { text: 'Action', value: 'errorCode' }
        ],
        data: [
          {
            errorCode: '',
            errorInfo: '',
            errorRoot: '',
            errorAction: '',
            acount: ''
          }
        ]
      }
    };
  },
  mounted () {
    stationApi.errorSolution.fetch({
      areaID: this.stationId,
      errorType: this.errorType
    }).then(res => {
      console.log(res.data);
    });
  }
};
</script>

<style lang='stylus' scoped>

</style>