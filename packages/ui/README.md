# Move Wallet Extension Frontend 🐕

![Screen + Browser Mock](https://user-images.githubusercontent.com/1918798/125732391-29da0e00-0796-49bb-895d-35de187b141d.png)

Welcome to the frontend portion of the Move Wallet browser extension. This is the
React portion of the codebase which handles UI related states, and communicates
with the background script API `@web3lab/tally-background`. The intent is for
all communication with outside APIs to strictly happen within
`@web3lab/tally-background`, not here. This frontend only contains what's
needed to provide the visual goodness!

## Prerequisites ✍️

Make sure to have these installed,

- [Git](https://git-scm.com/)
- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

Check out these docs,

- [Redux Toolkit](https://redux-toolkit.js.org/api/configureStore)
- [React Router](https://reactrouter.com)
- [styled-jsx](https://github.com/vercel/styled-jsx)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Running in development 🚀

First, install the node modules:

```bash
yarn install
```

If you run into `The engine "node" is incompatible with this module.`, try adding `--ignore-engines` for now.

Then, start up the dev server:

```bash
yarn start
```

Load the unpacked extension for your web browser via the `/build` directory. Currently builds are tested to work on Chrome and Brave browser.

## Primary file structure 📁

```
/pages
# Folder for components that serve the components for pages, primarily tabs

/components/GroupName/GroupNameComponentName.js
# Components are grouped by concern, like TabBar, where the primary component
usually is named the same as the group. All components here are prefixed
by the folder they're in.

/public
# Static assets like fonts and images
```
