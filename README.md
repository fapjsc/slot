slot-online

參考網站
https://uteba.net/?CN=25

信箱:chichichen0401@gmail.com
密碼:dls69687477

設定樹莓派開機自動執行 camera-web

>mkdir sh

>vi start-camera-server.sh

============================
#!/bin/bash

serve -s /home/pi/slot-demo/webrtc-camera-web/build/ -p 3000

sleep 1s
============================

>vi ~/.bashrc

============================
/home/pi/sh/start-camera-server.sh
============================

>cd ~/.config/autostart

>vi open-browser.desktop

============================
[Desktoop Entry]
Type=Application
Exec=chromium-browser 'http://localhost:3000'
============================

chmod 755 /home/pi/sh/start-camera-server.sh