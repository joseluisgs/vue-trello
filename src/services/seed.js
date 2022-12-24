// Configuración del tablero
export const board = {
  name: 'Test board',
  id: '3123123123123123',
  backgroundColor: '#FFFFFF',
}

// Columnas del tablero
export const columns = [
  {
    name: 'Todo Do items',
    id: '4234234',
    board: '3123123123123123',
    order: 0,
  },
  {
    name: 'Doing items',
    id: '899877889789',
    board: '3123123123123123',
    order: 1,
  },
]

// Tarjetas del tablero
export const cards = [
  {
    name: 'Learn Vue Testing ;)',
    description: 'All about testing Vue components with ease',
    id: '12312376686877887',
    board: '3123123123123123',
    column: '4234234',
    date: '1619279103333',
    done: false,
    order: 0,
  },
  {
    name: 'Learn Testing Patterns',
    description: 'All about testing Vue components with ease',
    id: '23123123',
    board: '3123123123123123',
    column: '4234234',
    date: '1619279103333',
    done: false,
    order: 1,
  },
  {
    name: 'Finish the Vue 3 course',
    description: "Before it's too late",
    id: '5345345',
    board: '3123123123123123',
    column: '899877889789',
    date: '1619279103333',
    done: false,
    order: 0,
  },
  {
    name: 'Push harder',
    description: 'No matter what',
    id: '90907987798',
    board: '3123123123123123',
    column: '899877889789',
    date: '1619279103333',
    done: false,
    order: 1,
  },
]

// Usuario
export const user = {
  name: 'José Luis González',
  uid: '3123123123123123',
  email: 'joseluis.gonzalez@iesluisvives.es',
  avatar: 'https://avatars.githubusercontent.com/u/47913953?v=4',
}
