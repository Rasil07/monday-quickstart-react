## Overview

This is a simple React App "Item View Form" integration in Monday.com.

## Project setup

### Run these commands on bash / command-line

- run git clone git@github.com:Rasil07/monday-quickstart-react.git
- run npm install

### Configure Monday App

1. Open monday.com, login to your account and go to a "Developers" section.
2. Create a new "QuickStart View Example App"
3. Open "OAuth & Permissions" section and add "boards:read" scope
4. Open "Features" section and create a new "Item View" feature
5. Open "View setup" tab and fulfill in "Custom URL" field your ngrok public URL, which you got previously (f.e. https://021eb6330099.ngrok.io)
6. Click "Boards" button and choose one of the boards with some data in it.
7. Click "Preview button"
8. Enjoy the Quickstart View Example app!

### Project config

- add .env file with required configuration in root directory

## Run Project

- npm start

## Release your app

1. Run script

### `npm run build`

2. Zip your "./build" folder
3. Open "Build" tab in your Feature
4. Click "New Build" button
5. Click "Upload" radio button and upload zip file with your build
6. Go to any board and add your just released view
7. Enjoy!
