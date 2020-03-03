# @digidem/wcmc-mapeo-mobile-intro

Intro screens for Mapeo Mobile for the WCMC ICCA registration app.

These swipe-able introductory screens are designed for the WCMC / ICCA variant of [Mapeo Mobile](https://github.com/digidem/mapeo-mobile) with specific guidance for communities using Mapeo for demarcating ICCA conservation areas.

## Contributing

If you would like to edit these screens, you can set up a local test environment with an example app which allows you to see the introduction on your phone or in a simulator on your desktop, following the instructions below:

### 1. Install some necessary tools

Install [Node 10 LTS](https://nodejs.org/en/download/) or later on your computer.

[Install Yarn](https://classic.yarnpkg.com/en/docs/install) to manage dependencies.

### 2. Clone this respository to your computer

Clone this repository to your computer following [these instructions](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) (you can clone it using your command line or with Github Desktop).

### 3. Install the example app dependencies

Open the command line tool on your computer, this will be "Terminal" on a Mac or Linux, or will be "cmd.exe" or "Git Bash" or "Powershell" on Windows.

Change the folder to the folder you just cloned to:

```sh
cd WCMC_INTRO_CLONED_FOLDER
```

Install all the dependencies

```sh
yarn bootstrap
```

### 4. Start "Expo" and run the example app

```sh
yarn example start
```

This will open your web browser. Press `a` to run on a connected Android phone, or `i` to run in the iOS Simulator (you need to [install XCode](https://reactnative.dev/docs/getting-started)).

### 5. Edit the text on the screens

You can edit the text in the file [`screenDefs.ts`](./src/screenDefs.ts) and you should see the example app update whenever you save changes.

### 6. Check your new code is correct

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typescript
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, eg add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn bootstrap`: setup project by installing all dependencies and pods.
- `yarn typescript`: type-check files with TypeScript.
- `yarn lint`: lint files with ESLint.
- `yarn test`: run unit tests with Jest.
- `yarn example start`: start the Metro server for the example app.
- `yarn example android`: run the example app on Android.
- `yarn example ios`: run the example app on iOS.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.

## Installation

```sh
npm install @digidem/wcmc-mapeo-mobile-intro
```

## Usage

Works best with a navigation library - see the [Example](./example)

```js
import React from 'react'
import { Text, Button } from 'react'
import { IntroPager, IntroInfo } from '@digidem/wcmc-mapeo-mobile-intro'

// ...

const Intro = () => {
  const [extraInfo, setExtraInfo] = React.useState(null)

  // Use useCallback to avoid unnecessary re-renders
  // This is called with the title and text for the extra info screen
  const handleShowInfo = React.useCallback(({title, text}) => {
    setExtraInfo({title, text})
  }, [])

  // This is called when the user completes the introductions
  const handlePressComplete = React.useCallback(() => {
    // navigate to next page
  }, [])

  return (
    <>
      <IntroPager
        onShowInfo={handleShowInfo}
        onPressComplete={handlePressComplete} />
      {extraInfo && <View style={{flex: 1}}>
        <Text>{extraInfo.title}</Text>
        <IntroInfo markdownText={extraInfo.text}>}
        <Button onPress={() => setExtaInfo(null)}>Close</Button>
      </View>}
    </>
  )
}

```

## License

MIT
