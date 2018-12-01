<template>
  <div class="">
    <v-btn flat color="indigo" @click="onExport">
      <v-icon>flight_takeoff</v-icon> Export to Excel
    </v-btn>
</div>
</template>

<script>
import XLSX from 'xlsx';
export default {
  components: {
  },
  props: ['jsonData'],
  data () {
    return {

    };

  },
  methods: {
    onExport () { // On Click Excel download button
      const jsonWS = XLSX.utils.json_to_sheet(this.jsonData); 
      const wb = XLSX.utils.book_new(); // make Workbook of Excel
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, jsonWS, 'sheet'); // sheetAName is name of Worksheet
      // export Excel file, will download automatically.
      const xlsxFile = XLSX.writeFile(wb, 'testdata_' + this.getCurrentDate() + '.xlsx'); // name of the file is 'book.xlsx'
    },
    getCurrentDate () {
      const d = new Date();
      const year = d.getFullYear().toString();
      const month = d.getMonth().toString();
      const day = d.getDate().toString();
      const hour = d.getHours().toString();
      const min = d.getMinutes().toString();
      const sec = d.getSeconds().toString();
      return year + month + day + '_' + hour + min + sec;
    },
  }
};
</script>

<style lang='stylus' scoped>
</style>