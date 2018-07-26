import React, { Component } from "react";
import MovieListElement from "./movie-list-elements";
import { ApiSubscribe } from "../components/state";

class MovieList extends Component {
	componentDidMount() {
		this.props.onInit && this.props.onInit();
	}
	render() {
		return this.props.children;
	}
}

function RenderedList() {
	return (
		<ApiSubscribe>
			{api => {
				if (!api.state.movies.length) {
					console.log("das");
					return (
						<MovieList
							onInit={() => {
								api.fetchData();
							}}
						>
							<div className="col-sm-4">
								<div className="loader">Loading...</div>
							</div>
						</MovieList>
					);
				}
				const ListElements = api.state.movies.map((movie, i) => {
					return (
						<MovieListElement
							key={`movie-${i}`}
							movie={movie}
							onMovieSelect={api.onMovieSelect}
						/>
					);
				});

				return (
					<MovieList
						onInit={() => {
							api.fetchData();
						}}
					>
						<ul className="col-sm-4 list-group">{ListElements}</ul>
					</MovieList>
				);
			}}
		</ApiSubscribe>
	);
}

export default RenderedList;
