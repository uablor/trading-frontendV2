<template>
  <div class="min-h-screen bg-gray-50 ">
   

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tab Navigation -->
      <a-tabs v-model:activeKey="activeTab" type="card" class="mb-8">
        <a-tab-pane key="dashboard" tab="Dashboard">
          <template #tab>
            <DashboardOutlined class="mr-2" />
            Dashboard
          </template>
        </a-tab-pane>
        <a-tab-pane key="price-check" tab="Price Check">
          <template #tab>
            <LineChartOutlined class="mr-2" />
            Price Check
          </template>
        </a-tab-pane>
        <a-tab-pane key="user-management" tab="User Management">
          <template #tab>
            <TeamOutlined class="mr-2" />
            User Management
          </template>
        </a-tab-pane>
        <a-tab-pane key="trade-monitoring" tab="Trade Monitoring">
          <template #tab>
            <MonitorOutlined class="mr-2" />
            Trade Monitoring
          </template>
        </a-tab-pane>
        <a-tab-pane key="settings" tab="Settings">
          <template #tab>
            <SettingOutlined class="mr-2" />
            Settings
          </template>
        </a-tab-pane>
      </a-tabs>

      <!-- Dashboard Overview -->
      <div v-if="activeTab === 'dashboard'" class="space-y-6">
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

      <!-- Price Check Form -->
      <div v-if="activeTab === 'price-check'" class="space-y-6">
        <a-card title="Price Checker" class="w-full">
          <a-form
            :model="priceForm"
            :rules="priceRules"
            @finish="onPriceCheck"
            layout="vertical"
            class="max-w-2xl"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a-form-item label="Trading Pair" name="symbol">
                <a-select
                  v-model:value="priceForm.symbol"
                  placeholder="Select trading pair"
                  show-search
                  :filter-option="filterOption"
                >
                  <a-select-option value="BTCUSDT">BTC/USDT</a-select-option>
                  <a-select-option value="ETHUSDT">ETH/USDT</a-select-option>
                  <a-select-option value="ADAUSDT">ADA/USDT</a-select-option>
                  <a-select-option value="DOTUSDT">DOT/USDT</a-select-option>
                  <a-select-option value="LINKUSDT">LINK/USDT</a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item label="Exchange" name="exchange">
                <a-select v-model:value="priceForm.exchange" placeholder="Select exchange">
                  <a-select-option value="binance">Binance</a-select-option>
                  <a-select-option value="coinbase">Coinbase</a-select-option>
                  <a-select-option value="kraken">Kraken</a-select-option>
                  <a-select-option value="huobi">Huobi</a-select-option>
                </a-select>
              </a-form-item>
            </div>

            <a-form-item label="Time Range" name="timeRange">
              <a-range-picker
                v-model:value="priceForm.timeRange"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                class="w-full"
              />
            </a-form-item>

            <a-form-item>
              <a-space>
                <a-button type="primary" html-type="submit" :loading="priceLoading">
                  <SearchOutlined class="mr-2" />
                  Check Price
                </a-button>
                <a-button @click="resetPriceForm">Reset</a-button>
              </a-space>
            </a-form-item>
          </a-form>

          <!-- Price Results -->
          <div v-if="priceData" class="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-lg font-semibold mb-4">Price Data</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ priceData.current }}</div>
                <div class="text-gray-500">Current Price</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ priceData.high }}</div>
                <div class="text-gray-500">24h High</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-red-600">{{ priceData.low }}</div>
                <div class="text-gray-500">24h Low</div>
              </div>
            </div>
          </div>
        </a-card>
      </div>

      <!-- User Management -->
      <div v-if="activeTab === 'user-management'" class="space-y-6">
        <!-- User Search Form -->
        <a-card title="User Search & Management" class="w-full">
          <a-form
            :model="userForm"
            @finish="onUserSearch"
            layout="inline"
            class="mb-6"
          >
            <a-form-item label="User ID" name="userId">
              <a-input
                v-model:value="userForm.userId"
                placeholder="Enter User ID"
                class="w-48"
              />
            </a-form-item>
            <a-form-item label="Email" name="email">
              <a-input
                v-model:value="userForm.email"
                placeholder="Enter Email"
                class="w-48"
              />
            </a-form-item>
            <a-form-item label="Status" name="status">
              <a-select v-model:value="userForm.status" placeholder="Select Status" class="w-32">
                <a-select-option value="active">Active</a-select-option>
                <a-select-option value="inactive">Inactive</a-select-option>
                <a-select-option value="suspended">Suspended</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" html-type="submit" :loading="userLoading">
                  <SearchOutlined class="mr-2" />
                  Search
                </a-button>
                <a-button @click="resetUserForm">Reset</a-button>
              </a-space>
            </a-form-item>
          </a-form>

          <!-- User Table -->
          <a-table
            :dataSource="users"
            :columns="userColumns"
            :pagination="{ pageSize: 10 }"
            :loading="userLoading"
            row-key="id"
            class="w-full"
          >
            <template #status="{ record }">
              <a-tag :color="getStatusColor(record.status)">
                {{ record.status.toUpperCase() }}
              </a-tag>
            </template>
            <template #actions="{ record }">
              <a-space>
                <a-button size="small" type="link" @click="viewUser(record)">View</a-button>
                <a-button size="small" type="link" @click="editUser(record)">Edit</a-button>
                <a-button size="small" type="link" danger @click="suspendUser(record)">
                  {{ record.status === 'suspended' ? 'Unsuspend' : 'Suspend' }}
                </a-button>
              </a-space>
            </template>
          </a-table>
        </a-card>
      </div>

      <!-- Trade Monitoring -->
      <div v-if="activeTab === 'trade-monitoring'" class="space-y-6">
        <a-card title="Trade Monitoring" class="w-full">
          <a-form
            :model="tradeForm"
            @finish="onTradeSearch"
            layout="inline"
            class="mb-6"
          >
            <a-form-item label="Trade ID" name="tradeId">
              <a-input
                v-model:value="tradeForm.tradeId"
                placeholder="Enter Trade ID"
                class="w-48"
              />
            </a-form-item>
            <a-form-item label="User ID" name="userId">
              <a-input
                v-model:value="tradeForm.userId"
                placeholder="Enter User ID"
                class="w-48"
              />
            </a-form-item>
            <a-form-item label="Status" name="status">
              <a-select v-model:value="tradeForm.status" placeholder="Trade Status" class="w-32">
                <a-select-option value="pending">Pending</a-select-option>
                <a-select-option value="completed">Completed</a-select-option>
                <a-select-option value="cancelled">Cancelled</a-select-option>
                <a-select-option value="failed">Failed</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="tradeLoading">
                <SearchOutlined class="mr-2" />
                Search Trades
              </a-button>
            </a-form-item>
          </a-form>

          <!-- Trade Table -->
          <a-table
            :dataSource="trades"
            :columns="tradeColumns"
            :pagination="{ pageSize: 10 }"
            :loading="tradeLoading"
            row-key="id"
            class="w-full"
          >
            <template #status="{ record }">
              <a-tag :color="getTradeStatusColor(record.status)">
                {{ record.status.toUpperCase() }}
              </a-tag>
            </template>
            <template #actions="{ record }">
              <a-space>
                <a-button size="small" type="link" @click="viewTrade(record)">View</a-button>
                <a-button 
                  v-if="record.status === 'pending'"
                  size="small" 
                  type="link" 
                  @click="cancelTrade(record)"
                >
                  Cancel
                </a-button>
              </a-space>
            </template>
          </a-table>
        </a-card>
      </div>

      <!-- Settings -->
      <div v-if="activeTab === 'settings'" class="space-y-6">
        <a-card title="System Settings" class="w-full">
          <a-form
            :model="settingsForm"
            @finish="onSettingsSave"
            layout="vertical"
            class="max-w-2xl"
          >
            <a-form-item label="Trading Fee (%)" name="tradingFee">
              <a-input-number
                v-model:value="settingsForm.tradingFee"
                :min="0"
                :max="10"
                :step="0.01"
                :precision="2"
                class="w-full"
              />
            </a-form-item>

            <a-form-item label="Minimum Trade Amount (USD)" name="minTradeAmount">
              <a-input-number
                v-model:value="settingsForm.minTradeAmount"
                :min="1"
                class="w-full"
              />
            </a-form-item>

            <a-form-item label="Maximum Trade Amount (USD)" name="maxTradeAmount">
              <a-input-number
                v-model:value="settingsForm.maxTradeAmount"
                :min="1000"
                class="w-full"
              />
            </a-form-item>

            <a-form-item label="Auto Trading" name="autoTrading">
              <a-switch v-model:checked="settingsForm.autoTrading" />
            </a-form-item>

            <a-form-item label="Maintenance Mode" name="maintenanceMode">
              <a-switch v-model:checked="settingsForm.maintenanceMode" />
            </a-form-item>

            <a-form-item label="Email Notifications" name="emailNotifications">
              <a-checkbox-group v-model:value="settingsForm.emailNotifications">
                <a-checkbox value="trades">Trade Notifications</a-checkbox>
                <a-checkbox value="users">User Activities</a-checkbox>
                <a-checkbox value="system">System Alerts</a-checkbox>
              </a-checkbox-group>
            </a-form-item>

            <a-form-item>
              <a-space>
                <a-button type="primary" html-type="submit" :loading="settingsLoading">
                  Save Settings
                </a-button>
                <a-button @click="resetSettings">Reset to Default</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import {
  DashboardOutlined,
  LineChartOutlined,
  TeamOutlined,
  MonitorOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  DownOutlined,
  SearchOutlined,
  DollarOutlined,
  TrophyOutlined
} from '@ant-design/icons-vue';
import type { SelectProps, TableColumnsType } from 'ant-design-vue';
import { message } from 'ant-design-vue';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'inactive' | 'suspended';
  balance: number;
  lastLogin: string;
  joinDate: string;
}

