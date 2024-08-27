import React, { useEffect, useState, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { supabase } from '../supabaseClient';

const Partners = () => {
  const [partnersData, setPartnersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase.from('partners').select('*');
        if (error) {
          console.error('Error fetching partners from Supabase:', error);
          setError('Failed to load partners data.');
        } else {
          console.log('Fetched partners data:', data); // Debug log to check fetched data
          setPartnersData(data);
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
        setError('Failed to load partners data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Number of Participations', accessor: 'number_of_participations' },
      { Header: 'Number of Recruited', accessor: 'number_of_recruited' }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns,
      data: partnersData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  if (loading) return <div>Loading partners...</div>;
  if (error) return <div>{error}</div>;
  if (!partnersData || partnersData.length === 0) return <div>No partners data available.</div>; // Debugging line

  return (
    <div className="tracking-table-content">
      <h2>Partners</h2>
      {/* Global Search Filter */}
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />

      {/* Table */}
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Simple Debugging Table */}
      {partnersData.length > 0 && (
        <div>
          <h3>Debugging Data</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Number of Participations</th>
                <th>Number of Recruited</th>
              </tr>
            </thead>
            <tbody>
              {partnersData.map(partner => (
                <tr key={partner.id}>
                  <td>{partner.id}</td>
                  <td>{partner.name}</td>
                  <td>{partner.number_of_participations}</td>
                  <td>{partner.number_of_recruited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Partners;
