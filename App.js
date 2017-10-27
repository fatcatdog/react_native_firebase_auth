/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCKPg9OkBzE9GOjpkyQFRkLj88u2vw-xa8",
      authDomain: "authentication-react-nat-1b84b.firebaseapp.com",
      databaseURL: "https://authentication-react-nat-1b84b.firebaseio.com",
      projectId: "authentication-react-nat-1b84b",
      storageBucket: "authentication-react-nat-1b84b.appspot.com",
      messagingSenderId: "509565272889"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>  
          </CardSection>
          )
      case false:
        return <LoginForm />;
      default:
        return <View style={styles.loadingSpinnerStyle}><Spinner size="large" /></View>;
      }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles ={
  loadingSpinnerStyle: {
    alignSelf: 'center'
  }
}

export default App;
