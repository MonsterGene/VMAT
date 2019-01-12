<template>
<v-container grid-list-xl fluid>
  <v-form ref="form">
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <label v-bind:style="styleObject" >Material Apply and Dashboard</label>
      </v-flex>
      <v-flex xs2 sm2 d-flex class="bg">
        <v-select
          :items="items"
          label="類別"
          solo
          v-model="formModel.lb"
          :rules="[formRules.required]"
          validate-on-blur
        ></v-select>
      </v-flex>
      <v-flex xs2 sm2 d-flex class="bg">
        <v-select
          :items="items1"
          label="BU"
          solo
          v-model="formModel.bu"
          :rules="[formRules.required]"
          validate-on-blur
        ></v-select>
      </v-flex>
      <v-flex xs2 sm2 md2 class="bg">
        <v-text-field
          label="PCBA/SN"
          solo
          v-model="formModel.sn"
          :rules="[formRules.required]"
          validate-on-blur
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex xs2 sm2 md2 class="bg">
        <v-text-field
          label="Location"
          solo
          v-model="formModel.location"
          :rules="[formRules.required]"
          validate-on-blur
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex xs3 sm3 md3 class="bg">
        <v-text-field
          label="Failure symptom"
          solo
          v-model="formModel.fs"
          :rules="[formRules.required]"
          validate-on-blur
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex xs2 sm2 md2 class="bg">
        <v-text-field
          label="CPN"
          solo
          v-model="formModel.cpn"
          :rules="[formRules.required]"
          validate-on-blur
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex xs2 sm2 md2 class="bg">
        <v-text-field
          label="Vendor"
          solo
          v-model="formModel.vendors"
          :rules="[formRules.required]"
          validate-on-blur
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex xs2 sm2 md2 class="bg">
        <v-text-field
          label="Q'TY"
          solo
          v-model="formModel.qty"
          :rules="[formRules.required]"
          validate-on-blur
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex xs2 sm2 md2 class="bg">
        <v-text-field
          label="chinese name"
          solo
          v-model="formModel.chinese"
          :rules="[formRules.required]"
          validate-on-blur
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex xs3 sm3 md3 class="bg">
        <v-text-field
          label="Remark"
          solo
          v-model="formModel.remark"
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md12 class="btn">
      <v-btn color="blue" @click="refresh" dark>reset</v-btn>
        <v-dialog v-model="dialog" persistent max-width="290">
         <v-btn slot="activator" color="blue" dark>APPLY</v-btn>
          <v-card> 
            <v-card-title class="headline">Confirmation</v-card-title>
            <v-card-text>Attention: Are you sure to apply {{formModel.qty}} pcs CPN: {{formModel.cpn}} ?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialog = false">CANCEL</v-btn>
            <v-btn color="green darken-1" flat @click="apply">YES</v-btn>
            </v-card-actions>
          </v-card> 
        </v-dialog>
        <v-btn 
          color="blue" 
          v-model="pl"
          href="http://10.167.192.233:7777/materials/download" 
          dark
        >
        领料清单
        </v-btn>
      </v-flex>
    </v-layout>
   </v-form>
</v-container>
</template>

<script>
import { ApplyAPI } from '../../api/index';
const API = { ApplyAPI };

export default {
  components: {
  }, 
  // mixins: [globalMixin], 
  data () {
    return {
      dialog: false,
      pl: '',
      formModel: {
        lb: '',
        bu: '',
        sn: '',
        location: '',
        fs: '',
        cpn: '',
        vendors: '',
        qty: '',
        chinese: '',
        remark: ''
      },
      formRules: {
        required: value => !!value || '本项不能为空！',
      },
      items1: ['MFGI', 'MFGII', 'MFGIII', 'MFGV', 'MFGVI', 'MFGVII', 'MFGVIII'],
      items: ['ALL', 'NPI', 'ICT', 'Function', 'CRC', 'RMA', 'ORT', 'Other'],
      styleObject: {
        color: '#2975E6',
        fontSize: '30px',
      },
    };
  },
  methods: {
    refresh: function () {
      this.$refs.form.reset();    //  提交前手动按reset清空表单
    },
    apply: function (event) {
      if (this.$refs.form.validate()) {
        // alert('表单验证成功！');
        ApplyAPI.postApply(this.formModel).then(res => {
          if (res && res.status === 200) {
            this.dialog = false;
            // this.$refs.form.reset();  // 提交成功后自动清空表单
          }
          alert('提交成功');
        });
      }
    },
  }
};
</script>

<style lang='stylus' scoped>
  .echarts
    background-color #FFF
    border-radius 5px
  .btn{
    text-align center
  }
  .bg{
    background-color #424242
  }
</style>
