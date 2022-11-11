# ytdl-webserver
A simple webserver with ytdl-core features implemented. I may or may not add more stuff, do what you want!        
Maybe I'll play around with stuff like google drive, who knows? Needless to say this repo is filled with junk and is just made so i can clone this on any device i need to donwload videos. Fork if you want!             
This is for downloading youtube videos with a sote that allows you to interact with it. Why can't I just use the cli? Good question. Ask people who don't want to use the terminal. JKJK I ended up using this because I often find myself in the following situations:     
1. I'm a linux/bsd/unix like operating system kinda guy and don't like using windows, but am put in a sitation to download videos on a system as such. So I really DK how to get that shit working.
2. I dont want to see hot single mums in my area. I'm asexual and would rather see smouldering hot single servers in my area. I'll start mining monero on that shit.
3. Being able to host this on my personal server and letting download remotely is kinda fun and if i really want to get it to share on multiple devices, i upload stuff to google drive or something like that.

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


# Oh yes

It seems that fluent-ffmpeg does not seem to work all the time if you do not have ffmpeg installed, so pls do so in your use case.    
    [here ya stinkies.](https://ffmpeg.org/)
# Educational purposes only

Yes, piracy bad, `--force-open-source` videos is not a good move, downloading videos without watching ads or helping creators earn money is bad kids!
