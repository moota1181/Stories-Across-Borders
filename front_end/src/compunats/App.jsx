import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';

const App = () => {
    return (
        <Router>
            <Switch>
                {/* Other routes */}
                <Route path="/profile/:userId" component={Profile} />
            </Switch>
        </Router>
    );
};

export default App;
