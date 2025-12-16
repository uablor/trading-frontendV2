
import { message } from "ant-design-vue"
import { useUserStore } from "../store/useUserStore"
import { storeToRefs } from "pinia"
import type { Params } from "@/common/interface/paramsPaginate"
import { clientApi } from "@/common/configurations/axios.config"
// import type { any } from "../type"
export const useUser = () => {
    const { UserList, loadingUser, params } = storeToRefs(useUserStore())
    const fetchUserList = async () => {
        loadingUser.value = true
        try {
            const { data } = await clientApi.get('/user', { params: params.value })
            UserList.value = data
            console.log(data);
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
        finally {
            loadingUser.value = false
        }
    }
    const setQuery = async (newParams: Params) => {
        params.value.page = newParams.page ?? params.value.page
        params.value.per_page = newParams.per_page ?? params.value.per_page
        params.value.search = newParams.search ?? params.value.search
        params.value.type = newParams.type ?? params.value.type
        params.value.sort = newParams.sort ?? params.value.sort

        await fetchUserList()
    }

    const deleteUser = async (id: number) => {
        try {
            const { data } = await clientApi.delete(`/users/${id}`)
            await fetchUserList()
            message.success(data.message || "ລົບຂໍ້ມູນສໍາເລັດ")

        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    const createUser = async (formData: any) => {
        try {
            const { id, ...rest } = formData
            const { data } = await clientApi.post('/users', rest)
            await fetchUserList()
            message.success(data.message || "ບັນທຶກຂໍ້ມູນສໍາເລັດ")
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    const updateUser = async (formData: any) => {
        try {
            const { password, id, ...rest } = formData
            const { data } = await clientApi.patch(`/users/${formData.id}`, rest)
            await fetchUserList()
            message.success(data.message || "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ")
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    return {
        UserList,
        loadingUser,
        fetchUserList,
        setQuery,
        deleteUser,
        createUser,
        updateUser
    }
}