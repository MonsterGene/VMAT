<template>
<v-container grid-list-xl fluid>
    <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.calories }}</td>
      <td class="text-xs-center">{{ props.item.fat }}</td>
      <td class="text-xs-center">{{ props.item.carbs }}</td>
      <td class="text-xs-center">{{ props.item.protein }}</td>
      <td class="text-xs-center">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: '屬性1',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '屬性1', value: 'calories' },
        { text: '屬性2', value: 'fat' },
        { text: '屬性3', value: 'carbs' },
        { text: '屬性4', value: 'protein' },
        { text: '屬性5', value: 'iron' }
      ],
      desserts: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        }, 
      ]
    };
  },
  created () {
    // this.$axios("http://10.132.49.131:8000/form/")
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(error => {
    //   console.log(error)
    // })
  }
};
</script>

<style scoped>

</style>
