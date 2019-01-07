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
      <v-widget title="数据展示" :content-bg="$vuetify.theme.primary">
        <div slot="widget-header-action">
          <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </div>
        <div slot="widget-content" class="show">
          <!-- 数据迭代器 -->
          <v-data-iterator
            :items="items"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            :search="search"
            content-tag="v-layout"
            no-data-text="$vuetify.noDataText"
            row
            wrap
          >
            <!-- 工具栏 -->
            <v-toolbar
              slot="header"
              class="mb-2"
              color="primary"
              flat
            >
            <v-layout warp align-center>
            <v-flex lg8>
              <Control></Control>
            </v-flex>
            <v-flex lg4>
              <Goods class="goods"></Goods>
            </v-flex>
            </v-layout>
            </v-toolbar>
            <!-- 数据展示 -->
            <v-flex
              slot="item"
              slot-scope="props"
              xs12
              sm4
              md3
              lg2
            >
              <v-card>
                <v-card-title>
                  <h5>{{ props.item.name }}</h5>
                  <float-btn></float-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense class="show">
                  <v-list-tile>
                    <v-list-tile-content>費用來源:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.cost_source }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex
              slot="item"
              slot-scope="props"
              xs12
              sm4
              md3
              lg2
            >
              <!-- 数据展示卡片 -->
              <v-card>
                <v-card-title>
                  <h5>{{ props.item.name }}</h5>
                  <float-btn></float-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense class="show">
                  <v-list-tile>
                    <v-list-tile-content>費用來源:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.cost_source }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>申請單號:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.request_no }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>廠商:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.vendor }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>圖片:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.pic }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>S/N:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.sn }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Cisco編號:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.cisco_code }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>財產編號:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.asset_code }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>管制編號:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.control_code }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>歸檔號:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.archive_no }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>關務編號:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.cunstom_code }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>校驗管制編號:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.check_control_no }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>數量:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.quantity }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>到貨時間:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.arrival_time }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>驗收人:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.acceptor }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>領用時間:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.use_time }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>領用人/負責人:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.use_person }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>樓層:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.floor }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>存放位置:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.location }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Chamber尺寸(內部):</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.chamber_size_in }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Chamber尺寸(外部):</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.chamber_size_ex }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Chamber測試溫度範圍:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.chamber_temperature }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>處理發熱能力:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.heat_treat_capacity }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>電源:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.power_supply }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>功率:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.power }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>用水規格:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.water_norm }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>使用狀態:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.use_status }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>濕氣規格:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.moisture_norm }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>用氣規格:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.gas_norm }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>測試CELL數量:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.cell_num }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>UUT功率數量:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.UUT_power_num }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>UUT功率規格:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.UUT_power_norm }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>熱/冷命令:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.hot_cold_cmd }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>開始/結束命令:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.start_end_cmd }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>保修截止日期:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.repair_time }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>故障時間:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.failt_time }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>故障現象:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.fault_phenomenon }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>故障原因:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.fault_cause }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>維修內容:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.repair_content }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>維修人員:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.repairman }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>規格說明書:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.specification }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>維修人員:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.repairman }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>備註:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.note }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>申請時間:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.request_time }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Project Name(機種):</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.project_name }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>需求人:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.demander }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>物品名稱:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.item_name }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>型號/規格:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.model }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>物品數量:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.item_num }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>單價:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.item_price }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>使用總金額:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.total_amount }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>PPV/NRE#:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.ppv_nre }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>入庫管制編號條碼:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.inbound_control_code }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <!-- 无显示数据重置 -->
            <template slot="no-data">
              <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
              no data
            </template>
            <!-- 无搜索结果提示 -->
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-iterator>
        </div>
      </v-widget>
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
import { Cascader } from 'iview';

export default {
  components: {
    VWidget,
    Goods,
    Control,
    FloatBtn,
    Dialog,
    OCard,
    Cascader
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
  }
};

</script>
<style lang='stylus' scoped>
.top
  height: 40px;

</style>