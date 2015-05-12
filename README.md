[![Build Status](https://travis-ci.org/nexelem/nutstrap-directives-web.svg?branch=feature%2Ftravis)](https://travis-ci.org/nexelem/nutstrap-directives-web)

### nutstrap-directives-web

This module contains AngularJS *directives* for a variety of ui functionality.

### Build

gradle build

#### Using the module

Include the library in your main angular file  (app.coffee / app.js).

```
dependencies = [
    'myApp.directives'
]
```
and add the module into angular

```
@directivesModule = angular.module('myApp.directives', ['myApp.common'])
```

finally you can add the js to your html, (index.html)

To compile coffeescript, copy files to dist and concat into one use respectively grunt tasks: coffee, copy and uglify.
grunt dist runs all those tasks.
Complete, minified js file can be found in dist/directives-module.min.js

