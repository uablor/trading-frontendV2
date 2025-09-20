<template>
    <a-form :hideRequiredMark="true" :model="form" name="register" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }"
        autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed" class="register-form">
        <h2 class="login-title">{{ $t('register.title') }}</h2>
        <p class="login-description">{{ $t('register.description') }}</p>

        <!-- Password -->
        <a-form-item :label="$t('register.password')" name="password"
            :rules="[{ required: true, message: $t('register.error_password') }]">
            <a-input-password v-model:value="form.password" size="large" autocomplete="new-password">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <!-- Confirm Password -->
        <a-form-item :label="$t('register.password_confirm')" name="confirm_password" :rules="[
            { required: true, message: $t('register.error_password_confirm') },
        ]">
            <a-input-password v-model:value="form.confirm_password" size="large" autocomplete="new-password">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <!-- Submit -->
        <a-form-item>
            <a-button class="social-button" type="primary" ghost html-type="submit" block size="large"
                style="margin-top: 10px;" :loading="loading" :disabled="waitonemit">
                {{ waitonemit ? `${$t('register.submit')} (${countdown}s)` : $t('register.submit') }}
            </a-button>
        </a-form-item>

        <!-- Already have account -->
        <div style="margin: 10px 0px;">
            {{ $t('register.already_have_account') }}
            <router-link :to="{ name: 'auth.login' }">{{ $t('register.login') }}</router-link>
        </div>
    </a-form>
</template>

<script lang="ts" setup>
import { useConfirmPassword} from '../../composables/password/usePassword';

const { form, waitonemit, countdown, onFinish, loading, onFinishFailed } = useConfirmPassword()


</script>


<style scoped lang="scss">
.register-form {
    margin: 0 auto;
    border: none;
    max-width: 400px;
    padding: 5px 24px;

    & h2 {
        font-size: 26px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 8px;
        color: #1f1f1f;
    }

    & p {
        font-size: 14px;
        text-align: center;
        color: #8c8c8c;
        margin-bottom: 20px;
    }
}

/* Social Login */
.social-login {
    display: flex;
    margin: 24px auto;
    gap: 12px;
    margin-bottom: 22px;
}

.social-button {
    flex: 1;
    height: 48px;
    border-radius: 12px;
    border: 2px solid #f0f0f0;
    background: white;
    color: #595959;
    font-weight: 500;
    transition: all 0.3s ease;
}

.social-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.google-button:hover {
    border-color: #db4437;
    color: #db4437;
}

.apple-button:hover {
    border-color: #000;
    color: #000;
}

/* Responsive Design */
@media (max-width: 768px) {
    .social-login {
        flex-direction: column;
    }
}

/* Loading Animation */
.submit-button.ant-btn-loading {
    background: linear-gradient(135deg, #40a9ff, #9254de);
}

/* Focus States */
.form-input:focus-within {
    border-color: #1890ff !important;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1) !important;
}

/* Error States */
.form-item :deep(.ant-form-item-has-error .ant-input) {
    border-color: #ff4d4f;
}

.form-item :deep(.ant-form-item-has-error .ant-input:focus) {
    border-color: #ff4d4f;
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1);
}
</style>
