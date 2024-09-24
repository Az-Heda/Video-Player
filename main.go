package main

import (
	"VideoPlayer/router"
	"VideoPlayer/utils"
	"flag"
)

func main() {
	var dir string = ""
	flag.StringVar(&dir, "dir", "", "Directory")
	flag.Parse()

	if len(dir) > 0 {
		utils.AddDir(dir)
	}
	router.Init()
}
