FROM node:18

WORKDIR /home/API-foro

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && npx nodemon app.js"]
