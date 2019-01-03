export const energyManageMixin = {
  methods: {
    simpleParseParams (p) {
      let data = new FormData();
      Object.keys(p).forEach(key => {
        data.append(key, p[key]);
      });
      return data;
    }
  },
  computed: {
    energyTypeColors: () => ({
      types: ['动力', '照明', '空调主机', '空调风柜'],
      colors: ['#3ac0a9', '#4e7af3', '#515151', '#f7a35c']
    })
  }
};