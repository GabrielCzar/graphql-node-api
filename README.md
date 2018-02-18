# GraphQL NodeJs Api

<details><summary> #### Docker </summary>

##### Create Docker instance of Mysql

```docker run --name graphqldb -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql:latest```

##### Execute Docker Mysql

```docker exec -it graphqldb mysql -u root -p```

##### Create Database

```create database database_development;```

</details>

#### Execute Dev Configurations

```npm run gulp```

#### Execute Dev Server

```npm run dev```
