# tg-next-strapi

This is a project build based on this tutorial with liberties taken where necessary. 

Installing Image Kit Plugin: 

`config/middlewares.ts`
``` ts
{
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "ik.imagekit.io", // Add ImageKit domain for images
            // Add your custom domain if you use one with ImageKit:
            // 'images.yourdomain.com',
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "ik.imagekit.io", // Add ImageKit domain for videos/audio
            // Add your custom domain if you use one:
            // 'media.yourdomain.com',
          ],
          "frame-src": [
            "'self'",
            "data:",
            "blob:",
            "eml.imagekit.io", // For ImageKit UI components
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
```