<template>
  <div >
   

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
              title="User Activity"
              :value="89"
              :value-style="{ color: '#1890ff' }"
            >
              <template #prefix><LineChartOutlined /></template>
            </a-statistic>
          </a-card>
          <a-card class="stats-card">
            <a-statistic
              title="User Working Capital"
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