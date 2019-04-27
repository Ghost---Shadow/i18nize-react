# i18nize-react (Work in progress)

Internationalize legacy react apps in a lunch break.

`i18nize-react` finds and replaces all the hardcoded string literals in your react project with i18n bindings.
Migrating legacy react apps with hard coded string literals is a boring and time intensive job. i18nize-react (pronounced as internationalize react) solves that problem. `i18nize-react` uses `acorn` AST to walk on react components and process them.

## Getting started (Work in progress)

1. First install the `i18nize-react` globally using npm

```sh
npm i -g i18nize-react
```

2. Now in your react app run

```sh
i18nize-react
```

3. Go for lunch

4. It should create three files `i18n/index.js`, `i18n/english.js`, `i18n/other_language.js`.
It will also replace all string literals in all the react components with corresponding translate key and correctly inject
the i18n translator.
