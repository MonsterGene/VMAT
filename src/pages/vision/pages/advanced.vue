<template>
  <div id="test-data-dashboard">
    <v-layout row wrap>
      <v-flex sm12>
        <v-widget title="Advanced Test Data Search">
          <div slot="widget-content">
            <v-flex>
              <v-alert
                v-model="alert"
                dismissible
                :color="alert_color"
              >
                {{ alert_message }}
              </v-alert>
            </v-flex>
            <v-container fluid>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-layout row wrap>
                  <v-flex d-flex sm4 lg4>
                    <v-layout row wrap>
                      <v-flex sm6 lg6 d-flex>
                        <v-textarea outline rows="2" label="UUT Type" v-model="uuttype">
                        </v-textarea>
                      </v-flex> 
                      <v-flex sm6 lg6 d-flex>
                        <v-textarea outline rows="2" label="Area" v-model="area">
                        </v-textarea>
                      </v-flex> 
                      <v-flex sm6 lg6 d-flex>
                        <v-textarea outline rows="2" label="Machine" v-model="machine">
                        </v-textarea>
                      </v-flex> 
                      <v-flex sm6 lg6 d-flex>
                        <v-textarea outline rows="2" label="Serial Number" v-model="sernum">
                        </v-textarea>
                      </v-flex> 
                    </v-layout>
                  </v-flex> 

                  <v-flex d-flex sm1 lg1>
                  </v-flex>
                  <v-flex d-flex sm7 lg7>
                    <v-layout row wrap>
                      <v-flex sm6 lg6>
                        <v-menu
                          class="pr-2"
                          ref="setStatDate"
                          lazy
                          :close-on-content-click="false"
                          v-model="startDateMenu"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-bottom="-22"
                          max-width="290px"
                          :return-value.sync="startDate"
                        >
                          <v-text-field
                            slot="activator"
                            label="Start Date"
                            v-model="startDate"
                            append-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="startDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="startDateMenu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.setStatDate.save(startDate)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex> 
                      <v-flex sm6 lg6>
                        <v-menu
                          ref="setEndDate"
                          lazy
                          class="pr-2"
                          :close-on-content-click="false"
                          v-model="endDateMenu"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-bottom="-22"
                          min-width="290px"
                          :return-value.sync="endDate"
                        >
                          <v-text-field
                            slot="activator"
                            label="End Date"
                            v-model="endDate"
                            append-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="endDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.setEndDate.save(endDate)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex>
                        <v-checkbox
                          :label="`Fail `"
                          color="purple"
                          v-model="fail_box"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex>
                        <v-checkbox
                          :label="`Pass `"
                          color="purple"
                          v-model="pass_box"
                        ></v-checkbox>
                      </v-flex>
                      <!-- <v-flex>
                        <v-checkbox
                          :label="`Start `"
                          color="purple"
                          v-model="start_box"
                        ></v-checkbox>
                      </v-flex> -->
                      <v-flex>
                        <v-checkbox
                          :label="`Abort `"
                          color="purple"
                          v-model="abort_box"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex>
                        <v-checkbox
                          :label="`DEBUG `"
                          color="purple"
                          v-model="debug_box"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex xl4>
                        <v-btn large
                          color="primary"
                          :loading="loading"
                          @click.native="loading = true; dialog = true"
                          @click="getYieldThroughput"
                          :disabled="loading"
                        >
                          Search
                          <span slot="loader">Loading...</span>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex> 
                  <v-flex>
                    <div class="text-xs-center">
                      <v-dialog
                        v-model="dialog"
                        hide-overlay
                        persistent
                        width="300"
                      >
                        <v-card
                          color="primary"
                          dark
                        >
                          <v-card-text>
                            Loading data, please wait...
                            <v-progress-linear
                              indeterminate
                              color="white"
                              class="mb-0"
                            ></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </div>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
    
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg4 md4 sm12 xs12>
          <v-card>
            <v-card-text>
              <div class="layout row ma-0 align-center justify-space-between">
                <div class="text-box">
                  <div class="subheading pb-2">First Yield</div>
                  <span class="grey--text">{{ first_mini_title }}</span>
                </div>
                <div class="details">
                  <v-layout row>
                  <v-tooltip top style="margin-right: -15px;">
                    <v-btn flat icon color="error" slot="activator" @click="updateAllFailTable('First Fail'); jumpToDataTable()">
                      <v-icon>trending_down</v-icon>
                    </v-btn>
                    <span>Fail Data Table</span>
                  </v-tooltip>
                  <v-tooltip top style="margin-right: -5px;">
                    <v-btn flat icon color="success" slot="activator" @click="updateAllPassTable('First Pass'); jumpToDataTable()">
                      <v-icon>trending_up</v-icon>
                    </v-btn>
                    <span>Pass Data Table</span>
                  </v-tooltip>
                  </v-layout>
                </div>
              </div>
            </v-card-text>
          </v-card> 
        </v-flex>
        <!-- mini panel -->
        <v-flex lg4 md4 sm12 xs12>
          <v-card>
            <v-card-text>
              <div class="layout row ma-0 align-center justify-space-between">
                <div class="text-box">
                  <div class="subheading pb-2">Test Yield</div>
                  <span class="grey--text">{{ test_mini_title }}</span>
                </div>
                <div class="details">
                  <v-layout row>
                  <v-tooltip top style="margin-right: -15px;">
                    <v-btn flat icon color="error" slot="activator" @click="updateAllFailTable('Test Fail'); jumpToDataTable()">
                      <v-icon>trending_down</v-icon>
                    </v-btn>
                    <span>Fail Data Table</span>
                  </v-tooltip>
                  <v-tooltip top style="margin-right: -5px;">
                    <v-btn flat icon color="success" slot="activator" @click="updateAllPassTable('Test Pass'); jumpToDataTable()">
                      <v-icon>trending_up</v-icon>
                    </v-btn>
                    <span>Pass Data Table</span>
                  </v-tooltip>
                  </v-layout>
                </div>
              </div>
            </v-card-text>
          </v-card> 
        </v-flex>
        <v-flex lg4 md4 sm12 xs12>
          <v-card>
            <v-card-text>
              <div class="layout row ma-0 align-center justify-space-between">
                <div class="text-box">
                  <div class="subheading pb-2">Board Yield</div>
                  <span class="grey--text">{{ board_mini_title }}</span>
                </div>
                <div class="details">
                  <v-layout row>
                  <v-tooltip top style="margin-right: -15px;">
                    <v-btn flat icon color="error" slot="activator" @click="updateAllFailTable('Board Fail'); jumpToDataTable()">
                      <v-icon>trending_down</v-icon>
                    </v-btn>
                    <span>Fail Data Table</span>
                  </v-tooltip>
                  <v-tooltip top style="margin-right: -5px;">
                    <v-btn flat icon color="success" slot="activator" @click="updateAllPassTable('Board Pass'); jumpToDataTable()">
                      <v-icon>trending_up</v-icon>
                    </v-btn>
                    <span>Pass Data Table</span>
                  </v-tooltip>
                  </v-layout>
                </div>
              </div>
            </v-card-text>
          </v-card> 
        </v-flex>

        <v-expansion-panel
          v-model="panel"
          expand
        >
        <v-expansion-panel-content readonly>
          <div slot="header">First Yield/Throughput/Fail Data Panel</div>
          <v-divider></v-divider>
          <!-- first data -->
          <v-layout row wrap>
          <v-flex lg6 md6 sm12 xs12>
            <yield-chart title="First Yield/Throughput" :chart-data="firstList" ref="firstYieldChart">
            </yield-chart>
          </v-flex>
          <v-flex lg6 md6 sm12 xs12>
              <fail-pie-chart 
                :title="first_fail_title"
                name="First Fail" 
                :chart-data="first_fail_list" 
                @needFreshData="failPieChartFresh('First Fail')"
                ref="firstFailChart"
              >
              </fail-pie-chart>
          </v-flex>
          </v-layout>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Test Yield/Throughput/Fail Data Panel</div>
          <v-divider></v-divider>
          <!-- test data -->
          <v-layout row>
          <v-flex lg6 md6 sm12 xs12>
            <yield-chart title="Test Yield/Throughput" :chart-data="testList" ref="testYieldChart">
            </yield-chart>          
          </v-flex>
          <v-flex lg6 md6 sm12 xs12>
              <fail-pie-chart 
                :title="test_fail_title" 
                name="Test Fail" 
                :chart-data="test_fail_list" 
                @needFreshData="failPieChartFresh('Test Fail')"
                ref="testFailChart"
              >
              </fail-pie-chart>           
          </v-flex>
          </v-layout>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Board Yield/Throughput/Fail Data Panel</div>
          <v-divider></v-divider>
          <!-- board data -->
          <v-layout row>
          <v-flex lg6 md6 sm12 xs12>
            <yield-chart title="Board Yield/Throughput" :chart-data="boardList" ref="boardYieldChart">
            </yield-chart>             
          </v-flex>
          <v-flex lg6 md6 sm12 xs12>
            <fail-pie-chart 
              :title="board_fail_title" 
              name="Board Fail" 
              :chart-data="board_fail_list" 
              @needFreshData="failPieChartFresh('Board Fail')"
              ref="boardFailChart"
            >
            </fail-pie-chart>             
          </v-flex>
          </v-layout>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-flex lg12 sm12 xs12 id="test-data-table">
          <data-table
            :search="dataSearch"
            :title="dataTableTitle"
            :testDataSource="dataSource"
          ></data-table>
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <fail-pie-chart 
            :title="fail_by_area_title" 
            name="By Day" 
            :chart-data="by_area_dataSource" 
            @needFreshData="failPieChartFresh('By Area')"
            ref="failAnalysisByArea"
          >
          </fail-pie-chart>             
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <fail-pie-chart
            :title="fail_by_area_detail_title" 
            name="By Area" 
            :chart-data="by_area_dataSource_detail_a" 
            @needFreshData="failPieChartFresh('By Area')"
            ref="failAnalysisByAreaDetail"
          >
          </fail-pie-chart>             
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <fail-pie-chart 
            :title="fail_by_uuttype_title" 
            name="By Day" 
            :chart-data="by_uuttype_dataSource"
            @needFreshData="failPieChartFresh('By UUTTYPE')"
            ref="failAnalysisByUuttype"
          >
          </fail-pie-chart>             
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <fail-pie-chart 
            :title="fail_by_uuttype_detail_title" 
            name="By UUTTYPE" 
            :chart-data="by_uuttype_dataSource_detail_a"
            @needFreshData="failPieChartFresh('By UUTTYPE')"
            ref="failAnalysisByUuttypeDetail"
          >
          </fail-pie-chart>             
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <fail-pie-chart 
            :title="fail_by_machine_title" 
            name="By Day" 
            :chart-data="by_machine_dataSource"
            @needFreshData="failPieChartFresh('By Machine')"
            ref="failAnalysisByMachine"
          >
          </fail-pie-chart>             
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <fail-pie-chart 
            :title="fail_by_machine_detail_title" 
            name="By Machine" 
            :chart-data="by_machine_dataSource_detail_a"
            @needFreshData="failPieChartFresh('By Machine')"
            ref="failAnalysisByMachineDetail"
          >
          </fail-pie-chart>             
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <fail-pie-chart 
            :title="fail_by_container_detail_title" 
            name="By Machine" 
            :chart-data="by_container_dataSource_detail_a"
            @needFreshData="failPieChartFresh('By Container')"
            ref="failAnalysisByContainerDetail"
          >
          </fail-pie-chart>             
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import EChart from '@/components/chart/echart';
import { getAdvanced, getAnalysis } from '../api/advanced';
import Material from 'vuetify/es5/util/colors';
import MiniChart from '@/components/widgets/chart/MiniChart';
import BoxChart from '@/components/widgets/chart/BoxChart';
import VWidget from '@/components/VWidget';
import YieldChart from '../components/YieldChart';
import FailPieChart from '../components/FailPieChart';
import DataTable from '../components/DataTable';

