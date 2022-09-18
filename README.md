![DSPLAY - Digital Signage](https://developers.dsplay.tv/assets/images/dsplay-logo.png)

# DSPLAY - JavaScript Template Boilerplate

This is a Vanilla JavaScript boilerplate for building [HTML-based templates](https://developers.dsplay.tv/docs/html-templates) for [DSPLAY - Digital Signage](https://dsplay.tv/) platform.

You can use this project as a skeleton for creating a new HTML Template with pure JavaScript, without any extra library. If you prefer to use a JS library, check the [other boilerplates](https://developers.dsplay.tv/docs/html-templates/boilerplates/) available.

## Directory Structure

```
|-- my-template
|   |-- index.html  <-- must be on the root
|   |
|   |-- scripts
|   |   |-- app.js
|   |   |-- core-js.js
|   |   |-- dsplay-data.js  <-- can be located anywhere in the template structure
|   |   |-- dsplay-template-utils.js
|   |
|   |-- images
|   |-- styles
```

This structure is just a suggestion.

> The only requirement regarding the project structure is that you must have an `index.html` in the root of your project, and a file called `dsplay-data.js` located anywhere in the project folder. The rest of the structure is up to you. ([see the docs](https://developers.dsplay.tv/docs/html-templates/#directory-structure))

## Packing

To pack your template, just zip all the files of the project (except the `.git` folder).

> **IMPORTANT**: When zipping your template, the `index.html` file must be located in the root of the `.zip` file, not inside any folder.

For linux users, just run:
```sh
./pack.sh
```

It will generate a `template.zip` file ready to be deployed to [DSPLAY Web Manager](https://manager.dsplay.tv/template/create)

## More

The see more about DSPLAY HTML Templates, visit: https://developers.dsplay.tv/docs/html-templates