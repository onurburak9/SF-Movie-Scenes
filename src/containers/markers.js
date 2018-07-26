import React, { Component } from "react";
import { Marker } from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
import { ApiSubscribe } from "../components/state";

class Markers extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<ApiSubscribe>
				{api => {
					if (!api.state.markers.length) return <div className="" />;
					const Scenes = api.state.markers.map((marker, i) => {
						return (
							<div key={`scene-${i}`}>
								<Marker
									key={`scene-${i}`}
									position={{ lat: marker.lat, lng: marker.lng }}
									label={`scene-onur-${i}`}
								/>
								<InfoBox
									defaultPosition={
										new google.maps.LatLng(marker.lat, marker.lng)
									}
									options={{ closeBoxURL: ``, enableEventPropagation: true }}
								>
									<div
										style={{
											backgroundColor: `yellow`,
											opacity: 0.75,
											padding: `12px`
										}}
									>
										<div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
											Hello, Taipei!
										</div>
									</div>
								</InfoBox>
							</div>
						);
					});
					return Scenes;
				}}
			</ApiSubscribe>
		);
	}
}

export default Markers;
