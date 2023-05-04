# Secrets

## Install

```bash
$ npm install --global @missing-comma/secrets
```

## TODO

- Add a proper README to the package
- Add command header with version information, etc to every command
- Make the loading component more "discreet"
- Reduce the time it takes to hash/compare the password
- Deattach the [PasswordContainer] component from the code
- Enhance the "--help" output for the commands
- Organize the root directories
- Organize the /ui/components directories

## CLI

```
$ secrets --help
  secrets.js <command>

  Run a command

  Positionals:
    command  command to run             [choices: "get", "create", "password-set"]

  Options:
    --help     Show help                                                 [boolean]
    --version  Show version number                                       [boolean]
    --verbose  Show more information                    [boolean] [default: false]
```
