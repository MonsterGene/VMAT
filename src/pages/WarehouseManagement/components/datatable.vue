
<template>
  <div class="primary">
    <v-toolbar flat color="white" dark class="primary top">
      <v-toolbar-title>DATA</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="blue" class="mb-2">New Data</v-btn>
        <v-card dark>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.project_name" label="物品名称"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.vendor" label="廠商"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.sn" label="S/N"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.pic" label="图片"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.safe_num" label="安全庫存數量設定"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.service_life" label="使用壽命"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.floor" label="樓層"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.location" label="存放位置"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.use_state" label="使用狀態"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.arrival_time" label="到貨時間"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.acceptor" label="驗收人"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :search="search"
      item-key="project_name"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.project_name }}</td>
          <td class="text-xs-center">{{ props.item.vendor }}</td>
          <td class="text-xs-center">{{ props.item.sn }}</td>
          <td class="text-xs-center">{{ props.item.pic }}</td>
          <td class="text-xs-center">{{ props.item.safe_num }}</td>
          <td class="text-xs-center">{{ props.item.service_life }}</td>
          <td class="text-xs-center">{{ props.item.floor }}</td>
          <td class="text-xs-center">{{ props.item.location }}</td>
          <td class="text-xs-center">{{ props.item.use_state }}</td>
          <td class="text-xs-center">{{ props.item.arrival_time }}</td>
          <td class="text-xs-center">{{ props.item.acceptor }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat color="black">
          <v-layout>
            <v-flex lg1>
              <span>費用來源: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>申請單號: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>Cisco編號: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>財產編號: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>管制編號: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>歸檔號: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>關務編號: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>校驗管制編號: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>領用時間: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>領用人/負責人: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>Chamber尺寸(內部): {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>Chamber尺寸(外部): {{ props.item.name }}  </span>
            </v-flex>
            
            </v-layout>
            <v-layout>
              <v-flex lg1>
              <span>開始/結束命令: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>保修截止日期: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>故障時間: {{ props.item.name }}  </span>
            </v-flex>
              <v-flex lg1>
              <span>故障現象: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>故障原因: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>維修內容: {{ props.item.name }}  </span>
            </v-flex>
             <v-flex lg1>
              <span>維修人員: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>規格說明書: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>測試CELL數量: {{ props.item.name }}  </span>
            </v-flex>
              <v-flex lg1>
              <span>維修人員: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>備註: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>申請時間: {{ props.item.name }}  </span>
            </v-flex>
            </v-layout>
            <v-layout>
              <v-flex lg1>
              <span>Chamber測試溫度範圍: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>處理發熱能力: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>Project Name(機種): {{ props.item.name }}  </span>
            </v-flex>
              <v-flex lg1>
              <span>電源: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>用水規格: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>使用狀態: {{ props.item.name }}  </span>
            </v-flex>
             <v-flex lg1>
              <span>濕氣規格: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>用氣規格: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>測試CELL數量: {{ props.item.name }}  </span>
            </v-flex>
              <v-flex lg1>
              <span>UUT功率數量: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>UUT功率規格: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>熱/冷命令: {{ props.item.name }}  </span>
            </v-flex>
            </v-layout>

            <v-layout>
              <v-flex lg1>
              <span>入庫管制編號條碼: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>PPV/NRE#: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>使用總金額: {{ props.item.name }}  </span>
            </v-flex>
              <v-flex lg1>
              <span>單價: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>物品數量: {{ props.item.name }}  </span>
            </v-flex>
            <v-flex lg1>
              <span>型號/規格: {{ props.item.name }}  </span>
            </v-flex>
             <v-flex lg1>
              <span>需求人: {{ props.item.name }}  </span>
            </v-flex>
            </v-layout>
          
          
          
        </v-card>
    </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      {
        text: '物品名称',
        align: 'left',
        sortable: false,
        value: 'project_name'
      },
      { text: '廠商', value: 'vendor' },
      { text: 'S/N', value: 'sn' },
      { text: '圖片', value: 'pic' },
      { text: '安全庫存數量設定', value: 'safe_num' },
      { text: '使用壽命', value: 'service_life' },
      { text: '樓層', value: 'floor' },
      { text: '存放位置', value: 'location' },
      { text: '使用狀態', value: 'use_state' },
      { text: '到貨時間', value: 'arrival_time' },
      { text: '驗收人', value: 'acceptor' },
      { text: '操作', value: 'name', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      project_name: '',
      sn: '',
      pic: '',
      vendor: '',
      safe_num: '',
      service_life: '',
      floor: '',
      location: '',
      use_state: '',
      arrival_time: '',
      acceptor: '',
      note: '',
      value: false,
    },
    defaultItem: {
      name: '',
      sn: '',
      pic: '',
      vendor: '',
      safe_num: '',
      service_life: '',
      floor: '',
      location: '',
      use_state: '',
      arrival_time: '',
      acceptor: '',
      note: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    }
  },

  watch: {
    dialog (val) {
      val || this.close();
    }
  },

  created () {
    this.initialize();
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          value: false,
          name: '1',
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
          quantity: '100',
          arrival_time: '1%',
          acceptor: '1%',
          floor: '1F',
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
          note: '###',
          specification: '1%',
          request_time: '1%',
          project_name: '1%',
          model: '###',
          demander: '1%',
          item_name: '1%',
          item_num: '1%',
          item_price: '1%',
          total_amount: '1%',
          ppv_nre: '1%',
          inbound_control_code: '1%'
        },
        {
          value: false,
          project_name: '###2',
          sn: '$$$',
          pic: '',
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
          project_name: '###3',
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
          project_name: '###4',
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
          project_name: '###5',
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
          project_name: '###6',
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
          project_name: '####7',
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
          project_name: '####8',
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
          project_name: '####9',
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
          project_name: '####10',
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
      ];
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
    },

    close () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

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
