# Projeto API Biblioteca

Projeto de API desenvolvido pela disciplina de Backend

## Funcionalidades

- Autenticação JWT: Autenticação segura usando JSON Web Tokens.
- Criptografia de Senhas: Utilização do bcrypt para armazenar senhas de forma segura.
- Validação de Dados: Validação de entrada de dados com express-validator.
- Cadastro de usuários.
- Cadastro de Categorias
- Cadastro de Autores
- Cadastro de Livros
- Recomendações de livros para o usuário.

## Instalação

- 1 Clone o repositório

```
  git clone https://github.com/DiegoOtani/SecurityApi.git
```

- 2 Entre no projeto

```
  cd apifinal
```

- 3 Instale as dependências:

```
  npm install
```
- 4 Crie as variáveis de ambiente:

  Crie um arquivo .env na raiz do projeto igual o .env.sample e adicione as seguintes variáveis:

```
  MONGO_URI=mongodb://localhost:27017/apifinal
  JWT_SECRET=sua_chave_secreta

```

- 5 Para iniciar o servidor em produção:

```
  npm start
```

- Para iniciar em desenvolvimento:

```
  npm run dev
```

- Para gerar a documentação do swagger:

```
  npm run generate-docs
```

## Author

- Diego Otani