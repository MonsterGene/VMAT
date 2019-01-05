<template>
<v-list dense expand :dark="$vuetify.dark">
  <template v-for="(item, i) in menus">
      <!--group with subitems-->
      <menu-group
        v-if="item.items"
        :key="item.name"
        :item="item"
      ></menu-group>
      <menu-sub-header v-else-if="item.header" :key="i" :header="item.header"></menu-sub-header>
      <menu-divider v-else-if="item.divider" :key="i"></menu-divider>
      <!--top-level link-->
      <menu-item
        v-else
        :item="item"
        :key="item.name"
      ></menu-item>
  </template>
</v-list>
</template>

<script>
import MenuItem from './MenuItem.vue';
import MenuDivider from './MenuDivider.vue';
import MenuSubHeader from './MenuSubHeader.vue';
import MenuGroup from './MenuGroup.vue';

export default {
  components: {
    MenuItem,
    MenuDivider,
    MenuSubHeader,
    MenuGroup
  },
  props: ['menus']
};
</script>
