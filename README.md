# 文靜之潭｜Minecraft RPG 伺服器指南網站

這個專案是「文靜之潭」Minecraft RPG 伺服器的玩家攻略網站前端原型。

## 目前內容

- 首頁視覺設計：參考藍色水域、遺跡、冒險 RPG 風格
- 職業介紹頁
- 裝備介紹頁
- 怪物介紹頁
- 功能及指令頁
- 新手攻略頁
- 最新公告頁
- 資料檔：職業、裝備、怪物、指令

## 專案架構

```txt
forcelestmere/
├── index.html
├── pages/
│   ├── classes.html
│   ├── equipment.html
│   ├── monsters.html
│   ├── commands.html
│   ├── guide.html
│   └── news.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── data/
│   ├── classes.json
│   ├── equipment.json
│   ├── monsters.json
│   └── commands.json
└── README.md
```

## 本機預覽方式

目前是純靜態網站，可以直接開啟 `index.html`，或使用 VS Code 的 Live Server 預覽。

## GitHub Pages 部署建議

到 GitHub Repository：

`Settings → Pages → Build and deployment → Source 選 Deploy from a branch → Branch 選 main / root`

儲存後等待 GitHub Pages 產生網址。
