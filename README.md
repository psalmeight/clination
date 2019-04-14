# CLINation API

## Installation

- Clone and perform Composer Install

```sh
git clone https://github.com/acelumaad/clination.git
cd clination

composer install
```

- Create a PostgreSQL database and name it "<db_name>"
- Edit .env file located on your project folder and update the database credentials

```sh
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=<db_name>
DB_USERNAME=<pgsql_user>
DB_PASSWORD=<pgsql_password>
```

- Execute Database migration

```sh
php artisan migrate
```

- Generate Application Key

```sh
php artisan key:generate
```

- Initialize Passport

```sh
php artisan passport:install
```

- Run Server

```sh
php artisan serve
```

- Run Server on specific port and/or host

```sh
php artisan serve --port=<port_number> --host=http://<ip_address>
```

## Laravel Framework License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
