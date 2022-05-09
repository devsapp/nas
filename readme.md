## 之前版本的痛点

1. 最原始的设计初衷是为了创建和操作 nas，没有考虑多 nas 配置和 多 vSwitchId 场景。现在辅助函数会和真实的服务 nas 配置会有很大的差异，会导致很多问题：
1. 指令会有很多的目录映射，如果中间出现了问题，问题排查会艰难。
1. 每次执行都需要修改一下服务 [issue](https://github.com/devsapp/fc/issues/292) [issue](https://github.com/devsapp/fc/issues/250)，导致每次执行 nas 指令时间都会很长。
1. 频繁修改服务的 nas 配置，创建 nas 目录偶现没有权限的错误。
1. 确保目录存在的辅助函数需要新增版本的校验，这样就不需要每次都去修改函数
1. 之前的辅助函数 webpack，现在在 github 跑 build 流程失败
1. nas 上传文件参考 cp 的 -r 参数 [issue](https://github.com/devsapp/fc/issues/282)
1. 超大文件测试 8g [issue](https://github.com/devsapp/fc/issues/288)
1. 是否会出现限流 [issue](https://github.com/devsapp/fc/issues/306)

## 概述

此版本总体交互上和之前没有什么较大的变化，主要是规范输入的参数和方法的职能。<br />

## 方法

### initHelperService

#### 描述

初始化辅助函数，并且确保目录存在<br />

#### 环境变量支持

辅助函数的内存大小(默认 256M)： NAS_HELPER_SERVERVICE_MEMORY_SIZE<br />
分片上传代码包大小(默认 5M)： NAS_CHUNK_SIZE `请谨慎配置，因为函数计算限制 6M`

#### 参数

```YAML
props:
  regionId: string;
  serviceName: string; // 主函数的服务名称
  role?: string; // 不填写遵循 fc-deploy 的逻辑
  description?: string;

  vpcConfig:
    vpcId: string;
    vSwitchId: string[];
    securityGroupId: string;

  groupId?: number;
  userId?: number;
  mountPoints:
    - serverAddr: string
      nasDir: string
      fcDir: string
    - serverAddr: string
      nasDir: string
      fcDir: string
```

1. 确保 nas 目录辅助函数
1. 代码版本是否是最新，如果不是最新，则更新代码
1. 检测服务配置是否是最新，如果不是最新则更新代码
1. 确保 nas 目录存在（尝试 3 次，每次间隔 2s ）
1. 操作 nas 辅助函数
1. 代码版本是否是最新，如果不是最新，则更新代码
1. 检测服务配置是否是最新，如果不是最新则更新代码

​<br />

#### 辅助函数版本检测实现

1. 每次 build 将版本信息存在一个文件里

   > git log -n 1 --pretty="format:%h" > ./dist/VERSION

2. 部署辅助函数的时候将版本信息写到函数的描述字段里面
3. 再次部署的时候，检测本地缓存配置是否和线上一致，如果一致，则跳过修改配置，如果不一致，则修改配置

​<br />

### removeHelperService

#### 描述

删除辅助函数<br />​<br />

#### 参数

```typescript
props: regionId: string;
serviceName: string; // 主函数的服务名称
```

### removeEnsureNasDirHelperService

#### 描述

删除确保 nas 目录存在的辅助函数

#### 参数

```typescript
props: regionId: string;
serviceName: string; // 主函数的服务名称
```

### deploy

#### 描述

创建 nas 资源，并创建辅助函数<br />​<br />

#### 参数

```yaml
props:
  regionId: string;
  serviceName: string; // 主函数的服务名称
  role?: string; // 不填写遵循 fc-deploy 的逻辑
  description?: string;

  vpcConfig:
    vpcId: string;
    vSwitchId: string[];
    securityGroupId: string;

  groupId?: number;
  userId?: number;

  // mountPoints 和 nasName/zoneId/storageType 参数冲突， 如果 mountPoints 存在，则 nasName/zoneId/storageType 不生效
  mountPoints?:
    - serverAddr: string
      nasDir: string
      fcDir: string

  nasName?: string; // 作为文件系统的 description
  zoneId?: string;
  storageType: string;
  nasDir?: string;
```

1. 判断 mountPoints 是否存在
1. 不存在则创建 nas 流程，其中 zoneId 必填项，nasDir 不填写则默认使用服务名称
1. 存在则跳过创建流程
1. 调用 initHelperService 方法

​<br />

### remove

#### 描述

删除 nas 资源，并删除辅助函数<br />​<br />

#### 参数

```typescript
props:
  regionId: string;
  serviceName: string; // 主函数的服务名称
  // 传入 nasName/zoneId 删除文件系统
  nasName?: string;
  zoneId?: string;
  vpcConfig?: string;
  // 传入 fileSystemId 删除文件系统
  fileSystemId?: string
  // TODO: 传入 mountPointDomain 删除挂载点(暂不实行)
  mountPointDomain?: string | string[];
```

1. 删除 nas 流程: fileSystemId > nasName

   > 当 nasName 生效时，会去通过 nasName 查找文件系统，流程同 deploy 复用规则。

2. 调用 removeHelperService 方法

​<br />

### ls/rm/command/upload/download

#### 描述

操作指令<br />​<br />

#### 参数

```typescript
props:
  regionId: string;
  serviceName: string; // 主函数的服务名称
  role?: string; // 不填写遵循 fc-deploy 的逻辑
  description?: string;

  vpcConfig:
    vpcId: string;
    vSwitchId: string[];
    securityGroupId: string;

  groupId?: number;
  userId?: number;
  mountPoints?:
    - serverAddr: string
      nasDir: string
      fcDir: string
```

1. upload/download 调用 initHelperService 方法; ls/rm/command 确定辅助函数代码是否是最新的。
2. 确保服务配置是最新的。
3. 执行流程。

### 上传代码原理

<img src="https://img.alicdn.com/imgextra/i4/O1CN01HOgemm1zBetAmFEJ4_!!6000000006676-2-tps-1748-1366.png" title="上传代码原理"/>
​
