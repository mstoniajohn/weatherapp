import React from 'react';

// const names = ['no', 'yes', 'this', 'is', 'cool'];
const Weather = ({ weather, wind, temps, city, degree, description }) => {
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
						{/* <h4 className="center">
							{weather.weather[0].description && weather.weather[0].description}
						</h4> */}

						<h4 className="center">
							{description ? description[0].main : 'loading'}
						</h4>
						<h1 className="temps">
							{kelvinToFahrenheit(temp).toFixed(0)} &#730;
						</h1>
						<div className="grid">
							<p>
								<small>High: </small>
								<span className="temps">
									{kelvinToFahrenheit(temp_max).toFixed(0)} &#730;{' '}
								</span>{' '}
							</p>
							<p>
								{' '}
								<small>Low: </small>
								<span className="temps">
									{kelvinToFahrenheit(temp_min).toFixed(0)} &#730;
								</span>
							</p>

							<p>
								<small>Feels like: </small>
								<span className="temps">
									{kelvinToFahrenheit(feels_like).toFixed(0)} &#730;
								</span>
							</p>
						</div>

						<p className="center">
							Winds{' '}
							<span className="temps">
								{degree} {wind?.toFixed(0)}
							</span>{' '}
							mph
						</p>

						<div className="grid">
							<p>
								Humidity:
								<span className="temps"> {humidity}</span>
							</p>
							<p>
								{' '}
								Pressure:
								<span className="temps"> {pressure}</span>
							</p>
						</div>
						<div className="grid">
							<div className="center">
								<p>Sunrise</p>
								<p className="temps">{newSunrise}</p>
							</div>
							<div className="center">
								<p>Sunset</p>
								<p className="temps">{newSunset}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Weather;
