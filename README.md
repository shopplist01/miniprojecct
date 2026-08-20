# ESUTICT COURSE SHOPPING LIST PROJECT

A simple, responsive shopping list application built with HTML, CSS, and vanilla JavaScript. It helps users prepare for shopping by adding items with quantities, marking items as purchased, searching the list, and editing item names directly.

## Features

- Add a shopping item and quantity.
- Mark items as purchased with the checkbox control.
- Edit an item's name by clicking its text.
- Remove items from the list.
- Search items by name as you type.
- Display the total number of items.
- Save the list automatically in the browser using `localStorage`.
- Work offline without a server or external dependencies.

## Project Structure

```text
miniprojecct/
|-- index.html   # Application layout
|-- script.js    # List state and interaction logic
|-- style.css    # Application styling and responsive layout
|-- README.md    # Project documentation
```


## How to Use

1. Enter an item name, such as `Tomatoes`.
2. Enter the quantity and select the `+` button.
3. Select the checkbox when the item has been purchased.
4. Click an item's name to edit it, then press `Enter` or click elsewhere to finish.
5. Use the search field to find items in a large list.
6. Select `Delete` to remove an item.

## Data Storage

The shopping list is stored locally in the browser under the `shoppingList` key. Data remains available on the same device and browser until the browser's site data is cleared.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Browser `localStorage` API

## License

This project is intended for educational use as part of the ESUTICT course.
