<script setup lang="ts" generic="TD">
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'

// import type { Table } from '@tanstack/vue-table'
// import { ref, Ref } from 'vue'
import type { NTable } from 'packages/nuxt/src/runtime/types/table'
import NTh from './Th.vue'
import NTr from './Tr.vue'
import NTd from './Td.vue'

const props = defineProps<NTable<TD>>()

const columnHelper = createColumnHelper<TD>()

const table = props.table || useVueTable({
  // @ts-expect-error needfix
  get data() {
    return props.data
  },
  columns: generateColumns(props.data),
  getCoreRowModel: getCoreRowModel(),
})

// @ts-expect-error needfix
function generateColumns(data) {
  return Object.keys(data[0]).map((key) => {
    // @ts-expect-error needfix
    return columnHelper.accessor(key, {
      id: key,
      cell: info => info.getValue(),
      header: () => key.charAt(0).toUpperCase() + key.slice(1),
      footer: props => props.column.id,
    })
  })
}
</script>

<template>
  <table v-if="!!table">
    <thead>
      <NTr
        v-for="headerGroup in table?.getHeaderGroups()"
        :key="headerGroup.id"
      >
        <NTh
          v-for="header in headerGroup.headers"
          :key="header.id"
          :col-span="header.colSpan"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </NTh>
      </NTr>
    </thead>
    <tbody>
      <NTr v-for="row in table?.getRowModel().rows" :key="row.id">
        <NTd v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
          />
        </NTd>
      </NTr>
    </tbody>
    <tfoot>
      <NTr
        v-for="footerGroup in table?.getFooterGroups()"
        :key="footerGroup.id"
      >
        <NTh
          v-for="header in footerGroup.headers"
          :key="header.id"
          :col-span="header.colSpan"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.footer"
            :props="header.getContext()"
          />
        </NTh>
      </NTr>
    </tfoot>
  </table>
</template>
