// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const orderData = useLoaderData();
  const deliveryIn = calcMinutesLeft(orderData.estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {orderData.priority && <span>Priority </span>}
          <span>{orderData.status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(
                orderData.estimatedDelivery
              )} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(orderData.estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderData.orderPrice)}</p>
        {orderData.priority && (
          <p>Price priority: {formatCurrency(orderData.priorityPrice)}</p>
        )}
        <p>
          To pay on delivery:{" "}
          {formatCurrency(orderData.orderPrice + orderData.priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
