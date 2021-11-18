package data

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
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

func listS3images(w http.ResponseWriter, r *http.Request) {
	// The session the S3 Downloader will use
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create a downloader with the session and default options
	s3Client := s3.New(sess)

	list, err := ListS3Files(s3Client)
	if err != nil {
		fmt.Println(err)
	}

	json.NewEncoder(w).Encode(&list)
}

func ListS3Files(s3Client *s3.S3) ([]string, error) {
	list, err := s3Client.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String("script-composer"),
	})

	if err != nil {
		return []string{}, err
	}

	var res []string
	fmt.Println("List: ", list)
	for _, obj := range list.Contents {
		fmt.Println(obj)
		res = append(res, *obj.Key)
	}

	return res, nil
}
