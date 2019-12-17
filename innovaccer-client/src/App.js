import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer';
import Home from './components/Home/Home';
import Deploy from "./components/Deploy/Deploy";
import Train from './components/Train/Train';
import Error404 from './components/Error404';
import './App.css';

function App() {
  return (
		<React.Fragment>
      <Navbar />
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/deploy" component={Deploy} />
					<Route exact path="/train" component={Train} />
					<Route component={Error404} />
				</Switch>
			</Router>
      <Footer />
		</React.Fragment>
	);
}

export default App;
