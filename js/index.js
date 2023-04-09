// Global variables
// Form
const itemToAdd = document.getElementById('item')
const itemPrice = document.getElementById('price') 
const addItemButton = document.getElementById('add-button')

// Lists
const shoppingList = document.getElementById('shopping-list')
const purchasedList = document.getElementById('purchased-items-list')

// Items
let items = [
    {
        name: 'Lettuce',
        price: 0.4,
        hasBeenPurchased: false,
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
    itemPrice.innerText = '€ ' + price
    listItem.appendChild(itemPrice)

    const actionButtons = createButtons()
    listItem.appendChild(actionButtons)

    return listItem
}

const renderList = (containerNode, itemsToRender) => {
    containerNode.innerHTML = '' // reset content in the list to re-render

    itemsToRender.forEach(item => {
        const listItem = createListItem(item.name, item.price, item.hasBeenPurchased)
        containerNode.appendChild(listItem)
    })
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
        renderList(shoppingList, items)

        // Delete input text after clicking 'Add'
        itemToAdd.value = ''

        // Keep focus on input
        itemToAdd.focus()
    } else {
        console.error('Already existing or empty item')
    }
}

const deleteButtonClicked = (event) => {
    // Added a delete button that deletes the clicked element
    const clickedItem = event.target.closest('.item-card')
    const clickedItemName = clickedItem.querySelector('.item-name').innerText

    items = items.filter(item => item.name !== clickedItemName)

    // TODO: Check if we need to re-render the purchased list too if a bought item has been deleted
    renderList(shoppingList, items)
}

const checkButtonClicked = (event) => {
    console.log(event.target.closest('.item-card'))
}

// Register listeners
addItemButton.addEventListener('click', (event) => {
    addToList(event)
})

// Main
renderList(shoppingList, items)