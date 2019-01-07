<template>
<v-container grid-list-xl fluid>
  <!-- 顶部 仓库管理 -->
  <o-card :content-bg="$vuetify.theme.primary">
    <div slot="card-content" class="top">
      <v-layout nowarp align-center>
        <v-flex xs12 sm6 lg3 d-flex>
          <span>請選擇倉庫</span>
        </v-flex>
        <v-flex xs12 sm6 lg3 d-flex>
          <Cascader 
            :data="warehouses1" 
            v-model="value1"
            size="large"
          ></Cascader>
        </v-flex>
        <v-flex xs3 sm3 lg3 d-flex>
          <div class="btn_div">
            <v-layout nowarp align-center>
              <v-flex lg4 d-flex>
                <Dialog>
                  <div slot="icon"><v-icon color="green">add</v-icon></div>
                  <div slot="dialog_header">添加数据</div>
                  <div slot="dialog_content">
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Enter BU*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Enter Building*"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Enter Floor*" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </div>
                </Dialog>
              </v-flex>
              <v-flex lg4 d-flex>
                <Dialog>
                  <div slot="icon"><v-icon color="red">delete</v-icon></div>
                  <div slot="dialog_header">刪除数据</div>
                  <div slot="dialog_content">
                    Are you sure?
                  </div>
                </Dialog>
              </v-flex>
              <v-flex lg4 d-flex>
                <Dialog>
                  <div slot="icon"><v-icon color="yellow">edit</v-icon></div>
                  <div slot="dialog_header">修改数据</div>
                  <div slot="dialog_content">
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Enter BU*" required v-model="value1[0]"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Enter Building*" required v-model="value1[1]"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Enter Floor*" required v-model="value1[2]"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </div>
                </Dialog> 
              </v-flex>
              <v-flex lg4 d-flex>
                <Dialog class="col-sm-12 col-md-6 col-lg-6">
                  <div slot="icon"><v-icon color="blue darken-2">list</v-icon></div>
                  <div slot="dialog_header">显示数据</div>
                  <div slot="dialog_content">
                    <v-card>
                      <v-card-title>
                      倉庫信息
                      <v-spacer></v-spacer>
                      <v-text-field
                          v-model="search_warehouse"
                          append-icon="search"
                          label="Search"
                          single-line
                          hide-details
                      ></v-text-field>
                      </v-card-title>
                      
                      <v-data-table
                      :headers="headers"
                      :items="warehouses"
                      :search="search_warehouse"
                      >
                          <template slot="items" slot-scope="props">
                            <td>
                              <v-edit-dialog
                                :return-value.sync="props.item.bu"
                                lazy
                                @save="save"
                                @cancel="cancel"
                                @open="open"
                                @close="close"
                              > {{ props.item.bu }}
                                <v-text-field
                                  slot="input"
                                  v-model="props.item.bu"
                                  :rules="[max25chars]"
                                  label="Edit"
                                  single-line
                                  counter
                                ></v-text-field>
                              </v-edit-dialog>
                            </td>
                            <td class="text-xs-center">{{ props.item.building }}</td>
                            <td class="text-xs-center">{{ props.item.floor }}</td>
                          </template>
                          <template slot="no-data">
                            <v-btn color="primary" @click="initialize">Reset</v-btn>
                          </template>
                          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                              Your search for "{{ search }}" found no results.
                          </v-alert>
                      </v-data-table>
                    </v-card>
                  </div>
                </Dialog>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </o-card>
  
  <!-- 中间 数据操作 -->
  <v-layout warp align-center>
    <v-flex>
      <o-card :content-bg="$vuetify.theme.primary">
        <div slot="card-content" class="show">
          <Datatable dark></Datatable>
        </div>
      </o-card>
    </v-flex>
    
  </v-layout>
</v-container>
</template>

<script>
import VWidget from '@/components/VWidget';   
import Goods from '../components/Combobox_goods';
import Control from '../components/Combobox_control';
import FloatBtn from '../components/FloatBtn';
import { getWarehouse1, getWarehouse } from '../api/warehouse';
import { getMainList } from '../api/mainList';
import Dialog from '../components/dialog';
import OCard from '../components/OCard';
import { Table, Cascader, Button } from 'iview';
import Datatable from '../components/datatable';

export default {
  components: {
    VWidget,
    Goods,
    Control,
    FloatBtn,
    Dialog,
    OCard,
    Cascader,
    Table,
    Button,
    Datatable
  },
  data: () => ({
    selected_bu: '',
    selected_building: '',
    selected_floor: '',
    search: '',
    search_warehouse: '',
    headers: [
      { text: 'BU', align: 'left', sortable: false, value: 'bu' },
      { text: '樓棟', align: 'center', sortable: false, value: 'building' },
      { text: '樓層', align: 'center', value: 'floor' }
    ],
    // 迭代器分页选项
    rowsPerPageItems: [6, 12, 18], // 分页选项设置
    pagination: {
      rowsPerPage: 6  // 默认每页6个卡片
    },
    value1: [],
    data: [
      {
        value: '815',
        label: '815',
        children: [
          {
            value: 'D9',
            label: 'D9'
          }
        ]
      }
    ],
    columns1: [
      { title: '廠商', key: 'vendor', fixed: 'left' },
      { title: 'S/N', key: 'sn' },
      { title: '圖片', key: 'pic' },
      { title: '樓層', key: 'floor' },
      { title: '存放位置', key: 'location' },
      { title: '到貨時間', key: 'arrival_time' },
      { title: '驗收人', key: 'acceptor' },
      { title: '備註', key: 'note' },
      
    ],
    data2: [
      {
        vendor: 24,
        pic: 'inbox',
        sn: 87,
        arrival_time: '1%',
        acceptor: '1%',
        floor: '1F',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        note: '###',
      },
      {
        vendor: 24,
        pic: 'inbox',
        sn: 87,
        arrival_time: '1%',
        acceptor: '1%',
        floor: '1F',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        note: '###',
      },
      {
        vendor: 24,
        pic: 'inbox',
        sn: 87,
        arrival_time: '1%',
        acceptor: '1%',
        floor: '1F',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        note: '###',
      },
    ]
  }),

  computed: {
    items () {
      return getMainList();
    },
    warehouses () {
      return getWarehouse();
    },
    warehouses1 () {
      return getWarehouse1();
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: 'The original data'
        });
      } else if (type === 2) {
        this.$refs.table.exportCsv({
          filename: 'Sorting and filtering data',
          original: false
        });
      } else if (type === 3) {
        this.$refs.table.exportCsv({
          filename: 'Custom data',
          columns: this.columns1.filter((col, index) => index < 4),
          data: this.data2.filter((data, index) => index < 4)
        });
      }
    }      
  }
};

</script>
<style lang='stylus' scoped>
.top
  height: 40px;

</style>