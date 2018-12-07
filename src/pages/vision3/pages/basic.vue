<template>
  <v-layout row wrap>
    <v-flex sm12>
      <v-widget title="Basic Test Data Search ">
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
            <v-layout row>
              <v-flex xl4>
                <v-text-field
                  name="serialnumber"
                  label="Serial Number"
                  value=""
                  v-model="model.sernum"
                  color="primary"
                  class="input-group--focused"
                ></v-text-field>
              </v-flex>
              <v-flex xl4>
                <v-btn large
                  color="primary"
                  :loading="loading"
                  @click.native="loading = true"
                  @click="getTestData"
                  :disabled="loading"
                >
                  Search
                  <span slot="loader">Loading...</span>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-flex xl4>
              <data-table
                id="snfind-table"
                title="Test Data Details"
                search=""
                :testDataSource="dataSource"
              ></data-table>
            </v-flex>             
          </v-container>
        </div>
      </v-widget>
    </v-flex>
  </v-layout>
</template>

<script>
import VWidget from '@/components/VWidget';
import { getBasic } from '../api/basic';
import DataTable from '../components/DataTable';

export default {
  components: {
    VWidget,
    DataTable,
  },
  data () {
    return {
      loading: false,
      // for alert
      alert: false,
      alert_color: 'warning',
      alert_message: 'it is error',
      dataSource: [],
      model: {
        sernum: '',
      },
    };
  },
  computed: {
  },
  watch: {
  },  
  created () {
    const params = this.$route.query;
    if (params.sernum) {
      this.model.sernum = params.sernum;
      this.getTestData();
    }
  },  
  methods: {
    getTestData () {
      this.loading = true;
      getBasic(this.model.sernum)
        .then(response => {
          // console.log(response.data);
          this.alert = true;
          if (!response.data['status']) {
            this.alert_color = 'warning';
            this.loading = false;
            this.alert_message = response.data['msg'];
          }
          else {
            this.dataSource = response.data['data'];
            this.loading = false;
            this.alert_color = 'success';
            this.alert_message = response.data['cost_time'];
          }
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
          this.alert = true;
          this.alert_color = 'red';
          this.alert_message = 'Service Error, Please Contact Genius Team.';
        });
    },
  }
};
</script>