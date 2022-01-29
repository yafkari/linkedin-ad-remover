# Linkedin Ad Remover

Linkedin Ad Remover is a small chrome extension that allows to remove all promoted job posts on a linkedin search. 

## Usage
- `yarn dev`: runs webpack with development environment.
- `yarn build`: runs webpack with production environment.
- `yarn lint`: checks typescript files lint issues in the `src/` folder.

## Installation
> Note that you need at least **yarn** or **npm** installed to proceed.

Clone repo

```
git clone git@github.com:yafkari/linkedin-ad-remover.git
```
Move to `linkedin-ad-remover` directory and run

```
yarn install
```
Now you can either build the extension with
```
yarn build
```

or run it in dev mode
```
yarn dev
```

You will see a `dist/` folder generated containing the build files.

> *yarn dev* watches for file changes.


## Features
- React
- Jest
- Scss support

## Contributing
 
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
The repo is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
