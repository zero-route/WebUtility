# KitBox

Dashboard developer dan IT pribadi. Modul tools dikelompokkan per kategori, tiap tool punya foldernya sendiri di `components/`.

## Menjalankan

```
npm install
npm run dev
```

## Struktur

- `app/` — routing tiap kategori tools
- `components/layout/` — sidebar
- `components/dashboard/` — kartu kategori dan grid placeholder
- `components/<kategori>/<tool>/` — komponen per tool, dikembangkan satu per satu
- `lib/toolsData.ts` — daftar kategori dan tools
