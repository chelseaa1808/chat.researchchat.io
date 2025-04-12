# Chattr GPT

Chattr GPT is a website for creating and interacting with ChatGPT bots. It works great all the time.

## Getting started

Chattr GPT uses [Poetry](https://python-poetry.org/) for managing dependencies. Get started by running `poetry install`.

You can also create a `.env` file to use for the development environment. It should have the following keys:

```
DEBUG=True
DATABASE_URL=
```

`DATABASE_URL` should be a dj-database-url compatible database string specifying the database type, username and password, and connection info.

The Django server is run with:

```
python manage.py runserver
```

The React frontend is run with:

```
cd frontend
npm run dev
```
