## Server: Postgres & pgAdmin  
1. Create terminal  
$ cd postgres  

2. Run command  
$ docker-compose up -d  

## pgAdmin  
1. Open http://localhost:5555  
email: sample@email.com  
password: password  

2. Parameter  
Tools > create > server  

3. General tag  
name: localhost  

4. Connexion tag  
hostname: postgres  
port: 5432  
database: graphql  
username (admin): root  
password (admin): password  

## Server: Redis  
1. Create terminal  
$ cd redis  

2. Run command  
$ docker-compose up -d  

## redis commander  
1. Open http://localhost:5555  
username: admin  
password: password  

## Server: GraphQL (with TypeORM)  
1. Create terminal  
$ cd graphql  

2. Run command  
$ yarn  

3. Start server  
$ yarn start  

4. Open http://localhost:4000/graphql  

## graphql: tests  
1. Create database (pgAdmin)  
create > database  
database: graphql-test  

2. Create terminal  
$ cd graphql  

3. Run test  
$ yarn test  
