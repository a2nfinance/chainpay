# Request Payment (Invoicing Template)

A simple invoicing template for creating, paying, and viewing requests in Request Network.

Built with:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Request Network](https://request.network/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## Install

```
npm install
```

## Run

```
npm run start
```

## Develop

```
cp .env.example .env.local
npm run dev
```

## Deploy

We deploy to an [EasyPanel](https://easypanel.io/) server using Github Actions and [Heroku Buildpacks](https://devcenter.heroku.com/articles/buildpacks). You could easily deploy to Vercel, Netlify, or any other platform.

- [deploy-to-staging.yml](/.github/workflows/deploy-to-staging.yml) - Deploy to Staging on push to `main` branch.
- [deploy-to-production.yml](/.github/workflows/deploy-to-production.yml) - Deploy to Production on release published in Github.

## Environment Variables

Before deploying, ensure you have created a `.env` file in the root of your project. Below is a list of available environment variables. You can also take a look at the [.env.example](./.env.example) file for reference.

| Variable Name                         | Description                    | Required |
| ------------------------------------- | ------------------------------ | -------- |
| NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID | Your Wallet Connect Project ID | ✅       |
| NEXT_PUBLIC_SUPPORT_EMAIL             | Support email address          | ✅       |
| NEXT_PUBLIC_APP_URL                   | The application URL            | ✅       |
| NEXT_PUBLIC_RPC_URL_ETHEREUM          | RPC URL for Ethereum network   | ✅       |
| NEXT_PUBLIC_RPC_URL_POLYGON           | RPC URL for Polygon network    | ✅       |
| NEXT_PUBLIC_RPC_URL_SEPOLIA           | RPC URL for Sepolia network    | ✅       |
| QUICKBOOKS_CLIENT_ID                  | QuickBooks app client ID       | ✅       |
| QUICKBOOKS_SECRET_KEY                 | QuickBooks app secret key      | ✅       |
| QUICKBOOKS_ACCESS_TOKEN               | QuickBooks API access token    | ✅       |
| QUICKBOOKS_API_URL                    | QuickBooks API URL             | ✅       |
| QUICKBOOKS_ENVIRONMENT                | QuickBooks environment         | ✅       |
| QUICKBOOKS_REFRESH_TOKEN              | QuickBooks refresh token    | ✅       |
| NEXT_PUBLIC_USE_QUICKBOOKS            | Enable client list feature using QuickBooks API    | ✅       |
## Configuration

In your next.config.js file, ensure you have the following configuration:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
};

export default nextConfig;
```

#### Explanation

This configuration ensures that the Svelte web components render correctly. The swcMinify: false setting is crucial because Svelte web components and their rendering nature can sometimes conflict with aggressive minification processes. Disabling SWC minification helps prevent potential issues with web component rendering.
