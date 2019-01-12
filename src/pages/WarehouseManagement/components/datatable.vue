<template>
  <div class="primary">
    <v-toolbar flat color="white" dark class="primary">
      <!-- 标题 -->
      <v-toolbar-title>DATA TABLE</v-toolbar-title>
      <!-- <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider> -->
      <v-spacer></v-spacer>
      <!-- 搜索 -->
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        class="data_search"
      ></v-text-field>
      <!-- 属性修改弹窗 -->
      <v-dialog v-model="dialog" max-width="1300px">
        <v-btn slot="activator" color="blue" class="mb-2">New Data</v-btn>
        <v-card dark>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <!-- 修改页面样式 -->
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.item_name" label="物品名称"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.vendor" label="廠商"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.sn" label="S/N"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.safe_num" label="安全庫存數量設定"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.service_life" label="使用壽命"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.floor" label="樓層"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.location" label="存放位置"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-select
                    v-model="editedItem.use_state"
                    :items="use_states"
                    label="使用狀態"
                  >
                  </v-select>
                </v-flex>
                <!-- menu时间选择器 -->
                <v-flex xs12 sm6 md4 lg2>
                  <v-menu
                    ref="menu_arrival"
                    :close-on-content-click="false"
                    v-model="menu_arrival"
                    :nudge-right="40"
                    :return-value.sync="editedItem.arrival_time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="editedItem.arrival_time"
                      label="到貨時間"
                      prepend-icon="event"
                      readonly
                    >
                    </v-text-field>
                    <v-date-picker v-model="editedItem.arrival_time" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu_arrival = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu_arrival.save(editedItem.arrival_time)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.cost_source" label="費用來源"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.request_no" label="申請單號"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.cisco_code" label="Cisco編號"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.asset_code" label="財產編號"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.control_code" label="管制編號"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.archive_no" label="歸檔號"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.cunstom_code" label="關務編號"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.check_control_no" label="校驗管制編號"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.quantity" label="數量"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-menu
                    ref="menu_use"
                    :close-on-content-click="false"
                    v-model="menu_use"
                    :nudge-right="40"
                    :return-value.sync="editedItem.use_time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="editedItem.use_time"
                      label="領用時間"
                      prepend-icon="event"
                      readonly
                    >
                    </v-text-field>
                    <v-date-picker v-model="editedItem.use_time" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary darken-1" @click="menu_use = false">Cancel</v-btn>
                      <v-btn flat color="primary darken-1" @click="$refs.menu_use.save(editedItem.use_time)">OK</v-btn>
                    </v-date-picker>   
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.use_person" label="領用人/負責人"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.chamber_size_in" label="Chamber尺寸(內部):"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.chamber_size_ex" label="Chamber尺寸(外部)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.chamber_temperature" label="Chamber測試溫度範圍"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.heat_treat_capacity" label="處理發熱能力"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.power_supply" label="電源"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.power" label="功率"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.water_norm" label="用水規格"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.use_status" label="使用狀態"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.item_num" label="物品數量"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.moisture_norm" label="濕氣規格"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.gas_norm" label="用氣規格"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.cell_num" label="測試CELL數量"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.UUT_power_num" label="UUT功率數量"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.UUT_power_norm" label="UUT功率規格"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.hot_cold_cmd" label="熱/冷命令"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.start_end_cmd" label="開始/結束命令"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-menu
                    ref="menu_repair"
                    :close-on-content-click="false"
                    v-model="menu_repair"
                    :nudge-right="40"
                    :return-value.sync="editedItem.repair_time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="editedItem.repair_time"
                      label="保修截止日期"
                      prepend-icon="event"
                      readonly
                    >
                    </v-text-field>
                    <v-date-picker v-model="editedItem.repair_time" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary darken-1" @click="menu_repair = false">Cancel</v-btn>
                      <v-btn flat color="primary darken-1" @click="$refs.menu_repair.save(editedItem.repair_time)">OK</v-btn>
                    </v-date-picker>   
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-menu
                    ref="menu_failt"
                    :close-on-content-click="false"
                    v-model="menu_failt"
                    :nudge-right="40"
                    :return-value.sync="editedItem.failt_time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="editedItem.failt_time"
                      label="故障時間"
                      prepend-icon="event"
                      readonly
                    >
                    </v-text-field>
                    <v-date-picker v-model="editedItem.failt_time" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary darken-1" @click="menu_failt = false">Cancel</v-btn>
                      <v-btn flat color="primary darken-1" @click="$refs.menu_failt.save(editedItem.failt_time)">OK</v-btn>
                    </v-date-picker>   
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.fault_phenomenon" label="故障現象"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.fault_cause" label="故障原因"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.repair_content" label="維修內容"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.repairman" label="維修人員"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.specification" label="規格說明書"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-menu
                    ref="menu_request"
                    :close-on-content-click="false"
                    v-model="menu_request"
                    :nudge-right="40"
                    :return-value.sync="editedItem.failt_time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="editedItem.request_time"
                      label="申請時間"
                      prepend-icon="event"
                      readonly
                    >
                    </v-text-field>
                    <v-date-picker v-model="editedItem.request_time" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary darken-1" @click="menu_request = false">Cancel</v-btn>
                      <v-btn flat color="primary darken-1" @click="$refs.menu_request.save(editedItem.request_time)">OK</v-btn>
                    </v-date-picker>   
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.project_name" label="Project Name(機種)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.model" label="型號/規格"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.item_price" label="單價"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.total_amount" label="使用總金額"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.ppv_nre" label="PPV/NRE#"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.inbound_control_code" label="入庫管制編號條碼"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <!-- 上传图片 -->
                  <!-- <a class="btn" @click="toggleShow">上传图片</a>
                  <upload field="img"
                      @crop-success="cropSuccess"
                      @crop-upload-success="cropUploadSuccess"
                      @crop-upload-fail="cropUploadFail"
                      v-model="show"
                      :width="300"
                      :height="300"
                      url="/upload"
                      :params="params"
                      :headers="headers1"
                      img-format="png"></upload>
                  <img :src="imgDataUrl"> -->
                  <v-text-field v-model="editedItem.pic" label="图片"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.note" label="備註"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="editedItem.demander " label="需求人"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <!-- 修改页面操作按钮 -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 导出EXCEL按钮 -->
      <v-btn @click="export2Excel" class="mb-2" color="green">GET EXCEL</v-btn>
    </v-toolbar>
    <!-- 表格主体 -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :search="search"
      item-key="item_name"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <!-- 展出按钮 -->
          <td @click="props.expanded = !props.expanded" class="down">
            <v-icon color="blue darken-2" small>dialpad</v-icon>
          </td>
          <!-- 显示主体 -->
          <td class="text-xs-center">{{ props.item.item_name }}</td>
          <td class="text-xs-center">{{ props.item.vendor }}</td>
          <td class="text-xs-center">{{ props.item.sn }}</td>
          <td class="text-xs-center">{{ props.item.safe_num }}</td>
          <td class="text-xs-center">{{ props.item.service_life }}</td>
          <td class="text-xs-center">{{ props.item.floor }}</td>
          <td class="text-xs-center">{{ props.item.location }}</td>
          <td class="text-xs-center">{{ props.item.use_state }}</td>
          <td class="text-xs-center">{{ props.item.arrival_time }}</td>
          <td class="text-xs-center">{{ props.item.acceptor }}</td>
          <!-- 操作按钮 -->
          <td class="text-xs-right layout px-25">
            <v-icon
              small
              color="yellow"
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              color="red"
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </tr>
      </template>
      <!-- 表格展开部分 -->
      <template slot="expand" slot-scope="props">
        <v-card flat color="black">
          <v-layout>
            <!-- 展开第一行 -->
            <v-flex lg1>
              <span>費用來源: {{ props.item.cost_source }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>申請單號: {{ props.item.request_no }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>Cisco編號: {{ props.item.cisco_code }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>財產編號: {{ props.item.asset_code }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>管制編號: {{ props.item.control_code }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>歸檔號: {{ props.item.archive_no }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>關務編號: {{ props.item.cunstom_code }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>校驗管制編號: {{ props.item.check_control_no }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>領用時間: {{ props.item.use_time }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>領用人/負責人: {{ props.item.use_person }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>Chamber尺寸(內部): {{ props.item.chamber_size_in }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>Chamber尺寸(外部): {{ props.item.chamber_size_ex }}  </span>
            </v-flex>
            </v-layout>
            <!-- 展开第二行 -->
            <v-layout>
              <v-flex lg1>
              <span>開始/結束命令: {{ props.item.start_end_cmd }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>保修截止日期: {{ props.item.repair_time }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>故障時間: {{ props.item.failt_time }}  </span>
            </v-flex>
              <v-flex lg1>
              <span>故障現象: {{ props.item.fault_phenomenon }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>故障原因: {{ props.item.fault_cause }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>維修內容: {{ props.item.repair_content }}  </span>
            </v-flex>
             <v-flex lg1>
              <span>維修人員: {{ props.item.repairman }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>規格說明書: {{ props.item.specification }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>測試CELL數量: {{ props.item.cell_num }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>備註: {{ props.item.note }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>申請時間: {{ props.item.request_time }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>功率: {{ props.item.power }}  </span>
            </v-flex>
            </v-layout>
            <!-- 展开第三行 -->
            <v-layout>
              <v-flex lg1>
              <span>Chamber測試溫度範圍: {{ props.item.chamber_temperature }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>處理發熱能力: {{ props.item.heat_treat_capacity }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>Project Name(機種): {{ props.item.project_name }}  </span>
            </v-flex>
              <v-flex lg1>
              <span>電源: {{ props.item.power_supply }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>用水規格: {{ props.item.water_norm }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>使用狀態: {{ props.item.use_status }}  </span>
            </v-flex>
             <v-flex lg1>
              <span>濕氣規格: {{ props.item.moisture_norm }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>用氣規格: {{ props.item.gas_norm }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>測試CELL數量: {{ props.item.cell_num }}  </span>
            </v-flex>
              <v-flex lg1>
              <span>UUT功率數量: {{ props.item.UUT_power_num }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>UUT功率規格: {{ props.item.UUT_power_norm }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>熱/冷命令: {{ props.item.hot_cold_cmd }}  </span>
            </v-flex>
            </v-layout>
            <!-- 展开第四行 -->
            <v-layout>
              <v-flex lg1>
              <span>入庫管制編號條碼: {{ props.item.inbound_control_code }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>PPV/NRE#: {{ props.item.ppv_nre }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>使用總金額: {{ props.item.total_amount }}  </span>
            </v-flex>
              <v-flex lg1>
              <span>單價: {{ props.item.item_price }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>物品數量: {{ props.item.item_num }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>型號/規格: {{ props.item.model }}  </span>
            </v-flex>
             <v-flex lg1>
              <span>需求人: {{ props.item.demander }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>图片: {{ props.item.pic }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>數量: {{ props.item.quantity }}  </span>
            </v-flex>
            </v-layout>
        </v-card>
      </template>
      <!-- 无数据处理 -->
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// import Imgs from '../components/Imgs';
// import 'babel-polyfill'; // es6 shim(垫片)
// import Upload from 'vue-image-crop-upload';
export default {
  components: {
    // Imgs
    // Upload
  },
  data: () => ({
    // 上传图片数据初始化
    // show: true,
    // params: {
    //   token: '123',
    //   name: 'avatar'
    // },
    // headers1: {
    //   smail: '*_~'
    // },
    // imgDataUrl: '',
    // date: new Date().toISOString().substr(0, 10),
    search: '',
    dialog: false,
    // 事件选择器开关控制 menu_
    menu_arrival: false,
    menu_use: false,
    menu_request: false,
    menu_repair: false,
    menu_failt: false,
    use_states: ['使用', '閒置', '待修', '報廢', '轉出'],   // 使用状态 -> 选择数组
    // 表格表头
    headers: [
      { text: '展開', sortable: false },
      { text: '物品名称', align: 'center', sortable: false, value: 'item_name' },
      { text: '廠商', value: 'vendor', align: 'left' },
      { text: 'S/N', align: 'left', value: 'sn' },
      { text: '安全庫存數量設定', align: 'left', value: 'safe_num' },
      { text: '使用壽命', align: 'left', value: 'service_life' },
      { text: '樓層', align: 'left', value: 'floor' },
      { text: '存放位置', align: 'left', value: 'location' },
      { text: '使用狀態', align: 'left', value: 'use_state' },
      { text: '到貨時間', align: 'left', value: 'arrival_time' },
      { text: '驗收人', align: 'left', value: 'acceptor' },
      { text: '操作', align: 'left', sortable: false },
    ],
    // 初始化表格数据
    desserts: [],
    editedIndex: -1,
    editedItem: {
      item_name: '',
      sn: '',
      vendor: '',
      safe_num: '',
      service_life: '',
      floor: '',
      location: '',
      use_state: '',
      arrival_time: new Date().toISOString().substr(0, 10),
      acceptor: '',
      note: '',
      value: false,
      cost_source: '',
      request_no: '',
      cisco_code: '',
      asset_code: '',
      control_code: '',
      archive_no: '',
      cunstom_code: '',
      check_control_no: '',
      quantity: '',
      use_time: new Date().toISOString().substr(0, 10),
      use_person: '',
      chamber_size_in: '',
      chamber_size_ex: '',
      chamber_temperature: '',

      heat_treat_capacity: '',
      power_supply: '',
      power: '',
      water_norm: '',
      use_status: '',
      item_num: '',
      itemmoisture_norm_name: '',
      gas_norm: '',
      cell_num: '',
      UUT_power_num: '',
      UUT_power_norm: '',
      hot_cold_cmd: '',
      start_end_cmd: '',
      repair_time: new Date().toISOString().substr(0, 10),
      failt_time: '',
      fault_phenomenon: '',
      fault_cause: '',
      repair_content: '',
      repairman: '',
      specification: '',
      request_time: new Date().toISOString().substr(0, 10),
      project_name: '',
      model: '',
      item_price: '',
      total_amount: '',
      ppv_nre: '',
      inbound_control_code: '',
      pic: '',
      demander: '',
    },
    defaultItem: {
      item_name: '',
      sn: '',
      vendor: '',
      safe_num: '',
      service_life: '',
      floor: '',
      location: '',
      use_state: '',
      arrival_time: new Date().toISOString().substr(0, 10),
      acceptor: '',
      note: '',
      value: false,
      cost_source: '',
      request_no: '',
      cisco_code: '',
      asset_code: '',
      control_code: '',
      archive_no: '',
      cunstom_code: '',
      check_control_no: '',
      quantity: '',
      use_time: new Date().toISOString().substr(0, 10),
      use_person: '',
      chamber_size_in: '',
      chamber_size_ex: '',
      chamber_temperature: '',
      heat_treat_capacity: '',
      power_supply: '',
      power: '',
      water_norm: '',
      use_status: '',
      item_num: '',
      itemmoisture_norm_name: '',
      gas_norm: '',
      cell_num: '',
      UUT_power_num: '',
      UUT_power_norm: '',
      hot_cold_cmd: '',
      start_end_cmd: '',
      repair_time: new Date().toISOString().substr(0, 10),
      failt_time: '',
      fault_phenomenon: '',
      fault_cause: '',
      repair_content: '',
      repairman: '',
      specification: '',
      request_time: new Date().toISOString().substr(0, 10),
      project_name: '',
      model: '',
      item_price: '',
      total_amount: '',
      ppv_nre: '',
      inbound_control_code: '',
      pic: '',
      demander: '',
    }
  }),

  computed: {
    // 编辑修改弹窗标题
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    }
  },

  watch: {
    // 监控弹窗关闭状态
    dialog (val) {
      val || this.close();
    }
  },

  created () {
    // 页面渲染时初始化 数据
    this.initialize();
  },

  methods: {
    
    // toggleShow () {
    //   this.show = !this.show;
    // },
    // cropSuccess (imgDataUrl, field) {
    //   console.log('-------- crop success --------');
    //   this.imgDataUrl = imgDataUrl;
    // },
    // cropUploadSuccess (jsonData, field) {
    //   console.log('-------- upload success --------');
    //   console.log(jsonData);
    //   console.log('field: ' + field);
    // },
    // /**
    //  * upload fail
    //  *
    //  * [param] status    server api return error status, like 500
    //  * [param] field
    //  */
    // cropUploadFail (status, field) {
    //   console.log('-------- upload fail --------');
    //   console.log(status);
    //   console.log('field: ' + field);
    // },

    // 表格数据初始化
    initialize () {
      this.desserts = [
        {
          value: false,
          item_name: '###2',
          sn: '$$$2',
          pic: 'none',
          vendor: '@@@',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用中',
          arrival_time: '2018/12/14',
          acceptor: '!!!',
          note: 'none',
        },
        {
          value: false,
          item_name: '###3',
          sn: '$$$3',
          pic: 'none',
          vendor: '@@@',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用中',
          arrival_time: '2018/12/14',
          acceptor: '!!!',
          note: 'none',
        },
        {
          value: false,
          item_name: '###4',
          sn: '$$$4',
          pic: 'none',
          vendor: '@@@',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用中',
          arrival_time: '2018/12/14',
          acceptor: '!!!',
          note: 'none',
        },
        {
          value: false,
          item_name: '###5',
          sn: '$$$5',
          pic: 'none',
          vendor: '@@@',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用中',
          arrival_time: '2018/12/14',
          acceptor: '!!!',
          note: 'none',
        },
        {
          value: false,
          item_name: '###6',
          sn: '$$$6',
          pic: 'none',
          vendor: '@@@',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用中',
          arrival_time: '2018/12/14',
          acceptor: '!!!',
          note: 'none',
        },
        {
          value: false,
          item_name: '####7',
          sn: '$$$',
          pic: 'none',
          vendor: '@@@',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用中',
          arrival_time: '2018/12/14',
          acceptor: '!!!',
          note: 'none',
        },
        {
          value: false,
          item_name: '####8',
          sn: '$$$',
          pic: 'none',
          vendor: '@@@',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用中',
          arrival_time: '2018/12/14',
          acceptor: '!!!',
          note: 'none',
        },
        {
          value: false,
          item_name: '####9',
          sn: '$$$',
          pic: 'none',
          vendor: '@@@',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用中',
          arrival_time: '2018/12/14',
          acceptor: '!!!',
          note: 'none',
        },
        {
          value: false,
          item_name: '####10',
          sn: '$$$',
          pic: 'none',
          vendor: '@@@',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用中',
          arrival_time: '2018/12/14',
          acceptor: '!!!',
          note: 'none',
        }
      ].map(v => {
        v.arrival_time = new Date().toISOString().substr(0, 10);
        return v;
      });
    },
    // 导出excel方法
    export2Excel () {
      // require.ensure([], () => {
      //   const { export_json_to_excel } = require('../vendor/Export2Excel');
      //   const tHeader = [
      //     '物品名称', '廠商', 'S/N', '安全庫存數量設定', '使用壽命', '樓層', '存放位置',
      //     '使用狀態', '到貨時間', '驗收人'
      //   ];
      //   const filterVal = [
      //     'item_name', 'vendor', 'sn', 'safe_num', 'service_life', 'floor', 'location', 'use_state',
      //     'arrival_time', 'acceptor'
      //   ];
      //   const list = this.desserts;
      //   const data = this.formatJson(filterVal, list);
      //   export_json_to_excel(tHeader, data, '列表excel');
      // });
    },
    formatJson (filterVal, jsonData) {
      console.log(jsonData);
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 修改页面方法
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // 删除页面方法
    deleteItem (item) {
      const index = this.desserts.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
    },
    // 关闭页面方法
    close () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    // 保存数据方法
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style lang='stylus' scoped>
.data_search
  width: 50px;
  margin-top: -10px;
.down
  width: 50px;
</style>