interface Trade {
  id: string;
  userId: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  status: 'pending' | 'completed' | 'cancelled' | 'failed';
  timestamp: string;
}

interface PriceData {
  current: string;
  high: string;
  low: string;
}

interface Activity {
  title: string;
  description: string;
  time: string;
}

// Reactive data
const activeTab = ref<string>('dashboard');

// Price form
const priceForm = reactive({
  symbol: '',
  exchange: '',
  timeRange: null as any
});

const priceRules = {
  symbol: [{ required: true, message: 'Please select a trading pair!' }],
  exchange: [{ required: true, message: 'Please select an exchange!' }]
};

const priceLoading = ref<boolean>(false);
const priceData = ref<PriceData | null>(null);

// User form
const userForm = reactive({
  userId: '',
  email: '',
  status: ''
});

const userLoading = ref<boolean>(false);
const users = ref<User[]>([
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    status: 'active',
    balance: 1500.50,
    lastLogin: '2024-01-15 10:30:00',
    joinDate: '2023-12-01'
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    status: 'suspended',
    balance: 2300.75,
    lastLogin: '2024-01-14 15:45:00',
    joinDate: '2023-11-15'
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Johnson',
    status: 'active',
    balance: 890.25,
    lastLogin: '2024-01-15 09:15:00',
    joinDate: '2024-01-01'
  }
]);

