# 🌤️ Weather Dashboard

https://weather-dashboard-ac1pr6hac-sakibs-projects-ab88135e.vercel.app

A beautiful, responsive weather dashboard built with React and Vite that displays real-time weather conditions for any location worldwide. Features dynamic backgrounds that change based on weather conditions, location search, and a favourites system.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5-5A0EF8?logo=daisyui&logoColor=white)

---

## ✨ Features

- **Real-Time Weather Data** — Fetches current weather using the OpenWeatherMap API
- **Dynamic Backgrounds** — Background images change automatically based on weather conditions (rain, snow, clear sky, thunderstorm, etc.)
- **Location Search** — Search for any city worldwide — supports both predefined locations and free-text city search
- **Geolocation** — Automatically detects your current location on first load
- **Favourite Locations** — Save and manage your favourite locations with persistent local storage
- **Weather Details** — Displays temperature, humidity, wind speed, cloud coverage, and min/max temperatures
- **Weather Icons** — Dynamic weather icons that match current conditions
- **Responsive Design** — Fully responsive layout that works on mobile, tablet, and desktop
- **Glassmorphism UI** — Modern glass-effect design with backdrop blur

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI framework |
| [Vite 7](https://vite.dev/) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| [DaisyUI 5](https://daisyui.com/) | Tailwind component library |
| [OpenWeatherMap API](https://openweathermap.org/api) | Weather data provider |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- An [OpenWeatherMap API key](https://openweathermap.org/api) (free tier works)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

   Then add your OpenWeatherMap API key:

   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

   > 💡 Get a free API key at [openweathermap.org/api](https://openweathermap.org/api)

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**

   Navigate to `http://localhost:5173`

---

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploy to Vercel

This project is configured for seamless Vercel deployment.

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add the environment variable in Vercel's project settings:
   - **Key:** `VITE_WEATHER_API_KEY`
   - **Value:** Your OpenWeatherMap API key
4. Click **Deploy**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add VITE_WEATHER_API_KEY
```

> ⚠️ **Important:** Make sure to add `VITE_WEATHER_API_KEY` as an environment variable in your Vercel project settings. The app will not work without it.

---

## 📁 Project Structure

```
weather-dashboard/
├── public/
│   └── assets/
│       ├── backgrounds/       # Weather background images
│       └── icons/             # Weather condition icons
├── src/
│   ├── Components/
│   │   ├── AddToFavourite.jsx # Favourite toggle button
│   │   ├── Header.jsx         # Navigation, search & favourites dropdown
│   │   ├── WeatherBoard.jsx   # Main weather display container
│   │   ├── WeatherCondtion.jsx# Weather details (humidity, wind, etc.)
│   │   └── WeatherHeadline.jsx# Temperature, location & date display
│   ├── context/
│   │   └── index.jsx          # React context definitions
│   ├── data/
│   │   └── location-data.js   # Predefined location coordinates
│   ├── hooks/
│   │   ├── useDebounce.js     # Debounce utility hook
│   │   ├── useLocalStorage.js # LocalStorage persistence hook
│   │   └── useWeather.js      # Weather data fetching hook
│   ├── provider/
│   │   ├── AddtoFavProvider.jsx    # Favourites context provider
│   │   ├── LocationProvider.jsx    # Location search context provider
│   │   └── WeatherProvider.jsx     # Weather data context provider
│   ├── utils/
│   │   └── timezone.js        # Date/time formatting utilities
│   ├── App.css                # Global styles (Tailwind imports)
│   ├── App.jsx                # Root component with providers
│   ├── main.jsx               # Application entry point
│   └── Page.jsx               # Main page with dynamic background
├── .env.example               # Environment variable template
├── vercel.json                # Vercel deployment configuration
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
└── package.json               # Dependencies & scripts
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WEATHER_API_KEY` | OpenWeatherMap API key | ✅ Yes |

### Supported Weather Conditions

The dashboard dynamically updates backgrounds and icons for:

| Condition | Background | Icon |
|-----------|-----------|------|
| Clear | Clear sky | ☀️ Sunny |
| Clouds | Scattered clouds | ☁️ Cloud |
| Rain | Rainy day | 🌧️ Rain |
| Snow | Snow | ❄️ Snow |
| Thunderstorm | Thunderstorm | ⛈️ Thunder |
| Fog | Winter | 🌫️ Haze |
| Haze | Few clouds | 🌫️ Haze |
| Mist | Mist | 🌫️ Haze |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- UI components by [DaisyUI](https://daisyui.com/)
- Icons and background images from the project assets
