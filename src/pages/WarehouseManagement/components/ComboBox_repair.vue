<template>
  <v-combobox
    v-model="model"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    :search-input.sync="search"
    hide-selected
    label="Search for an option"
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
      { text: '保修截止日期', color: 'blue' },
      { text: '故障時間', color: 'blue' },
      { text: '故障現象', color: 'blue' },
      { text: '故障原因', color: 'blue' },
      { text: '維修內容', color: 'blue' },
      { text: '維修人員', color: 'blue' },
      { text: '備註', color: 'blue' },
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