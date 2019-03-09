# webpack-template

## date: 9 march 2019

Webpack template for personal use for 1 page applications. 

Supports modules, scss\sass, autoprefixes.

if you use mac, for environment variables use:
`NODE_ENV=""`

## Installation:

1. Copy\clone repository
2. run `npm install`

## Usage:
- `npm run dev` to use as localhost:8080. Notice that 'dev' uses index.html (not index-template.html)
- `npm run build` for production build

## Build input
```
──src
    ├───img // images, all files < 10KB will be transformed into URIs
    ├───js // JS files/modules
        main.js // -> JS entry point
    ├───sass // sass/scss files
    └───style // css styles files
index-template.html
```
## Build output
```
──dist
  ├───css
  ├───img
  └───js
  index.html
```
Used [this video](https://www.youtube.com/watch?v=eWmkBNBTbMM) as starting point.
