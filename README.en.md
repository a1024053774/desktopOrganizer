# Desktop Organizer

An Electron-based application that creates Apple-style semi-transparent rounded rectangles on your desktop wallpaper, helping users better organize and categorize desktop files.

## Features

- Creates Apple-style semi-transparent rounded rectangles on your desktop
- Customize rectangle title, position, size, color, and blur level
- Rectangles display on the desktop without interfering with desktop icons
- Quick access to settings window with `Ctrl+Shift+D` shortcut
- Automatically saves your settings between application restarts

## Installation

### Requirements

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Install Dependencies


1. Clone this repository:

   ```
   git clone https://github.com/yourusername/desktop-organizer.git
   cd desktop-organizer
   ```
2. Install the required dependencies:

   ```
   npm install

   ```


### Required Dependencies

* **Production dependencies** :
* `electron`: ^25.0.0
* `electron-store`: ^8.1.0
* **Development dependencies** :
* `electron-builder`: ^24.4.0


## Usage

### Running the Application

```
npm start
```


### Creating Desktop Areas

1. After starting the application, use the `Ctrl+Shift+D` shortcut to open the settings window
2. In the settings window, use the form to add a new desktop area
3. Set the area's title, position, size, color, and blur level
4. Click the "Add" button to create the new area
5. Select existing areas in the settings window to edit or delete them


### Building the Application Installer

```
npm run build
```

The built installer packages will be saved in the `dist` directory.


## Project Structure

```
desktop-organizer/
├── src/                    # Source code directory
│   ├── main.js             # Electron main process
│   ├── preload.js          # Preload script
│   ├── renderer.js         # Renderer process script
│   └── components/         # Components directory
│       ├── Rectangle.js    # Rectangle component
│       └── Controls.js     # Control panel component
├── assets/                 # Assets directory
│   └── styles/             # Style files
│       └── main.css        # Main stylesheet
├── views/                  # Views directory
│   ├── index.html          # Main window HTML
│   └── settings.html       # Settings window HTML
├── package.json            # Project configuration and dependencies
└── README.md               # Project documentation
```


## Development Notes

### Key Files

* `main.js`: Electron main process, responsible for creating windows and handling IPC communication
* `preload.js`: Preload script that safely exposes main process APIs to the renderer process
* `renderer.js`: Renderer process script that handles UI rendering and user interactions
* `Rectangle.js`: Rectangle class that defines properties and methods for rectangle areas
* `Controls.js`: Control panel class that handles UI logic in the settings window

### Known Issues and Limitations

* Due to operating system limitations, the application may not be able to fully place windows beneath desktop icons on some Windows versions
* Additional scaling adjustments may be needed on high DPI displays


### Customization

1. Modify `main.css` to customize the style of rectangle areas
2. Add more properties in `Rectangle.js` to extend rectangle functionality
3. Edit `Controls.js` to add more control options
