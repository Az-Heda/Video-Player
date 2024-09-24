#!/bin/bash
clear
cd "$(dirname "$0")"

GOOS=windows GOARCH=amd64 go build -o WIN_VideoPlayer.exe main.go
go build -o LIN_VideoPlayer main.go