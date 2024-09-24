package utils

import (
	"encoding/json"
	"errors"
	"os"
)

var watchedVideos []uint32

func CreateWatchedVideosFile() {
	if !DirExists(dirResources) {
		os.Mkdir(dirResources, 0777)
	}
	var emptyData []uint32 = []uint32{}
	if _, err := os.Stat(watchListFile); errors.Is(err, os.ErrNotExist) {
		b, err := json.Marshal(emptyData)
		HandleError(err)
		os.WriteFile(watchListFile, b, os.ModePerm)
	}
}

func ReadWatchedVideos() {
	CreateWatchedVideosFile()
	b, err := os.ReadFile(watchListFile)
	HandleError(err)

	json.Unmarshal(b, &watchedVideos)
}

func SaveWatchedVideos(content []uint32) {
	CreateWatchedVideosFile()
	b, err := json.Marshal(content)
	HandleError(err)

	err = os.WriteFile(watchListFile, b, os.ModePerm)
	HandleError(err)
}
