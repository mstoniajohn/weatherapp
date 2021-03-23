import React from 'react';

// const names = ['no', 'yes', 'this', 'is', 'cool'];
const Weather = ({ weather, wind, temps, city, degree }) => {
	// const { bitcoin } = props;
	const formatDate = function (timestamp) {
		let date = new Date(timestamp * 1000);

		return date.toLocaleString().split(',')[1];
	};
	const { feels_like, humidity, pressure, temp, temp_max, temp_min } = {
		...temps,
	};
	const { sunrise, sunset } = { ...weather.sys };
	const newSunset = formatDate(sunset);
	const newSunrise = formatDate(sunrise);

	function kelvinToFahrenheit(K) {
		return (K - 273.15) * 1.8 + 32;
	}

	return (
		<>
			<div className="cards" id={weather.id}>
				<div className="card">
					<h3 className="center">{city} Forecast</h3>

					<div className="center">
						<h2 className="temps">
							{kelvinToFahrenheit(temp).toFixed(0)} &#730;
						</h2>
						<h4 className="center">{weather.weather[0]?.descriptione}</h4>

						{/* <h4 className="center">${weather.weather[0]?.description}</h4> */}
					</div>
					<div className="center">
						<p>
							<small>Feels like</small>
						</p>
						<h4 className="temps">
							{kelvinToFahrenheit(feels_like).toFixed(0)} &#730;
						</h4>
					</div>
					<div className="grid">
						<div>
							<p>
								<small>High</small>
							</p>
							<p className="temps">
								{kelvinToFahrenheit(temp_max).toFixed(0)} &#730;
							</p>
						</div>
						<div>
							<p>
								<small>Low</small>
							</p>

							<p className="temps">
								{kelvinToFahrenheit(temp_min).toFixed(0)} &#730;
							</p>
						</div>
					</div>
					<div className="grid">
						<div>
							<p>Sunrise</p>
							<p className="temps">{newSunrise}</p>
						</div>

						<div>
							<p>Sunset</p>
							<p className="temps">{newSunset}</p>
						</div>
					</div>

					<div>
						<p className="hide">
							{humidity} {pressure}
						</p>
						<p className="center">
							Winds {degree} {wind.toFixed(0)}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Weather;
