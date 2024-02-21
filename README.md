
![Logo](https://raw.githubusercontent.com/arthcc/dental-dash/master/assets/placeholder.png)


# Dental Dash


O DentalDash é uma plataforma abrangente de gestão para consultórios odontológicos, projetada para oferecer uma gama diversificada de funcionalidades essenciais. Desde o agendamento de consultas até o acompanhamento pós-tratamento, este ERP (Enterprise Resource Planning) foi desenvolvido para otimizar todos os aspectos do gerenciamento de uma clínica odontológica.

O projeto está em construção e seu progesso será atualizado neste repositório. 

## Stack utilizada


**Back-end:** Nest Js, TypeScript

**DataBase:** PostgreSql com Docker



## Documentação da API


#### Retorna os dados do Usuário do sistema:

```http
GET auth/me
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Seu email de cadastro |
| `password` | `string` | **Obrigatório**. Sua senha de cadastro |
| `token` | `jwt` | **Obrigatório**. Token gerado ao logar |


#### Cria um usuário com permissão comum

```http
POST /auth/signup 
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do usuário |
| `email`      | `string` | **Obrigatório**. O email do usuário |
| `password`      | `string` | **Obrigatório**. A senha do usuário |
| `passwordConfirmation`      | `string` | **Obrigatório**.Confirmação de senha do usuário |

#### Cria um usuário com permissão de admininstrador
```http
 POST /users
 ```

 | Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do usuário |
| `email`      | `string` | **Obrigatório**. O email do usuário |
| `password`      | `string` | **Obrigatório**. A senha do usuário |
| `passwordConfirmation`      | `string` | **Obrigatório**.Confirmação de senha do usuário |

#### Deletar um usuário 
```http
DELETE /users/{id}
```


| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `uuid` | **Obrigatório**. Id do usuário a ser deletado|

#### Realizar login e retornar token
```http
POST /auth/signin 
```


| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. O email do usuário |
| `password`      | `string` | **Obrigatório**. A senha do usuário |