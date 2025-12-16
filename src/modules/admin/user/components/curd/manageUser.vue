<template>
    <a-modal v-model:open="localOpen" :footer="null" @ok="onClose" @cancel="onClose" :width="'400px'" centered>
        <template #title>
            <h1 class="text-xl text-center" style="font-weight: 900;">{{ $t('add') + ' ' + $t('user') }}</h1>
        </template>
        <a-form layout="vertical" ref="formRef" :model="formState"@finish="onSumit">
            <a-row>
                <a-divider
                    style="margin: 0 !important; color: var(--ant-primary-color); border-color: var(--ant-primary-color);">
                    {{ $t('information') }}
                </a-divider>
                <a-col :span="24">
                    <FormInputString label="username" v-model="formState.username" :placeholder="$t('username')"
                        :prefix="UserOutlined" />
                </a-col>
                <a-col :span="24">
                    <FormInputString label="email" v-model="formState.email" placeholder="example@gmail.com"
                        :prefix="MailOutlined" />
                </a-col>
                <a-col :span="24" v-if="!props.data">
                    <FormInputString v-model="formState.password" label="password" placeholder="********"
                        :prefix="LockOutlined" :type="'password'" />
                </a-col>
                <a-col :span="24">
                    <FormInputString label="phone" v-model="formState.phone" placeholder="020XXXXXXXX"
                        :prefix="PhoneOutlined" />
                </a-col>
                <a-col :span="24">
                    <div class="flex justify-end gap-2">
                        <a-button @click="onClose">{{ $t('cancel') }}</a-button>
                        <a-button type="primary" htmlType="submit" :loading="loadingUser">{{ $t('save')
                            }}</a-button>
                    </div>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import FormInputString from '@/components/FormInputString.vue';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons-vue';
import { computed, reactive, ref, watch } from 'vue';
// import { rulesUser } from '../rules';
//d
// import type { any, any } from '../type';
import { useUser } from '../../composable/useUser';


const { createUser, updateUser, loadingUser } = useUser()
const formRef = ref()
const props = defineProps<{
    open: boolean,
    data: any | null
}>()
const emit = defineEmits(['isOpen'])

const formState = reactive<any>({
    id: null,
    username: '',
    email: '',
    password: '',
    phone: ''
})
const localOpen = computed({
    get: () => props.open,
    set: (val) => emit('isOpen', val)
})
watch(
    () => props.data,
    (value) => {
        if (value) {
            formState.id = value.id
            formState.username = value.username
            formState.email = value.email
            formState.phone = value.phone
        }
    }
)
const onClose = () => {
    formRef.value?.resetFields()
    emit('isOpen', false)
}
const onSumit = async () => {
    if (props.data) {
        await updateUser(formState)
    } else {
        await createUser(formState)
    }
    onClose()
}
</script>

<style scoped></style>