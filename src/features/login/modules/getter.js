/** 当前登录账号 */
export const currentUserName = (state) => state.user.username
export const currentUserId = (state) => state.user.userid
/** 注册 */
export const registerPhone = (state) => state.register.phone
/** 手机号重置 */
export const forgetCode = (state) => state.forget.code
export const forgetMobile = (state) => state.forget.phone
export const forgetToken = (state) => state.forget.token
