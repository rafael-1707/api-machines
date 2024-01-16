# Get Machine By Id UseCase

## Requisitos

- Está rota é pública.

## Objetivo

- Deve retornar uma máquina.

#

## Parâmetros Obrigatórios

- ID da máquina (`Id`).

### Exemplo

#

```typescript
params: {
  Id: '626e4acf15a9e728eab534d5',
};

```

#

## Rotas

- **GET**

/api/public/get/machine/:id

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

- **`400`** `MissingParamError`
- **`404`** `NotFoundError`
- **`500`** `ServerError`
