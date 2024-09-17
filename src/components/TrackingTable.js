import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom'; 
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { supabase } from '../supabaseClient'; 
import './TrackingTable.css';
import './navbar.css';
import './Dashboard.css';
import * as XLSX from 'xlsx'; // For Excel file handling

const TrackingTable = () => {
  const [profilesData, setProfilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCell, setEditingCell] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) {
          throw error;
        }
        setProfilesData(data);
      } catch (error) {
        setError('Failed to load profiles data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const updateProfileData = async (id, columnId, value) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ [columnId]: value })
        .eq('id', id);
      if (error) throw error;
      console.log(`Updated profile ID: ${id}, Column: ${columnId}, Value: ${value}`);
    } catch (error) {
      console.error('Failed to update profile data:', error.message);
    }
  };

  // Define columns
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

  const handleCellEdit = (rowId, columnId, value) => {
    const updatedProfiles = profilesData.map((profile) => {
      if (profile.id === rowId) {
        return { ...profile, [columnId]: value };
      }
      return profile;
    });
    setProfilesData(updatedProfiles);
    updateProfileData(rowId, columnId, value); // Update in the database
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      try {
        // Insert data into Supabase
        const { data, error } = await supabase.from('profiles').insert(sheet);
        if (error) {
          throw error;
        }
        setProfilesData([...profilesData, ...data]); // Update the table with the new data
      } catch (error) {
        setError('Failed to upload data from Excel.');
        console.error(error);
      }
    };
    reader.readAsBinaryString(file);
  };

  if (loading) return <div>Loading profiles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="sidebar">
        <h2>E+E Master Tracker</h2>
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracking-table" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Tracking Table
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/partners" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Partners
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="tracking-table-content main-content">
        <input
          type="text"
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />

        {/* Excel file upload */}
        <div className="file-upload">
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>

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
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      onClick={() => setEditingCell({ rowId: row.original.id, columnId: cell.column.id })}
                    >
                      {editingCell &&
                      editingCell.rowId === row.original.id &&
                      editingCell.columnId === cell.column.id ? (
                        <input
                          type="text"
                          value={cell.value}
                          onChange={(e) =>
                            handleCellEdit(row.original.id, cell.column.id, e.target.value)
                          }
                          onBlur={() => setEditingCell(null)} // Stop editing on blur
                        />
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackingTable;
