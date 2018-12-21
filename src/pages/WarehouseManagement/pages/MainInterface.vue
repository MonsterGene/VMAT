<template>
<v-container grid-list-xl fluid>
    <v-card>
        <v-layout row>
            <v-flex lg4 sm4 xs4>
                <v-select :items="items_BU" v-model="BU" label="BU"></v-select>
            </v-flex>
            <v-flex lg4 sm4 xs4>
                <v-select :items="items_Building" v-model="Building" label="Building"></v-select>
            </v-flex>
            <v-flex lg4 sm4 xs4>
                <v-select :items="items_Floor" v-model="Floor" label="Floor"></v-select>
            </v-flex>
        </v-layout>

        <!-- <v-layout row>
            <v-container v-bind="{ }" fluid>
            <v-layout row wrap>
                <v-flex
                v-for="n in 9"
                :key="n"
                xs4
                >
                <v-card flat tile>
                    <v-img
                    :src="``"
                    height="140px"
                    >开发中</v-img>
                </v-card>
                </v-flex>
            </v-layout>
            </v-container>
        </v-layout> -->
    </v-card>
</v-container>
</template>

<script>
export default {
  data: () => ({
    items_BU: [
      { text: 'Manufacturer Ⅰ', value: 'M1' },
      { text: 'Manufacturer Ⅱ', value: 'M2' },
      { text: 'Manufacturer Ⅲ', value: 'M3' },
      { text: 'Manufacturer Ⅴ', value: 'M5' },
      { text: 'Manufacturer Ⅵ', value: 'M6' },
      { text: 'Manufacturer Ⅶ', value: 'M7' },
      { text: 'Manufacturer Ⅷ', value: 'M8' }
    ],
    items_Building: [
      { text: 'D9', value: 'D9' },
      { text: 'D10', value: 'D10' },
      { text: 'E5', value: 'E5' },
      { text: 'E6', value: 'E6' },
      { text: 'F21', value: 'F21' }
    ],
    items_Floor: [
      { text: 'Floor 1', value: 'F1' },
      { text: 'Floor 2', value: 'F2' },
      { text: 'Floor 3', value: 'F3' },
      { text: 'Floor 4', value: 'F4' }
    ]
  })
};
</script>

<style lang='stylus' scoped>

</style>