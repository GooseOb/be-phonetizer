# Што гэта

Be-phonetizer гэта праграма для фанэтызацыі папак з файламі з тэкстам у фармаце utf-8.

Створана для дапамогі ў канвэртацыі субтытраў,
таму ў скрыптах папкі называюцца `srt` і `ph-srt`.

Ужывае
пакет [тарашкевізатара](https://github.com/GooseOb/taraskevizer) для асыміляцыі па мяккасьці
і API [БНКорпуса](https://bnkorpus.info/fanetyka.html) для вызначэньня націскаў.

# Як усталяваць

1. Усталяваць `node.js` і `git`
2. Адкрыць тэрмінал (напр. cmd) і скапіяваць туды

   ```sh
   cd папка_дзе_будзе_фанэтызатар
   git clone https://github.com/GooseOb/be-phonetizer.git
   cd be-phonetizer
   .\update.bat
   ```

3. Далей у папцы be-phonetizer будуць скрыпты, пра каторыя ніжэй

# Скрыпты

`phonetize.bat` - сканвэртаваць файлы з `srt/` у `ph-srt/`.

`update.bat` - усталяваць/абнавіць праграму і яе залежнасьці.

`update+phonetize.bat` - абодва вышйшыя разам.

# Ужываньне праз CLI

```bash
node ./phonetize/main.mjs зыходная_папка выніковая_папка
```
