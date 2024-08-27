import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { supabase } from '../supabaseClient'; // Import your Supabase client instance
import './TrackingTable.css';
import './navbar.css'; // Import shared navbar CSS

const TrackingTable = () => {
  const [profilesData, setProfilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) {
          throw error;
        }
        console.log('Fetched profiles data:', data); // Debug log to check fetched data
        setProfilesData(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError('Failed to load profiles data.'); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'ID Number', accessor: 'id_num' },
      { Header: 'First Name', accessor: 'first_name' },
      { Header: 'Last Name', accessor: 'last_name' },
      { Header: 'Citizen Of', accessor: 'citizen_of' },
      { Header: 'Gender', accessor: 'gender' },
      { Header: 'Birth Date', accessor: 'birth_date' },
      { Header: 'Visa Type', accessor: 'visa_type' },
      { Header: 'Current Class Code', accessor: 'current_class_code' },
      { Header: 'School', accessor: 'school' },
      { Header: 'Current Student Division', accessor: 'current_student_division' },
      { Header: 'Degree Code', accessor: 'degree_code' },
      { Header: 'Major 1', accessor: 'major1' },
      { Header: 'Major/Minor Description', accessor: 'major_minor_desc' },
      { Header: 'Concentration 1', accessor: 'concentration1' },
      { Header: 'Concentration 2', accessor: 'concentration2' },
      { Header: 'Career GPA', accessor: 'career_gpa' },
      { Header: 'Career Hours Earned', accessor: 'career_hours_earned' },
      { Header: 'Term Hours Enrolled', accessor: 'term_hours_enrolled' },
      { Header: 'Enrollment Status', accessor: 'enrollment_status' },
      { Header: 'Cities', accessor: 'cities' },
      { Header: 'Country', accessor: 'country' },
      { Header: 'Entrance Year', accessor: 'entrance_year' },
      { Header: 'Entrance Term', accessor: 'entrance_term' },
      { Header: 'Grad School', accessor: 'grad_school' },
      { Header: 'Gap Year', accessor: 'gap_year' },
      { Header: 'Family Business', accessor: 'family_business' },
      { Header: 'Entrepreneur', accessor: 'entrepreneur' },
      { Header: 'Salary Offer', accessor: 'salary_offer' },
      { Header: 'Still Seeking', accessor: 'still_seeking' },
      { Header: 'Unknown', accessor: 'unknown' },
      { Header: 'Source', accessor: 'source' },
      { Header: 'Offered By', accessor: 'offered_by' }
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
      data: profilesData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  if (loading) return <div>Loading profiles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="tracking-table-content">
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
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
    </div>
  );
};

export default TrackingTable;
