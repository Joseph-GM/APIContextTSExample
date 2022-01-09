//import liraries
import React, { Component, useState, useEffect, useReducer, Dispatch } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type {StateType, ActionType} from '../types';
import axios from 'axios';

function reducer(state: StateType, action: ActionType ): StateType{
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

const Users = () => {
    // const [users, setUsers] = useState<UsersType | undefined>(undefined);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const [state, dispatch] = useReducer(reducer, Initial_State);

    const fetchUsers = async () => {
        dispatch({type: 'LOADING', data: null});
        try {
            // setError(null);
            // setUsers(undefined);
            // setLoading(true);
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
        // setUsers(response.data);
        dispatch({type: 'SUCCESS', data: response.data})
        } catch(e) {
            console.log("error happened during fetchUsers : ", e)
        }
    };
    
    useEffect(() => {
        fetchUsers();
    }, [])
    const { loading, data: users} = state;

    if (loading) return <Text>로딩중....</Text>;
    // if (error) return <Text>에러가 발생했습니다.</Text>;
    if (!users) return null;

    return (
        <View>
            {users.map(user =>(
                <Text key={user.id}>
                    {user.username} ({user.name})
                </Text>
            ))}
            <Button title='Reload' onPress={fetchUsers} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Users;
