/**
 * user
 */
export const ajax_user_get = {
  method: "get",
  url: "/ajax/user"
}

/**
 * user2
 */
export const ajax_user2_get = {
  method: "get",
  url: "/ajax/user2"
}

/**
 * 新增城市
 */
export const api_admin_city_post = {
  method: "post",
  url: "/api/admin/city",
  body: function(body) {
    return body
  }
}

/**
 * 删除城市
 */
export const api_admin_city_delete = {
  method: "delete",
  url: "/api/admin/city",
  query: function({ id }) {
    return { id }
  }
}

/**
 * 城市列表
 */
export const api_admin_city_list_get = {
  method: "get",
  url: "/api/admin/city/list"
}

/**
 * 启用或禁用城市
 */
export const api_admin_city_cityId_enable_post = {
  method: "post",
  url: "/api/admin/city/{cityId}/enable",
  param: function({ cityId }) {
    return { cityId }
  },
  query: function({ enable }) {
    return { enable }
  }
}

/**
 * 新增导航
 */
export const api_admin_navigation_post = {
  method: "post",
  url: "/api/admin/navigation",
  body: function(body) {
    return body
  }
}

/**
 * 导航关联城市列表
 */
export const api_admin_navigation_city_list_get = {
  method: "get",
  url: "/api/admin/navigation/city/list",
  query: function({ id }) {
    return { id }
  }
}

/**
 * 导航关联城市列表修改
 */
export const api_admin_navigation_city_list_post = {
  method: "post",
  url: "/api/admin/navigation/city/list",
  body: function(body) {
    return body
  }
}

/**
 * 导航聚合列表
 */
export const api_admin_navigation_list_get = {
  method: "get",
  url: "/api/admin/navigation/list"
}

/**
 * 导航关联用户画像列表
 */
export const api_admin_navigation_portrait_list_get = {
  method: "get",
  url: "/api/admin/navigation/portrait/list",
  query: function({ id }) {
    return { id }
  }
}

/**
 * 导航关联用户画像修改
 */
export const api_admin_navigation_portrait_list_post = {
  method: "post",
  url: "/api/admin/navigation/portrait/list",
  body: function(body) {
    return body
  }
}

/**
 * 删除用户画像
 */
export const api_admin_portrait_post = {
  method: "post",
  url: "/api/admin/portrait",
  body: function(body) {
    return body
  }
}

/**
 * 新增用户画像
 */
export const api_admin_portrait_delete = {
  method: "delete",
  url: "/api/admin/portrait",
  query: function({ id }) {
    return { id }
  }
}

/**
 * 用户画像列表
 */
export const api_admin_portrait_list_get = {
  method: "get",
  url: "/api/admin/portrait/list"
}

/**
 * 更新用户画像状态
 */
export const api_admin_portrait_portraitId_enable_post = {
  method: "post",
  url: "/api/admin/portrait/{portraitId}/enable",
  param: function({ portraitId }) {
    return { portraitId }
  },
  query: function({ enable }) {
    return { enable }
  }
}

/**
 * 图片签名
 */
export const api_admin_sign_get = {
  method: "get",
  url: "/api/admin/sign",
  header: function({ loginId }) {
    return { loginId }
  }
}
