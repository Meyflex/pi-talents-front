FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN bun install

COPY . .

RUN bun run build

EXPOSE 5173

CMD [ "bun", "run", "preview" ]