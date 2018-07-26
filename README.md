# SF Movie Scenes

A side project to map all the movies that are filmed in San Francisco. Data source : [SF Data](https://datasf.org/opendata/)

#### Getting Started

Checkout this repo, install dependencies, create a config file with Google Map API credentials & SF then start the gulp process with the following:

```
> https://github.com/onurburak9/SF-Movie-Scenes.git
> cd SF-Movie-Scenes
> npm install
> npm start
```

Create a config file with inserting your Google Map API and adding `LOCATION_DATA` from [SF Data](https://datasf.org/opendata/)

```
export const config = {
	API_KEY: "insert your GOOGLE MAP API KEY",
	LOCATION_DATA: "https://data.sfgov.org/resource/wwmu-gmzc.json"
};
```
