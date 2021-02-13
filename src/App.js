import React from 'react';
import Login from './Login'
import Event from './event';
import { ApiClient } from './apiClient';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: window.localStorage.getItem("token")
        }
        this.client = new ApiClient(() => this.state.token, () => this.logout())
    }

    login(token) {
        window.localStorage.setItem("token", token)
        this.setState({ token })
    }

    logout() {
        window.localStorage.removeItem("token")
        this.setState({ token: undefined })
    }

    render() {
        if (this.state.token) {
            return <Event client = { this.client }
            />
        }
        return <Login loggedIn = {
            (token) => this.login(token)
        }
        client = { this.client }
        />
    }
}

export default App;