# FireEnjin GraphQL

This is a back-end development stack that uses Firebase and GraphQL with the magic of TypeScript.

# How to Install

1. git clone https://github.com/MadnessLabs/FireEnjinGraphQL
2. npm install
3. Download Service Account JSON from Firebase Project Settings and put it as service-account.json in the root. (See GIF below.)
   ![LT6RvC27Qp](https://user-images.githubusercontent.com/4184680/66259522-8fba8180-e777-11e9-8e37-a7034c06ebd9.gif)

# How to Play

## build

Delete the dist folder and run TypeScript compiler to build project.

## clean

Delete the dist folder.

## codegen

Generate typings and StencilJS components from models and queries.

## env

Copy files from env folder and overwrite specific files per environment.

## deploy

Deploy the project to Firebase (Google Cloud).

## migrate

Run migrations that haven't already ran from src/migrations folder.

## release

Build a release of the backend, typings, and Stencil components.

## seed

Deploy seeds from src/seeds to firestore collections.

## seed:clone

Copy down data from firestore collections to src/seeds.

## serve

Serve the project via a local web server and watch for changes to reload.

## start

This is a alias for the serve command

## test

This will run tests via jest.

## test:watch

This will run a watcher on all your tests

# Where to Next

Below is a link to a Notion note where we are actively working on fleshing out this full-stack structure to make building a project simpler. Any feedback is welcomed, please send us an email to info@MadnessLabs.net or find us on Twitter @MadnessLabs.

https://www.notion.so/madnesslabs/Project-Skeleton-fc1c44581c714be3abbe51df3fed48f1
