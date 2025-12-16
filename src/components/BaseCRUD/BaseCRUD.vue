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
                    <a-button v-if="orderBy === 'DESC'" type="primary" @click="() => { orderBy = 'ASC'; onQuery(); }">
                        <VerticalAlignTopOutlined />
                    </a-button>

                    <a-button v-if="orderBy === 'ASC'" type="primary" @click="() => { orderBy = 'DESC'; onQuery(); }">
                        <VerticalAlignBottomOutlined />
                    </a-button>

                    <a-select v-model:value="search_field" placeholder="ເລືອກຊ່ອງທີ່ຈະຄົ້ນຫາ" style="width: 150px">
                        <a-select-option v-for="(column, index) in props.columns" :key="index" :value="index">
                            {{ column.title }}
                        </a-select-option>
                    </a-select>

                    <a-input-search v-model:value="search" placeholder="ຄົ້ນຫາ..." @search="onSearch"
                        style="width: 250px" />
                    <a-button type="primary" @click="onCreate">
                        {{ $t('add') }} {{ $t(props.title) }}
                    </a-button>
                </div>
            </div>
        </template>
        <a-row :gutter="[16, 16]">
            <a-col :span="24">
                <a-table :columns="props.columns" :data-source="props.data.data" :loading="loading" :pagination="false"
                    size="small" style="border:none; background-color: white" :bordered="false" :scroll="props.scroll">
                    <template #bodyCell="{ column, record }">
                        <slot name="bodyCell" :column="column" :record="record">
                        </slot>
                        <template v-if="column.key === 'actions'">
                            <div class="flex items-center justify-center">
                                <a-tooltip :title="$t('View')">
                                    <a-button type="text" @click="onView(record)" style="color: #1890ff;">
                                        <EyeFilled />
                                    </a-button>
                                </a-tooltip>

                                <a-tooltip :title="$t('Edit')">
                                    <a-button type="text" @click="onEdit(record)" style="color: #52c41a;">
                                        <EditOutlined />
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip :title="$t('Delete')">
                                
                                <a-popconfirm :title="$t('Are_you_sure_delete_this')"
                                    @confirm="emit('onDelete', record.id)" :ok-text="$t('yes')"
                                    :cancel-text="$t('cancel')">
                                    <a-button type="text" danger ghost>
                                        <div>
                                            <DeleteOutlined />
                                        </div>
                                    </a-button>
                                </a-popconfirm>
                                </a-tooltip>
                            </div>
                        </template>
                    </template>
                </a-table>
            </a-col>
            <a-col :span="24">
                <div class="flex justify-end">
                    <a-pagination v-model:current="props.data.pagination.page"
                        v-model:pageSize="props.data.pagination.limit" :total="props.data.pagination.total"
                        show-size-changer show-quick-jumper :show-total="(total: number) => `ລາຍການທັງຫມົດ ${total}`"
                        :page-size-options="['6', '10', '20', '30']" @change="onQuery">
                    </a-pagination>
                </div>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup lang="ts">
import { DeleteOutlined, EditOutlined, EyeFilled, FundViewOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons-vue';
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
const emit = defineEmits(['onDelete', 'onEdit', 'onCreate', 'onQuery', 'onSearch', 'onView'])
const onCreate = () => {
    emit('onCreate', { open: true, data: null })
}
const onEdit = (record: any) => {
    emit('onEdit', record)
}
const onView = (record: any) => {
    emit('onView', record)
}
const search = ref<string>('');
const search_field = ref<string>('');
const onSearch = async () => {
    emit('onSearch', {
        search: search.value,
        page: 1,
    })
}
const onQuery = async (page?: number, pageSize?: number) => {
    emit('onQuery', {
        page: page ?? props.data.pagination.page,
        limit: pageSize ?? props.data.pagination.limit,
        sort: orderBy.value
    })
}
</script>

<style scoped>
/* :deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
} */

:deep(.ant-table) {
    border: none !important;
}

:deep(.ant-table-thead > tr > th),
:deep(.ant-table-tbody > tr > td) {
    border: none !important;
}
</style>