package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

type TwilioClient struct {
	Creds TwilioCredentials
}

func NewTwilioClient(c TwilioCredentials) *TwilioClient {
	c.UrlStr = AssembleTwilioUrl(c.UrlStr, c.AccountSid)
	return &TwilioClient{
		Creds: c,
	}
}

func (tw *TwilioClient) ListNumbers() (TwilioListNumbersRes, int, error) {
	url := fmt.Sprintf("https://api.twilio.com/2010-04-01/Accounts/%s/AvailablePhoneNumbers/US/Local.json", tw.Creds.AccountSid)
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	req.SetBasicAuth(tw.Creds.AccountSid, tw.Creds.AuthToken)
	req.Header.Add("Accept", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return TwilioListNumbersRes{}, 0, err
	}
	defer res.Body.Close()

	var resObj TwilioListNumbersRes
	json.NewDecoder(res.Body).Decode(&resObj)

	p, _ := ioutil.ReadAll(res.Body)
	fmt.Println(string(p))

	return resObj, res.StatusCode, nil
}

func (tw *TwilioClient) ProvisionNumber(number string) (TwilioListNumbersRes, int, error) {
	params := url.Values{}
	params.Add("PhoneNumber", number)
	callUrl := fmt.Sprintf("https://api.twilio.com/2010-04-01/Accounts/%s/ncomingPhoneNumbers.json?%s", tw.Creds.AccountSid, params.Encode())
	req, _ := http.NewRequest(http.MethodGet, callUrl, nil)
	req.SetBasicAuth(tw.Creds.AccountSid, tw.Creds.AuthToken)
	req.Header.Add("Accept", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return TwilioListNumbersRes{}, 0, err
	}
	defer res.Body.Close()

	var resObj TwilioListNumbersRes
	json.NewDecoder(res.Body).Decode(&resObj)

	p, _ := ioutil.ReadAll(res.Body)
	fmt.Println(string(p))

	return resObj, res.StatusCode, nil
}

type TwilioCredentials struct {
	AuthToken  string
	AccountSid string
	UrlStr     string
}

func AssembleTwilioUrl(baseUrl, accountSID string) string {
	return fmt.Sprintf(baseUrl, accountSID)
}

type TwilioListNumbersRes struct {
	AvailablePhoneNumbers []TwilioPhoneNumber `json:"available_phone_numbers"`
}

type TwilioPhoneNumber struct {
	PhoneNumber string `json:"phone_number"`
}

/* List Numbers Response */
// "available_phone_numbers": [
// 	{
// 		"friendly_name": "(315) 509-2631",
// 		"phone_number": "+13155092631",
// 		"lata": "136",
// 		"rate_center": "PULASKI",
// 		"latitude": "43.523500",
// 		"longitude": "-76.138300",
// 		"locality": "Pulaski",
// 		"region": "NY",
// 		"postal_code": "13142",
// 		"iso_country": "US",
// 		"address_requirements": "none",
// 		"beta": false,
// 		"capabilities": {
// 			"voice": true,
// 			"SMS": true,
// 			"MMS": true
// 		}
// 	},
// }