// Trade form
const tradeForm = reactive({
  tradeId: '',
  userId: '',
  status: ''
});

const tradeLoading = ref<boolean>(false);
const trades = ref<Trade[]>([
  {
    id: 'T001',
    userId: '1',
    symbol: 'BTCUSDT',
    type: 'buy',
    amount: 0.5,
    price: 45000,
    status: 'completed',
    timestamp: '2024-01-15 11:00:00'
  },
  {
    id: 'T002',
    userId: '2',
    symbol: 'ETHUSDT',
    type: 'sell',
    amount: 2.0,
    price: 3200,
    status: 'pending',
    timestamp: '2024-01-15 10:45:00'
  },
  {
    id: 'T003',
    userId: '3',
    symbol: 'ADAUSDT',
    type: 'buy',
    amount: 1000,
    price: 0.45,
    status: 'failed',
    timestamp: '2024-01-15 09:30:00'
  }
]);

// Settings form
const settingsForm = reactive({
  tradingFee: 0.25,
  minTradeAmount: 10,
  maxTradeAmount: 100000,
  autoTrading: false,
  maintenanceMode: false,
  emailNotifications: ['trades', 'system']
});

const settingsLoading = ref<boolean>(false);

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

// Table columns
const userColumns: TableColumnsType = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Status', dataIndex: 'status', key: 'status', slots: { customRender: 'status' } },
  { title: 'Balance', dataIndex: 'balance', key: 'balance', render: (value: number) => `$${value.toFixed(2)}` },
  { title: 'Last Login', dataIndex: 'lastLogin', key: 'lastLogin' },
  { title: 'Actions', key: 'actions', slots: { customRender: 'actions' }, width: 200 }
];

