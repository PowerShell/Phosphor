# Phosphor

[![Build status](https://ci.appveyor.com/api/projects/status/isasumsw8epoar0n/branch/master?svg=true)](https://ci.appveyor.com/project/PowerShell/phosphor/branch/master)

Phosphor is PowerShell module designed for generating user interfaces from PowerShell
modules.

## Disclaimer

This project is to be considered a **proof-of-concept** and **not a supported Microsoft product**.

Also, certain things will not work correctly yet because this project was developed
in the lead-up to the PowerShell and DevOps Global Summit.  Things will improve
rapidly in the very near future.

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
- Enable UI integration hooks so that generated UI can be seamlessly integrated into existing
  crafted UI
- Provide script generation for operations exposed in the UI so that users can learn how to
  automate the tasks that they have performed
- Respect RBAC and JEA constraints so that UI can be generated for users that should not have
  full access to the target machine

These goals may be changed or clarified over time.  Please feel free to file issues if you have
further ideas or requirements for this project.

## Building and Using the Code

### Using the build script

1. Make sure [Node.js 6.10.2 with NPM](https://nodejs.org/en/) is installed and
   on your PATH

2. Install Invoke-Build using the PowerShell Gallery:

   ```powershell
   Install-Module InvokeBuild -Scope CurrentUser
   ```

3. Run the following command to build and run the module

   ```powershell
   Invoke-Build RunModule
   ```

4. You can build the module and UI without running it by
   running the following command:

   ```powershell
   Invoke-Build Build
   ```

### Building the project manually

These steps are not recommended, you should use the build script unless you
have a good reason to build manually.

1. Make sure [.NET SDK 1.0](https://www.microsoft.com/net/download/core) and
   [Node.js 6.10.2 with NPM](https://nodejs.org/en/) are installed and on your PATH

2. Restore the Phosphor module dependencies:

   ```
   dotnet restore ./src/Phosphor
   ```

3. Run the following commands to compile a "publish" build of the module:

   **On Windows**

   ```
   dotnet publish -f net451 .\src\Phosphor
   dotnet publish -f netstandard1.6 .\src\Phosphor
   ```

   **On Linux and macOS**

   ```
   dotnet publish -f netstandard1.6 ./src/Phosphor
   ```

4. Build the UI code by running the following commands:

   ```
   cd src/Phosphor.Client
   npm install
   npm run tsc
   ```

5. Start up a fresh instance of PowerShell for testing purposes as the module will need
   to be completely unloaded before you can compile the code again.

6. Import the module:

   ```powershell
   Import-Module ./src/Phosphor/Phosphor.psd1
   ```

7. Call the `Show-Module` command to start the module browser:

   ```powershell
   # Show all modules
   Show-Module

   # Show specific modules
   Show-Module -Module PowerShellGet, PackageManagement
   ```

## Maintainers

- [David Wilson](https://github.com/daviwil) - [@daviwil](http://twitter.com/daviwil)

## License

This project is [licensed under the MIT License](LICENSE.txt).  Please see the
[third-party notices](Third Party Notices.txt) file for details on the third-party
binaries that we include with releases of this project.
