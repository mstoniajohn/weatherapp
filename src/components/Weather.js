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
					<h3
						className="center"
						style={{
							fontWeight: '200',
							fontSize: '2.2rem',
							marginBottom: '0.5rem',
						}}
					>
						{city}
					</h3>

					<div className="center">
						<p style={{ fontSize: '1.3rem' }} className="center">
							{description ? description[0].description : 'loading'}
						</p>
						<h3 style={{ fontSize: '3.5rem', fontWeight: '200' }}>
							{kelvinToFahrenheit(temp).toFixed(0)}&#730;
						</h3>
						<div className="grid">
							<p>
								<small>High: </small>
								<span className="temps">
									{kelvinToFahrenheit(temp_max).toFixed(0)}&#730;{' '}
								</span>{' '}
							</p>
							<p>
								{' '}
								<small>Low: </small>
								<span className="temps">
									{kelvinToFahrenheit(temp_min).toFixed(0)}&#730;
								</span>
							</p>

							<p>
								<small>Feels like: </small>
								<span className="temps">
									{kelvinToFahrenheit(feels_like).toFixed(0)}&#730;
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
								<span className="temps"> {humidity}%</span>
							</p>
							<p>
								{' '}
								Pressure:
								<span className="temps"> {pressure}</span>
							</p>
						</div>
						<div className="grid">
							<div className="center">
								<p>
									Sunrise: <br />
									<span className="temps"> {newSunrise}</span>
								</p>
							</div>
							<div className="center">
								<p>
									Sunset: <br />
									<span className="temps"> {newSunset}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Weather;
