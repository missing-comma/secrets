# Secrets

A simple password manager using a command-line interface

# Table of Contents

. [Install](#Install) . [Description](#Description) . [Setup](#Setup) . [Commands](#Commands) .
[Roadmap](#Roadmap)

## Install

```sh
$ npm install --global @missing-comma/secrets
```

## Description

"Secrets" is a command-line interface password manager designed to help users store and manage their
passwords securely. With "Secrets", users can easily define and create strong passwords, which are
then encrypted using an encryption algorithm of their choice. This tool is especially useful for
individuals who need to manage multiple accounts across various platforms and want a safe and
reliable way to store their passwords.

By using "Secrets", users can avoid the need to remember numerous passwords, which can be
time-consuming and difficult to manage. Instead, they can simply access their password database
through the command-line interface and quickly retrieve the password they need for a specific
account. This not only saves time but also reduces the risk of forgetting passwords or using weak
ones.

## Setup

To use "Secrets", you must first install the package on your local machine.  
Once you have installed the package, you will need to set a password before you can start using the
password manager. To do this, run the following command:

```sh
$ secrets password-set
```

This will prompt you to enter a password. Make sure to choose a strong and secure password that you
can remember, as you will need to enter it every time you want to access your password database.

After setting your password, you can start using "Secrets" to store and manage your passwords. By
default, your passwords will be encrypted using the AES encryption algorithm. However, you can
change this to a different encryption algorithm by modifying the config file. To do this, simply
edit the `.missing-comma/secrets/config.json` file and change the `encryption_algorithm` parameter
to the desired algorithm.

Note that if you forget your password, there is no way to recover it. Therefore, it is important to
choose a password that you can remember or store it in a safe place.

## Commands

## Roadmap

-   Add a proper README to the package
-   Add command header with version information, etc to every command
-   Deattach the [PasswordContainer] component from the code
-   Enhance the "--help" output for the commands
-   Organize the root directories
-   Organize the /ui/components directories
-   Add unit tests
-   Add integration tests
-   Configure publish command (without skipping the lint and test command)

## CLI

```
secrets.js <command>

Run a command

Positionals:
  command  command to run             [choices: "get", "create", "password-set"]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --verbose  Show more information                    [boolean] [default: false]
```
