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
          <!-- <v-flex xs12 sm6 lg3 d-flex>
            <Cascader 
              :data="warehouses1" 
              placeholder="Choose One Warehouse"
              v-model="value1"
              size="large"
              change-on-select
            ></Cascader>
          </v-flex> -->

          <!-- 选bu -->
          <v-flex xs12 sm6 lg2 d-flex>
            <v-select
              class="select"
              solo
              :items="desserts.map(v => v.bu)"
              label="Select BU"
            >
            </v-select>          
          </v-flex>
          <!-- 选building -->
          <v-flex xs12 sm6 lg2 d-flex>
            <v-select
              class="select"
              solo
              :items="desserts.map(v => v.building)"
              label="Select building"
            >
            </v-select>          
          </v-flex>
          <!-- 选floor -->
          <v-flex xs12 sm6 lg2 d-flex>
            <v-select
              class="select"
              solo
              :items="desserts.map(v => v.floor)"
              label="Select floor"
            >
            </v-select>           
          </v-flex>

          <!-- 仓库操作按钮区 -->
          <v-flex xs3 sm3 lg3 d-flex>
            <div class="btn_div">
              <v-layout nowarp align-center>
                <!-- 添加仓库 -->
                <v-flex lg4 d-flex>
                  <v-dialog v-model="dialog_edit" max-width="700px">
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
                <!-- 删除仓库 -->
                <v-flex lg4 d-flex>
                  <Dialog>
                    <div slot="icon"><v-icon color="red">delete</v-icon></div>
                    <div slot="dialog_header">Delete Warehouse</div>
                    <div slot="dialog_content">
                      Confirm delete selected option please!
                    </div>
                  </Dialog>
                </v-flex>
                <!-- 修改已选仓库 -->
                <v-flex lg4 d-flex>
                  <Dialog>
                    <div slot="icon"><v-icon color="yellow">edit</v-icon></div>
                    <div slot="dialog_header">Edit Warehouse</div>
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
                <!-- 查看所有仓库 -->
                <v-flex lg4 d-flex>
                  <template>
                    <v-layout row justify-center>
                      <v-dialog v-model="dialog_table" persistent max-width="700px">
                      <v-btn slot="activator" color="primary" small fab dark>
                        <v-icon color="blue darken-2">list</v-icon>
                      </v-btn>
                        <v-card>
                          <v-card-title>
                            <span class="headline">
                              Show Warehouses
                            </span>
                          </v-card-title>
                          <v-card-text>
                            <v-container grid-list-md>
                              <template>
                                <div class="primary">
                                  <v-toolbar flat color="white" dark class="primary">
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
                            <v-btn color="blue darken-1" flat @click="dialog_table = false">NO</v-btn>
                            <v-btn color="blue darken-1" flat @click="dialog_table = false">YES</v-btn>
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
    
    <!-- 中间 数据表 -->
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
import { getWarehouse } from '../api/warehouse';
// import { getWarehouse1 } from '../api/warehouse';
import { getMainList } from '../api/mainList';

import Dialog from '../components/dialog';
import OCard from '../components/OCard';
// import { Cascader } from 'iview';
import Datatable from '../components/datatable';

import { formApi } from '../api/index.js';
const API = { formApi };

export default {
  components: {
    // VWidget,
    // Goods,
    // Control,
    // FloatBtn,
    Dialog,
    OCard,
    // Cascader,
    Datatable,
    // Warehouse
  },
  data: () => ({
    // dialog初始化
    dialog_table: false,
    dialog_edit: false,
    // 搜索初始化
    search: '',          
    search_warehouse: '',
    desserts: [],
    editedIndex: -1,
    // 初始化bu，楼栋，楼层
    // items_bu: [],
    // items_building: [],
    // items_floor: [],
    // datatable标题
    headers: [
      { text: 'BU', align: 'left', sortable: true, value: 'bu' },
      { text: '樓棟', align: 'center', sortable: true, value: 'building' },
      { text: '樓層', align: 'center', value: 'floor' }
    ],
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
    value1: [], // cascade选择后的值
  }),
  // 计算属性
  computed: {
    // 获取仓库信息API
    // warehouses1 () {
    //   return getWarehouse1();
    // },
    warehouses () {
      return getWarehouse();
    },
    
    // 修改dialog标题控制
    formTitle () {
      return this.editedIndex === -1 ? 'New Warehouse' : 'Edit Warehouse';
    }
  },
  // 监听
  watch: {
    // dialog关闭控制
    dialog_table (val) {
      val || this.close();
    },
    dialog_edit (val) {
      val || this.close();
    }
  },
  // mounted () {
  //   // 请求API
  //   API.formApi.getForm().then(res => {
  //     const data = res.data;
  //     console.log(data);
  //     if (data.success) {
  //       this.items = data.data;
  //     } else {
  //       console.log(data.message);
  //       this.legends = [];
  //     }
  //   });
  // },
  
  created () {
    // 测试API链接
    this.initialize();
    this.$axios('http://wwtliu.com/sxtstu/blueberrypai/getIndexBanner.php')
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    this.$axios('http://10.132.49.131:8000/wms/')
      .then(res => {
        console.log(res.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    // items () {
    //   return getMainList().then(res => {
    //     if (res && res.status === 200) {
    //       return res.data;
    //     }
    //   });
    // },
    // warehouses () {
    //   return getWarehouse().then(res => {
    //     if (res && res.status === 200) {
    //       console(res);
    //       return res.data;
    //     } else {
    //       return warehouses;
    //     }
    //   });
    // },

    // 重置datatable中的数据 desserts对象
    initialize () {
      this.desserts = this.warehouses;
    },
    
    // 编辑datatable数据
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog_edit = true;
    },
    // 删除datatable数据
    deleteItem (item) {
      const index = this.desserts.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
    },
    // 关闭dialog
    close () {
      this.dialog_edit = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    // 保存修改信息
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    // 输出excel表格
    export2Excel2 () {
      // require//.ensure([], () => {
      //   const { export_json_to_excel } = require('../vendor/Export2Excel');
      //   const tHeader = ['BU', 'Building', 'Floor'];
      //   const filterVal = ['bu', 'building', 'floor'];
      //   const list = this.desserts;
      //   const data = this.formatJson(filterVal, list);
      //   export_json_to_excel(tHeader, data, 'WarehouseExcel');
      // });
    },
    formatJson (filterVal, jsonData) {
      console.log(jsonData);
      return jsonData.map(v => filterVal.map(j => v[j]));
    },


  },
};

</script>
<style lang='stylus' scoped>
.top
  height: 50px;
.select
  margin-top: -5px;
.top_title
  font-size: 20px;
  margin-left: 22px;
  margin-top: -30px;
.btn_div
  margin-top: -30px;
</style>