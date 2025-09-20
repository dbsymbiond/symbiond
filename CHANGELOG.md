# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.1] - 2025-9-20

### Added

- Dockerized react app

## [0.6.0] - 2025-9-20

### Fixed

- Removed react native as the frontend
- Added react as the new frontend
- updated backend to remove /map route as this is handled in the frontend now
- updated readme

## [0.5.2] - 2025-6-4

### Fixed

- Fixed readme.
- Fixed issue with the Dockerfile not finding the db.sh file.

## [0.5.0] - 2025-6-4

### Changed

- Overhaul to the map grid logic. Added a tile server and initial parsing of geojson.
- Added postgis database
- Removed Calendar screen for now until later enhancement.

## [0.4.0] - 2025-1-15

### Added

- Added a new map screen with a link in the bottom tabs navigator.
- The map is a 16x16 grid that is served up from the backend and shown in a webview.
- 2 initial layers for the map include states, and physical.

## [0.3.0] - 2025-1-13

### Added

- Dockerized the backend application and setup a simple postgres database for future development as well as env folder for Docker to hold the database information.
- Added locales folder with defenitions and strings currently in use by the application.
- Locales Context to handle the 18n-js implementation on the client
- Removed utils folder from the root directory and moved the server specific utilities to the backend.
- minor fix in app.json for version as well as updated README.

### Fixed

- an error was occuring in the calculation for date/time and fixed that as well as tested.

## [0.2.0] - 2024-12-24

### Added

- Jest implementation for React Native and NodeJS of a comprehensive test suite that includes unit tests of the utils functions as well as snapshot tests for the client.
- Initial game calendar implementation
- Added react navigation with bottom tab
- Performance enhancement on websocket and context implementation
- A current date/time output in the calendar component shows the current game time from the server
- Custom calendar component and contexts that handle the unique calendar of Symbiond.

## [0.1.2] - 2024-12-24

### Changed

- Update to README markdown and styling

## [0.1.1] - 2024-12-24

### Changed

- Updated README with instructions for contributing and corrected clone command.

## [0.1.0] - 2024-12-24

### Added

- Initial project setup with basic game timekeeping functionality.
- React Native frontend app to display Symbiond game time.
- Node.js backend server to calculate and broadcast time using Socket.IO.
