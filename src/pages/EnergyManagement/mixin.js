export const energyManageMixin = {
  methods: {
    simpleParseParams (p) {
      let data = new FormData();
      Object.keys(p).forEach(key => {
        data.append(key, p[key]);
      });
      return data;
    }
  }
};