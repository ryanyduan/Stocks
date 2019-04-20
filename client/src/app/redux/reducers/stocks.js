import { GET_STOCKS, ADD_STOCK, DELETE_STOCK } from "../constants";

export const stocks = (state = [], action) => {
    switch (action.type) {
        case GET_STOCKS:
            return action.payload;
        case ADD_STOCK:
            return [...state, action.payload];
        case DELETE_STOCK:
            const found = state.findIndex((item) => item === action.payload);
            if (found !== -1) {
                state.splice(found, 1);
                return [...state];
            } else return state;
        default:
            return state;
    }
};
