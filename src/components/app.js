import React, { Component } from "react";
import MovieList from "../containers/movie-list";
import Map from "../containers/map";

//npm install --save react-google-maps

class App extends Component {
	render() {
		return (
			<div className="row">
				<Map
					containerElement={<div className="col-sm-8 map-container" />}
					mapElement={<div className="actual-map row" />}
				/>
				<MovieList />
			</div>
		);
	}
}
export default App;
