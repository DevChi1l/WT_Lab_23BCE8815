document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const loader = document.getElementById('loader');
    const errorDiv = document.getElementById('error');
    
    const cityName = document.getElementById('cityName');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const condition = document.getElementById('condition');
    const feelsLike = document.getElementById('feelsLike');
    const windSpeed = document.getElementById('windSpeed');
    
    const weatherData = {
        'london': {
            city: 'London, UK',
            temp: 15,
            feels_like: 13,
            humidity: 80,
            description: 'Light Rain',
            icon: '🌧️',
            wind: 12
        },
        'new york': {
            city: 'New York, USA',
            temp: 22,
            feels_like: 24,
            humidity: 65,
            description: 'Sunny',
            icon: '☀️',
            wind: 8
        },
        'tokyo': {
            city: 'Tokyo, Japan',
            temp: 18,
            feels_like: 17,
            humidity: 75,
            description: 'Cloudy',
            icon: '☁️',
            wind: 10
        },
        'paris': {
            city: 'Paris, France',
            temp: 16,
            feels_like: 14,
            humidity: 70,
            description: 'Partly Cloudy',
            icon: '⛅',
            wind: 15
        },
        'sydney': {
            city: 'Sydney, Australia',
            temp: 25,
            feels_like: 27,
            humidity: 60,
            description: 'Clear Sky',
            icon: '☀️',
            wind: 5
        },
        'mumbai': {
            city: 'Mumbai, India',
            temp: 30,
            feels_like: 33,
            humidity: 85,
            description: 'Humid',
            icon: '🌤️',
            wind: 7
        },
        'dubai': {
            city: 'Dubai, UAE',
            temp: 35,
            feels_like: 38,
            humidity: 40,
            description: 'Hot',
            icon: '🔥',
            wind: 20
        },
        'moscow': {
            city: 'Moscow, Russia',
            temp: 5,
            feels_like: 2,
            humidity: 75,
            description: 'Cold',
            icon: '❄️',
            wind: 18
        }
    };
    
    function getWeatherIcon(description) {
        const icons = {
            'rain': '🌧️',
            'sunny': '☀️',
            'cloud': '☁️',
            'clear': '☀️',
            'snow': '❄️',
            'thunder': '⛈️',
            'default': '🌤️'
        };
        
        description = description.toLowerCase();
        for (let key in icons) {
            if (description.includes(key)) {
                return icons[key];
            }
        }
        return icons.default;
    }
    
    function fetchWeather(city) {
        loader.style.display = 'block';
        searchBtn.disabled = true;
        errorDiv.innerHTML = '';
        
        // Simulate API delay
        setTimeout(() => {
            loader.style.display = 'none';
            searchBtn.disabled = false;
            
            const cityLower = city.toLowerCase().trim();
            
            if (weatherData[cityLower]) {
                const data = weatherData[cityLower];
                
                cityName.textContent = data.city;
                temperature.textContent = data.temp + ' °C';
                humidity.textContent = data.humidity + ' %';
                condition.textContent = data.description;
                feelsLike.textContent = data.feels_like + ' °C';
                windSpeed.textContent = data.wind + ' km/h';
                weatherIcon.textContent = data.icon;
                
                errorDiv.innerHTML = '';
            } else {
                errorDiv.innerHTML = '❌ City not found. Try: London, New York, Tokyo, Paris, Sydney, Mumbai, Dubai, Moscow';
                
                // Reset display
                cityName.textContent = '-';
                temperature.textContent = '-- °C';
                humidity.textContent = '-- %';
                condition.textContent = '--';
                feelsLike.textContent = '-- °C';
                windSpeed.textContent = '-- km/h';
                weatherIcon.textContent = '❓';
            }
        }, 1500); // Simulate network delay
    }
    
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city === '') {
            errorDiv.innerHTML = 'Please enter a city name';
            return;
        }
        fetchWeather(city);
    });
    
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city === '') {
                errorDiv.innerHTML = 'Please enter a city name';
                return;
            }
            fetchWeather(city);
        }
    });
    
    setTimeout(() => {
        fetchWeather('london');
    }, 500);
});