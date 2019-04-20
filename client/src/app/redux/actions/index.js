import { GET_STOCKS, ADD_STOCK, DELETE_STOCK } from "../constants";
import { getStocks, addStock, deleteStock } from "../../services/api";

export const fetchStocks = () => async (dispatch) => {
    const response = await getStocks();
    dispatch({ type: GET_STOCKS, payload: response.data });
};

export const reqAddStock = (stock) => async (dispatch) => {
    const response = await addStock(stock);
    dispatch({ type: ADD_STOCK, payload: response.data });
};

export const reqDeleteStock = (stock) => async (dispatch) => {
    const response = await deleteStock(stock);
    dispatch({ type: DELETE_STOCK, payload: response.data });
};
