export const MEMBER_PRO = '《会员服务协议》';
export const SERVER_PRO = '《连续包月服务规则》';
import memberProData from './memberPro';
import serverRule from './serverRule';
export const RULE_MAPS = {
    [MEMBER_PRO]: memberProData,
    [SERVER_PRO]: serverRule
};