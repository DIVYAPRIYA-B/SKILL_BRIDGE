import type { ReactNode } from 'react';
import EmptyState from './EmptyState';

interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function DataTable<T>({ columns, data, rowKey, emptyTitle = 'No data available', emptyDescription }: DataTableProps<T>) {
  if (!data.length) return <EmptyState title={emptyTitle} description={emptyDescription} />;
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead>
            <tr className="bg-ink-50 border-b border-ink-100">
              {columns.map((col) => (
                <th key={col.key} className={`text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-4 py-3 ${col.className ?? ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {data.map((row, i) => (
              <tr key={rowKey(row) ?? i} className="hover:bg-ink-50/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-sm text-ink-700 ${col.className ?? ''}`}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
