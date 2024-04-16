import type { GroupColumnDef, Table } from '@tanstack/vue-table'

export interface NTable<TD> {
  table?: Table<TD>
  data?: TD
  columns?: GroupColumnDef<TD>
}
