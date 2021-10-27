package main

import (
	"fmt"
	"net/http"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

type restAPI struct {
	Port int
}

func NewRestAPI(port int) *restAPI {
	return &restAPI{
		Port: port,
	}
}

func (r *restAPI) Run() {
	http.HandleFunc("/s3/list-images", listS3images)

	http.ListenAndServe(fmt.Sprintf(":%d", r.Port), nil)
}

func listS3images(http.ResponseWriter, *http.Request) {
	// The session the S3 Downloader will use
	sess := session.Must(session.NewSession())

	// Create a downloader with the session and default options
	downloader := s3manager.NewDownloader(sess)

	ListS3Files(downloader)
}
