import React, { Component } from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";
import { ApiSubscribe } from "../components/state";
import Markers from "./markers";

class MapWithAMarkers extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		console.log(3);
		this.props.onInit && this.props.onInit();
	}
	render() {
		return this.props.children;
	}
}
const Map = ({ containerElement, mapElement }) => {
	return (
		<ApiSubscribe>
			{api => {
				console.log(1);
				if (!api.state.movies.length) {
					return (
						<div className="col-sm-8 map-container">
							<div className="loader">Loading...</div>
						</div>
					);
				} else if (!api.state.markers.length) {
					console.log(2);

					return (
						<MapWithAMarkers
							onInit={() => {
								api.getMarkers();
							}}
						>
							<div className="col-sm-8 map-container">
								<div className="loader">Loading...</div>
							</div>
						</MapWithAMarkers>
					);
				}
				const RenderedMap = withScriptjs(
					withGoogleMap(props => (
						<ApiSubscribe>
							{api => {
								console.log(api.state.markers, "<== Markers ");

								return (
									<GoogleMap
										defaultZoom={13}
										defaultCenter={{ lat: 37.766, lng: -122.447 }}
									>
										<Markers />
									</GoogleMap>
								);
							}}
						</ApiSubscribe>
					))
				);
				return (
					<MapWithAMarkers
						onInit={() => {
							api.getMarkers();
						}}
					>
						<RenderedMap
							googleMapURL={
								"https://maps.googleapis.com/maps/api/js?key=AIzaSyBPWjQx5moAuMWzqY0TG4BOqqAvu0mR0iA&v=3.exp&libraries=geometry,drawing,places"
							}
							loadingElement={
								<div className="col-sm-8 map-container">
									<div className="loader">Loading...</div>
								</div>
							}
							containerElement={containerElement}
							mapElement={mapElement}
						/>
					</MapWithAMarkers>
				);
			}}
		</ApiSubscribe>
	);
};

export default Map;
