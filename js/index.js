// Global variables
// Form
const itemToAdd = document.getElementById('item')
const itemPrice = document.getElementById('price')
const addItemButton = document.getElementById('button')

// Lists
const shoppingList = document.getElementById('shopping-list')
const purchasedList = document.getElementById('purchased-items-list')

// Items
let items = [
    {
        name: 'Lettuce',
        price: 0.4,
        hasBeenPurchased: false,
    },
    {
        name: 'tomatoes',
        price: 5,
        hasBeenPurchased: true
    }
]

// Render functions

const createButtons = () => {
    const actionButtons = document.createElement('div')
    actionButtons.classList.add('actions')

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    const deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fas', 'fa-trash-alt')
    deleteButton.appendChild(deleteIcon)

    deleteButton.addEventListener('click', deleteButtonClicked)

    const checkButton = document.createElement('button')
    checkButton.classList.add('check-button')
    const checkIcon = document.createElement('i')
    checkIcon.classList.add('fas', 'fa-check')
    checkButton.appendChild(checkIcon)

    checkButton.addEventListener('click', checkButtonClicked)

    actionButtons.appendChild(deleteButton)
    actionButtons.appendChild(checkButton)

    return actionButtons
}

const createListItem = (name, price, hasBeenPurchased) => {
    const listItem = document.createElement('li')
    listItem.classList.add('item-card')

    if(hasBeenPurchased) {
        listItem.classList.add('purchased')
    }

    const itemName = document.createElement('span')
    itemName.classList.add('item-name')
    itemName.innerText = name
    listItem.appendChild(itemName)

    const itemPrice = document.createElement('span')
    itemPrice.classList.add('item-price')
    itemPrice.innerText = '€' + price
    listItem.appendChild(itemPrice)

    const actionButtons = createButtons()
    listItem.appendChild(actionButtons)

    return listItem
}

// Event listeners
const deleteButtonClicked = (event) => {
    console.log(event.target.closest('.item-card'))
}

const checkButtonClicked = (event) => {
    console.log(event.target.closest('.item-card'))
}


const el = createListItem('tomato', '2.00', false)
console.log(el)
shoppingList.appendChild(el)