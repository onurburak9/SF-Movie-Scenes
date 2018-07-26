import React, { Component } from "react";
import Reactotron from "reactotron-react-js";

class MovieListElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: props.movie,
			onMovieSelect: props.onMovieSelect
		};
	}
	render() {
		Reactotron.log({
			movie: this.state.movie
		});
		return (
			<li
				onClick={() => {
					this.state.onMovieSelect(this.state.movie);
				}}
				className="list-group-item"
			>
				<div className="video-list media">
					<div className="media-left" />
					<div className="media-body">
						<div className="media-heading">
							<h5>{this.state.movie.title}</h5>
							<p>{this.state.movie.scenes.length}</p>
						</div>
					</div>
				</div>
			</li>
		);
	}
}

export default MovieListElement;