export default {
  components: {
    BoxChart,
    MiniChart,
    EChart,
    VWidget,
    YieldChart,
    FailPieChart,
    DataTable,
  },
  data () {
    return {
      // for alert
      alert: false,
      alert_color: 'warning',
      alert_message: 'it is error',
      valid: true,
      // for date picker
      startDateMenu: false,
      endDateMenu: false,
      startDate: this.getCurrentDate(6),
      endDate: this.getCurrentDate(),
      uuttype: '',
      area: '',
      machine: '',
      sernum: '',
      mode: '',
      result: '', 
      test: '', 
      // for search button
      loading: false,
      // for progress
      dialog: false,
      // for check box
      start_box: false,
      abort_box: false,
      fail_box: true,
      pass_box: true,
      debug_box: false,
      // for mini chart
      first_mini_title: '',
      test_mini_title: '',
      board_mini_title: '',
      // the data from backend
      responseData: {},
      // for user input
      model: {
        start_date: '',
        end_date: '',
        uuttype: '',
        area: '',
        machine: '',
        sernum: '',
        mode: '',
        result: '', 
        test: '', 
      },
      // for data from database
      summary: null,
      firstList: [],
      testList: [],
      boardList: [],
      first_fail_list: [],
      test_fail_list: [],
      board_fail_list: [],
      //
      first_fail_title: 'First Yield - Fail Analysis ',
      test_fail_title: 'Test Yield - Fail Analysis ',
      board_fail_title: 'Board Yield - Fail Analysis ',
      //
      dataTableTitle: 'Test Data Details ',
      fail_by_area_title: 'Fail Analysis by Area',
      fail_by_machine_title: 'Fail Analysis by Machine',
      fail_by_uuttype_title: 'Fail Analysis by UUTTYPE',
      fail_by_area_detail_title: 'Fail Analysis',
      fail_by_machine_detail_title: 'Fail Analysis',
      fail_by_container_detail_title: 'Fail Analysis By Container',
      fail_by_uuttype_detail_title: 'Fail Analysis',
      //
      by_area_dataSource: [],
      by_machine_dataSource: [],
      by_uuttype_dataSource: [],
      by_area_dataSource_detail: [],
      by_machine_dataSource_detail: [],
      by_container_dataSource_detail: [],
      by_uuttype_dataSource_detail: [],
      by_area_dataSource_detail_a: [],
      by_machine_dataSource_detail_a: [],
      by_container_dataSource_detail_a: [],
      by_uuttype_dataSource_detail_a: [],
      //
      first_fail_all_dataSource: [],
      test_fail_all_dataSource: [],
      board_fail_all_dataSource: [],
      first_pass_all_dataSource: [],
      test_pass_all_dataSource: [],
      board_pass_all_dataSource: [],
      //
      dataSource: [],
      all_dataSource: [],
      dataSearch: '',
      color: Material,
      // for expansion panel
      panel: [true, true, true],
      
    };
  },
  watch: {
  },  
  created () {
    const params = this.$route.query;
    if (params.machine) { this.machine = params.machine }
    if (params.uuttype) { this.uuttype = params.uuttype }
    if (params.area) { this.area = params.area }
    if (params.sernum) { this.sernum = params.sernum }
    if (params.test) { this.test = params.test }
    if (params.startDate) { this.startDate = params.startDate }
    if (params.endDate) { this.endDate = params.endDate }
  },  
  mounted () {
    if (this.machine || this.uuttype || this.area || this.sernum) {
      this.loading = true;
      this.dialog = true;
      setTimeout(() => {  // set time out to make sure all charts are inited.
        this.getYieldThroughput();
      }, 3000);
    }

    this.$refs.firstYieldChart.chartInstance.on('click', evt => {
      const name = evt.name;
      this.first_fail_title = 'First Yield - Fail Analysis - ' + name;
      this.fail_by_area_title = 'First Fail Analysis by Area - ' + name;
      this.fail_by_machine_title = 'First Fail Analysis by Machine - ' + name;
      this.fail_by_uuttype_title = 'First Fail Analysis by UUTTYPE - ' + name;
      this.dataTableTitle = 'First Yield - Fail Raw Data - ' + name;
      this.first_fail_list = this.responseData.first_fail_list_by_day[name];
      this.model.start_date = name + ' 00:00:00';
      this.model.end_date = name + ' 23:59:59';
      if (!this.debug_box) { this.model.mode = 'PROD' } else { this.model.mode = 'PROD,DEBUG' }
      if (this.pass_box) { this.model.result += 'P' }
      if (this.fail_box) { this.model.result += ' F' }
      if (this.start_box) { this.model.result += ' S' }
      if (this.abort_box) { this.model.result += ' A' }
      this.getFailAnalysis('first_data');
      this.dataSearch = '';
    });
    this.$refs.testYieldChart.chartInstance.on('click', evt => {
      const name = evt.name;
      this.test_fail_title = 'Test Yield - Fail Analysis - ' + name;
      this.fail_by_area_title = 'Test Fail Analysis by Area - ' + name;
      this.fail_by_machine_title = 'Test Fail Analysis by Machine - ' + name;
      this.fail_by_uuttype_title = 'Test Fail Analysis by UUTTYPE - ' + name;
      this.dataTableTitle = 'Test Yield - Fail Raw Data - ' + name;
      this.test_fail_list = this.responseData.test_fail_list_by_day[name];
      this.model.start_date = name + ' 00:00:00';
      this.model.end_date = name + ' 23:59:59';
      if (!this.debug_box) { this.model.mode = 'PROD' } else { this.model.mode = 'PROD,DEBUG' }
      if (this.pass_box) { this.model.result += 'P' }
      if (this.fail_box) { this.model.result += ' F' }
      if (this.start_box) { this.model.result += ' S' }
      if (this.abort_box) { this.model.result += ' A' }
      this.getFailAnalysis('test_data');
      this.dataSearch = '';
    });
    this.$refs.boardYieldChart.chartInstance.on('click', evt => {
      const name = evt.name;
      this.board_fail_title = 'Board Yield - Fail Analysis - ' + name;
      this.fail_by_area_title = 'Board Fail Analysis by Area - ' + name;
      this.fail_by_machine_title = 'Board Fail Analysis by Machine - ' + name;
      this.fail_by_uuttype_title = 'Board Fail Analysis by UUTTYPE - ' + name;
      this.dataTableTitle = 'Board Yield - Fail Raw Data - ' + name;
      this.board_fail_list = this.responseData.board_fail_list_by_day[name];
      this.model.start_date = name + ' 00:00:00';
      this.model.end_date = name + ' 23:59:59';
      if (!this.debug_box) { this.model.mode = 'PROD' } else { this.model.mode = 'PROD,DEBUG' }
      if (this.pass_box) { this.model.result += 'P' }
      if (this.fail_box) { this.model.result += ' F' }
      if (this.start_box) { this.model.result += ' S' }
      if (this.abort_box) { this.model.result += ' A' }
      this.getFailAnalysis('board_data');
      this.dataSearch = '';
    });
    //
    this.$refs.firstFailChart.chartInstance.on('click', evt => {
      this.dataSearch = evt.name;
    });

    this.$refs.testFailChart.chartInstance.on('click', evt => {
      this.dataSearch = evt.name;
    });
    this.$refs.boardFailChart.chartInstance.on('click', evt => {
      this.dataSearch = evt.name;
    });
    // for by area chart / by machine chart
    this.$refs.failAnalysisByArea.chartInstance.on('click', evt => {
      const name = evt.name;
      this.fail_by_area_detail_title = 'Fail Analysis - ' + name;
      this.by_area_dataSource_detail_a = this.by_area_dataSource_detail[name];
    });
    this.$refs.failAnalysisByMachine.chartInstance.on('click', evt => {
      const name = evt.name;
      this.fail_by_machine_detail_title = 'Fail Analysis - ' + name;
      this.fail_by_container_detail_title = 'Fail Analysis by Container - ' + name;
      this.by_machine_dataSource_detail_a = this.by_machine_dataSource_detail[name];
      this.by_container_dataSource_detail_a = this.by_container_dataSource_detail[name];
    });
    this.$refs.failAnalysisByUuttype.chartInstance.on('click', evt => {
      const name = evt.name;
      this.fail_by_uuttype_detail_title = 'Fail Analysis - ' + name;
      this.by_uuttype_dataSource_detail_a = this.by_uuttype_dataSource_detail[name];
    });
  },
  methods: {
    getCurrentDate (delta = 0) {
      const d = new Date();
      d.setDate(d.getDate() - delta);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      return year + '-' + month + '-' + day;
    },
    handleTabChange (val, e) {
      // make sure the chart resized while parent from hidden to show
      window.dispatchEvent(new Event('resize'));
    },
    getYieldThroughput () {
      this.model.start_date = this.startDate + ' 00:00:00';
      this.model.end_date = this.endDate + ' 23:59:59';
      if (!this.debug_box) { this.model.mode = 'PROD' } else { this.model.mode = 'PROD,DEBUG' }
      if (this.pass_box) { this.model.result += 'P' }
      if (this.fail_box) { this.model.result += ' F' }
      if (this.start_box) { this.model.result += ' S' }
      if (this.abort_box) { this.model.result += ' A' }
      this.model.uuttype = this.uuttype;
      this.model.sernum = this.sernum;
      this.model.area = this.area;
      this.model.machine = this.machine;

      const params = {
        'data_type': 'first_data',
        'start_date': this.model.start_date,
        'end_date': this.model.end_date,
        'uuttype': this.model.uuttype,
        'sernum': this.model.sernum,
        'area': this.model.area,
        'machine': this.model.machine,
        'result': this.model.result,
        'mode': this.model.mode,
        'test': this.model.test,
      };
      this.loading = true;
      this.dialog = true;
      // console.log(params);
      // once search again, clean the detail charts.
      this.dataSource = [];
      this.all_dataSource = [];
      this.by_area_dataSource = [];
      this.by_machine_dataSource = [];
      this.by_uuttype_dataSource = [];
      this.by_area_dataSource_detail = [];
      this.by_machine_dataSource_detail = [];
      this.by_container_dataSource_detail = [];
      this.by_uuttype_dataSource_detail = [];
      this.by_area_dataSource_detail_a = [];
      this.by_machine_dataSource_detail_a = [];
      this.by_container_dataSource_detail_a = [];
      this.by_uuttype_dataSource_detail_a = [];
      this.first_fail_all_dataSource = [];
      this.test_fail_all_dataSource = [];
      this.board_fail_all_dataSource = [];
      this.first_pass_all_dataSource = [];
      this.test_pass_all_dataSource = [];
      this.board_pass_all_dataSource = [];
      //
      getAdvanced(params)
        .then(response => {
          this.responseData = response.data;
          // console.log(this.responseData);
          this.alert = true;
          if (!response.data['status']) {
            this.alert_color = 'warning';
            this.alert_message = response.data['msg'];
          }
          else {
            this.summary = response.data['summary'];
            // it is summary mini chart.
            this.first_mini_title = this.summary['first_yield'] + '% (fail: ' + this.summary['first_fail_qty'] + '/pass: ' + this.summary['first_pass_qty'] + '/total: ' + this.summary['first_total_qty'] + ')';
            this.test_mini_title = this.summary['test_yield'] + '% (fail: ' + this.summary['test_fail_qty'] + '/pass: ' + this.summary['test_pass_qty'] + '/total: ' + this.summary['test_total_qty'] + ')';
            this.board_mini_title = this.summary['board_yield'] + '% (fail: ' + this.summary['board_fail_qty'] + '/pass: ' + this.summary['board_pass_qty'] + '/total: ' + this.summary['board_total_qty'] + ')';
            // show the bar&line chart of yield/throughput
            this.firstList = response.data['first_list'];
            this.testList = response.data['test_list'];
            this.boardList = response.data['board_list'];
            // show the total fail bar chart, and by day fail bar chart if user click the yield/throughput chart
            this.first_fail_list = response.data['first_fail_list'];
            this.test_fail_list = response.data['test_fail_list'];
            this.board_fail_list = response.data['board_fail_list'];
            // it is all fail data, will show it data-table if user click summary mini chart.
            this.first_fail_all_dataSource = response.data['first_fail_all_unit'];
            this.test_fail_all_dataSource = response.data['test_fail_all_unit'];
            this.board_fail_all_dataSource = response.data['board_fail_all_unit'];
            // it is all pass data, will show it data-table if user click summary mini chart.
            this.first_pass_all_dataSource = response.data['first_pass_all_unit'];
            this.test_pass_all_dataSource = response.data['test_pass_all_unit'];
            this.board_pass_all_dataSource = response.data['board_pass_all_unit'];
            //
            this.alert_color = 'success';
            this.alert_message = response.data['cost_time'];
          }
          this.model.result = '';
          this.model.mode = '';
          
          setTimeout(() => {  // set time out to make sure all charts are inited.
            this.panel = [true, false, false];
            this.loading = false;  // for search button
            this.dialog = false;  // for loading window
          }, 1000);
        })
        .catch(e => {
          console.log(e);
          this.alert = true;
          this.alert_color = 'red';
          this.alert_message = 'Service Error, Please Contact Genius Team.';
          this.dialog = false;
          this.model.result = '';
          this.model.mode = '';
        });
    },
    //
    getFailAnalysis (data_type) {
      const params = {
        'data_type': data_type,
        'start_date': this.model.start_date,
        'end_date': this.model.end_date,
        'uuttype': this.model.uuttype,
        'sernum': this.model.sernum,
        'area': this.model.area,
        'machine': this.model.machine,
        'result': this.model.result,
        'mode': this.model.mode,
        'test': this.model.test,
      };
      this.dialog = true;
      // console.log(params);
      getAnalysis(params)
        .then(response => {
          this.alert = true;
          if (!response.data['status']) {
            this.alert_color = 'warning';
            this.alert_message = response.data['msg'];
          }
          else {
            // it will show by fail data raw record if user click yeild/throughput chart.
            this.dataSource = response.data['fail_data'];
            // it will show by day pie chart if user click yeild/throughput chart.
            this.by_area_dataSource = response.data['by_area_fail_data'];
            this.by_machine_dataSource = response.data['by_machine_fail_data'];
            this.by_uuttype_dataSource = response.data['by_uuttype_fail_data'];
            // it will show by fail detail pie chart if user click by day pie chart
            this.by_area_dataSource_detail = response.data['by_area_fail_detail'];
            this.by_machine_dataSource_detail = response.data['by_machine_fail_detail'];
            this.by_container_dataSource_detail = response.data['by_container_fail_detail'];
            this.by_uuttype_dataSource_detail = response.data['by_uuttype_fail_detail'];
            // console.log(response.data);
            this.alert_color = 'success';
            this.alert_message = response.data['cost_time'];

          }
          this.dialog = false;  // for loading window
          this.model.result = '';
          this.model.mode = '';
        })
        .catch(e => {
          console.log(e);
          this.alert = true;
          this.alert_color = 'red';
          this.alert_message = 'Service Error, Please Contact Genius Team.';
          this.dialog = false;
          this.model.result = '';
          this.model.mode = '';
        });
    },

    failPieChartFresh (name) {
      if (name === 'First Fail') {
        this.first_fail_list = this.responseData['first_fail_list'];
        this.first_fail_title = 'First Yield - Fail Analysis ';
      }
      if (name === 'Test Fail') {
        this.test_fail_list = this.responseData['test_fail_list'];
        this.test_fail_title = 'Test Yield - Fail Analysis ';
      }
      if (name === 'Board Fail') {
        this.board_fail_list = this.responseData['board_fail_list'];
        this.board_fail_title = 'Board Yield - Fail Analysis ';
      }
    },
    updateAllFailTable (name) {
      this.dataSearch = '';
      if (name === 'First Fail') {
        this.dataTableTitle = 'First Yield - All Fail Raw Data';
        this.dataSource = this.first_fail_all_dataSource;
      }
      if (name === 'Test Fail') {
        this.dataTableTitle = 'Test Yield - All Fail Raw Data';
        this.dataSource = this.test_fail_all_dataSource;
      }
      if (name === 'Board Fail') {
        this.dataTableTitle = 'Board Yield - All Fail Raw Data';
        this.dataSource = this.board_fail_all_dataSource;
      }
    },
    updateAllPassTable (name) {
      this.dataSearch = '';
      if (name === 'First Pass') {
        this.dataTableTitle = 'First Yield - All Pass Raw Data';
        this.dataSource = this.first_pass_all_dataSource;
      }
      if (name === 'Test Pass') {
        this.dataTableTitle = 'Test Yield - All Pass Raw Data';
        this.dataSource = this.test_pass_all_dataSource;
      }
      if (name === 'Board Pass') {
        this.dataTableTitle = 'Board Yield - All Pass Raw Data';
        this.dataSource = this.board_pass_all_dataSource;
      }
    },
    jumpToDataTable () {
      let container = this.$el.querySelector('#test-data-table');
      document.documentElement.scrollTop = container.scrollHeight + 300;
    }
  },

};
</script>