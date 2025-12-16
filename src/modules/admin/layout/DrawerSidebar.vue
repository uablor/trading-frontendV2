<template>

<a-button type="primary" ghost @click="showDrawer" class="!block md:!hidden"><MenuOutlined class="text-1xl" /></a-button>


<a-drawer
  v-model:open="open"
  placement="left"
  :closable="false"
  @update:open="onClose"
  style="width: 250px;"
  width="250px"
>
    <SidebarLayout :is-sidebar-open="false" @close-drawer="onClose" />
  </a-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {
  MenuOutlined
} from '@ant-design/icons-vue';
import SidebarLayout from './SidebarLayout.vue';
const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};
</script>

