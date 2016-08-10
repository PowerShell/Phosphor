# Phosphor

Phosphor is both a .NET library and PowerShell module for generating user interfaces from PowerShell
modules.

> NOTE: This project is currently in very early development and may not be functional yet.

## Goals

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

## How to run
- Type "npm install" within the /src folder, /src/Phosphor-App, and /src/Phosphor-Server.
- Within /src/Phosphor-Server, also type in "npm install node-powershell@1.1.0".
- To run the server, navigate to /src/Phosphor-Server and input "node server.js"
- You should then be able to connect to localhost:3000 and see the app.

## Maintainers

- [David Wilson](https://github.com/daviwil) - [@daviwil](http://twitter.com/daviwil)

## License

This project is currently being evaluated for an appropriate open-source license.
