import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sizeValue, customer, changeToppings, resetState } from '../state/orderSlice';
import { useCreateOrderMutation, useGetOrdersQuery } from '../state/orderApi';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const [createOrder, { isLoading: pendMessage, isFetching: refreshOrder, error: errMessage }] = useCreateOrderMutation();

  const { refetch } = useGetOrdersQuery();  // Access refetch function here

  let custName = useSelector((st) => st.orderState.fullName);
  let pizzaSize = useSelector((st) => st.orderState.size);
  let pizzaToppings = useSelector((st) => st.orderState.toppings);

  const handleSizeChange = (evt) => {
    const selectedSize = evt.target.value;
    dispatch(sizeValue({ value: selectedSize }));
  };

  const onChange = (evt) => {
    const customerName = evt.target.value;
    dispatch(customer({ value: customerName }));
  };

  const addToPizza = (evt) => {
    const toppingName = evt.target.name;
    dispatch(changeToppings({ value: toppingName }));
  };

  const resetForm = () => {
    dispatch(sizeValue({ value: '' }));
    dispatch(customer({ value: '' }));
    dispatch(changeToppings({ value: [] }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    createOrder({ fullName: custName, size: pizzaSize, toppings: pizzaToppings })
      .unwrap()
      .then((data) => {
        refetch();  // Call refetch to refresh the orders after creation
        dispatch(resetState());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {(pendMessage || refreshOrder) && <div className="pending">Order in progress...</div>}
      {errMessage && <div className="failure">Order failed: {errMessage.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            onChange={onChange}
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            onChange={handleSizeChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input onChange={addToPizza} data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni<br />
        </label>
        <label>
          <input onChange={addToPizza} data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers<br />
        </label>
        <label>
          <input onChange={addToPizza} data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple<br />
        </label>
        <label>
          <input onChange={addToPizza} data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms<br />
        </label>
        <label>
          <input onChange={addToPizza} data-testid="checkHam" name="5" type="checkbox" />
          Ham<br />
        </label>
      </div>

      <input data-testid="submit" type="submit" />
    </form>
  );
}
