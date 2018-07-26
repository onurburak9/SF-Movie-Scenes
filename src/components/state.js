import React from "react";
import { Provider, Subscribe, Container } from "unstated";
import Geocode from "react-geocode";

// Create a Container for our React Context. This container will
// hold state and methods just like a react component would:
export class StateContainer extends Container {
	constructor() {
		super();
		Geocode.setApiKey("AIzaSyBPWjQx5moAuMWzqY0TG4BOqqAvu0mR0iA");

		// The state will be available to any component we inject
		// the Container instance into
		this.state = {
			movies: [],
			selectedMovie: "",
			markers: []
		};
	}
	// These methods will also be avaiable anywhere we inject our
	// container context
	fetchData = () => {
		const LOCATION_DATA = "https://data.sfgov.org/resource/wwmu-gmzc.json";

		function resultOptimizer(data) {
			var marked = [];
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
	};

	getMarkers = () => {
		console.log(this.state.selectedMovie, "<== State ");
		if (this.state.selectedMovie) {
			this.state.selectedMovie.scenes.forEach(scene => {
				Geocode.fromAddress(scene.locations + " San Francisco CA").then(
					response => {
						const location = response.results[0].geometry.location;

						var newArr = this.state.markers.concat([location]);
						this.setState({ markers: newArr });
					},
					error => {
						console.error(error);
					}
				);
			});
		}
	};

	onMovieSelect = movie => {
		console.log(movie);
		this.setState(
			{
				movies: this.state.movies,
				selectedMovie: movie,
				markers: []
			},
			() => {
				console.log(this.state.selectedMovie, "<== Movie ");
				this.getMarkers();
			}
		);
	};
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
const Api = new StateContainer();

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
export const ApiProvider = props => {
	// We leave the injector flexible, so you can inject a new dependency
	// at any time, eg: snapshot testing
	return <Provider inject={props.inject || [Api]}>{props.children}</Provider>;
};

export const ApiSubscribe = props => {
	// We also leave the subscribe "to" flexible, so you can have full
	// control over your subscripton from outside of the module
	return <Subscribe to={props.to || [Api]}>{props.children}</Subscribe>;
};

export default Api;

// IMPORT NOTE:
// With the above export structure, we have the ability to
// import like this:

// import Api, {ApiProvider, ApiSubscribe, StateContainer}

// Api: Singleton Api instance, exported as default.
//      Contains your instantiated .state and methods.

// ApiProvider: Context Provider...
//      Publishes your React Context into the top of the
//      React App into the component tree.

// ApiSubscribe: Context Subsriber...
//      Subscribes to the higher Context from any place
//      lower than the point at which the Context was provided.

// StateContainer:Context Container Class...
//      Used to instantiate new copy of your service if so desired.
//      Can be used for testing, or subsrcibing your class to a new
//      data source that uses the same data model/methods.
