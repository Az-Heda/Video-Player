package utils

import (
	"errors"
	"os"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/vansante/go-ffprobe"
)

type Video struct {
	Id           uint32
	Filepath     string
	Filename     string
	Directory    string
	Duration     int64
	Size         float32
	LastModified int64
	Watched      bool
}

func getWatchFlag(filepath string) bool {
	var id uint32 = Hash(filepath)
	for _, item := range watchedVideos {
		if item == id {
			return true
		}
	}
	return false
}

func ReadDirectory(p string) []Video {
	var allFiles []Video = []Video{}
	files, err := os.ReadDir(p)
	if errors.Is(err, os.ErrNotExist) {
		return []Video{}
	}
	HandleError(err)

	for _, file := range files {
		var filepath string = path.Join(p, file.Name())
		if !file.IsDir() {
			if strings.ToLower(path.Ext(filepath)) == ".mp4" {
				data, err := ffprobe.GetProbeData(filepath, 120000*time.Millisecond)
				HandleError(err)

				_, err = strconv.ParseInt(data.Format.Size, 10, 64)
				HandleError(err)

				stats, err := os.Stat(filepath)
				HandleError(err)

				allFiles = append(allFiles, Video{
					Id:           Hash(file.Name()),
					Filepath:     filepath,
					Filename:     file.Name(),
					Directory:    path.Dir(filepath),
					Duration:     data.Format.Duration().Milliseconds(),
					Size:         float32(stats.Size()),
					LastModified: stats.ModTime().UnixMilli(),
					Watched:      getWatchFlag(file.Name()),
				})
			}
		} else {
			allFiles = append(allFiles, ReadDirectory(filepath)...)
		}
	}

	return allFiles
}

func SetVideoAsWatched(video *Video) {
	video.Watched = true

	watchedVideos = append(watchedVideos, video.Id)
	SaveWatchedVideos(watchedVideos)
}

func GetAllVideos() []Video {
	ReadWatchedVideos()
	var allFiles []Video = []Video{}
	var data []string = ReadDirFromFile()

	for _, d := range data {
		var files []Video = ReadDirectory(d)
		allFiles = append(allFiles, files...)
	}
	return allFiles
}
