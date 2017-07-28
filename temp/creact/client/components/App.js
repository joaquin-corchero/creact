import React from 'react';
import Contact from './Contact';
import Weather from './Weather';

const App = () => {
    return (
        <div>
            <Weather />
            <div className="panel panel-primary">
                <div className="panel-heading">Add contact</div>
                <div className="panel-body">
                    <Contact />
                </div>
            </div>
        </div>
    );
};

export default App;