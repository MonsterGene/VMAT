<template>
<v-container grid-list-xl fluid>
    <v-widget title="选择仓库" contend-bg="$vuetify.theme.primary">
        <v-card dark>
        <v-layout row>
            <v-flex lg4 sm4 xs4>
                <v-select :items="items_BU" v-model="BU" label="BU"></v-select>
            </v-flex>
            <v-flex lg4 sm4 xs4>
                <v-select :items="items_Building" v-model="Building" label="Building"></v-select>
            </v-flex>
            <v-flex lg4 sm4 xs4>
                <v-select :items="items_Floor" v-model="Floor" label="Floor"></v-select>
            </v-flex>
        </v-layout>
        </v-card>
    </v-widget>
    <v-widget title="Test治具管理" :content-bg="$vuetify.theme.primary">
    <v-card dark>
        <v-card-title>
        信息總覽
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        
        <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        >
            <template slot="items" slot-scope="props">
            <td>
                <v-edit-dialog
                    :return-value.sync="props.item.name"
                    lazy
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                > {{ props.item.name }}
                    <v-text-field
                    slot="input"
                    v-model="props.item.name"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                    ></v-text-field>
                </v-edit-dialog>
                </td>
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
                <td class="text-xs-center">{{ props.item.note }}</td>
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
            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </v-card>
    </v-widget>
</v-container>
</template>

<script>
import VWidget from '@/components/VWidget';

export default {
  data: () => ({
    search: '',
    dialog: false,
    items_BU: [
      { text: 'Manufacturer Ⅰ', value: 'M1' },
      { text: 'Manufacturer Ⅱ', value: 'M2' },
      { text: 'Manufacturer Ⅲ', value: 'M3' },
      { text: 'Manufacturer Ⅴ', value: 'M5' },
      { text: 'Manufacturer Ⅵ', value: 'M6' },
      { text: 'Manufacturer Ⅶ', value: 'M7' },
      { text: 'Manufacturer Ⅷ', value: 'M8' }
    ],
    items_Building: [
      { text: 'D9', value: 'D9' },
      { text: 'D10', value: 'D10' },
      { text: 'E5', value: 'E5' },
      { text: 'E6', value: 'E6' },
      { text: 'F21', value: 'F21' }
    ],
    items_Floor: [
      { text: 'Floor 1', value: 'F1' },
      { text: 'Floor 2', value: 'F2' },
      { text: 'Floor 3', value: 'F3' },
      { text: 'Floor 4', value: 'F4' }
    ],
    headers: [
      {
        text: '線材編號',
        align: 'left',
        sortable: false,
        value: 'name'
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
      { text: '備註', value: 'note' },
      { text: '操作', value: 'name', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editeItem: {
      name: '',
      sn: '',
      pic: '',
      vendor: '',
      safe_num: 0,
      service_life: 0,
      floor: 0,
      location: '',
      use_state: '',
      arrival_time: '',
      acceptor: '',
      note: ''
    },
    defaultItem: {
      name: '',
      sn: '',
      pic: '',
      vendor: '',
      safe_num: 0,
      service_life: 0,
      floor: 0,
      location: '',
      use_state: '',
      arrival_time: '',
      acceptor: '',
      note: ''
    }
  }),
  // components: {
  //   VWidget
  // },
  methods: {
    initialize () {
      this.desserts = [
        {
          value: false,
          name: '####',
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
          name: '####',
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
          name: '####',
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
          name: '####',
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
          name: '####',
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
          name: '####',
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
          name: '####',
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
      ];
    },
  },
}; 
</script>
<style scoped>
</style>