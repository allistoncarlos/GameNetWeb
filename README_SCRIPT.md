# Script de Configuração GameNetWeb

Este script automatiza todo o processo de configuração e modificação do projeto GameNetWeb que foi realizado pelo Manus AI.

## O que o script faz:

### 1. Configuração do Git
- Atualiza o sistema e instala o Git
- Configura usuário e email globalmente

### 2. Clonagem do Repositório
- Clona o repositório GameNetWeb do GitHub
- Faz checkout para a branch `developer-manus`

### 3. Instalação do GitHub CLI
- Instala o GitHub CLI (gh)
- Configura repositórios e chaves

### 4. Modificação do Código
- Altera o texto "Usuário Manus" para "Usuário" no arquivo `LoginPage.jsx`

### 5. Commit e Push
- Adiciona as alterações ao staging
- Faz commit com mensagem descritiva
- Envia as alterações para o repositório remoto

## Como usar:

### Execução completa:
```bash
./setup_and_modify_gamenetweb.sh
```

### Autenticação GitHub CLI (manual):
Após executar o script, você precisará autenticar manualmente:

```bash
# Substitua pelo seu token
echo 'SEU_PERSONAL_ACCESS_TOKEN' | gh auth login --with-token
gh auth setup-git
```

### Exemplo com token usado:
```bash
echo 'SEU_PERSONAL_ACCESS_TOKEN' | gh auth login --with-token
gh auth setup-git
```

## Pré-requisitos:
- Sistema Ubuntu/Debian
- Acesso sudo
- Conexão com internet
- Personal Access Token do GitHub

## Arquivos modificados:
- `src/components/LoginPage.jsx` - Alteração do label de usuário

## Resultado final:
- Projeto clonado e configurado
- Autenticação GitHub configurada
- Alteração commitada e enviada para branch `developer-manus`

---
*Script gerado automaticamente pelo Manus AI*

