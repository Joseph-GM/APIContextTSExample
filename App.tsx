import React from 'react';
import {View, StyleSheet} from 'react-native';

import Users from './src/components/Users';

function App() {
  return (
    <View style={styles.container}>
      <Users />
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default App;
