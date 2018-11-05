<template>
  <div id="social">
    <v-container grid-list-xl fluid>
      <!-- complex chart -->
      <v-layout row wrap>  
        <v-flex lg12 sm12 xs12>
          <v-widget title="稼动率与产能分析" content-bg="white">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', dataset.chart_data1],
                  ['color', [color.amber.base, color.indigo.base, color.teal.base]],
                  ['legend.show', true],
                  ['legend.selected', {'Line 1': false, 'Line 2': false, 'Bar 1': false, 'Bar 2': false}],
                  ['toolbox.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],

                  ['series[0].type', 'line'],
                  ['series[0].label.show', true],
                  ['series[0].smooth', true],
                  
                  ['series[1].type', 'line'],
                  ['series[1].label.show', true],
                  ['series[1].smooth', true],

                  ['series[2].type', 'line'],
                  ['series[2].label.show', true],
                  ['series[2].smooth', true],

                  ['series[3].smooth', true],
                  ['series[3].type', 'bar'],
                  ['series[3].label.show', true],
                  ['series[3].label.position', 'top'],

                  ['series[4].smooth', true],
                  ['series[4].type', 'bar'],
                  ['series[4].label.show', true],
                  ['series[4].label.position', 'top'],

                  ['series[5].smooth', true],
                  ['series[5].type', 'bar'],
                  ['series[5].label.show', true],
                  ['series[5].label.position', 'top'],
                ]"
                height="400px"
                width="100%"
                >
                </e-chart>     
            </div>
          </v-widget>  
        </v-flex>

        <v-flex lg12 sm12 xs12>
          <v-widget title="運行時間(By Day)" content-bg="white">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', dataset.chart_data2],
                  ['color', [color.amber.base, color.indigo.base, color.teal.base]],
                  ['legend.show', true],
                  ['legend.selected', {'Bar 1': false, 'Bar 2': false, 'Bar 3': false, 'Bar 4': false}],
                  ['toolbox.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],

                  ['series[0].type', 'bar'],
                  ['series[0].label.show', true],
                  ['series[0].smooth', true],
                  ['series[3].label.position', 'top'],
                  
                  ['series[1].type', 'bar'],
                  ['series[1].label.show', true],
                  ['series[1].smooth', true],
                  ['series[3].label.position', 'top'],

                  ['series[2].type', 'bar'],
                  ['series[2].label.show', true],
                  ['series[2].smooth', true],
                  ['series[3].label.position', 'top'],

                  ['series[3].smooth', true],
                  ['series[3].type', 'bar'],
                  ['series[3].label.show', true],
                  ['series[3].label.position', 'top'],

                  ['series[4].smooth', true],
                  ['series[4].type', 'bar'],
                  ['series[4].label.show', true],
                  ['series[4].label.position', 'top'],

                  ['series[5].smooth', true],
                  ['series[5].type', 'bar'],
                  ['series[5].label.show', true],
                  ['series[5].label.position', 'top'],
              
                  ['series[6].smooth', true],
                  ['series[6].type', 'bar'],
                  ['series[6].label.show', true],
                  ['series[6].label.position', 'top'],
              
                  ['series[7].smooth', true],
                  ['series[7].type', 'bar'],
                  ['series[7].label.show', true],
                  ['series[7].label.position', 'top'],
              
                  ['series[8].smooth', true],
                  ['series[8].type', 'bar'],
                  ['series[8].label.show', true],
                  ['series[8].label.position', 'top'],
              
                ]"
                height="400px"
                width="100%"
                >
                </e-chart>     
            </div>
          </v-widget>  
        </v-flex>

        <v-flex lg12 sm12 xs12>
          <v-widget title="異常分佈(By Day)" content-bg="white">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', dataset.chart_data1],
                  ['color', [color.amber.base, color.indigo.base, color.teal.base]],
                  ['legend.show', true],
                  ['legend.selected', {'Line 1': false, 'Line 2': false}],
                  ['toolbox.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],

                  ['series[0].type', 'line'],
                  ['series[0].label.show', true],
                  ['series[0].smooth', true],
                  
                  ['series[1].type', 'line'],
                  ['series[1].label.show', true],
                  ['series[1].smooth', true],

                  ['series[2].type', 'line'],
                  ['series[2].label.show', true],
                  ['series[2].smooth', true],

                ]"
                height="400px"
                width="100%"
                >
                </e-chart>     
            </div>
          </v-widget>  
        </v-flex>

        <v-flex lg6 sm12 xs12>
          <v-widget title="机故异常(By Hour)(2018/07/01)">
            <div slot="widget-content">
              <e-chart 
                :path-option="[
                  ['dataset.source', dataset.chart_data1],
                  ['color', [color.amber.base, color.indigo.base, color.teal.base]],
                  ['legend.show', true],
                  ['legend.selected', {'Line 1': false, 'Line 2': false}],
                  ['toolbox.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],

                  ['series[0].type', 'line'],
                  ['series[0].label.show', true],
                  ['series[0].smooth', true],
                  
                  ['series[1].type', 'line'],
                  ['series[1].label.show', true],
                  ['series[1].smooth', true],

                  ['series[2].type', 'line'],
                  ['series[2].label.show', true],
                  ['series[2].smooth', true],

                ]"
                height="400px"
                width="100%"
                >
              </e-chart>   
            </div>
          </v-widget>            
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <v-widget title="机台产出(By Hour)(2018/07/01)">
            <div slot="widget-content">
              <e-chart 
                :path-option="[
                  ['dataset.source', dataset.chart_data1],
                  ['color', [color.indigo.base, color.teal.base]],
                  ['legend.show', true],
                  ['legend.selected', {}],
                  ['toolbox.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],

                  ['series[0].type', 'bar'],
                  ['series[0].label.show', true],
                  ['series[0].smooth', true],
                
                ]"
                height="400px"
                width="100%"
                >
              </e-chart>              
            </div>
          </v-widget>             
        </v-flex>

        <v-flex lg12 sm12 xs12>
          <v-widget title="机故类型分布(2018-11-05)" content-bg="white">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', dataset.chart_data1],
                  ['color', [color.indigo.base, color.teal.base]],
                  ['legend.show', true],
                  ['legend.selected', {}],
                  ['toolbox.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],

                  ['series[0].type', 'line'],
                  ['series[0].label.show', true],
                  ['series[0].smooth', true],
                  
                  ['series[1].type', 'bar'],
                  ['series[1].label.show', true],
                  ['series[1].smooth', true],
                ]"
                height="400px"
                width="100%"
                >
                </e-chart>     
            </div>
          </v-widget>  
        </v-flex>

      </v-layout>

      <v-layout row wrap>
        <v-flex v-for="(item, index) in equipment_list" :key="index" lg1 sm2>
          <v-card color="purple" dark>
            <v-card-title class="pb-0">
              <h4>{{ item }}</h4>
            </v-card-title>
            <v-card-text>
              U: 20pcs/h 
              E: 85%
            </v-card-text>
            <v-card-actions>
              <v-btn flat small>Link</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { data1, data2 } from '../api/chart';
import EChart from '@/components/chart/echart';
import {
  campaignData,
} from '@/api/chart';
import Material from 'vuetify/es5/util/colors';
import VWidget from '@/components/VWidget';
export default {
  components: {
    EChart,
    VWidget
  },
  data () {
    return {
      equipment_list: ['equip 1', 'equip 2', 'equip 3', 'equip 4', 'equip 5', 'equip 6','equip 7'],
      selectedTab: 'tab-1',
      option: null,
      dataset: {
        campaign: campaignData,
        chart_data1: data1,
        chart_data2: data2,
      },
      color: Material,
      
    };
  },
  created () {
    // console.log(this.$refs.chart);
    return false;
  },  
  methods: {
    handleTabChange (val, e) {
      // make sure the chart resized while parent from hidden to show
      window.dispatchEvent(new Event('resize'));
    }
  },
};
</script>