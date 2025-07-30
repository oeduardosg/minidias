# Minidias

O projeto é um website onde o usuário é capaz de registrar seus dias gerando um diário da sua vida

## Diagrama de classes

## Ferramentas

Para a construção do código, as ferramentas utilizadas foram:
- git para o versionamento;
- npm e vite para build;
- vitest para os testes

## Frameworks

- Front-end: VueJS
- Back-end: PocketBase

## Gerar documentação do código

Para criar a documentação, é necessário a instalação do JSDoc.

```
npm install -g jsdoc
```

Em seguida, no diretório raiz, simplesmente execute:

```
npm run docs
```

A documentação será criada e pode ser acessada através do arquivo ```index.html``` dentro da pasta ```docs```

## Execução

1. **Abra o terminal e clone o repositório:**

```
git clone https://github.com/oeduardosg/minidias.git
```

2. **Navegue até o backend:**

```
cd minidias/backend
```

4. **Inicie o PocketBase:**

```
./pocketbase serve
```

5. **Abra outro terminal e siga para o frontend:**

```
cd minidias/frontend
```

6. **Instale as dependências:**

```
npm install
```

7. **Inicie a aplicação VueJS**

```
npm run dev
```

8. **Abra o navegador e acesse http://localhost:5173 para visualizar a apliclação**