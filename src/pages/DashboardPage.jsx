import React from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import DashboardData from '../components/DashboardData';
import { Users, ShoppingCart, DollarSign, Activity, TrendingUp, Calendar, Target, Award } from 'lucide-react';

const DashboardPage = ({ user, onLogout }) => {
  return (
    <Layout title="Dashboard" subtitle="Visão Geral do Sistema">
      {/* Header com informações do usuário */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Bem-vindo, {user?.username || user?.name || 'Usuário'}!
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Aqui está um resumo das atividades do sistema
          </p>
        </div>
      </div>

      {/* Dados da API Dashboard */}
      <div className="mb-6">
        <DashboardData />
      </div>

      {/* Estatísticas principais */}
      <div className="row row-deck row-cards mb-4">
        <div className="col-sm-6 col-lg-3">
          <StatCard
            title="Total de Usuários"
            value="2,986"
            change="+4%"
            changeType="positive"
            icon={Users}
            color="primary"
            subtitle="Últimos 7 dias"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatCard
            title="Vendas"
            value="75%"
            change="+7%"
            changeType="positive"
            icon={ShoppingCart}
            color="success"
            subtitle="Taxa de conversão"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatCard
            title="Receita"
            value="$4,300"
            change="+8%"
            changeType="positive"
            icon={DollarSign}
            color="warning"
            subtitle="Últimos 7 dias"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatCard
            title="Novos Clientes"
            value="6,782"
            change="-1%"
            changeType="negative"
            icon={Activity}
            color="info"
            subtitle="Últimos 7 dias"
          />
        </div>
      </div>

      {/* Cards de métricas adicionais */}
      <div className="row row-deck row-cards mb-4">
        <div className="col-sm-6 col-lg-3">
          <StatCard
            title="Crescimento Mensal"
            value="12.5%"
            change="+2.1%"
            changeType="positive"
            icon={TrendingUp}
            color="success"
            subtitle="Comparado ao mês anterior"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatCard
            title="Eventos Hoje"
            value="24"
            change="+6"
            changeType="positive"
            icon={Calendar}
            color="info"
            subtitle="Agendados para hoje"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatCard
            title="Metas Atingidas"
            value="8/10"
            change="80%"
            changeType="positive"
            icon={Target}
            color="warning"
            subtitle="Este mês"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatCard
            title="Classificação"
            value="#3"
            change="+1"
            changeType="positive"
            icon={Award}
            color="primary"
            subtitle="No ranking geral"
          />
        </div>
      </div>

      {/* Cards de conteúdo */}
      <div className="row row-deck row-cards">
        <div className="col-md-6 col-lg-4">
          <Card
            title="Sistema Operacional"
            subtitle="Status Atual"
            status="success"
            statusPosition="top"
          >
            <p>Todos os sistemas estão funcionando normalmente.</p>
            <p className="text-muted text-sm mt-2">
              <strong>Uptime:</strong> 99.9% | <strong>Última atualização:</strong> 2 horas atrás
            </p>
            <div className="mt-3">
              <span className="badge bg-success">✓ Online</span>
              <span className="badge bg-info ms-2">✓ Backup Ativo</span>
            </div>
          </Card>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <Card
            title="Atividades Recentes"
            ribbon="NOVO"
            ribbonColor="blue"
          >
            <ul className="list-unstyled">
              <li>🔄 Sincronização de dados - 5 min atrás</li>
              <li>👤 Novo usuário registrado - 12 min atrás</li>
              <li>📊 Relatório gerado - 1 hora atrás</li>
              <li>🔧 Manutenção programada - 2 horas atrás</li>
              <li>📈 Backup realizado - 6 horas atrás</li>
            </ul>
          </Card>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <Card
            title="Ações Rápidas"
            footer={
              <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm">
                  Gerar Relatório
                </button>
                <button className="btn btn-outline-secondary btn-sm">
                  Configurações
                </button>
              </div>
            }
          >
            <p>Acesso rápido às principais funcionalidades:</p>
            <div className="row g-2">
              <div className="col-6">
                <button className="btn btn-outline-primary btn-sm w-100">
                  📊 Relatórios
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-success btn-sm w-100">
                  👥 Usuários
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-warning btn-sm w-100">
                  ⚙️ Config
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-info btn-sm w-100">
                  📈 Analytics
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;

