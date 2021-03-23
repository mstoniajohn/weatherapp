import './App.css';
// import axios from 'axios';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';

function App() {
	// gsap.from('.h1', { duration: 3, x: 300, opacity: 0, scale: 0.5 });
	gsap.from('#sun', { duration: 3, x: 300, opacity: 0, scale: 0.5 });
	// const WeatherLoading = LoadingWeather(Weather);
	const [weather, setWeather] = useState({});
	const [city, setCity] = useState('Seoul');
	const [degree, setDegree] = useState(true);
	const [search, setSearch] = useState('');

	// api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
	// setAppState({ loading: true });
	// const apiUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setCity(search);
		setSearch('');
	};
	useEffect(() => {
		document.getElementById('input').focus();

		const getWeather = async () => {
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
			)
				.then((response) => response.json())
				.then((data) => {
					// return data;
					getTime(data.coord.lat, data.coord.lon);
					setWeather(data);
					// getDregees(data.wind.deg);
					let deg = Math.floor(data.wind.deg);
					switch (true) {
						case deg >= 360 && deg <= 21:
							deg = 'N';
							break;
						case deg >= 22 && deg <= 44:
							deg = 'NNE';
							break;
						case deg >= 45 && deg <= 66:
							deg = 'NE';
							break;
						case deg >= 67 && deg <= 89:
							deg = 'ENE';
							break;
						case deg >= 90 && deg <= 111:
							deg = 'E';
							break;
						case deg >= 112 && deg <= 134:
							deg = 'ESE';
							break;
						case deg >= 135 && deg <= 156:
							deg = 'SE';
							break;
						case deg >= 157 && deg <= 179:
							deg = 'SSE';
							break;
						case deg >= 180 && deg <= 201:
							deg = 'S';
							break;
						case deg >= 202 && deg <= 224:
							deg = 'SSW';
							break;
						case deg >= 225 && deg <= 246:
							deg = 'SW';
							break;
						case deg >= 247 && deg <= 269:
							deg = 'WSW';
							break;
						case deg >= 270 && deg <= 291:
							deg = 'W';
							break;
						case deg >= 292 && deg <= 314:
							deg = 'WNW';
							break;
						case deg >= 315 && deg <= 336:
							deg = 'NW';
							break;
						case deg >= 337 && deg <= 359:
							deg = 'NNW';
							break;
						default:
							deg = 'no data';
					}
					setDegree(deg);
				})
				.catch((err) => console.log(err));
		};
		getWeather();
	}, [city]);

	// const speed = (data) => {
	// 	return Number(data);
	// };

	const getTime = (lat, lng) => {
		const timezoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.REACT_APP_TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`;
		fetch(timezoneUrl)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				if (data.formatted) {
					const [, curTime] = data.formatted.split(' ');

					let s = Number(curTime.split(':')[0]);
					console.log(data, s, curTime);
					if (s > 6 && s <= 18) {
						// document.getElementById('moon').classList.toggle('hide');
						// document.getElementById('moon').classList.remove('show');

						document.querySelector('body').classList.remove('dark');
						document.querySelector('body').classList.add('light');

						document.getElementById('sun').src =
							process.env.PUBLIC_URL + '/sun.svg';
						// document.getElementById('sun').classList.remove('hide');
						gsap.from('#sun', { duration: 3, x: 300, opacity: 0, scale: 0.5 });
					} else {
						// document.getElementById('sun').classList.toggle('hide');
						// document.getElementById('sun').classList.remove('show');

						document.querySelector('body').classList.remove('light');
						document.querySelector('body').classList.add('dark');
						document.getElementById('sun').src =
							process.env.PUBLIC_URL + '/moon.svg';

						// document.getElementById('moon').classList.toggle('hide');

						// document.getElementById('moon').classList.remove('hide');

						gsap.from('#sun', { duration: 3, x: 300, opacity: 0, scale: 0.5 });
					}

					// curTimeNow = curTime;
				} else {
					console.log('no');
				}
				// return data.formatted || 'hi';
			});
	};

	return (
		<>
			<main>
				<div className="glass">
					<div className="dashboard">
						<div className="links">
							<img
								className=""
								style={{ width: '30%' }}
								id="sun"
								src={process.env.PUBLIC_URL + '/sun.svg'}
								alt=""
							/>
						</div>
						<div>{weather ? <p>{weather.name}</p> : 'loading'}</div>
					</div>

					<div className="games">
						<div className="form-cards">
							<p className="center" style={{ marginBottom: '1rem' }}>
								Search a city to get the weather.
							</p>

							<form onSubmit={getSearch}>
								<input
									id="input"
									type="text"
									value={search}
									onChange={updateSearch}
								/>
								<button className="btn">Search</button>
							</form>
						</div>
						<Weather
							city={weather.name}
							temps={weather.main}
							weather={weather}
							wind={weather.wind?.speed}
							degree={degree}
						/>
					</div>
				</div>
			</main>

			<div className="circle1"></div>
			<div className="circle2"></div>
		</>
	);
}

export default App;
