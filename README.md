# 後臺管理頁面專案

https://user-images.githubusercontent.com/35693306/156032159-6e51fee5-274c-49b3-b98f-1c03eac7b86a.mp4


 
## 啟動服務

### 後端 API 資料

1. 需先下載 `prism` 套件

2. 使用 `prism` 啟動 swagger API 服務
```
# auth 驗證模擬 API
$ prism mock ./docs/auth.yml -p 7777 
# 訂單明細模擬 API
$ prism mock ./docs/order.yml -p 8888

# 成功啟動模樣
[12:56:47 AM] › [CLI] …  awaiting  Starting Prism…
[12:56:47 AM] › [CLI] ℹ  info      POST       http://127.0.0.1:7777/auth_api/user/login
[12:56:47 AM] › [CLI] ℹ  info      GET        http://127.0.0.1:7777/auth_api/user/info
[12:56:47 AM] › [CLI] ▶  start     Prism is listening on http://127.0.0.1:7777
```

### 啟動本地端頁面

```
$ yarn
$ yarn start
```

## 執行測試

```
$ yarn test
```

### 執行 lint

```
$ yarn lint
```