const tradeColumns: TableColumnsType = [
  { title: 'Trade ID', dataIndex: 'id', key: 'id', width: 100 },
  { title: 'User ID', dataIndex: 'userId', key: 'userId' },
  { title: 'Symbol', dataIndex: 'symbol', key: 'symbol' },
  { title: 'Type', dataIndex: 'type', key: 'type', render: (value: string) => value.toUpperCase() },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Price', dataIndex: 'price', key: 'price', render: (value: number) => `$${value.toLocaleString()}` },
  { title: 'Status', dataIndex: 'status', key: 'status', slots: { customRender: 'status' } },
  { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
  { title: 'Actions', key: 'actions', slots: { customRender: 'actions' }, width: 150 }
];

// Methods
const onPriceCheck = async () => {
  priceLoading.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    priceData.value = {
      current: '$45,234.56',
      high: '$46,123.78',
      low: '$44,567.89'
    };
    message.success('Price data retrieved successfully!');
  } catch (error) {
    message.error('Failed to fetch price data');
  } finally {
    priceLoading.value = false;
  }
};

const resetPriceForm = () => {
  priceForm.symbol = '';
  priceForm.exchange = '';
  priceForm.timeRange = null;
  priceData.value = null;
};

const onUserSearch = async () => {
  userLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    message.success('User search completed!');
  } finally {
    userLoading.value = false;
  }
};

const resetUserForm = () => {
  userForm.userId = '';
  userForm.email = '';
  userForm.status = '';
};

const onTradeSearch = async () => {
  tradeLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    message.success('Trade search completed!');
  } finally {
    tradeLoading.value = false;
  }
};

const onSettingsSave = async () => {
  settingsLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    message.success('Settings saved successfully!');
  } finally {
    settingsLoading.value = false;
  }
};

const resetSettings = () => {
  settingsForm.tradingFee = 0.25;
  settingsForm.minTradeAmount = 10;
  settingsForm.maxTradeAmount = 100000;
  settingsForm.autoTrading = false;
  settingsForm.maintenanceMode = false;
  settingsForm.emailNotifications = ['trades', 'system'];
};

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'green',
    inactive: 'orange',
    suspended: 'red'
  };
  return colors[status] || 'default';
};

const getTradeStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: 'orange',
    completed: 'green',
    cancelled: 'red',
    failed: 'red'
  };
  return colors[status] || 'default';
};

const viewUser = (user: User) => {
  message.info(`Viewing user: ${user.name}`);
};

const editUser = (user: User) => {
  message.info(`Editing user: ${user.name}`);
};

const suspendUser = (user: User) => {
  const action = user.status === 'suspended' ? 'Unsuspended' : 'Suspended';
  message.success(`User ${user.name} ${action.toLowerCase()} successfully!`);
};

const viewTrade = (trade: Trade) => {
  message.info(`Viewing trade: ${trade.id}`);
};

const cancelTrade = (trade: Trade) => {
  message.success(`Trade ${trade.id} cancelled successfully!`);
};

const filterOption: SelectProps['filterOption'] = (input, option) => {
  return (option?.value as string)?.toLowerCase().includes(input.toLowerCase());
};

onMounted(() => {
  console.log('Trading Admin Dashboard mounted');
});
</script>

<style lang="scss" scoped>
.stats-card {
  @apply transition-all duration-300 hover:shadow-lg;
  
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