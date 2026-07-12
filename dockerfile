FROM mcr.microsoft.com/playwright:v1.61.1-noble
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# RUN npx playwright install
# CMD ["npx", "playwright", "test"]
ENV CI=true