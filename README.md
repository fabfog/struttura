# Struttura

## Motivation

React is a great tool once you get a grasp of its concepts, but it can be tricky if you approach it without a basic knowledge of architectural and design patters: what tends to happen is that you end up with a chaotic bunch of components, with no clear separation of concerns and responsibilities. Mixed UI, application logics and business logics, big files... or maybe small files, but with no clear criteria on how they have been splitted: so no clue on how to keep working on them, without breaking reusability. Been there, done that.

This repo is an experiment aiming to build a basic architecture on top of React + TypeScript. I got "inspired" by Atomic Design and I tried to keep in mind SOLID principles, while defining the structure and the logics of every piece of code.

In short, the architecture presented here aims to help developers in 3 fundamental moments:

1. to know exactly what a component or hook or function should do, even before opening the file they're contained in. Or, which is basically the same, to know exactly where to put a component (or hook, etc.) before start working on it. *Structure determines function*, like in biology. This is achieved by proposing a structure based on the concept of separation of concerns, in brief Model (data structures and business logics), View (presentational components) and ViewModel ("connecting" Model and View entities).

2. to know exactly what can be the dependencies of what I'm working on (be it a component, hook, etc.), even before opening a file. This is achieved by restricting imports (see the following "rules"), and this is enforced via Eslint rules. For instance: if you try to import some global state "thing" into a UI-only component, you will get an error! Of course this is meant to ensure reusability and modularity, and avoid mixing application logics with business logics, UI, etc.

3. to speed up repetitive processes when creating a new component/hook/etc., thanks to generators. It reduces the "fatigue" of creating many files, connect them together via imports and exports, and help keeping consistency in naming (at least for filenames, component/functions/hooks names, and types). Every generated component/hook/function comes with a (failing) test, so one can start testing right away: this should eliminate the tendency to write all the code first, and then test the whole thing. TDD is the way!

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
        - [SubFeature]: sub-features can be added as sub-directories

Note: I'm talking about **features** and not *pages* (as in Atomic Design), because we may have some nodes of the application tree that are not mapped to any page, or visual representation in particular. For example, imagine an "Authenticated" feature that checks if the user is authenticated: if not, the user is redirected to an "Unauthenticated" feature. Both Authenticated and Unauthenticated may wrap some kind of routing to actual pages, but they are not technically pages themselves. In short, I expect pages to be a *subset* of features.

- `App.tsx`: the entry point of the whole application. Here you can add global providers (18n, theme, etc.).

## Rules

### Segregation

1. components inside `common/ui` can only import from `common/ui` and `common/helpers`.
    Why? Visual components should be stateless and not coupled with any particular logics, except simple data transformation for rendering needs, or stuff like that. Nothing bound to a particular "context".

2. functions inside `common/helpers` can only import from `common/helpers`.
    Why? Helpers should be very simple functions, not depending on anything context- or ui-specific.

3. functions inside `common/business-logics` can only import from `common/business-logics` and `common/helpers.
    Why? Business Logics shouldn't know about features, UI or stores. They're actually the only part of the app that would "survive" even without an app

4. functions inside `common/stores` can only import from `common/stores` and `common/helpers`. Also, avoid cross-folder imports between `common/stores`: try using dependency injection if you need to refer to other stores.

6. `connectors` can only import from `common`.
    Why? They should only connect together feature-specific parts (state, translations) stateless components 
    When creating connectors, use HOC whenever possible
    - to connect global state
    - to connect tranlations (i.e. withTranslations)

7. types should never be directly shared across `common/ui`, `common/stores` and `common/business-logics`. 
    Why? Let's assume we have
    - a store (Redux), an api query (RTKQ), a business-logics function and a component using a common type, let's say "Order"
    - over time, the type grows with a lot of properties, this is due to the need of getting more data from the API in a single object (to avoid multiple calls). Different subsets of those properties could be used by different components.
    - the component will only handle a fraction of that data, but it still receives the whole object as a prop: this makes the UI component less testable, as it forces you to pass unnecessary data (violation of Interface Segregation principle)
    To obtain a "DRY" result without having the above said problem, you can import the types you need (most commonly from stores to ui and business-logics) and `Pick` only the props you actually need. If you need to "pass back" some values (i.e. in a callback) preserving the original type, use generics: `T extends Pick<TypeImportedFromStore, 'prop1' | ...>`

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

### `pnpm lint` / `pnpm lint:fix`

Respectively launches eslint / fixes problems