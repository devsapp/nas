# 帮助文档

通过该组件，可以对NAS产品进行相关操作

## 参数

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| regionId  | true |  string |  cn-beijing、cn-hangzhou、cn-shanghai、cn-qingdao、cn-zhangjiakou、cn-huhehaote、cn-shenzhen、cn-chengdu、 cn-hongkong、ap-southeast-1、 ap-southeast-2、ap-southeast-3、 ap-southeast-5、ap-northeast-1、eu-central-1、eu-west-1、us-west-1、us-east-1、ap-south-1  |  地域 |   |
| serviceName  | true | struct  | - | 辅助函数服务名  |  -  |
| functionName  | true | string  | - | 辅助函数函数名  |  -   |
| description  | true | string  | - | 辅助函数描述信息  | -  |
| vpcId  | true | string  | - | VPC配置，VPC ID  | -  |
| vSwitchId  | true | string  | - | VPC配置，vSwitch Id  | -  |
| securityGroupId  | true | string  | - | 安全组ID  | -  |
| groupId  | true | string  | - | groupId  | -  |
| userId  | true | string  | - | userId  | -  |
| nasName  | true | string  | - | NAS名称  | -  |
| zoneId  | true | string  | - | NAS所属分区  | -  |
| nasDir  | true | string  | - | NAS路径  | -  |
| storageType  | true | string  | - | NAS类型  | 可选Capacity、Performance |


------- 

# 其它

组件开发者：项目编译

````
$ npm i

$ npm run build:ts && npm run package-zip
````
