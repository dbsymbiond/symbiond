# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- an error was occuring in the calculation for date/time and fixed that as well as tested. 

### Added

- Shared folder containing constants that are in use by both applications and for future utilities they share as well.
- Added locales folder with defenitions and strings currently in use by the application.
- Locales Context to handle the 18n-js implementation on the client
- Removed utils folder from the root directory and moved the server specific utilities to the backend and made a utils folder in the shared folder for future shared utils.
- minor fix in app.json for version as well as updated README.

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