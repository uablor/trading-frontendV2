<template>
    <a-card class="w-full">
        <template #title>
            <div class="flex items-center gap-2">
                <component :is="props.icon" style="font-size: 1.5rem;"></component>
                <h1 class="text-xl" style="margin: 0 !important;">{{ $t(props.title) }}</h1>
            </div>
        </template>
        <template #extra>
            <div class="flex justify-between">
                <div class="flex items-center gap-2">
                    <a-button type="primary" @click="() => { orderBy = 'ASC'; onQuery() }" v-if="orderBy === 'DESC'">
                        <VerticalAlignTopOutlined />
                    </a-button>
                    <a-button type="primary" @click="() => { orderBy = 'DESC'; onQuery() }" v-if="orderBy === 'ASC'">
                        <VerticalAlignBottomOutlined />
                    </a-button>
                    <a-input-search v-model:value="search" placeholder="ຄົ້ນຫາ..." @search="onSearch" />
                    <a-button type="primary" @click="onCreate">{{ $t('add') + ' ' +
                        $t(props.title) }}</a-button>
                </div>
            </div>
        </template>
        <a-row :gutter="[16, 16]">
            <a-col :span="24">
                <a-table :columns="props.columns" :data-source="props.data.data" :loading="loading"
                    :scroll="props.scroll" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <slot name="bodyCell" :column="column" :record="record">

                        </slot>
                        <template v-if="column.key === 'actions'">
                            <div class="flex gap-2 items-center justify-center">
                                <a-button type="primary" @click="onEdit(record)">
                                    <template #icon>
                                        <EditOutlined />
                                    </template>
                                    {{ $t('edit') }}
                                </a-button>
                                <a-popconfirm :title="$t('Are_you_sure_delete_this')"
                                    @confirm="emit('onDelete', record.id)" :ok-text="$t('yes')"
                                    :cancel-text="$t('cancel')">
                                    <a-button type="primary" danger ghost>
                                        <div>
                                            <DeleteOutlined />
                                            {{ $t('delete') }}
                                        </div>
                                    </a-button>
                                </a-popconfirm>
                            </div>
                        </template>
                    </template>
                </a-table>
            </a-col>
            <a-col :span="24">
                <div class="flex justify-end">
                    <a-pagination v-model:current="props.data.pagination.page"
                        v-model:pageSize="props.data.pagination.per_page" :total="props.data.pagination.total"
                        show-size-changer show-quick-jumper :show-total="(total: number) => `ລາຍການທັງຫມົດ ${total}`"
                        :page-size-options="['6', '10', '20', '30']" @change="onQuery">
                    </a-pagination>
                </div>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup lang="ts">
import { DeleteOutlined, EditOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons-vue';
import { ref, type Component } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import type { PaginateEntity } from '@/common/interface/paramsPaginate';

const orderBy = ref<"ASC" | "DESC">('DESC')
const props = withDefaults(
    defineProps<{
        columns: TableColumnsType
        data: PaginateEntity<any>
        loading: boolean
        icon: Component
        title: string
        scroll?: {
            x?: number | string
            y?: number | string
        }
    }>(),
    {
        scroll: () => ({ x: 1500, y: 1900 })
    }
)
const emit = defineEmits(['onDelete', 'onEdit', 'onCreate', 'onQuery', 'onSearch'])
const onCreate = () => {
    emit('onCreate', { open: true, data: null })
}
const onEdit = (record: any) => {
    emit('onEdit', record)
}
const search = ref<string>('');
const onSearch = async () => {
    emit('onSearch', {
        search: search.value,
        page: 1,
    })
}
const onQuery = async (page?: number, pageSize?: number) => {
    emit('onQuery', {
        page: page ?? props.data.pagination.page,
        per_page: pageSize ?? props.data.pagination.per_page,
        order_by: orderBy.value
    })
}
</script>

<style scoped>
:deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
}
</style>