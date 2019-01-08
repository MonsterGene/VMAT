<template>
  <v-layout row justify-center>
    <v-flex>
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

    <v-flex>
      <v-dialog v-model="dialog" persistent max-width="600px">
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
      
      <v-btn @click="export2Excel" class="mb-2" color="green">GET EXCEL</v-btn>
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
    </v-flex>
    
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      {
        text: 'BU',
        align: 'left',
        sortable: false,
        value: 'bu'
      },
      { text: 'Building', value: 'building' },
      { text: 'Floor', value: 'floor' },
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
    export2Excel () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../vendor/Export2Excel');
        const tHeader = ['物品名称'];
        const filterVal = ['project_name'];
        const list = this.desserts;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '列表excel');
      });
    },
    formatJson (filterVal, jsonData) {
      console.log(jsonData);
      return jsonData.map(v => filterVal.map(j => v[j]));
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