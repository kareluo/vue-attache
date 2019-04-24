/**
 * 核销
 */
export const api_his_lottery_receive_post = {
  method: 'post',
  url: '/api/his/lottery/receive'
}

/**
 * 奖品记录
 */
export const api_his_lottery_userId_history_get = {
  method: 'get',
  url: '/api/his/lottery/{userId}/history'
}

/**
 * 生成qrcode的个数
 */
export const api_qrcode_count_get = {
  method: 'get',
  url: '/api/qrcode/count'
}

/**
 * 生成qrcode
 */
export const api_qrcode_size_get = {
  method: 'get',
  url: '/api/qrcode/{size}'
}

/**
 * 获取微信sessionKey
 */
export const api_wxapp_authorize_post = {
  method: 'post',
  url: '/api/wxapp/authorize'
}

/**
 * 签到
 */
export const api_wxapp_checkin_post = {
  method: 'post',
  url: '/api/wxapp/checkin'
}

/**
 * 获取签到code
 */
export const api_wxapp_checkin_code_post = {
  method: 'post',
  url: '/api/wxapp/checkin/code'
}

/**
 * 获取签到状态
 */
export const api_wxapp_checkin_status_post = {
  method: 'post',
  url: '/api/wxapp/checkin/status'
}

/**
 * 发送短信验证码
 */
export const api_wxapp_code_post = {
  method: 'post',
  url: '/api/wxapp/code'
}

/**
 * 更新用户手机号
 */
export const api_wxapp_code_phone_post = {
  method: 'post',
  url: '/api/wxapp/code/phone'
}

/**
 * 领取药箱首页
 */
export const api_wxapp_drug_box_home_get = {
  method: 'get',
  url: '/api/wxapp/drug/box/home'
}

/**
 * 抽奖
 */
export const api_wxapp_drug_lottery_get = {
  method: 'get',
  url: '/api/wxapp/drug/lottery'
}

/**
 * 首页
 */
export const api_wxapp_drug_lottery_home_get = {
  method: 'get',
  url: '/api/wxapp/drug/lottery/home'
}

/**
 * 添加抽奖
 */
export const api_wxapp_drug_lottery_times_times_post = {
  method: 'post',
  url: '/api/wxapp/drug/lottery/times/{times}'
}

/**
 * 埋点数据上报
 */
export const api_wxapp_event_track_post = {
  method: 'post',
  url: '/api/wxapp/event/track'
}

/**
 * 图片签名
 */
export const api_wxapp_filecloud_sign_get = {
  method: 'get',
  url: '/api/wxapp/filecloud/sign'
}

/**
 * formId上报
 */
export const api_wxapp_formid_post = {
  method: 'post',
  url: '/api/wxapp/formid'
}

/**
 * 门诊检查报告单
 */
export const api_wxapp_his_reports_get = {
  method: 'get',
  url: '/api/wxapp/his/reports'
}

/**
 * 获取首页数据
 */
export const api_wxapp_home_get = {
  method: 'get',
  url: '/api/wxapp/home'
}

/**
 * 城市数据
 */
export const api_wxapp_home_city_get = {
  method: 'get',
  url: '/api/wxapp/home/city'
}

/**
 * 门诊地址
 */
export const api_wxapp_home_clinicAddress_post = {
  method: 'post',
  url: '/api/wxapp/home/clinicAddress'
}

/**
 * 创建通知信息
 */
export const api_wxapp_home_notify_post = {
  method: 'post',
  url: '/api/wxapp/home/notify'
}

/**
 * 终端地址
 */
export const api_wxapp_home_tabletAddress_post = {
  method: 'post',
  url: '/api/wxapp/home/tabletAddress'
}

/**
 * log上报
 */
export const api_wxapp_log_post = {
  method: 'post',
  url: '/api/wxapp/log'
}

/**
 * 抽奖记录
 */
export const api_wxapp_lottery_receive_get = {
  method: 'get',
  url: '/api/wxapp/lottery/receive'
}

/**
 * 模拟Authorize
 */
export const api_wxapp_mock_authorize_post = {
  method: 'post',
  url: '/api/wxapp/mock/authorize'
}

/**
 * 更新用户手机号
 */
export const api_wxapp_phone_post = {
  method: 'post',
  url: '/api/wxapp/phone'
}

/**
 * 获取元气值
 */
export const api_wxapp_score_post = {
  method: 'post',
  url: '/api/wxapp/score'
}

/**
 * 更新userInfo
 */
export const api_wxapp_userinfo_post = {
  method: 'post',
  url: '/api/wxapp/userinfo'
}

/**
 * 医助历史消息
 */
export const api_wxapp_xiaoxing_messages_get = {
  method: 'get',
  url: '/api/wxapp/xiaoxing/messages'
}

/**
 * 小杏历史消息
 */
export const api_wxapp_xx_messages_get = {
  method: 'get',
  url: '/api/wxapp/xx/messages'
}

/**
 * FamilyDoctor Test
 */
export const test_get = {
  method: 'get',
  url: '/test'
}