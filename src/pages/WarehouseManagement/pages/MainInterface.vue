<template>
<v-container grid-list-xl fluid>
  <!-- 顶部 仓库管理 -->
  <v-layout nowarp align-center>
    <v-flex xs12 sm6 lg3 d-flex>
      <v-widget title="選擇BU" :content-bg="$vuetify.theme.primary">
        <div slot="widget-content" class="select_div">
          <v-select
            :items="items_bu"
            label="BU"
            solo
          ></v-select>
        </div>
      </v-widget>
    </v-flex>
    <v-flex xs12 sm3 lg3 d-flex>
      <v-widget title="選擇樓棟" :content-bg="$vuetify.theme.primary">
        <div slot="widget-content" class="select_div">
          <v-select
            :items="items_building"
            label="Building"
            solo
          ></v-select>
        </div>
      </v-widget>
    </v-flex>
    <v-flex lg3 d-flex>
      <v-widget title="選擇樓層" :content-bg="$vuetify.theme.primary">
        <div slot="widget-content" class="select_div">
          <v-select
            :items="items_floor"
            label="Floor"
            solo
          ></v-select>
        </div>
      </v-widget>
    </v-flex>
    <v-flex xs3 sm3 lg3 d-flex>
      <v-widget title="倉庫管理" :content-bg="$vuetify.theme.primary">
        <div slot="widget-content" class="select_div">
          <div class="btn_div">
            <v-btn color="primary" fab small value="新增">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn color="primary" fab small value="刪除">
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn color="primary" fab small value="修改">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn color="primary" fab small value="查看">
              <v-icon>list</v-icon>
            </v-btn>
          </div>
        </div>
      </v-widget>
    </v-flex>
  </v-layout>
  <!-- 中间 数据操作 -->
  <v-layout warp align-center>
    <v-flex>
      <v-widget title="数据展示" :content-bg="$vuetify.theme.primary">
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
              <!-- 工具栏标题 -->
              <v-toolbar-title>
                <!-- 全局搜索框 -->
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
              </v-toolbar-title>
                <Control></Control>
                <Property></Property>
                <Repair></Repair>
                <Goods></Goods>
                
              <v-toolbar-items>
                
              </v-toolbar-items>
            </v-toolbar>
            <!-- 数据展示 -->
            <v-flex
              slot="item"
              slot-scope="props"
              xs12
              sm6
              md4
              lg3
            >
              <!-- 数据展示卡片 -->
              <v-card>
                <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
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
import VWidget from '@/components/VWidget';   // 导入视觉组件
import Repair from '../components/Combobox_repair';
import Property from '../components/Combobox_property';
import Goods from '../components/Combobox_goods';
import Control from '../components/Combobox_control';

