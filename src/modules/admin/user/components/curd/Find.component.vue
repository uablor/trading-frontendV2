<template>
    <BaseCRUD :columns="UserCol.getColumns()" :data="UserList" :loading="loadingUser" :icon="UserOutlined" title="user"
        @on-delete="deleteUser" @on-edit="onEdit($event)" @on-query="setQuery($event)" @on-create="onCreate"
        @on-search="setQuery($event)">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'avatar'">
                <a-avatar :src="record.avatar || base_env.DEFAULT_AVATAR" shape="circle" size="large" />
            </template>
            <template v-if="column.key === 'group'">
                <a-tag :color="record.role === 'admin' ? 'blue' : 'green'"
                    style="text-transform: capitalize;font-size: 1rem">
                    {{ record.role === 'admin' ? 'Admin' : 'User' }}
                </a-tag>
            </template>
        </template>
    </BaseCRUD>
    <manageUser :open="open" :data="userRecord" @isOpen="open = $event"></manageUser>
</template>

<script setup lang="ts">
import BaseCRUD from '@/components/BaseCRUD/BaseCRUD.vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import ManageUser from './manageUser.vue';
import { useUser } from '../../composable/useUser';
import { BaseColumns } from '@/common/utils/baseColumn';
import { base_env } from '@/env';

const {UserList, loadingUser, fetchUserList, setQuery, deleteUser } = useUser()


const open = ref<boolean>(false)
const userRecord = ref<any | null>(null)
const onEdit = (record: any) => {
    userRecord.value = record
    open.value = true
}
const onCreate = () => {
    userRecord.value = null
    open.value = true
}
const UserCol = new BaseColumns<any>([
    { dataIndex: 'avatar', width: 100, ellipsis: true, fixed: 'left' },
    { dataIndex: 'username', ellipsis: true, fixed: 'left', sorter: (a: any, b: any) => a.username.localeCompare(b.username) },
    { dataIndex: 'email' },
    { dataIndex: 'group' },
    { dataIndex: 'permission' },
])
onMounted(async () => {
    await fetchUserList();
})
</script>

<style scoped></style>