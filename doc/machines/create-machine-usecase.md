# Create Machine UseCase

## Requisitos

- Deve estar autenticado na aplicação (rota protegida pelo gateway).

## Objetivo

- Deve criar uma nova máquina.

#

## Parâmetros Obrigatórios

- Categoria em que a máquina se enquadra (trator, colheitadeira, pulverizador) (`categoryId`).
- Modelo específico de cada máquina (Puma-230, Steiger-620) (`model`).
- Marca da máquina (New Holland, Case, John Deere) (`brand`).
- Horas de uso da máquina (`hours`).
- Ano de fabricação da máquina (`year`).
- Descrição da máquina (`description`).
- Responsável pela máquina (`responsibleSalesPersonId`).
- Imagens da máquina (`imagesId`).

### Exemplo

#

```typescript
body: {
  categoryId: '626e4acf15a9e728eab534d5',
  model: 'Puma-230',
  brand: 'Case',
  hours: 100,
  year: 2020,
  description: 'any_description',
  responsibleSalesPersonId: '626e4acf15a9e728eab534d5',
  imagesId: '626e4acf15a9e728eab534d5'
};

```

#

## Rotas

- **POST**

/api/create/machine

#

## Retorno

- `201`

#

## Exceções

- **`400`** `InvalidParamError`
- **`400`** `MissingParamError`
- **`401`** `UnauthorizedError`
- **`404`** `NotFoundError`
- **`500`** `ServerError`
