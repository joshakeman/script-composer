package api

type Launch struct {
	Twilio TwilioClient
}

/*
- Check if show already exists
- If so, update record with a new version tag, tag everything with this
- Point web portal at new container (how?), with an env variable?
- Check if number of characters has changed (how do we know?), if so, get new phone numbers
- Check if number of lines has changed, if so, commission new SQS queues
- Generate new code based on new script
- Deploy new code
- Retire old SQS Queues and cron once all attendees have moved through it
*/
