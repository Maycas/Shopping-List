// Global variables
// Form
const itemToAdd = document.getElementById('item')
const itemPrice = document.getElementById('price') 
const addItemButton = document.getElementById('add-button')

// Lists
const shoppingList = document.getElementById('shopping-list')
const purchasedList = document.getElementById('purchased-items-list')

// Price
const priceTag = document.getElementById('price-tag')
priceTag.innerText = '0.00'

// Items
let items = []

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

const createListItem = (name, price, hasBeenPurchased = false) => {
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
    itemPrice.innerText = '€ ' + price
    listItem.appendChild(itemPrice)

    const actionButtons = createButtons()
    listItem.appendChild(actionButtons)

    return listItem
}

const renderShoppingList = () => {
    shoppingList.innerHTML = '' // reset content in the list to re-render

    items.forEach(item => {
        const listItem = createListItem(item.name, item.price, item.hasBeenPurchased)
        shoppingList.appendChild(listItem)
    })
}

const renderPurchasedList = () => {
    purchasedList.innerHTML = ''

    const purchasedItems = items.filter(item => item.hasBeenPurchased)
    const totalPrice = purchasedItems.reduce((accumulator, currentItem) => {
        return accumulator + parseFloat(currentItem.price)
    }, 0)

    // Update the price to show the addition of all purchased items
    purchasedItems.forEach(item => {
        const listItem = createListItem(item.name, item.price)
        purchasedList.appendChild(listItem)
    })

    priceTag.innerText = totalPrice.toFixed(2)
}

// Helper functions
const doesElementExist = (name) => {
    // Avoid the possibility to add an element already in the list
    return items.filter(item => item.name.toLowerCase() === name.toLowerCase()).length > 0
}


// Event listeners
const addToList = (event) => {
    // Adding elements to the list after writing them in the input
    event.preventDefault()

    const name = itemToAdd.value
    let price = itemPrice.value

    const nameIsValid = (name.length !== 0) && !doesElementExist(name)

    if(nameIsValid) {
        // Price is not mandatory, if not filled in use 0.00
        if (price === '') {
            price = 0.00
        }

        const newItem = {
            name: name,
            price: parseFloat(price).toFixed(2),
            hasBeenPurchased: false,
        }

        items.push(newItem)
        renderShoppingList(shoppingList, items)

        // Delete input text after clicking 'Add'
        itemToAdd.value = ''

        // Keep focus on input
        itemToAdd.focus()
    } else {
        alert(`Item ${name} already exists or you entered an empty item`)
        console.error(`Item '${name}' already exists or you entered an empty item`)
    }
}

const deleteButtonClicked = (event) => {
    // Added a delete button that deletes the clicked element
    const clickedItem = event.target.closest('.item-card')
    const clickedItemName = clickedItem.querySelector('.item-name').innerText

    items = items.filter(item => item.name !== clickedItemName)

    renderShoppingList()
    renderPurchasedList()
}

const checkButtonClicked = (event) => {
    // Check or uncheck an element as purchased
    const clickedItem = event.target.closest('.item-card')
    const clickedItemName = clickedItem.querySelector('.item-name').innerText

    itemIdx = items.indexOf(items.find(item => item.name === clickedItemName))

    // Swap current value with new opposite
    items[itemIdx]['hasBeenPurchased'] = !items[itemIdx]['hasBeenPurchased']

    renderShoppingList()  
    renderPurchasedList()
}

// Register listeners
addItemButton.addEventListener('click', (event) => {
    addToList(event)
})