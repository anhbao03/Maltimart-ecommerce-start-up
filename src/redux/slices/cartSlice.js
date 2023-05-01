import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        const newItem = action.payload
        const existingItem = state.cartItems.find(item => item._id === newItem._id);

        state.totalQuantity ++;

        if (!existingItem) {
            state.cartItems.push({      
                _id: newItem._id,
                name: newItem.name,
                image: newItem.image,
                price: newItem.price,
                quantity: 1 ,
                totalPrice: newItem.price
            })
        }
        else
        {
            existingItem.quantity ++
            existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
        }

        state.totalAmount = state.cartItems.reduce((total, item) => 
        total + Number(item.price) * Number(item.quantity), 0);
    },

    deleteItem: (state, action) => {
        const _id = action.payload
        const existingItem = state.cartItems.find(item => item._id === _id);

        if (existingItem) {
            state.cartItems = state.cartItems.filter(item => item._id !== _id);
            state.totalQuantity = state.totalQuantity - existingItem.quantity;
        } 

        state.totalAmount = state.cartItems.reduce((total, item) => 
            total + Number(item.price) * Number(item.quantity), 0);
    }

  }
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer