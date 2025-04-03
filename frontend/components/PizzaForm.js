import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFormValue, sizeValue, customer, changeToppings, resetState } from '../state/orderSlice'
import { useCreateOrderMutation, useGetOrdersQuery } from '../state/orderApi'

export default function PizzaForm() {
  const dispatch = useDispatch()
  const [createOrder, {isLoading: pendMessage, error: errMessage }] = useCreateOrderMutation()
  const { data: orders = [], refetch } = useGetOrdersQuery();

  let custName = useSelector(st => st.orderState.fullName)
  let pizzaSize = useSelector(st => st.orderState.size)
  let pizzaToppings = useSelector(st => st.orderState.toppings)

  const handleSizeChange = (evt) => {
    const selectedSize = evt.target.value;  
    dispatch(sizeValue({ value: selectedSize }))  
  }

  const onChange = (evt) => {
    const customerName = evt.target.value
    dispatch(customer({value: customerName}))
  }
  const addToPizza = (evt) => {
    const toppingName = evt.target.name;
    console.log("Adding topping:", toppingName);  // Log the topping being added
    dispatch(changeToppings({ value: toppingName }));
  };
  const resetForm = () => {
    dispatch(resetState());  // This will reset the entire form state, including toppings
  };
  
  const onSubmit = (evt) => {
    evt.preventDefault()
    createOrder({fullName: custName, size: pizzaSize, toppings: pizzaToppings  })
      .unwrap()
      .then(data => {
        console.log(data)
        refetch()
        resetForm()
      })
      .catch(err => {
      })

  }
  

  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {pendMessage && <div className='pending'>Order in progress...</div>}
      {errMessage && <div className='failure'>Order failed: {errMessage.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            onChange={onChange}
            value={custName}
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
            value={pizzaSize}
            onChange={handleSizeChange}  // Use onChange to capture the selection
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
          <input checked={pizzaToppings.includes("1")} onChange={addToPizza} value={pizzaToppings} data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni<br />
        </label>
        <label>
          <input checked={pizzaToppings.includes("2")} onChange={addToPizza} value={pizzaToppings}  data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers<br />
        </label>
        <label>
          <input checked={pizzaToppings.includes("3")} onChange={addToPizza} value={pizzaToppings}  data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple<br />
        </label>
        <label>
          <input checked={pizzaToppings.includes("4")} onChange={addToPizza} value={pizzaToppings}  data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms<br />
        </label>
        <label>
          <input checked={pizzaToppings.includes("5")} onChange={addToPizza} value={pizzaToppings}  data-testid="checkHam" name="5" type="checkbox" />
          Ham<br />
        </label>
      </div>

      <input data-testid="submit" type="submit" />
    </form>
  )
}
