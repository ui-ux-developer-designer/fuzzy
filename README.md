# XML Books collection read and search

An experimental implementation of [Angular](https://angularjs.org/) & [Material Design](https://design.google.com/) heavily inspired from [Angular Material project](https://material.angularjs.org).

Angular service created to load an [xml](https://code.google.com/p/x2js/) file and transform it to json to create the books list. The app now will let explore and order the books.

The list will allow a [fuzzy](http://kiro.me/projects/fuse.html) search in the books' titles and an Angular filter helps to search for keywords and even will allow mispellings.
A highlight enhancment also added using another filter to bind to the keywords change to highlight them as they are typed.
Material Design by Google which is quite modern front-end frmaework for a better visual experience.

A live [demo](http://ui-ux-developer-designer.github.io/fuzzy/) to try it.

## Get the codes
```
git clone git@github.com:ui-ux-developer-designer/fuzzy.git
cd fuzzy
```

## Install dependencies
```
bower install
```

## Start
Run a local HTTP Webserver: `live-server` or `http-server`.

```console
live-server
```

:)
