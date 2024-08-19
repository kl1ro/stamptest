This is STAMP test task. It represents a fully functional REST API to manage an e-commerce application as well as the frontend part of the application. Here are the instructions on how to use it:

1. npm install
2. npm run build
3. Create a .env file with DATABASE_URL that points to your PostgreSQL database. I assume your db is empty, so you can run "npx prisma deploy" to prepare it. This will also generate the ts types for Prisma orm. You can also set the STATUS environment variable to "production" if you want Prisma to work more efficiently.
4. npm run start
5. Run some API requests with Postman (for example). You can find the UML diagram in the prisma/ folder.
6. Connect to localhost:3000 to see the frontend part.

The API represents a fully functional e-commerce application interface. Although it has a boilerplate security platform, the functional security system is achieved by integrating an auth system and implementing the business logic. While security is an important part of the e-commerce project, I omitted it due to the scope and focus of this test project, which primarily aims to detail the core functionalities and architectural design of the e-commerce system.