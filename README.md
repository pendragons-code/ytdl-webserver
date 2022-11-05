# ytdl-webserver
A simple webserver with ytdl-core features implemented. I may or may not add more stuff, do what you want!        
Maybe I'll play around with stuff like google drive, who knows? Needless to say this repo is filled with junk and is just made so i can clone this on any device i need to donwload videos. Fork if you want!             
This is for downloading youtube videos with a sote that allows you to interact with it. Why can't I just use the cli? Good question. Ask people who don't want to use the terminal.
# Quick start guide:
This webserver is hosted on port `3000`, so if you are hosting this on your local network, your link could look like these:
```
192.168.x.x/mp4?id=
http://localhost:3000/mp4?id="VIDEO ID HERE"

Video IDs look like this:
IUPYpZBfsMU (This video is made, owned and posted by jeff geerling and deserves credit for it, I'm just using it as an example, any request to take it down is accepted.)
```
# install and run

```
git clone https://github.com/pendragons-code/ytdl-webserver/
cd ytdl-webserver
npm i
npm run deploy
```
# What is this?
A simple web server you can host in your home to download youtube videos and songs.        
Why make this when there are so many alternatives? Because some are filled wth ads and have some porn in them.

# How should I use this?
How am I supposed to know?      
JK, here is my configuration:
```
I have a raspberry pi that already uploads files to the SD card (not that I USB boot), and take that SD card and put it in my phone. 
If I want to, for any reason (I have a USB to sd card reader, a few of them actually.), 
I can keep multiple copies on different SD cards and use my network to share it with my devices.
```
# Actual use case:
You can actually just install this and host it on your pc when you want to and it will just go accordingly. However, you must ensure you have nodejs, npm and dependecies to run this. Git is just used to clone this here so you can avoid that if you just decided to download this as a zip and just installed the things you need.

# fluent-ffmpeg
[here](https://www.npmjs.com/package/fluent-ffmpeg)
