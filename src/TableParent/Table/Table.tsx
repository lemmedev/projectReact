import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import React from 'react';

import { Country } from '../../utils/types';
import styles from './Table.module.css';
  
  const columnHelper = createColumnHelper<Country>()
  
  const columns = [
    columnHelper.accessor('name', {
      cell: info => {
        console.log('info');
        return info.renderValue()},
      header: () => <span>Country Name</span>,

    }),
    columnHelper.accessor(row => row.abbreviation, {
      id: 'abbreviation',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Code</span>,
    
    }),
    columnHelper.accessor('capital', {
      header: () => 'Capital',
      cell: info => info.renderValue(),
    
    }),
    columnHelper.accessor('phone', {
      header: () => <span>Ph Code</span>,
   
    }),
    columnHelper.accessor('population', {
      header: 'Population',
   
    }),
    columnHelper.accessor('media.flag', {
        header: 'Flag',
        cell: info => <img loading='lazy' className={styles.imageWrapper} src={info.getValue()} alt="" ></img>,
    
      }),
    
    columnHelper.accessor('media.emblem', {
        header: 'Emblem',
        cell: info => <img loading='lazy' className={styles.imageWrapper} src={info.getValue()} alt="" ></img>,
      
      }),
  ]


interface TableProps {
    tdata: Country[];
}

const Table: React.FC<TableProps> = ({ tdata }) => {
    

    const table = useReactTable({
        data:tdata,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })

    return (
       
        

     <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        </table>

    );
};

export default Table;
