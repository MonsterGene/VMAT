<template>
<v-container grid-list-xl fluid>
    <v-card>
        <!-- <v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="線材編號"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.vendor" label="廠商"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.sn" label="S/N"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.pic" label="圖片"></v-text-field>
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
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.note" label="備註"></v-text-field>
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
    </v-toolbar> -->
        <v-card-title>
        SFP管理
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
                <td class="text-xs-center">{{ props.item.use_time }}</td>
                <td class="text-xs-center">{{ props.item.use_person }}</td>
                <td class="text-xs-center">{{ props.item.maintenance_time }}</td>
                <td class="text-xs-center">{{ props.item.maintenance_time2 }}</td>
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
</v-container>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      {
        text: 'Cisco編號',
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
      { text: '領用時間', value: 'use_time' },
      { text: '領用人/負責人', value: 'use_person' },
      { text: '保養時間', value: 'maintenance_time' },
      { text: '下次保養時間', value: 'maintenance_time2' },
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
      use_time: '',
      use_person: '',
      maintenance_time: '',
      maintenance_time2: '',
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
      use_time: '',
      use_person: '',
      maintenance_time: '',
      maintenance_time2: '',
      note: ''
    }
  }),

  // computed: {
  //   formTitle () {
  //     return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
  //   }
  // },

  // watch: {
  //   dialog (val) {
  //     val || this.close();
  //   }
  // },

  // created () {
  //   this.initialize();
  // },

  methods: {
    initialize () {
      this.desserts = [
        {
          value: false,
          name: '#1',
          vendor: '@1',
          sn: '$1',
          pic: 'none',
          safe_num: 1111,
          service_life: 1,
          floor: 1,
          location: 'WHS',
          use_state: '使用',
          arrival_time: '2018/12/14',
          acceptor: 'John',
          use_time: '2018/12/15',
          use_person: 'Tom',
          maintenance_time: '2018/12/16',
          maintenance_time2: '2018/12/20',
          note: 'none',
        }, 
        {
          value: false,
          name: '#2',
          vendor: '@2',
          sn: '$2',
          pic: 'none',
          safe_num: 2222,
          service_life: 2,
          floor: 2,
          location: 'MRB',
          use_state: '待修',
          arrival_time: '2018/12/14',
          acceptor: 'John',
          use_time: '2018/12/15',
          use_person: 'Tom',
          maintenance_time: '2018/12/16',
          maintenance_time2: '2018/12/20',
          note: 'none',
        }, 
        {
          value: false,
          name: '#3',
          vendor: '@3',
          sn: '$3',
          pic: 'none',
          safe_num: 3333,
          service_life: 3,
          floor: 3,
          location: 'WHS',
          use_state: '閒置',
          arrival_time: '2018/12/14',
          acceptor: 'Lily',
          use_time: 'none',
          use_person: 'none',
          maintenance_time: '2018/12/16',
          maintenance_time2: '2018/12/20',
          note: 'none',
        }, 
        {
          value: false,
          name: '#5',
          vendor: '@5',
          sn: '$5',
          pic: 'none',
          safe_num: 5555,
          service_life: 5,
          floor: 1,
          location: 'WHS',
          use_state: '使用',
          arrival_time: '2018/12/14',
          acceptor: 'John',
          use_time: '2018/12/15',
          use_person: 'Tom',
          maintenance_time: '2018/12/16',
          maintenance_time2: '2018/12/20',
          note: 'none',
        }, 
        {
          value: false,
          name: '#6',
          vendor: '@6',
          sn: '$6',
          pic: 'none',
          safe_num: 6666,
          service_life: 6,
          floor: 1,
          location: 'WHS',
          use_state: '使用',
          arrival_time: '2018/12/14',
          acceptor: 'John',
          use_time: '2018/12/15',
          use_person: 'Tom',
          maintenance_time: '2018/12/16',
          maintenance_time2: '2018/12/20',
          note: 'none',
        }, 
      ];
    },

    // editeItem (item) {
    //   this.editedIndex = this.desserts.indexOf(item);
    //   this.editeItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

    // deleteItem (item) {
    //   const index = this.desserts.indexOf(item);
    //   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
    // },

    // close () {
    //   this.dialog = false;
    //   setTimeout(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   }, 300);
    // },

    // save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem);
    //   } else {
    //     this.desserts.push(this.editedItem);
    //   }
    //   this.close();
    // }
  },
};


//   data () {
//     return {
//       search: '',
//       headers: [
//         {
//           text: '線材編號',
//           align: 'left',
//           sortable: false,
//           value: 'name'
//         },
//         { text: '廠商', value: 'vendor' },
//         { text: 'S/N', value: 'sn' },
//         { text: '圖片', value: 'pic' },
//         { text: '安全庫存數量設定', value: 'safe_num' },
//         { text: '使用壽命', value: 'service_life' },
//         { text: '樓層', value: 'floor' },
//         { text: '存放位置', value: 'location' },
//         { text: '使用狀態', value: 'use_state' },
//         { text: '到貨時間', value: 'arrival_time' },
//         { text: '驗收人', value: 'acceptor' },
//         { text: '備註', value: 'note' },
//         { text: '操作', value: 'name', sortable: false },
//       ],
//       desserts: [
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 1111,
//           service_life: 1,
//           floor: 1,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none',
//         //   operation: ''
//         }, 
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 2222,
//           service_life: 2,
//           floor: 2,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 3333,
//           service_life: 3,
//           floor: 3,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 5555,
//           service_life: 5,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 9999,
//           service_life: 24,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 9999,
//           service_life: 24,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 9999,
//           service_life: 24,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 9999,
//           service_life: 24,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 9999,
//           service_life: 24,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 9999,
//           service_life: 24,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 9999,
//           service_life: 24,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 9999,
//           service_life: 24,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//         {
//           value: false,
//           name: '####',
//           sn: '$$$',
//           pic: 'none',
//           vendor: '@@@',
//           safe_num: 9999,
//           service_life: 24,
//           floor: 4,
//           location: 'WHS',
//           use_state: '使用中',
//           arrival_time: '2018/12/14',
//           acceptor: '!!!',
//           note: 'none'
//         },
//       ]
//     };
//   }
// };

</script>

<style scoped>

</style>

