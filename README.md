# tiny-json-db

A lightweight zero dependency json database.

## Examples:

### Create an instance:

```js
const Database = require("tiny-json-db");
const db = new Database("database-folder");
```

### Set an item to a value:

```js
// string
await db.setItem("str", "hello, world");
// number
await db.setItem("pi", 3.14);
// object
await db.setItem("user", { name: "John Doe", email: "somebody@example.com" });
```

### Get an item's value:

```js
const str = await db.getItem("str");
```

### Delete an item:

```js
await db.deleteItem("pi");
```

### List all items:

```js
const items = await db.listItems();
```
