# Deployment to GitHub Pages

This project is configured for deployment to GitHub Pages. Here's what you need to know:

## Configuration

The project has been configured with:

1. **Base Path**: The `vite.config.ts` file includes `base: "/namasivaayam-folio/"` to match the GitHub Pages repository URL structure.

2. **Client-Side Routing**: The `public/404.html` file handles client-side routing by redirecting unknown routes back to the main application, allowing React Router to handle the routing.

3. **Automatic Deployment**: A GitHub Actions workflow is set up to automatically deploy the site when changes are pushed to the `main` branch.

## How to Deploy

### Automatic Deployment (Recommended)
1. Push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. The GitHub Actions workflow will automatically:
   - Install dependencies
   - Build the project
   - Deploy the built files to the `gh-pages` branch

3. Your site will be available at: `https://namasivaayam-l.github.io/namasivaayam-folio/`

### Manual Deployment
If you prefer to deploy manually, you can run:
```bash
npm run build
```

Then commit and push the generated `dist` folder to your `gh-pages` branch.

## GitHub Pages Settings

To complete the setup, you need to configure GitHub Pages in your repository settings:

1. Go to your repository on GitHub
2. Click on the "Settings" tab
3. In the left sidebar, click on "Pages"
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" as the branch and "/ (root)" as the folder
6. Click "Save"

## Important Notes

- The site uses client-side routing, which is handled by the 404.html fallback
- All static assets are referenced with the correct base path
- The build process creates a production-optimized version of the application
- The site will be automatically rebuilt and deployed whenever you push to main

## Troubleshooting

If your site isn't loading correctly:
1. Check that the GitHub Pages source is set to the `gh-pages` branch
2. Verify that the URL includes the correct repository name
3. Ensure all internal links use the proper base path
4. Check the browser console for any errors related to asset loading
