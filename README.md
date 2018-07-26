# SF Movie Scenes

A side project to map all the movies that are filmed in San Francisco. Data source : [SF Data](https://datasf.org/opendata/)

#### Getting Started

Checkout this repo and install dependencies with the following:

```
> git clone https://github.com/onurburak9/SF-Movie-Scenes.git
> cd SF-Movie-Scenes
> npm install
```

Create a config file with inserting your Google Map API and adding `LOCATION_DATA` from [SF Data](https://datasf.org/opendata/)

```
export const config = {
	API_KEY: "insert your GOOGLE MAP API KEY",
	LOCATION_DATA: "https://data.sfgov.org/resource/wwmu-gmzc.json"
};
```

After this you can start the gulp process with the following:

```
> npm install
```
