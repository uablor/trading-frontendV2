import { defineStore } from "pinia";
import { ref } from "vue";
// import type { UserEntity } from "../type";
import type { PaginateEntity, Params } from "@/common/interface/paramsPaginate";
import type { User } from "../entities/user.entites";
export const useUserStore = defineStore("userStore", () => {
    const loadingUser = ref<boolean>(false)
    const UserList = ref<PaginateEntity<User>>({ data: [], pagination: { count: 0, page: 1, limit: 6, total: 0, totalPages: 0 } })
    const params = ref<Params>({ page: 1, per_page: 6, search: '', type: 'paginate', order_by: 'DESC' })

    return {
        loadingUser,
        UserList,
        params
    }
}); 