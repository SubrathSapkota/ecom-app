{
    "version": 3,
  
    "builds": [
      {
        "src": "admin/package.json",
        "use": "@vercel/static-build",
        "config": {
          "distDir": "dist"
        }
      },
      {
        "src": "backend/api/index.js",
        "use": "@vercel/node"
      }
    ],
  
    "routes": [
      {
        "src": "^/app/(.*)",
        "dest": "/backend/api/index.js"
      },
      {
        "src": "^/api/inngest",
        "dest": "/backend/api/index.js"
      },
      {
        "src": "/(.*)",
        "dest": "/admin/dist/index.html"
      }
    ]
  }
  