import { GET_STOCKS, ADD_STOCK, DELETE_STOCK } from "../constants";
import { getStocks, addStock, deleteStock } from "../../services/api";

export const fetchStocks = () => async (dispatch) => {
    const response = await getStocks();
    dispatch({ type: GET_STOCKS, payload: response.data });
};

export const reqAddStock = (stock) => async (dispatch) => {
    const response = await addStock(stock);
    console.log(response);
    if (response.status === 200) dispatch({ type: ADD_STOCK, payload: response.data });
    return response;
};

export const reqDeleteStock = (stock) => async (dispatch) => {
    const response = await deleteStock(stock);
    console.log(response);
    if (response.status === 200) dispatch({ type: DELETE_STOCK, payload: response.data });
    return response;
};
