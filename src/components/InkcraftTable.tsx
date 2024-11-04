import { Skeleton, Table } from "@mantine/core";
import React from "react";

interface InkcraftTableProps<T> {
  columns: any[];
  dataSource: T[];
  loading: boolean;
}

const InkcraftTable = <T,>({
  columns,
  dataSource,
  loading,
}: InkcraftTableProps<T>) => {
  return (
    <Table highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          {columns.map((col) => (
            <Table.Th p="sm" key={col.key} style={{ width: col.width }}>
              {col.title}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {loading
          ? Array.from({ length: 5 }).map((_, rowIndex) => (
              <Table.Tr key={`skeleton-row-${rowIndex}`}>
                {columns.map((col) => (
                  <Table.Td
                    key={`skeleton-${col.key}-${rowIndex}`}
                    className="py-4"
                  >
                    <Skeleton height={20} />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          : dataSource.map((data, index) => (
              <Table.Tr key={index}>
                {columns.map((col) => (
                  <Table.Td key={col.key}>
                    {col.render
                      ? col.render(index, data)
                      : data[col.key as keyof T]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
      </Table.Tbody>
    </Table>
  );
};

export default InkcraftTable;
