# Server-first Web Components with DSD, HTMX, and Islands

A demo leveraging common server rendering approaches to enable rendering web components on the server, rather than on the client. This approach enables encapsulating HTML and CSS for each view, declaratively applying common behaviors to views via HTMX, and leveraging browser standards to add custom JavaScript islands as needed to any part of the UI.

To learn more about Web Components, please consider purchasing [my Web Component Engineering course](https://bluespire.com/p/web-component-engineering). 13 modules, 170+ videos, and an interactive learning app guide you through DOM APIs, Web Components, modular CSS, accessibility, forms, design systems, tools, and more. Purchasing the course helps support my writing, web standards work, and open source.

For group discounts, please reach out to sales@bluespire.com.

## Machine Setup

1. [Download and install Node.js LTS v20.16.0](https://nodejs.org/en/download/package-manager) or higher.

## Repo Setup

1. On the command line, execute `npm i` to install dependencies.

## Running the App

1. On the command line, execute `npm run server` to run the web server.
2. Visit http://localhost:3000/ in a browser to view the app.

## Dependencies

### Server

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Handlebars](https://handlebarsjs.com/) and [Express Handlebars](https://www.npmjs.com/package/express-handlebars)

> [!IMPORTANT]
> While this demo uses Node.js, Express, and Handlebars, nearly every major web server/framework today supports the concepts of views, partials, helpers, and request/execution context, that are used to make this approach to web development possible. As a result, pretty much everything shown here should translate in a straightforward way to other platforms like .NET, Ruby, Java, etc.

### Client

* W3C Standard [Web Components](https://bluespire.com/p/web-component-engineering)
* [HTMX](https://htmx.org/)

### Data

The data used in this demo was adapted from [SWAPI](https://swapi.dev/).