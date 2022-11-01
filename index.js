const express = require("express")
const app = new express()
const fs = require("fs")
const ytdl = require("ytdl-core")
let description = "You need to provide an id for us to convert, like this! <br> http://localhost:3000/?id=watch?v=IUPYpZBfsMU <br> Jeff Geerling is the creator of the video and is a wonderful contributor to the RPI, open source and some other communities! <br> go check his content out!"

app.get('/mp4', async (req, res) => {
	if(!req.query.id) return res.send(description)
	try{	
		if(fs.existsSync(`./Videos/${req.query.id}.mp4`)) return res.send("You already have this downloaded in the server, delete this and download again!")
		ytdl(`https://www.youtube.com/watch?v=${req.query.id}`).pipe(fs.createWriteStream(`./Videos/${req.query.id}.mp4`))
		res.write("Downloading!")
		async function check(){
			if(fs.existsSync(`./Videos/${req.query.id}.mp4`)){
				res.write("\nDone")
				res.end()
				return
			}else{
				res.write("\nStill downloading, next check in 5 secs!")
			}
		}
		setInterval(check, 5000)
	}catch(e){
		console.log(e)
		res.send("Error!")
	}
})
app.listen(3000)
