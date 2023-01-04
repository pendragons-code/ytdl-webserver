const express = require("express")
const port = 8000
const app = new express()
const fs = require("fs")
const ytdl = require("ytdl-core")
const path = require("path")
const ffmpeg = require("fluent-ffmpeg")
const config = require("./config.json")
let description = `You need to provide an id for us to convert, like this! <br> http://${config.dns}:3000/mp4?id=IUPYpZBfsMU <br> Jeff Geerling is the creator of the video and is a wonderful contributor to the RPI, open source and some other communities! <br> go check his content out!`

app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs')
app.get("/", async (req, res) => {
  res.render("index");
});
app.get('/mp4', async (req, res) => {
	if(!req.query.id) return res.send(description)
	try{

		if(fs.existsSync(`./Videos/${req.query.id}.mp4`)) return res.send("You already have this downloaded in the server, delete this and download again!")
		ytdl(`https://www.youtube.com/watch?v=${req.query.id}`, { filter: "audioandvideo", quality: "highest" }).pipe(fs.createWriteStream(`./Videos/${req.query.id}.mp4`))
		res.write("Downloading!")
		async function check(){
			if(fs.existsSync(`./Videos/${req.query.id}.mp4`)){
				res.send("\nDone")
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
		let mp3desc = `To download an MP3, you need to provide the id of the video.<br> http://${config.dns}:3000/mp3?id=IUPYpZBfsMU <br>`
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
			res.send("Done!")
		})
	}catch(e){
		console.log(e)
		return res.send("Error! Ensure link is working")
	}
})

app.get('/list', async (req, res) => {
	fs.readdir("./Videos", function (err, files){
		if(err) res.write("Could not scan directory.\n\n" + err)
		if(files.length === 0) res.write("Directory Videos empty!\n")
		console.log("Videos:\n")
		files.forEach(function (file){
			res.write(`${file}\n`)
			console.log(`${file}\n`)
		})
	})

	fs.readdir("./Audios", function (err, files){
		if(err) return res.write("Could not scan directory.\n\n" + err)
		if(files.length === 0) return res.send("Directory Audios empty!")
		console.log("\nAudios:\n")
		files.forEach(function (file){
			res.write(`${file}\n`)
			console.log(`${file}\n`)
		})
		//res.end()
	})
})

app.get("/stream", async (req, res) => {
	if(!req.query.id) return res.send("You did not provide a video id!")
	let getVideo = await fs.statSync(`./Videos/${req.query.id}.mp4`)
	if(!getVideo) return res.send("This Video ID does not exist!")
	res.render("streamVideo", { videoName: `/video?id=${req.query.id}` })
})

app.get("/video", function (req, res) {
	// Ensure there is a range given for the video
	const range = req.headers.range;
	if (!range) {
		res.status(400).send("Requires Range header");
	}

	const videoPath = `./Videos/${req.query.id}.mp4`;
	const videoSize = fs.statSync(`./Videos/${req.query.id}.mp4`).size;
	// Parse Range
	//Example: "bytes=32324-"
	const CHUNK_SIZE = 10 ** 6; // 1MB
	const start = Number(range.replace(/\D/g, ""));
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

	// Create headers
	const contentLength = end - start + 1;
	const headers = {
		"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	};

	// HTTP Status 206 for Partial Content
	res.writeHead(206, headers);

	// create video read stream for this particular chunk
	const videoStream = fs.createReadStream(videoPath, { start, end });

	// Stream the video chunk to the client
	videoStream.pipe(res);
});

app.use(function(req,res){
    res.status(404).send("🍌, 404")
});
app.listen(port, () => {
  console.log(`http://${config.dns}:${port}`);
})
