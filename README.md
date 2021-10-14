# ABB task

![logo](./public/abb-logo.png)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/sozonome/nextarter-chakra) 

This is a `Next.js` project bootstrapped with `create-next-app`, added with `Primereact UI` and `TypeScript` setup. 

To start, run the development server: Open [http://localhost:3000](http://localhost:3000)

```bash
yarn dev
```

# The challenge:

Create editable table component (Datasheet) using React from scratch (not using any external module such as react-data-grid, react-datasheet and etc.)

## Requirements:

Assume that we have a list of employees with the following attributes:

- ID
- Name
- Surname
- Date of birth
- Position
- Phone number

As a user I want:

- to view all employees in one table
- to edit desired cells (inline editing)
- to mark any row as deleted
- to undo delete operation
- to get the list of updated employees
  We should assume the employee updated, if any attribute is different from the initial value.

  If the value of any cell has been changed, but then returned to the previous value, we shouldn’t assume this employee as updated.

- to get the list of employees marked as deleted
  If the employee has been updated and then marked as deleted, we should remain this employee only in the deleted list.
- to reset data (return all changes to the initial state)

We can have a “Submit button” and view the JSON data as below on button click:

```json
{
	updated: […],
	deleted: […]
}
```

### It is nice to have:

- Search functionality
- Some basic validations (date, phone number validation etc.)
- SSR support
- Pagination
