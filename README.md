# TV Tonight

TV Tonigh is an application for browsing TV shows, built with Vue 3. Shows are fetched from the [TVmaze public API](https://www.tvmaze.com/api) and presented in a clear, dark-themed interface.

## Live demo

[tvtonight.netlify.app](https://tvtonight.netlify.app)

## Features

- Browse top-rated shows organised by genre (Drama, Comedy, Crime, Action, Science-Fiction)
- Clicking on a show card brings up a modal with detailed information (like summary, number of episodes, main cast)
- Recommended show ('Editor's Pick') in hero section (hardcoded)
- Search for any show by title
- Responsive layout for mobile and desktop

## Tech stack


- Vue 3 (Composition API) | Front-end framework
- Vite | Build tool and dev server
- Vitest | Unit testing
- Vue Test Utils | Component testing
- TVmaze API | Show data

## Architectural decisions

I chose Vue 3 because I'm familiar with the framework, because I like it ease of use and flexibility and (last but not least) because it's the framework the company uses.

It's a framework that works well for a data-driven application like this one. The show cards, genre carousels and detail modal receive their content as props and re-render automatically when the underlying data changes. Vue's reactivity system makes this a straightforward process.

## Getting started

**Prerequisites:** Node.js

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Run tests
npm run test:unit

# Build for production
npm run build
```

## Assignment requirements

There were a number of criteria for this project:

- Dashboard to display horizontal lists of TV shows based on genre and rating
- A show's details should be displayed when the user clicks on a TV show
- Ability to search for shows
- Application must be responsive and mobile friendly
- Simple yet eye-catching UI
- Include unit tests
