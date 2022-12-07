# eslint-count-errors

Display a summary of eslint warnings

## Installation

Package is not on npm yet, I'm open to publish the package if anyone is interested. In the meantime you can install it from github directly

```sh
npm install --global https://github.com/danielpza/eslint-count-errors.git
```

## Usage

```
$ eslint-count-errors --help
eslint-count-errors <pattern>

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  eslint-count-errors ./src  Count eslint errors in the current folder
```

Example output:

```
   1 no-constant-condition
   1 no-async-promise-executor
   7 no-unsafe-optional-chaining
  31 import/no-named-as-default-member
  71 import/no-named-as-default
```
