
module.exports = {
    "extends": ["airbnb", "standard", "standard-react", "standard-jsx"],

    "parser": "babel-eslint",

    "plugins": ["flowtype"],

    "env": {
        "browser": true,
        "node": true,
        "jest": true
    },

    "rules": {
        // Avoid having lines of code that are longer than 160 characters (including whitespace) to ensure readability and maintainability.  We found the airbnb standard of 100 characters caused devs to layout code in ways that actually reduced code clarity.
        "max-len": ["error", 160],

        // Destructuring when assigning an object, particularly in a return, makes code that is harder to read.  So we allow structuring only on assignment.
        "prefer-destructuring": ["error", {"AssignmentExpression": {"object": false}}],

        // Standard react and redux code use this constantly and consider it standard usage.
        "import/no-named-as-default": 0,

        // Allow JSX inside JS files, using the JSX file extension within React Native projects causes problems.
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],

        // Allow link component to generate href attribute so in the end anchor tag is valid from the accessibility point of view
        "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ] }],

        // Disable the method sort ordering enforced by airbnb.  We found this interferred with code clarity when we group methods by usage so relevant code is generally all on screen.
        "react/sort-comp": 0,

        // Disable the requirement to put all require statements at the top of the file.  This interferres with code clarity in out index.js files
        "global-require": 0
    },

    "globals": {
        "__DEV__": false,
        "Generator": false,
        "$Keys": false,
        "TimeoutID": false
    }
}


