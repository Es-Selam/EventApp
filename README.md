# Event Display for TV Screens

This project is a frontend view designed primarily for TV screens, displaying events fetched from an API. It's built with Next.js and styled using Tailwind CSS, featuring dynamic font sizing, automatic event updates, and responsive design to fit various screen sizes. FontAwesome icons enhance the UI for a more engaging user experience.

## Features

- **Dynamic Event Display:** Automatically fetches and cycles through events, displaying details such as title, date, location, and time.
- **Responsive Design:** Adapts to various screen sizes, ensuring the content looks great on TV screens and other devices.
- **Progress Indicator:** A progress bar shows the time until the next event is displayed.
- **Custom Font Sizing:** Dynamically adjusts the title font size based on the screen width and event title length.
- **FontAwesome Icons:** Utilizes FontAwesome icons for a visually appealing presentation of event details.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v12.0.0 or higher)
- npm or Yarn

## Installing

To install the project, follow these steps:

1. Clone the repository:
   ```
   git clone https://yourprojecturl.git
   ```
2. Navigate to the project directory:
   ```
   cd yourprojectdirectory
   ```
3. Install the dependencies:
   ```
   npm install
   ```
   or if you use Yarn:
   ```
   yarn
   ```

## Usage

To start the development server, run:
```
npm run dev
```
or if you use Yarn:
```
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

To fetch events from your API, set the API URL in the `fetchEvents` function. Ensure your API returns data in the expected format:
```json
[
  {
    "title": "Event Title",
    "description": "Event Description",
    "date": "Event Date",
    "location": "Event Location",
    "time": "Event Time",
    "calendarName": "Calendar Name"
  }
]
```

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](LICENSE.md).

---

Remember to replace `https://yourprojecturl.git` and `yourprojectdirectory` with the actual URL and name of your project directory. Also, you might want to add a `LICENSE.md` file if it doesn't already exist, detailing the license under which the project is released.