# Project Phosphor

Phosphor is PowerShell module designed for generating user interfaces from PowerShell
modules.

## Disclaimer

This project is to be considered a **proof-of-concept** and **not a supported Microsoft product**.

## Goals

This project has a few short-term goals:

- Provide a proof-of-concept cross-platform version of `Out-GridView` and `Show-Command`
- Provide a proof-of-concept administration UI generated solely from PowerShell modules

We also have aspirational, long-term goals for a more fully-established project along these lines:

- Implement a core algorithm that can scan PowerShell modules and extract the necessary
  details for building a functional user interface
- Establish a generalized UI model which will provide a blueprint for PowerShell-based user
  interfaces in any platform or UI framework
- Provide a standard, self-hostable HTML UI frontend for quick and easy display of a generated
  user interface based on a target module or set of modules.
- Enable UI integration hooks so that gnenerated UI can be seamlessly integrated into existing
  crafted UI
- Provide script generation for operations exposed in the UI so that users can learn how to
  automate the tasks that they have performed
- Respect RBAC and JEA constraints so that UI can be generated for users that should not have
  full access to the target machine

These goals may be changed or clarified over time.  Please feel free to file issues if you have
further ideas or requirements for this project.

## Maintainers

- [David Wilson](https://github.com/daviwil) - [@daviwil](http://twitter.com/daviwil)

## License

This project is [licensed under the MIT License](LICENSE.txt).  Please see the
[third-party notices](Third Party Notices.txt) file for details on the third-party
binaries that we include with releases of this project.
