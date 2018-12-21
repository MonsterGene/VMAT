<template>
  <v-container
    grid-list-xl
    fluid
  >
    <div
      id="header"
      class="primary"
    >
      <input
        class="primary lighten-2"
        type="button"
        value="电"
      />
      <input
        class="primary lighten-2"
        type="button"
        value="水"
      />
      <input
        class="primary lighten-2"
        type="button"
        value="气"
      />
    </div>
    <v-layout
      row
      wrap
      justify-end
    >
    <!-- <embed
      type="application/pdf"
      src="http://10.167.192.146/StaticSource/EnergyManagement/E5_1_5F.pdf"
      style="width:100%;height:100%;padding:10px"
    /> -->
     <v-flex md1 d-flex style="height:">
      <v-select
        :items="items"
        label="楼栋："
        dense
      ></v-select>
    </v-flex>
    <v-flex md2 d-flex>
      <v-select
        :items="items2"
        label="主体单元："
        dense
      ></v-select>
    </v-flex>
    <v-flex md1 d-flex>
      <v-select
        :items="items3"
        label="楼层："
        dense
      ></v-select>
    </v-flex>
    <v-flex md2>
      <v-menu
        ref="menu1"
        :close-on-content-click="false"
        v-model="menu1"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="dateFormatted"
          label="Start"
          persistent-hint
          prepend-icon="event"
          @blur="date = parseDate(dateFormatted)"
        ></v-text-field>
        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex md2>
      <v-menu
        ref="menu2"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="dateFormatted"
          label="End"
          persistent-hint
          @blur="date = parseDate(dateFormatted)"
        ></v-text-field>
        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex md1 d-flex>
      <v-select
        :items="items4"
        label="班别："
        dense
      ></v-select>
    </v-flex>
    <v-flex md2 class="py-2">
      <v-btn-toggle v-model="text">
        <v-btn flat value="left">
          日
        </v-btn>
        <v-btn flat value="center">
          月
        </v-btn>
        <v-btn flat value="right">
          季度
        </v-btn>
        <v-btn flat value="justify">
          年
        </v-btn>
      </v-btn-toggle>
    </v-flex>
    <img src="../static/pics/E5_1F.png" width="100%" height="100%"/>
  </v-layout>
</v-container>
</template>

<script>
/**
 * import { demoApi, pageApi } from '../api';
 * fetch legends data 使用api接口代码示例
 * pageApi.lineApi.getStateLegends().then(response => {
 *   //你的处理程序
 *   //response 是请求的响应信息 response
 *   //后台实际返回的数据 res.data
 * });
 */
import moment from 'moment';
import { homeApi } from '../api';
import VWidget from '@/components/VWidget';
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
const echarts = window.echarts || undefined;

export default {
  components: {
    VWidget,
    MiniStatistic
  },
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    items: ['E5', 'D10'],
    items2: ['BU', '楼层'],
    items3: ['1F', '1.5F', '2F'],
    items4: ['白班', '晚班']
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  // mounted () {},
  methods: {
    // initCharts () {},
    formatDate (date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    parseDate (date) {
      if (!date) return null;
      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  },
};
</script>

<style lang='stylus' scoped>
#header {
  width: 100%;
  height: 40px;

  input {
    width: 100px;
    height: 30px;
    margin: 15px;
    margin-top: 5px;
    color: #FFFFFF;
    margin-left: 50px;
  }
}

.chart1-text {
  text-align: center;
}
</style>
