package router

import (
	"VideoPlayer/colors"
	"VideoPlayer/utils"
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func findVideoFromId(videos []utils.Video, id string) int {
	for idx, vid := range videos {
		conv, err := strconv.ParseUint(id, 10, 32)
		utils.HandleError(err)
		if vid.Id == uint32(conv) {
			return idx
		}
	}
	return -1
}

func Init() {
	var videos []utils.Video = utils.GetAllVideos()
	var port int
	flag.IntVar(&port, "port", 8771, "Port to serve file")
	flag.Parse()

	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.Use(gin.Recovery())

	r.LoadHTMLGlob("templates/*")

	r.GET("/", func(c *gin.Context) {
		b, err := json.MarshalIndent(videos, "", "    ")
		utils.HandleError(err)
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"Data":    videos,
			"RawData": string(b),
		})
	})

	r.GET("/update", func(c *gin.Context) {
		var currentVideosCount int = len(videos)

		videos = utils.GetAllVideos()

		c.JSON(http.StatusOK, gin.H{
			"Before": currentVideosCount,
			"After":  len(videos),
		})
	})

	r.GET("/stream/:id", func(c *gin.Context) {
		var id string = c.Param("id")
		var idx int = findVideoFromId(videos, id)

		if idx == -1 {
			c.String(http.StatusNotFound, fmt.Sprintf("Cannot find video with id=\"%v\"", id))
			return
		}
		if !videos[idx].Watched {
			utils.SetVideoAsWatched(&videos[idx])
		}
		c.File(videos[idx].Filepath)
	})

	r.GET("/info/:id", func(c *gin.Context) {
		var id string = c.Param("id")
		var idx int = findVideoFromId(videos, id)

		if idx == -1 {
			c.String(http.StatusNotFound, fmt.Sprintf("Cannot find video with id=\"%v\"", id))
			return
		}

		c.JSON(http.StatusOK, videos[idx])
	})

	r.StaticFS("/static", gin.Dir("static/", false))

	var url string = fmt.Sprintf("http://localhost:%v", port)
	fmt.Printf("Server online at: %v\n", colors.Fg_Yellow(url))
	r.Run(fmt.Sprintf(":%v", port))
}
