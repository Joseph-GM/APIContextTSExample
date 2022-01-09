import { useReducer, useEffect } from 'react';
import type {StateType, ActionType, DataType, UsersType} from '../types';


export type callBackType = ()=>Promise<UsersType>;

function reducer(state: StateType, action: ActionType ): StateType{
    console.log("in reducer state : ", state)
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data
            }
    }
}

const Initial_State: StateType = {
    loading: false,
    data: null
}

function useAsync(callback : callBackType, deps = []): [StateType, () => Promise<void>] {
    const [state, dispatch] = useReducer(reducer, Initial_State);

    const fetchData = async () => {
        dispatch({type: 'LOADING', data: null});
        console.log("loading init")
        console.log("callback = ", callback)
        try {
            const data: UsersType = await callback();
            dispatch({type: 'SUCCESS', data: data})
            console.log("in try : ", state)
        } catch(e) {
            console.log("error happened during fetchUsers : ", e)
        }
    };

    useEffect(() => {
        fetchData();
    }, deps)
    return [state, fetchData];
}

export default useAsync;