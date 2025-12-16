<template>
  <div class="min-h-screen bg-gray-50 ">
   

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Dashboard Overview -->
      <div class="space-y-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a-card class="stats-card">
            <a-statistic
              title="Total Users"
              :value="1234"
              :value-style="{ color: '#3f8600' }"
            >
              <template #prefix><UserOutlined /></template>
            </a-statistic>
          </a-card>
          <a-card class="stats-card">
            <a-statistic
              title="Active Trades"
              :value="89"
              :value-style="{ color: '#1890ff' }"
            >
              <template #prefix><LineChartOutlined /></template>
            </a-statistic>
          </a-card>
          <a-card class="stats-card">
            <a-statistic
              title="Total Volume"
              :value="1234567"
              suffix="USD"
              :value-style="{ color: '#722ed1' }"
            >
              <template #prefix><DollarOutlined /></template>
            </a-statistic>
          </a-card>
          <a-card class="stats-card">
            <a-statistic
              title="Profit/Loss"
              :value="12.5"
              suffix="%"
              :value-style="{ color: '#3f8600' }"
            >
              <template #prefix><TrophyOutlined /></template>
            </a-statistic>
          </a-card>
        </div>

        <!-- Recent Activity -->
        <a-card title="Recent Activity" class="w-full">
          <a-list
            :data-source="recentActivities"
            size="small"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #title>{{ item.title }}</template>
                  <template #description>{{ item.description }}</template>
                </a-list-item-meta>
                <div>{{ item.time }}</div>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  LineChartOutlined,
  UserOutlined,
  DollarOutlined,
  TrophyOutlined
} from '@ant-design/icons-vue';


interface Activity {
  title: string;
  description: string;
  time: string;
}

// Recent activities
const recentActivities = ref<Activity[]>([
  {
    title: 'New user registration',
    description: 'User mike@example.com registered',
    time: '5 minutes ago'
  },
  {
    title: 'Large trade executed',
    description: 'BTC/USDT trade of $50,000 completed',
    time: '12 minutes ago'
  },
  {
    title: 'System maintenance',
    description: 'Scheduled maintenance completed successfully',
    time: '1 hour ago'
  },
  {
    title: 'Price alert triggered',
    description: 'ETH/USDT reached target price of $3,500',
    time: '2 hours ago'
  }
]);


onMounted(() => {

});
</script>

<style lang="scss" scoped>
.stats-card {
  
  &:hover {
    transform: translateY(-2px);
  }
}

.ant-statistic {
  text-align: center;
}

.ant-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.ant-tabs-card > .ant-tabs-content {
  margin-top: 16px;
}

.ant-form-item {
  margin-bottom: 16px;
}

.ant-table {
  .ant-table-thead > tr > th {
    background-color: #fafafa;
    border-bottom: 2px solid #f0f0f0;
    font-weight: 600;
  }
}

// Custom SCSS styles
.trading-dashboard {
  .header-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    .stats-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
  }
  
  .form-section {
    .search-filters {
      background-color: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }
  }
  
  .data-table {
    .status-badge {
      &.active { color: #52c41a; }
      &.inactive { color: #faad14; }
      &.suspended { color: #f5222d; }
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .ant-form-inline .ant-form-item {
    display: block;
    margin-bottom: 16px;
    
    .ant-form-item-control {
      width: 100%;
    }
  }
  
  .stats-card {
    margin-bottom: 16px;
  }
}

// Dark theme support (optional)
@media (prefers-color-scheme: dark) {
  .trading-dashboard {
    background-color: #141414;
    color: #ffffff;
    
    .ant-card {
      background-color: #1f1f1f;
      border-color: #303030;
    }
  }
}

</style>