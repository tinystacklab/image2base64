# Image to Base64 Converter

A premium, fast, and secure client-side tool to convert images to Base64 strings.

## Features

- **Drag & Drop Upload**: Easily upload images from your computer.
- **Remote URL Support**: Fetch images directly from URLs (subject to CORS).
- **Instant Conversion**: Client-side processing for maximum speed and privacy.
- **Preview & Copy**: View the image and copy the Base64 string with one click.
- **Premium Design**: Modern dark mode aesthetic with glassmorphism effects.

## Tech Stack

- React
- Vite
- Vanilla CSS (Custom Design System)

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

## Deployment to Cloudflare Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy using Wrangler (if installed and authenticated):
   ```bash
   npx wrangler pages deploy dist
   ```

   Or connect your GitHub repository to Cloudflare Pages dashboard and set the build command to `npm run build` and output directory to `dist`.

## License

MIT License
