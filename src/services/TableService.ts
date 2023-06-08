import axios from '../axios'
import { TypeTable } from '../types/table.type'

export const tableService = {
  async getAll() {
    const { data } = await axios.get(`${process.env.REACT_APP_URI}ru/data/v3/testmethods/docs/userdocs/get`, {
      headers: {
        'x-auth': localStorage.getItem('token')
      }
    });
    return data;
  },

  async addRow(value: TypeTable) {
    const { data } = await axios.post(`${process.env.REACT_APP_URI}ru/data/v3/testmethods/docs/userdocs/create`, value);
    return { data }
  },
  
  async editRow(id: string, value: TypeTable) {
    const { data } = await axios.post(`${process.env.REACT_APP_URI}ru/data/v3/testmethods/docs/userdocs/set/${id}`, value);
    return { data }
  },

  async removeRow(id: string) {
    const { data } = await axios.delete(`${process.env.REACT_APP_URI}ru/data/v3/testmethods/docs/userdocs/delete/${id}`);
    return { data }
  }
}