/**
 * Vite plugin to inject environment variables into widget.js
 * This allows widget.js to use API_BASE from .env file
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function widgetEnvPlugin() {
  let env = {};
  
  return {
    name: 'widget-env-plugin',
    configResolved(config) {
      // Load environment variables
      env = loadEnv(config.mode, process.cwd(), '');
    },
    configureServer(server) {
      // During dev, intercept widget.js requests and inject env vars
      server.middlewares.use('/widget.js', (req, res, next) => {
        const widgetPath = path.resolve(process.cwd(), 'public/widget.js');
        
        if (fs.existsSync(widgetPath)) {
          let widgetContent = fs.readFileSync(widgetPath, 'utf-8');
          
          // Get API_BASE from environment variable
          const apiBase = env.VITE_API_BASE_URL || 
                         process.env.VITE_API_BASE_URL || 
                         'http://localhost:8000';
          
          // Replace the placeholder with the actual API base URL
          widgetContent = widgetContent.replace(
            /__VITE_API_BASE_URL__/g,
            apiBase
          );
          
          res.setHeader('Content-Type', 'application/javascript');
          res.end(widgetContent);
        } else {
          next();
        }
      });
    },
    buildStart() {
      // During build, we'll handle this in generateBundle
    },
    generateBundle(options, bundle) {
      // Ensure widget.js in dist has the replaced value
      const widgetPath = path.resolve(process.cwd(), 'public/widget.js');
      
      if (fs.existsSync(widgetPath)) {
        let widgetContent = fs.readFileSync(widgetPath, 'utf-8');
        
        // Get API_BASE from environment variable
        const apiBase = env.VITE_API_BASE_URL || 
                       process.env.VITE_API_BASE_URL || 
                       'http://localhost:8000';
        
        // Replace the placeholder with the actual API base URL
        widgetContent = widgetContent.replace(
          /__VITE_API_BASE_URL__/g,
          apiBase
        );
        
        // Write to dist directory
        const distWidgetPath = path.resolve(process.cwd(), 'dist/widget.js');
        const distDir = path.dirname(distWidgetPath);
        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir, { recursive: true });
        }
        fs.writeFileSync(distWidgetPath, widgetContent, 'utf-8');
      }
    }
  };
}
