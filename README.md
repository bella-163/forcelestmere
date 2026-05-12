# 文靜之潭｜Minecraft RPG 伺服器攻略站

這個專案是「文靜之潭」Minecraft RPG 伺服器的 Next.js 攻略站，包含玩家前台頁面與簡易管理後台。

## 主要內容

- 首頁
- 最新消息
- 職業介紹與職業詳細頁
- 裝備介紹與裝備詳細頁
- 怪物圖鑑與怪物詳細頁
- 功能指令
- 管理後台：`/admin`

## 專案架構

```txt
forcelestmere/
├── public/
│   ├── data/              # 前台與後台共用 JSON 資料
│   └── images/            # 後台圖片上傳目錄
├── src/
│   ├── app/               # Next.js App Router 頁面與 API
│   │   ├── api/admin/     # 後台登入、資料寫入、圖片上傳 API
│   │   ├── admin/         # 管理後台頁面
│   │   ├── classes/       # 職業頁面
│   │   ├── equipment/     # 裝備頁面
│   │   ├── monsters/      # 怪物頁面
│   │   └── news/          # 最新消息頁面
│   ├── components/        # 共用 React 元件
│   ├── data/              # 導覽列等站台設定
│   ├── lib/               # 資料讀寫 helper
│   └── types/             # TypeScript 型別
├── package.json
└── next.config.ts
```

## 本機開發

```bash
npm install
npm run dev
```

預設網址是 `http://localhost:3000`。

## 後台環境變數

建立 `.env.local`：

```env
ADMIN_PASSWORD=your_admin_password
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=bella-163
GITHUB_REPO=forcelestmere
GITHUB_BRANCH=main
```

`ADMIN_PASSWORD` 是後台登入密碼。設定 `GITHUB_TOKEN` 後，後台儲存資料會透過 GitHub API 更新 `public/data/*.json`；未設定時只會寫入本機檔案。

## 指令

```bash
npm run dev
npm run build
npm run start
```
