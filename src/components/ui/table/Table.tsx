import React, {FC} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { TypeTable } from '../../../types/table.type';

type TypeTableRows = {
  data: TypeTable[]
}

const columns: GridColDef[] = [
  { field: 'companySigDate', headerName: 'Дата 1', width: 200 },
  { field: 'companySignatureName', headerName: 'Название компании', width: 200 },
  { field: 'documentName', headerName: 'Название документа', width: 200 },
  { field: 'documentStatus', headerName: 'Статус', width: 150 },
  { field: 'documentType', headerName: 'Тип договора', width: 200 },
  { field: 'employeeNumber', headerName: 'Номер работника', width: 100 },
  { field: 'employeeSigDate', headerName: 'Дата 2', width: 200 },
  { field: 'employeeSignatureName', headerName: 'Название работника', width: 200 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const DataTable:FC<TypeTableRows> = ({data}) => {
  console.log(data)
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

export default DataTable;