export default {
  components: {
    VWidget,
    Repair,
    Property,
    Goods,
    Control
  },
  data: () => ({
    search: '',
    // 仓库选择器items
    items_bu: ['815', 'CDBU', 'CSPG', 'CVEBU', 'CVTG',  
      'EDVT', 'ERBU', 'FTX', 'ICT', 'MKD', 'MTP', 'NWE', 
      'PABU', 'RCFA', 'SCBU', 'SERE', 'SFPG', 'SRG', 'TIPBU',
      'UABU', 'UCEBU', 'UAG', 'UCEBU', 'WNG&IoTG', 'WSTG'],
    items_building: ['D9', 'D10', 'E5', 'E6', 'F21', 'MKD'],
    items_floor: ['1F', '1.5F', '2F', '3F', '4F'],
    // 迭代器分页选项
    rowsPerPageItems: [4, 8, 12], // 分页选项设置
    pagination: {
      rowsPerPage: 4  // 默认每页4个卡片
    },
    // 页面数据源
    items: [
      {
        value: false,
        name: 'first data',
        cost_source: 159,
        request_no: 6.0,
        vendor: 24,
        pic: 'inbox',
        sn: 87,
        cisco_code: '14%',
        asset_code: '1%',
        control_code: 159,
        archive_no: '1%',
        cunstom_code: '1%',
        check_control_no: '1%',
        quantity: '1%',
        arrival_time: '1%',
        acceptor: '1%',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        chamber_size_in: '1%',
        chamber_size_ex: '1%',
        chamber_temperature: '1%',
        heat_treat_capacity: '1%',
        power_supply: '1%',
        power: '1%',
        water_norm: '1%',
        use_status: '1%',
        moisture_norm: '1%',
        gas_norm: '1%',
        cell_num: '1%',
        UUT_power_num: '1%',
        UUT_power_norm: '1%',
        hot_cold_cmd: '1%',
        start_end_cmd: '1%',
        repair_time: '1%',
        failt_time: '1%',
        fault_phenomenon: '1%',
        fault_cause: '1%',
        repair_content: '1%',
        repairman: '1%',
        specification: '1%',
        request_time: '1%',
        project_name: '1%',
        demander: '1%',
        item_name: '1%',
        item_num: '1%',
        item_price: '1%',
        total_amount: '1%',
        ppv_nre: '1%',
        入庫管制編號條碼: '1%'
      },
      {
        value: false,
        name: 'second data',
        cost_source: 159,
        request_no: 6.0,
        vendor: 24,
        pic: 4.0,
        sn: 87,
        cisco_code: '14%',
        asset_code: '1%',
        control_code: 159,
        archive_no: '1%',
        cunstom_code: '1%',
        check_control_no: '1%',
        quantity: '1%',
        arrival_time: '1%',
        acceptor: '1%',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        chamber_size_in: '1%',
        chamber_size_ex: '1%',
        chamber_temperature: '1%',
        heat_treat_capacity: '1%',
        power_supply: '1%',
        power: '1%',
        water_norm: '1%',
        use_status: '1%',
        moisture_norm: '1%',
        gas_norm: '1%',
        cell_num: '1%',
        UUT_power_num: '1%',
        UUT_power_norm: '1%',
        hot_cold_cmd: '1%',
        start_end_cmd: '1%',
        repair_time: '1%',
        failt_time: '1%',
        fault_phenomenon: '1%',
        fault_cause: '1%',
        repair_content: '1%',
        repairman: '1%',
        specification: '1%',
        request_time: '1%',
        project_name: '1%',
        demander: '1%',
        item_name: '1%',
        item_num: '1%',
        item_price: '1%',
        total_amount: '1%',
        ppv_nre: '1%',
        入庫管制編號條碼: '1%'
      },
      {
        value: false,
        name: 'third data',
        cost_source: 159,
        request_no: 6.0,
        vendor: 24,
        pic: 4.0,
        sn: 87,
        cisco_code: '14%',
        asset_code: '1%',
        control_code: 159,
        archive_no: '1%',
        cunstom_code: '1%',
        check_control_no: '1%',
        quantity: '1%',
        arrival_time: '1%',
        acceptor: '1%',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        chamber_size_in: '1%',
        chamber_size_ex: '1%',
        chamber_temperature: '1%',
        heat_treat_capacity: '1%',
        power_supply: '1%',
        power: '1%',
        water_norm: '1%',
        use_status: '1%',
        moisture_norm: '1%',
        gas_norm: '1%',
        cell_num: '1%',
        UUT_power_num: '1%',
        UUT_power_norm: '1%',
        hot_cold_cmd: '1%',
        start_end_cmd: '1%',
        repair_time: '1%',
        failt_time: '1%',
        fault_phenomenon: '1%',
        fault_cause: '1%',
        repair_content: '1%',
        repairman: '1%',
        specification: '1%',
        request_time: '1%',
        project_name: '1%',
        demander: '1%',
        item_name: '1%',
        item_num: '1%',
        item_price: '1%',
        total_amount: '1%',
        ppv_nre: '1%',
        入庫管制編號條碼: '1%'
      },
      {
        value: false,
        name: 'fourth data',
        cost_source: 159,
        request_no: 6.0,
        vendor: 24,
        pic: 4.0,
        sn: 87,
        cisco_code: '14%',
        asset_code: '1%',
        control_code: 159,
        archive_no: '1%',
        cunstom_code: '1%',
        check_control_no: '1%',
        quantity: '1%',
        arrival_time: '1%',
        acceptor: '1%',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        chamber_size_in: '1%',
        chamber_size_ex: '1%',
        chamber_temperature: '1%',
        heat_treat_capacity: '1%',
        power_supply: '1%',
        power: '1%',
        water_norm: '1%',
        use_status: '1%',
        moisture_norm: '1%',
        gas_norm: '1%',
        cell_num: '1%',
        UUT_power_num: '1%',
        UUT_power_norm: '1%',
        hot_cold_cmd: '1%',
        start_end_cmd: '1%',
        repair_time: '1%',
        failt_time: '1%',
        fault_phenomenon: '1%',
        fault_cause: '1%',
        repair_content: '1%',
        repairman: '1%',
        specification: '1%',
        request_time: '1%',
        project_name: '1%',
        demander: '1%',
        item_name: '1%',
        item_num: '1%',
        item_price: '1%',
        total_amount: '1%',
        ppv_nre: '1%',
        入庫管制編號條碼: '1%'
      },
      {
        value: false,
        name: 'fifth data',
        cost_source: 159,
        request_no: 6.0,
        vendor: 24,
        pic: 4.0,
        sn: 87,
        cisco_code: '14%',
        asset_code: '1%',
        control_code: 159,
        archive_no: '1%',
        cunstom_code: '1%',
        check_control_no: '1%',
        quantity: '1%',
        arrival_time: '1%',
        acceptor: '1%',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        chamber_size_in: '1%',
        chamber_size_ex: '1%',
        chamber_temperature: '1%',
        heat_treat_capacity: '1%',
        power_supply: '1%',
        power: '1%',
        water_norm: '1%',
        use_status: '1%',
        moisture_norm: '1%',
        gas_norm: '1%',
        cell_num: '1%',
        UUT_power_num: '1%',
        UUT_power_norm: '1%',
        hot_cold_cmd: '1%',
        start_end_cmd: '1%',
        repair_time: '1%',
        failt_time: '1%',
        fault_phenomenon: '1%',
        fault_cause: '1%',
        repair_content: '1%',
        repairman: '1%',
        specification: '1%',
        request_time: '1%',
        project_name: '1%',
        demander: '1%',
        item_name: '1%',
        item_num: '1%',
        item_price: '1%',
        total_amount: '1%',
        ppv_nre: '1%',
        入庫管制編號條碼: '1%'
      },
      {
        value: false,
        name: 'sixth data',
        cost_source: 159,
        request_no: 6.0,
        vendor: 24,
        pic: 4.0,
        sn: 87,
        cisco_code: '14%',
        asset_code: '1%',
        control_code: 159,
        archive_no: '1%',
        cunstom_code: '1%',
        check_control_no: '1%',
        quantity: '1%',
        arrival_time: '1%',
        acceptor: '1%',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        chamber_size_in: '1%',
        chamber_size_ex: '1%',
        chamber_temperature: '1%',
        heat_treat_capacity: '1%',
        power_supply: '1%',
        power: '1%',
        water_norm: '1%',
        use_status: '1%',
        moisture_norm: '1%',
        gas_norm: '1%',
        cell_num: '1%',
        UUT_power_num: '1%',
        UUT_power_norm: '1%',
        hot_cold_cmd: '1%',
        start_end_cmd: '1%',
        repair_time: '1%',
        failt_time: '1%',
        fault_phenomenon: '1%',
        fault_cause: '1%',
        repair_content: '1%',
        repairman: '1%',
        specification: '1%',
        request_time: '1%',
        project_name: '1%',
        demander: '1%',
        item_name: '1%',
        item_num: '1%',
        item_price: '1%',
        total_amount: '1%',
        ppv_nre: '1%',
        入庫管制編號條碼: '1%'
      },
      {
        value: false,
        name: 'seventh data',
        cost_source: 159,
        request_no: 6.0,
        vendor: 24,
        pic: 4.0,
        sn: 87,
        cisco_code: '14%',
        asset_code: '1%',
        control_code: 159,
        archive_no: '1%',
        cunstom_code: '1%',
        check_control_no: '1%',
        quantity: '1%',
        arrival_time: '1%',
        acceptor: '1%',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        chamber_size_in: '1%',
        chamber_size_ex: '1%',
        chamber_temperature: '1%',
        heat_treat_capacity: '1%',
        power_supply: '1%',
        power: '1%',
        water_norm: '1%',
        use_status: '1%',
        moisture_norm: '1%',
        gas_norm: '1%',
        cell_num: '1%',
        UUT_power_num: '1%',
        UUT_power_norm: '1%',
        hot_cold_cmd: '1%',
        start_end_cmd: '1%',
        repair_time: '1%',
        failt_time: '1%',
        fault_phenomenon: '1%',
        fault_cause: '1%',
        repair_content: '1%',
        repairman: '1%',
        specification: '1%',
        request_time: '1%',
        project_name: '1%',
        demander: '1%',
        item_name: '1%',
        item_num: '1%',
        item_price: '1%',
        total_amount: '1%',
        ppv_nre: '1%',
        入庫管制編號條碼: '1%'
      },
      {
        value: false,
        name: 'eighth data',
        cost_source: 159,
        request_no: 6.0,
        vendor: 24,
        pic: 4.0,
        sn: 87,
        cisco_code: '14%',
        asset_code: '1%',
        control_code: 159,
        archive_no: '1%',
        cunstom_code: '1%',
        check_control_no: '1%',
        quantity: '1%',
        arrival_time: '1%',
        acceptor: '1%',
        use_time: '1%',
        use_person: '1%',
        location: '1%',
        chamber_size_in: '1%',
        chamber_size_ex: '1%',
        chamber_temperature: '1%',
        heat_treat_capacity: '1%',
        power_supply: '1%',
        power: '1%',
        water_norm: '1%',
        use_status: '1%',
        moisture_norm: '1%',
        gas_norm: '1%',
        cell_num: '1%',
        UUT_power_num: '1%',
        UUT_power_norm: '1%',
        hot_cold_cmd: '1%',
        start_end_cmd: '1%',
        repair_time: '1%',
        failt_time: '1%',
        fault_phenomenon: '1%',
        fault_cause: '1%',
        repair_content: '1%',
        repairman: '1%',
        specification: '1%',
        request_time: '1%',
        project_name: '1%',
        demander: '1%',
        item_name: '1%',
        item_num: '1%',
        item_price: '1%',
        total_amount: '1%',
        ppv_nre: '1%',
        入庫管制編號條碼: '1%'
      },
    ]
  })
};

</script>
<style lang='stylus' scoped>
.select_div
  height: 50px;
.btn_div 
  height: 50px;
</style>