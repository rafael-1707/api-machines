# Delete Machine By Id UseCase

## Requisitos

- Deve estar autenticado na aplicação (rota protegida pelo gateway).

## Objetivo

- Deve deletar uma máquina.

#

## Parâmetros Obrigatórios

- Id da máquina (`Id`).

### Exemplo

#

```typescript
params: {
  id: '626e4acf15a9e728eab534d5';
}
```

#

## Rotas

- **DELETE**

/api/delete/machine/:id

#

## Retorno

- `204`

#

## Exceções

- **`400`** `MissingParamError`
- **`401`** `UnauthorizedError`
- **`404`** `NotFoundError`
- **`500`** `ServerError`
