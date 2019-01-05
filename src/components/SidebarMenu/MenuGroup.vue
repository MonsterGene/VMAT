<template>
<v-list-group
  :group="item.group"
  :prepend-icon="item.icon"
  :sub-group="subGroup ? 'sub-group' : false"
  no-action="no-action">
  <menu-group-title slot="activator" :title="item.title"></menu-group-title>
  <template v-for="(subItem, i) in item.items">
    <!--sub group-->
    <menu-group
      v-if="subItem.items"
      :key="subItem.name"
      :item="subItem"
      :parent-group="parentGroup ? parentGroup + '/' + item.group : item.group"
      sub-group="sub-group"
    ></menu-group>
    <!--child item-->
    <menu-item
      v-else
      :key="i"
      :item="subItem"
      :parent-path="parentGroup ? parentGroup + '/' + item.group : item.group"
    ></menu-item>
  </template>
</v-list-group>
</template>

<script>
// import MenuGroup from './MenuSubGroup';
import MenuGroupTitle from './MenuGroupTitle.vue';
import MenuItem from './MenuItem.vue';

export default {
  name: 'menu-group',
  components: {
    // MenuGroup,
    MenuGroupTitle,
    MenuItem
  },
  props: ['item', 'subGroup', 'parentGroup'],
};
</script>
