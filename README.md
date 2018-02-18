# GraphQL NodeJs Api

<details><summary><strong>
Mysql Container Configurations
</strong></summary>

##### Create Docker instance of Mysql

```docker run --name graphqldb -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql:latest```

##### Execute Docker Mysql

```docker exec -it graphqldb mysql -u root -p```

##### Create Database

```create database database_development;```

</details>

<details><summary><strong>
Compile Configurations
</strong></summary>

```npm run gulp```
</details>

<details><summary><strong>
Execute Development Server
</strong></summary>

```npm run dev```
</details>
