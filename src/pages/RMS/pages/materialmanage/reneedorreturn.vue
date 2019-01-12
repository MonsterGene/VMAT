<template>
<v-container grid-list-xl fluid>
    <v-card>
      <v-card-title>
        Nutrition
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          class="tb"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          dark
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      >
        <template slot="items" slot-scope="props" class="tb">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.SN }}</td>
          <td class="text-xs-right">{{ props.item.Location }}</td>
          <td class="text-xs-right">{{ props.item.CPN }}</td>
          <td class="text-xs-right">{{ props.item.QTY }}</td>
          <td class="text-xs-right">{{ props.item.Chinesename }}</td>
        </template>
        <v-alert slot="no-results" :value="true" color="red" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'BU (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'SN', value: 'SN' },
        { text: 'Location', value: 'Location' },
        { text: 'CPN', value: 'CPN' },
        { text: 'QTY', value: 'QTY' },
        { text: 'Chinesename', value: 'Chinesename' }
      ],
      desserts: [
        {
          value: false,
          name: 'MFGI',
          SN: ' FCH2252DHRR',
          Location: 'R258',
          CPN: '73-18068-07',
          QTY: 4,
          Chinesename: '郭宝明'
        },
        {
          value: false,
          name: 'MFGII',
          SN: 'FCH2252E0NZ',
          Location: 'L256',
          CPN: '73-18069-07',
          QTY: 4,
          Chinesename: '曹雪兰'
        },
        {
          value: false,
          name: 'MFGIII',
          SN: 'FCH2252DJ5Y',
          Location: ' U5',
          CPN: '73-18069-07',
          QTY: 6,
          Chinesename: '苏诚诚'
        },
        {
          value: false,
          name: 'MFGV',
          SN: 'FCH2252DJ61',
          Location: 'U56',
          CPN: '73-18069-07',
          QTY: 4,
          Chinesename: '光华'
        },
        {
          value: false,
          name: 'MFGVI',
          SN: 'FCH2252DJQN',
          Location: 'U2',
          CPN: '73-18069-07',
          QTY: 3,
          Chinesename: '德才'
        },
        {
          value: false,
          name: 'MFGVII',
          SN: 'FCH2244D1N1',
          Location: 'L12',
          CPN: '73-18069-07',
          QTY: 0,
          Chinesename: '郭宝明'
        },
        {
          value: false,
          name: 'MFGVIII',
          SN: 'FCH2252E3DU',
          Location: 'U55',
          CPN: '73-18069-07',
          QTY: 0,
          Chinesename: '杨磊'
        },
      ]
    };
  }
};
</script>

<style lang='stylus' scoped>
  .tb{
    background-color #007ACC
  }
</style>