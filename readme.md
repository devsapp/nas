## 环境变量支持

辅助函数的内存大小(默认 256M)： NAS_HELPER_SERVERVICE_MEMORY_SIZE
分片上传代码包大小(默认 5M)： NAS_CHUNK_SIZE `请谨慎配置，因为函数计算限制 6M`

## 上传代码描述

- 如果本地是文件夹，并且没有指定 -r/--recursive: 直接报错
- 如果本地是文件夹，远端是文件，报错
- 如果远端地址已经存在
  - 如果本地是一个目录
    - 本地地址是以斜线结尾，上传`当前目录下`所有的文件到远端地址
    - 本地地址不以斜线结尾，将当前目录追加到远端地址
      - 判断：是文件夹或者文件不存在，上传`当前目录`（包含目录）到远端地址
      - 判断：不是文件夹，报错
  - 如果本地不是目录
    - 远端是文件夹，将文件名称追加到远端地址然后判断
      - 如果远端是文件，并且指定了 -n/--no-clobber, 报错
      - 如果远点为空或者是文件，创建或者覆盖文件
      - 否则报错
    - 如果远端是文件
      - 指定了 -n/--no-clobber, 报错
      - 创建文件
- 远端地址不存在，并且父目录也不存在，报错
- 远端不存在，本地是文件夹，创建文件夹
- 远端不存在，上传的是文件，远端以斜线结尾，报错
- 远端不存在，上传的是文件，创建文件
