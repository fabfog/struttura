# Struttura

## Available Scripts

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `pnpm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `pnpm generate`

Launches the interactive prompt for generating new ui components, stores, helpers etc.

### `pnpm lint` and `pnpm lint:fix`

Launch eslint / fixes problems

## Folder structure

- `common`: reusable parts of the project, splitted into folders View and Model concerns, including business logics
    - `ui`: all reusable presentational components, according to Atomic Design principles
        - `atoms`
        - `molecules`
        - `organisms`
        - `templates`

    - `helpers`: a folder of pure functions, classes and hooks for utility purposes

    - `business-logics`: a folder of reusable business logics implemented as pure functions, classes, hooks, state-machines, you name it

    - `stores`: global state stores, they can partially "mirror" BE structures, and partially implement FE-only data structures
        - [domain]
            - api: queries and mutations interacting with the BE, like RTQK (with Redux), Apollo (GraphQL), React-Query, etc.
            - global states like Redux, Zustand, etc.

- `features`: non-reusable parts of the project, they implement the actual pages of the app
    - [Name]
        - `index.tsx`: entry point exporting the page/feature (as default)
        - `connectors`: a connector is a component or hook that combine reusable components, or hooks, or functions (or anything else) to build app-specific parts. Only components and hooks folders are generated, because that's what you'll need to connect reusable parts to specific features.
            - `components`: here you won't separate by atoms, molecules, etc. as we're not talking about reusable parts, instead you're going to combine components together (by responsibilities, of course)
            - `hooks`: here you won't separate by business logics, helpers, etc. as they could be combined together in some function handling some kind of event or action (i.e. onClick)
        - `features`: a folder of sub-features structured exactly like features, recursively

Note: I'm talking about features and not pages (as Atomic Design does), because we could have some nodes of the application tree that are not mapped to any page or visual representation in particular, for example an "Authenticated" feature that checks if the user is authenticated: if not, the user is redirected to an "Unauthenticated" feature. Both Authenticated and Unauthenticated will have a router with a "default" page, or wrap one, but they are not technically pages themselves. In short, I expect pages to be a subset of features.

- `App.tsx`: the entry point of the whole application. Here you can add global providers (18n, theme, etc.)

## Rules

### Segregation

1. components inside `common/ui` can only import from `common/ui` and `common/helpers`
    Why? Visual components should be stateless and not coupled with any particular logics, except simple data transformation for rendering needs, or stuff like that. Nothing bound to a particular "context".

2. functions inside `common/helpers` can only import from `common/helpers`
    Why? Helpers should be very simple functions, not depending on anything context- or ui-specific

3. functions inside `common/business-logics` can only import from `common/business-logics` and `common/helpers`
    Why? Business Logics shouldn't know about features, UI or stores. They're actually the only part of the app that would "survive" even without an app

4. functions inside `common/stores` can only import from `common/stores` and `common/helpers`. Avoid cross-folder imports between `common/stores`: use dependency injection if you need to refer to other stores

6. `connectors` can only import from `common`
    Why? They should only connect together feature-specific parts (state, translations) stateless components 
    When creating connectors, use HOC whenever possible
    - to connect global state
    - to connect tranlations (i.e. withTranslations)

7. only `sections` and `connectors` can be imported into the `index.tsx` file of a feature
    Why? This is to avoid polluting the index file with lots of stateless components that require importing and initializing several hooks (and other stuff) to be correctly configured

8. types should never be directly shared across `common/ui`, `common/stores` and `common/business-logics`
   Why? Let's assume we have
    - a store (Redux), an api query (RTKQ), a business-logics function and a component using a common type, let's say "Order"
    - over time, the type grows with a lot of properties, this is due to the need of getting more data from the API in a single object (to avoid multiple calls). Different subsets of those properties could be used by different components.
    - the component will only handle a fraction of that data, but it still receives the whole object as a prop: this makes the UI component less testable, as it forces you to pass unnecessary data (violation of Interface Segregation principle)
    To obtain a "DRY" result without having the above said problem, you can import the types you need (most commonly from stores to ui and business-logics) and `Pick` only the props you actually need. If you need to "pass back" some values (i.e. in a callback) preserving the original type, use generics: `T extends Pick<TypeImportedFromStore, 'prop1' | ...>`

