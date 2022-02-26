# 後台管理頁面專案

[Toc]
 
## 啟動服務

### 後端 API 資料

需先下載 `prism` 套件

使用 `prism` 啟動 swagger API 服務
```
# auth 驗證模擬 API
$ prism mock ./docs/auth.yml -p 9010 
```

### 啟動本地端頁面

```
$ yarn
$ yarn start
```
