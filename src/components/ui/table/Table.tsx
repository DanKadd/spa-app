import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  MenuItem
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { TypeTable } from '../../../types/table.type';
import { TableService } from '../../../services/TableService';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { notifyError } from '../notification/Notification';

const arrStatus: string[] = ['Подписан', 'Не подписан'];
const arrTypeDocument: string[] = ['Трудовой договор', 'Приказ о приеме', 'Деловое письмо'];

const DataTable = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<TypeTable[]>(() => []);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  useEffect(() => {
    const getItems = async () => {
      const { data } = await TableService.getAll();
      setTableData(data.data)
    }
    getItems();
  }, [])

  // Создание новой записи
  const handleCreateNewRow = async (values: TypeTable) => {
    try {
      await TableService.addRow(values);
      setTableData([...tableData, values]);
    } catch (error) {
      notifyError('Ошибка при добавлении записи');
    }
  };

  // Удаление новой записи
  const handleDeleteRow = useCallback(
    async (row: MRT_Row<TypeTable>) => {
      try {
        await TableService.removeRow(row.original.id);
        setTableData(tableData.filter((_, index) => index !== row.index)) 
      } catch (error) {
        notifyError('Ошибка при удалении записи');
      }
    },
    [tableData],
  );

  // Редактирование записи
  const handleSaveRowEdits: MaterialReactTableProps<TypeTable>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        try {
          await TableService.editRow(row.original.id, values);
          tableData[row.index] = values;
          setTableData([...tableData]);
          exitEditingMode();
        } catch (error) {
          notifyError('Ошибка при редактировании записи');
        }
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const columns = useMemo<MRT_ColumnDef<TypeTable>[]>(
    () => [
      {
        accessorKey: 'companySigDate',
        header: 'Дата 1',
        size: 140,
        muiTableBodyCellEditTextFieldProps: () => ({
          disabled: true
        }),
      },
      {
        accessorKey: 'companySignatureName',
        header: 'Название компании',
        size: 140,
      },
      {
        accessorKey: 'documentName',
        header: 'Название документа',
        size: 140,
      },
      {
        accessorKey: 'documentType',
        header: 'Тип документа',
        size: 140,
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: arrTypeDocument.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        },
      },
      {
        accessorKey: 'documentStatus',
        header: 'Статус',
        size: 140,
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: arrStatus.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        },
      },
      {
        accessorKey: 'employeeNumber',
        header: 'Номер работника',
        size: 50,
      },
      {
        accessorKey: 'employeeSigDate',
        header: 'Дата 2',
        size: 140,
        muiTableBodyCellEditTextFieldProps: () => ({
          disabled: true
        }),
      },
      {
        accessorKey: 'employeeSignatureName',
        header: 'Название работника',
        size: 140,
      }
    ],
    [],
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal"
        enableColumnOrdering
        enableEditing
        localization={MRT_Localization_RU}
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Редактировать">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Удалить">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            <Add />
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

interface CreateModalProps {
  columns: MRT_ColumnDef<TypeTable>[];
  onClose: () => void;
  onSubmit: (values: TypeTable) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Новая запись</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={handleSubmit} variant="contained">
          Создать запись
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataTable;