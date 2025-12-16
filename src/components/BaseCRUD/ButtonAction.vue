<!-- <template>
    <template v-if="column.key === 'actions'">
        <div class="flex gap-2 items-center justify-center">
            <a-button type="primary" @click="() => { open = true; userRecord = record }">
                <template #icon>
                    <EditOutlined />
                </template>
                {{ $t('edit') }}
            </a-button>
            <a-popconfirm :title="$t('Are_you_sure_delete_this')" @confirm="deleteUser(record.id)" :ok-text="$t('yes')"
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

<script setup lang="ts">

</script>

<style scoped></style> -->