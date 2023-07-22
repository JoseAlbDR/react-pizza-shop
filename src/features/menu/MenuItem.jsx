import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addPizza } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const pizzaInCart = useSelector((state) =>
    state.cart.cart.find((pizza) => pizza.pizzaId === id),
  );
  function handleAddPizza() {
    dispatch(
      addPizza({
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice * 1,
      }),
    );
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <div className="flex gap-5">
              {pizzaInCart && <DeleteItem id={id} />}
              <Button type="small" onClick={handleAddPizza}>
                Add to cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
