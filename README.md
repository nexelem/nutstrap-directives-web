### angular-directives-web

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

```
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("AppVersion.js"))' type="text/javascript"></script>
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("HasError.js"))' type="text/javascript"></script>
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("ErrorSpan.js"))' type="text/javascript"></script>
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("IsRequired.js"))' type="text/javascript"></script>
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("CurrencyInPence.js"))' type="text/javascript"></script>
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("CharacterCount.js"))' type="text/javascript"></script>
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("PasswordValidate.js"))' type="text/javascript"></script>
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("ValidJson.js"))' type="text/javascript"></script>
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("AutoFillableField.js"))' type="text/javascript"></script>
```

