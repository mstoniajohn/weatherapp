import React from 'react';

// const names = ['no', 'yes', 'this', 'is', 'cool'];
const Weather = ({ weather, wind, temps, city }) => {
	// const { bitcoin } = props;
	const { feels_like, humidity, pressure, temp, temp_max, temp_min } = {
		...temps,
	};
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
						{/* <h4 className="center">${weather.weather[0]?.description}</h4> */}
					</div>

					<div>
						<p>{wind}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Weather;
