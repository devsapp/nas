本组件支持指令
````
s deploy

# 将本地 folder目录下的文件上传到 nas 的 /test/f 目录下
s exec -- upload -r -n ./folder nas:///test/f # s exec -- cp -r -n ./folder nas:///test/f 

# 查看目录
s exec -- ls -a nas:///test/f

# 将 nas 的 /test/f 目录下载到 nas 的 folder-1 目录下
s exec -- download -r -n nas:///test/f ./folder-1 # s exec -- cp -r -n nas:///test/f ./folder-1

s exec -- download nas:///test/f/demo-1.txt ./folder-2

# 删除指令
s exec -- rm -r nas:///test/f
s exec -- command rm -r nas:///test/f

# 其他指令
s exec -- command mkdir nas:///test/f1

s remove
````