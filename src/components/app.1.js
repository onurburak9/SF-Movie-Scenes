import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import MovieList from "../containers/movie-list";
import Map from "../containers/map";

//npm install --save react-google-maps

const LOCATION_DATA = "https://data.sfgov.org/resource/wwmu-gmzc.json";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			selectedMovie: null
		};

		function resultOptimizer(data) {
			var marked = [];
			console.log(data);
			return data.reduce(function(r, a) {
				var i = marked.indexOf(a.title);
				i == -1
					? (marked.push(a.title), r.push({ title: a.title, scenes: [a] }))
					: r[i].scenes.push(a);
				return r;
			}, []);
		}

		fetch(LOCATION_DATA)
			.then(r => r.json())
			.then(data => resultOptimizer(data))
			.then(movies => {
				this.setState({ movies: movies, selectedMovie: movies[0] });
			})
			.catch(err => console.log(err));
	}
	render() {
		return (
			<div className="row">
				<Map
					containerElement={<div className="col-sm-8 map-container" />}
					mapElement={<div style={{ height: `100%` }} />}
				/>
				<MovieList
					movies={this.state.movies}
					onMovieSelect={selectedMovie => this.setState({ selectedMovie })}
				/>
			</div>
		);
	}
}
export default App;
