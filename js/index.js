const addItemButton = document.getElementById('button')
const input = document.getElementById('input')
const list = document.getElementById('list')

const createDeleteButton = () => {
    const button = document.createElement('button')
    button.textContent = 'Delete'
    button.addEventListener('click', removeItem)
    return button
}

const removeItem = (event) => {
    event.target.parentNode.remove()
}

const createListElement = () => {
    const item = document.createElement('li')
    const deleteButton = createDeleteButton()
    
    item.textContent = input.value

    // Add an item to the list so we can delete the item
    item.append(deleteButton)
    
    return item
}


// Add items to the list
const addItem = () => {
    // Add an item to the list
    item = createListElement()
    list.appendChild(item)

    // Keep focus on the input after adding an element
    input.focus()
    // Remove the text in the input after adding element
    input.value = ''
}


// Event Listeners
addItemButton.addEventListener('click', addItem)
input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        addItem()
    }
})

/*

Evitar que se pueda añadir un elemento que ya está en la lista

Añadir un botón a cada elemento para marcarlo como "comprado" o similar, y que al activarlo cambie una clase del nodo en cuestión y con css se ponga de otro color o lo que se os ocurra

Añadir una lista a la derecha donde aparezcan esos elementos marcados como comprados, pero que también sigan apareciendo en la lista original solo que tachados o lo que con CSS se os haya ocurrido para identificarlos

Añadir un precio a cada elemento, aparte de su propio nombre, de tal manera que la lista refleje los elementos con nombre y precio, y que al marcarlos como comprados vaya actualizando la lista de la derecha con una especie de "total gastado"
*/