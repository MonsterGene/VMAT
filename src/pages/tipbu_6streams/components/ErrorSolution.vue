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
            <td class="text-xs-right">{{ props.item.code }}</td>
            <td class="text-xs-right">
              <v-edit-dialog
                :return-value.sync="props.item.info"
                @save="saveSolution('info', props.item)"
                lazy
              >
                {{ props.item.info }}
                <v-text-field
                  slot="input"
                  v-model="props.item.info"
                  single-line
                  counter
                ></v-text-field>
              </v-edit-dialog>
            </td>
            <td class="text-xs-right">
              <v-edit-dialog
                :return-value.sync="props.item.rootCourse"
                @save="saveSolution('rootCourse', props.item)"
                lazy
              >
                {{ props.item.rootCourse }}
                <v-text-field
                  slot="input"
                  v-model="props.item.rootCourse"
                  counter
                ></v-text-field>
              </v-edit-dialog>
            </td>
            <td class="text-xs-right">
              <v-edit-dialog
                :return-value.sync="props.item.action"
                @save="saveSolution('action', props.item)"
                lazy
              >
                {{ props.item.action }}
                <v-text-field
                  slot="input"
                  v-model="props.item.action"
                  counter
                ></v-text-field>
              </v-edit-dialog>
            </td>
            <!-- <td class="text-xs-center">
              <v-btn color="success">修改</v-btn>
            </td> -->
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
          { text: 'Error code', value: 'errorCode', align: 'center' },
          { text: 'Error info', value: 'errorInfo', align: 'center' },
          { text: 'Error rootc', value: 'errorRoot', align: 'center' },
          { text: 'Error action', value: 'errorAction', align: 'center' },
          // { text: 'Action', value: 'errorCode', align: 'center' }
        ],
        data: [
          {
            errorCode: '',
            errorInfo: '',
            errorRoot: '',
            errorAction: '',
            // acount: ''
          }
        ]
      }
    };
  },
  watch: {
    errorType: {
      handler (val) {
        this.getSolution();
      },
      immediate: true
    }
  },
  methods: {
    getSolution () {
      stationApi.errorSolution.fetch({
        areaID: this.stationId,
        errorType: this.errorType
      }).then(res => {
        const data = res.data;
        if (data.success) {
          this.solution.data = [data.data];
        } else {
          console.log('获取解决异常解决方法失败！');
        }
      });
    },
    saveSolution (evt) {
      console.log(evt);
      stationApi.errorSolution.edit({
        areaID: this.stationId,
        ...evt
      }).then(res => {
        const data = res.data;
        if (!data.success) {
          this.getSolution();
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>