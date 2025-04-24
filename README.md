# 📚 NUTRIAPI

Uma API RESTful que disponibiliza os dados da Tabela Brasileira de Composição de Alimentos (TACO) em formato estruturado para integração em aplicações web, mobile e pesquisas científicas.

## 📌 Visão Geral

Transforma os dados originais da TACO (disponíveis apenas em PDF/Excel) em uma API moderna, permitindo:

✅ Busca programática por alimentos e nutrientes  
✅ Dados normalizados em JSON  
✅ Fácil integração com apps de nutrição, saúde e pesquisa

## 🚀 Como Usar

### Endpoints Principais

| Método | Endpoint                     | Descrição                          |
|--------|------------------------------|-----------------------------------|
| GET  | /food                     | Lista todos os alimentos (com paginação) |
| GET  | /food/:id                 | Busca alimento por ID             |
| GET  | /food/search?q={nome}     | Busca por nome (ex: `?q=arroz`)   |

### Exemplos de Requisições

1. **Listar alimentos (paginação):**
   ```bash
   GET /food?offset=0&limit=10
    ```

2. **Buscar alimento específico:**
   ```bash
   GET /food/25
    ```

3. **Buscar por nome:**
   ```bash
    GET /food/search?q=maçã
   ```

### 🛠️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/guillxr/nutriapi.git  
    ```

2. **Instale as dependências:**
   ```bash
   npm install  
    ```

3. **Inicie o servidor:**
   ```bash
   npm run dev
    ```

## 📊 Estrutura dos Dados

**Cada alimento retorna:**

```json
{
  "id": 1,
  "name": "Maçã",
  "calories": 52,
  "carbohydrates": 14,
  "proteins": 0.3,
  "fats": 0.2,
  "fiber": 2.4,
}
```

## 📜 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 📞 Contato

**Seu Nome**  
- LinkedIn: [devgustavo-io](https://www.linkedin.com/in/devgustavo-io/)  
- Email: [devgustavo.io@gmail.com](mailto:devgustavo.io@gmail.com)  

✨ **Dúvidas?** Abra uma [issue](https://github.com/guillxr/nutriapi/issues) no GitHub!

---

## ⚡ Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

**Nota:** Os dados utilizados são provenientes do projeto [TACO/UNICAMP](https://nepa.unicamp.br/categoria/taco/). Consulte a fonte original para informações completas.
