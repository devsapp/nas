# 帮助文档

通过该组件，可以对NAS产品进行相关操作

## 参数

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| regionId  | true |  string |  cn-beijing、cn-hangzhou、cn-shanghai、cn-qingdao、cn-zhangjiakou、cn-huhehaote、cn-shenzhen、cn-chengdu、 cn-hongkong、ap-southeast-1、 ap-southeast-2、ap-southeast-3、 ap-southeast-5、ap-northeast-1、eu-central-1、eu-west-1、us-west-1、us-east-1、ap-south-1  |  地域 |   |
| serviceName  | true | struct  | - | 辅助函数服务名  |  -  |
| functionName  | false | string  | - | 辅助函数函数名  |  -   |
| description  | true | string  | - | 辅助函数服务描述信息  | -  |
| vpcId  | true | string  | - | VPC配置，VPC ID  | -  |
| vSwitchId  | true | string  | - | VPC配置，vSwitch Id  | -  |
| securityGroupId  | true | string  | - | 安全组ID  | -  |
| role  | true | string  | - | ram 角色 arn  | -  |
| groupId  | true | string  | - | groupId  | 默认 10003  |
| userId  | true | string  | - | userId  | 默认 10003  |
| mountPointDomain  | false | string  | - | NAS挂载点  | 示例：2569abcde8c-abcde.cn-shenzhen.nas.aliyuncs.com |
| nasName  | false | string  | - | NAS名称  | -  |
| zoneId  | false | string  | - | NAS所属分区  | -  |
| nasDir  | true | string  | - | NAS路径  | -  |
| storageType  | false | string  | - | NAS类型  | 可选Capacity、Performance |

> 说明： 
当 mountPointDomain 时会直接复用，届时 nasName、zoneId、storageType 填写无效；当 mountPointDomain 没有填写，则 nasName、zoneId、storageType 必填
------- 

# 其它

组件开发者：项目编译

````
$ npm i

$ npm run build && npm run package-zip
````
