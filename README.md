# Zoosher Movie Store
## Description
Zoosher Movie Store is an online movie database where users can find a wide range of movies and TV shows, including ratings and recommendations. - _via ChatGPT_

## Links
- Frontend url: [Zoosher App](https://zoosher.thinkhub.hu/)

## Architecture 
- A dockerized **Node.js** app serves as a backend to query data from different endpoints, and publish it trough a **tRPC** api.
- A dockerized **Next.js** app serves as the frontend, using **MUI**, **tRPC** client and **SSR**.
- Most things are written in **TypeScript**.
- The project is hosted on a **VPS**.
- The deployment process uses **GitHub Actions** as the **CI/CD** pipeline runner.

## Disclamer 
This project is a demonstration of some skills and techniques. 
Some blocks of code are very far from production ready.
The application lacks error handling, tests and it's security is too lax in some cases.
Some config and misc script files are left as JS.
This will not scale well, especially the current deployment process.
