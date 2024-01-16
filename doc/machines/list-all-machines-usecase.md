# List All Machines UseCase

## Requisitos

- Está rota é pública.

## Objetivo

- Deve listar todas as máquinas.

#

## Rotas

- **GET**

/api/public/list/machines

#

## Retorno

- `200`

```typescript
body: [
  {
    categoryId: '626e4acf15a9e728eab534d5',
    model: 'Puma-230',
    brand: 'Case',
    hours: 100,
    year: 2020,
    description: 'any_description',
    responsibleSalesPersonId: '626e4acf15a9e728eab534d5',
    imagesId: '626e4acf15a9e728eab534d5',
  },
];
```

#

## Exceções

- **`500`** `ServerError`
