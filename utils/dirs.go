package utils

import (
	"encoding/json"
	"errors"
	"os"
)

const dirResources = "resources"
const dirFile string = dirResources + "/dirs.json"
const watchListFile string = dirResources + "/watched.json"

func checkIfDirFileExists() bool {
	_, err := os.Stat(dirFile)
	return !errors.Is(err, os.ErrNotExist)
}

func createDirFile(dir string) {
	SaveDirFile([]string{dir})
}

func SaveDirFile(content []string) {
	b, err := json.MarshalIndent(content, "", "\t")
	HandleError(err)

	err = os.WriteFile(dirFile, b, os.ModePerm)
	HandleError(err)
}

func AddDir(dir string) {
	if !DirExists(dirResources) {
		os.Mkdir(dirResources, 0777)
	}
	if !checkIfDirFileExists() {
		createDirFile(dir)
		return
	}

	var content []string = ReadDirFromFile()
	var isInside bool = false

	for _, item := range content {
		if item == dir {
			isInside = true
		}
	}

	if !isInside {
		content = append(content, dir)
	}

	SaveDirFile(content)
}

func ReadDirFromFile() []string {
	var data []string = []string{}
	b, err := os.ReadFile(dirFile)
	if err != nil {
		os.WriteFile(dirFile, []byte("[]"), 0777)
		b = []byte("[]")
	}

	err = json.Unmarshal(b, &data)
	HandleError(err)

	return data
}

func DirExists(path string) bool {
	_, err := os.Stat(path)
	if err == nil {
		return true
	}
	if os.IsNotExist(err) {
		return false
	}
	return false
}
