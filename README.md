# lvl protocol website

Generated from the 2C Vercel Client Boilerplate

![Architecture Diagram](/docs/architecture.png)

## Setup

### Development Environment

To use Vercel Next.js, you need the following tools:

- Node.js - [Install Node.js 14](https://nodejs.org/en/), including the npm package management tool. [NVM](https://github.com/nvm-sh/nvm) is recommended.

1. Clone the repo and change directory
   ```
   git clone git@github.com:twos-complement/level-protocol-website.git && cd level-protocol-website.git
   ```
2. Use nvm to use the correct version of node
   ```
   nvm use
   ```
3. Install node modules. Your package-lock.json should not change, if it did you are probably not using the correct node version. (See step 2)
   ```
   npm install
   ```
4. Use development environment variables
   ```
   cp .env.development .env && source .env
   ```
5. Run the Next.js app locally
   ```
   npm run dev
   ```
6. You should see the website running locally at: http://localhost:8080

### Storybook

Install storybook `npm install storybook -g`, then `npm run storybook` to start storybook.

### CI/CD

Vercel deployment setup:

1. [Import git repository on Vercel](https://vercel.com/import/git)
2. Configure any ENV vars for production/preview apps (in web console or using vercel cli)
3. Configure domain for production (set CNAME record to `cname.vercel-dns.com`, and confirm in Vercel console)
4. Configure [integrations](https://vercel.com/integrations), like Slack for notifications

Commits pushed to any branch will automatically build and deploy a `preview` app on Vercel (including PR bot posts).
Commits pushed to `main` branch will automatically build and deploy the `production` app on Vercel.

### Environment Variables

Local development: set values in .env

| Name                    | Default | Description                                          |
| ----------------------- | ------- | ---------------------------------------------------- |
| CHROMATIC_PROJECT_TOKEN | ``      | Token for Chromatic builds.                          |
| WEB3STORAGE_TOKEN       | ``      | Token for web3 storage to store community IPFS data. |
| FAUNADB_SECRET          | ``      | Fauna key for storing community configurations.      |
| RINKEBY_RPC_PATH        | ``      | Alchemy or RPC path.                                 |
| MAINNET_RPC_PATH        | ``      | Alchemy or RPC path.                                 |
| SOURCECRED_URL          | ``      | Sourecred node url                                   |

#### System Environment Variables

Vercel can add [system environment variables](https://vercel.com/docs/build-step#system-environment-variables). Add `VERCEL_GITHUB_COMMIT_SHA` (at minimum for the /api/version endpoint) and leave the value blank, and Vercel will populate these values.

## Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Database

Create a database in FaunaDB following this guide
https://docs.fauna.com/fauna/current/learn/quick_start/gql_quick_start

and then go to the graphql option in the left manu and import the schema file from

`schemas/schema.gql`

Create a secret in the security option for the database and make sure you're using the right url
