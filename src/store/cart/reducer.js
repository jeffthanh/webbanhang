// cartReducer.js
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CLEAR_CART, DECREASE_QUANTITY, INCREASE_QUANTITY } from './actionTypes';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Đảm bảo rằng action.payload và action.payload[0] được định nghĩa
      if (action.payload && action.payload[0]) {
        const existingProductIndex = state.cartItems.findIndex(
          (item) => item._id === action.payload[0]._id
        );

        if (existingProductIndex !== -1) {
          // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng quantity
          const updatedCartItems = state.cartItems.map((item, index) =>
            index === existingProductIndex
              ? {
                  ...item,
                  quantity: (item.quantity || 0) + (action.payload[index].quantity || 1),
                }
              : item
          );

          const updatedState = {
            ...state,
            cartItems: updatedCartItems,
          };

          storage.setItem('persist:cart', JSON.stringify(updatedState));
          return updatedState;
        } else {
          return {
            ...state,
            cartItems: [
              ...state.cartItems,
              {
                ...action.payload[0],
                quantity: action.payload[0].quantity || 1,
              },
            ],
          };
        }
      }

      // Nếu action.payload hoặc action.payload[0] không được định nghĩa, trả lại trạng thái hiện tại
      return state;

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
      case 'INCREASE_QUANTITY':
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload.productId
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          ),
        };
        case 'DECREASE_QUANTITY':
          return {
            ...state,
            cartItems: state.cartItems
              .map((item) =>
                item._id === action.payload.productId
                  ? { ...item, quantity: Math.max((item.quantity || 0) - 1, 0) }
                  : item
              )
              .filter((item) => item.quantity > 0), // Remove items with quantity <= 0
          };
        
        


    default:
      return state;
  }
};


const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartItems'],
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export default persistedCartReducer;
