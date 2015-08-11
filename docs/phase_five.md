# User Interests

## The model
- `interested_id`
- `interestee_id`

## Validations
- presence of both in the db

## after_initialize
- checks the interestee for a mutual interest
- this will be done by creating a user helper method `interested_in?`
- if this is present a message factory method will be called to generate a notification to both
users

## The controller
- create
- destroy
- index (on a per user basis)

## The routes
- index will be nested in the users routes