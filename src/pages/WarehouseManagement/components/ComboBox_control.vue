<template>
  <v-combobox
    v-model="model"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    :search-input.sync="search"
    hide-selected
    label="人工錄入屬性選擇"
    multiple
    clearable
    small-chips
    solo
    @blur="restore(show)"
    @focus="change(show)"
    @click="change(show)"
  >
    <template slot="no-data">
      <v-list-tile>
        <span class="subheading">Create</span>
        <v-chip
          :color="`${colors[nonce - 1]} lighten-3`"
          label
          small
        >
          {{ search }}
        </v-chip>
      </v-list-tile>
    </template>
    <template
      v-if="item === Object(item)"
      slot="selection"
      slot-scope="{ item, parent, selected, index }"
    >
      <div v-if="show === 1">
        <v-chip
          :color="`${item.color} lighten-3`"
          :selected="selected"
          label
          small
      >
        <span class="pr-2">
          {{ item.text }}
        </span>
        <v-icon
            small
            @click="parent.selectItem(item)"
          >close</v-icon>
        </v-chip>
      </div>
      <div v-if="show === 0">
        <v-chip 
          v-if="index === 0"
          :color="`${item.color} lighten-3`"
          small
        > 
          <span>{{ item.text }}</span>
        </v-chip>
        <span
          v-if="index === 1"
          class="grey--text caption"
        >(+{{ model.length - 1 }} others)</span>
      </div>
      
      
    </template>
    <template
      slot="item"
      slot-scope="{ index, item, parent }"
    >
      <v-list-tile-content>
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip
          v-else
          :color="`${item.color} lighten-3`"
          dark
          label
          small
        >
          {{ item.text }}
        </v-chip>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <v-list-tile-action @click.stop>
        <v-btn
          icon
          @click.stop.prevent="edit(index, item)"
        >
          <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
        </v-btn>
      </v-list-tile-action>
    </template>
  </v-combobox>
</template>
<script>
export default {
  data: () => ({
    show: 0,
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    index: -1,
    items: [
      { text: '費用來源', color: 'blue' },
      { text: '申請單號', color: 'red' },
      { text: '廠商', color: 'blue' },
      { text: '圖片', color: 'blue' },
      { text: 'S/N', color: 'blue' },
      { text: 'Cisco編號', color: 'blue' },
      { text: '財產編號', color: 'blue' },
      { text: '管制編號', color: 'blue' },
      { text: '歸檔號', color: 'blue' },
      { text: '關務編號', color: 'blue' },
      { text: '校驗管制編號', color: 'blue' },
      { text: '數量', color: 'blue' },
      { text: '到貨時間', color: 'blue' },
      { text: '驗收人', color: 'blue' },
      { text: '領用時間', color: 'blue' },
      { text: '領用人/負責人', color: 'blue' },
      { text: '樓層', color: 'blue' },
      { text: '存放位置', color: 'blue' },
      { text: 'Chamber尺寸(內部)', color: 'blue' },
      { text: 'Chamber尺寸(外部)', color: 'blue' },
      { text: 'Chamber測試溫度範圍', color: 'blue' },
      { text: '處理發熱能力', color: 'blue' },
      { text: '電源', color: 'blue' },
      { text: '功率', color: 'blue' },
      { text: '用水規格', color: 'blue' },
      { text: '使用狀態', color: 'blue' },
      { text: '濕氣規格', color: 'blue' },
      { text: '用氣規格', color: 'blue' },
      { text: '測試CELL數量', color: 'blue' },
      { text: 'UUT功率數量', color: 'blue' },
      { text: 'UUT功率規格', color: 'blue' },
      { text: '熱/冷命令', color: 'blue' },
      { text: '開始/結束命令', color: 'blue' },
      { text: '保修截止日期', color: 'blue' },
      { text: '保修截止日期', color: 'blue' },
      { text: '故障時間', color: 'blue' },
      { text: '故障現象', color: 'blue' },
      { text: '故障原因', color: 'blue' },
      { text: '維修內容', color: 'blue' },
      { text: '維修人員', color: 'blue' },
      { text: '備註', color: 'blue' }
    ],
    nonce: 1,
    menu: false,
    model: null,
    x: 0,
    search: null,
    y: 0
  }),

  watch: {
    model (val, prev) {
      if (val.length === prev.length) return;

      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1]
          };

          this.items.push(v);

          this.nonce++;
        }

        return v;
      });
    }
  },

  methods: {
    change (show) {
      this.show = 1;
      return this.show;
    },
    restore (show) {
      this.show = 0;
      return this.show;
    },
    edit (index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false;

      // const hasValue = val => val != null ? val : '';
      const hasValue = function (val) {
        return val != null ? val : '';
      };

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1;
    }
  }
};
</script>