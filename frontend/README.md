# Health and Fitness App - Frontend

This is the React frontend for the Health and Fitness application, built with Vite for optimal development experience.

## Features

- **Modern Tech Stack**: React 19 + Vite for fast development and builds
- **Responsive UI**: Mobile-friendly, adaptive design
- **Dark/Light Mode**: Toggle between visual themes
- **Authentication**: JWT-based login and registration
- **Dashboard**: User-friendly dashboard with modular sections:
  - Dashboard Home (welcome screen, planned widget-based layout)
  - Workout Tracking
  - Food/Nutrition Logging
  - Water Intake Tracking
  - Sleep Tracking
  - Analytics and Insights
  - Settings

## Project Structure

- `src/`
  - `components/`: Reusable UI components 
    - `About/`: About page components
    - `Auth/`: Login/registration components
    - `Blog/`: Blog components
    - `Dashboard/`: Dashboard components by section
      - `DashboardHome/`: Main dashboard view (welcome screen)
      - `DashboardWorkout/`: Workout tracking
      - `DashboardFood/`: Nutrition tracking 
      - `DashboardWater/`: Water intake tracking
      - `DashboardSleep/`: Sleep tracking
      - `DashboardAnalytics/`: Stats and charts
    - `DarkModeButton/`: Theme toggle
    - `Footer/`: Site footer
    - `LandingPage/`: Homepage components
    - `Navbar/`: Navigation components
    - `Pricing/`: Pricing page components
  - `pages/`: Main route pages
  - `styles/`: CSS files
  - `assets/`: Images and icons
  - `main.jsx`: Entry point
  - `app.jsx`: Route definitions

## Development

1. Install dependencies:
```
npm install
```

2. Run development server:
```
npm run dev
```

3. Build for production:
```
npm run build
```
