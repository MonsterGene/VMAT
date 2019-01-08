<template>
<v-container grid-list-xl fluid>
  <!-- 顶部 仓库管理 -->
  <o-card :content-bg="$vuetify.theme.primary">
    <div slot="card-content" class="top">
      <v-layout nowarp align-center>
        <v-flex xs12 sm6 lg3 d-flex>
          <span class="top_title">WAREHOUSE</span>
        </v-flex>
        <!-- 仓库-级联选择器 -->
        <v-flex xs12 sm6 lg3 d-flex>
          <Cascader 
            :data="warehouses1" 
            placeholder="Choose One Warehouse"
            v-model="value1"
            size="large"
          ></Cascader>
        </v-flex>

        <!-- 仓库操作按钮区 -->
        <v-flex xs3 sm3 lg3 d-flex>
          <div class="btn_div">
            <v-layout nowarp align-center>

              <!-- 添加仓库 -->
              <v-flex lg4 d-flex>
                <v-dialog v-model="dialog" max-width="700px">
                  <v-btn slot="activator" fab small class="mb-2">
                    <v-icon color="blue">add</v-icon>
                  </v-btn>
                  <v-card dark>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.bu" label="BU"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.building" label="building"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.floor" label="floor"></v-text-field>
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
                <template>
                  <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent max-width="700px">
                    <v-btn slot="activator" color="primary" small fab dark>
                      <v-icon color="blue darken-2">list</v-icon>
                    </v-btn>

                      <v-card>
                        <v-card-title>
                          <span class="headline">
                            显示数据
                          </span>
                        </v-card-title>
                        <v-card-text>
                          <v-container grid-list-md>
                            <template>
                              <div class="primary">
                                <v-toolbar flat color="white" dark class="primary top">
                                  <v-toolbar-title>DATA TABLE</v-toolbar-title>
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
                                  
                                  <v-btn @click="export2Excel2" class="mb-2" color="green">GET EXCEL</v-btn>
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
                                      <td>{{ props.item.bu }}</td>
                                      <td class="text-xs-center">{{ props.item.building }}</td>
                                      <td class="text-xs-center">{{ props.item.floor }}</td>
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
                                  <template slot="no-data">
                                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                                  </template>
                                </v-data-table>
                              </div>
                            </template>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" flat @click="dialog = false">NO</v-btn>
                          <v-btn color="blue darken-1" flat @click="dialog = false">YES</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-layout>
                </template>
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
import { getWarehouse1, getWarehouse } from '../api/warehouse';
import { getMainList } from '../api/mainList';
import Dialog from '../components/dialog';
import OCard from '../components/OCard';
import { Cascader } from 'iview';
import Datatable from '../components/datatable';
import Warehouse from '../components/warehouse';

export default {
  components: {
    Dialog,
    OCard,
    Cascader,
    Datatable,
    Warehouse
  },
  data: () => ({
    search: '',
    
    dialog: false,
    search_warehouse: '',
    headers: [
      { text: 'BU', align: 'left', sortable: false, value: 'bu' },
      { text: '樓棟', align: 'center', sortable: false, value: 'building' },
      { text: '樓層', align: 'center', value: 'floor' }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      BU: '',
      building: '',
      floor: '',
      value: false,
    },
    defaultItem: {
      BU: '',
      building: '',
      floor: ''
    },
    value1: [],
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    
    warehouses () {
      return getWarehouse();
    },
    warehouses1 () {
      return getWarehouse1();
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
    items () {
      return getMainList().then(res => {
        if (res && res.status === 200) {
          return res.data;
        }
      });
    },
    initialize () {
      this.desserts = [
        { value: false, bu: 'CDBU', building: 'F21', floor: '3F' },
        { value: false, bu: 'CSPG', building: 'E6', floor: '2F' },
        { value: false, bu: 'CSPG', building: 'E6', floor: '3F' },
        { value: false, bu: 'EDVT', building: 'D10', floor: '4F' },
        { value: false, bu: 'ERBU', building: 'F21', floor: '2F' },
        { value: false, bu: 'ERBU', building: 'F21', floor: '3F' },
        { value: false, bu: 'ERBU', building: 'F21', floor: '2F' },
        { value: false, bu: 'ICT', building: 'D10', floor: '4F' },
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
    export2Excel2 () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../vendor/Export2Excel');
        const tHeader = ['BU', 'Building', 'Floor'];
        const filterVal = ['bu', 'building', 'floor'];
        const list = this.desserts;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, 'WarehouseExcel');
      });
    },
    formatJson (filterVal, jsonData) {
      console.log(jsonData);
      return jsonData.map(v => filterVal.map(j => v[j]));
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
<style lang='stylus' scoped>

.top_title
  font-size: 20px;
  margin-left: 22px;
</style>