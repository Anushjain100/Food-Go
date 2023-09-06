import React , { createContext , useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state , action)=>{
    switch(action.type){
        case "ADD" : {
            return [...state , {id:action.id , name : action.name , price : action.price , qty : action.qty , size : action.size , img : action.img}]
        }
        case "REMOVE" : {
            let newArr = [...state];
            newArr.splice(action.index,1)
            return newArr;
        }
        case "UPDATE" : {
            let arr =[...state]
            let arrTemp = arr.find((food)=>{
                if(food.id === action.id){
                  return food;
                }
             })
            const index = arr.indexOf(arrTemp);
            arr[index] = {...arrTemp , qty: parseInt(action.qty) + arrTemp.qty, price: arrTemp.price + arrTemp.price }
            return arr;
        }
        case "DROP" : {
            let emptyArr = []
            return emptyArr; 
        }
        
        default : {
            console.log("Error in reducer");
        }
    }
}

export const CartProvider=({children}) => {

    const [state , dispatch] = useReducer(reducer , []);
  return (
    <CartDispatchContext.Provider value ={dispatch}>
        <CartStateContext.Provider value ={state}>
            {children}
        </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = ()=> useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);