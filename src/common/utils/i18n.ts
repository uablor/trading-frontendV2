import i18n from "../configurations/vue18n.config"

export const tI18n = (text:string)=>{
    return i18n.global.t(text)
}