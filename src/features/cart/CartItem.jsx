import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  deletePizza,
  increasePizzaQuantity,
  decreasePizzaQuantity,
} from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deletePizza(pizzaId));
  }

  function handleIncrease() {
    dispatch(increasePizzaQuantity(pizzaId));
  }

  function handleDecrease() {
    dispatch(decreasePizzaQuantity(pizzaId));
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <Button type="small" onClick={handleDecrease}>
          -
        </Button>
        <p>{quantity}</p>
        <Button type="small" onClick={handleIncrease}>
          +
        </Button>
        <p>{formatCurrency(totalPrice)}</p>
        <Button onClick={handleDelete} type="small">
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
