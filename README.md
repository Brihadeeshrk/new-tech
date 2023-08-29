# repo for dumping files for when i learn new concepts/tech

## PlanetScale + Next13 + Prisma

- a contact form's data is being pushed to the mysql db at planetscale
- prisma is being used to connect the frontend and planetscale
- prisma client is generated and once this is done, start the db instance locally by using

```bash
pscale connect db-name main --port 3309
```

for the above command to work, the planetscale CLI has to be installed.

- model called Inquiry is created and it is being pushed to the db using

```bash
npx prisma db push
```

- check if that model has been pushed to the mysql db using

```bash
pscale shell db-name main
describe Inquiry;
```

- once this is done, promote this branch to prod using

```bash
pscale branch promote db-name main
```

- then go to src/api and then create a new .ts file and write the logic to create a query over there. but before that, you need to initialise your PrismaClient using npx prisma generate
- once the query has been written out, connect the front end and test it out
- to check for the data submitted locally, you can run

```bash
npx prisma studio
```

- then, in planetscale, click on connect next to your db instance and click on Prisma in the dropdown menu, you'll get the new DATABASE_URL from there. paste that and then its done
