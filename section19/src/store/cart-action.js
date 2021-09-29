import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://react-http-72f4b-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
            );

            if (!response.ok) {
                throw new Error('Fetching cart data failed!');
            }

            const data = await response.json();
            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceState({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed',
                })
            );
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data',
            })
        );

        const sentResponse = async () => {
            const response = await fetch(
                'https://react-http-72f4b-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    })
                });

            if (!response.ok) {
                throw new Error('Sending cart data failed!');
            }
        }

        try {
            await sentResponse();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success...',
                message: 'Sending data finished successfully',
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed',
                })
            );
        }
    }
}
