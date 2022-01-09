//import liraries
import React, { Component, useState, useEffect, useReducer, Dispatch } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type {StateType, ActionType, UsersType} from '../types';
import axios from 'axios';
import useAsync from '../hooks/useAsync'

async function getUsers():Promise<UsersType> {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    console.log("in getUsers function ")
    return response.data
}

const Initial_State: StateType = {
    loading: false,
    data: null
}

const Users = () => {
    // const [users, setUsers] = useState<UsersType | undefined>(undefined);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const [state, refetch] = useAsync(getUsers, []);
    
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
            <Button title='Reload' onPress={refetch} />
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
