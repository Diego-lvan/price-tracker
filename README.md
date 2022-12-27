# Table of contents

- [Intro](#intro)
- [Development Setup](#requirements)
- [Examples](#examples)

## Intro <a name="intro"></a>

With this app you can track prices of multiple products (currently only works with Amazon products). It has the option of visualize the price over time.
You will receive an email when the price of a product you have added changes.

## Development Setup with Docker <a name="requirements"></a>
### First, clone the repository with git 
```bash 
git clone https://github.com/Diego-lvan/price-tracker.git
cd price-tracker
```
### Add environment variables
Create a .env file in ./backend with the next variables (you can change values if you want)
```bash
MYSQL_ROOT_PASSWORD=password
ACCESS_TOKEN_SECRET=yoursecret
DB_NAME=app_database
```
### Run Docker container
```bash
docker compose --env-file ./backend/.env up
```
Frontend should be running on [localhost:3000 ](http://localhost:3000)
## Examples <a name="examples"></a>

### Chart

![chart example](https://github.com/Diego-lvan/price-tracker/blob/master/example/chart.jpg)

### Email when a product's price changes
![email example](https://github.com/Diego-lvan/price-tracker/blob/master/example/email.jpg)
