import { useNavigate } from 'react-router-dom';
import { ViewDetailOrder } from './detailorders';

export const createActions = (order:any) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`edit/${order.id}`);
  };

  const handleDelete = () => {
    // Lógica para eliminar la orden aquí o llamar a una función externa
    console.log(`Deleting order with ID: ${order.id}`);
  };

  return {
    urledit: handleEdit,
    urldelite: handleDelete,
    urlview: ViewDetailOrder,
  };
};
