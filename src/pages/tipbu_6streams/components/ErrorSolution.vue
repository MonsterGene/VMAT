<template>
<v-layout row>
  <v-flex xs12>
    <v-widget title="异常处理方法：" :content-bg="$vuetify.theme.primary">
      <div slot="widget-content">
        <v-dialog v-model="editorDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">编辑异常信息</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Info"
                      v-model="editedItem.info"
                      counter
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Course"
                      v-model="editedItem.rootCourse"
                      counter
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Action"
                      v-model="editedItem.action"
                      counter
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialogClose" :disabled="dialogBtnLoading">取消</v-btn>
              <v-btn color="blue darken-1" flat @click="dialogSave" :loading="dialogBtnLoading">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-data-table
          :headers="solution.tableHeaders"
          :items="solution.data"
          :hide-actions="true"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.code }}</td>
            <td class="text-xs-center">{{ props.item.info }}</td>
            <td class="text-xs-center">{{ props.item.rootCourse }}</td>
            <td class="text-xs-center">{{ props.item.action }}</td>
            <td class="text-xs-center">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
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
      editorDialog: false,
      editedItem: {},
      dialogBtnLoading: false,
      solution: {
        tableHeaders: [
          { text: 'Error code', value: 'errorCode', align: 'center' },
          { text: 'Error info', value: 'errorInfo', align: 'center' },
          { text: 'Error rootc', value: 'errorRoot', align: 'center' },
          { text: 'Error action', value: 'errorAction', align: 'center' },
          { text: 'Action', value: 'errorCode', align: 'center' }
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
    editItem (item) {
      this.editedItem = item;
      this.editorDialog = true;
    },
    dialogClose () {
      this.editorDialog = false;
      this.editedItem = {};
    },
    dialogSave () {
      this.dialogBtnLoading = true;
      stationApi.errorSolution.edit({
        areaID: this.stationId,
        ...this.editedItem
      }).then(res => {
        const data = res.data;
        // if (!data.success) {
          
        //   // this.getSolution();
        // } else {

        // }
        
        setTimeout(() => {
          this.dialogBtnLoading = false;
          this.editorDialog = false;
        }, 2000);
        
      });
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>