const express = require("express")
const port = 3000
const app = new express()
const fs = require("fs")
const ytdl = require("ytdl-core")
const path = require("path")
const ffmpeg = require("fluent-ffmpeg")
let description = "You need to provide an id for us to convert, like this! <br> http://localhost:3000/mp4?id=IUPYpZBfsMU <br> Jeff Geerling is the creator of the video and is a wonderful contributor to the RPI, open source and some other communities! <br> go check his content out!"

app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs')
app.get("/", (req, res) => {
  res.render("index");
});
app.get('/mp4', async (req, res) => {
	if(!req.query.id) return res.send(description)
	try{	
		if(fs.existsSync(`./Videos/${req.query.id}.mp4`)) return res.send("You already have this downloaded in the server, delete this and download again!")
		ytdl(`https://www.youtube.com/watch?v=${req.query.id}`, { quality: 'highestvideo' }).pipe(fs.createWriteStream(`./Videos/${req.query.id}.mp4`))
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

app.get('/mp3', async (req, res) => {
	try{
		let mp3desc = "To download an MP3, you need to provide the id of the video.<br> http://localhost:3000/mp3?id=IUPYpZBfsMU <br>"
		if(!req.query.id) return res.send(mp3desc)
		if(fs.existsSync(`./Audios/${req.query.id}.mp3`)) return res.send("You have already downloaded this before, delete this from the server first to download again!")
		let stream = ytdl(req.query.id, {
			quality: "highestaudio"
		})
		res.write("Downloading!")
		ffmpeg(stream)
		.audioBitrate(128)
		.save(`./Audios/${req.query.id}.mp3`)
		.on('end', () => {
			res.write("Done!")
			res.end()
		})
	}catch(e){
		console.log(e)
		return res.send("Error! Ensure link is working")
	}
})

app.get('/list', async (req, res) => {
	const directoryPath = path.join(__dirname, "Videos")
	fs.readdir(directoryPath, function (err, files){
		if(err) return res.send("Could not scan directory.\n\n" + err)
		if(files.length === 0) res.write("Directory Videos empty!\n")
		console.log("Videos:\n")
		files.forEach(function (file){
			res.write(`${file}\n`)
		})
	})
	const directoryAudio = path.join(__dirname, "Audios")
	fs.readdir(directoryAudio, function (err, files){
		if(err) return res.send("Could not scan directory.\n\n" + err)
		if(files.length === 0) return res.send("Directory Audios empty!")
		console.log("\nAudios:\n")
		files.forEach(function (file){
			res.write(`${file}\n`)
		})
		res.end()
	})
})

app.use(function(req,res){
    res.status(404).send("🍌, 404")
});
app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
})
