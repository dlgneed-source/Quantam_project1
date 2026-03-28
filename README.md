# Quantam Project 1

## Run frontend

```bash
npm install
npm run dev
```

## Run backend (AI API + Socket.IO + MongoDB)

```bash
cp .env.example .env
npm run dev:backend
```

Backend runs on `http://localhost:3001` by default.

### Environment variables

- `PORT` - backend port
- `MONGODB_URI` - MongoDB connection string
- `CORS_ORIGIN` - allowed frontend origin
- `AI_API_URL` - OpenAI-compatible endpoint
- `AI_API_KEY` - provider API key
- `AI_MODEL` - default model name
