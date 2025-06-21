#!/bin/bash

# Script completo para configurar e modificar o projeto GameNetWeb
# Este script replica todas as ações realizadas pelo Manus AI

echo "=== Script de Configuração e Modificação GameNetWeb ==="
echo "Iniciando processo completo..."

# ========================================
# PARTE 1: CONFIGURAÇÃO INICIAL DO GIT
# ========================================
echo ""
echo "=== PARTE 1: Configuração do Git ==="
echo "Atualizando sistema e instalando Git..."
sudo apt update
sudo apt install -y git

echo "Configurando Git..."
git config --global user.name "Manus AI"
git config --global user.email "alliston@outlook.com"

# ========================================
# PARTE 2: CLONAGEM DO REPOSITÓRIO
# ========================================
echo ""
echo "=== PARTE 2: Clonagem do Repositório ==="
echo "Clonando repositório GameNetWeb..."
git clone https://github.com/allistoncarlos/GameNetWeb.git

echo "Entrando no diretório e fazendo checkout para branch developer-manus..."
cd GameNetWeb
git checkout developer-manus

# ========================================
# PARTE 3: INSTALAÇÃO E CONFIGURAÇÃO GITHUB CLI
# ========================================
echo ""
echo "=== PARTE 3: Configuração GitHub CLI ==="
echo "Instalando GitHub CLI..."
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install -y gh

echo "GitHub CLI instalado com sucesso!"
gh --version

# NOTA: Para autenticação, você precisará executar manualmente:
echo ""
echo "⚠️  ATENÇÃO: Para autenticação GitHub CLI, execute manualmente:"
echo "echo 'SEU_PERSONAL_ACCESS_TOKEN' | gh auth login --with-token"
echo "gh auth setup-git"
echo ""
echo "Exemplo com o token usado:"
echo "echo 'SEU_PERSONAL_ACCESS_TOKEN' | gh auth login --with-token"
echo "gh auth setup-git"
echo ""

# ========================================
# PARTE 4: MODIFICAÇÃO DO ARQUIVO
# ========================================
echo "=== PARTE 4: Modificação do LoginPage ==="
echo "Alterando 'Usuário Manus' para 'Usuário' no arquivo LoginPage.jsx..."

# Usando sed para fazer a substituição
sed -i 's/Usuário Manus/Usuário/g' src/components/LoginPage.jsx

echo "Verificando alteração..."
grep -n "Usuário" src/components/LoginPage.jsx | head -5

# ========================================
# PARTE 5: COMMIT E PUSH
# ========================================
echo ""
echo "=== PARTE 5: Commit e Push ==="
echo "Verificando status do Git..."
git status

echo "Adicionando arquivo modificado..."
git add src/components/LoginPage.jsx

echo "Fazendo commit..."
git commit -m "Alterar label de 'Usuário Manus' para 'Usuário' no LoginPage"

echo "Fazendo push para repositório remoto..."
git push origin developer-manus

# ========================================
# FINALIZAÇÃO
# ========================================
echo ""
echo "=== PROCESSO CONCLUÍDO ==="
echo "✅ Git configurado"
echo "✅ Repositório clonado"
echo "✅ GitHub CLI instalado (autenticação manual necessária)"
echo "✅ Arquivo LoginPage.jsx modificado"
echo "✅ Commit e push realizados"
echo ""
echo "🔧 Lembre-se de configurar a autenticação GitHub CLI manualmente!"
echo "📁 Diretório atual: $(pwd)"
echo "🌿 Branch atual: $(git branch --show-current)"
echo ""
echo "Script finalizado com sucesso!"

