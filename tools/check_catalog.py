"""見本の目次（js/catalog-data.js）の抜けを確かめる。Python に最初から入っている部品だけで動く。

使い方（101-renewal のフォルダで）：py tools/check_catalog.py
- 目次に載っていない画面
- 目次に載っているのに、ファイルが無い画面
- 見本ナビ（js/mihon-nav.js）を読んでいない画面
- 行き先の無いリンク
を出す。何も出なければ OK。
"""
import glob
import os
import re
import sys

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
os.chdir(D)

# 目次役のページ（画面ではないので、目次に載せなくてよい）
HUBS = {"index.html", "search.html", "mail.html", "favorite.html", "diary.html", "menu-profile.html", "payment.html",
        "pointget.html", "system.html", "contact.html", "setting.html", "setting_block.html",
        "setting_mail_notification.html", "setting_age_limit.html", "setting_quit.html"}

data = open("js/catalog-data.js", encoding="utf-8").read()
body, _, missing_part = data.partition("missing:")
listed = re.findall(r'file:\s*"([^"]+)"', body)
planned = set(re.findall(r'file:\s*"([^"]+)"', missing_part))   # まだ画面が無いと分かっているもの
pages = sorted(glob.glob("*.html"))

problems = []
dup = sorted({f for f in listed if listed.count(f) > 1})
if dup:
    problems.append(("目次に2回以上載っている画面", dup))
problems.append(("目次に載っていない画面", [p for p in pages if p not in listed and p not in HUBS]))
problems.append(("目次に載っているのに、ファイルが無い画面", [f for f in listed if not os.path.exists(f)]))
problems.append(("見本ナビを読んでいない画面",
                 [p for p in pages if p != "index.html" and "js/mihon-nav.js" not in open(p, encoding="utf-8").read()]))
broken = set()
for p in pages:
    for h in re.findall(r'href="([^"#?:]+\.html)', open(p, encoding="utf-8").read()):
        if not os.path.exists(h) and h not in planned:
            broken.add(f"{p} → {h}")
problems.append(("行き先の無いリンク（目次の「画面が無いもの」に書いたもの以外）", sorted(broken)))

ok = True
for title, items in problems:
    if items:
        ok = False
        print(f"■ {title}（{len(items)}）")
        for i in items:
            print("   ", i)
print("OK：抜けはありません" if ok else "")
sys.exit(0 if ok else 1)
