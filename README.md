# Technical test of Useragents for VueJS/NuxtJS

## Requirement
 - Node >= 14
 - Yarn to install with npm

## Setup main folder for husky hook
```sh
yarn install
```

## Setup front end
- Add `.env` file
```sh
cd web; yarn install;yarn dev;
```

## Setup back end
```sh
cd api; yarn install;yarn start:dev
```
The api will listen to the port 3005. http://localhost:3005

## Instructions
The goal is to develop the `Task editor` application based on the mockup available on [figma](https://www.figma.com/file/Ohbo1HRfVvUzu8C2FJ62Ul/Test-UA---Dev?node-id=1225%3A31339)

The main features of the application:
 - List the tasks
 - Filter the tasks by status (All, Todo, Done)
 - Create a task
 - Delete a task
 - Edit a task

 A form task contain:
 - A required `title`
 - A required `decription`
 - A required `status`
 - An optional `date` (deadline)

The typescript model of a `Task` and `TaskStatus` is available here `api/src/task.entity.ts`
You can also check the `DTO` files: `api/src/create.dto.ts`, `api/src/update.dto.ts`

The tasks must be listed by ascending deadline `date`, then by order of creation `createdAt` if no deadline `date`.
You will have to perform this sorting at the API level in the function located here `api/src/app.service.ts`
It's still standard javascript so it should'nt change from our habits 😉.

The idea is also to see the git methodology with differents commits to see the logic behind. You must follow the commit-link standard explained [here](https://www.conventionalcommits.org/en/v1.0.0/)

PS: You will find more help on the index page of the nuxt application 😉

## Api routes exemples

### Create task

`POST /`

```sh
curl --location --request POST 'localhost:3005/' \
--header 'Content-Type: application/json' \
--header 'Cookie: i18n_redirected=fr' \
--data-raw '{
    "title": "lorem title",
    "description": "lorem ipsum",
    "date": "2022-01-10T16:19:54.733Z",
    "status": "DONE"
}'
```

### Update task

`PATCH /{id}`

```sh
curl --location --request PATCH 'localhost:3005/5aaaea37-824b-4a92-94e5-b8ee8bf24de1' \
--header 'Content-Type: application/json' \
--header 'Cookie: i18n_redirected=fr' \
--data-raw '{
    "title": "lorem title 2",
    "description": "lorem ipsum",
    "date": "2022-01-10T16:19:54.733Z",
    "status": "DONE"
}'
```

### Delete task

`DELETE /{id}`

```sh
curl --location --request DELETE 'localhost:3005/5aaaea37-824b-4a92-94e5-b8ee8bf24de1' \
--header 'Cookie: i18n_redirected=fr' \
```
